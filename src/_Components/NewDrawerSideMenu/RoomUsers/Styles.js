import { StyleSheet } from 'react-native';
import { normalize } from '../../../../Gloabal/GlobalFunctions';
import { width16 } from '../../../utils/dimensions/width';
import {
    width2,
    width3,
    width4,
    width8,
} from '../../_global/able-soft-component-ui/src/assets/dimensions/width';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: width8,
        paddingVertical:10
    },
    titleText: {
        fontSize: normalize(13),
        fontWeight: 'bold',
        color: '#343647',
        marginBottom: width4,
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: width16,
        borderRadius: 10,
        marginBottom: width2,
        paddingLeft:width2
    },
    textContainer: {
        marginLeft: 0,
        marginBottom: 4,
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: normalize(14),
        color: 'black',
    },
    appNameText: {
        color: '#0274D3',
        fontSize: normalize(13),
    },
});
