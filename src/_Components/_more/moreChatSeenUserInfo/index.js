import React from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import styles from './Styles';
import UserIcon from '../../_global/SquircleUser';
import { mkEasyDate } from '../../../../Gloabal/GlobalFunctions';

const SeenUser = ({ item }) => {
    return (
        <TouchableHighlight underlayColor={'transparent'} style={styles.mainContainer}>
            <>
                <UserIcon style={styles.flexEndStyle} width={40} height={40} path={item.uri} />
                <View style={styles.userInfoCon}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.userDate}>{mkEasyDate(item.date)}</Text>
                </View>
            </>
        </TouchableHighlight>
    );
};
export default SeenUser;
