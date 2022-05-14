import { Dimensions } from 'react-native';
const width90 = (Dimensions.get('window').width * 90) / 100;
const width80 = (Dimensions.get('window').width * 80) / 100;

const React = require('react-native');
import { Fonts } from 'font_directory/Fonts';
let { StyleSheet } = React;

module.exports = StyleSheet.create({
    userIcon: {
        alignSelf: 'flex-start',
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'white',
    },
    buttonText: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'white',
        alignSelf: 'center',
    },
    valueText: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'black',
        alignSelf: 'center',
    },
    searchInput: {
        width: width80,
        backgroundColor: 'white',
        borderRadius: 5,
        height: 40,
        paddingHorizontal: 20,
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 20,
        borderWidth: 1,
    },
    searchInputText: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'gray',
        alignSelf: 'center',
    },
    searchInputTextModal: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'gray',
        alignSelf: 'center',
        height: 40,
        marginBottom: 20,
        borderBottomWidth: 1,
        width: width80,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    headerContainer: {
        width: width90,
        height: 50,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'center',
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#4a72b1',
        borderRadius: 5,
        width: width80,
    },
    inputContainer: {
        padding: 10,
        paddingVertical: 20,
        backgroundColor: 'white',
        borderRadius: 5,
    },
});
