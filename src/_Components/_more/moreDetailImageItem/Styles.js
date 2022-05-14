const React = require('react-native');
let { StyleSheet } = React;
import { width85 } from '../../../utils/dimensions/width';
module.exports = StyleSheet.create({
    pictureContainer: {
        width: width85 / 3 - 5,
        height: width85 / 3 - 5,
        borderRadius: 3,
        alignSelf: 'center',
    },
    pictureStyle: {
        width: width85 / 3 - 5,
        height: width85 / 3 - 5,
        borderRadius: 3,
        alignSelf: 'center',
    },
    pictureStyleOverlay: {
        width: width85 / 3 - 5,
        height: width85 / 3 - 5,
        borderRadius: 3,
        alignSelf: 'center',
        position: 'absolute',
        borderWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.3)',
    },
    loaderStyle: {
        alignSelf: 'center',
        position: 'absolute',
        top: 40,
    },
});
