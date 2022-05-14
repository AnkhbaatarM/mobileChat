
const React = require('react-native');
import { Fonts } from "font_directory/Fonts";
let { StyleSheet, } = React;
import {width85, width90, width70,width80} from 'root/Assets/constants/width';
module.exports = StyleSheet.create({
    userIcon: {
        alignSelf: 'flex-start',
        width: 50,
        height: 50,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'gray',
        marginRight: 10
    },
    userIconContainer: {
        alignSelf: 'flex-start',
        width: 50,
        height: 50,
        borderColor: 'gray',
        marginRight: 10,
    },
    stickyTitle: {
        fontSize: 16,
        fontFamily: Fonts.Arial,
        color: 'gray',
        alignSelf:'center',
        width:'80%'
    },
    stickyHeader: {
        width: width85,
        height:30,
        alignItems:'center',
        alignSelf: 'center',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20,
    },
    groupIcon: {
        alignSelf: 'flex-start',
        width: 35,
        height: 35,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: 'white',
        marginRight: 10
    },
    userName: {
        fontSize: 15,
        fontFamily: Fonts.ArialBold,
        color: 'black',
        alignSelf: 'flex-start',
        marginBottom:5,
        width:'70%'
    },
    app_nameConatiner:{
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'royalblue',
        alignSelf:'flex-start',
        width:width70-30,
        flexDirection:'row',
    },
    app_nameBlock:{
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'royalblue',
        alignSelf:'flex-start',
    },
    app_name:{
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'royalblue',
        alignSelf:'flex-start',
    },
    activeView: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        position: 'absolute',
        justifyContent:'center',
        bottom: -2,
        left: 33,
        backgroundColor:'#03fc56',
        borderWidth:2,
        borderColor:'white'
    },
    safeAreaView: {
        width: width85,
        alignSelf: 'center',
    },
    userStatus: {
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    userContainer: {
        width: width85 - 60,
        alignSelf: 'center',
        justifyContent: 'flex-start'
    },
    userChat: {
        alignSelf: 'flex-start',
        fontSize: 15,
        fontFamily: Fonts.Arial,
        color: 'black',
    },
    userChatDate: {
        alignSelf: 'flex-start',
        fontSize: 13,
        fontFamily: Fonts.Arial,
        color: 'blue',
    },
});
