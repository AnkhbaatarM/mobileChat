

import { StyleSheet } from 'react-native';
import { normalize } from '../../../../Gloabal/GlobalFunctions';
import { Fonts } from '../../../utils/fonts/Fonts';

module.exports = StyleSheet.create({
    seenUserListStyle: {
        flex: 1,
        width: '100%',
        borderRadius: 5,
        alignSelf: 'center',
    },
    mainContainer: {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        borderRadius: 5,
        width: '100%',
        // top: -30,
        bottom: -30,
        paddingBottom: 100,
    },
    moreHeader: {
        fontSize: normalize(17),
        fontFamily: Fonts.ArialBold,
        color: 'black',
        alignSelf: 'center',
    },
    buttonStyle: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '90%',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 50,
        marginBottom: 50,
        borderRadius: 5,
    },
});
