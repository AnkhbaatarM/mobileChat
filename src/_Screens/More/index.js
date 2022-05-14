/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    SafeAreaView,
    ActivityIndicator,
    TouchableOpacity,
    AppState,
    Keyboard,
    View,
    TextInput,
    Animated,
} from 'react-native';
import MoreChatSection from '../../_Components/_more/moreChatSection';
import {
    player,
    requesFetchNew,
    isImageAcceptable,
    fileType,
    mkEasySeparteDate,
} from '../../../Gloabal/GlobalFunctions';
import AsyncStorage from '@react-native-community/async-storage';
import { SocketIO, socketPort, sendSocket } from '../../Socket/Socket_i';
import HeaderChatMore from '../../_Headers/HeaderChatMore/index';
import MessageSection from '../../_Components/_more/moreMessageSection';
import { SvgXml } from 'react-native-svg';
import { down_arrow } from '../../utils/files/SvgFiles/more_chat';
import { useSelector, useDispatch } from 'react-redux';
import {
    setChatList,
    selectData,
    setRoomImages,
    setRoomUsers,
    setRoomList,
} from '../../../reduxStore/reducer';
import messaging from '@react-native-firebase/messaging';
let { updateChatList, selectRoom } = require('../../Socket/Socket_Var');
import { chatList, roomList, getSelectedRoom, getChatList } from '../../Socket/Socket_Var';
import { useIsDrawerOpen } from '@react-navigation/drawer';

const styles = require('./Styles');
let onEndReachedCalledDuringMomentum = false;
let displayedDate = '';
let isNewMsg = false;

const center = { alignSelf: 'center' };
const ChatMore = ({ route, navigation }) => {
    const isDrawerOpen = useIsDrawerOpen();
    const appState = useRef(AppState.currentState);
    const dispatch = useDispatch();
    const roomImages = useSelector(state => selectData(state, 'roomImages'));
    let reduxChatList = useSelector(state => selectData(state, 'chatList'));
    const roomData = useSelector(state => selectData(state, 'roomData'));
    const roomUsers = useSelector(state => selectData(state, 'roomUsers'));
    const roomFiles = useSelector(state => selectData(state, 'roomFiles'));
    const myData = useSelector(state => selectData(state, 'myData'));
    const [isMoreFetching, setIsMoreFetching] = useState(false);
    const [loadingChatList, setLoadingChatList] = useState(true);
    const [hasNext, setHasNext] = useState(true);
    const [replyMsg, setReplyMsg] = useState(null);
    const input = useRef();
    const lastMsg = useRef();
    const scroll = useRef(new Animated.Value(0)).current;
    const HEADER_MAX_HEIGHT = 160; // blue
    const HEADER_MIN_HEIGHT = 70; // red
    const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT; // green
    const translateHeader = scroll.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, +HEADER_SCROLL_DISTANCE],
        extrapolate: 'clamp',
    });
    const translateHeaderText = Animated.multiply(translateHeader, -2);

    const onViewableItemsChanged = ({ viewableItems }) => {
        const dates = viewableItems.map(item => {
            return new Date(item.item.msgs.createdAt);
        });
        const minDate = new Date(Math.min.apply(null, dates));
        const displayDate = mkEasySeparteDate(minDate);
        if (displayedDate !== displayDate) {
            input.current.setNativeProps({ text: displayDate });
            displayedDate = displayDate;
        }
    };

    const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);
    let scrollView = null;
    const refContainer = useRef(scrollView);
    const renderItem = ({ item, index }) => {
        return (
            <MoreChatSection
                navigation={navigation}
                item={item.msgs}
                value={item}
                index={index}
                previtem={getChatList()[index - 1] !== undefined ? getChatList()[index - 1] : null}
                nextitem={getChatList()[index + 1] !== undefined ? getChatList()[index + 1] : null}
                deleteChat={deleteChat}
                scrollContainer={refContainer.current}
                displayedDate={displayedDate}
                setReplyMsg={obj => setReplyMsg(obj)}
            />
        );
    };
    // useEffect(() => {
    //     if (getChatList() && getChatList().length > 0) {
    //         if (lastMsgValue !== getChatList()[0].msgs.msg) {
    //             if (isNewMsg) {
    //                 lastMsgValue = chatList[0].msgs.msg;
    //                 lastMsg.current.setNativeProps({ text: chatList[0].msgs.msg });
    //             }
    //             isNewMsg = true;
    //         }
    //     }
    // }, [reduxChatList]);

    useEffect(() => {
        if (roomData) {
            console.log('roomData', roomData._id);
        }
        isNewMsg = false;
        displayedDate = '';
        const selectedRoom = getSelectedRoom();
        if (selectedRoom) {
            const room_id = selectedRoom._id;
            setLoadingChatList(true);
            if (room_id && room_id !== 'newRoom') {
                if (roomList && roomList.length > 0) {
                    const roomInfo = roomList.find(obj => obj._id === room_id);
                    if (roomInfo) {
                        selectRoom(roomInfo);
                    }
                }
                requestAnimationFrame(() => {
                    dispatch(setRoomUsers([]));
                    checkRoomHasData(room_id);
                });
            }
        }
        return () => {
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
            AppState.removeEventListener('change', _handleAppStateChange);
            if (player._playing) {
                player.release();
            }
            requestAnimationFrame(() => {
                updateChatList([]);
                dispatch(setRoomList(roomList));
            });
        };
    }, [roomData]);

    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 100,
    };

    useEffect(() => {
        AppState.addEventListener('change', _handleAppStateChange);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
        return () => {
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
            AppState.removeEventListener('change', _handleAppStateChange);
            if (player._playing) {
                player.release();
            }
            requestAnimationFrame(() => {
                updateChatList([]);
                dispatch(setRoomUsers([]));
                dispatch(setRoomList(roomList));
            });
        };
    }, []);

    const _keyboardDidHide = () => {
        Keyboard.dismiss();
    };

    const _handleAppStateChange = nextAppState => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!');
            // getRoomLatestData();
        }
        appState.current = nextAppState;
    };

    const RoomSaveData = async list => {
        const selectedRoom = getSelectedRoom();
        await AsyncStorage.setItem(
            `Room_Msgs?room_id=${selectedRoom._id}&userId=${myData.userId}`,
            JSON.stringify(list)
        );
    };

    const setRoomFiles = (files, fileArray, imageArray) => {
        files.map(file => {
            const fileObj = {
                files: {
                    _id: file.fileId,
                    is_image: true,
                    mimetype: file.mimetype,
                    name: file.name,
                    path: file.path,
                    size: file.size,
                },
            };
            if (fileType(file.name) === 'image') {
                const imageEx = imageArray.findIndex(
                    image =>
                        image.files.name === fileObj.files.name &&
                        fileObj.files.size === image.files.size
                );
                if (imageEx === -1) {
                    imageArray.push(fileObj);
                }
            } else if (fileType(file.name) === 'file') {
                const fileEx = fileArray.findIndex(image => image.files._id === fileObj.files._id);
                if (fileEx === -1) {
                    // fileArray.push(fileObj);
                }
            }
        });
    };

    const checkRoomHasData = async (room_id, loadMore) => {
        const LoggedUser = await AsyncStorage.getItem('LoggedUser');
        const userData = JSON.parse(LoggedUser);
        let Url = `${socketPort}api/rooms/${room_id}?limit=20`;
        if (loadMore) {
            setIsMoreFetching(true);
            const lastMsgId = getChatList()[chatList.length - 1].msgs.createdAt;
            Url += `&createdAt=${Date.parse(lastMsgId)}`;
        } else {
            setLoadingChatList(true);
        }
        requesFetchNew(Url, 'GET', userData.accessToken)
            .then(async responseJson => {
                setIsMoreFetching(false);
                setLoadingChatList(false);
                if (responseJson && responseJson.data) {
                    const list = responseJson.data;
                    const users = loadMore ? roomUsers : list.users;
                    setHasNext(list.hasNext);
                    if (users) {
                        const index = users.findIndex(
                            obj => obj.id.toString() === userData.userId.toString()
                        );
                        if (index !== -1) {
                            // roomUsers.splice(index, 1);
                        }
                    }
                    let imageArray = [...roomImages];
                    let fileArray = [...roomFiles];
                    let newArray = list.datas;
                    newArray.map((msg, msgInd) => {
                        if (msg.msgs.files && msg.msgs.files.length > 0) {
                            setRoomFiles(msg.msgs.files, fileArray, imageArray);
                        }
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
                            newArray = [...reduxChatList, ...list.datas];
                            newArray = setFromImage(newArray, roomUsers, userData);
                        } else {
                            if (SocketIO) {
                                sendSocket(room_id, {
                                    imSeen: true,
                                    userId: myData.userId,
                                    user_icon: myData.userIcon,
                                });
                            }
                            if (users) {
                                dispatch(setRoomUsers(users));
                            }
                            if (newArray.length > 0) {
                                if (users) {
                                    newArray = setFromImage(newArray, users, userData);
                                }
                            }
                        }
                    }
                    if (newArray.length > 0) {
                        updateChatList(newArray);
                        dispatch(setChatList(newArray));
                    }
                    dispatch(setRoomImages(imageArray));
                    setIsMoreFetching(false);
                }
            })
            .catch(err => {
                setHasNext(false);
                console.log('err', err);
            });
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

    const renderHeader = () => {
        return isMoreFetching ? (
            <ActivityIndicator style={styles.headerLoadMoreStyle} size="large" color={'black'} />
        ) : null;
    };

    const deleteChat = (msgId, index) => {
        const selectedRoom = getSelectedRoom();
        sendSocket(selectedRoom._id, {
            deleteMsg: true,
            msgId: msgId,
            deleteType: 'msg',
        });
        chatList[index] = {
            msgs: { ...chatList[index].msgs, ...{ isdelete: 1 } },
        };
        updateChatList(chatList);
        dispatch(setChatList(chatList));
    };

    const memoizedValue = useMemo(() => renderItem, [reduxChatList]);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <HeaderChatMore navigation={navigation} dateValue={displayedDate} />
            {loadingChatList ? (
                <ActivityIndicator style={styles.loaderStyle} size="large" color={'black'} />
            ) : isDrawerOpen ? null : (
                <Animated.FlatList
                    data={reduxChatList}
                    renderItem={memoizedValue}
                    onEndReachedThreshold={0.1}
                    onMomentumScrollBegin={() => {
                        onEndReachedCalledDuringMomentum = false;
                    }}
                    onEndReached={async () => {
                        if (!loadingChatList && !onEndReachedCalledDuringMomentum && hasNext) {
                            if (chatList.length > 10) {
                                const selectedRoom = getSelectedRoom();
                                setIsMoreFetching(true);
                                await checkRoomHasData(selectedRoom._id, true);
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
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }], {
                        useNativeDriver: true,
                    })}
                    initialNumToRender={10}
                    scrollEventThrottle={16}
                    windowSize={10}
                    maxToRenderPerBatch={6}
                    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                    viewabilityConfig={viewabilityConfig}
                    contentContainerStyle={styles.contentContainer}
                />
            )}
            <SafeAreaView style={styles.stickyDateContainer}>
                <TextInput editable={false} ref={input} style={styles.stickyDateText} />
            </SafeAreaView>
            <MessageSection
                scrollView={refContainer}
                navigation={navigation}
                replyMsg={replyMsg}
                setReplyMsg={obj => setReplyMsg(obj)}
                room_id={getSelectedRoom() ? getSelectedRoom()._id : null}
            />
            <Animated.View
                style={[
                    styles.scrollContainer,
                    { transform: [{ translateY: translateHeaderText }] },
                ]}>
                <TouchableOpacity
                    onPress={() => {
                        lastMsg.current.setNativeProps({ text: '' });
                        refContainer.current.scrollToOffset({ animated: true, offset: 0 });
                    }}
                    style={styles.scrollButton}>
                    <SvgXml style={center} width={15} height={15} xml={down_arrow()} />
                    <TextInput
                        scrollEnabled={false}
                        editable={false}
                        ref={lastMsg}
                        style={styles.scrollText}
                        numberOfLines={1}
                        ellipsizeMode={'end'}
                        textAlign={'left'}
                        allowFontScaling={false}
                    />
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
};
export default ChatMore;
