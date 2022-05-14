import { Dimensions, StyleSheet } from 'react-native';
const width90 = (Dimensions.get('window').width * 90) / 100;
import { Fonts } from 'font_directory/Fonts';
import { width1, width2, width3, width4, width5, width70, width80, width85 } from '../../../utils/dimensions/width';
import { height50 } from '../../../utils/dimensions/height';
import { normalize, normalize2 } from '../../../../Gloabal/GlobalFunctions';
import { width0_5 } from '../../_global/able-soft-component-ui/src/assets/dimensions/width';

const buttonStyle = () => {
    return {
        width: 100,
        height: 40,
        backgroundColor: 'red',
        alignSelf: 'center',
        borderRadius: 3,
        justifyContent: 'center',
    };
};
const ButtonText = () => {
    return {
        fontSize: normalize(15),
        fontFamily: Fonts.ArialBold,
        alignSelf: 'center',
        textAlign: 'center',
    };
};

module.exports = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    listStyle: {
        flex: 1,
    },
    listContainerStyle: {
        paddingTop: 10,
        paddingBottom: 40,
    },
    listLoadingStyle: {
        alignSelf: 'center',
        position: 'absolute',
        flexGrow: 1,
    },
    modalContainer: {
        width: 200,
        alignSelf: 'center',
        borderRadius: 80,
        padding: 20,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    callWindow: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 22,
        alignSelf: 'center',
    },
    deleteWindow: {
        width: width70,
        alignSelf: 'center',
        padding: 30,
        borderRadius: 3,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    deleteWindowButtonContainer: {
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    callLoadingContainer: {
        width: 50,
        height: 50,
        borderRadius: 22,
        alignSelf: 'center',
    },
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
        alignSelf: 'center',
    },
    searchInput: {
        width: width90,
        backgroundColor: '#f3f3f3',
        borderRadius: 8,
        height: 40,
        paddingLeft: 10,
        paddingRight: 12,
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: '#ebebeb',
    },
    searchInputText: {
        fontFamily: Fonts.ArialBold,
        color: '#909090',
        alignSelf: 'center',
        fontSize: 15,
    },
    modalButtonCircle: {
        width: 50,
        height: 50,
        backgroundColor: 'red',
        alignSelf: 'center',
        borderRadius: 25,
        justifyContent: 'center',
    },
    modalButtonNo: Object.assign(buttonStyle(), {
        backgroundColor: '#dddddd',
    }),
    modalButtonYes: Object.assign(buttonStyle(), {
        backgroundColor: '#4f81f0',
    }),
    modalButtonTextNo: Object.assign(ButtonText(), {
        color: '#525457',
    }),
    modalButtonTextYes: Object.assign(ButtonText(), {
        color: 'white',
    }),
    sheetBackground: {
        position: 'absolute',
        top: -70,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(16,48,84,0.85)',
    },
    absolute: {
        position: 'absolute',
        top: -70,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(16,48,84,0.70)',
    },
    sheetRowContainer: {
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        borderTopStartRadius: 5,
        borderTopEndRadius: 5,
        flex: 1,
        width: '100%',
    },
    sheetRow: {
        paddingVertical: 20,
        backgroundColor: 'white',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        height: height50,
    },
    handler: {
        width: 40,
        height: 5,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: 5,
        borderRadius: 3,
        position: 'absolute',
        bottom: height50 - 5,
    },
    sheetUserContainer: {
        width: '90%',
        alignSelf: 'center',
        marginBottom: 10,
        alignItems:'center',
    },
    bottomSheetButton: {
        width:width85,
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop:width2,
        padding:width3
    },
    deleteLine: {
        width: '80%',
        height: 2,
        backgroundColor: '#df6456',
        alignSelf: 'center',
        marginBottom: 10,
        borderRadius: 5,
    },
    modalHeaderBold: {
        fontSize: normalize(15),
        fontFamily: Fonts.ArialBold,
        color: '#df6456',
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: 7,
    },
    modalDeleteHeader: {
        fontSize: normalize(13),
        fontFamily: Fonts.Arial,
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalHeader: {
        fontSize: 18,
        fontFamily: Fonts.Arial,
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
    },
    modalBody: {
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: '#3b4252',
        marginVertical: 15,
        alignSelf: 'center',
    },
    bottomSheetButtonLabel: {
        fontWeight:'bold',
        marginLeft:width3,
        fontSize:normalize2(16)
    },
    groupNameRow:{
        marginTop:width3,
        flexDirection:'row',
        alignItems:'center',
    },
    line:{
        height:width0_5,
        backgroundColor:'#DBDCDE',
        flex:1,
        marginHorizontal:width2,
        marginTop:width0_5
    },
    textLabel:{
        fontWeight:'bold',
        marginLeft:width3,
        fontSize:normalize2(16)
    },
    modalStyleAttach: {
        margin: 0,
        height: '80%',
        alignSelf: 'flex-end',
        width: '100%',
        bottom: 0,
        marginTop: '20%',
    },
});
