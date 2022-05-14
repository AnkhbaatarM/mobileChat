import moment from 'moment';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectData } from '../../../../../../../reduxStore/reducer';
import UserIcon from '../../../../../../_Components/_global/roomIcon';

var styles = require('./Styles');
export const ConversationRenderer = props => {
    const roomUsers = useSelector(state => selectData(state, 'roomUsers'));

    const item = props.item;
    const getUserName = id => {
        const index = roomUsers.findIndex(obj => obj.id === id);
        return roomUsers[index].name;
    };
    return (
        <>
            <TouchableOpacity style={styles.safeAreaView}>
                <View style={styles.userStatus}>
                    <UserIcon width={40} height={40} roomIcon={item.msgs.user_icon} />
                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        <Text numberOfLines={1} style={styles.userNameBold}>
                            {item.msgs.system_name}
                        </Text>
                        <Text numberOfLines={1} style={styles.userNameBold}>
                            {item.msgs.msg}
                            <Text numberOfLines={1} style={styles.userName}>
                                {'  ' + moment(item.msgs.createdAt).format('YYYY/MM/DD')}
                            </Text>
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
};
