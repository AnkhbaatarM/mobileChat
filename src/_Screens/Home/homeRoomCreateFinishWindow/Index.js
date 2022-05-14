import React, { useState } from 'react';
import { View, TextInput, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import IconEntypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LayoutUtil } from './LayoutUtil';
import { UserItems } from '../../../_Components/_home/homeRoomCreateFinishListItem';
import ImagePicker from 'react-native-image-picker';
import { Camera } from 'utils_svg/more_messageSection_icons';
import { SvgXml } from 'react-native-svg';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-tiny-toast';
import { warningToast, createFormData } from '../../../../Gloabal/GlobalFunctions';
import RNFetchBlob from 'rn-fetch-blob';
import styles from './Styles';
import { socketPort, sendSocket } from '../../../Socket/Socket_i';
import { selectData, setRoomCreateUsers, setRoomData } from '../../../../reduxStore/reducer';
import { useSelector, useDispatch } from 'react-redux';
let { selectRoom } = require('../../../Socket/Socket_Var');

IconEntypo.loadFont();
const options = {
    title: 'Явуулах зурагаа сонгоно уу',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    noData: true,
};
const RecyclerView = ({ navigation }) => {
    // const state = useSelector(selectData);
    const myData = useSelector(state => selectData(state, 'myData'));
    const roomCreateUsers = useSelector(state => selectData(state, 'roomCreateUsers'));
    const dispatch = useDispatch();
    const [roomName, setRoomName] = useState('');
    const [dataProviderMain] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    );
    const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(2));
    const [picture, setPicture] = useState(null);

    const renderItem = (type, data, index) => {
        return <UserItems index={index} item={data.user} selectUser={() => {}} />;
    };
    const pickPiture = () => {
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                setPicture(response);
            }
        });
    };

    const createRoom = async () => {
        const users = [];
        if (roomName !== '') {
            const user = await AsyncStorage.getItem('LoggedUser');
            const userData = JSON.parse(user);
            roomCreateUsers.map((item, index) => {
                users.push({
                    id: item.user.id,
                });
            });
            users.push({
                id: userData.userId,
            });
            let formData = [];
            if (picture !== null) {
                formData = [...createFormData(picture, 'icon')];
            }
            formData.push({ name: 'name', data: roomName });
            formData.push({ name: 'roomType', data: '1' });
            formData.push({ name: 'authorId', data: userData.userId.toString() });
            formData.push({ name: 'users', data: JSON.stringify(users) });
            formData.push({ name: 'isActive', data: '1' });
            selectRoom({ _id: 'newRoom', name: roomName, users: users });
            dispatch(setRoomData({ _id: 'newRoom', name: roomName, users: users }));
            navigation.navigate('More');
            RNFetchBlob.config({
                trusty: true,
                // timeout: 8000,
            })
                .fetch(
                    'POST',
                    `${socketPort}api/rooms`,
                    {
                        'Content-Type': 'multipart/form-data',
                        'x-access-token': userData.accessToken,
                        Accept: 'application/json',
                    },
                    formData
                )
                .then(response => {
                    return response.json();
                })
                .then(responseJson => {
                    if (responseJson !== null && responseJson.code !== 500) {
                        const roomData = {
                            _id: responseJson.data._id,
                            authorId: 2062319,
                            createdAt: Date.now(),
                            files: [],
                            hasNew: false,
                            isActive: true,
                            isHide: false,
                            isOnline: false,
                            lastMsgInfo: {},
                            name: roomName,
                            path: responseJson.data.path,
                            updatedAt: Date.now(),
                            users: users,
                            roomType: users.length > 2 ? 1 : 0,
                        };
                        dispatch(setRoomCreateUsers([]));
                        selectRoom(roomData);
                        dispatch(setRoomData(roomData));
                        sendSocket(responseJson.data._id, {
                            from_image: myData.userIcon,
                            msg_type: 3,
                            tmpId: 0,
                            message: `${myData.userName} өрөө үүсгэлээ :$option$:${roomName}`,
                            createdAt: new Date(),
                            files: null,
                            users: users,
                            path: responseJson.data.path,
                            name: roomName,
                            roomType: users.length > 2 ? 1 : 0,
                        });
                    }
                });
        } else {
            Toast.show('Өрөөний нэр оруулна уу !!', warningToast(3000));
        }
    };

    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.searchInputContainer}>
                <MaterialCommunityIcons
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={styles.center}
                    name="keyboard-backspace"
                    size={35}
                    color="black"
                />
                <Text style={styles.titleName}> {'Шинэ чат үүсгэх'}</Text>
            </View>
            <TouchableOpacity onPress={() => pickPiture()} style={styles.imagePickerContainer}>
                {picture !== null ? (
                    <Image style={styles.imageContainerStyle} source={{ uri: picture.uri }} />
                ) : (
                    <SvgXml width="30" height="30" style={styles.cameraIcon} xml={Camera('gray')} />
                )}
            </TouchableOpacity>

            <TextInput
                style={styles.searchInput}
                placeholder={'Өрөөний нэр оруулах'}
                underlineColorAndroid="transparent"
                placeholderTextColor={'gray'}
                returnKeyType={'done'}
                value={roomName}
                autoFocus={true}
                onChangeText={text => setRoomName(text)}
            />
            {roomCreateUsers.length > 0 && (
                <RecyclerListView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.listStyle}
                    dataProvider={dataProviderMain.cloneWithRows(roomCreateUsers)}
                    layoutProvider={layoutProvider}
                    rowRenderer={renderItem}
                />
            )}

            <TouchableOpacity onPress={() => createRoom()} style={styles.buttonContainer}>
                <Text style={styles.buttonTitle}>Хадгалах</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default RecyclerView;
