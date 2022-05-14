

import {Platform} from 'react-native';
import {width90, width85} from 'utils_dimensions/width';

const React = require('react-native');
import {Fonts} from 'font_directory/Fonts';
let {StyleSheet} = React;

module.exports = StyleSheet.create({
  userIcon: {
    alignSelf: 'flex-start',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
  },
  userName: {
    fontSize: 15,
    fontFamily: Fonts.ArialBold,
    color: 'white',
    alignSelf: 'flex-start',
  },
  searchInputContainer: {
    width: width85,
    borderRadius: 10,
    height: 35,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 10 : 15,
    backgroundColor: '#EEEEEE',
  },
  searchInput: {
    width: width90,
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
    height: 35,
    paddingRight: 20,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  searchInputText: {
    fontFamily: Fonts.Arial,
    color: 'black',
    alignSelf: 'center',
    flex: 1,
    height: 35,
    paddingVertical: 0,
    fontSize: 15,
  },
});
