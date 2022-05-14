/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import MainHeader from '../../../_Headers/RoomListHeader';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import RecyclerList from '../../../_Components/_home/homeRoomListContainer/Index';
import { socketPort } from '../../../Socket/Socket_i';
import { CommonActions } from '@react-navigation/native';
import { DeviceEventEmitter } from 'react-native';
import styles from './Styles';
import RNFetchBlob from 'rn-fetch-blob';
import { useSelector, useDispatch } from 'react-redux';
import { selectData, setChatList, setRoomUsers, setRoomData } from '../../../../reduxStore/reducer';
import { selectRoom, getSelectedRoom, updateChatList } from '../../../Socket/Socket_Var';
const App = ({ navigation }) => {
    const dispatch = useDispatch();
    const myData = useSelector(state => selectData(state, 'myData'));
    const [search, setSearch] = useState('');
    PushNotification.configure({
        onNotification: function (notification) {
            if (notification !== null && notification !== undefined) {
                console.log('notification_opened', notification);
                const newRoom = {
                    _id: notification.data._id,
                    date: Date.now(),
                    hasNew: false,
                    isOnline: true,
                    lastMsgInfo: {
                        createdAt: Date.now(),
                        lastFrom: notification.data.sender_id,
                    },
                    room_icon: '',
                    path:
                        notification.data.roomIcon !== ''
                            ? notification.data.roomIcon
                            : notification.data.largeIcon,
                    roomType: notification.data.roomIcon !== '' ? 1 : 0,
                    msg_type: 0,
                    name: notification.data.groupName,
                    room_id: notification.data.roomId,
                    users: [],
                };
                selectRoom(newRoom);
                const selectedRoom = getSelectedRoom();
                if (selectedRoom && selectedRoom._id !== newRoom._id) {
                    enterRoom(newRoom, true);
                } else {
                    enterRoom(newRoom, false);
                }
            }
        },
    });
    useEffect(() => {
        DeviceEventEmitter.addListener('accept', () => {
            console.warn('shine_videoo');
        });
        DeviceEventEmitter.addListener('reject', () => {
            console.warn('tasalaaa');
        });
        DeviceEventEmitter.addListener('fir_msg', msg => {
            console.warn('fir_msg', msg);
        });

        messaging().onNotificationOpenedApp(remoteMessage => {
            if (remoteMessage !== null && remoteMessage !== undefined) {
                const newRoom = {
                    _id: remoteMessage.data._id,
                    date: Date.now(),
                    hasNew: false,
                    isOnline: true,
                    lastMsgInfo: {
                        createdAt: Date.now(),
                        lastFrom: remoteMessage.data.sender_id,
                    },
                    msg_type: 0,
                    name: remoteMessage.notification.title,
                    room_icon: '',
                    path:
                        remoteMessage.data.roomIcon !== ''
                            ? remoteMessage.data.roomIcon
                            : remoteMessage.data.largeIcon,
                    roomType: remoteMessage.data.roomIcon !== '' ? 1 : 0,
                    room_id: remoteMessage.data.roomId,
                    users: [],
                };
                selectRoom(newRoom);
                const selectedRoom = getSelectedRoom();
                if (selectedRoom && selectedRoom._id !== newRoom._id) {
                    enterRoom(newRoom, true);
                } else {
                    enterRoom(newRoom, false);
                }
            }
        });
    }, []);

    const enterRoom = (newRoom, insideRoom) => {
        updateChatList([]);
        if (insideRoom) {
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'Home' },
                    {
                        name: 'More',
                        params: { notifyOpen: newRoom._id, roomData: newRoom },
                    },
                ],
            });
        } else {
            navigation.navigate({
                name: 'More',
                params: { notifyOpen: newRoom._id, roomData: newRoom },
            });
        }
        dispatch(setRoomData(newRoom));
        dispatch(setChatList([]));
        dispatch(setRoomUsers([]));
    };
    const searchUserRoom = async selectedUser => {
        const users = [{ id: myData.userId }];
        users.push({
            id: selectedUser.id,
        });
        const formData = [];
        formData.push({
            name: 'name',
            data: `${myData.userName},${selectedUser.system_name}`,
        });
        formData.push({ name: 'roomType', data: '0' });
        formData.push({ name: 'authorId', data: myData.userId.toString() });
        formData.push({ name: 'users', data: JSON.stringify(users) });
        formData.push({ name: 'isActive', data: '0' });
        selectRoom({ _id: 'newRoom', name: selectedUser.system_name, users: users });
        dispatch(setRoomData({ _id: 'newRoom', name: selectedUser.system_name, users: users }));
        dispatch(setChatList([]));
        dispatch(setRoomUsers([]));
        navigation.navigate('More');
        RNFetchBlob.config({
            trusty: true,
        })
            .fetch(
                'POST',
                `${socketPort}api/rooms`,
                {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': myData.accessToken,
                    Accept: 'application/json',
                },
                formData
            )
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson !== null && responseJson.code !== 500) {
                    let roomExist = {};
                    roomExist = responseJson.data;
                    const newRoom = {
                        _id: roomExist._id,
                        authorId: myData.userId,
                        createdAt: Date.now(),
                        files: [],
                        hasNew: false,
                        isActive: true,
                        isHide: false,
                        isOnline: false,
                        lastMsgInfo: {},
                        name: `${myData.userName},${selectedUser.system_name}`,
                        path: selectedUser.user_icon,
                        updatedAt: Date.now(),
                        users: users,
                    };
                    // dispatch({ type: SET_SELECTED_USERS, list: [] });
                    selectRoom(newRoom);
                    dispatch(setRoomData(newRoom));
                }
            });
    };
    const searchRoom = text => {
        setSearch(text);
    };
    return (
        <SafeAreaView style={styles.containerStyle}>
            <MainHeader
                label={'Өрөөнүүд'}
                showCreateRoom={true}
                navigation={navigation}
                searchRoom={searchRoom}
            />
            <RecyclerList navigation={navigation} searchUserRoom={searchUserRoom} search={search} />
        </SafeAreaView>
    );
};

export default App;
