

import {Platform, Dimensions} from 'react-native';

const React = require('react-native');
import {Fonts} from 'font_directory/Fonts';
let {StyleSheet} = React;
import {width80, width90, width7, width85} from 'root/Assets/constants/width';

module.exports = StyleSheet.create({
  userIcon: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    // borderRadius: 20,
    // borderWidth: 0.5,
    backgroundColor:'gray'
  },
  userIconRadius: {
    borderWidth: 1,
    borderColor:'rgba(0,0,0,0.3)',
    width: 50,
    height: 50,
    position: 'absolute',
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 20,
  },
  userIconContainer: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    borderColor: 'gray',
    marginRight: 10,
    borderRadius: 20,
    marginLeft:5
  },
  groupIcon: {
    alignSelf: 'center',
    width: 35,
    height: 35,
    // borderWidth: 0.5,
    borderColor: 'white',
    marginRight: 10,
    borderRadius: 20,
  },
  activeView: {
    width: 13,
    height: 13,
    backgroundColor: '#21de2e',
    borderRadius: 7.5,
    alignSelf: 'center',
    position: 'absolute',
    bottom: -1,
    right:-1
  },
});
