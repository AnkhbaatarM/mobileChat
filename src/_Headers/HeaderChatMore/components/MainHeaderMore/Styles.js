var React = require('react-native');
var { StyleSheet } = React;
import { Fonts } from 'font_directory/Fonts';
import { width80, width90, width7, width85 } from 'root/Assets/constants/width';

module.exports = StyleSheet.create({
    userName: {
        fontSize: 18,
        fontFamily: Fonts.Arial,
        color: 'black',
        alignSelf: 'center',
        flex: 1,
    },
    userIcon: {
        alignSelf: 'center',
        width: 30,
        height: 30,
        borderRadius: 13,
        borderWidth: 0.5,
        borderColor: 'gray',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
        flex: 1,
    },
    userIconContainer: {
        alignSelf: 'flex-start',
        width: 40,
        height: 40,
        borderColor: 'gray',
        marginRight: 10,
    },
    groupIcon: {
        alignSelf: 'flex-start',
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: 'white',
        marginRight: 10,
    },
    userImageContainer: {
        flexDirection: 'row',
        height: 50,
        flexGrow: 1,
        paddingLeft: 10,
    },
    countText: {
        fontSize: 16,
        fontFamily: Fonts.ArialBold,
        color: 'white',
        alignSelf: 'center',
        position: 'absolute',
        right: 12,
    },
    backButtonContainer: {
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        width: 40,
    },
});
