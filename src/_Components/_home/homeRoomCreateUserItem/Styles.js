const React = require('react-native');
import { Fonts } from 'font_directory/Fonts';
let { StyleSheet } = React;
import { width85, width90, width50 } from 'root/Assets/constants/width';
import { width2 } from '../../../utils/dimensions/width';

module.exports = StyleSheet.create({
    userListContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    userListDetail: {
        justifyContent: 'flex-start',
        width: '100%',
        alignSelf: 'center',
    },
    userIcon: {
        width: 50,
        height: 50,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'gray',
    },
    userName: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        color: 'black',
        alignSelf: 'flex-start',
        width: '80%',
    },
    stickyTitle: {
        fontSize: 16,
        fontFamily: Fonts.Arial,
        color: 'gray',
        alignSelf: 'center',
        width: '80%',
    },
    safeAreaView: {
        width: width90,
        height: 80,
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 20,
        paddingHorizontal: width2,
    },
    stickyHeader: {
        width: width85,
        height: 30,
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
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
    app_name: {
        fontSize: 16,
        fontFamily: 'Roboto',
        color: 'royalblue',
        alignSelf: 'flex-start',
    },
    app_nameConatiner: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'royalblue',
        alignSelf: 'flex-start',
        width: width50,
        flexDirection: 'row',
    },
    app_nameBlock: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'royalblue',
        alignSelf: 'flex-start',
    },
});
