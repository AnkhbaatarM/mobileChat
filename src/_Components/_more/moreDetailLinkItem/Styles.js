import { StyleSheet } from 'react-native';
import { width85 } from '../../../utils/dimensions/width';
import { Fonts } from '../../../utils/fonts/Fonts';
const styles = StyleSheet.create({
    urlText: {
        color: '#558ce6',
        fontSize: 15,
        marginBottom: 5,
        textDecorationLine: 'underline',
    },
    linkContainer: {
        width: width85,
        height: width85 / 3,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        // padding: 10,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.3)',
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    urlContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        borderRadius: 10,
        flex: 1,
    },
    loaderStyle: {
        alignSelf: 'center',
        position: 'absolute',
        top: 40,
    },
    userIconContainer: {
        flexDirection: 'column',
        width: '80%',
        alignSelf: 'center',
    },
    urlTextContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    urlTitleStyle: {
        fontFamily: Fonts.RobotoMedium,
        color: 'black',
        marginBottom: 5,
    },
    urlDescStyle: {
        color: 'gray',
        fontFamily: Fonts.RobotoMedium,
    },
    urlImage: {
        width: width85 / 5,
        height: width85 / 5,
    },
});
module.exports = {
    styles,
};
