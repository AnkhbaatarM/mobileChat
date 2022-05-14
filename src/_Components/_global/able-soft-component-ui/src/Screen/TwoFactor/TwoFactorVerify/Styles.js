import {StyleSheet} from 'react-native';
import {width60} from '../../../assets/dimensions/width';

export default StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  warningText: {
    color: '#8f959c',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    width: '40%',
    marginTop: 50,
    fontSize: 15,
  },
  scrollContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  textBoxes: {
    marginTop: 30,
    height: 50,
    flex: 0,
  },
  textBox: {
    borderBottomWidth: 1,
    borderColor: '#8f959c',
    marginHorizontal: 5,
  },
  mainbutton: {
    height: 50,
    width: width60,
    backgroundColor: '#dd6365',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  mainbuttontext: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subbutton: {
    width: 169,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 28,
    color: '#a7a6a6',
  },
  backButton: {
    width: 169,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 0,
    borderRadius: 28,
    color: '#a7a6a6',
  },
  subbuttontext: {
    alignSelf: 'center',
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
  },
  root: {
    borderWidth: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
  },
  codeFieldRoot: {
    marginVertical: 20,
    width: width60,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
  cell: {
    width: 30,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderColor: 'gray',
    textAlign: 'center',
    borderBottomWidth: 1,
  },
  focusCell: {
    borderColor: '#000',
  },
});
