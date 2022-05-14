import { Dimensions } from 'react-native';
import { normalize, normalize2 } from '../../../../Gloabal/GlobalFunctions';
import { width15 } from '../../../utils/dimensions/width';
import {
    width10,
    width3,
    width4,
    width90,
} from '../../../_Components/_global/able-soft-component-ui/src/assets/dimensions/width';
const width85 = (Dimensions.get('window').width * 85) / 100;
const React = require('react-native');

let { StyleSheet } = React;

module.exports = StyleSheet.create({
    labelContainer: {
        height: width15,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        width:width90,
    },
    labelText: {
        fontSize: normalize2(16),
        fontWeight: 'bold',
        color: '#434647',
        marginBottom:3
    },
    iconStyle: {
        marginHorizontal: width3,
        marginBottom:5
        // marginTop: 2,
    },
    iconStyleTop: {
        marginHorizontal: width3,
        marginBottom:2,
    },
});
