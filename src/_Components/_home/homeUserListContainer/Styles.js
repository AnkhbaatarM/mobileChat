import { Dimensions, Platform } from 'react-native';
const width90 = (Dimensions.get('window').width * 90) / 100;

const React = require('react-native');
import { Fonts } from 'font_directory/Fonts';
let { StyleSheet } = React;

module.exports = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
    },
    listContainerStyle: {
        paddingBottom: 50,
    },
    listStyle: {
        flex: 1,
        paddingTop: 50,
    },
    userIcon: {
        alignSelf: 'flex-start',
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'white',
    },
    userName: {
        fontSize: 15,
        fontFamily: Fonts.ArialBold,
        color: 'white',
        alignSelf: 'center',
    },
    searchInput: {
        width: width90,
        backgroundColor: '#f3f3f3',
        borderRadius: 8,
        height: 40,
        paddingLeft: 6,
        paddingRight: 12,
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: '#ebebeb',
    },
    searchInputText: {
        fontFamily: Fonts.ArialBold,
        color: '#909090',
        alignSelf: 'center',
        height: 40,
        fontSize: 15,
        flexGrow: 1,
        paddingVertical: 0,
        marginLeft: Platform.OS === 'ios' ? 5 : 0,
    },
});
