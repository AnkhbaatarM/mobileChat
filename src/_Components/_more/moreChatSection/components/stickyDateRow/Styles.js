

var React = require('react-native');
var { StyleSheet } = React;
import { Fonts } from 'font_directory/Fonts';
import { normalize } from '../../../../../../Gloabal/GlobalFunctions';
const stickyDateView = () => {
    return {
        height: 28,
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: '#ebecee',
        flexDirection: 'row',
        alignSelf: 'center',
        marginLeft: 5,
        paddingHorizontal: 5,
    };
};
const stickyRow = () => {
    return {
        height: 2.5,
        backgroundColor: '#ebecee',
        borderRadius: 1,
        flexGrow: 1,
        width: '100%',
        alignSelf: 'center',
        position: 'absolute',
        left: 0,
    };
};

const stickyDateText = () => {
    return {
        fontSize: normalize(13),
        fontFamily: Fonts.ArialBold,
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginHorizontal: '5%',
    };
};
const chatDateText = () => {
    return {
        color: 'gray',
        fontSize: normalize(13),
        fontFamily: Fonts.RobotoMedium,
        marginBottom: 12,
        width: '100%',
    };
};

const hideDateIcon = () => {
    return {
        alignSelf: 'center',
        marginHorizontal: 2,
    };
};

module.exports = StyleSheet.create({
    chatDateTextAuthor: Object.assign(chatDateText(), {
        textAlign: 'right',
        paddingRight: 17,
    }),
    chatDateText: Object.assign(chatDateText(), {
        textAlign: 'left',
        paddingLeft: 47,
    }),
    stickyDateContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40,
        alignSelf: 'center',
        marginVertical: 10,
    },
    stickyRow: Object.assign(stickyRow(), { backgroundColor: '#ebecee' }),
    stickyRowActive: Object.assign(stickyRow(), { backgroundColor: '#dee0e3' }),

    stickyDateText: Object.assign(stickyDateText(), { color: '#737c88' }),
    stickyDateTextActive: Object.assign(stickyDateText(), { color: '#47505a' }),

    stickyDateView: Object.assign(stickyDateView(), { backgroundColor: '#ebecee' }),
    stickyDateViewActive: Object.assign(stickyDateView(), { backgroundColor: '#dee0e3' }),

    hideDateIcon: Object.assign(hideDateIcon(), {
        marginRight: 0,
    }),

    openDateIcon: Object.assign(hideDateIcon(), {
        marginRight: 8,
    }),

    stickyValuContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },

    deleteDateIcon: {
        alignSelf: 'center',
        width: 30,
        height: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 15,
    },
    indicatorStyle: {
        alignSelf: 'center',
        position: 'absolute',
        right: -10,
        top: 5,
    },
});
