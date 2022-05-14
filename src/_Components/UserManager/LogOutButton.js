import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { requesFetchNew } from 'root/GlobalFunctions';
import { SocketIO, socketPort } from '@SocketCon/Socket_i';
import { useDispatch } from 'react-redux';
import { setRoomList, userAuth } from '../../../reduxStore/reducer';
let { roomListVariableUpdate } = require('@SocketCon/Socket_Var');

const Index = () => {
    const dispatch = useDispatch();

    const logout = async () => {
        let user = await AsyncStorage.getItem('LoggedUser');
        let parsedUser = JSON.parse(user);
        let fcmToken = await AsyncStorage.getItem('device_token');
        requesFetchNew(
            `${socketPort}LogOut?userId=${parsedUser.userId}&registrationToken=${fcmToken}`,
            'GET',
            parsedUser.accessToken
        ).then(async responseJson => {
            console.warn('log_out', responseJson);
            await AsyncStorage.setItem('LoggedUser', JSON.stringify([]));
            await AsyncStorage.setItem('isLoggedIn', '0');
            SocketIO.disconnect();
            roomListVariableUpdate([], parsedUser.userId);
            dispatch(setRoomList([]));
            dispatch(userAuth(false));
        });
    };
    return (
        <MaterialCommunityIcons
            onPress={() => logout()}
            style={{ alignSelf: 'center' }}
            name="logout-variant"
            size={30}
            color="gray"
        />
    );
};

export default Index;
