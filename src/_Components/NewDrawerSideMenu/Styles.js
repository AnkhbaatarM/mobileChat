import { StyleSheet } from 'react-native';
import { normalize } from '../../../Gloabal/GlobalFunctions';
import { width30, width40, width50, width60 } from '../../utils/dimensions/width';
import { Fonts } from '../../utils/fonts/Fonts';
import {
    width10,
    width2,
    width3,
    width5,
    width8,
} from '../_global/able-soft-component-ui/src/assets/dimensions/width';

const buttonContainer = () => {
    return {
        alignItems: 'center',
        bottom: 0,
        alignSelf: 'center',
        marginBottom: 30,
        marginTop: 20,
        width: '80%',
        height: 45,
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
    };
};
const gestureLine = () => {
    return {
        height: '100%',
        width: 7,
        borderRadius: 5,
        backgroundColor: 'white',
        alignSelf: 'flex-start',
    };
};

const drawerItem = () => {
    return {
        height: 45,
        justifyContent: 'center',
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'white',
        padding: 0,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    };
};

export default StyleSheet.create({
    containerStyle: {
        padding: 0,
        backgroundColor: 'white',
        paddingTop: 30,
        flex: 1,
        paddingLeft: 0,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    topContainer: {
        flexDirection: 'row',
        height: 45,
        justifyContent: 'flex-start',
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'white',
        padding: 0,
        marginBottom: 40,
    },
    menuTitle: {
        marginLeft: 10,
        color: 'black',
        alignSelf: 'center',
        fontFamily: Fonts.RobotoBold,
        fontSize: 14,
    },
    roomName: {
        marginLeft: 2,
        color: 'black',
        alignSelf: 'center',
        fontFamily: Fonts.RobotoBold,
        fontSize: normalize(16),
        width:width50,
    },
    drawerItemStyle: Object.assign(drawerItem(), {
        backgroundColor: 'white',
    }),
    drawerItemStyleFocused: Object.assign(drawerItem(), {
        backgroundColor: '#4081C2',
        borderColor: '#4081C2',
    }),
    drawerItemStylePressed: Object.assign(drawerItem(), {
        backgroundColor: '#ddd',
    }),
    menuLabelFlex: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexGrow: 1,
    },
    iconStyle: {
        alignSelf: 'center',
    },
    arrowIcon: {
        position: 'absolute',
        alignSelf: 'center',
        right: 5,
        transform: [
            {
                rotateY: '180deg',
            },
        ],
    },
    gestureContainer: {
        position: 'absolute',
        alignSelf: 'center',
        height: width10,
        backgroundColor: 'transparent',
        top: '45%',
        width: '109%',
        justifyContent: 'flex-start',
    },
    gestureLine: Object.assign(gestureLine(), {
        backgroundColor: 'gray',
    }),
    gestureLineActive: Object.assign(gestureLine(), {
        backgroundColor: 'white',
    }),
    AttachButtonContaniner: {
        marginHorizontal: width8,
        marginTop: width5,
        padding: width3,
        backgroundColor: '#f3f3f3',
        borderRadius: 10,
        flexDirection: 'row',
    },
    attachText: {
        fontSize: normalize(13),
        fontWeight: 'bold',
        color: '#434547',
    },
    modalStyleAttach: {
        margin: 0,
        height: '80%',
        alignSelf: 'flex-end',
        width: '100%',
        bottom: 0,
        marginTop: '20%',
    },
    addUserContainer:{
        marginHorizontal: width8,
        marginTop: width5,
        padding: width3,
        backgroundColor: '#f3f3f3',
        borderRadius: 10,
        flexDirection: 'row',
    },
    attachText: {
        fontSize: normalize(13),
        fontWeight: 'bold',
        color: '#434547',
    },
    addUserText: {
        fontSize: normalize(13),
        fontWeight: 'bold',
        color: '#434547',
        marginLeft:width2
    },
    modalStyle: {
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 20,
        backgroundColor: 'white',
    },
    modalHeader: {
        fontSize: 18,
        fontFamily: Fonts.Arial,
        color: 'black',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelButton: {
        width: '40%',
        height: 40,
        backgroundColor: 'gray',
        borderRadius: 5,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontFamily: Fonts.ArialBold,
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center',
    },
    deleteButton: {
        width: '40%',
        height: 40,
        backgroundColor: 'red',
        borderRadius: 5,
        justifyContent: 'center',
    },
    bottomSheetButton: {
        width: '80%',
        height: 40,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    bottomSheetButtonLabel: {
        alignSelf: 'center',
        fontSize: 18,
        fontFamily: Fonts.ArialBold,
        marginLeft: 10,
    },
});
