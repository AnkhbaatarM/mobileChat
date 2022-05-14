import { height50 } from 'root/Assets/constants/height';

import { StyleSheet, Platform } from 'react-native';
import { width30 } from '../../../utils/dimensions/width';

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
        // maxHeight: 60,
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
    },
    msgSectionContainer: {
        maxHeight: width30,
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 10,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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
        // height: null,
        fontSize: 17,
        textAlignVertical: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 0,
        marginVertical: 5,
        paddingStart: 5,
        // maxHeight: 80,
        paddingVertical: 5,
    },
    centerStyle: {
        alignSelf: 'center',
    },
    sendIconStyle: {
        alignSelf: 'center',
        position: 'absolute',
    },
    sendIconCon: {
        alignSelf: 'center',
        position: 'absolute',
        justifyContent: 'center',
    },
    keyboardAvoidStyle: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 10,
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
    replyContainer: {
        justifyContent: 'space-between',
        alignContent: 'center',
        height: 50,
        width: '90%',
        flexDirection: 'row',
    },
    replyValueContainer: {
        alignSelf: 'center',
    },
    replyText: {
        color: 'gray',
        fontSize: 14,
        fontFamily: 'Roboto-Bold',
    },
    replyTitle: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Roboto',
    },
    replyDelete: {
        alignSelf: 'center',
        width: 40,
        height: 50,
        justifyContent: 'center',
        borderRadius: 20,
    },
    replyIcon: {
        alignSelf: 'center',
    },
});
