

import { StyleSheet, Platform } from 'react-native';
import { width90, width100 } from 'root/Assets/constants/width';
import { Fonts } from 'font_directory/Fonts';

module.exports = StyleSheet.create({
    searchInputContainer: {
        width: width90,
        height: 60,
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingLeft: 6,
        paddingRight: 12,
        alignSelf: 'center',
        flexDirection: 'row',
        position: 'absolute',
        left: width90 - 14,
    },
    searchInput: {
        width: width90,
        // backgroundColor: '#f3f3f3',
        borderColor: '#ebebeb',
        borderRadius: 8,
        height: 40,
        paddingLeft: 6,
        paddingRight: 12,
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        // borderWidth: 1.5,
    },
    searchInputText: {
        fontFamily: Fonts.ArialBold,
        color: '#909090',
        alignSelf: 'center',
        height: 40,
        fontSize: 15,
        flexGrow: 1,
        paddingVertical: 0,
        marginLeft: 10,
    },
    searchIcon: {
        alignSelf: 'center',
    },
    buttonStyle: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        marginRight: -20,
    },
});
