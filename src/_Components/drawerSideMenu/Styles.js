import { StyleSheet } from 'react-native';
import { normalize } from '../../../Gloabal/GlobalFunctions';
import { Fonts } from '../../utils/fonts/Fonts';

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
        paddingLeft: 10,
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
        height: 60,
        backgroundColor: 'transparent',
        top: '45%',
        width: '110%',
        justifyContent: 'flex-start',
    },
    gestureLine: Object.assign(gestureLine(), {
        backgroundColor: 'gray',
    }),
    gestureLineActive: Object.assign(gestureLine(), {
        backgroundColor: 'white',
    }),
});
