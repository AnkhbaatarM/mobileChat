/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    UIManager,
    View,
    Platform,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Navigation from './src/navigations/index';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import FastImage from 'react-native-fast-image';
import firebase from '@react-native-firebase/app';
import { ContextStateUpdated } from './src/Context/store';
import CodePush from 'react-native-code-push';
let codePushOptions = {
    deploymentKey:
        Platform.OS === 'ios'
            ? '0WajN7QY6Tzx_JlCfUgNDm8-zFeu7TqJAVOZv'
            : 'EejBsYWfNgbuNJ885h1MvjCedFYHMXkRmht-2',
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
    installMode: CodePush.InstallMode.IMMEDIATE,
    mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
};
let App = props => {
    const [token, setTokenValue] = useState('');
    const [loadingImage, showLoadingImage] = useState(true);

    async function requestUserPermission() {
        const settings = await messaging().requestPermission();

        if (settings) {
            console.log('Permission settings:', settings);
        }
    }
    console.log('date --->', new Date('2021-03-26T02:05:06.561+00:00').toLocaleString());

    async function requestPermission() {
        await firebase.messaging().registerDeviceForRemoteMessages();
        let authStatus = await firebase.messaging().hasPermission();
        if (authStatus !== firebase.messaging.AuthorizationStatus.AUTHORIZED) {
            authStatus = await firebase.messaging().requestPermission({
                alert: true,
                announcement: false,
                badge: true,
                carPlay: false,
                provisional: false,
                sound: true,
            });
        }
        try {
            await messaging().requestPermission();
            getToken();
        } catch (error) {
            alert('permission rejected');
        }
    }

    async function getToken() {
        let fcmToken = await AsyncStorage.getItem('device_token');
        if (!fcmToken) {
            let fcmToken = await messaging().getToken();
            setTokenValue(fcmToken);
            if (fcmToken) {
                console.log('FCM_TOKEN: ' + Platform.OS, fcmToken);
                await AsyncStorage.setItem('device_token', fcmToken);
            }
        } else {
            console.log('FCM_TOKEN: ' + Platform.OS, fcmToken);
            setTokenValue(fcmToken);
        }
    }

    useEffect(() => {
        if (Text.defaultProps == null) {
            Text.defaultProps = {};
        }
        Text.defaultProps.allowFontScaling = false;
        if (TextInput.defaultProps == null) {
            TextInput.defaultProps = {};
        }
        TextInput.defaultProps.allowFontScaling = false;
        checkIsLogged();
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
        registerAppWithFCM();
        requestUserPermission();
        requestPermission();
        // const unsubscribe = messaging().onMessage((remoteMessage) => {
        //   console.log('remoteMessage',remoteMessage);
        // });
        LoginAnimation();
        // return unsubscribe;
    }, []);

    const LoginAnimation = async () => {
        let login_anim = await AsyncStorage.getItem('login_anim');
        console.log('login_anim', login_anim);
        if (login_anim === '1') {
            showLoadingImage(false);
        } else {
            var timer = setInterval(function () {
                showLoadingImage(false);
                clearInterval(timer);
            }, 5000);
        }
        await AsyncStorage.setItem('login_anim', '1');
    };
    async function registerAppWithFCM() {
        await messaging().registerDeviceForRemoteMessages();
    }
    const checkIsLogged = async () => {
        await AsyncStorage.setItem('DomainAddress', 'https://www.able.mn/');
        NetInfo.addEventListener(handleConnectivityChange);
    };

    const handleConnectivityChange = async state => {
        if (state.isConnected) {
            await AsyncStorage.setItem('isConnected', 'Online');
        } else {
            await AsyncStorage.setItem('isConnected', 'Offline');
        }
    };
    const login = async () => {
        await new Promise(resolve => setTimeout(resolve, 3000));
        return true;
    };

    return (
        <ContextStateUpdated>
            {loadingImage ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: '#3b4353',
                    }}>
                    <FastImage
                        style={{ width: 240, height: 100, alignSelf: 'center' }}
                        source={require('utils_gif/Chat_intro.gif')}
                    />
                </View>
            ) : (
                <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
                    <Navigation />
                </SafeAreaView>
            )}
        </ContextStateUpdated>
    );
};
App = CodePush(codePushOptions)(App);

export default App;
