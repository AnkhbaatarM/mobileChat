

import { Platform, Dimensions } from 'react-native';

const React = require('react-native');
import { Fonts } from "font_directory/Fonts";
let { StyleSheet, } = React;
const width85 = (Dimensions.get('window').width * 85) / 100;
module.exports = StyleSheet.create({
    userIcon: {
        alignSelf: 'flex-start',
        width: 50,
        height: 50,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'gray',
        marginRight: 10
    },
    userIconContainer: {
        alignSelf: 'flex-start',
        width: 50,
        height: 50,
        borderColor: 'gray',
        marginRight: 10
    },
    groupIcon: {
        alignSelf: 'flex-start',
        width: 35,
        height: 35,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: 'white',
        marginRight: 10
    },
    userName: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'black',
        marginBottom:5,
    },
    userNameBold: {
        fontSize: 15,
        fontFamily: Fonts.ArialBold,
        color: 'black',
        marginBottom:5,
    },
    activeView: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        position: 'absolute',
        justifyContent:'center',
        bottom: -2,
        left: 33,
        backgroundColor:'#03fc56',
        borderWidth:2,
        borderColor:'white'
    },
    safeAreaView: {
        width: width85,
        alignSelf: 'center',
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
        justifyContent: 'flex-start'
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
});
