

import { StyleSheet, Platform } from 'react-native';
import { width70 } from 'root/Assets/constants/width';
import { Fonts } from 'font_directory/Fonts';
import { normalize } from '../../../../Gloabal/GlobalFunctions';

module.exports = StyleSheet.create({
    deleteWindow: {
        width: width70,
        alignSelf: 'center',
        paddingTop: 25,
        borderRadius: 3,
        backgroundColor: 'white',
        justifyContent: 'center',
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
        color: '#ef4848',
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: 7,
    },
    modalDeleteHeader: {
        fontSize: normalize(15),
        fontFamily: Fonts.Arial,
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: 28,
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
    deleteLine: {
        width: '80%',
        height: 2,
        backgroundColor: '#efbac2',
        alignSelf: 'center',
        marginBottom: 25,
        borderRadius: 5,
    },
});
