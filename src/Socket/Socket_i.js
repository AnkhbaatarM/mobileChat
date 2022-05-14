import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import { Keyboard, Vibration, AppState, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
    setChatList,
    selectData,
    setRoomImages,
    setRoomUsers,
    setRoomList,
    setOnlineUserList,
    setNewMsgCount,
    setSocketConnected,
} from '../../reduxStore/reducer';

export let SocketIO = null;
export let SocketVideo = null;
export let SocketConnected = false;
export let socketPort = 'https://chatapi.able.mn:9000/';
export const changeSocketPort = (value)=>{
    socketPort = value;
}
// export const socketPort=async()=>{
//   let DomainAddress = await AsyncStorage.getItem('DomainAddress');
//     if(DomainAddress==='nots.able.mn'){
//         return(
//             'https://chatapi.able.mn:9000/'
//         )
//     }else{
//         'https://nots.able.mn:9000/'
//     }
// };

import { decode, fileType } from '../../Gloabal/GlobalFunctions';
import VideoCallDial from 'components_directory/VideoCallDial';
import * as RootNavigation from 'AbleChat/RootNavigation.js';
import {
    updateChatList,
    updateOnlineUsers,
    roomListVariableUpdate,
    getSelectedRoom,
    getChatList,
    getMyData,
    selectRoom,
    getOnlineUsers,
    getRoomList,
    getMsgCount,
    setMsgCount,
} from './Socket_Var';
import { set } from '../utils/async';
var Sound = require('react-native-sound');
Sound.setCategory('Playback');

const ONE_SECOND_IN_MS = 1000;
const PATTERN = [1 * ONE_SECOND_IN_MS, 2 * ONE_SECOND_IN_MS, 3 * ONE_SECOND_IN_MS];
const rand = () => {
    return Math.random().toString(36).substr(2); // remove `0.`
};

const my_rand_token = () => {
    return rand() + rand(); // to make it longer
};
export function connectSocket(token, myHid, myComId, myUserName, dispatch) {
    if (typeof io === 'undefined') {
        console.log('io is undefined');
        return;
    }
    SocketIO = io.connect(socketPort, {
        'sync disconnect on unload': false,
        'connect timeout': 30000,
        pingTimeout: 30000,
        'force new connection': true,
        reconnect: true,
        secure: true,
        // transports: ['websocket'],
        query: `accessToken=${token}&myHID=${myHid}&comId=${myComId}&type=mobile&myUserName=${myUserName}&platForm=${
            Platform.OS
        }&my_socket_id=${my_rand_token()}`,
        transports: ['websocket'],
        forceNode: true,
    });

    SocketIO.on('error', function (reason) {
        console.log('Unable to connect IO', reason);
    });
    SocketIO.on('connect_failed', function () {
        console.log('IO Connection Failed');
    });
    SocketIO.on('reconnect_failed', function () {
        console.log('IO reconnection failed.');
    });
    SocketIO.on('reconnect', function () {
        console.warn('IO Reconnection successfully.');
        SocketConnected = true;
    });
    SocketIO.on('connect', function () {
        console.warn('IO Connection successfully.');
        dispatch(setSocketConnected(true));
        SocketConnected = true;
    });
    SocketIO.on('disconnect', function () {
        console.warn('IO Connection disconnect.');
        SocketConnected = false;
    });
    SocketIO.on('connect_error', function (reason) {
        console.warn('IO Connection error.', reason);
    });
}

export function connectCallProSocket() {
    if (typeof io === 'undefined') {
        console.log('io is undefined');
        return;
    }

    SocketVideo = io.connect('https://socket.callpro.mn', { path: '/able', secure: true });

    SocketVideo.on('error', function (reason) {
        console.log('Unable to connect SocketVideo', reason);
    });
    SocketVideo.on('connect_failed', function () {
        console.log('SocketVideo Connection Failed');
    });
    SocketVideo.on('reconnect_failed', function () {
        console.log('SocketVideo reconnection failed.');
    });
    SocketVideo.on('reconnect', function () {
        console.log('SocketVideo Reconnection successfully.');
    });
    SocketVideo.on('connect', function () {
        console.log('SocketVideo Connection successfully.');
    });
    SocketVideo.on('disconnect', function () {
        console.log('SocketVideo Connection disconnect.');
    });
    SocketVideo.on('connect_error', function (reason) {
        console.log('SocketVideo Connection error.', reason);
    });
}

export function sendSocket(to, datas) {
    console.log(to, datas);
    SocketIO.emit('send', to, datas);
}

export function sendCallProScocket(tag, data) {
    SocketVideo.emit(tag, data);
}
let timeOut = null;
const Socket = props => {
    const dispatch = useDispatch();
    // let roomList = useSelector(state => selectData(state, 'roomList'));
    // const chatList = useSelector(state => selectData(state, 'chatList'));
    // const myData = useSelector(state => selectData(state, 'myData'));
    // const onlineUserList = useSelector(state => selectData(state, 'onlineUserList'));
    // const roomImages = useSelector(state => selectData(state, 'roomImages'));
    // const roomUsers = useSelector(state => selectData(state, 'roomUsers'));
    const socketConnected = useSelector(state => selectData(state, 'socketConnected'));

    const [videoCalling, setVideoCalling] = useState(false);
    const [videoCalldata, setVideoCallData] = useState(null);
    const [vCallUser, setvCallUser] = useState({ path: '' });
    const appState = useRef(AppState.currentState);
    const [appStateVisible] = useState(appState.current);
    const vCall = new Sound('ringtone_vcall.wav', Sound.MAIN_BUNDLE);
    const RoomListSaveData = async list => {
        await set('Room_Lists', JSON.stringify(list));
    };

    //Socketoor data irsen ued barij awan state update hiih

    useEffect(() => {
        socketEmit();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketConnected]);

    const socketEmit = () => {
        if (SocketIO !== null) {
            //Shine chat/oroo ireh socket emit
            SocketIO.off('receive').on('receive', (room, fromID, data, image) => {
                const myData = getMyData();
                const roomImages = [];
                const selectedRoom = getSelectedRoom();
                const onlineUserList = getOnlineUsers();
                const roomList = getRoomList();
                const index = roomList.findIndex(obj => obj._id === room);
                if (index !== -1) {
                    if ((!selectedRoom || selectedRoom._id !== room) && !roomList[index].hasNew) {
                        let msgCount = getMsgCount();
                        msgCount += 1;
                        setMsgCount(msgCount);
                        dispatch(setNewMsgCount(msgCount));
                    }
                } else {
                    let msgCount = getMsgCount();
                    msgCount += 1;
                    setMsgCount(msgCount);
                    dispatch(setNewMsgCount(msgCount));
                }

                // console.log('recieve_irlee', selectedRoom._id);
                const whoosh = new Sound('./whoosh.wav', Sound.MAIN_BUNDLE);
                const DinDon = new Sound('buzz.wav', Sound.MAIN_BUNDLE);
                vCall.setNumberOfLoops(-1);
                DinDon.setNumberOfLoops(-1);
                whoosh.setNumberOfLoops(-1);
                whoosh.setPan(1);
                const msg = data.message;
                //Dind don sound
                if (data.msg_type === 4) {
                    DinDon.play();
                }
                if (selectedRoom !== null && selectedRoom._id === room) {
                    //Hereglegch ali neg orooruu orson ued tuhain oroonii chatnii listend data nemeh
                    updateRoomChatList(fromID, data);
                    if (timeOut) {
                        clearTimeout(timeOut);
                        timeOut = null;
                    } else {
                        if (fromID !== myData.userId) {
                            timeOut = setTimeout(
                                () =>
                                    sendSocket(room, {
                                        imSeen: true,
                                        userId: myData.userId,
                                        user_icon: myData.userIcon,
                                    }),
                                2000
                            );
                        }
                    }

                    switch (data.msg_type) {
                        case 1: //Orson baigaa oroonii hereglegchid deer shine hun nemsen ued
                            if (data.files) {
                                let newImages = [];
                                data.files.map((item, index) => {
                                    if (fileType(item.name, item.mimetype) === 'image') {
                                        newImages = [...[{ files: item }], ...roomImages];
                                    }
                                });
                                dispatch(setRoomImages(newImages));
                            }
                            break;
                        case 7: //Orson baigaa oroonii hereglegchid deer shine hun nemsen ued
                            if (fromID !== myData.userId) {
                                var res = msg.split(':$option$:');
                                const users = JSON.parse(res[1]);
                                selectedRoom.users = [...users, ...selectedRoom.users];
                                selectRoom(selectedRoom);
                            }
                            break;
                        case 9: //Orson baigaa oroonii hereglegchidees hun hassan ued herev namaig hassan bol oroonoos shuud garah
                            var res = msg.split(':$option$:');
                            const userData = JSON.parse(res[1]);
                            if (userData.id === myData.userId) {
                                const roomIndex = selectedRoom._id.findIndex(
                                    obj => obj._id === room
                                );
                                if (roomIndex !== -1) {
                                    roomList.splice(roomIndex, 1);
                                    RootNavigation.replace('Home');
                                }
                            }
                            break;
                    }
                }
                // Niit oroonii jigsaaltan deer oroo nemeh mon last_msg shine irsen msg-r shinechleh
                SocketReceive(room, fromID, data);
            });
            SocketIO.off('deleteMsg').on('deleteMsg', (roomId, userId, data) => {
                const myData = getMyData();
                const selectedRoom = getSelectedRoom();
                const roomList = getRoomList();
                const chatList = getChatList();
                const index = roomList.findIndex(room => room._id === roomId);
                if (index !== -1) {
                    roomList[index].lastMsgInfo = data.lastMsgInfo;
                    roomListVariableUpdate(roomList, myData.userId);
                    if (selectedRoom !== null && selectedRoom._id === roomId) {
                        const msgInd = chatList.findIndex(msg => msg.msgs._id === data.msgId);
                        if (msgInd !== -1) {
                            chatList[msgInd] = {
                                msgs: { ...chatList[msgInd].msgs, ...{ isdelete: 1 } },
                            };
                            updateChatList(chatList);
                            dispatch(setRoomList(roomList));
                            dispatch(setChatList(chatList));
                        }
                    } else {
                        dispatch(setRoomList(roomList));
                    }
                }
            });
            //Oroonii chatiig hereglegchid harsan ued
            SocketIO.off('seen').on('seen', (room, fromID, data) => {
                const chatList = getChatList();
                const myData = getMyData();
                const selectedRoom = getSelectedRoom();
                if (
                    selectedRoom !== null &&
                    selectedRoom._id === room &&
                    fromID.toString() !== myData.userId.toString()
                ) {
                    const userData = selectedRoom.users.find(roomUser => roomUser.id === fromID);
                    if (userData) {
                        const seenUserData = {
                            uri: userData.user_icon,
                            name: userData.system_name,
                            id: fromID,
                        };
                        chatList.map((chat, index) => {
                            if (chat.msgs.seenUsers) {
                                const userEx = chat.msgs.seenUsers.findIndex(
                                    seenUser => seenUser.id.toString() === fromID.toString()
                                );
                                if (userEx !== -1) {
                                    const array = [...chat.msgs.seenUsers];
                                    array.splice(userEx, 1);
                                    chatList[index] = {
                                        msgs: {
                                            ...chat.msgs,
                                            ...{ seenUsers: array },
                                        },
                                    };
                                }
                            }
                        });
                        if (chatList.length > 0) {
                            if (chatList[0].msgs.seenUsers) {
                                const array = [...chatList[0].msgs.seenUsers];
                                array.push(seenUserData);
                                chatList[0] = {
                                    msgs: { ...chatList[0].msgs, ...{ seenUsers: array } },
                                };
                            } else {
                                chatList[0] = {
                                    msgs: { ...chatList[0].msgs, ...{ seenUsers: [seenUserData] } },
                                };
                            }
                        }
                    }
                    updateChatList(chatList);
                    dispatch(setChatList(chatList));
                }
            });
            SocketIO.off('userStatus').on('userStatus', (id, status, data) => {
                const onlineUserList = getOnlineUsers();
                const selectedRoom = getSelectedRoom();
                try {
                    if (data) {
                        const index = onlineUserList.findIndex(obj => obj.id === id);
                        const users = [...onlineUserList];
                        if (index !== -1) {
                            if (!status) {
                                users.splice(index, 1);
                            }
                        } else if (index === -1 && status) {
                            users.unshift(data);
                        }
                        if (selectedRoom === null) {
                            updateOnlineUsers(users);
                            dispatch(setOnlineUserList(users));
                        }
                    }
                } catch (error) {
                    console.log('online_user_error', error);
                }
            });

            // SocketIO.off('written').on('written', (room, fromID, data) => {
            //     if (
            //         selectedRoom !== null &&
            //         selectedRoom._id.toString() === room.toString() &&
            //         fromID.toString() !== state.myData.userId.toString()
            //     ) {
            //         const writingRoom = {
            //             room: room,
            //             typing: data.isTyping,
            //         };
            //         dispatch({ type: SET_USER_TYPING, list: writingRoom });
            //     }
            // });
        }
    };

    const SocketReceive = (room, fromID, data) => {
        const myData = getMyData();
        let roomList = getRoomList();
        const selectedRoom = getSelectedRoom();
        const msg = data.message; //encodelogdsin msg-g decode hiih
        //Sihne oroo esvel huuchin baigaa oroo esehiig shalgah
        const index = roomList.findIndex(roomObj => roomObj._id.toString() === room.toString());
        //Tuhain oroond chat bichsen hun bi mon esehiig shalgaj shine msgnii toog nemeh mon videoChatnii tsonh gargah
        if (myData.userId !== fromID) {
            if (data.msg_type !== 4 && msg !== 4) {
                const whoosh = new Sound('./whoosh.wav', Sound.MAIN_BUNDLE);
                whoosh.setNumberOfLoops(-1);
                whoosh.setPan(1);
                // whoosh.play();
            }
        }
        switch (data.msg_type) {
            case 3: //Oroonii ner solih
                var res = msg.split(':$option$:');
                index !== -1 ? (roomList[index].name = res[1]) : null;
                break;
            case 5: //Oroonii zurag solih
                var res = msg.split(':$option$:');
                index !== -1 ? (roomList[index].path = data.changedPath) : null;
                break;
            case 7: //Oroonii hereglegchid deer shineer hun nemeh
                var res = msg.split(':$option$:');
                const users = JSON.parse(res[1]);
                index !== -1
                    ? (roomList[index].users = [...users, ...roomList[index].users])
                    : null;
                break;
            case 9: //Oroonii hereglegchidees hun hasah
                var res = msg.split(':$option$:');
                const spliceUser = JSON.parse(res[1]);
                if (spliceUser.id === myData.userId) {
                    index !== -1 ? roomList.splice(index, 1) : null;
                }
                break;
        }
        let roomName = data.name;
        if (data.roomType !== 1 && data.users) {
            const user = data.users.find(obj => obj.id !== myData.userId);
            roomName = user.system_name;
        }
        let hasNew = true;
        if (myData.userId !== fromID) {
            hasNew = true;
        } else {
            hasNew = false;
        }
        if (selectedRoom && selectedRoom._id === room) {
            hasNew = false;
        }
        const newObj = {
            _id: room,
            isOnline: true,
            files: data.files,
            name: roomName,
            lastMsgInfo: {
                createdAt: Date.now(),
                lastFrom: fromID,
                lastMsg: data.message,
                lastMsgType: data.msg_type,
            },
            path: data.path.includes('accessToken=e')
                ? data.path
                : `${data.path}&accessToken=${myData.accessToken}`,
            hasNew: hasNew,
            date: Date.now(),
            users: data.users ? data.users : [],
            roomType: data.roomType,
        };
        if (index !== -1) {
            if (index > 0) {
                const list = [...roomList];
                newObj.path = list[index].path;
                list[index] = newObj;
                const roomUpdated = list[index];
                list.splice(index, 1);
                roomList = [...[roomUpdated], ...list];
            } else {
                const list = [...roomList];
                newObj.path = list[index].path;
                list[index] = newObj;
                roomList = list;
            }
        } else {
            //Jigsaaltand baigaa oroonuud deer shineer oroo nemeh
            var newArray = [];
            if (data.users !== undefined) {
                data.users.map(item => {
                    newArray.push({ id: item[0], system_name: item[1], path: item[2] });
                });
            }
            roomList = [...[newObj], ...roomList];
            RoomListSaveData(roomList);
        }
        if (selectedRoom === null) {
            dispatch(setRoomList(roomList));
        }
        roomListVariableUpdate(roomList, myData.userId);
    };
    const updateRoomChatList = (fromID, data) => {
        const myData = getMyData();
        if (data.files) {
            let newImages = [];
            data.files.map((item, index) => {
                if (item.is_image) {
                    newImages = [...[{ files: item }], ...roomImages];
                }
            });
            dispatch(setRoomImages(newImages));
        }
        if (fromID === myData.userId && data.tmpId) {
            const myChats = [...getChatList()];
            const tmpIndex = myChats.findIndex(obj => obj.msgs.tmpId === data.tmpId); // Minii hiimeleer uusgesen buyu tmp chat esehiig shalgah
            if (data.tmpId && tmpIndex !== -1) {
                // Tmp chatnii id-g solig tmpId-g ustgah msg-g encodloson msg-r solih
                myChats[tmpIndex] = {
                    msgs: {
                        _id: data._id,
                        createdAt: data.createdAt,
                        files: data.files,
                        from: fromID,
                        from_image: myChats[tmpIndex].msgs.from_image,
                        msg: data.message,
                        msg_type: data.msg_type,
                        tmpId: undefined,
                        replyMsg: data.replyMsg,
                        replyFiles: data.replyFiles,
                        replyMsgType: data.replyMsgType,
                        replyFrom: data.replyFrom,
                        replyId: data.replyId,
                    },
                };
                updateChatList(myChats);
                dispatch(setChatList(myChats));
            }
        } else {
            const selectedRoom = getSelectedRoom();
            let from_image = null;
            let from_name = null;
            const myChats = [...getChatList()];
            if (myChats.length > 0 && myChats[0].msgs.from === fromID) {
                from_image = myChats[0].msgs.from_image;
                myChats[0] = {
                    msgs: { ...myChats[0].msgs, ...{ from_image: undefined } },
                };
            } else {
                const sender = selectedRoom.users.find(
                    obj => obj.id.toString() === fromID.toString()
                );
                if (sender) {
                    from_name = sender.system_name;
                    from_image = sender.user_icon;
                }
            }

            if (selectedRoom.users.length <= 2 && myData.userId.toString() !== fromID.toString()) {
                myChats.map(msg => (msg.msgs.seenUsers = []));
            }
            const newChatObj = {
                msgs: {
                    _id: data._id,
                    msg: data.message,
                    from: fromID,
                    createdAt: new Date().toISOString(),
                    msg_type: data.msg_type,
                    from_image: from_image,
                    from_name: from_name,
                    files: data.files,
                    seenUsers: [],
                    replyMsg: data.replyMsg,
                    replyFiles: data.replyFiles,
                    replyMsgType: data.replyMsgType,
                    replyFrom: data.replyFrom,
                    replyId: data.replyId,
                },
            };
            const newList = [...[newChatObj], ...myChats];
            updateChatList(newList);
            dispatch(setChatList(newList));
        }
    };
    const openVideoCallWindow = (list, room, fromID, data) => {
        let i = list.findIndex(user => user._id === room);
        const index = i !== -1 ? list[i].users.findIndex(item => item.id === fromID) : -1;
        if (index !== -1) {
            setvCallUser(list[i].users[index]);
        }
        var msg = decode(data.message);
        msg = JSON.parse(msg);
        msg._id = room;
        setVideoCallData(msg);
        Vibration.vibrate(PATTERN, true);
        Keyboard.dismiss();
        vCall.play(success => {
            if (success) {
                console.log('video call audio');
            } else {
                console.log('playback failed due to video call audio decoding errors');
            }
        });
        setVideoCalling(true);
    };
    const enterVcall = async body => {
        const loggedUser = await AsyncStorage.getItem('LoggedUser');
        const userData = JSON.parse(loggedUser);
        setVideoCalling(false);
        const data = body === undefined ? videoCalldata : body;
        sendSocket(data._id, {
            message: 'Видео дуудлага ирсэн',
            msg_type: 10,
            isGroup: false,
            files: null,
            date: new Date(),
        });
        Vibration.cancel();
        vCall.stop();
        if (data.isGroup !== undefined && data.isGroup !== null && data.isGroup === true) {
            null;
            // Linking.openURL(vCallUrl);
        } else {
            RootNavigation.navigate('VideoConfAgora', {
                channelName: data.channelName,
                channelToken: data.channelToken,
                appId: data.appId,
                userId: userData.userId,
                hash: data.hash,
                startType: 'join',
                videoType: data.videoType,
            });
        }
    };
    const hideComp = () => {
        sendSocket(videoCalldata._id, {
            message: 'Видео дуудлага ирсэн',
            msg_type: 2,
            isGroup: false,
            files: null,
            date: new Date(),
        });
        Vibration.cancel();
        setVideoCalling(false);
        vCall.stop();
    };

    return (
        <>
            {videoCalling && appStateVisible === 'active' && (
                <VideoCallDial enterVcall={enterVcall} vCallUser={vCallUser} hideComp={hideComp} />
            )}
        </>
    );
};

export default Socket;
