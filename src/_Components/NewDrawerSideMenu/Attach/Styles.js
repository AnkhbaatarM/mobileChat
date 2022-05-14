import { StyleSheet } from 'react-native';
import { Circle } from 'react-native-svg';
import { normalize } from '../../../../Gloabal/GlobalFunctions';
import { width13, width14 } from '../../../utils/dimensions/width';
import {
    width10,
    width100,
    width20,
    width30,
    width5,
    width50,
    width60,
} from '../../_global/able-soft-component-ui/src/assets/dimensions/width';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    labelText: {
        fontSize: normalize(11),
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    topContainer: {
        alignSelf: 'center',
        height: 80,
    },
    bottomContainer: {
        width: width100,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // paddingVertical: 20,
        paddingBottom: 50,
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 80,
    },
    roomHeaderContainer: {
        height: 80,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'white',
        padding: 15,
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    roomHeaderNameIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    CircleContainer: {
        backgroundColor: 'white',
        width: 20,
        height: 20,
        borderRadius: 10,
        position: 'absolute',
        marginTop: 90,
    },
    searchButton: {
        width: 30,
        height: 30,
        marginLeft: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    svgContainer: {
        width: width14,
        height: width13,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    topButtonContainer: {
        marginHorizontal: 2,
        alignItems: 'center',
    },
    topButtonMain: {
        height: 100,
    },
    loaderStyle:{
        alignSelf:'center',justifyContent:'center',
        marginTop:width60
    }
});
