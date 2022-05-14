import { Dimensions } from 'react-native';
import { width10 } from '../../assets/dimensions/width';
const width69 = (Dimensions.get('window').width * 69) / 100;

const React = require('react-native');
let { StyleSheet } = React;

module.exports = StyleSheet.create({
    buttonContainer: {
        width: width69,
        height: 50,
        backgroundColor: '#03d7fc',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5,
    },
    loadingButtonContainer: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius:width10,
        padding: 2,
    },
    buttonLabel: {
        color: 'white',
        fontSize: 17,
        alignSelf: 'center',
        marginBottom: 2,
    },
    loaderStyle: {
        borderRadius:width10,
        alignSelf: 'center',
        backgroundColor: '#03d7fc',
        width: 50,
        height: 50,
        justifyContent: 'center',
    },
});
