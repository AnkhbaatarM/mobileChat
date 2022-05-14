

import { Platform, Dimensions } from 'react-native';

const React = require('react-native');
import { Fonts } from 'font_directory/Fonts';
let { StyleSheet } = React;
const width85 = (Dimensions.get('window').width * 90) / 100;
const width15 = (Dimensions.get('window').width * 5) / 100;
module.exports = StyleSheet.create({
    userIcon: {
        alignSelf: 'flex-start',
        width: 50,
        height: 50,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'gray',
        marginRight: 10,
    },
    userIconContainer: {
        alignSelf: 'flex-start',
        width: 50,
        height: 50,
        borderColor: 'gray',
        marginRight: 10,
    },
    groupIcon: {
        alignSelf: 'flex-start',
        width: 35,
        height: 35,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: 'white',
        marginRight: 10,
    },
    userName: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'black',
        marginBottom: 5,
        width: '70%',
        alignSelf: 'center',
    },
    activeView: {
        width: 20,
        height: 20,
        borderRadius: 10,
        position: 'absolute',
        justifyContent: 'center',
        bottom: -2,
        left: 33,
        backgroundColor: '#03fc56',
        borderWidth: 2,
        borderColor: 'white',
    },
    deleteText: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
        fontFamily: Fonts.ArialBold,
    },
    safeAreaView: {
        width: width85,
        paddingLeft: width15,
        alignSelf: 'center',
        // borderWidth:1,
        paddingVertical: 10,
        borderRadius: 10,
    },
    userStatus: {
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    userContainer: {
        width: width85 - 60,
        alignSelf: 'center',
        justifyContent: 'flex-start',
    },
    userChat: {
        alignSelf: 'flex-start',
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'black',
    },
    userChatDate: {
        alignSelf: 'flex-start',
        fontSize: 13,
        fontFamily: Fonts.Arial,
        color: 'blue',
    },
    deleteButton: {
        flex: 1,
        backgroundColor: 'rgba(255,0,0,0.5)',
        justifyContent: 'center',
        marginRight: 10,
        borderRadius: 10,
    },
});
