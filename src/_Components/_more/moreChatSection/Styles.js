var React = require('react-native');
var { StyleSheet } = React;
import { Fonts } from 'font_directory/Fonts';
import { normalize, normalize2 } from '../../../../Gloabal/GlobalFunctions';
import { height50 } from '../../../utils/dimensions/height';

export const triangleContextMenu = isAuthor => {
    return {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        // borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 11,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'rgba(36, 45, 65,0.8)',
        right: isAuthor ? 10 : null,
        left: isAuthor ? null : 10,
        marginBottom: -11,
        position: 'absolute',
    };
};
export const contextMenuContainer = isAuthor => {
    return {
        position: 'absolute',
        height: 100,
        right: isAuthor ? 40 : null,
        left: isAuthor ? null : 40,
        top: '105%',
        width: 160,
    };
};

const stickyDateView = () => {
    return {
        height: 28,
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: '#ebecee',
        flexDirection: 'row',
        alignSelf: 'center',
        marginLeft: 5,
        paddingHorizontal: 5,
    };
};
const stickyRow = () => {
    return {
        height: 2.5,
        backgroundColor: '#ebecee',
        borderRadius: 1,
        flexGrow: 1,
        width: '100%',
        alignSelf: 'center',
        position: 'absolute',
        left: 0,
    };
};

const stickyDateText = () => {
    return {
        fontSize: normalize(13),
        fontFamily: Fonts.ArialBold,
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginHorizontal: '5%',
    };
};
const chatDateText = () => {
    return {
        color: 'gray',
        fontSize: normalize2(12),
        fontFamily: Fonts.RobotoMedium,
        marginBottom: 12,
        width: '100%',
    };
};
const fromName = () => {
    return {
        color: 'gray',
        fontSize: normalize2(12),
        fontFamily: Fonts.RobotoMedium,
        width: '100%',
        marginBottom: 5,
    };
};

export const contextCenter = {
    alignSelf: 'center',
};

export default StyleSheet.create({
    userName: {
        fontSize: normalize(18),
        fontFamily: Fonts.ArialBold,
        color: 'white',
        alignSelf: 'center',
        width: 150,
    },
    userIcon: {
        alignSelf: 'flex-start',
        width: '100%',
        flexGrow: 1,
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
        marginTop: 10,
    },
    fromNameAuthor: Object.assign(fromName(), {
        textAlign: 'right',
        paddingRight: 20,
    }),
    fromName: Object.assign(fromName(), {
        textAlign: 'left',
        paddingLeft: 47,
    }),
    chatDateTextAuthor: Object.assign(chatDateText(), {
        textAlign: 'right',
        paddingRight: 20,
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
    stickyDateContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40,
        alignSelf: 'center',
        marginVertical: 10,
    },
    stickyRow: Object.assign(stickyRow(), { backgroundColor: '#ebecee' }),
    stickyRowActive: Object.assign(stickyRow(), { backgroundColor: '#dee0e3' }),

    stickyDateText: Object.assign(stickyDateText(), { color: '#737c88' }),
    stickyDateTextActive: Object.assign(stickyDateText(), { color: '#47505a' }),

    stickyDateView: Object.assign(stickyDateView(), { backgroundColor: '#ebecee' }),
    stickyDateViewActive: Object.assign(stickyDateView(), { backgroundColor: '#dee0e3' }),

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
        marginHorizontal: 5,
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
        maxWidth: '80%',
    },
    flexEndStyle: {
        alignSelf: 'flex-end',
        marginRight: 5,
    },
    userNotShown: {
        width: 33,
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
    deleteText: {
        fontFamily: Fonts.Roboto,
        color: 'gray',
        fontSize: normalize(14),
        alignSelf: 'center',
    },
    seenUserStyle: {
        backgroundColor: 'white',
        width: '100%',
        height: height50,
        borderRadius: 20,
        alignSelf: 'center',
        paddingVertical: 30,
    },
    seenUserListStyle: {
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
        borderRadius: 5,
        alignSelf: 'center',
    },
    contextButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: 60,
        marginBottom: 10,
    },
    contextText: {
        fontFamily: Fonts.Roboto,
        color: '#8d979f',
        fontSize: normalize(12),
        alignSelf: 'center',
        marginTop: 5,
    },
    contextMenuConatiner: {
        backgroundColor: 'rgba(36, 45, 65,0.8)',
        position: 'absolute',
        top: 10,
        borderRadius: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        padding: 10,
    },
});
