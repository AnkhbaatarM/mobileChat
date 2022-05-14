import React, { useState, useRef, useEffect } from 'react';
import {
    Text,
    View,
    FlatList,
    Animated,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import MainHeader from '../../_Headers/RoomListHeader';
import { SocketIO, socketPort } from '@SocketCon/Socket_i';
import AsyncStorage from '@react-native-community/async-storage';
import UserIcon from '../../_Components/_global/roomIcon';
import DeviceInfo from 'react-native-device-info';
import { useSelector, useDispatch } from 'react-redux';
import { selectData, setRoomList, userAuth } from '../../../reduxStore/reducer';
import ListMenu from './List/index';
import { checkIcon } from './assets/index';
import { SvgXml } from 'react-native-svg';
let { roomListVariableUpdate } = require('@SocketCon/Socket_Var');
import RBSheet from 'react-native-raw-bottom-sheet';
import Modal from 'react-native-modal';
import { width12, width15, width3, width4 } from '../../utils/dimensions/width';
import { requesFetchNew, successToast,FetchURL } from '../../../Gloabal/GlobalFunctions';
import { setChatColor } from '../../Socket/Socket_Var';
import Toast from 'react-native-tiny-toast';
import { squircle_fill, squircle } from '../../utils/files/SvgFiles/moreHeaderIcon';
import {
    width20,
    width22,
    width30,
    width100,
} from '../../_Components/_global/able-soft-component-ui/src/assets/dimensions/width';
import { changeColorIcon, helpIcon, systemIcon } from './assets';
import { ScrollView } from 'react-native-gesture-handler';
import { log_out } from '../../utils/files/SvgFiles/moreHeaderIcon';
const styles = require('./Styles');
const RecyclerView = props => {
    const refRBSheet = useRef();
    const dispatch = useDispatch();
    const myData = useSelector(state => selectData(state, 'myData'));
    const userIcon = myData.userIcon + '&accessToken=' + myData.accessToken;
    const fadeSheetAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [active, setActive] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [userStatus, setUserStatus] = useState('');
    const [colorData, setColorData] = useState();
    const [change, setChange] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [selectedColor, setSlectedColor] = useState('#357FE5');
    const [logOutModal, showLogOutModal] = useState(false);

    const ProList = [
        {
            label: 'Өнгө солих',
            type: 'color',
            id: 1,
            link: null,
            color: '#357FE5',
            icon: changeColorIcon(),
        },
        {
            label: 'Тусламж',
            type: 'help',
            id: 2,
            link: 'https://web.able.mn/help/AbleChatApp',
            icon: helpIcon(),
        },
        {
            label: 'Системийн тухай',
            type: 'system',
            id: 3,
            link: 'https://store.able.mn/layer_chatApp',
            icon: systemIcon(),
        },
        {
            label: 'Гарах',
            type: 'logout',
            id: 4,
            link: null,
            icon: log_out('#919191'),
        },
    ];
    const [colorList, setColorList] = useState([
        { color: '#00BFA9', id: 1, selected: false },
        { color: '#357FE5', id: 2, selected: true },
        { color: '#933AE9', id: 3, selected: false },
        { color: '#F43744', id: 4, selected: false },
    ]);
    const logout = async () => {
        const user = await AsyncStorage.getItem('LoggedUser');
        const userData = JSON.parse(user);
        const fcmToken = await AsyncStorage.getItem('device_token');
        const uniqueID = DeviceInfo.getUniqueId();
        const body = {
            uniqueToken: uniqueID,
            firebaseToken: fcmToken,
        };
        fetch(socketPort+'api/tokens/'+userData.userId+'registrationToken'+fcmToken, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': userData.accessToken,
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            return response
        })
        .then(async data => {
            console.log('qweqweqwe', data.status) 
            if(data.status >= 200 && data.status < 300){
                SocketIO.disconnect();
                await AsyncStorage.setItem('LoggedUser', JSON.stringify([]));
                await AsyncStorage.setItem('isLoggedIn', '0');
                await AsyncStorage.setItem('Room_Lists', JSON.stringify([]));
                SocketIO.disconnect();
                dispatch(userAuth(false));
                roomListVariableUpdate([], myData.userId);
                dispatch(setRoomList([]));
                dispatch(userAuth(false));
            }
        }
            // this is the data we get after doing the delete request, do whatever you want with this data
        );
        
        // requesFetchNew(
        //     `${socketPort}api/tokens/${userData.userId}&registrationToken=${fcmToken}`,
        //     'DELETE',
        //     userData.accessToken,
        //     JSON.stringify(body)
        // ).then(async responseJson => {
        //     console.log(' garlaaaaaaa responseJson', responseJson);
        //     if (responseJson !== null) {
        //         SocketIO.disconnect();
        //         await AsyncStorage.setItem('LoggedUser', JSON.stringify([]));
        //         await AsyncStorage.setItem('isLoggedIn', '0');
        //         await AsyncStorage.setItem('Room_Lists', JSON.stringify([]));
        //         SocketIO.disconnect();
        //         dispatch(userAuth(false));
        //         roomListVariableUpdate([], myData.userId);
        //         dispatch(setRoomList([]));
        //         dispatch(userAuth(false));
        //     }
        // });
    };
    const getUserStatus = async () => {
        let LoggedUser = await AsyncStorage.getItem('LoggedUser');
        let getColor = await AsyncStorage.getItem('MyChatBgColor');
        const userData = JSON.parse(LoggedUser);
        requesFetchNew(
            `https://chatapi.able.mn:9000/api/users/userInfo?userId=${userData.userId},`,
            'GET',
            userData.accessToken
        ).then(responseJson => {
            if (responseJson !== null) {
                setUserStatus(responseJson.data[0].status);
            }
            colorList.map((item, index) =>
                getColor === item.color ? (item.selected = true) : (item.selected = false)
            );
        });
        getColor===null?setColorData('#357FE5'):setColorData(getColor);
    };
    useEffect(() => {
        getUserStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const SelectColor = async color => {
        await AsyncStorage.setItem('MyChatBgColor', color);
        setChatColor(color);
        Toast.show('Амжилттай хадгаллаа', successToast(2000));
    };
    const animationHide = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };
    const openSheet = () => {
        setActive(true);
        Animated.timing(fadeSheetAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
        refRBSheet.current.open();
    };
    const BeforeChangedColor = () => {
        colorList.map((item, index) =>
            colorData === item.color ? (item.selected = true) : (item.selected = false)
        );
    };
    const rowRenderer = ({ item, index }) => {
        return (
            <ListMenu
                item={item}
                index={index}
                openSheet={openSheet}
                color={colorData}
                logout={() => showLogOutModal(true)}
            />
        );
    };
    const colorListRender = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    colorList[index].selected = true;
                    colorList.map((item, ind) => {
                        if (ind === index) {
                            colorList[index].selected = true;
                        } else {
                            colorList[ind].selected = false;
                        }
                    });
                    setColorList([...colorList]);
                    setSlectedColor(item.color);
                    setChange(true);
                }}
                style={styles.colorCircleContainer}>
                <SvgXml
                    width={width20}
                    height={width20}
                    xml={squircle(item.selected === true ? item.color : 'white')}
                />
                <SvgXml
                    width={width15}
                    height={width15}
                    xml={squircle_fill(item.color)}
                    style={{ position: 'absolute', marginTop: width3 }}
                />
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={styles.containerStyle}>
            {active && (
                <TouchableWithoutFeedback
                    onPress={() => {
                        animationHide();
                        setActive(false);
                    }}>
                    <Animated.View
                        style={[
                            styles.sheetBackground,
                            {
                                opacity: fadeSheetAnim,
                            },
                        ]}
                    />
                </TouchableWithoutFeedback>
            )}
            <MainHeader
                label={'Профайл'}
                navigation={props.navigation}
                // logOutButton={true}
                onPressLogOut={logout}
            />
            <View style={styles.userDataContainer}>
                <UserIcon
                    backgroundColor={'white'}
                    gender={myData.gender}
                    roomIcon={userIcon}
                    width={width22}
                    height={width22}
                    center={true}
                />
                <Text style={styles.userName}>{myData.userName}</Text>
                <Text style={styles.position}>{myData.position}</Text>
                {userStatus === '' ? (
                    <View style={[styles.introContainer, { backgroundColor: '#e1e2e3' }]}>
                        <Text style={[styles.introText, { color: 'gray' }]}>
                            Статус оруулаагүй!
                        </Text>
                    </View>
                ) : (
                    <View style={[styles.introContainer, { elevation: active == false ? 1 : 0 }]}>
                        <Text style={styles.introText}>{userStatus}</Text>
                    </View>
                )}
            </View>
            <FlatList
                data={ProList}
                renderItem={rowRenderer}
                style={styles.menuContainer}
                keyExtractor={item => item.id}
            />
            <Modal
                onBackdropPress={() => showLogOutModal(false)}
                onBackButtonPress={() => showLogOutModal(false)}
                backdropOpacity={1}
                animationIn={'zoomIn'}
                animationOut={'zoomOut'}
                backdropColor={'rgba(16,48,84,0.9)'}
                isVisible={logOutModal}>
                <View style={styles.logOutModalContainer}>
                <Text style={styles.modalText}>
                        Та системээс гарах гэж{'\n'} байна. Үнэхээр гарах уу?
                    </Text>
                    <TouchableOpacity 
                    activeOpacity={1}
                    style={pressed?styles.DownyesButtonContainer:styles.yesButtonContainer} 
                    onPress={() => logout()}
                    onPressIn={()=>setPressed(true)}
                    onPressOut={()=>setPressed(false)}
                    >
                    <Text style={pressed?styles.DownyesText:styles.yesText}>Тийм</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <RBSheet
                ref={refRBSheet}
                openDuration={300}
                onClose={() => {
                    setChange(false);
                    setSheetOpen(true);
                    setActive(false);
                }}
                onOpen={() => {
                    setSheetOpen(true), BeforeChangedColor();
                }}
                closeOnDragDown={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'transparent',
                    },
                    container: {
                        backgroundColor: 'transparent',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        height: width100 + width30,
                    },
                    draggableIcon: {
                        backgroundColor: 'white',
                        width: width12,
                    },
                }}>
                <View style={styles.sheetContainer}>
                    <Text style={styles.titleText}>Өөрийн чатын арын өнгийг сонгох</Text>
                    <View style={styles.chatContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <UserIcon width={width12} height={width12} />
                            <View style={styles.graySection} />
                        </View>
                        {change ? (
                            <View style={[styles.mySection, { backgroundColor: selectedColor }]} />
                        ) : (
                            <View style={[styles.mySection, { backgroundColor: colorData }]} />
                        )}
                    </View>
                    {sheetOpen && (
                        <FlatList
                            data={colorList}
                            renderItem={colorListRender}
                            keyExtractor={item => item.id}
                            contentContainerStyle={{ alignItems: 'center', height: width30 }}
                            horizontal={true}
                        />
                    )}
                    <TouchableOpacity
                        activeOpacity={1}
                        style={
                            pressed
                                ? styles.downSelectButtonContainer
                                : styles.selectButtonContainer
                        }
                        onPress={() => {
                            SelectColor(selectedColor);
                            refRBSheet.current.close();
                            setColorData(selectedColor);
                        }}
                        onPressIn={() => setPressed(true)}
                        onPressOut={() => setPressed(false)}>
                        <SvgXml
                            width={width4}
                            height={width4}
                            xml={checkIcon(pressed ? '#4677b6' : 'white')}
                            style={styles.checkIconStyle}
                        />
                        <Text style={pressed ? styles.downSelectText : styles.selectText}>
                            Сонгох
                        </Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>
        </ScrollView>
    );
};

export default RecyclerView;
