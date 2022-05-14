import React from 'react';
import { Text, TouchableOpacity, View, Platform } from 'react-native';
import IconAnt from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeout from 'react-native-swipeout';
import UserIcon from '../../_global/roomIcon';
import { useSelector, useDispatch } from 'react-redux';
import { selectData, setSwipedRoomUser } from '../../../../reduxStore/reducer';

const styles = require('./Styles');
const center = { alignSelf: 'center' };
export const UserItem = ({
    item,
    setRemoveUserAuth = () => {},
    openSheet = () => {},
    searchUserRoom = () => {},
}) => {
    const dispatch = useDispatch();
    const swipedRoomUser = useSelector(state => selectData(state, 'swipedRoomUser'));
    const swipeoutBtns = [
        {
            text: 'Устах',
            backgroundColor: 'white',
            type: 'delete',
            component: (
                <TouchableOpacity
                    onPress={() => {
                        setRemoveUserAuth(item.id);
                    }}
                    style={styles.deleteButton}>
                    <IconAnt name={'delete-outline'} size={30} color="white" style={center} />
                </TouchableOpacity>
            ),
        },
    ];
    const selectUser = () => {
        dispatch(setSwipedRoomUser(item.id));
    };

    return (
        <Swipeout
            disabled={Platform.OS === 'android'}
            autoClose={true}
            backgroundColor={'white'}
            close={swipedRoomUser === item.id ? false : true}
            onOpen={() => {
                selectUser();
            }}
            right={swipeoutBtns}>
            <TouchableOpacity
                onLongPress={() => openSheet(item)}
                onPress={() => searchUserRoom(item)}
                style={[styles.safeAreaView]}>
                <View style={styles.userStatus}>
                    <UserIcon width={50} height={50} roomIcon={item.user_icon} />
                    {item.isOnline ? <View style={styles.activeView} /> : null}
                    <Text numberOfLines={1} style={styles.userName}>
                        {item.name !== undefined ? item.name : item.system_name}
                    </Text>
                </View>
            </TouchableOpacity>
        </Swipeout>
    );
};
