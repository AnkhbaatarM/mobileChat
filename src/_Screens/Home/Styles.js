

var React = require('react-native');
import { Dimensions } from 'react-native';
var { StyleSheet } = React;
import { Fonts } from 'font_directory/Fonts';
const width90 = (Dimensions.get('window').width * 90) / 100;
const width40 = (Dimensions.get('window').width * 40) / 100;

module.exports = StyleSheet.create({
    userName: {
        fontSize: 18,
        fontFamily: Fonts.ArialBold,
        color: 'white',
        alignSelf: 'center',
    },
    userIcon: {
        alignSelf: 'flex-start',
        width: 40,
        height: 40,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'white',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 10,
        alignSelf: 'center',
        width: width90,
        backgroundColor: '#3b4252',
    },
    tabBottomTabContainer: {
        width: width40,
        backgroundColor: 'white',
        position: 'absolute',
        height: 50,
        bottom: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        elevation: 5,
    },
    tabBottomTabLeft: {
        width: width40 / 2,
        backgroundColor: 'white',
        position: 'absolute',
        height: 50,
        alignSelf: 'center',
        flexDirection: 'row',
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        elevation: 5,
    },
    tabBottomTabRight: {
        width: width40 / 2,
        backgroundColor: 'white',
        position: 'absolute',
        height: 50,
        alignSelf: 'center',
        flexDirection: 'row',
        borderBottomRightRadius: 25,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        elevation: 5,
    },
});
