const React = require('react-native');
import { Fonts } from 'font_directory/Fonts';
let { StyleSheet } = React;
import { width100, width90 } from '../../../utils/dimensions/width';
import { height100 } from '../../../utils/dimensions/height';

module.exports = StyleSheet.create({
    safeAreaView: {
        flexGrow: 1,
        alignSelf: 'center',
        backgroundColor: 'black',
        paddingTop: 40,
        width: '100%',
        height: '100%',
    },
    imageStyle: {
        flex: 1,
    },
    moreContainer: {
        width: width90,
        borderRadius: 5,
        // height: 35,
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
    },
    loaderView: {
        width: '100%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        position: 'absolute',
        alignSelf: 'center',
    },

    moreText: {
        fontSize: 13,
        fontFamily: 'Roboto',
        color: 'white',
        alignSelf: 'center',
    },
    button: {
        padding: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 10,
        // height: 50,
        justifyContent: 'center',
        paddingHorizontal:10
    },
    iconStyle: {
        alignSelf: 'center',
    },
});
