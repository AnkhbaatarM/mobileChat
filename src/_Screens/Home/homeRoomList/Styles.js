

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
    tabBottomTabLeft: {
        width: width40 / 2,
        backgroundColor: 'rgba(255,255,255,0.8)',
        height: 50,
        alignSelf: 'center',
        flexDirection: 'row',
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 20,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.25,
        // elevation: 5,
        justifyContent: 'center',
    },
    tabBottomTabRight: {
        width: width40 / 2,
        backgroundColor: 'rgba(255,255,255,0.8)',
        height: 50,
        alignSelf: 'center',
        flexDirection: 'row',
        borderBottomRightRadius: 25,
        borderTopRightRadius: 20,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.25,
        // elevation: 5,
        justifyContent: 'center',
    },
    tabBottomTabContainer: {
        width: width40,
        backgroundColor: 'rgba(255,255,255,0.5)',
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
        justifyContent: 'space-between',
        shadowOpacity: 0.25,
        elevation: 5,
    },
    msgCount: {
        position: 'absolute',
        alignSelf: 'center',
        top: 10,
        right: width40 / 7,
        backgroundColor: 'red',
        borderRadius: 6,
        width: 12,
        height: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createRoomButton: {
        width: 60,
        height: 60,
        backgroundColor: 'green',
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        justifyContent: 'center',
        shadowOpacity: 0.25,
        elevation: 5,
    },
    iconStyle: {
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        justifyContent: 'center',
        shadowOpacity: 0.25,
        elevation: 5,
    },
    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
    },
});
