import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import UserIcon from '../../_global/roomIcon';

var styles = require('./Styles');
export const UserItems = ({ item, selectUser = () => {} }) => {
    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    selectUser();
                }}
                style={styles.safeAreaView}>
                <UserIcon roomIcon={item.user_icon} width={40} height={40} />
                <View style={styles.userDataContainer}>
                    <Text style={styles.userName}>{item.system_name}</Text>
                    <View style={styles.app_nameConatiner}>
                        <Text numberOfLines={1} style={styles.app_nameBlock}>
                            [
                        </Text>
                        <Text numberOfLines={1} style={styles.app_name}>
                            {item.app_name}
                        </Text>
                        <Text numberOfLines={1} style={styles.app_nameBlock}>
                            ]
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
};
