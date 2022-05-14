
import { Platform } from 'react-native';
import { width80, width90, width60, width85 } from 'root/Assets/constants/width';

const React = require('react-native');
import { Fonts } from 'font_directory/Fonts';
let { StyleSheet } = React;

module.exports = StyleSheet.create({
    selectedUsersName: {
        width: 80,
        alignSelf: 'center',
        fontFamily: Fonts.Arial,
    },
    searchInput: {
        width: width60,
        borderRadius: 10,
        height: 40,
        alignSelf: 'center',
    },
    searchInputContainer: {
        width: width90,
        borderRadius: 10,
        height: 40,
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 10,
        flexDirection: 'row',
        marginTop: Platform.OS === 'ios' ? 10 : 0,
        backgroundColor: '#EEEEEE',
    },
    searchInputText: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'gray',
        alignSelf: 'center',
    },
    normalText: {
        fontSize: 16,
        fontFamily: Fonts.Arial,
        color: 'gray',
        alignSelf: 'center',
    },
    removeIconHolder: {
        borderWidth: 1,
        borderColor: 'gray',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'white',
    },
    normalTextRight: {
        fontSize: 16,
        fontFamily: Fonts.ArialBold,
        color: 'gray',
        alignSelf: 'flex-start',
        marginVertical: 5,
    },
    normalTextInput: {
        width: '90%',
        fontSize: 15,
        paddingVertical: 10,
        fontFamily: Fonts.Arial,
        color: 'gray',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    userIcon: {
        width: 30,
        height: 30,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: 'gray',
    },
    userName: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'gray',
        alignSelf: 'flex-start',
        width: '80%',
    },
    safeAreaView: {
        width: '80%',
        height: 40,
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userStatus: {
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    userContainer: {
        width: width90 - 60,
        alignSelf: 'center',
        justifyContent: 'flex-start',
    },
    userChat: {
        alignSelf: 'flex-start',
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'gray',
    },
    userChatDate: {
        alignSelf: 'flex-start',
        fontSize: 13,
        fontFamily: Fonts.Arial,
        color: 'gray',
    },
    selectedUserContainer: {
        height: 40,
        flexDirection: 'row',
        marginBottom: 0,
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        backgroundColor: 'rgb(0,137,235)',
        justifyContent: 'center',
        borderRadius: 5,
    },
    rootContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    flexStyle: {
        flex: 1,
    },
    backContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    searchIcon: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    listContainerStyle: {
        margin: 3,
        marginTop: 10,
    },
    keyboardAvoidContainer: {
        width: '100%',
        paddingHorizontal: 10,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 20,
    },
    selectedUserSubContainer: {
        marginRight: 5,
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
    },
    deleteIcon: {
        alignSelf: 'center',
        width: 12,
    },
    selectedListStyle: {
        width: width90,
        backgroundColor: 'transparent',
    },
    buttonIcon: {
        alignSelf: 'center',
        marginTop: 2,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: Fonts.Arial,
        alignSelf: 'center',
        color: 'white',
    },
});
