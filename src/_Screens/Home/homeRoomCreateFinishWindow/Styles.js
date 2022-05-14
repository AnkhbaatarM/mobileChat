

import { Dimensions, StyleSheet, Platform } from 'react-native';
const width100 = Dimensions.get('window').width;
const width90 = (Dimensions.get('window').width * 90) / 100;
import { Fonts } from 'font_directory/Fonts';

module.exports = StyleSheet.create({
    userIcon: {
        alignSelf: 'flex-start',
        width: 40,
        height: 40,
        borderRadius: 18,
    },
    selectedUsersName: {
        width: 80,
        alignSelf: 'center',
        fontFamily: Fonts.Arial,
    },
    searchInput: {
        width: width90 - 30,
        backgroundColor: '#EEEEEE',
        borderRadius: 10,
        height: 40,
        paddingHorizontal: 20,
        alignSelf: 'center',
        fontFamily: Fonts.ArialBold,
        borderWidth: 1,
        borderColor: 'gray',
    },
    searchInputContainer: {
        width: width100 - 10,
        borderRadius: 10,
        height: 40,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        marginBottom: 10,
        flexDirection: 'row',
        marginTop: Platform.OS === 'ios' ? 10 : 15,
    },
    titleName: {
        alignSelf: 'center',
        fontFamily: Fonts.RobotoBold,
        fontSize: 16,
        color: 'black',
    },
    imagePickerContainer: {
        backgroundColor: '#EEEEEE',
        borderWidth: 1,
        borderColor: 'gray',
        width: 100,
        height: 100,
        marginVertical: 20,
        borderRadius: 40,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonContainer: {
        width: 130,
        height: 40,
        borderRadius: 10,
        position: 'absolute',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        backgroundColor: 'royalblue',
    },
    buttonTitle: {
        alignSelf: 'center',
        fontFamily: Fonts.ArialBold,
        color: 'white',
        fontSize: 15,
    },
    imageContainerStyle: {
        width: 100,
        height: 100,
        borderRadius: 40,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    cameraIcon: {
        alignSelf: 'center',
        position: 'absolute',
    },
    center: {
        alignSelf: 'center',
    },
    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
    },
    listStyle: {
        margin: 3,
        marginTop: 20,
    },
});
