import { Dimensions } from 'react-native';
const width95 = (Dimensions.get('window').width * 95) / 100;

const React = require('react-native');
import { Fonts } from 'font_directory/Fonts';
import { width10, width20 } from '../_global/able-soft-component-ui/src/assets/dimensions/width';
import { width15 } from '../../utils/dimensions/width';
let { StyleSheet } = React;

module.exports = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'black',
    },

    listContentContainerStyle: {
        margin: 3,
        marginTop: 10,
        paddingBottom: 50,
    },
    contentContainerStyle: {
        flex: 1,
    },
    searchInput: {
        width: width95,
        borderRadius: 5,
        height: 35,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'absolute',
    },
    searchInputText: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'white',
        alignSelf: 'center',
    },
});
