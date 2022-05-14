import React, { useState } from 'react';
import {
    View,
    Linking,
    TouchableOpacity,
    Text,
    TouchableHighlight,
    SafeAreaView,
} from 'react-native';
import MainHeaderMore from './components/MainHeaderMore/index';
import styles from './Styles';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';
import { sendSocket } from '@SocketCon/Socket_i';
import io from 'socket.io-client';
import FastImage from 'react-native-fast-image';
import IconFeather from 'react-native-vector-icons/Feather';
import { RoomIcon } from '../../_Components/_global/roomIcon';
import Modal from 'react-native-modal';
import RtcEngine from 'react-native-agora';
import HeaderStickyDate from './components/stickyDateRow/stickyDateRow';
import { selectData } from '../../../reduxStore/reducer';
import { useSelector } from 'react-redux';
import { getSelectedRoom } from '../../Socket/Socket_Var';
import { socketPort } from '../../Socket/Socket_i';

var engine = null;
var socket = null;
var intervalID;
const iconStyle = { alignSelf: 'center' };
const HeaderChatMore = ({ navigation, dateValue }) => {
    const myData = useSelector(state => selectData(state, 'myData'));
    const [isShowModal, showModal] = useState(false);
    var [callTime, setCallTime] = useState(0);
    const [channelName, setChannelName] = useState(null);
    const selectedRoom = getSelectedRoom();
    const startVideo = async () => {
        const selectedRoom = getSelectedRoom();
        let members = [];
        let user = await AsyncStorage.getItem('LoggedUser');
        let parsedUser = JSON.parse(user);
        selectedRoom.users.map(user =>
            members.push({
                userId: user.id,
                userName: '' + user.name,
                avatarUrl: '',
                isJoin: false,
            })
        );
        const body = JSON.stringify({
            hostId: selectedRoom.room_id,
            members: members,
        });
        console.warn('body', body);
        RNFetchBlob.config({
            trusty: true,
            timeout: 5000,
        })
            .fetch(
                'POST',
                `${socketPort}/create`,
                {
                    'Content-Type': 'application/json',
                },
                body
            )
            .then(result => result.json())
            .then(responseJson => {
                if (responseJson.message === 'success') {
                    let roomId = responseJson.roomId;
                    const msg = {
                        groupChat: true,
                        url: `https://develop.able.mn:8001/join/${roomId}/${parsedUser.accessToken}`,
                    };
                    sendSocket(selectedRoom._id, {
                        message: JSON.stringify(msg),
                        msg_type: 4,
                        files: null,
                        date: new Date(),
                    }); // file ywuulsanii daraa msg ywuulah heseg
                    Linking.openURL(
                        `https://develop.able.mn:8001/join/${roomId}/${parsedUser.accessToken}`
                    );
                } else {
                    console.log('room create error');
                }
            });
    };
    const startSipAudioCall = async () => {
        const body = JSON.stringify({
            type: 'web',
            name: 'erdenebileg@able.mn',
            password: 'password123',
        });
        showModal(true);
        socket = io.connect('https://socket.callpro.mn', {
            path: '/able',
            secure: true,
        });
        RNFetchBlob.config({
            trusty: true,
            timeout: 5000,
        })
            .fetch(
                'POST',
                'https://api.callpro.mn/v1/login',
                {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'PZlwA8U9I55R5yCxSTNzc12qJ6cTy0aeai391Cuk',
                },
                body
            )
            .then(result => result.json())
            .then(responseJson => {
                console.warn('login_response', responseJson);
                const sipCallPro = responseJson.result;
                const bodyToken = JSON.stringify({
                    callToken: sipCallPro.callToken,
                    type: 'sip',
                    destination: '99409513',
                    video: 0,
                });
                RNFetchBlob.config({
                    trusty: true,
                    timeout: 5000,
                })
                    .fetch(
                        'POST',
                        'https://api.callpro.mn/v1/call',
                        {
                            'Content-Type': 'application/json',
                            'X-Api-Key': 'PZlwA8U9I55R5yCxSTNzc12qJ6cTy0aeai391Cuk',
                        },
                        bodyToken
                    )
                    .then(result => result.json())
                    .then(responseJson => {
                        console.warn('call_response', responseJson);
                        const channelName = responseJson.channelName.toString();
                        const channelToken = responseJson.channelToken;
                        setChannelName(channelName);
                        showModal(true);
                        socket.on('connect', socket => {
                            // socket.emit('room', responseJson.channelName);
                        });
                        socket.emit('room', responseJson.channelName);
                        socket.on('message', async function (msg) {
                            if (msg.type == 'answer') {
                                engine = await RtcEngine.create(responseJson.appId);
                                if (engine !== null) {
                                    await engine.enableVideo();
                                    engine?.joinChannel(
                                        channelToken,
                                        channelName,
                                        null,
                                        myData.userId
                                    );
                                }
                                intervalID = setInterval(() => {
                                    // console.warn('callTime', callTime)
                                    callTime = callTime + 1;
                                    setCallTime(callTime);
                                }, 1000);
                            }
                            if (msg.type == 'bye') {
                                //leave room & disconnect
                                socket.emit('leave', msg.channelName);
                                socket.disconnect();
                                endCall();
                            }
                        });
                        var data = {
                            channelName: responseJson.channelName,
                            type: 'call',
                            hash: responseJson.hash,
                        };
                        socket.emit('message', JSON.stringify(data));
                    });
            });
    };
    const startSipVideoCall = async videoType => {
        const selectedRoom = getSelectedRoom();
        const roomPath = selectedRoom.path + '?accessToken=' + myData.accessToken;
        const roomUsers = selectedRoom.users;
        console.warn(roomPath, roomUsers);
        if (roomUsers.length > 2) {
            navigation.navigate('VideoConfAgoraGroup', {
                userId: myData.userId,
                roomId: selectedRoom.room_id,
                startType: 'create',
                videoType: videoType,
                roomPath: roomPath,
                roomUsers: JSON.stringify(roomUsers),
            });
        } else {
            navigation.navigate('VideoConfAgora', {
                userId: myData.userId,
                roomId: selectedRoom.room_id,
                startType: 'create',
                videoType: videoType,
                roomPath: roomPath,
                roomUsers: JSON.stringify(roomUsers),
            });
        }
    };
    const secondsToMinute = s => {
        return (s - (s %= 60)) / 60 + (s > 9 ? ':' : ':0') + s;
    };
    const endCall = () => {
        if (socket !== null) {
            socket.emit('leave', channelName);
            socket.disconnect();
            clearInterval(intervalID);
            if (engine !== null) {
                engine?.leaveChannel();
            }
        }
        clearInterval(intervalID);
        setCallTime(0);
        showModal(false);
    };
    return (
        <View style={styles.container}>
            <MainHeaderMore navigation={navigation} more={true} />
            <HeaderStickyDate dateValue={dateValue} />
            <TouchableHighlight
                onPress={() => {
                    navigation.openDrawer();
                }}
                style={styles.moreIconContainer}
                underlayColor={'transparent'}>
                <IconFeather style={styles.moreIcon} name="more-vertical" size={30} color="gray" />
            </TouchableHighlight>
            {/* <View
                style={{
                    alignSelf: 'center',
                    width: 80,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    position: 'absolute',
                    right: 5,
                }}>
                <TouchableOpacity
                    onPress={() => {
                        if (selectedRoom.users.length > 2) {
                            startVideo();
                        } else {
                            startSipVideoCall('audio');
                        }
                    }}
                    style={styles.iconStyle}>
                    <SvgXml
                        style={styles.iconStyle}
                        fill={'gray'}
                        width={18}
                        height={18}
                        xml={audio_call('gray')}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (selectedRoom.users.length > 2) {
                            startSipVideoCall('video');
                        } else {
                            startSipVideoCall('video');
                        }
                    }}
                    style={styles.iconStyle}>
                    <SvgXml
                        style={styles.iconStyle}
                        fill={'gray'}
                        width={24}
                        height={24}
                        xml={video_call('gray')}
                    />
                </TouchableOpacity>
            </View> */}
            <Modal avoidKeyboard={true} isVisible={isShowModal}>
                <View style={styles.callWindow}>
                    <RoomIcon
                        width={40}
                        height={40}
                        roomIcon={selectedRoom && selectedRoom.path ? selectedRoom.path : ''}
                        isGroup={
                            selectedRoom && selectedRoom.roomType ? selectedRoom.roomType === 1 : ''
                        }
                    />
                    <Text style={styles.modalHeader}>{'99409513'}</Text>
                    {callTime > 0 ? (
                        <Text style={styles.modalBody}>{secondsToMinute(callTime)}</Text>
                    ) : (
                        <FastImage
                            style={styles.loadingImage}
                            source={require('./assets/loadingCall.gif')}
                        />
                    )}
                    <TouchableOpacity onPress={() => endCall()} style={styles.modalButton}>
                        {/* <SvgXml style={styles.iconStyle} width={18} height={18} xml={Voice_call('white')} /> */}
                        <IconFeather style={iconStyle} name="phone-off" size={18} color="white" />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};
export default HeaderChatMore;
