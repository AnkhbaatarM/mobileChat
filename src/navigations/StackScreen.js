/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import RoomSearch from '../_Screens/Home/homeRoomSearch/Index';
import UserSearch from '../_Screens/Home/homeRoomCreateUserSearch/Index';
import More from './MoreNavigation';
import RoomCreate from '../_Screens/Home/homeRoomCreateFinishWindow/Index';
import UserAdd from '../_Screens/UserAdd';
import VideoConf from '../_Screens/VideoConf/Index';
import VideoConfAgora from '../_Screens/VideoConfAgora/Index';
import VideoConfAgoraGroup from '../_Screens/VideoConfAgora_Group/Index';
import FullScreen from 'components_directory/FullScreenList';
import MoreRoomDetail from '../_Screens/More/moreRoomDetail/Index';
import Home from './AppTab';
import UserManager from '../_Screens/Profile';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
const App = () => {
    const Stack = createNativeStackNavigator();

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
                <Stack.Screen name="UserAdd" component={UserAdd} />
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
                <Stack.Screen name="UserSearch" component={UserSearch} />
                <Stack.Screen name="RoomSearch" component={RoomSearch} />
                {/* <Stack.Screen name="StackScreenHome" component={StackScreenHome} /> */}
                {/* <Stack.Screen name="Users" component={Users} /> */}
            </Stack.Navigator>
        </>
    );
};

export default App;
