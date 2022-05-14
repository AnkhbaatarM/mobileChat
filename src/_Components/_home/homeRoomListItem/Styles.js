const React = require('react-native');
import { Fonts } from 'font_directory/Fonts';
let { StyleSheet } = React;
import { width100, width90, width85, width4_5, width19, width18, width5, width95, width99, width94, width84, width80, width50, width40, width45, width6 } from '../../../utils/dimensions/width';
import {  normalize2 } from '../../../../Gloabal/GlobalFunctions';
import module from '@react-native-firebase/app';
import {width0_5, width1, width2, width20, width22, width5_5 } from '../../_global/able-soft-component-ui/src/assets/dimensions/width';
export function msgStyle(hasNew) {
    return {
        color: hasNew ? '#2972d9' : '#7c7c7c',
        fontFamily: hasNew ? Fonts.ArialBold : Fonts.Arial,
    };
}

export const massMsgStyle = hasNew => {
    return {
        color: hasNew ? '#2972d9' : '#F54F52',
        // fontFamily: hasNew ? Fonts.ArialBold : Fonts.Arial,
        // width:width45
    };
};
export const buzzStyle = hasNew => {
    return {
        color: hasNew ? 'red' : '#7c7c7c',
        fontFamily: hasNew ? Fonts.ArialBold : Fonts.Arial,
    };
};
export const dotStyle = hasNew => {
    return {
        backgroundColor: hasNew ? '#2972d9' : '#b5b5b5',
        width: 4,
        height: 4,
        borderRadius: 2.5,
        alignSelf: 'center',
        marginHorizontal: 7,
        marginTop: 2,
    };
};
export const styles = StyleSheet.create({
    userIcon: {
        alignSelf: 'flex-start',
        width: 50,
        height: 50,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'gray',
        marginRight: 10,
    },
    userIconContainer: {
        alignSelf: 'flex-start',
        width: 50,
        height: 50,
        borderColor: 'gray',
        marginRight: 10,
    },
    groupIcon: {
        alignSelf: 'flex-start',
        width: 35,
        height: 35,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: 'white',
        marginRight: 10,
    },
    roomName: {
        fontSize: normalize2(15),
        fontFamily: Fonts.ArialBold,
        color: 'black',
        alignSelf: 'flex-start',
        width: '70%',
    },
    last_date: {
        alignSelf: 'flex-end',
        fontSize: normalize2(14),
        fontFamily: Fonts.Arial,
        color: 'black',
        textAlignVertical: 'center',
        justifyContent: 'center',
    },
    last_msg: {
        alignSelf: 'flex-start',
        fontSize: normalize2(14),
        fontFamily: Fonts.Arial,
        color: 'black',
        textAlignVertical: 'center',
        justifyContent: 'center',
        flexShrink: 1,
    },
    activeViewContainer: {
        width: 25,
        height: 25,
        borderRadius: 17.5,
        position: 'absolute',
        justifyContent: 'center',
        bottom: -5,
        left: 55,
        backgroundColor: 'white',
    },
    activeView: {
        width: 15,
        height: 15,
        backgroundColor: '#21de2e',
        borderRadius: 7.5,
        alignSelf: 'center',
        bottom: -2,
        position: 'absolute',
        left: 56,
    },
    safeAreaView: {
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingVertical:10,
        height:width18,
        width:width94,
        // paddingHorizontal:15
    },
    userStatus: {
        width: width94,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
    },
    userContainer: {
        width: width85 - 60,
        alignSelf: 'center',
        justifyContent: 'flex-start',
    },
    MsgDateText: {
        alignSelf: 'center',
        fontSize: 15,
        fontFamily: Fonts.Arial,
        marginLeft: 5,
        textAlign: 'center',
        color: '#7c7c7c',
    },
    dindonIconStyle: {
        alignSelf: 'center',
    },
    likeIconStyle: {
        alignSelf: 'center',
        marginTop: -2,
    },
    userChatDate: {
        alignSelf: 'flex-start',
        fontSize: 13,
        fontFamily: Fonts.Arial,
        color: 'blue',
    },
    roomItemMainContainer: {
        width: width100,
        height: width20,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    dot: {
        backgroundColor: 'gray',
        height: 6,
        width: 6,
        borderRadius: 3,
        alignSelf: 'center',
        bottom: 10,
    },
    DinDonText: {
        fontFamily: Fonts.Arial,
        backgroundColor: 'white',
        color: 'red',
        fontSize: 15,
        alignSelf: 'center',
    },
    swipeSipCall: {
        height: 50,
        width: 50,
        alignSelf: 'center',
        backgroundColor: '#18b92d',
        justifyContent: 'center',
        borderRadius: 10,
    },
    swipeDelete: {
        height: 50,
        width: 50,
        alignSelf: 'center',
        backgroundColor: '#f3554c',
        justifyContent: 'center',
        borderRadius: 10,
    },
    swipeIcon: {
        alignSelf: 'center',
    },
    swipeContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    msgContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop:React.Platform.OS==='ios'?width0_5:0
    },
    msgTypeIcon: {
        alignSelf: 'center',
        marginRight: 5,
    },
    containerStyle: {
        flex: 1,
        // height: 60,
        justifyContent: 'center',
        // borderWidth:1
        marginLeft:3
    },
    dindonContainer: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center'
    },
    roomIcon: {
        marginRight: 8,
    },
    massIconCon: {
        width: width4_5,
        height: width4_5,
        backgroundColor: '#F54F52',
        borderRadius: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        marginRight: 5,
    },
});

module.exports = {
    styles,
    msgStyle,
    massMsgStyle,
    buzzStyle,
    dotStyle,
};
