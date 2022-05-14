import React from 'react';
import { Drawer } from './navigationUtils';
import More from '../_Screens/More';
import RoomUsers from '../_Screens/More/moreRoomDetail/Screens/moreRoomDetailUsers';
import RoomImages from '../_Screens/More/moreRoomDetail/Screens/moreRoomDetailImages';
import RoomFiles from '../_Screens/More/moreRoomDetail/Screens/moreRoomDetailFiles';
import RoomLinks from '../_Screens/More/moreRoomDetail/Screens/moreRoomDetailLinks';
import RoomSearchMsg from '../_Screens/More/moreRoomDetail/Screens/moreRoomDetailSearchMsg';
import MyDrawer from '../_Components/NewDrawerSideMenu';
import { width80 } from '../_Components/_global/able-soft-component-ui/src/assets/dimensions/width';

const AppNavigator = () => {
    return (
        <Drawer.Navigator
            overlayColor="rgba(16,48,84,0.93)"
            initialRouteName={'More'}
            drawerPosition={'right'}
            drawerType={'slide'}
            drawerStyle={{ backgroundColor: 'rgba(16,48,84,0.93)', width: width80 }}
            drawerContent={({ state, descriptors, navigation }) => {
                return <MyDrawer state={state} descriptors={descriptors} navigation={navigation} />;
            }}>
            <Drawer.Screen name="More" component={More} options={{ headerShown: false }} />
            <Drawer.Screen name="RoomUsers" component={RoomUsers} />
            <Drawer.Screen name="RoomImages" component={RoomImages} />
            <Drawer.Screen name="RoomFiles" component={RoomFiles} />
            <Drawer.Screen name="RoomLinks" component={RoomLinks} />
            <Drawer.Screen name="RoomSearchMsg" component={RoomSearchMsg} />
        </Drawer.Navigator>
    );
};

export default AppNavigator;
