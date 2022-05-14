var React = require('react-native');
var { StyleSheet } = React;
import { Fonts } from 'font_directory/Fonts';
import { normalize, normalize2 } from '../../../Gloabal/GlobalFunctions';
import { width70, width60, width90, width12, width18, width15, width14, width14_5 } from '../../utils/dimensions/width';
import {
    width10,
    width20,
    width30,
    width5,
    width8,
} from '../../_Components/_global/able-soft-component-ui/src/assets/dimensions/width';

module.exports = StyleSheet.create({
    userName: {
        fontSize: normalize2(18),
        fontFamily: 'Roboto-Black',
        color: 'black',
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    userIcon: {
        alignSelf: 'center',
        width: 50,
        height: 50,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'gray',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignSelf: 'center',
        width: width90,
        height: width14_5,
        justifyContent: 'space-between',
    },
    createRoomButton: {
        alignSelf: 'center',
        height: 40,
        width: 40,
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 5,
        marginRight: -10,
        marginLeft: 10,
    },
    userIconContainer: {
        flexDirection: 'row',
        height: 60,
        width: width60,
    },
    iconStyle: {
        alignSelf: 'center',
    },
    labelContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    logOutModalContainer:{
        width:width70,
        backgroundColor:'white',
        alignSelf:'center',
        borderRadius:10,
        padding:width5
    },
    modalText:{
        textAlign:'center',
        fontSize:normalize2(15),
        color:'black',
        marginTop:width5
    },
    yesButtonContainer:{
        width:width20,
        height:width10,
        backgroundColor:'#2277e5',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:width5,
        borderRadius:10,
        marginBottom:width5
    },
    DownyesButtonContainer:{
        width:width20,
        height:width10,
        backgroundColor:'#96bbea',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:width5,
        borderRadius:10,
        marginBottom:width5
    },
    yesText:{
        marginBottom:2,
        color:'white',
        fontSize:normalize2(13),
        fontWeight:'bold'
    },
    DownyesText:{
        marginBottom:2,
        color:'#4677b6',
        fontSize:normalize2(13),
        fontWeight:'bold'
    }
});
