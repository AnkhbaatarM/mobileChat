

import { Dimensions, Platform } from 'react-native';
const width90 = (Dimensions.get('window').width * 90) / 100;
const width76 = (Dimensions.get('window').width * 76) / 100;
const React = require('react-native');
let { StyleSheet } = React;

module.exports = StyleSheet.create({
    textInputContainerStyle: {
        width: width76,
        height: 50,
        alignSelf: 'center',
    },
    textInputStyle: {
        color: 'white',
        fontFamily: 'Roboto-Bold',
        flexGrow: 1,
        marginLeft: -4,
    },
    bottomBorder: {
        width: '100%',
        height: 1,
        borderRadius: 1,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: Platform.OS === 'android' ? -5 : 3,
    },
    iconStyle: {
        alignSelf: 'center',
        flex: 1,
        position:'absolute',
        right:0
    },
    inputIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
