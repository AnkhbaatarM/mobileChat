import React from 'react';
import { SafeAreaView } from 'react-native';
import RecyclerList from '../../../_Components/_home/homeRoomSearchContainer';
import styles from './Styles';

const RecyclerView = props => {
    return (
        <SafeAreaView style={styles.container}>
            <RecyclerList navigation={props.navigation} />
        </SafeAreaView>
    );
};

export default RecyclerView;
