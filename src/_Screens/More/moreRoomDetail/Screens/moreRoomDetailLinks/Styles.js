import { Dimensions } from 'react-native';
const width90 = (Dimensions.get('window').width * 90) / 100;

const React = require('react-native');
import { Fonts } from 'font_directory/Fonts';
let { StyleSheet } = React;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    listStyle: {
        alignSelf: 'center',
        width: width90,
        marginLeft: 20,
    },
    // listContainerStyle: {
    //     justifyContent: 'space-between',
    //     flex: 1,
    //     paddingBottom: 20,
    //     paddingHorizontal: 10,
    // },
    loadingStyle: {
        alignSelf: 'center',
    },
});
