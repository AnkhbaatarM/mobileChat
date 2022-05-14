var React = require('react-native');
import { Dimensions } from 'react-native';
var { StyleSheet } = React;
import { Fonts } from 'font_directory/Fonts';
import { normalize } from '../../../../../../Gloabal/GlobalFunctions';
const width90 = (Dimensions.get('window').width * 90) / 100;
const othe_file_text = () => {
    return {
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center',
        fontSize: normalize(16),
        fontFamily: 'Roboto-Bold',
        width: 70,
        textAlign: 'center',
    };
};
module.exports = StyleSheet.create({
    userName: {
        fontSize: 18,
        fontFamily: Fonts.ArialBold,
        color: 'white',
        alignSelf: 'center',
        width: 150,
    },
    userIcon: {
        alignSelf: 'flex-end',
        width: 20,
        height: 20,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: '#3b4252',
        bottom: 0,
    },
    authorIcon: {
        alignSelf: 'flex-end',
        width: 20,
        height: 20,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: '#3b4252',
        bottom: 0,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 10,
        backgroundColor: '#3b4252',
        alignSelf: 'flex-start',
    },
    progressValue: {
        width: 100,
        height: 1,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginHorizontal: 5,
    },
    audioContainer: {
        flex: 1,
        paddingRight: 10,
        width: 190,
    },
    timerText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 10,
    },
    otherFileExt: Object.assign(othe_file_text(), {
        color: 'white',
    }),
    otherFileExtPress: Object.assign(othe_file_text(), {
        color: '#989FA4',
    }),
    progressContainerMain: {
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        borderWidth: 1,
        height: 30,
        width: 190,
        borderRadius: 10,
        backgroundColor: '#3882e3',
    },
    animProgressCon: {
        height: 30,
        backgroundColor: '#4f545c',
        width: 0,
        position: 'absolute',
        borderRadius: 10,
    },
    playerContainer: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 180,
        alignSelf: 'center',
    },
});
