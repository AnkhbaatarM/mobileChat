import { Dimensions, StyleSheet } from 'react-native'
import { Fonts } from "font_directory/Fonts";

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

export default StyleSheet.create({
    max: {
        flex: 1,
        backgroundColor: 'gray',
    },
    buttonHolder: {
        height: 100,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        width:60,
        height:60,
        backgroundColor: '#0093E9',
        borderRadius: 25,
        justifyContent:'center'
    },
    buttonText: {
        color: '#fff',
        fontFamily: Fonts.Arial
    },
    callingText: {
        color: '#fff',
        fontFamily: Fonts.ArialBold,
        fontSize: 20,
        position:'absolute',
        alignSelf:'center',
        textAlign:'center',
        marginTop:'60%'
    },
    fullView: {
        width: dimensions.width,
        height: dimensions.height,
    },
    remoteContainer: {
        width: '100%',
        height: 150,
        position: 'absolute',
        top: 5,
        backgroundColor: 'green',
        borderWidth: 2,
        borderColor: 'red'
    },
    remote: {
        width: 150,
        height: 200,
        marginHorizontal: 2.5
    },
    groupRemote: {
        width: 150,
        height: 200,
        marginHorizontal: 2.5
    },
    noUserText: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: '#0093E9',
    },
    groupIcon: {
        alignSelf: 'flex-start',
        width: 80,
        height: 80,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: 'white',
        marginRight: 10
    },
    userIcon: {
        alignSelf: 'center',
        width: 80,
        height: 80,
        borderRadius: 13,
        borderWidth: 0.5,
        borderColor: 'red',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 10,
        alignSelf: 'center',
        backgroundColor:'white',
        alignSelf:'flex-start',
    },
    userIconContainer: {
        alignSelf: 'center',
        width: 80,
        height: 80,
        borderColor: 'red',
        marginRight: 10,
        position:'absolute',
        marginTop: '30%'
    },
})