import { Platform, Dimensions } from 'react-native';

const React = require('react-native');
import { Fonts } from 'font_directory/Fonts';
let { StyleSheet } = React;

module.exports = StyleSheet.create({
    userIcon: {
        backgroundColor: 'transparent',
        width: '98.5%',
        height: '98.5%',
        alignSelf: 'center',
        borderColor: 'white',
    },
    userIconRadius: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.3)',
        width: 50,
        height: 50,
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: 20,
    },
    userIconContainer: {
        alignSelf: 'center',
        width: 50,
        height: 50,
        borderColor: 'gray',
        marginRight: 10,
        borderRadius: 20,
        marginLeft: 5,
    },
    groupIcon: {
        alignSelf: 'center',
        width: 35,
        height: 35,
        // borderWidth: 0.5,
        borderColor: 'white',
        marginRight: 10,
        borderRadius: 20,
    },
    activeView: {
        width: 15,
        height: 15,
        backgroundColor: '#21de2e',
        borderRadius: 7.5,
        alignSelf: 'center',
        position: 'absolute',
        bottom: -1,
        right: -1,
    },
});
