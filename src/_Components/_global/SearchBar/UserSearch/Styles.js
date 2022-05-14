import { StyleSheet, Platform } from 'react-native';
import { normalize } from '../../../../../Gloabal/GlobalFunctions';
import { width2, width16, width90, width85, width70 } from '../../../../utils/dimensions/width';

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '80%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 20,
    },
    searchContainer: {
        width: '100%',
        position: 'relative',
    },
    flexStyle: {
        flex: 1,
    },
    listContainerStyle: {
        marginTop: 10,
        paddingBottom: 70,
    },
    selectedMainCont: {
        // height: 50,
        width: width85,
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selectedLine: {
        // flexGrow: 1,
        height: 1,
        backgroundColor: 'gray',
        alignSelf: 'center',
        position: 'absolute',
        width: width70 + 20,
        // left: 10,
        // marginRight:10
    },
    selectedScroll: {
        maxWidth: '100%',
        backgroundColor: 'transparent',
        minWidth: 40,
    },
    selectedScrollContent: {
        paddingRight: 10,
        marginLeft: 0,
    },
    selectedCont: {
        alignSelf: 'center',
        width: 40,
        height: 40,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    selectedSquircle: {
        alignSelf: 'center',
        position: 'absolute',
        top: 6,
    },
    selectedCnt: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        alignSelf: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: width16,
        borderRadius: 10,
        marginBottom: width2,
    },
    textContainer: {
        marginLeft: 12,
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
    selectedUserSubContainer: {
        // marginRight: 5,
        width: 55,
        // height: 50,
        backgroundColor: 'white',
    },
    deleteIcon: {
        alignSelf: 'center',
        width: 12,
    },
    selectedListStyle: {
        width: width90,
        backgroundColor: 'transparent',
        height: 40,
        flex: 1,
    },
    removeIconHolder: {
        borderWidth: 1,
        borderColor: 'gray',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'white',
    },
    roomCreateButton: {
        width: '90%',
        height: 50,
        position: 'absolute',
        backgroundColor: 'rgb(0,137,235)',
        bottom: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        alignSelf: 'center',
        color: 'white',
    },
});
export default styles;
