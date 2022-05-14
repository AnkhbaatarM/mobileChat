

import { Platform, Dimensions } from 'react-native';

const React = require('react-native');
import { Fonts } from "font_directory/Fonts";
let { StyleSheet, } = React;
const width100 = (Dimensions.get('window').width * 100) / 100;
const height100 = (Dimensions.get('window').height * 100) / 100;
module.exports = StyleSheet.create({
    safeAreaView: {
        width: width100,
        height:height100,
        alignSelf: 'center',
        borderWidth:2,
        borderColor:'black',
        backgroundColor:'black'
    },
});
