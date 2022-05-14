

var React = require('react-native');
import {Fonts} from 'font_directory/Fonts'
var {
    StyleSheet,
} = React;

module.exports = StyleSheet.create({
    UserManagerTextApp:{
        fontSize:12,
        color:'gray',
        alignSelf:'center',
        textAlign:'center',
        fontFamily:Fonts.Arial,
        marginVertical:5
    },
    UserManagerTextDep:{
        fontSize:15,
        color:'black',
        alignSelf:'center',
        textAlign:'center',
        fontFamily:Fonts.Arial,
        marginVertical:5,
        width:'100%'
    },
    UserManagerTextBig:{
        fontSize:15,
        color:'black',
        alignSelf:'center',
        textAlign:'center',
        fontFamily:Fonts.Arial,
        marginVertical:5
    },
    UserStatusContainer:{
        width:'100%',
        borderRadius:4,
        backgroundColor:'rgb(245,95,98)',
        padding:5,
        marginVertical:20
    },
    UserManagerTextSmall:{
        fontSize:12,
        marginLeft:-2,
        color:'black',
        alignSelf:'center',
        textAlign:'center',
        fontFamily:Fonts.Arial,
    },
    UserManagerLike:{
        flexDirection:'row',
        backgroundColor:'white',
        borderRadius:3,
        alignSelf:'flex-end',
        marginRight:5,
        marginBottom:5
    },
    UserStatusText:{
        fontSize:12,
        color:'white',
        alignSelf:'center',
        textAlign:'center',
        fontFamily:Fonts.Arial,
        marginVertical:5
    },
    
    UserManagerDetail:{
        width:'100%',
        flexDirection:'row',
        marginVertical:1.5
    },
    UserManagerDetailName:{
        width:'40%',
        marginRight:'2%',
        fontSize:12,
        color:'rgb(117,117,117)',
        textAlign:'right',
        fontFamily:Fonts.Arial,
        marginVertical:5
    },
    UserManagerDetailRole:{
        width:'100%',
        marginRight:'2%',
        fontSize:12,
        color:'black',
        textAlign:'center',
        alignSelf:'center',
        fontFamily:Fonts.Arial,
        marginVertical:5
    },
    UserManagerDetailValue:{
        width:'60%',
        fontSize:12,
        color:'rgb(52,86,190)',
        alignSelf:'center',
        textAlign:'left',
        fontFamily:Fonts.ArialBold,
        marginVertical:5,
    },
    closeX:{
        fontSize:20,
        color:'black',
        alignSelf:'center',
        textAlign:'left',
        fontFamily:Fonts.ArialBold,
    },
    UserManagerDetailSub:{
        width:'50%',
        fontSize:12,
        color:'rgb(52,86,190)',
        alignSelf:'center',
        textAlign:'left',
        fontFamily:Fonts.Arial,
        marginVertical:5,
    },
    seeMore:{
        width:'100%',
        fontSize:12,
        color:'rgb(52,86,190)',
        alignSelf:'flex-end',
        textAlign:'right',
        fontFamily:Fonts.Arial,
    },
    UserManagerIconPlaceHolder: {
        width: 70,
        height: 70,
        borderRadius: 30,
        margin: 5,
        top:20,
        position: 'absolute',
    },
    UserManagerIcon: {
        width: 70,
        height: 70,
        borderRadius: 30,
        margin: 5,
    },
    DialogContentStyle: {
        width: '100%',
        padding: 0,
        paddingTop: 0,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        paddingVertical:5

    },
    DialogStyle: {
        width: '100%',
        padding: 0,
        paddingTop: 0,
        paddingHorizontal:'5%',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    OverlayStyle: {
        width: '100%',
        padding: '5%',
        paddingTop: 0,
        marginBottom:'-5%',
        marginHorizontal:0,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
});
