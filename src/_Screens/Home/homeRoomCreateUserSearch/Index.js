/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Text,
    ScrollView,
    TouchableHighlight,
} from 'react-native';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import { LayoutUtil } from './LayoutUtil';
import UserItems from '../../../_Components/_home/homeRoomCreateUserItem';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { createFormData, requesFetchNew, warningToast } from '../../../../Gloabal/GlobalFunctions';
import { sendSocket, socketPort } from '../../../Socket/Socket_i';
import { camera_icon, squircle_fill } from '../../../utils/files/SvgFiles/moreHeaderIcon';
import { SvgXml } from 'react-native-svg';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import UserIcon from '../../../_Components/_global/roomIcon';
import { selectData } from '../../../../reduxStore/reducer';
import { useSelector, useDispatch } from 'react-redux';
import MainHeader from '../../../_Headers/RoomListHeader';
import SearchBar from '../../../_Components/_global/HideableSearchInput';
import styles from './Styles';
import { get } from '../../../utils/async';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-tiny-toast';
import { selectRoom } from '../../../Socket/Socket_Var';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';

IconEntypo.loadFont();
const options = {
    title: 'Өрөөний зураг сонгох',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    maxWidth: 800,
    maxHeight: 800,
    noData: true,
};
let searchUsers = [];
const RecyclerView = ({
    navigation,
    searchUserRoom = () => {},
    addNewUsersToRoom = () => {},
    type,
}) => {
    const myData = useSelector(state => selectData(state, 'myData'));
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [hasNext, setHasNext] = useState(true);
    const [page, setPage] = useState(1);
    const [roomName, setRoomName] = useState('');
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(2));
    const [picture, setPicture] = useState(null);
    const [roomCreating, setRoomCreating] = useState(false);

    const flatlist = useRef(null);
    const [dataProvider, setDataProvider] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    );
    let chekedUsers = '';
    useEffect(() => {
        searchUsers = [];
        setDataProvider(dataProvider.cloneWithRows([]));
        searchUser(false);
    }, []);

    useEffect(() => {
        if (search !== '') {
            const timeOutId = setTimeout(() => searchUser(false), 500);
            return () => {
                console.log('No longer latest query') || clearTimeout(timeOutId);
            };
        } else {
            searchUser(false);
        }
    }, [search]);

    const searchUser = loadMore => {
        selectedUsers.map(user => {
            if (chekedUsers !== '') {
                chekedUsers += `,${user.user.id}`;
            } else {
                chekedUsers = user.user.id;
            }
        });
        setHasNext(true);
        let url = `${socketPort}api/users/all?userName=${search}&limit=${20}&comId=${
            myData.companyId
        }&userIds=${myData.userId}&notInUsers=${chekedUsers}`;
        if (loadMore) {
            setPage(page + 1);
            setLoadingMore(true);
            url += `&page=${page + 1}`;
        } else {
            setLoadingUsers(true);
        }
        requesFetchNew(url, 'GET', myData.accessToken).then(responseJson => {
            if (responseJson !== null) {
                setHasNext(responseJson.data.hasNext);
                if (loadMore) {
                    searchUsers = [...searchUsers, ...responseJson.data.datas];
                    setLoadingMore(false);
                    setDataProvider(dataProvider.cloneWithRows(searchUsers));
                } else {
                    searchUsers = responseJson.data.datas;
                    setDataProvider(dataProvider.cloneWithRows(searchUsers));
                }
                setLoadingUsers(false);
            }
        });
    };

    const handleListEnd = () => {
        if (hasNext) {
            searchUser(true);
        }
    };
    const selectUser = index => {
        const user = searchUsers[index];
        const itemIndex = selectedUsers.findIndex(obj => obj.user.id === user.id);
        if (itemIndex !== -1) {
            searchUsers[index].isSelected = false;
            selectedUsers.splice(itemIndex, 1);
        } else {
            searchUsers[index].isSelected = true;
            selectedUsers.push({ user: user });
        }
        requestAnimationFrame(() => {
            setDataProvider(dataProvider.cloneWithRows([...searchUsers]));
        });
    };

    const renderItem = (_type, data, index) => {
        return <UserItems index={index} item={data} selectUser={selectUser} />;
    };
    const removeUserFromList = (item, index) => {
        const userIndex = searchUsers.findIndex(obj => obj.id === item.user.id);
        chekedUsers.replace(item.user.id, '').replace(',,', ',');
        selectedUsers.splice(index, 1);
        if (userIndex !== -1) {
            searchUsers[userIndex].isSelected = false;
            setDataProvider(dataProvider.cloneWithRows([...searchUsers]));
        }
        setSelectedUsers([...selectedUsers]);
    };
    const rowRenderer = ({ item, index }) => {
        return (
            <TouchableHighlight
                underlayColor={'white'}
                onPress={() => removeUserFromList(item, index)}
                style={styles.selectedUserSubContainer}>
                <>
                    <UserIcon
                        showOnline={false}
                        roomIcon={item.user.user_icon}
                        width={45}
                        height={45}
                        center={true}
                    />

                    <View style={styles.removeIconHolder}>
                        <IconFontAwesome
                            style={styles.deleteIcon}
                            size={15}
                            name="remove"
                            color={'#3b4252'}
                        />
                    </View>
                    <Text style={styles.nameStyle} numberOfLines={2}>
                        {item.user.system_name}
                    </Text>
                </>
            </TouchableHighlight>
        );
    };

    const createRoom = async () => {
        const users = [];
        try {
            if (roomName !== '') {
                setRoomCreating(true);
                const user = await AsyncStorage.getItem('LoggedUser');
                const userData = JSON.parse(user);
                selectedUsers.map((item, index) => {
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
                console.log('form', formData);
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
                        console.log('responseJson', responseJson);
                        setRoomCreating(false);
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
                                name: responseJson.data.name,
                                path: responseJson.data.path + '&accessToken=' + myData.accessToken,
                                updatedAt: Date.now(),
                                users: users,
                                roomType: users.length > 2 ? 1 : 0,
                            };
                            selectRoom(roomData);
                            navigation.navigate('More');
                            if (responseJson.message !== 'exist') {
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
                        }
                    });
            } else {
                Toast.show('Өрөөний нэр оруулна уу !!', warningToast(3000));
            }
        } catch (error) {
            console.log('room_create_error', error);
        }
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
    return (
        <SafeAreaView style={styles.rootContainer}>
            <MainHeader
                label={'Өрөө үүсгэх'}
                showCreateRoom={false}
                navigation={navigation}
                exitIcon={true}
                // searchRoom={searchRoom}
            />
            <TouchableOpacity onPress={pickPiture} style={styles.cameraButton}>
                <UserIcon
                    center={true}
                    isGroup={true}
                    showOnline={false}
                    localImage={picture ? picture.uri : ''}
                    width={70}
                    height={70}
                />
                <View style={styles.cameraCon}>
                    <SvgXml
                        width={15}
                        height={15}
                        style={styles.cameraIcon}
                        xml={camera_icon('gray')}
                    />
                </View>
            </TouchableOpacity>
            <TextInput
                style={styles.roomName}
                placeholder={'Шинэ өрөө'}
                placeholderTextColor={'gray'}
                onChangeText={text => setRoomName(text)}
            />
            <SearchBar
                style={styles.searchInput}
                search={setSearch}
                value={search}
                removeColor={'red'}
                placeholder={'Хэрэглэгч хайх'}
            />
            {selectedUsers.length > 0 && (
                <View style={styles.selectedMainCont}>
                    <ScrollView
                        horizontal={true}
                        style={styles.selectedScroll}
                        ref={flatlist}
                        onContentSizeChange={() => {
                            flatlist.current.scrollToEnd();
                        }}
                        contentContainerStyle={styles.selectedScrollContent}>
                        <View style={styles.selectedLine} />
                        {selectedUsers.map((user, index) => rowRenderer({ item: user, index }))}
                    </ScrollView>
                    <View style={styles.selectedCont}>
                        <SvgXml
                            width={35}
                            height={35}
                            style={styles.selectedSquircle}
                            xml={squircle_fill('#3578de')}
                        />
                        <Text style={styles.selectedCnt}>{selectedUsers.length}</Text>
                    </View>
                </View>
            )}
            {dataProvider._data.length > 0 && (
                <RecyclerListView
                    style={styles.flexStyle}
                    contentContainerStyle={styles.listContainerStyle}
                    dataProvider={dataProvider}
                    layoutProvider={layoutProvider}
                    rowRenderer={renderItem}
                    onEndReached={handleListEnd}
                    onEndReachedThreshold={10}
                    extendedState={dataProvider._data}
                />
            )}
            {loadingMore && (
                <ActivityIndicator style={styles.indicator} size="large" color="black" />
            )}
            {loadingUsers && (
                <ActivityIndicator style={styles.flexStyle} size="large" color="black" />
            )}
            {selectedUsers.length > 1 && (
                <TouchableOpacity onPress={createRoom} style={styles.roomCreateButton}>
                    {roomCreating ? (
                        <ActivityIndicator style={styles.flexStyle} size={'small'} color="white" />
                    ) : (
                        <Text style={styles.buttonText}>{'Хадгалах'}</Text>
                    )}
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

export default RecyclerView;
