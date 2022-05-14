import { StyleSheet, Platform } from 'react-native';
import { width90, width100, width94, width8 } from '../../../utils/dimensions/width';
import { height8 } from '../../../utils/dimensions/height';
import { width50, width80 } from '../../_global/able-soft-component-ui/src/assets/dimensions/width';
import { normalize } from '../../../../Gloabal/GlobalFunctions';
const styles = StyleSheet.create({
    searchInputContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        position: 'absolute',
        left: width100 + 10,
    },
    searchInput: {
        width: width50,
        borderRadius: 8,
        alignSelf: 'center',
        // justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#f3f3f3',
    },
    searchInputText: {
        fontFamily: 'Arial',
        alignSelf: 'center',
        fontSize: normalize(12),
        flexGrow: 1,
        marginLeft: 10,
        fontWeight: 'bold',
        height: 50,
        color: 'black',
    },
    searchIcon: {
        alignSelf: 'center',
    },
    buttonStyle: {
        width: width8,
        height: width8,
        alignSelf: 'center',
        justifyContent: 'center',
        // backgroundColor:'red',
        marginRight: 5,
    },
    // listContainer:{
    //     backgroundColor:'red',
    //     width:'90%',
    //     alignSelf:'center',
    //     justifyContent:'center',
    //     borderRadius:10,
    //     padding:10,
    //     position:'absolute',
    // },
    tabContainer: {
        height: height8,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
    },
    buttonContainer: {
        padding: 15,
        backgroundColor: '#f3f3f3',
        borderRadius: 8,
    },
    arrowCont: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        marginRight: 10,
    },
});
export default styles;
