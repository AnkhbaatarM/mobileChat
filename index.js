/**
 * @format
 */
import React, { useEffect } from 'react';
import { AppRegistry, Alert, Platform, PermissionsAndroid } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import RNVoipCall from 'react-native-voip-call';
import RNCallKeep from 'react-native-callkeep';
import { Provider } from 'react-redux';
import store from './reduxStore/store';
import { enableScreens } from 'react-native-screens';
enableScreens();
function isJson(data) {
    try {
        return JSON.parse(data);
    } catch (e) {
        console;
        return false;
    }
}

function displayCallscreen(remoteMessage, body) {
    // console.warn('remoteMessage_body',remoteMessage)
    let callOptions = {
        callerId: body.channelName, // Important uuid must in this format
        ios: {
            phoneNumber: remoteMessage.notification.title, // Caller Mobile Number
            name: remoteMessage.notification.title + ' залгаж байна ...', // caller Name
            hasVideo: true,
        },
        android: {
            ringtuneSound: true, // defualt true
            ringtune: 'receive', // add file inside Project_folder/android/app/res/raw --Formats--> mp3,wav
            duration: 30000, // defualt 30000
            vibration: true, // defualt is true
            channel_name: remoteMessage.notification.title, //
            notificationId: remoteMessage.from,
            notificationTitle: 'AbleChat Video call',
            notificationBody: remoteMessage.notification.title + ' залгаж байна ...',
            answerActionTitle: 'Авах',
            declineActionTitle: 'Таслах',
        },
    };
    RNVoipCall.displayIncomingCall(callOptions)
        .then(data => {
            console.log(data);
        })
        .catch(e => console.log('displayIncomingCall', e));
}

function displayIncomingCall(remoteMessage, body) {
    RNCallKeep.displayIncomingCall(
        body.channelName,
        `${remoteMessage.notification.title} залгаж байна ...`,
        `${remoteMessage.notification.title} залгаж байна ...`,
        'number',
        true
    );
}

if (Platform.OS === 'ios') {
    RNCallKeep.setup = () => {
        const options = {
            ios: {
                appName: 'AbleChat',
                imageName: 'sim_icon',
                supportsVideo: false,
                maximumCallGroups: '1',
                maximumCallsPerCallGroup: '1',
            },
            android: {
                alertTitle: 'Permissions Required',
                alertDescription:
                    'This application needs to access your phone calling accounts to make calls',
                cancelButton: 'Cancel',
                okButton: 'ok',
                imageName: 'sim_icon',
                additionalPermissions: [PermissionsAndroid.PERMISSIONS.READ_CONTACTS],
            },
        };

        try {
            RNCallKeep.setup(options);
            RNCallKeep.setAvailable(true); // Only used for Android, see doc above.
            Alert.alert('callKeep_Success', 'success');
        } catch (err) {
            Alert.alert('callKeep_Erro', err.message);
        }
    };
}

messaging().setBackgroundMessageHandler(remoteMessage => {
    // setCallingVariable(remoteMessage.notification.body)
    // const body = isJson(remoteMessage.notification.body);
    // if(body.channelName !== undefined) {
    //     if(Platform.OS === 'ios') {
    //         displayIncomingCall(remoteMessage,body);
    //     } else {
    //         displayCallscreen(remoteMessage,body);
    //     }
    // }
    return Promise.resolve();
});

function HeadlessCheck({ isHeadless }) {
    useEffect(
        React.useCallback(() => {
            (async () => {
                console.log('registration', await messaging().registerDeviceForRemoteMessages());
            })();
        }, [])
    );
    if (isHeadless) {
        // App has been launched in the background by iOS, ignore
        return null;
    }
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
AppRegistry.registerComponent(appName, () => HeadlessCheck);
