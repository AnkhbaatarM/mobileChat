import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
// import UserIcon from '../../_global/userIcon/index';
import UserIcon from '../../_global/roomIcon/index';
import { width13_5, width14, width15 } from '../../../utils/dimensions/width';

var styles = require('./Styles');
export const UserListItem = ({ item, searchUserRoom = () => {} }) => {
    return (
        <>
            {item && (
                <TouchableOpacity 
                onPress={() => searchUserRoom(item)} 
                style={styles.safeAreaView}>
                    <View style={styles.userStatus}>
                        <UserIcon
                            width={width14}
                            height={width14}
                            roomIcon={
                                item.user_icon && item.user_icon !== null ? item.user_icon : ''
                            }
                            isOnline={true}
                            style={{ marginRight: 8 }}
                        />
                        <View style={styles.userContainer}>
                            <Text numberOfLines={1} style={styles.userName}>
                                {item.system_name}
                            </Text>
                            <Text numberOfLines={1} style={styles.app_name}>
                                {item.app_name}
                            </Text>
                            <Text numberOfLines={1} style={styles.comName}>
                                {item.com_name ? item.com_name : item.company_name}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        </>
    );
};
