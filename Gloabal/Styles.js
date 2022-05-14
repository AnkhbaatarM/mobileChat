

import {Fonts} from '../src/utils/Fonts';

var React = require('react-native');

var {
    StyleSheet,
} = React;

module.exports = StyleSheet.create({
    alwaysred: {
        backgroundColor: 'red',
        height: 100,
        width: 100,
    },
    scene: {
        flex: 1,
    },
    background: {
        flex: 1,
        backgroundColor: 'rgba(179,187,199,0.49)',
    },
    containerDialogHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 5
    },
    FullScreenHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    checkedUserContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    containerRuleFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 5
    },
    containerFlat: {
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0)',
        flex: 1
    },
    VerticalView: {
        width: '90%',
        marginStart: 5,
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    DialogVertivalView: {
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    OutsideVerticalView: {
        marginEnd: 10,
        marginStart: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderColor: "rgba(255,255,255,0)",
        borderRadius: 20,
        flexDirection: 'column',
        borderWidth: 3,
        marginBottom: 5,
    },
    DialogVerticalView: {
        width: '90%',
        flexDirection: 'column',
        marginBottom: 5,
    },
    DialogVerticalFileView: {
        width: '50%',
        flexDirection: 'column',
        marginBottom: 5,

    },
    DialogShiftRuleContain: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 5,
        marginTop: 5,
        borderWidth: 2,
        borderColor: '#c4c4c4',
        flexDirection: 'column',
    },
    DialogShiftCloseContainRed: {
        padding: 5,
        borderRadius: 5,
        borderColor: 'rgb(255,103,103)',
        marginBottom: 5,
        marginTop: 5,
        borderWidth: 2,
        backgroundColor: '#eaa8a8',
        flexDirection: 'column',
    },
    DialogShiftCloseContainGreen: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#ccf6cf',
        marginBottom: 5,
        marginTop: 5,
        borderWidth: 2,
        borderColor: '#9dd1a1',
        flexDirection: 'column',
    },
    FinishedRed: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#c65144',
        marginBottom: 5,
        marginTop: 5,
        flexDirection: 'row',
    },
    FinishedGreen: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#66a975',
        marginBottom: 5,
        marginTop: 5,
        flexDirection: 'row',
    },
    FinishedTrans: {
        borderRadius: 5,
        backgroundColor: 'rgba(255,15,0,0)',
        marginBottom: 5,
        marginTop: 5,
        flexDirection: 'row',
    },
    placeholderSharedImageIcon: {
        width: 40,
        height: 40,
        marginTop: 3,
        borderRadius: 17,
        borderColor: 'rgba(108,108,108,0.41)',
        borderWidth: 1,
        marginRight: 5,
        position: 'absolute',
    },
    sharedImageIcon: {
        width: 40,
        height: 40,
        marginTop: 3,
        borderRadius: 17,
        borderColor: 'rgba(108,108,108,0.41)',
        borderWidth: 1,
        marginRight: 5,
    },
    UserListImage: {
        width: 40,
        height: 40,
        borderRadius: 17,
        marginHorizontal: 3,
        borderColor: 'rgba(108,108,108,0.41)',
        borderWidth: 1,
        marginRight: 5,
        position: 'absolute',
    },
    UserListImagePlaceHolder: {
        width: 40,
        height: 40,
        borderRadius: 17,
        marginHorizontal: 3,
        borderColor: 'rgba(108,108,108,0.41)',
        borderWidth: 1,
        marginRight: 5,
        position: 'absolute',
    },
    GroupListFirstPH: {
        width: 30,
        height: 60,
        position: 'absolute',
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
        borderWidth:1,
    },
    GroupListFirst: {
        width: 30,
        height: 60,
        position: 'absolute',
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
        borderWidth:1,
    },
    GroupListSecond: {
        width: 30,
        height: 30,
        position: 'absolute',
        left:30,
        borderTopRightRadius:20,
        borderWidth:1,
    },
    GroupListSecondPH: {
        width: 30,
        height: 30,
        position: 'absolute',
        left:30,
        borderTopRightRadius:20,
        borderWidth:1,
    },
    GroupListThird: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 30,
        left:30,
        borderBottomRightRadius:20,
        borderWidth:1,
    },
    GroupListThirdPH: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 30,
        left:30,
        borderBottomRightRadius:20,
        borderWidth:1,
    },
    GroupListFift: {
        width: 40,
        height: 30,
        backgroundColor: '#34c9ff',
        borderRadius: 20,
        position: 'absolute',
        alignContent: 'center',
        alignItems: 'center',
        left: 60,
        padding: 5
    },
    BackButton: {
        width: 40,
        height: 40,
        marginRight: 5,
        marginVertical: 10
    },
    commentImageIcon: {
        width: 40,
        height: 40,
        borderRadius: 17,
        borderColor: 'rgba(108,108,108,0.41)',
        borderWidth: 1,
        marginRight: 5
    },
    commentImageIconPlaceHolder: {
        width: 40,
        height: 40,
        borderRadius: 17,
        borderColor: 'rgba(108,108,108,0.41)',
        borderWidth: 1,
        marginRight: 5,
        position: 'absolute',
    },
    DoneImageIcon: {
        width: 40,
        height: 40,
        marginRight: 5
    },
    ButtonBlue: {
        padding: 10,
        backgroundColor: 'rgba(231,243,255,0.49)',
        borderRadius: 10,
        marginStart: 10,
        marginTop: 20,
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'column',
    },
    ButtonBlueTest: {
        height: 40,
        backgroundColor: 'rgba(231,243,255,0.49)',
        borderRadius: 10,
        alignItems: 'center',
        alignContent: 'center',
    },
    ButtonClose: {
        alignItems: 'flex-end',
        width: '30%'
    },
    ButtonDownload: {
        alignItems: 'flex-end',
        width: '30%'
    },
    FullScreenClose: {
        alignItems: 'flex-start',
        width: '30%'
    },
    TimeAndDateLast: {
        alignItems: 'flex-end',
        width: '100%',
        color: '#a6a6a6'

    },
    HorizontalView: {
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    DialoglView: {
        width: '100%',
        flexDirection: 'row',
    },
    CommentSendContainer: {
        width: '90%',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    HorizontalFlexableTextView: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    HorizontalFlexableFile: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
    },
    textVert: {
        width: '90%',
        color: 'black',
        alignItems: 'flex-start',
        flexDirection: 'row',
        flex: 1,
    },
    textVertGray: {
        color: 'gray',
        alignItems: 'flex-start',
        flexDirection: 'row',
        flex: 1,
    },
    drawerImageIcon: {
        width: 50,
        height: 50,
        marginTop: 3,
        borderRadius: 20,
        borderColor: 'rgba(108,108,108,0.41)',
        borderWidth: 1,
    },
    codeSendDoneGif: {
        width: 50,
        height: 50,
    },
    placeholderImageIcon: {
        width: 50,
        height: 50,
        marginTop: 3,
        borderRadius: 20,
        borderColor: 'rgba(108,108,108,0.41)',
        borderWidth: 1,
        position: 'absolute',
    },
    usersIcon: {
        padding: 3,
        borderRadius: 20,
        borderColor: 'rgb(77,145,255)',
        alignItems: 'center',
        alignContent: 'center',
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5
    },
    usersCount: {
        borderRadius: 5,
        backgroundColor: 'rgb(77,145,255)',
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5
    },
    ImageClose: {
        width: 30,
        height: 30,
    },
    animatedImageIcon: {
        width: 25,
        height: 25,
        borderRadius: 20,
        position: 'absolute',
        end: -10,
        top: -10,
    },
    dialogImageIcon: {
        width: 40,
        height: 40,
        marginTop: 3,
        borderRadius: 10,
        borderColor: 'rgba(108,108,108,0.41)',
        borderWidth: 1,
    },
    dialogImageIconPlaceHolder: {
        width: 40,
        height: 40,
        marginTop: 3,
        borderRadius: 10,
        borderColor: 'rgba(108,108,108,0.41)',
        borderWidth: 1,
        position: 'absolute',
    },
    tabbar: {
        width: '100%',
        backgroundColor: '#3f51b5',
    },
    tab: {
        width: '100%',
    },
    indicator: {
        backgroundColor: '#ffeb3b',
    },
    label: {
        color: '#fff',
        fontWeight: '400',
    },
    textInput: {
        width: 180,
        height: 40,
        borderColor: 'rgba(34,100,134,0.39)',
        borderWidth: 1,
        borderRadius: 10,
    },
    textInputClose: {
        width: 140,
        height: 40,
        borderColor: 'rgba(34,100,134,0.39)',
        borderWidth: 1,
        borderRadius: 5,
    },
    textInputCloseNote: {
        width: '100%',
        height: 100,
        borderColor: 'rgba(34,100,134,0.39)',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 5
    },
    textInputShiftNote: {
        width: '100%',
        height: 100,
        borderColor: 'rgba(34,100,134,0.39)',
        borderWidth: 1,
        borderRadius: 5,
    },
    DomainPickerStyle: {
        width: '100%',
        height: 40,
        borderColor: '#5EC8BE',
        borderWidth: 2,
        borderRadius: 5,
        alignItems: 'center',
        alignContent: 'center',
    },
    textPickerStyleType: {
        width: 130,
        height: 35,
        backgroundColor: '#5EC8BE',
        borderRadius: 5,
        alignItems: 'center',
        alignContent: 'center'
    },
    textPickerStyleAct: {
        width: 130,
        height: 35,
        backgroundColor: '#FF9300',
        borderRadius: 5,
        alignItems: 'center',
        alignContent: 'center'
    },
    text: {
        color: 'black',
        alignItems: 'center',
    },
    dialogTextUser: {
        color: '#00abfc',
        fontSize: 12,
    },
    dialogText: {
        color: '#a6a6a6',
        fontSize: 14,
        position: 'absolute',
        end: 20,
    },
    dialogTextTime: {
        color: '#a6a6a6',
        fontSize: 14,
        position: 'absolute',
        end: 100
    },
    TextGray: {
        color: '#a6a6a6',
        fontSize: 14,
    },
    textBlack: {
        color: 'black',
        fontFamily:Fonts.ArialBold,
        fontSize: 13,
    },
    textDialogHeader: {
        color: 'black',
        fontFamily:Fonts.ArialBold,
        fontSize: 13,
        width: '70%'
    },
    textSmallBlack: {
        color: 'black',
        fontSize: 13,
        flex: 1
    },
    textBoldBlack: {
        color: 'black',
        fontSize: 14,
        flex: 1
    },
    textSmallWhite: {
        color: 'white',
        fontSize: 13,
        flex: 1
    },
    textSmallWhiteNoFlex: {
        color: 'white',
        fontSize: 13,
    },
    textSmallSoftRed: {
        color: '#C17878',
        fontSize: 13,
        flex: 1
    },
    textSmallSoftGreen: {
        color: '#468d4b',
        fontSize: 13,
        flex: 1
    },
    textYellowBold: {
        color: '#9b6850',
        fontFamily:Fonts.ArialBold,
        fontSize: 15,
    },
    FullScreenHeader: {
        color: 'black',
        fontFamily:Fonts.ArialBold,
        fontSize: 13,
        width: '40%',
        alignItems: 'center',
        textAlign: 'center'
    },
    textYellowSmallerBold: {
        color: '#9b6850',
        fontSize: 13,
    },
    textWhiteBold: {
        color: 'white',
        fontFamily:Fonts.ArialBold,
        fontSize: 15,
    },
    textWhiteSmallerBold: {
        color: 'white',
        fontSize: 13,
    },
    textWhiteSmallerBoldWithMargin: {
        color: 'white',
        marginVertical: 5
    },
    textWhiteBigBoldWithMargin: {
        color: 'white',
        fontSize: 20,
        marginVertical: 5
    },
    Shift_CloseButton: {
        width: '48%',
        borderRadius: 10,
        marginHorizontal: 3,
        backgroundColor: 'rgba(255,24,24,0.74)',
        alignContent: 'center',
        alignItems: 'center'
    },
    Shift_Button: {
        width: '48%',
        borderRadius: 10,
        marginHorizontal: 3,
        backgroundColor: '#00a6ff',
        alignContent: 'center',
        alignItems: 'center'
    },
    Shift_CloseFinal_Button: {
        width: '100%',
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: '#00a6ff',
        alignContent: 'center',
        alignItems: 'center'
    },
    textGraySmallerBold: {
        color: '#858585',
        fontSize: 13,
    },
    textBlueBold: {
        color: '#4c6e9b',
        fontFamily:Fonts.ArialBold,
        fontSize: 15,
    },
    textBlueSmallerBold: {
        color: '#4c6e9b',
        fontSize: 13,
    },
    textSoftRedBold: {
        color: '#e94e4e',
        fontFamily:Fonts.ArialBold,
        fontSize: 15,
    },
    textSoftRedSmallerBold: {
        color: '#e94e4e',
        fontSize: 13,
    },
    textBlue: {
        color: '#6cc0fc',
        fontFamily:Fonts.ArialBold,
        fontSize: 14,
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    Image: {
        width: 150,
        height: 200,
        marginRight: 5,
        borderRadius: 20,
        borderColor: 'rgba(108,108,108,0.41)',
        borderWidth: 2,
    },
    ImageFiles: {
        width: 100,
        height: 150,
        marginRight: 5,
        borderRadius: 20,
        borderColor: 'rgba(108,108,108,0.41)',
        borderWidth: 2,
    },
    File: {
        width: 150,
        height: 200,
        marginRight: 5,
        resizeMode: 'stretch'
    },
    FileIcons: {
        width: 100,
        height: 150,
        marginRight: 5,
        resizeMode: 'stretch'
    },
    AuthNumber: {
        width: 90,
        height: 80,
        borderWidth: 2,
        borderColor: '#e0cbad',
        backgroundColor: '#fbeedb',
        borderRadius: 5,
        textAlign: 'center',
        alignItems: 'center',
        alignContent: 'center',
        paddingTop: 3,
    },
    LeftDaysBlue: {
        width: 90,
        height: 80,
        borderWidth: 2,
        borderColor: '#9bb3d3',
        backgroundColor: '#d0dff4',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 5,
        textAlign: 'center',
        paddingTop: 5,
    },
    LeftDaysGreen: {
        width: 90,
        height: 80,
        borderWidth: 2,
        borderColor: '#45ac65',
        backgroundColor: '#5ed783',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 5,
        textAlign: 'center',
        paddingTop: 5,
    },
    LeftDaysRed: {
        width: 90,
        height: 80,
        borderWidth: 2,
        borderColor: '#d65453',
        backgroundColor: '#ef6f6e',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 5,
        textAlign: 'center',
        paddingTop: 5,
    },
    LeftDaysSoftRed: {
        width: 90,
        height: 80,
        borderWidth: 2,
        borderColor: '#eaa8a8',
        backgroundColor: '#fae1e1',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 5,
        textAlign: 'center',
        paddingTop: 5
    },
    LeftGray: {
        width: 90,
        height: 80,
        borderWidth: 2,
        borderColor: '#9e9e9e',
        backgroundColor: '#dddddd',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 5,
        textAlign: 'center',
        paddingTop: 10,
    },
    Soundplayer: {
        width: 100,
        height: 30,
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#8d8a92',
        backgroundColor: '#e6e6e6',
        alignContent: 'center',
        textAlign: 'center',
        borderRadius: 5,
        alignItems: 'flex-start',
        padding: 3,
        flexDirection: 'row',
    },
    AboutSvg: {
        width: 5,
        height: '100%',
        marginBottom: 3,
        marginTop: 3
    },
    LoginAboutSvg: {
        width: '100%',
        height: 5,
        marginBottom: 3,
        marginTop: 3
    },
    SaperatorSvg: {
        height: 5,
        width: '100%',
        marginBottom: 3,
        marginTop: 3
    },
    SeparatorSmall: {
        height: 5,
        width: '90%',
        marginBottom: 3,
        marginTop: 3
    },
    button: {
        width: 250,
        height: 40,
        backgroundColor: '#fc431e',
        padding: 10,
        borderColor: '#fff',
        borderRadius: 30,
        borderWidth: 2,
        alignItems: 'center'
    },
    drawerButton: {
        width: '100%',
        height: 40,
        backgroundColor: 'rgba(255,255,255,0)',
        padding: 10,
        borderColor: '#ffffff',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: 20,
        flexDirection: 'row',
    },
    drawerText: {
        width: '100%',
        height: '100%',
        color: '#000000',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: 15,
        marginLeft: 15,
        fontFamily:Fonts.ArialBold,
    },
    drawerImage: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    drawerVert: {
        flexDirection: 'column',
        width:'70%',
        padding: 5
    },
    UserManagerIconPlaceHolder: {
        width: 70,
        height: 70,
        borderRadius: 30,
        margin: 5,
        borderWidth: 1,
        borderColor: 'rgb(255,255,255)',
        position: 'absolute',
    },
    UserManagerIcon: {
        width: 70,
        height: 70,
        borderRadius: 30,
        margin: 5,
        borderWidth: 1,
        borderColor: 'rgb(255,255,255)'
    },
    UserManagerImageBackground: {
        width: '100%',
        height: 140,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    UserManagerLikeContain: {
        width: '100%',
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        alignContent: 'center'
    },
    ShiftCloseContain: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    UserManagerLike: {
        width: 44,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'rgb(255,112,112)'

    },
    UserManagerUserData: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    UserManagerTextBig: {
        width: '90%',
        fontSize: 18,
        color: 'white'
    },
    UserManagerTextMin: {
        width: '90%',
        fontSize: 15,
        color: 'white'
    },
    UserManagerTextSmall: {
        fontSize: 13
    },
    UserManagerTextSmallHead: {
        fontSize: 13,
        color: 'rgba(0,137,255,0.7)'
    },
    UserManagerTextStatus: {
        width: '80%',
        fontSize: 13
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 30,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    navBottomContainer: {
        position: 'absolute',
        bottom: 0,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 15,
        backgroundColor: 'rgba(255,255,255,0)',
    },
    progress: {
        alignItems: 'center',
        marginLeft: 2
    },
    Pickercontainer: {
        paddingVertical: 40,
        paddingHorizontal: 10,
        flex: 1,
    },
    imageUser: {
        position: 'absolute',
        end: 10,
        height: 27,
        width: 25,
    },
    shiftIcon: {
        height: 27,
        width: 25,
        marginRight: 3
    },
    shiftAdd: {
        height: 20,
        width: 20,
        end: 10,
        position: 'absolute',
    },
    actionButtonIcon: {
        height: 42,
        width: 42,
    },
    actionButtonIconAll: {
        height: 32,
        width: 32,
    },
    MainactionButtonIcon: {
        height: 70,
        width: 70,
    },
    Main2actionButtonIcon: {
        height: 60,
        width: 60,
    },
    imageKey: {
        position: 'absolute',
        end: 10,
        height: 27,
        width: 27,
    },

    buttonIcon: {
        height: 27,
        width: 27,
        marginLeft: 5,
        marginTop: 5,
    },
    bottomSvg: {
        height: 5,
        width: '100%',
        marginBottom: 3,
    },
    textInputLogin: {
        marginTop: 5,
        fontSize: 18,
        flex: 1,
    },
    textInputShift: {
        width: '60%',
        marginTop: 5,
        fontSize: 18,
        flexDirection: 'row',
        flex: 1
    },
    buttonAuthcontain: {
        marginLeft: 15,
        fontSize: 13,
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
    },
    AboutButton: {
        marginLeft: 15,
        fontSize: 13,
        flex: 1,
        backgroundColor: 'rgb(205,51,26)',
        alignContent: 'center',
        alignItems: 'center',
    },
    textInputContainer: {
        height: 50,
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        flexDirection: 'row',
    },
    textInputShiftContainer: {
        height: 40,
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    bottomButtonContainer: {
        alignContent: 'stretch',
        alignItems: 'stretch',
        flexDirection: 'row',
        marginLeft: 15,
    },
    AboutContainer: {
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    DomainContainer: {
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
    },
    BottomContainer: {
        alignItems: 'center',
        width: '80%',
        backgroundColor: 'rgba(255,255,255,0)',
        flex: 1,
        flexDirection: 'row',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 15
    },
    textWhite: {
        color: 'white',
        fontSize: 20,
    },
    textAuth: {
        color: 'white',
        fontSize: 13,
        alignContent: 'center'
    },
    textGray: {
        color: 'rgba(95,95,95,0.78)',
        fontSize: 13,
        alignContent: 'center'
    },
    textHeader: {
        color: 'rgba(23,8,8,0.79)',
        fontSize: 30,
    },
    textBottom: {
        width: '100%',
        color: 'rgba(23,8,8,0.79)',
        fontSize: 15,
        marginBottom: 5,
        marginLeft: 5,
        end: 10,
    },
    Viewbutton: {
        paddingLeft: 20,
        borderRadius: 5,
        alignItems: 'center',
        alignContent: 'center',
    },
    Loginbutton: {
        height: 50,
        padding: 10,
        backgroundColor: 'rgba(224,11,0,0.79)',
        borderRadius: 5,
        marginBottom: 15,
        marginTop: 15,
        alignItems: 'center',
    },
    SaveTxt: {
        height: 40,
        backgroundColor: '#62C6FF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        alignContent: 'center',
        flex: 1,
        color: 'white',

    },
    DontSaveTxt: {
        height: 40,
        backgroundColor: 'rgba(52,83,104,0.48)',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        alignContent: 'center',
        flex: 1,
        color: 'white',
    },
    buttonAuthSend: {
        height: 40,
        width: '100%',
        backgroundColor: '#2f97df',
        borderRadius: 3,
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 10,
        flexDirection: 'row',
    },
    AboutLink: {
        height: 40,
        width: '100%',
        backgroundColor: 'rgba(47,151,223,0)',
        flexDirection: 'row',
        marginTop: 10
    },
    AboutFb: {
        height: '100%',
        borderRadius: 3,
        alignItems: 'center',
        alignContent: 'center',
        marginRight: 10,
        flexDirection: 'row',
    },
    AboutTwitter: {
        height: '100%',
        borderRadius: 3,
        alignItems: 'center',
        alignContent: 'center',
        marginRight: 10,
        flexDirection: 'row',
    },
    AboutAble: {
        height: '100%',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
    },
    AboutIcons: {
        width: 40,
        height: 40,
    },
    buttonAbout: {
        height: 40,
        backgroundColor: 'rgb(205,51,26)',
        borderRadius: 3,
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 10,
        marginTop: 20,
        flexDirection: 'row',
    },
    buttonAuthResend: {
        height: 40,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0)',
        borderRadius: 3,
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 10,
        marginTop: 20,
        flexDirection: 'row',
    },
    buttonAuth: {
        height: 40,
        backgroundColor: '#8892a0',
        borderRadius: 3,
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 10,
        marginTop: 20,
        flexDirection: 'row',
    },
    AuthHtml: {
        height: 30,
        backgroundColor: 'rgba(168,223,255,0)',
        alignItems: 'center',
        paddingBottom: 30
    },
    imageIcon: {
        width: 70,
        height: 70,
        borderRadius: 30,
        borderColor: 'rgba(108,108,108,0.41)',
        borderWidth: 1,
        alignItems: 'center',
        alignContent: 'center'
    },
    imageIconPlaceHolder: {
        width: 70,
        height: 70,
        borderRadius: 30,
        borderColor: 'rgba(108,108,108,0.41)',
        borderWidth: 1,
        alignItems: 'center',
        alignContent: 'center',
        position: 'absolute',
    },
    checkIcon: {
        width: 20,
        height: 20,
        marginLeft: 5
    },
    playIcon: {
        width: 20,
        height: 20,
    },
    imageAbout: {
        width: 90,
        height: 90,
        alignItems: 'center',
        alignContent: 'center',
        marginRight: 15
    },
    textAboutHeader: {
        color: 'rgb(205,51,26)',
        fontSize: 25,
    },
    textAboutHeaderBody: {
        color: 'rgba(24,0,0,0.43)',
        fontSize: 18,
    },
    textAboutBody: {
        color: 'rgba(24,0,0,0.51)',
        fontSize: 18,
    },
});
