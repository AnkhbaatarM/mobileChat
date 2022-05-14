import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Animated,
    Easing,
    TouchableOpacity,
    TouchableHighlight,
    Keyboard,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import styles from './Styles';
import {
    log_out,
    create_room,
    searchIcon,
    remove_icon,
} from '../../utils/files/SvgFiles/moreHeaderIcon';
import SearchBar from '../../_Components/_global/AnimatedSearchInput';
import { width80, width5, width6 } from '../../utils/dimensions/width';
import AsyncStorage from '@react-native-community/async-storage';
import { socketPort } from '../../Socket/Socket_i';
import { requesFetchNew } from '../../../Gloabal/GlobalFunctions';
import { useDispatch } from 'react-redux';
import { roomListVariableUpdate } from '../../Socket/Socket_Var';
import { setNewMsgCount, setRoomList } from '../../../reduxStore/reducer';
import Modal from 'react-native-modal';
const MoreHeader = ({
    navigation,
    label = '',
    logOutButton = false,
    onPressLogOut = () => {},
    showCreateRoom = false,
    exitIcon = false,
    searchRoom = () => {},
}) => {
    const dispatch = useDispatch();
    const [logOutModal, showLogOutModal] = useState(false);
    const [searchShown, showSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pressed,setPressed]=useState(false)
    const leftOutSide = useRef(new Animated.Value(0)).current;
    const searchInputXAxis = useRef(new Animated.Value(0)).current;
    const createButtonAxis = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeButton = useRef(new Animated.Value(0)).current;
    const [search, setSearch] = useState('');
    const input = useRef(null);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
        }).start();
        Animated.timing(fadeButton, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
        }).start();
        Animated.timing(createButtonAxis, {
            toValue: 0,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
        Animated.timing(searchInputXAxis, {
            toValue: 0,
            duration: 600,
            // easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const animationStart = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
        }).start(() => {
            Animated.parallel([
                Animated.timing(fadeButton, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 0,
                    useNativeDriver: true,
                }),
                Animated.timing(searchInputXAxis, {
                    toValue: -width80,
                    duration: 260,
                    // easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(createButtonAxis, {
                    toValue: -(width80 - 160),
                    duration: 100,
                    // easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(leftOutSide, {
                    toValue: -400,
                    duration: 550,
                    delay: 10,
                    // easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ]).start(() => {
                input.current.focus();
                showSearch(true);
            });
        });
    };

    const getRoomList = async (searchValue, pageValue) => {
        setLoading(true);
        const user = await AsyncStorage.getItem('LoggedUser');
        const userData = JSON.parse(user);
        const Url = `${socketPort}api/rooms?userId=${
            userData.userId
        }&limit=10&page=${0}&roomName=${searchValue}`;
        requesFetchNew(Url, 'GET', userData.accessToken).then(async responseJson => {
            setLoading(false);
            if (responseJson !== undefined && responseJson !== null) {
                let list = [];
                if (responseJson.data.result.length !== 0) {
                    list = responseJson.data.result;
                }
                roomListVariableUpdate(list, userData.userId);
                dispatch(setRoomList(list));
            } else {
                dispatch(setNewMsgCount(0));
            }
        });
    };

    useEffect(() => {
        const timeOutId = setTimeout(() => getRoomList(search, 0), 500);
        return () => {
            console.log('No longer latest query') || clearTimeout(timeOutId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const animationHide = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
        }).start();
        Animated.timing(leftOutSide, {
            toValue: 0,
            duration: 0,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
        Animated.timing(searchInputXAxis, {
            toValue: 0,
            duration: 0,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
        Animated.timing(fadeButton, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
        }).start();
        Animated.timing(createButtonAxis, {
            toValue: 0,
            duration: 0,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
        Keyboard.dismiss();
        showSearch(false);
        setSearch('');
        searchRoom('');
    };

    return (
        <>
            <SearchBar
                left={searchInputXAxis}
                fadeAnim={fadeAnim}
                searchShown={searchShown}
                hideSearchBar={() => animationHide()}
                search={text => setSearch(text)}
                input={input}
                loading={loading}
            />
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [
                            {
                                translateX: leftOutSide,
                            },
                        ],
                    },
                ]}>
                <View style={styles.labelContainer}>
                    <View style={{ alignSelf: 'flex-start' }}>
                        <Text numberOfLines={1} style={styles.userName}>{`${label}`}</Text>
                    </View>
                </View>
                {logOutButton && (
                    <TouchableOpacity
                        style={styles.createRoomButton}
                        onPress={() => {
                            showLogOutModal(true);
                            // onPressLogOut();
                        }}>
                        <SvgXml
                            style={styles.iconStyle}
                            fill={'gray'}
                            width={width6}
                            height={width6}
                            xml={log_out('#909090')}
                        />
                    </TouchableOpacity>
                )}
                {exitIcon && (
                    <TouchableOpacity
                        style={styles.createRoomButton}
                        onPress={() => {
                            navigation.goBack();
                            // onPressLogOut();
                        }}>
                        <SvgXml
                            style={styles.iconStyle}
                            fill={'gray'}
                            width={15}
                            height={15}
                            xml={remove_icon('#909090')}
                        />
                    </TouchableOpacity>
                )}
                {showCreateRoom && (
                    <Animated.View
                        style={{
                            transform: [
                                {
                                    translateX: createButtonAxis,
                                },
                            ],
                        }}>
                        <TouchableHighlight
                            underlayColor={'rgba(0,0,0,0.2)'}
                            style={styles.createRoomButton}
                            onPress={() => {
                            navigation.navigate('UserSearch');
                            }}>
                            <SvgXml
                                style={styles.iconStyle}
                                fill={'gray'}
                                width={width6}
                                height={width6}
                                xml={create_room('#909090')}
                            />
                        </TouchableHighlight>
                    </Animated.View>
                )}
                {showCreateRoom && (
                    <Animated.View style={{ opacity: fadeButton }}>
                        <TouchableHighlight
                            underlayColor={'rgba(0,0,0,0.2)'}
                            style={styles.createRoomButton}
                            onPress={() => {
                                // showSearch(!searchShown);
                                animationStart();
                            }}>
                            <SvgXml
                                width={width5}
                                height={width5}
                                style={styles.iconStyle}
                                xml={searchIcon('#909090')}
                            />
                        </TouchableHighlight>
                    </Animated.View>
                )}
            </Animated.View>
            <Modal
                onBackdropPress={() => showLogOutModal(false)}
                onBackButtonPress={() => showLogOutModal(false)}
                backdropOpacity={1}
                backdropColor={'rgba(16,48,84,0.9)'}
                isVisible={logOutModal}>
                <View style={styles.logOutModalContainer}>
                    <Text style={styles.modalText}>
                        Та системээс гарах гэж байна. Үнэхээр гарах уу?
                    </Text>
                    <TouchableOpacity
                    activeOpacity={1}
                        style={pressed?styles.DownyesButtonContainer:styles.yesButtonContainer}
                        onPress={() => onPressLogOut()}
                        onPressIn={()=>setPressed(true)}
                        onPressOut={()=>setPressed(false)}
                        >
                        <Text style={pressed?styles.DownyesText:styles.yesText}>Тийм</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
};
export default MoreHeader;
