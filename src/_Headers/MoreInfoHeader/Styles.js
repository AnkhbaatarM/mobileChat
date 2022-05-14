var React = require('react-native');
import { Dimensions } from 'react-native';
var { StyleSheet } = React;
import { Fonts } from 'font_directory/Fonts';
const width10 = (Dimensions.get('window').width * 10) / 100;

module.exports = StyleSheet.create({
    userName: {
        fontSize: 18,
        fontFamily: Fonts.ArialBold,
        color: 'black',
        alignSelf: 'center',
    },
    iconStyle: {
        alignSelf: 'center',
        marginRight: 10,
    },
    userIcon: {
        alignSelf: 'center',
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'black',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 5,
        alignSelf: 'center',
        width: '100%',
        backgroundColor: 'white',
        paddingLeft: 10,
        height: 60,
    },
});
