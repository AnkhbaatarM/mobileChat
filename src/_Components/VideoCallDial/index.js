import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import IconIonicons from 'react-native-vector-icons/Ionicons';

import AntDesign from 'react-native-vector-icons/AntDesign';

var styles = require('./Styles');
const RecyclerView = props => {
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        setUserData();
    }, []);
    const setUserData = async () => {
        let user = await AsyncStorage.getItem('LoggedUser');
        let parsedUser = JSON.parse(user);
        setAccessToken(parsedUser.accessToken);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image source={{ uri: props.vCallUser.path }} style={styles.userIcon}></Image>
                <Text style={styles.userName}>{props.vCallUser.name}</Text>
            </View>
            <View>
                <IconIonicons
                    name={'ios-videocam'}
                    size={70}
                    color={'rgba(255,255,255,0.4)'}
                    source={require('./Assets/images/people.png')}
                    style={{ alignSelf: 'center', marginBottom: -20 }}
                />
                <Text style={styles.userName}>{'Видео дуудлага \nирлээ'}</Text>
            </View>
            <View style={styles.CallingContainer}>
                <TouchableOpacity
                    onPress={() => props.hideComp()}
                    style={[styles.ButtonContainer, { backgroundColor: 'red' }]}>
                    <IconIonicons
                        name={'md-close'}
                        size={35}
                        color={'white'}
                        source={require('./Assets/images/people.png')}
                        style={{ alignSelf: 'center' }}
                    />
                </TouchableOpacity>
                <AntDesign
                    name={'ellipsis1'}
                    size={50}
                    color={'white'}
                    source={require('./Assets/images/people.png')}
                    style={{ alignSelf: 'center' }}
                />
                <TouchableOpacity
                    onPress={() => {
                        props.enterVcall();
                    }}
                    style={[styles.ButtonContainer, { backgroundColor: '#27e356' }]}>
                    <IconIonicons
                        name={'ios-call'}
                        size={35}
                        color={'white'}
                        source={require('./Assets/images/people.png')}
                        style={{ alignSelf: 'center', marginBottom: -2 }}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default RecyclerView;
