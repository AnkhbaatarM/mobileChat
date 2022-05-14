
const React = require('react-native');
let {StyleSheet} = React;

module.exports = StyleSheet.create({
  userIcon: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  mainContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  extraCountStyle: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'white',
    fontFamily: 'Roboto-Bold',
  },
});
