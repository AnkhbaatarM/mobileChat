import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import UserIcon from '../../../_Components/_global/roomIcon';

var styles = require('./Styles');
export const UserItems = ({ item, selectUser = () => {} }) => {
    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    selectUser();
                }}
                style={styles.safeAreaView}>
                <View style={styles.userConatiner}>
                    <UserIcon roomIcon={item.user_icon} width={40} height={40} />
                    <View style={styles.valueContainer}>
                        <Text style={styles.userName}>{item.system_name}</Text>
                        <Text numberOfLines={2} style={styles.userName}>
                            {item.app_name}
                        </Text>
                    </View>
                </View>
                {item.isSelected ? (
                    <Feather size={20} name="check-square" color={'green'} style={{}} />
                ) : (
                    <Feather size={20} name="square" color={'gray'} style={{}} />
                )}
            </TouchableOpacity>
        </>
    );
};
