import React from 'react';
import { SafeAreaView } from 'react-native';
import OnlineUserList from '../../../_Components/_home/homeUserListContainer/Index';
import MainHeader from '../../../_Headers/RoomListHeader/index';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';
import { socketPort } from '../../../Socket/Socket_i';
import { useDispatch } from 'react-redux';
import { setRoomData } from '../../../../reduxStore/reducer';
import { getRoomList, selectRoom } from '../../../Socket/Socket_Var';

const App = ({ navigation }) => {
    const dispatch = useDispatch();
    const searchUserRoom = async selectedUser => {
        const roomList = getRoomList();
        const roomInfo = roomList.find(element => {
            return (
                element.users.length === 2 &&
                element.users.findIndex(obj => obj.id === selectedUser.id) !== -1
            );
        });
        if (roomInfo > -1) {
            selectRoom(roomInfo);
            dispatch(setRoomData(roomInfo));
            navigation.navigate('More', {
                room_id: roomInfo._id,
            });
        } else {
            const user = await AsyncStorage.getItem('LoggedUser');
            const userData = JSON.parse(user);
            const users = [];
            users.push({
                id: selectedUser.id,
            });
            users.push({
                id: userData.userId,
            });
            const formData = [];
            formData.push({
                name: 'name',
                data: `${userData.userName},${selectedUser.system_name}`,
            });
            formData.push({ name: 'roomType', data: '0' });
            formData.push({ name: 'authorId', data: userData.userId.toString() });
            formData.push({ name: 'users', data: JSON.stringify(users) });
            formData.push({ name: 'isActive', data: '0' });
            selectRoom({ _id: 'newRoom', name: selectedUser.system_name, users: users });
            navigation.navigate('More');
            RNFetchBlob.config({
                trusty: true,
                // timeout: 8000,
            })
                .fetch(
                    'POST',
                    `${socketPort}api/rooms`,
                    {
                        'Content-Type': 'multipart/form-data',
                        'x-access-token': userData.accessToken,
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
                            authorId: userData.userId,
                            createdAt: Date.now(),
                            files: [],
                            hasNew: false,
                            isActive: true,
                            isHide: false,
                            isOnline: false,
                            lastMsgInfo: {},
                            name: `${userData.userName},${selectedUser.system_name}`,
                            path: selectedUser.user_icon,
                            updatedAt: Date.now(),
                            users: users,
                        };
                        selectRoom(newRoom);
                        dispatch(setRoomData(newRoom));
                    }
                });
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <MainHeader label={'Хэрэглэгчид'} navigation={navigation} />
            <OnlineUserList navigation={navigation} searchUserRoom={searchUserRoom} />
        </SafeAreaView>
    );
};

export default App;
