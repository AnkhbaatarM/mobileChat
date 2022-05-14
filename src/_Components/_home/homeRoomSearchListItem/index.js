import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RoomIcon from 'components_directory/_global/roomIcon';
import { SELECT_ROOM, UPDATE_CHAT_LIST } from 'context_constants/more';
import FastImage from 'react-native-fast-image';
import { decode, isImageAcceptable } from '../../../../Gloabal/GlobalFunctions';
import { useSelector, useDispatch } from 'react-redux';
import { selectData, setNewMsgCount, setRoomData } from '../../../../reduxStore/reducer';
let { roomList, sendSocket, updateChatList, selectRoom } = require('../../../Socket/Socket_Var');

var styles = require('./Styles');
export const UserItems = ({ navigation, item }) => {
    const myData = useSelector(state => selectData(state, 'myData'));
    const newMsgCount = useSelector(state => selectData(state, 'newMsgCount'));

    const dispatch = useDispatch();

    const updateItem = room_id => {
        if (room_id !== undefined) {
            const index = roomList.findIndex(obj => obj.room_id === room_id);
            if (index !== -1) {
                sendSocket(room_id, {
                    imSeen: true,
                    userId: myData.userId,
                    user_icon: myData.userIcon,
                });
                const roomData = roomList[index];
                if (newMsgCount > 0 && roomData.hasNew) {
                    newMsgCount - 1;
                }
                selectRoom(roomList[index]);
                dispatch(setRoomData(roomList[index]));
                roomList[index].hasNew = false;
                navigation.navigate('More', {
                    room_id: room_id,
                });
            }
        } else {
            searchUserRoom(item);
        }
    };

    const searchUserRoom = searchData => {
        let selectedUser = roomList.findIndex(element => {
            return (
                element.users.length === 2 &&
                element.users.findIndex(obj => obj.id === searchData.id) !== -1
            );
        });
        if (selectedUser > -1) {
            selectRoom(roomList[selectedUser]);
            dispatch(setRoomData(roomList[selectedUser]));
            navigation.navigate('More', {
                room_id: roomList[selectedUser].room_id,
            });
        } else {
            var users = [
                {
                    id: searchData.id,
                    name: searchData.system_name,
                    path: searchData.photo,
                    mobile: searchData.mobile,
                },
                {
                    id: myData.userId,
                    name: myData.userName,
                    path: myData.userIcon,
                    mobile: myData.mobile,
                },
            ];
            let room_icon = '';
            if (users.length === 2) {
                const user = users.find(userData => userData.id !== myData.userId);
                if (user) {
                    room_icon = isImageAcceptable(user.path);
                }
            }
            var newRoom = {
                _id: 'newRoom',
                date: Date.now(),
                hasNew: false,
                isOnline: true,
                last_msg: '',
                msg_type: 0,
                name: item.system_name,
                path: '',
                room_id: 'newRoom',
                room_icon: room_icon,
                users: users,
            };
            selectRoom(newRoom);
            dispatch({ type: SELECT_ROOM, list: newRoom });
            dispatch({ type: UPDATE_CHAT_LIST, list: [] });
            updateChatList([]);
            navigation.navigate('More', { room_id: 'newRoom' });
        }
    };
    if (item.title) {
        return (
            <View style={styles.stickyHeader}>
                <Text style={[styles.stickyTitle, { color: item.color }]}>{item.title}</Text>
            </View>
        );
    } else {
        return (
            <>
                <TouchableOpacity
                    onPress={() => updateItem(item.room_id)}
                    style={styles.safeAreaView}>
                    <View style={styles.userStatus}>
                        {item.name !== undefined ? (
                            <RoomIcon width={50} height={50} item={item} />
                        ) : (
                            <FastImage
                                style={styles.userIcon}
                                source={{
                                    uri:
                                        item.photo !== undefined && item.photo.includes('http')
                                            ? item.photo
                                            : '',
                                }}
                            />
                        )}
                        {item.isOnline ? <View style={styles.activeView} /> : null}
                        <View style={styles.userContainer}>
                            <Text numberOfLines={1} style={styles.userName}>
                                {item.name !== undefined ? item.name : item.system_name}
                            </Text>
                            {item.app_name !== undefined && (
                                <View style={styles.app_nameConatiner}>
                                    <Text numberOfLines={1} style={styles.app_nameBlock}>
                                        [
                                    </Text>
                                    <Text numberOfLines={1} style={styles.app_name}>
                                        {item.app_name}
                                    </Text>
                                    <Text numberOfLines={1} style={styles.app_nameBlock}>
                                        ]
                                    </Text>
                                </View>
                            )}
                            {item.users !== undefined && item.users.length > 2 && (
                                <View style={styles.app_nameConatiner}>
                                    <Text numberOfLines={1} style={styles.app_name}>
                                        {item.users.map((user, index) => {
                                            if (index < 2) {
                                                return user.name + ', ';
                                            }
                                        })}
                                    </Text>
                                    <Text numberOfLines={1} style={styles.app_nameBlock}>
                                        {' '}
                                        +{item.users.length - 2}
                                    </Text>
                                </View>
                            )}
                            {item.users !== undefined && item.users.length === 2 && (
                                <Text
                                    numberOfLines={1}
                                    style={[styles.app_name, { color: 'gray', marginLeft: 5 }]}>
                                    {decode(item.last_msg)}
                                </Text>
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        );
    }
};
