

import { Platform, Dimensions } from 'react-native';

const React = require('react-native');
import { Fonts } from 'font_directory/Fonts';
let { StyleSheet } = React;
import { width85, width90, width70, width80 } from 'root/Assets/constants/width';

module.exports = StyleSheet.create({
    userIcon: {
        width: 40,
        height: 40,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: 'gray',
    },
    userName: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'gray',
        alignSelf: 'flex-start',
    },
    safeAreaView: {
        width: width80,
        height: 40,
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    app_nameConatiner: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'royalblue',
        alignSelf: 'flex-start',
        width: width70,
        flexDirection: 'row',
    },
    app_nameBlock: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'royalblue',
        alignSelf: 'flex-start',
    },
    app_name: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'royalblue',
        alignSelf: 'flex-start',
    },
    userDataContainer: {
        justifyContent: 'flex-start',
        width: '100%',
    },
});
