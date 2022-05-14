import React from 'react';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    containerOutside: {
        flex: 1,
        backgroundColor: 'white',
        alignSelf: 'center',
        width: '90%',
        borderRadius: 5,
        maxHeight: '70%',
        padding: 35,
        justifyContent: 'space-between',
    },
    txtTitle: {
        color: '#888',
        textAlign: 'center',
        fontSize: 15,
    },
    selectorContainer: {
        marginHorizontal: 0,
        marginTop: 10,
        paddingVertical: 0,
        borderBottomColor: '#aaa',
        borderBottomWidth: 0.5,
        alignItems: 'center',
    },
    selectorIcon: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderTopColor: 'gray',
        borderRightWidth: 0,
        borderRightColor: 'transparent',
        borderLeftWidth: 0,
        borderLeftColor: 'transparent',
        width: 0,
        height: 0,
    },
    domainButton: {
        width: '98%',
        height: 40,
        // borderWidth: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});
export default styles;
