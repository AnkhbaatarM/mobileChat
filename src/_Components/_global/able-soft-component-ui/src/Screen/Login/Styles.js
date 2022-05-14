import { Dimensions, Platform } from 'react-native';
import { normalize, normalize2 } from '../../../../../../../Gloabal/GlobalFunctions';
import { width15 } from '../../../../../../utils/dimensions/width';
import { height8 } from '../../assets/dimensions/height';
import {
    width10,
    width2,
    width20,
    width3,
    width30,
    width40,
    width5,
    width60,
} from '../../assets/dimensions/width';
const width69 = (Dimensions.get('window').width * 69) / 100;
const width72 = (Dimensions.get('window').width * 72) / 100;
const React = require('react-native');
let { StyleSheet } = React;
module.exports = StyleSheet.create({
    rootContainerStyle: {
        flex: 1,
        // backgroundColor: '#3b4252',
        justifyContent: 'center',
    },
    textInputContainerStyle: {
        width: width72,
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'Roboto-Bold',
        paddingBottom: 5,
        marginBottom: 10,
    },
    textInputWithIconContainer: {
        width: width69,
        alignSelf: 'center',
    },
    textInputStyle: {
        fontSize: normalize2(15),
        paddingBottom: Platform.OS === 'android' ? 10 : 8,
    },
    buttonStyle: {
        marginTop: 38,
        height: width15,
        width: width69,
        backgroundColor: '#d9584d',
    },
    labelContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: width10,
    },
    labelFirst: {
        color: 'white',
        fontSize: normalize2(18),
        fontFamily: 'Roboto-Bold',
        marginRight: 5,
    },
    labelSecond: {
        color: 'red',
        fontSize: normalize2(18),
        fontFamily: 'Roboto-Bold',
    },
    loaderStyle: {
        width: width15,
        height: width15,
        backgroundColor: 'red',
    },
    image: {
        width: 65,
        height: 72,
        alignSelf: 'center',
    },
    Atitle: {
        width: '100%',
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
        marginVertical: '5%',
    },
    Abody: {
        width: '80%',
        color: '#616161',
        fontSize: 14,
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: '10%',
    },
    AlertModal: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    buttonLabel: {
        fontFamily: 'Roboto-Bold',
    },
    DomainViewContainer: {
        width: width60,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 10,
        top: width15,
        alignSelf: 'center',
        height: width30,
        justifyContent: 'center',
    },
    DomainTextContainer: {
        borderBottomWidth: 1.5,
        marginHorizontal: width5,
        marginBottom: width3,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    DomainMainText: {
        textAlign: 'center',
        fontSize: normalize2(15),
        marginBottom: width2,
        color: 'white',
        fontWeight: 'bold',
    },
    DomainText: {
        color: 'rgba(255,255,255,0.3)',
        marginTop: -5,
        fontSize: normalize2(13),
        textAlign: 'center',
    },
});
