

import { StyleSheet, Platform } from 'react-native';
import { width70 } from 'root/Assets/constants/width';
import { Fonts } from 'font_directory/Fonts';
import { normalize } from '../../../../Gloabal/GlobalFunctions';

module.exports = StyleSheet.create({
    deleteWindow: {
        width: width70,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    valueContainer: {
        width: width70,
        alignSelf: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 3,
        paddingTop: 20,
    },
    deleteWindowButtonContainer: {
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-evenly',
        marginTop: 25,
    },
    modalHeaderBold: {
        fontSize: normalize(17),
        fontFamily: Fonts.ArialBold,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 10,
    },
    modalDeleteHeader: {
        fontSize: normalize(15),
        fontFamily: Fonts.Arial,
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: 10,
        width: '80%',
    },
    modalButtonYes: {
        width: 100,
        height: 40,
        alignSelf: 'center',
        borderRadius: 3,
        justifyContent: 'center',
        backgroundColor: '#4f81f0',
        marginBottom: 35,
    },
    modalButtonTextYes: {
        fontSize: normalize(15),
        fontFamily: Fonts.ArialBold,
        alignSelf: 'center',
        textAlign: 'center',
        color: 'white',
        marginBottom: 3,
    },
    iconStyle: {
        alignSelf: 'center',
    },
    statusContainer: {
        width: '80%',
        backgroundColor: '#ef4848',
        alignSelf: 'center',
        marginBottom: 25,
        borderRadius: 3,
        justifyContent: 'center',
    },
    statusText: {
        fontSize: normalize(15),
        fontFamily: Fonts.RobotoBold,
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        padding: 10,
    },
});
