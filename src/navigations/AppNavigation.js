/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import StackScreen from './StackScreen';
import { AppState, Vibration, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Socket, { connectSocket, socketPort } from '../Socket/Socket_i';
import { requesFetchNew, CallingVariable } from '../../Gloabal/GlobalFunctions';
import { useNavigation } from '@react-navigation/native';
import * as RootNavigation from 'AbleChat/RootNavigation.js';
import RNCallKeep from 'react-native-callkeep';
import RNVoipCall from 'react-native-voip-call';
import { selectData, setMyData, setOnlineUserList } from '../../reduxStore/reducer';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

const { updateOnlineUsers, setMyDataVar } = require('../Socket/Socket_Var');
const App = () => {
    const dispatch = useDispatch();
    const myData = useSelector(state => selectData(state, 'myData'));
    const navigation = useNavigation();
    const [appState, setAppState] = useState(AppState.currentState);
    const [videoCalling, setVideoCalling] = useState(false);
    const [vCallUser, setvCallUser] = useState({ path: '' });
    const [vCallUrl, setvCallUrl] = useState('');
    const [videoCalldata, setVideoCallData] = useState(null);
    var list = [];
    const ONE_SECOND_IN_MS = 1000;

    const PATTERN = [1 * ONE_SECOND_IN_MS, 2 * ONE_SECOND_IN_MS, 3 * ONE_SECOND_IN_MS];

    const RoomSaveData = async roomList => {
        await AsyncStorage.setItem(`Room_List?userId=${myData.userId}`, JSON.stringify(roomList));
    };

    const _handleAppStateChange = async nextAppState => {
        setAppState(nextAppState);
    };
    useEffect(() => {
        setUserData();
        AppState.addEventListener('change', _handleAppStateChange);
        RNCallKeep.addEventListener('answerCall', onAnswerCallAction);
        RNVoipCall.onCallAnswer(async data => {
            RNVoipCall.stopRingtune();
            // const body = JSON.parse(data.callerId)
            const body = JSON.parse(CallingVariable);
            setVideoCallData(body);
            enterVcall(body);
            if (appState === 'active') {
                RNVoipCall.endAllCalls();
            }
        });
        RNVoipCall.onCallNotificationOpen(event => {
            RNVoipCall.stopRingtune();
            // const body = JSON.parse(data.callerId)
            const body = JSON.parse(CallingVariable);
            setVideoCallData(body);
            enterVcall(body);
            if (appState === 'active') {
                RNVoipCall.endAllCalls();
            }
        });
        return () => {
            AppState.removeEventListener('change', _handleAppStateChange);
            RNCallKeep.removeEventListener('answerCall', onAnswerCallAction);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onAnswerCallAction = data => {
        const body = JSON.parse(CallingVariable);
        setVideoCallData(body);
        enterVcall(body);
        if (appState === 'active') {
            RNVoipCall.endAllCalls();
        }
        RNCallKeep.endAllCalls();
        RNCallKeep.endCall(body.channelName);
    };

    const setUserData = async () => {
        const user = await AsyncStorage.getItem('LoggedUser');
        const MyProfile = await AsyncStorage.getItem('MyProfile');
        const userData = JSON.parse(user);
        if (MyProfile) {
            const userProfile = JSON.parse(MyProfile);
            userData.userIcon = userProfile[0].photo;
            userData.com_name = userProfile[0].com_name;
        }
        await AsyncStorage.setItem('LoggedUser', JSON.stringify(userData));
        await dispatch(setMyData(userData));
        setMyDataVar(userData);
        connectSocket(
            userData.accessToken,
            userData.userId,
            userData.companyId,
            userData.userName,
            dispatch
        );
        requesFetchNew(
            `${socketPort}api/users/online?comId=${userData.companyId}`,
            'GET',
            userData.accessToken,
            null
        ).then(responseJson => {
            if (responseJson !== null) {
                const userList = responseJson.data.datas;
                const index = userList.findIndex(
                    obj => obj.id.toString() === userData.userId.toString()
                );
                if (index !== -1) {
                    userList.splice(index, 1);
                }
                updateOnlineUsers(userList);
                dispatch(setOnlineUserList(userList));
            }
        });
    };
    const enterVcall = async body => {
        let user = await AsyncStorage.getItem('LoggedUser');
        let parsedUser = JSON.parse(user);
        setVideoCalling(false);
        const data = body === undefined ? videoCalldata : body;
        Vibration.cancel();
        if (data.isGroup !== undefined && data.isGroup !== null && data.isGroup === true) {
            Linking.openURL(vCallUrl);
        } else {
            RootNavigation.navigate('VideoConfAgora', {
                channelName: data.channelName,
                channelToken: data.channelToken,
                appId: data.appId,
                userId: parsedUser.userId,
                hash: data.hash,
                startType: 'join',
                videoType: data.videoType,
            });
        }
    };
    return (
        <>
            {myData && <StackScreen />}
            <Socket />
        </>
    );
};

export default App;
