

var React = require('react-native');
var { StyleSheet } = React;
import { Fonts } from 'font_directory/Fonts';
import { normalize } from '../../../../../Gloabal/GlobalFunctions';

module.exports = StyleSheet.create({
    stickyDateContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        height: 40,
        bottom: -20,
        position: 'absolute',
    },

    stickyDateText: {
        fontSize: normalize(13),
        fontFamily: Fonts.ArialBold,
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginHorizontal: '5%',
        color: '#737c88',
        paddingVertical: 0,
    },
    stickyDateView: {
        height: 28,
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: '#ebecee',
        flexDirection: 'row',
        alignSelf: 'center',
        marginLeft: 20,
    },
});
