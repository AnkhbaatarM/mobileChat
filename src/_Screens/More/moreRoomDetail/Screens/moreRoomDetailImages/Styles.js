import { Dimensions } from 'react-native';
const width90 = (Dimensions.get('window').width * 90) / 100;

const React = require('react-native');
import { Fonts } from 'font_directory/Fonts';
import { width45 } from '../../../../../_Components/_global/able-soft-component-ui/src/assets/dimensions/width';
let { StyleSheet } = React;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    listStyle: {
        alignSelf: 'center',
        width: width90,
        marginLeft:20
    },
    center: {
        alignSelf: 'center',
    },
});
