

const React = require('react-native');
import {Fonts} from 'font_directory/Fonts';
import {width100,width60} from 'root/Assets/constants/width';
let {StyleSheet} = React;

module.exports = StyleSheet.create({
  container: {
   width:width100,
   height:50,
   flexDirection:'row',
   justifyContent:'space-evenly'
  },
  imageContainer:{
    width:width60,
    height:40,
    flexDirection:'row',
    alignSelf:'center',
    borderRadius:10
  },
  imageGif:{
    width:width60-40,
    height:30,
    alignSelf:'center',
    borderRadius:10
  },
  timerText:{
    fontFamily:Fonts.ArialBold,
    fontSize:16,
    color:'gray',
    alignSelf:'center',
    width:40,
    textAlign:'center'
  }

});
