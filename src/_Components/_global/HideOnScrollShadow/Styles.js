

import { StyleSheet, Platform } from 'react-native';
import { width100 } from 'root/Assets/constants/width';
import { Fonts } from 'font_directory/Fonts';

module.exports = StyleSheet.create({
    viewContainer: {
        width: width100,
        height: 1,
        overflow: 'hidden',
        paddingBottom: 20,
        backgroundColor: 'transparent',
        position: 'absolute',
        right: 0,
        top: 0,
    },
    viewShadow: {
        width: width100,
        height: 1,
        position: 'absolute',
        backgroundColor: 'white',
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2,
    },
});
