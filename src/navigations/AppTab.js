import React from 'react';
import { Tab } from './navigationUtils';
import Home from '../_Screens/Home/homeRoomList/Home';
import Users from '../_Screens/Home/homeOnlineUserList/OnlineUserLayout';
import { MyTabBar } from '../_Components/TabBar/index';
import UserManager from '../_Screens/Profile';

const AppNavigator = props => {
    return (
        <Tab.Navigator
            backBehavior="none"
            initialRouteName={'Home'}
            style={{ backgroundColor: 'red' }}
            tabBar={({ state, descriptors, navigation }) => {
                return (
                    <MyTabBar
                        navState={state}
                        descriptors={descriptors}
                        navigation={navigation}
                        // newCount={state.home.msgCount}
                    />
                );
            }}>
            <Tab.Screen name="Profile" component={UserManager} options={{ headerShown: false }} />
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Users" component={Users} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

export default AppNavigator;
