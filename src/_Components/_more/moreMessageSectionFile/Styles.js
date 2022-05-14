

const React = require('react-native');
import { height50 } from 'root/Assets/constants/height';

let { StyleSheet } = React;

module.exports = StyleSheet.create({
    msgButtonContainer: {
        width: 40,
        height: 50,
        marginLeft: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 5,
    },
    msgItemsContainer: {
        flex: 1,
        borderRadius: 15,
        marginBottom: 5,
        maxHeight: 60,
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
    },
    msgSectionContainer: {
        maxHeight: 100,
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 10,
        alignSelf: 'center',
        alignItems: 'center',
    },
    fileContainer: {
        width: 40,
        height: 40,
        borderRadius: 15,
        alignSelf: 'center',
        marginHorizontal: 10,
        justifyContent: 'center',
    },
    textInputStyle: {
        flex: 1,
        height: null,
        fontSize: 17,
        textAlignVertical: 'center',
        justifyContent: 'center',
        minHeight: 40,
        width: '100%',
        padding: 0,
        marginVertical: 5,
        maxHeight: 80,
    },
    centerStyle: {
        alignSelf: 'center',
    },
    keyboardAvoidStyle: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    fileSelecterContainer: {
        width: '100%',
        height: 80,
    },
    fileListStyle: {
        width: '100%',
        height: 80,
    },
    emojiContainerStyle: {
        width: '100%',
        height: height50,
    },
    containerFlex: {
        flexDirection: 'row',
    },
});
