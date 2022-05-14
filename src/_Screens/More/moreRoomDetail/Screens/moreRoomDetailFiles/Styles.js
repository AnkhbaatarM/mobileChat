import { Dimensions } from 'react-native';
const width90 = (Dimensions.get('window').width * 90) / 100;

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
    userName: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'black',
        alignSelf: 'center',
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
        marginBottom: 20,
    },
    searchInputText: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'gray',
        alignSelf: 'center',
        flex: 1,
    },
    headerContainer: {
        width: width90,
        height: 50,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'center',
        paddingRight: 10,
    },
    modalHeader: {
        fontSize: 18,
        fontFamily: Fonts.Arial,
        color: 'black',
        textAlign: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontFamily: Fonts.ArialBold,
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center',
    },
    bottomSheetButton: {
        width: '80%',
        height: 40,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    bottomSheetButtonLabel: {
        alignSelf: 'center',
        fontSize: 18,
        fontFamily: Fonts.ArialBold,
        marginLeft: 10,
    },
    deleteButton: {
        width: '40%',
        height: 40,
        backgroundColor: 'red',
        borderRadius: 5,
        justifyContent: 'center',
    },
    cancelButton: {
        width: '40%',
        height: 40,
        backgroundColor: 'gray',
        borderRadius: 5,
        justifyContent: 'center',
    },
    modalStyle: {
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 20,
        backgroundColor: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});
