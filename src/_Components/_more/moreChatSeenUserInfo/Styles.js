

var React = require('react-native');
var { StyleSheet } = React;
import { Fonts } from 'font_directory/Fonts';
import { normalize } from '../../../../Gloabal/GlobalFunctions';

module.exports = StyleSheet.create({
    userName: {
        fontSize: normalize(14),
        fontFamily: Fonts.ArialBold,
        color: 'black',
    },
    userDate: {
        fontSize: normalize(14),
        fontFamily: Fonts.ArialBold,
        color: 'black',
    },
    mainContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center',
        height: 50,
        marginTop: 10,
    },
    userInfoCon: {
        marginLeft: 5,
        flexGrow: 1,
        justifyContent: 'center',
    },
});
