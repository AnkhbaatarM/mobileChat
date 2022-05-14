

const React = require('react-native');
import { Fonts } from 'font_directory/Fonts';
let { StyleSheet } = React;
import { width85, width90 } from 'root/Assets/constants/width';
import { normalize, normalize2 } from '../../../../Gloabal/GlobalFunctions';

module.exports = StyleSheet.create({
    userIcon: {
        alignSelf: 'flex-start',
        width: 50,
        height: 50,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'gray',
    },
    userName: {
        fontSize: normalize2(15),
        fontFamily: Fonts.Arial,
        color: 'black',
    },
    app_name: {
        fontSize: normalize2(12.5),
        fontFamily: Fonts.Arial,
        color: 'royalblue',
        alignSelf: 'flex-start',
    },
    comName: {
        fontSize: normalize2(12.5),
        fontFamily: Fonts.Arial,
        color: 'gray',
    },
    appNameContainer: {
        flexDirection: 'row',
        width: width85 - 60,
    },
    activeViewContainer: {
        width: 20,
        height: 20,
        borderRadius: 10,
        position: 'absolute',
        justifyContent: 'center',
        bottom: -3,
        left: 35,
        backgroundColor: 'white',
    },
    activeView: {
        width: 12,
        height: 12,
        backgroundColor: '#21de2e',
        borderRadius: 7.5,
        alignSelf: 'center',
    },
    safeAreaView: {
        width: width90,
        alignSelf: 'center',
        justifyContent: 'center',
        height: 80,
        borderRadius: 10,
    },
    userStatus: {
        width: width90,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
    },
    userContainer: {
        width: width85 - 60,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        marginTop:3
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
