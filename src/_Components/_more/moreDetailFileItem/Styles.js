

import { Platform, Dimensions } from 'react-native';

const React = require('react-native');
import { Fonts } from 'font_directory/Fonts';
let { StyleSheet } = React;
const width85 = (Dimensions.get('window').width * 85) / 100;
module.exports = StyleSheet.create({
    pictureContainer: {
        width: width85,
        height: width85 / 3 - 5,
        borderRadius: 3,
        marginRight: 3,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    pictureStyle: {
        width: width85 / 3 - 15,
        height: width85 / 3 - 5,
        borderRadius: 3,
        alignSelf: 'center',
        marginRight: 10,
    },
    fileDetails: {
        flex: 1,
        justifyContent: 'flex-start',
        height: width85 / 3 - 5,
        alignSelf: 'center',
    },
    fileDetailsText: {
        justifyContent: 'flex-start',
        fontFamily: Fonts.ArialBold,
        fontSize: 16,
    },
    fileDetailsSize: {
        justifyContent: 'flex-start',
        fontFamily: Fonts.Arial,
        fontSize: 16,
        bottom: 0,
        position: 'absolute',
    },
    fileDetailsDate: {
        justifyContent: 'flex-start',
        fontFamily: Fonts.Arial,
        fontSize: 16,
        marginTop: 10,
        color: 'gray',
    },
    downloadButtonText: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
    },
    downloadContainer: {
        width: 100,
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#36da32',
        height: 30,
        position: 'absolute',
        right: 5,
        bottom: 5,
    },
});
