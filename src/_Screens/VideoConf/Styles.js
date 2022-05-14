

import { Dimensions } from 'react-native';
const width90 = (Dimensions.get('window').width * 90) / 100;

const React = require('react-native');
import { Fonts } from "font_directory/Fonts";
let { StyleSheet, } = React;

module.exports = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    text: {
        fontSize: 30,
    },
    rtcview: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
        width: '100%',
        flexDirection: 'row'
    },
    rtc: {
        width: '50%',
        height: '50%',
        borderWidth: 1,
        marginTop: 10,
        borderColor: 'white',
        backgroundColor: 'red'
    },
    toggleButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    userIcon: {
        alignSelf: 'flex-start',
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'white'
    },
    userName: {
        fontSize: 18,
        fontFamily: Fonts.Arial,
        color: 'white',
        alignSelf: 'center'
    },
    containerWebView: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 10
    },
    searchInput: {
        width: width90,
        backgroundColor: '#EEEEEE',
        borderRadius: 10,
        height: 40,
        paddingHorizontal: 20,
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 20
    },
    searchInputText: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'gray',
        alignSelf: 'center',
        flex: 1,
    },
    headerContainer: {
        width: Dimensions.get('window').width,
        height: 50,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'center',
        paddingHorizontal: 10,
        position: 'absolute',
        top: 0
    }

});
