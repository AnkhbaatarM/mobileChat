import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSwitchNavigator } from '@react-navigation/compat';
import Login from '../_Screens/Auth/Login';
import Home from './AppNavigation';
import AsyncStorage from '@react-native-community/async-storage';
import { navigationRef } from '../../RootNavigation';
import { useSelector, useDispatch } from 'react-redux';
import { selectData, userAuth } from '../../reduxStore/reducer';
import { Animated, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { width36 } from '../utils/dimensions/width';
import { setChatColor } from '../Socket/Socket_Var';
const SwitchHome = createSwitchNavigator(
    {
        AuthLoading: Home,
    },
    {
        headerMode: 'none',
        header: null,
        navigationOptions: {
            headerVisible: false,
            headerShown: false,
            // gesturesEnabled: false,
        },
        initialRouteName: 'AuthLoading',
    }
);

function App() {
    const isAuth = useSelector(state => selectData(state, 'isAuth'));
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        Session();
        ColorSet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const ColorSet = async () => {
        let color = await AsyncStorage.getItem('MyChatBgColor');
        if (color === null) {
            setChatColor('#357FE5');
        } else {
            setChatColor(color);
        }
    };
    const Session = async () => {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            const logged = JSON.parse(isLoggedIn) === '1';
            dispatch(userAuth(logged));
        }
    };
    const linking = {
        prefixes: ['https://mychat.com', 'mychat://'],
        config: {
            screens: {
                More: 'feed/:sort',
            },
        },
    };
    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
            getCurrentOptions={value => console.warn('value', value)}>
            {!loading ? isAuth ? <SwitchHome /> : <Login /> : null}
        </NavigationContainer>
    );
}

export default App;
