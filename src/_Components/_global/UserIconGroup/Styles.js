
const React = require('react-native');
let { StyleSheet } = React;
import { normalize } from '../../../../Gloabal/GlobalFunctions';
import { Fonts } from '../../../utils/fonts/Fonts';
module.exports = StyleSheet.create({
    userIcon: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    mainContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    extraCountStyle: {
        alignSelf: 'center',
        fontSize: normalize(10),
        color: 'white',
        fontFamily: Fonts.RobotoBold,
        textAlign: 'center',
        flexDirection: 'row',
        position: 'absolute',
    },
});
