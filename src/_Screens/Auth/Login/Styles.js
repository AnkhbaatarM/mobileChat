import { StyleSheet, Dimensions } from 'react-native';
const width100 = Dimensions.get('window').width;
export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: width100,
        backgroundColor: '#3b4252',
        // justifyContent: 'center',
    },
});
