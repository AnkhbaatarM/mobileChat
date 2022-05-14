

import { Platform, Dimensions } from 'react-native';

const React = require('react-native');
import { Fonts } from 'font_directory/Fonts';
let { StyleSheet } = React;
const width90 = (Dimensions.get('window').width * 90) / 100;
module.exports = StyleSheet.create({
    userIcon: {
        width: 30,
        height: 30,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: 'gray',
    },
    userName: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'gray',
        alignSelf: 'flex-start',
        width: '80%',
    },
    safeAreaView: {
        width: '80%',
        height: 40,
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userStatus: {
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    userContainer: {
        width: width90 - 60,
        alignSelf: 'center',
        justifyContent: 'flex-start',
    },
    userChat: {
        alignSelf: 'flex-start',
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'gray',
    },
    userChatDate: {
        alignSelf: 'flex-start',
        fontSize: 13,
        fontFamily: Fonts.Arial,
        color: 'gray',
    },
    valueContainer: {
        justifyContent: 'flex-start',
        width: '100%',
    },
    userConatiner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
});
