/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { DrawerContentScrollView } from '../../navigations/navigationUtils';
import { SvgXml } from 'react-native-svg';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import RoomIcon from '../_global/roomIcon';
import styles from './Styles';
import { selectedRoom } from '../../Socket/Socket_Var';
import {
    File,
    Gallery_img,
    group_user,
    links,
    settings,
} from '../../utils/files/SvgFiles/more_detail_icons';
import { back_icon, searchIcon } from '../../utils/files/SvgFiles/moreHeaderIcon';
import { useSelector, useDispatch } from 'react-redux';
import { selectData } from '../../../reduxStore/reducer';

const DrawerSideMenu = ({ navigation }) => {
    const isDrawerOpen = useIsDrawerOpen();
    const state = useSelector(selectData);
    const [drawerItems, setDrawerData] = useState([
        {
            name: 'Гишүүдийг харах',
            icon: group_user,
            focused: true,
            iconColor: 'gray',
            screen: 'RoomUsers',
            shown: selectedRoom.roomType === 0 ? false : true,
        },
        {
            name: 'Мессеж хайх',
            icon: searchIcon,
            focused: false,
            iconColor: 'gray',
            screen: 'RoomSearchMsg',
            shown: true,
        },
        {
            name: 'Зургууд',
            icon: Gallery_img,
            focused: false,
            iconColor: 'gray',
            screen: 'RoomImages',
            shown: true,
        },
        {
            name: 'Файлууд',
            icon: File,
            focused: false,
            iconColor: 'gray',
            screen: 'RoomFiles',
            shown: true,
        },
        {
            name: 'Линкүүд',
            icon: links,
            focused: false,
            iconColor: 'gray',
            screen: 'RoomLinks',
            shown: true,
        },
        // {
        //     name: 'Тохиргоо',
        //     icon: settings,
        //     focused: false,
        //     iconColor: 'gray',
        //     screen: 'RoomUsers',
        //     shown: true,
        // },
    ]);

    const drawerItemLabel = item => {
        return (
            <View style={styles.menuLabelFlex}>
                <SvgXml
                    style={styles.iconStyle}
                    width={20}
                    height={20}
                    xml={item.icon(item.iconColor)}
                />
                <Text style={styles.menuTitle}>{item.name}</Text>
                <SvgXml style={styles.arrowIcon} width={15} height={15} xml={back_icon('gray')} />
            </View>
        );
    };

    return (
        <>
            {isDrawerOpen && (
                <View style={styles.gestureContainer}>
                    <View style={isDrawerOpen ? styles.gestureLineActive : styles.gestureLine} />
                </View>
            )}
            <DrawerContentScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                style={styles.containerStyle}>
                <View style={styles.topContainer}>
                    <RoomIcon
                        width={50}
                        height={50}
                        roomIcon={selectedRoom.path}
                        isGroup={selectedRoom.roomType === 1}
                        style={{ alignSelf: 'flex-start' }}
                        // age={age}
                        // gender={gender}
                    />
                    <Text style={styles.roomName}>{selectedRoom.name}</Text>
                </View>
                {drawerItems.map(
                    (item, idx) =>
                        item.shown && (
                            <TouchableHighlight
                                underlayColor={'#4081C2'}
                                key={`drawer-item-${idx + 1}`}
                                style={styles.drawerItemStyle}
                                onPress={() => {
                                    drawerItems.map(obj => (obj.focused = false));
                                    drawerItems[idx].focused = true;
                                    setDrawerData([...drawerItems]);
                                    navigation.navigate(item.screen);
                                }}>
                                {drawerItemLabel(item)}
                            </TouchableHighlight>
                        )
                )}
                <View style={styles.divider} />
            </DrawerContentScrollView>
        </>
    );
};

export default DrawerSideMenu;
