/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Animated,
    ActivityIndicator,
    TimePickerAndroid,
    Easing,
    Keyboard,
    requireNativeComponent,
} from 'react-native';
import styles from './Styles';
import { width5 } from '../../_global/able-soft-component-ui/src/assets/dimensions/width';

import {
    File,
    Gallery_img,
    links,
    urgent_msg,
    search,
} from '../../../utils/files/SvgFiles/more_detail_icons';
import { SvgXml } from 'react-native-svg';
import { squircle_fill } from '../../../utils/files/SvgFiles/moreHeaderIcon';
import {
    width13,
    width14,
    width15,
    width18,
    width100,
    width80,
} from '../../../utils/dimensions/width';
import { useSelector } from 'react-redux';
import { selectData } from '../../../../reduxStore/reducer';
import MoreChatSection from '../../../_Components/_more/moreChatSection';
import { getChatList, getMyData, getSelectedRoom } from '../../../Socket/Socket_Var';
import { RoomIcon } from '../../_global/roomIcon/index';
import { SearchBar } from '../../_global/SearchBar';
import { socketPort } from '../../../Socket/Socket_i';
import { isImageAcceptable, requesFetchNew } from '../../../../Gloabal/GlobalFunctions';
let onEndReachedCalledDuringMomentum = false;
let searchValue = null;
let userIds = '';
const Attachs = ({ navigation, attachShown = false }) => {
    let scrollView = null;
    const scroll = useRef(new Animated.Value(0)).current;
    const flatlist = useRef(new Animated.Value(0)).current;
    const roomUsers = useSelector(state => selectData(state, 'roomUsers'));
    const [isMoreFetching, setIsMoreFetching] = useState(false);
    const [loadingChatList, setLoadingChatList] = useState(true);
    const [hasNext, setHasNext] = useState(true);
    const [searchShown, showSearch] = useState(false);
    const [chatList, setChatlist] = useState([]);
    const fadeButton = useRef(new Animated.Value(0)).current;
    const searchInputXAxis = useRef(new Animated.Value(0)).current;
    const createButtonAxis = useRef(new Animated.Value(0)).current;
    const leftOutSide = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const input = useRef(null);
    const [topList, setTopList] = useState([
        {
            label: 'Бүгд',
            type: 'all',
            selected: false,
            id: 1,
            color: '#7b4a94',
            icon: Gallery_img('rgba(255,255,255,0.3)'),
            selectedicon: Gallery_img('#994CC1'),
            msgType: 'all',
        },
        {
            label: 'Линк',
            type: 'link',
            selected: false,
            id: 2,
            color: '#00716b',
            icon: links('rgba(255,255,255,0.3)'),
            selectedicon: links('#0EABA3'),
            msgType: 8,
        },
        {
            label: 'Файл',
            type: 'file',
            selected: true,
            id: 3,
            color: '#0E70B8',
            icon: File('rgba(255,255,255,0.3)'),
            selectedicon: File('#268CD6'),
            msgType: 1,
        },
        {
            label: 'Зураг',
            type: 'image',
            selected: false,
            id: 4,
            color: '#916104',
            icon: Gallery_img('rgba(255,255,255,0.3)'),
            selectedicon: Gallery_img('#D99A20'),
            msgType: 1,
        },
        {
            label: 'Ш/М',
            type: 'urgent',
            selected: false,
            id: 5,
            color: '#A63036',
            icon: urgent_msg('rgba(255,255,255,0.3)'),
            selectedicon: urgent_msg('#DE242D'),
            msgType: 14,
        },
    ]);

    useEffect(() => {
        if (attachShown) {
            searchValue = null;
            userIds = '';
            checkRoomHasData({ loadMore: false, type: 1, isImage: false });
        }
    }, [attachShown]);

    const checkRoomHasData = async ({
        loadMore = false,
        type = 1,
        isImage = false,
        searchVal = null,
        fromIds = null,
    }) => {
        const selectedRoom = getSelectedRoom();
        const room_id = selectedRoom._id;
        const userData = getMyData();
        let Url = `${socketPort}api/rooms/${room_id}/files?type=${isImage ? 1 : 0}`;
        if (type !== 1) {
            Url = `${socketPort}api/rooms/${room_id}?limit=20&type=${type}&isImage=${isImage}`;
        }
        if (type === 1 && fromIds !== null && fromIds !== '') {
            Url += `&fromId=${fromIds}`;
        }
        if (loadMore) {
            setIsMoreFetching(true);
            const lastMsgId = getChatList()[chatList.length - 1].msgs.createdAt;
            if (type !== 1) {
                Url += `&moreDate=${Date.parse(lastMsgId)}`;
            } else {
                Url += `&moreDate=${Date.parse(lastMsgId)}`;
            }
        } else {
            setChatlist([]);
            setLoadingChatList(true);
        }

        if (searchVal) {
            Url += `&fileName=${searchVal}`;
        }
        // console.log('Url',Url,type)

        requesFetchNew(Url, 'GET', userData.accessToken)
            .then(async responseJson => {
                setIsMoreFetching(false);
                setLoadingChatList(false);
                if (responseJson && responseJson.data) {
                    let list = { datas: [] };
                    if (type === 1) {
                        list.hasNext = responseJson.data.hasNext;
                        responseJson.data.datas.map(obj => {
                            list.datas.push({
                                msgs: obj.files.msg,
                            });
                        });
                    } else {
                        list = responseJson.data;
                    }
                    setHasNext(list.hasNext);
                    let newArray = list.datas;
                    const users = roomUsers;
                    newArray.map((msg, msgInd) => {
                        const seenUsers = [];
                        users.map(user => {
                            const prevMsg = newArray[msgInd + 1];
                            const seenDate = new Date(user.last_seen);
                            const prevDate = new Date(
                                prevMsg ? prevMsg.msgs.createdAt : msg.msgs.createdAt
                            );
                            const curDate = new Date(msg.msgs.createdAt);
                            if (prevDate < seenDate && curDate >= seenDate) {
                                seenUsers.push({
                                    uri: user.user_icon,
                                    id: user.id,
                                    name: user.system_name,
                                });
                            } else {
                                if (prevMsg && msgInd === 0) {
                                    if (seenDate > prevDate) {
                                        seenUsers.push({
                                            uri: user.user_icon,
                                            id: user.id,
                                            name: user.system_name,
                                            date: user.last_seen,
                                        });
                                    }
                                }
                            }
                        });
                        // console.log('seenUsers', seenUsers);
                        if (seenUsers.length > 0) {
                            seenUsers.map((item, index, array) => {
                                if (item.id === msg.msgs.from) {
                                    array.splice(index);
                                }
                            });
                            newArray[msgInd].msgs.seenUsers = seenUsers;
                        }
                    });
                    setHasNext(newArray.length > 0);
                    if (newArray.length > 0) {
                        if (loadMore) {
                            newArray = [...chatList, ...list.datas];
                            newArray = setFromImage(newArray, roomUsers, userData);
                        } else {
                            if (newArray.length > 0) {
                                if (users) {
                                    newArray = setFromImage(newArray, users, userData);
                                }
                            }
                        }
                    }
                    if (newArray.length > 0) {
                        setChatlist(newArray);
                    }
                    setIsMoreFetching(false);
                }
            })
            .catch(err => {
                setHasNext(false);
                console.log('err', err);
            });
    };
    const setFromImage = (array, arrayUsers, userData) => {
        if (array !== undefined) {
            try {
                array.map((item, index) => {
                    const prevItem = array[index - 1] !== undefined ? array[index - 1] : null;
                    const prevIndex = array[index - 1] !== undefined ? index - 1 : null;
                    const nextItem = array[index + 1] !== undefined ? array[index + 1] : null;
                    const nextIndex = array[index + 1] !== undefined ? index + 1 : 0;
                    if (
                        nextItem !== null &&
                        nextItem.msgs.from !== item.msgs.from &&
                        nextItem.msgs.from !== userData.userId
                    ) {
                        if (
                            nextItem.msgs.from !== undefined &&
                            nextItem.msgs.from !== null &&
                            arrayUsers
                        ) {
                            array = findAndSetUserIcon(array, arrayUsers, nextItem, nextIndex);
                        } else {
                            array[index].msgs.from_image = null;
                        }
                    }
                    if (
                        prevItem !== null &&
                        prevItem.msgs.from !== item.msgs.from &&
                        prevItem.msgs.from !== userData.userId
                    ) {
                        if (item.msgs.from && arrayUsers) {
                            array = findAndSetUserName(array, arrayUsers, prevItem, prevIndex);
                        } else {
                            array[index].msgs.from_name = null;
                        }
                    }
                });
                if (array[0].msgs.from !== userData.userId) {
                    array = findAndSetUserIcon(array, arrayUsers, array[0], 0);
                }
                const userLatest = arrayUsers.find(
                    from => from.id === array[array.length - 1].msgs.from
                );
                if (userLatest !== undefined) {
                    const prevInd = array.length - 2;
                    const lastInd = array.length - 1;
                    if (
                        array[prevInd] !== undefined &&
                        array[lastInd].msgs.from === array[prevInd].msgs.from
                    ) {
                        array[prevInd].msgs.from_image = undefined;
                    }
                    array[array.length - 1].msgs.from_image = userLatest.path;
                    array[array.length - 1].msgs.from_name = userLatest.system_name;
                }
                return array;
            } catch (error) {
                console.log('error', error);
            }
        }
    };
    const findAndSetUserIcon = (array, arrayUsers, item, index) => {
        const user = arrayUsers.find(from => {
            return parseInt(from.id, 10) === parseInt(item.msgs.from, 10);
        });
        if (user) {
            if (isImageAcceptable(user.user_icon)) {
                array[index].msgs.from_image = user.user_icon;
            } else {
                array[index].msgs.from_image = null;
            }
        }
        return array;
    };
    const findAndSetUserName = (array, arrayUsers, item, index) => {
        const user = arrayUsers.find(from => {
            return parseInt(from.id, 10) === parseInt(item.msgs.from, 10);
        });
        if (user) {
            array[index].msgs.from_name = user.system_name;
        }
        return array;
    };
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
                    toValue: -width100,
                    duration: 200,
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
                // input.current.focus();
                showSearch(true);
            });
        });
    };
    const animationHide = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
        }).start();
        Animated.timing(searchInputXAxis, {
            toValue: 0,
            duration: 0,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
        Keyboard.dismiss();
    };
    const TopRender = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setChatlist([]);
                    topList[index].selected = true;
                    topList.map((button, ind) => {
                        if (ind === index) {
                            button.selected = true;
                        } else {
                            button.selected = false;
                        }
                    });
                    if (item.type === 'all') {
                        checkRoomHasData({ loadMore: false, type: '1;8', isImage: false });
                    } else if (item.type === 'image') {
                        checkRoomHasData({ loadMore: false, type: item.msgType, isImage: true });
                    } else {
                        checkRoomHasData({ loadMore: false, type: item.msgType, isImage: true });
                    }
                    setTopList([...topList]);
                }}
                style={styles.topButtonContainer}>
                <Text style={[styles.labelText, { color: item.selected ? 'white' : '#5e6c76' }]}>
                    {item.label}
                </Text>
                <View style={styles.svgContainer}>
                    <SvgXml
                        style={{ marginTop: item.selected ? 12 : 10 }}
                        width={item.selected ? width18 : width15}
                        height={item.selected ? width18 : width15}
                        xml={squircle_fill(item.selected === true ? 'white' : item.color)}
                    />
                    <SvgXml
                        style={{ position: 'absolute' }}
                        width={width5}
                        height={width5}
                        xml={item.selected === true ? item.selectedicon : item.icon}
                    />
                </View>
                {item.selected && <View style={styles.CircleContainer} />}
            </TouchableOpacity>
        );
    };
    const renderItem = ({ item, index }) => {
        return (
            <MoreChatSection
                navigation={navigation}
                item={item.msgs}
                value={item}
                index={index}
                previtem={getChatList()[index - 1] !== undefined ? getChatList()[index - 1] : null}
                nextitem={getChatList()[index + 1] !== undefined ? getChatList()[index + 1] : null}
                scrollContainer={refContainer.current}
            />
        );
    };
    const renderHeader = () => {
        return isMoreFetching ? (
            <ActivityIndicator style={styles.headerLoadMoreStyle} size="large" color={'black'} />
        ) : null;
    };
    const refContainer = useRef(scrollView);

    const memoizedValue = useMemo(() => renderItem, [chatList]);
    return (
        <View style={styles.container}>
            <View style={styles.topButtonMain}>
                <FlatList
                    data={topList}
                    renderItem={TopRender}
                    // contentContainerStyle={styles.colorListContainer}
                    keyExtractor={item => item.id}
                    style={styles.topContainer}
                    horizontal={true}
                />
            </View>
            <View style={styles.bottomContainer}>
                {attachShown && (
                    <View style={styles.roomHeaderContainer}>
                        <View style={styles.roomHeaderNameIcon}>
                            <RoomIcon
                                width={40}
                                height={40}
                                roomIcon={getSelectedRoom().path}
                                isGroup={getSelectedRoom().roomType === 1}
                            />
                            <Text style={styles.roomNameText}>
                                {getSelectedRoom().name} - Хавсралтууд
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.searchButton}
                            onPress={() => {
                                animationStart();
                            }}>
                            <SvgXml width={width5} height={width5} xml={search('#919191')} />
                        </TouchableOpacity>
                        <SearchBar
                            left={searchInputXAxis}
                            fadeAnim={fadeAnim}
                            searchShown={searchShown}
                            hideSearchBar={() => animationHide()}
                            input={input}
                            searchValue={value => {
                                searchValue = value;
                                const type = topList.find(obj => obj.selected);
                                checkRoomHasData({
                                    loadMore: false,
                                    type: type.msgType,
                                    isImage: type.type === 'image',
                                    searchVal: value,
                                    fromIds: userIds,
                                });
                            }}
                            searchByUser={users => {
                                users.map(user => (userIds += `${user.user.id};`));
                                const type = topList.find(obj => obj.selected);
                                checkRoomHasData({
                                    loadMore: false,
                                    type: type.msgType,
                                    isImage: type.type === 'image',
                                    searchVal: searchValue,
                                    fromIds: userIds,
                                });
                            }}
                        />
                    </View>
                )}

                {loadingChatList && (
                    <ActivityIndicator style={styles.loaderStyle} size="large" color={'black'} />
                )}
                {attachShown && chatList.length > 0 && (
                    <Animated.FlatList
                        data={chatList}
                        renderItem={memoizedValue}
                        onEndReachedThreshold={0.1}
                        onMomentumScrollBegin={() => {
                            onEndReachedCalledDuringMomentum = false;
                        }}
                        onEndReached={async () => {
                            if (!loadingChatList && !onEndReachedCalledDuringMomentum && hasNext) {
                                if (getChatList().length > 10) {
                                    setIsMoreFetching(true);
                                    const type = topList.find(obj => obj.selected);
                                    await checkRoomHasData({
                                        loadMore: true,
                                        type: type.msgType,
                                        isImage: type.type === 'image',
                                        searchVal: searchValue,
                                        fromIds: userIds,
                                    });
                                }
                                onEndReachedCalledDuringMomentum = true;
                            }
                        }}
                        // removeClippedSubviews={true}
                        showsVerticalScrollIndicator={false}
                        inverted={true}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={renderHeader}
                        ref={refContainer}
                        // onScroll={handleScroll}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scroll } } }],
                            {
                                useNativeDriver: true,
                            }
                        )}
                        initialNumToRender={10}
                        scrollEventThrottle={16}
                        windowSize={10}
                        maxToRenderPerBatch={6}
                        contentContainerStyle={styles.contentContainer}
                    />
                )}
            </View>
        </View>
    );
};

export default Attachs;
