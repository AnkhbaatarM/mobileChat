/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import StackScreen from './StackScreens';
import { AppState, Vibration, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { CallingVariable } from 'root/GlobalFunctions';
import { useNavigation } from '@react-navigation/native';
import * as RootNavigation from 'AbleChat/RootNavigation.js';
import RNCallKeep from 'react-native-callkeep';
import RNVoipCall from 'react-native-voip-call';

const App = () => {
    const navigation = useNavigation();
    const [appState, setAppState] = useState(AppState.currentState);
    const [videoCalling, setVideoCalling] = useState(false);
    const [vCallUrl, setvCallUrl] = useState('');
    const [videoCalldata, setVideoCallData] = useState(null);
    const ONE_SECOND_IN_MS = 1000;
    const PATTERN = [1 * ONE_SECOND_IN_MS, 2 * ONE_SECOND_IN_MS, 3 * ONE_SECOND_IN_MS];
    const hasUnsavedChanges = Boolean(true);
    React.useEffect(
        () =>
            navigation.addListener('beforeRemove', e => {
                if (!hasUnsavedChanges) {
                    // If we don't have unsaved changes, then we don't need to do anything
                    return;
                }

                // Prevent default behavior of leaving the screen
                e.preventDefault();

                // Prompt the user before leaving the screen
                Alert.alert(
                    'Discard changes?',
                    'You have unsaved changes. Are you sure to discard them and leave the screen?',
                    [
                        { text: "Don't leave", style: 'cancel', onPress: () => {} },
                        {
                            text: 'Discard',
                            style: 'destructive',
                            // If the user confirmed, then we dispatch the action we blocked earlier
                            // This will continue the action that had triggered the removal of the screen
                            onPress: () => navigation.dispatch(e.data.action),
                        },
                    ]
                );
            }),
        [navigation, hasUnsavedChanges]
    );

    const _handleAppStateChange = async nextAppState => {
        if (nextAppState === 'active') {
            console.log('foreground');
        } else {
            console.log('background');
        }
        setAppState(nextAppState);
    };

    useEffect(() => {
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
            <StackScreen />
        </>
    );
};

export default App;
