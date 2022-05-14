import { StyleSheet, Platform } from 'react-native';
import { Fonts } from 'font_directory/Fonts';
import { isEmoji, normalize } from '../../../../../../Gloabal/GlobalFunctions';

export const triangleShape = isAuthor => {
    return {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 11,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white',
        right: isAuthor ? 20 : null,
        left: isAuthor ? null : 20,
        position: 'absolute',
        top: 0,
    };
};
export const triangleShapeDown = isAuthor => {
    return {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopWidth: 11,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'white',
        right: isAuthor ? 20 : null,
        left: isAuthor ? null : 20,
        position: 'absolute',
        top: 189,
    };
};
export const contextMenuContainer = (isAuthor, height = 200) => {
    return {
        right: isAuthor ? 20 : null,
        left: isAuthor ? null : 45,
        height: height,
        width: 200,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    };
};

export const contextCenter = {
    alignSelf: 'center',
};
export const contextMenuValueContainer = isTop => {
    return {
        backgroundColor: 'white',
        position: 'absolute',
        top: isTop ? 0 : 10,
        bottom: isTop ? 10 : 0,
        borderRadius: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        padding: 10,
    };
};

export default StyleSheet.create({
    contextButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        marginBottom: 10,
        backgroundColor: '#f3f4f6',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    contextText: {
        fontFamily: Fonts.Roboto,
        color: '#8d979f',
        fontSize: normalize(12),
        alignSelf: 'center',
        marginTop: 5,
    },

    modalStyle: {
        margin: 0,
        backgroundColor: 'rgba(16,48,84,0.5)',
    },
});
