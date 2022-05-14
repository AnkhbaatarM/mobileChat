/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from 'react';
import { View } from 'react-native';
import MainHeader from '../../../_Headers/RoomListHeader';
import HomeRoomList from './Home';
import styles from './Styles';

const App = ({ navigation }) => {
    const [search, setSearch] = useState('');

    const searchRoom = text => {
        setSearch(text);
    };
    return (
        <View style={styles.containerStyle}>
            <MainHeader
                label={'Өрөөнүүд'}
                showCreateRoom={true}
                navigation={navigation}
                searchRoom={searchRoom}
            />
            <HomeRoomList />
        </View>
    );
};

export default App;
