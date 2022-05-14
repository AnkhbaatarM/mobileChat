import { Platform, StyleSheet } from 'react-native';

import { Fonts } from 'font_directory/Fonts';
import { normalize } from '../../../Gloabal/GlobalFunctions';
import { height10_5, height50 } from '../../utils/dimensions/height';
import { width16, width18 } from '../../utils/dimensions/width';
import {
    width10,
    width20,
    width21,
    width22,
    width6,
    width8,
} from '../../_Components/_global/able-soft-component-ui/src/assets/dimensions/width';
import { height13 } from '../../utils/dimensions/height';

module.exports = StyleSheet.create({
    userTyping: {
        width: 60,
        marginLeft: 10,
        marginBottom: 10,
        height: 40,
        backgroundColor: 'transparent',
    },
    contentContainer: {
        paddingBottom: 80,
    },
    seenUserContainer: {
        width: 20,
        height: 20,
        margin: 5,
    },
    footerListStyle: {
        paddingHorizontal: 10,
        alignSelf: 'flex-end',
        height: 50,
    },
    ListfooterEndContainer: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: 'red',
    },
    seenCount: {
        alignSelf: 'center',
        fontSize: 12,
        color: 'white',
    },
    headerLoadMoreStyle: {
        alignSelf: 'center',
        marginVertical: 10,
    },
    windowButtonContainer: {
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    loaderStyle: {
        flex: 1,
        alignSelf: 'center',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
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
        borderRadius: 20,
        alignSelf: 'center',
    },
    stickyDateText: {
        fontSize: normalize(13),
        fontFamily: Fonts.ArialBold,
        alignSelf: 'center',
        textAlign: 'center',
        color: 'white',
        paddingVertical: 0,
        paddingTop: 0,
        minWidth: 110,
        maxWidth: 200,
        marginBottom: 3,
    },
    stickyDateContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: width8,
        top: 55,
        position: 'absolute',
        zIndex: 100,
        elevation: 100,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        paddingHorizontal: 5,
    },
    scrollContainer: {
        bottom: -100,
        position: 'absolute',
        alignSelf: 'center',
    },
    scrollButton: {
        paddingVertical: 2,
        paddingHorizontal: 10,
        justifyContent: 'space-evenly',
        borderRadius: 10,
        backgroundColor: 'white',
        alignSelf: 'center',
        shadowColor: Platform.OS === 'ios' ? 'gray' : '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        elevation: 3,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#c4ccd4',
        height: 40,
    },
    scrollText: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(14),
        alignSelf: 'center',
        paddingVertical: 0,
        color: '#57647a',
        textAlign: 'left',
        maxWidth: 100,
        minWidth: 0,
    },
});
