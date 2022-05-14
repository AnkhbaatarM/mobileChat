/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Platform, UIManager, Alert } from 'react-native';
import {
    Login,
    TwoFactorAuthentication,
} from '../../../_Components/_global/able-soft-component-ui';
import { AUTHENTICATE_USER } from 'context_constants/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { set, get } from '../../../utils/async';
import {
    FetchURL,
    requesFetchNew,
    failToast,
    domain_list,
} from '../../../../Gloabal/GlobalFunctions';
import { socketPort } from '../../../Socket/Socket_i';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-tiny-toast';
import { useSelector, useDispatch } from 'react-redux';
import { selectData, userAuth } from '../../../../reduxStore/reducer';
import styles from './Styles';
import { width20 } from '../../../_Components/_global/able-soft-component-ui/src/assets/dimensions/width';
import FastImage from 'react-native-fast-image';
import { height8 } from '../../../_Components/_global/able-soft-component-ui/src/assets/dimensions/height';

let verfyDomain = 'https://www.able.mn';
const App = () => {
    const [authShown, showAuth] = useState(false);
    const [authArray, setAuthArray] = useState(false);
    const [userAuthData, setUserAuth] = useState({ uName: '', uPass: '' });
    const [sessonChecking, setSessionChecking] = useState(false);
    const [domainLabel, setDomainLabel] = useState('www.able.mn');

    // const state = useSelector(selectData);
    const user = useSelector(state => selectData(state, 'user'));
    const dispatch = useDispatch();

    useEffect(() => {
        isUserLoged();
        getDomain();
    }, []);

    const getDomain = async () => {
        const domain = await AsyncStorage.getItem('DomainAddress');
        if (domain) {
            const array = domain_list();
            const domainData = array.find(obj => obj.value === domain);
            setDomainLabel(domainData.label);
            verfyDomain = domain;
        }
    };

    const isUserLoged = async () => {
        const logged = await get('isLoggedIn');
        if (logged === '1') {
            setSessionChecking(true);
            requestAnimationFrame(() => {
                dispatch(userAuth(true));
            });
        } else {
            setSessionChecking(true);
        }
    };

    const LoginReq = async (userName, password) => {
        try {
            let deviceName = '';
            let ipAdd = '';
            DeviceInfo.getDeviceName().then(devName => {
                deviceName = devName;
            });
            DeviceInfo.getIpAddress().then(ip => {
                // "92.168.32.44"
                ipAdd = ip;
            });
            const body = [
                { name: 'uName', data: userName.toString() },
                { name: 'uPass', data: password.toString() },
                { name: 'appName', data: 'chat' },
                { name: 'request', data: 'login' },
                { name: 'a', data: 'show' },
                { name: 't', data: 'read' },
                { name: 'isMobile', data: '1' },
                { name: 'versionCode', data: '10' },
                { name: 'osName', data: Platform.OS.toString() },
                { name: 'serialNum', data: DeviceInfo.getUniqueId().toString() },
                { name: 'deviceModel', data: deviceName.toString() },
                { name: 'osVersion', data: '10' },
                { name: 'appVersion', data: '10' },
                { name: 'ipAddress', data: ipAdd.toString() },
            ];

            userAuthData.uName = userName;
            userAuthData.uPass = password;
            setUserAuth(userAuthData);
            if (userName === '' && password === '') {
                Toast.show(
                    'Нэвтрэлт амжилтгүй боллоо. Хэрэглэгчийн нэр, нууц үгээ оруулна уу!',
                    failToast(3000)
                );
                return false;
            }
            // console.log('body', body);
            // console.log('verifyDomain', verfyDomain);

            return await FetchURL(verfyDomain + 'mobileApi.php?', 'POST', body)
                .then(async responseJson => {
                    // console.log('data', responseJson);
                    if (responseJson && responseJson.data.userId) {
                        // console.log('data', responseJson);
                        setAuthArray([
                            {
                                type: 'email',
                                value: responseJson.data.personalMail,
                            },
                            { type: 'phone', value: responseJson.data.mobileText1 },
                            { type: 'phone', value: responseJson.data.mobileText2 },
                        ]);
                        await saveFirebase(responseJson.data);
                    } else {
                        Toast.show(responseJson.data.message, failToast(3000));
                        return false;
                    }
                })
                .catch(err => {
                    Toast.show(
                        "Нэвтрэлт амжилтгүй боллоо!\nХэрэглэгчийн нэр, нууц үг, домайн \nхаягаа шалгаад дахин оролдоно уу! ",
                        failToast(3000)
                    );

                    console.log('error', err);
                    return false;
                });
        } catch (error) {
            console.log('eroor', error);
        }
    };

    const saveFirebase = async data => {
        const fcmToken = await AsyncStorage.getItem('device_token');
        const uniqueID = DeviceInfo.getUniqueId();
        const body = { uniqueToken: uniqueID, firebaseToken: fcmToken, os: Platform.OS };
        return await requesFetchNew(
            `${socketPort}api/tokens/${data.userId}`,
            'POST',
            data.accessToken,
            JSON.stringify(body)
        )
            .then(async responseJson => {
                await set('isLoggedIn', '1');
                await set('LoggedUser', data);
                dispatch(userAuth(true));
            })
            .catch(error => {
                Toast.show(error.toString(), failToast(3000));
            });
    };

    const showAuthWindowNext = () => {
        showAuth(true);
    };

    const getVerifyCode = async (value, returnValue) => {
        const isMobile = value.includes('@');
        const body = [
            { name: 'uName', data: userAuthData.uName },
            { name: 'uPass', data: userAuthData.uPass },
            { name: 'appName', data: 'monros' },
            { name: 'request', data: 'sendCode' },
            { name: 'isMobile', data: isMobile.toString() },
            { name: 'authNumber', data: value },
        ];
        return await FetchURL(verfyDomain + 'mobileApi.php', 'POST', body)
            .then(responseJson => {
                if (responseJson.data.isSuccess === 1) {
                    return returnValue;
                } else {
                    Alert.alert('Амжилтгүй боллоо', 'Нэвтрэх код авах хүсэлт амжилтгүй боллоо');
                }
            })
            .catch(err => {
                console.log('error', err);
            });
    };

    const sendCodeToValue = async value => {
        return await getVerifyCode(value, 'success');
    };

    const checkAuthCode = async value => {
        const body = [
            { name: 'uName', data: userAuthData.uName },
            { name: 'uPass', data: userAuthData.uPass },
            { name: 'appName', data: 'monros' },
            { name: 'request', data: 'checkCode' },
            { name: 'reqCode', data: value.toString() },
        ];
        return await FetchURL(verfyDomain + 'mobileApi.php', 'POST', body)
            .then(responseJson => {
                if (responseJson.data.isAvaliableCode && !responseJson.data.isExecutionCnt) {
                    if (!responseJson.data.isExecutionTime) {
                        if (responseJson.data.isSuccess) {
                            // dispatch({type: LOGIN});
                            return 'code_success';
                        } else {
                            Alert.alert(
                                'Таны оруулсан код буруу байна та дахин кодоо оруулана уу!!'
                            );
                        }
                    }
                } else if (responseJson.data.isExecutionCnt) {
                    Alert.alert('Tа кодоо 3-н удаа буруу хийсэн байна!!');
                    return 'limit_exceed';
                } else if (responseJson.data.isAvaliableCode) {
                    Alert.alert('Хүчинтэй код устгагдсан тул дахин код авна уу!!');
                    return 'limit_exceed';
                }
            })
            .catch(err => {
                console.log('error', err);
            });
    };

    const AuthSuccess = async () => {
        await set('isLggedIn', '1');
        await set('userData', user.userData);
        dispatch({ type: AUTHENTICATE_USER });
    };

    const resetCode = async () => {
        const body = [
            { name: 'uName', data: userAuthData.uName },
            { name: 'uPass', data: userAuthData.uPass },
            { name: 'appName', data: 'monros' },
            { name: 'request', data: 'resetCode' },
        ];
        return await FetchURL(verfyDomain + 'mobileApi.php', 'POST', body)
            .then(responseJson => {
                if (responseJson.data.isSuccess === 1) {
                    return 'code_reseted';
                } else {
                    Alert.alert('Амжилтгүй боллоо', 'Код шинэчлэх хүсэлт амжилтгүй боллоо');
                }
            })
            .catch(err => {
                console.log('error', err);
            });
    };

    return sessonChecking ? (
        <View style={styles.mainContainer}>
            <FastImage
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }}
                source={require('./chat_BG.jpeg')}
            />
            <FastImage
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                }}
                source={require('../../../utils/files/images/tsan_deer.png')}
            />
            <FastImage
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',

                    bottom: 0,
                }}
                source={require('../../../utils/files/images/tsan_dood.png')}
            />
            {authShown ? (
                <TwoFactorAuthentication
                    path={{
                        uri: user.userData !== null ? user.userData.userIcon : '',
                    }}
                    goBack={() => showAuth(false)}
                    hideAuthWindow={() => showAuth(false)}
                    sendCodeToValue={sendCodeToValue}
                    checkAuthCode={checkAuthCode}
                    AuthSuccess={AuthSuccess}
                    resetCode={resetCode}
                    array={authArray}
                />
            ) : (
                <>
                    <Login
                        rootStyle={{
                            paddingHorizontal: '5%',
                        }}
                        inActiveBorderHeight={2}
                        activeBorderHeight={3}
                        inActiveBorderColor={'rgba(127,135,157,0.6)'}
                        inActiveIconColor={'#7f879d'}
                        activeBorderColor={'#cdd1df'}
                        activeIconColor={'#cdd1df'}
                        iconHeight={width20}
                        iconWidth={width20}
                        placeholderColor={'black'}
                        labelContainerStyle={{
                            flexDirection: 'column',
                            marginTop: 10,
                        }}
                        buttonInactiveColor={'#d9584d'}
                        customLoaderStyle={{
                            backgroundColor: '#d9584d', 
                            height: height8,
                            width: height8,
                        }}
                        labelSecondStyle={{
                            color: '#d9584d',
                            marginBottom: 5,
                            alignSelf: 'center',
                        }}
                        labelFirst={'Able'}
                        labelSecond={'Chat'}
                        onPressLogin={LoginReq}
                        showAuthWindow={true}
                        showAuthWindowNext={() => {
                            showAuthWindowNext();
                        }}
                        domainName={domainLabel}
                        updateDomain={async domain => {
                            verfyDomain = domain;
                            const array = domain_list();
                            const domainData = array.find(obj => obj.value === domain);
                            setDomainLabel(domainData.label);
                            await AsyncStorage.setItem('DomainAddress', domain);
                        }}
                    />
                </>
            )}
        </View>
    ) : null;
};
export default App;
