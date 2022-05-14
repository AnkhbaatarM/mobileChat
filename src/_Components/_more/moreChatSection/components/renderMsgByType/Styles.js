import { StyleSheet, Platform } from 'react-native';
import module from '@react-native-firebase/app';
import { Fonts } from 'font_directory/Fonts';
import { decode, isEmoji, normalize } from '../../../../../../Gloabal/GlobalFunctions';
import { chatColor } from '../../../../../Socket/Socket_Var';
const marginNum = 5;
const defaultColor = '#178ddf';
const greyColor = '#e5e9ec';

const chatDateText = () => {
    return {
        color: 'gray',
        fontSize: normalize(13),
        fontFamily: Fonts.RobotoMedium,
        marginBottom: 12,
        width: '100%',
    };
};

export const textMsgContainer = (isAuthor, chat, style = {}) => {
    return Object.assign(
        {
            backgroundColor: msgBackground(chat, isAuthor, chat.tmpId),
            borderRadius: 10,
            paddingTop: isEmoji(chat.msg) === '' || chat.msg_type === 2 ? 0 : 6,
            paddingBottom: Platform.OS === 'android' ? 10 : 8,
            paddingHorizontal: 10,
            maxWidth: '75%',
            // marginRight: isAuthor ? marginNum : 0,
        },
        style
    );
};

export const fileContainerStyle = isAuthor => {
    return {
        marginRight: isAuthor ? marginNum : 0,
        alignSelf: 'center',
    };
};
export const msgBackground = (chat, isAuthor, tmpId) => {
    if (tmpId) {
        return '#5c91b7';
    }
    if (isEmoji(chat.msg) === '' || chat.msg_type === 2) {
        return 'transparent';
    } else if (isAuthor && chat.msg_type !== 4) {
        return chatColor;
    } else {
        return greyColor;
    }
};
export const chatTextBackgroundColor = (msg, isAuthor, type) => {
    if (isEmoji(decode(msg)) === '') {
        return 'transparent';
    } else if (isAuthor) {
        return defaultColor;
    } else {
        return greyColor;
    }
};

export const likeStyle = isAuthor => {
    if (isAuthor) {
        return { alignSelf: 'center' };
    } else {
        return { alignSelf: 'center', marginLeft: 5 };
    }
};

export const replyMsgContainer = isAuthor => {
    return {
        maxWidth: '75%',
        justifyContent: isAuthor ? 'flex-end' : 'flex-start',
        alignContent: isAuthor ? 'flex-end' : 'flex-start',
        alignItems: isAuthor ? 'flex-end' : 'flex-start',
    };
};

export const massMsgContainer = isAuthor => {
    return {
        paddingVertical: 5,
        justifyContent: isAuthor ? 'flex-end' : 'flex-start',
        alignContent: isAuthor ? 'flex-end' : 'flex-start',
        alignItems: isAuthor ? 'flex-end' : 'flex-start',
        maxWidth: '100%',
        flexDirection: 'row',
    };
};

export const massMsgIconConatiner = isAuthor => {
    return {
        padding: 5,
        backgroundColor: 'red',
        borderRadius: 5,
        marginRight: isAuthor ? 5 : 0,
        marginLeft: isAuthor ? 0 : 5,
        alignSelf: 'center',
        transform: isAuthor ? null : [{ rotate: '180deg' }],
    };
};

export const massMsgTitleConatiner = isAuthor => {
    return {
        padding: 5,
        backgroundColor: isAuthor ? '#42aef9' : 'white',
        alignSelf: 'center',
        borderRadius: 5,
        borderWidth: isAuthor ? 0 : 1,
        borderColor: '#d3d7da',
        paddingHorizontal: 10,
    };
};

export const massMsgTitle = isAuthor => {
    return {
        fontFamily: Fonts.RobotoRegular,
        color: isAuthor ? 'white' : 'black',
        fontSize: normalize(16),
    };
};
export const styles = StyleSheet.create({
    userName: {
        fontSize: normalize(18),
        fontFamily: Fonts.ArialBold,
        color: 'white',
        alignSelf: 'center',
        width: 150,
    },
    userIcon: {
        alignSelf: 'flex-start',
        width: 25,
        height: 25,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#3b4252',
        top: 0,
    },
    addedUserIcon: {
        alignSelf: 'center',
        width: 30,
        height: 30,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: '#3b4252',
        top: 0,
    },
    addedUser: {
        alignSelf: 'center',
        width: 30,
        height: 30,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: '#3b4252',
        backgroundColor: 'gray',
    },
    authorName: {
        color: 'gray',
        marginLeft: 43,
        fontSize: normalize(12),
        fontFamily: Fonts.RobotoMedium,
        marginBottom: -8,
        marginTop: 10,
    },
    chatDateTextAuthor: Object.assign(chatDateText(), {
        textAlign: 'right',
        paddingRight: 17,
    }),
    chatDateText: Object.assign(chatDateText(), {
        textAlign: 'left',
        paddingLeft: 47,
    }),
    notifyText: {
        color: 'gray',
        fontSize: normalize(13),
        fontFamily: Fonts.RobotoMedium,
        marginVertical: 10,
        marginTop: 20,
        alignSelf: 'center',
        textAlign: 'center',
        width: '90%',
    },
    notifyTextBold: {
        color: 'gray',
        fontSize: normalize(16),
        fontFamily: Fonts.ArialBold,
    },
    authorIcon: {
        alignSelf: 'flex-end',
        width: 20,
        height: 20,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: '#3b4252',
        bottom: 0,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 10,
        backgroundColor: '#3b4252',
        alignSelf: 'flex-start',
    },
    videoChatButton: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        alignSelf: 'flex-end',
        padding: 5,
        borderRadius: 10,
        marginTop: 10,
    },
    videoUnAnsweredContainer: {
        flexDirection: 'row',
    },
    dinDonContainer: {
        flexDirection: 'row',
        marginTop: 2,
    },
    videoCallText: {
        fontFamily: Fonts.RobotoMedium,
        color: 'black',
        alignSelf: 'center',
        marginLeft: 10,
    },
    mainContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    msgType_userAdd: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: 80,
        justifyContent: 'center',
        height: 30,
    },
    dinDonText: {
        fontFamily: Fonts.RobotoMedium,
        color: 'red',
        fontSize: normalize(12.5),
        alignSelf: 'center',
    },
    urlImageStyle: {
        width: 250,
        height: 80,
        borderRadius: 10,
    },
    urlTitleStyle: {
        fontFamily: Fonts.RobotoBold,
        marginVertical: 5,
        fontSize: normalize(15),
        color: 'white',
    },
    deleteButtonContainer: {
        flexDirection: 'row',
        marginLeft: 10,
        alignSelf: 'center',
    },
    deleteButton: {
        width: 35,
        alignSelf: 'center',
        justifyContent: 'center',
        height: 35,
        borderRadius: 15,
    },
    copyButton: {
        width: 35,
        alignSelf: 'center',
        justifyContent: 'center',
        height: 35,
        borderRadius: 15,
    },
    userIconContainer: {
        flexDirection: 'column',
        width: '80%',
        alignSelf: 'center',
    },
    urlContainer: {
        flexDirection: 'row',
    },
    urlTextContainer: {
        flex: 1,
    },
    urlDescStyle: {
        color: 'white',
    },
    fileListcontainer: {
        alignSelf: 'center',
    },
    fileContainerStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
    },
    flexEndStyle: {
        alignSelf: 'flex-end',
    },
    userNotShown: {
        width: 28,
    },
    centerStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
    },
    seenUserContainer: {
        alignSelf: 'flex-end',
        paddingRight: 15,
        marginTop: 10,
    },
    seenUserNameContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
        flexWrap: 'wrap',
        marginTop: 10,
        marginLeft: 10,
    },
    seenUserIconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 5,
        flexWrap: 'wrap',
    },
    seenUserName: {
        color: 'gray',
        marginLeft: 5,
        fontSize: normalize(13),
        fontFamily: Fonts.RobotoMedium,
    },
    deleteDateIcon: {
        alignSelf: 'center',
        width: 30,
        height: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 15,
    },
    hideDateIcon: {
        alignSelf: 'center',
        marginHorizontal: 2,
    },
    stickyValuContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },

    replyView: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        paddingTop: 6,
        paddingBottom: Platform.OS === 'android' ? 20 : 18,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    replyTxt: {
        color: 'rgba(0,0,0,0.4)',
        fontFamily: 'Roboto',
        fontSize: normalize(16),
    },
    replyIcon: {
        alignSelf: 'flex-start',
    },
});

module.exports = {
    styles,
    fileContainerStyle,
    msgBackground,
    chatTextBackgroundColor,
    textMsgContainer,
    likeStyle,
    replyMsgContainer,
    massMsgContainer,
    massMsgIconConatiner,
};
