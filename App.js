/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,
    UIManager,
    View,
    Dimensions,
    Platform,
    Text,
    TextInput,
    StyleSheet,
    ImageBackground,
    Animated,
    Easing,
} from 'react-native';
import Navigation from './src/navigations/index';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import FastImage from 'react-native-fast-image';
import firebase from '@react-native-firebase/app';
import { ContextStateUpdated } from './src/Context/store';
import CodePush from 'react-native-code-push';
import { enableScreens } from 'react-native-screens';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { width36 } from './src/utils/dimensions/width';
import Snowing from './src/_Components/_global/Animations/Snowing';
import {
    width10,
    width30,
    width50,
} from './src/_Components/_global/able-soft-component-ui/src/assets/dimensions/width';
import { changeSocketPort, socketPort } from './src/Socket/Socket_i';

let codePushOptions = {
    deploymentKey:
        Platform.OS === 'ios'
            ? '0WajN7QY6Tzx_JlCfUgNDm8-zFeu7TqJAVOZv'
            : 'EejBsYWfNgbuNJ885h1MvjCedFYHMXkRmht-2',
    checkFrequency: CodePush.CheckFrequency.ON_APP_START,
    installMode: CodePush.InstallMode.IMMEDIATE,
    mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
};
let App = () => {
    const [loadingImage, showLoadingImage] = useState(true);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim2 = useRef(new Animated.Value(0)).current;

    async function requestUserPermission() {
        const settings = await messaging().requestPermission();

        if (settings) {
            console.log('Permission settings:', settings);
        }
    }

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
            console.log('permission rejected');
        }
    }

    async function getToken() {
        let fcmToken = await AsyncStorage.getItem('device_token');
        if (!fcmToken) {
            fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log('FCM_TOKEN: ' + Platform.OS, fcmToken);
                await AsyncStorage.setItem('device_token', fcmToken);
            }
        } else {
            console.log('FCM_TOKEN: ' + Platform.OS, fcmToken);
        }
    }
    useEffect(() => {
        CheckDomain();
        enableScreens();
        if (Text.defaultProps == null) {
            Text.defaultProps = {};
        }
        Text.defaultProps.allowFontScaling = false;
        if (TextInput.defaultProps == null) {
            TextInput.defaultProps = {};
        }
        TextInput.defaultProps.allowFontScaling = false;
        checkIsLogged();
        if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
        registerAppWithFCM();
        requestUserPermission();
        requestPermission();
        // animationAppear();
        animationHide();
        animationAppear2();
        // LoginAnimation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
const CheckDomain=async()=>{
    let DomainAddress = await AsyncStorage.getItem('DomainAddress');
        if(DomainAddress==='nots.able.mn'){
            changeSocketPort('https://nots.able.mn/');
        }
}
    const LoginAnimation = async () => {
        var timer = setInterval(function () {
            showLoadingImage(false);
            clearInterval(timer);
        }, 5000);
        setTimeout(() => {
            animationHide();
        }, 5000);
        setTimeout(() => {
            startAnimation(1);
        }, 5000);
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
    const startAnimation = toValue => {
        Animated.timing(animatedValue, {
            toValue: -width36,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };
    const animationHide = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };
    const animationAppear2 = () => {
        Animated.timing(fadeAnim2, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => {
            showLoadingImage(false);
        });
    };
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            {loadingImage && (
                <FastImage
                    style={styles.backgroundImage}
                    source={require('./src/utils/files/images/chat_BG.jpeg')}>
                    <FastImage
                        style={styles.imageStyle}
                        source={require('utils_gif/chat-intro-white.gif')}
                    />
                </FastImage>
            )}
            <Navigation />
            {/* <Snowing snowflakesStyle={{ color: '#13a1ed' }} /> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    rootStyle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        // position:'absolute'
        // backgroundColor: '#3b4353',
    },
    imageStyle: {
        width: width30,
        height: width30,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    navigationContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'transparent',
        // zIndex:1
        // backgroundColor: 'white',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
});

App = CodePush(codePushOptions)(App);

export default App;
