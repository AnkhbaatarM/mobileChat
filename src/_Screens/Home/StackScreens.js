/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import RoomSearch from './homeRoomSearch/Index';
import UserSearch from './homeRoomCreateUserSearch';
// import StackScreenHome from './StackScreenHome';
import More from '../More';
import Users from './homeOnlineUserList/OnlineUserLayout';
import RoomCreate from './homeRoomCreateFinishWindow/Index';
import UserAdd from '../UserAdd';
import ConversationSearch from '../ConversationSearch/Index';
import VideoConf from '../VideoConf/Index';
import VideoConfAgora from '../VideoConfAgora/Index';
import VideoConfAgoraGroup from '../VideoConfAgora_Group/Index';
import FullScreen from 'components_directory/FullScreenList';
import MoreRoomDetail from '../More/moreRoomDetail/Index';
import RoomUsers from '../More/moreRoomDetail/Screens/moreRoomDetailUsers';
import Home from './homeRoomList/Home';
import UserManager from '../Profile';
import { createStackNavigator } from '@react-navigation/stack';
const App = () => {
    const Stack = createStackNavigator();

    return (
        <>
            <Stack.Navigator
                initialRouteName={'Home'}
                screenOptions={{
                    headerShown: false,
                    animationEnabled: false,
                }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="More" component={More} />
                <Stack.Screen name="UserManager" component={UserManager} />
                <Stack.Screen name="RoomUsers" component={RoomUsers} />
                <Stack.Screen name="UserAdd" component={UserAdd} />
                <Stack.Screen name="ConversationSearch" component={ConversationSearch} />
                <Stack.Screen name="VideoConf" component={VideoConf} />

                <Stack.Screen
                    options={{ headerShown: false }}
                    name="RoomInfo"
                    component={MoreRoomDetail}
                />
                <Stack.Screen name="FullScreen" component={FullScreen} />
                <Stack.Screen name="VideoConfAgora" component={VideoConfAgora} />
                <Stack.Screen name="RoomCreate" component={RoomCreate} />
                <Stack.Screen name="VideoConfAgoraGroup" component={VideoConfAgoraGroup} />
                {/* <Stack.Screen name="StackScreenHome" component={StackScreenHome} /> */}
                <Stack.Screen name="Users" component={Users} />
                <Stack.Screen name="UserSearch" component={UserSearch} />
                <Stack.Screen name="RoomSearch" component={RoomSearch} />
            </Stack.Navigator>
        </>
    );
};

export default App;
