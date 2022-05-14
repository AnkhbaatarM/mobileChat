

import { Dimensions } from 'react-native';
const width95 = (Dimensions.get('window').width * 95) / 100;
const width90 = (Dimensions.get('window').width * 90) / 100;

const React = require('react-native');
import { Fonts } from "font_directory/Fonts";
let { StyleSheet, } = React;
const width100 = Dimensions.get('window').width;
const height100 = Dimensions.get('window').height;
const width30 = (width100 * 30) / 100;
const width20 = (width100 * 20) / 100;

module.exports = StyleSheet.create({
    container: {
        
        height: height100,
        width: width100,
        position: 'absolute',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    userIcon: {
        width: (width100 * 30) / 100,
        height: (width100 * 30) / 100,
        borderWidth: 2,
        borderColor:'gray',
        alignSelf: 'center',
        borderRadius: ((width100 * 30) / 100) / 2.2,
        backgroundColor:'gray',
        marginTop:-30
    },
    userName: {
        alignSelf: 'center',
        fontFamily:Fonts.Arial,
        fontSize:20,
        color:'white',
        marginTop:10,
        textAlign:'center'
    },
    CallingContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: (width100 * 70) / 100,
        backgroundColor:'rgba(255,255,255,0.2)',
        padding:3,
        borderRadius:30,
        marginTop:20
    },
    ButtonContainer: {
        width:60,
        height:60,
        justifyContent:'center',
        borderRadius:30
    }

});
