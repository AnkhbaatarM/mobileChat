

import { width80, width90, width7, width85 } from 'root/Assets/constants/width';

import { Platform, StyleSheet } from 'react-native';
import { Fonts } from 'font_directory/Fonts';

module.exports = StyleSheet.create({
    flatListStyle: {
        width: width90 - 30,
        backgroundColor: 'transparent',
    },
    selectedUsersName: {
        width: 80,
        alignSelf: 'center',
        fontFamily: Fonts.Arial,
    },
    userName: {
        fontSize: 15,
        fontFamily: Fonts.ArialBold,
        color: 'white',
        alignSelf: 'flex-start',
    },
    searchInput: {
        width: width90 - 30,
        backgroundColor: '#EEEEEE',
        borderRadius: 10,
        height: 40,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginBottom: 20,
    },
    searchInputContainer: {
        width: width90,
        borderRadius: 10,
        height: 40,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        marginBottom: 10,
        flexDirection: 'row',
        marginTop: Platform.OS === 'ios' ? 10 : 15,
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
        color: 'white',
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
    headerTitle: {
        fontSize: 16,
        fontFamily: Fonts.Arial,
        color: 'black',
        alignSelf: 'center',
        marginVertical: 5,
    },
    normalTextInput: {
        width: '90%',
        alignSelf: 'center',
        fontSize: 15,
        paddingVertical: 10,
        fontFamily: Fonts.Arial,
        color: 'gray',
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    insertButton: {
        height: 40,
        width: 100,
        marginBottom: 0,
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        backgroundColor: 'rgb(0,137,235)',
        justifyContent: 'center',
        borderRadius: 5,
    },
    userIcon: {
        flexDirection: 'row',
        marginTop: 5,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: 'gray',
        height: 40,
        width: 40,
    },
    userContainer: {
        marginRight: 5,
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
    },
    avoidContainer: {
        width: '100%',
        paddingHorizontal: 10,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
});
