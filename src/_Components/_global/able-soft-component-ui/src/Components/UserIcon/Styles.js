
const React = require('react-native');
const { normalize } = require('../../../../../../../Gloabal/GlobalFunctions');
let {StyleSheet} = React;

module.exports = StyleSheet.create({
  userIcon: {
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  plusText:{
    color:'white',
    fontSize:normalize(11),
    fontWeight:'bold',
    textAlign:'center'
  }
});
