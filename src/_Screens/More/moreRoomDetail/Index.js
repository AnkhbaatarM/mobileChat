import React, { useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    ActivityIndicator,
    SafeAreaView,
    Platform,
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import ImageRenderer from '../../../_Components/_more/moreDetailImageItem';
import FileRenderer from '../../../_Components/_more/moreDetailFileItem';
import AsyncStorage from '@react-native-community/async-storage';
import UserIcon from '../../../_Components/_global/roomIcon';
import IconFeather from 'react-native-vector-icons/Feather';
import MainHeader from '../../../_Headers/RoomListHeader';
import Toast from 'react-native-tiny-toast';
import RNFetchBlob from 'rn-fetch-blob';
import Modal from 'react-native-modal';
import {
    requesFetchNew,
    warningToast,
    successToast,
    getExtension,
} from '../../../../Gloabal/GlobalFunctions';
import { sendSocket, socketPort } from '../../../Socket/Socket_i';

import { SvgXml } from 'react-native-svg';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import { Gallery_img, group_user, File } from 'utils_svg/more_detail_icons';
import { LayoutUtil } from './LayoutUtil';
import styles from './Styles';
import {
    roomListVariableUpdate,
    selectRoom,
    selectedRoom,
    getRoomList,
} from '../../../Socket/Socket_Var';
let { roomList } = require('../../../Socket/Socket_Var');
import { useSelector, useDispatch } from 'react-redux';
import {
    selectData,
    setRoomFiles,
    setRoomImages,
    setRoomList,
} from '../../../../reduxStore/reducer';

const center = { alignSelf: 'center' };
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    noData: true,
};
const RecyclerView = ({ navigation }) => {
    const dispatch = useDispatch();
    const myData = useSelector(state => selectData(state, 'myData'));
    const roomUsers = useSelector(state => selectData(state, 'roomUsers'));
    const roomImages = useSelector(state => selectData(state, 'roomImages'));
    const roomFiles = useSelector(state => selectData(state, 'roomFiles'));
    const [roomName, setRoomName] = useState('');
    const [isRoomDataFixing, setRoomDataFixing] = useState(false);
    const [isVisible, showModal] = useState(false);
    const [roomFix, showRoomFix] = useState(false);
    const [loadingFiles, setLoadingFiles] = useState(false);
    const [picSelected, isPicSelected] = useState(false);
    const [picture, setPicture] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState('Picture');
    const [showTop, setShowTop] = useState(true);
    const [dataProvider] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    );
    const [dataProviderFiles] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    );
    useEffect(() => {
        getRoomAllFiles(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getRoomAllFiles = fileType => {
        setLoadingFiles(true);
        let url = `${socketPort}api/rooms/${selectedRoom._id}/files?type=${fileType}`;
        if (roomImages.length > 0) {
            const fileId = roomImages[roomImages.length - 1].files._id;
            url += `&fileId=${fileId}`;
        }
        requesFetchNew(url, 'GET', myData.accessToken).then(responseJson => {
            if (responseJson !== null) {
                setLoadingFiles(false);
                if (fileType === 1) {
                    requestAnimationFrame(() => {
                        const images = responseJson.data.datas;
                        dispatch(setRoomImages(images));
                    });
                } else if (fileType === 0) {
                    const files = responseJson.data.datas;
                    files.map((item, index, array) => {
                        if (getExtension(item.files.name) === 'audio') {
                            array.splice(index, 1);
                        }
                    });
                    dispatch(setRoomFiles(files));
                }
            } else {
                setLoadingFiles(false);
            }
        });
    };

    const changeNickName = () => {
        setRoomDataFixing(true);
        const url = encodeURI(
            `${socketPort}chat/changeRoomName?roomId=${selectedRoom._id}&roomName=${roomName}&userId=${myData.userId}`
        );
        requesFetchNew(url, 'GET', myData.accessToken).then(responseJson => {
            setRoomDataFixing(false);
            if (responseJson !== null && responseJson.result === 'success') {
                roomList = getRoomList();
                selectedRoom.name = roomName;
                const index = roomList.findIndex(obj => obj.room_id === selectedRoom.room_id);
                roomList[index] = { ...roomList[index], ...{ name: roomName } };
                selectRoom(selectedRoom);
                roomListVariableUpdate(roomList, myData.userId);
                dispatch(setRoomList(roomList));
                showModal(false);
                showRoomFix(false);
                sendSocket(selectedRoom._id, {
                    message: `${myData.userName} өрөөний нэр солилоо :$option$:${roomName}`,
                    msg_type: 3,
                    files: [],
                    name: roomName,
                    date: new Date(),
                    users: selectedRoom.users,
                    path: selectedRoom.path,
                    from_image: myData.userIcon,
                    roomType: selectedRoom.roomType,
                });
                Toast.show('Амжилттай солилоо', warningToast(3000));
            } else {
                Toast.show('алдаа гарлаа', warningToast(3000));
            }
        });
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
                isPicSelected(true);
            }
        });
    };

    const updateRoom = path => {
        const body = {
            path: path,
            name: roomName,
        };
        requesFetchNew(
            `${socketPort}api/rooms/${selectedRoom._id}`,
            'PUT',
            myData.accessToken,
            JSON.stringify(body)
        ).then(responseJson => {
            if (responseJson !== null) {
                setRoomDataFixing(false);
                selectedRoom.path = path;
                selectedRoom.name = roomName;
                const index = roomList.findIndex(obj => obj._id === selectedRoom._id);
                roomList[index].name = roomName;
                roomList[index].path = path;
                roomListVariableUpdate(roomList, myData.userId);
                dispatch(setRoomList(roomList));
                sendSocket(selectedRoom._id, {
                    message: `${myData.userName} өрөөний зураг солилоо :$option$:${path}`,
                    msg_type: 5,
                    files: [],
                    date: new Date(),
                    changedPath: path,
                    name: selectedRoom.name,
                    users: selectedRoom.users,
                    path: selectedRoom.path,
                    from_image: myData.userIcon,
                    roomType: selectedRoom.roomType,
                });
                showModal(false);
                showRoomFix(false);
                Toast.show('Амжилттай хадгаллаа', successToast(1000));
            } else {
                setRoomDataFixing(false);
            }
        });
    };

    const uploadImage = async () => {
        const user = await AsyncStorage.getItem('LoggedUser');
        const userData = JSON.parse(user);
        setRoomDataFixing(true);
        const filename =
            picture.fileName !== null ? picture.fileName : picture.uri.split('/').pop();
        var unc = Platform.OS === 'ios' ? picture.uri.replace('file://', '') : picture.uri;
        const form = [
            {
                name: 'files',
                filename: filename,
                type: picture.type,
                data: RNFetchBlob.wrap(unc),
            },
            {
                name: 'name',
                data: `${filename},`,
            },
        ];
        const url = encodeURI(`${socketPort}api/rooms/upload?roomId=${selectedRoom._id}`);
        if (picture !== null) {
            RNFetchBlob.config({
                trusty: true,
                // timeout: 8000,
            })
                .fetch(
                    'POST',
                    url,
                    {
                        'Content-Type': 'multipart/form-data',
                        'x-access-token': userData.accessToken,
                        Accept: 'application/json',
                    },
                    form
                )
                .then(response => {
                    return response.json();
                })
                .then(responseJson => {
                    setRoomDataFixing(false);
                    updateRoom(`${responseJson.data[0].path}accessToken=${userData.accessToken}`);
                })
                .catch(error => {
                    setRoomDataFixing(false);
                    console.warn('error', error);
                });
        }
    };

    const rowRendererImage = (type, data, index) => {
        return <ImageRenderer index={index} item={data} navigation={navigation} />;
    };
    const rowRendererFile = (type, data, index) => {
        return <FileRenderer index={index} item={data} navigation={navigation} />;
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <MainHeader navigation={navigation} roomName={selectedRoom.name} more={true} />
            {showTop && (
                <>
                    <UserIcon
                        width={100}
                        height={100}
                        isGroup={selectedRoom.roomType === 1}
                        roomIcon={selectedRoom.path}
                    />
                    <Text style={styles.roomName}>{selectedRoom.name}</Text>
                    <Text style={styles.activeDate}>
                        {selectedRoom.isOnline ? 'Идэвхитэй' : '10 минутын өмнө'}
                    </Text>
                    {roomUsers.length + 1 > 2 && (
                        <TouchableOpacity
                            style={styles.FixButton}
                            onPress={() => {
                                setRoomName(selectedRoom.name);
                                showModal(true);
                                showRoomFix(true);
                            }}>
                            <IconFeather
                                style={center}
                                name="settings"
                                color={'#3b4252'}
                                size={10}
                            />
                            <Text style={styles.FixButtonText}>{'Засах'}</Text>
                        </TouchableOpacity>
                    )}
                    {roomUsers.length + 1 > 2 && (
                        <TouchableOpacity
                            style={styles.UserListButton}
                            onPress={() => navigation.navigate('RoomUsers')}>
                            <SvgXml
                                width="20"
                                height="20"
                                fill={'#8aa1b1'}
                                style={center}
                                xml={group_user('#8aa1b1')}
                            />
                            <Text style={styles.UserListButtonText}>{'Нийт гишүүдийг харах'}</Text>
                            <IconFontAwesome
                                style={styles.usersEndIcon}
                                name="angle-right"
                                size={25}
                                color="#8aa1b1"
                            />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={styles.UserListButton}
                        onPress={() => navigation.navigate('ConversationSearch')}>
                        <IconFontAwesome style={center} name="search" size={20} color="#8aa1b1" />
                        <Text style={styles.UserListButtonText}>
                            {'Харилцан ярианаас хайлт хийх'}
                        </Text>
                    </TouchableOpacity>
                </>
            )}
            <View style={styles.buttonGroupContainer}>
                <TouchableOpacity
                    style={
                        selectedGroup === 'Picture'
                            ? styles.buttonGroupSelected
                            : styles.buttonGroup
                    }
                    onPress={() => setSelectedGroup('Picture')}>
                    <SvgXml
                        width="15"
                        height="15"
                        fill={selectedGroup === 'Picture' ? 'white' : '#707f8e'}
                        style={center}
                        xml={Gallery_img(selectedGroup === 'Picture' ? 'white' : '#707f8e')}
                    />
                    <Text
                        style={
                            selectedGroup === 'Picture'
                                ? styles.buttonGroupTextSelected
                                : styles.buttonGroupText
                        }>
                        {'Зургууд харах'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={
                        selectedGroup === 'File' ? styles.buttonGroupSelected : styles.buttonGroup
                    }
                    onPress={() => {
                        setSelectedGroup('File');
                        getRoomAllFiles(0);
                    }}>
                    <SvgXml
                        width="15"
                        height="15"
                        fill={selectedGroup === 'File' ? 'white' : '#707f8e'}
                        style={center}
                        xml={File(selectedGroup === 'File' ? 'white' : '#707f8e')}
                    />
                    <Text
                        style={
                            selectedGroup === 'File'
                                ? styles.buttonGroupTextSelected
                                : styles.buttonGroupText
                        }>
                        {'Файлууд харах'}
                    </Text>
                </TouchableOpacity>
            </View>
            {loadingFiles && <ActivityIndicator style={center} size="large" color="gray" />}
            {selectedGroup === 'Picture' && roomImages.length > 0 && (
                <RecyclerListView
                    style={styles.listStyle}
                    contentContainerStyle={styles.listContainerStyle}
                    dataProvider={dataProvider.cloneWithRows(roomImages)}
                    layoutProvider={LayoutUtil.getLayoutProvider(1)}
                    rowRenderer={rowRendererImage}
                />
            )}
            {selectedGroup === 'File' && roomFiles.length > 0 && (
                <RecyclerListView
                    style={styles.listStyle}
                    contentContainerStyle={styles.listContainerStyle}
                    dataProvider={dataProviderFiles.cloneWithRows(roomFiles)}
                    layoutProvider={LayoutUtil.getLayoutProvider(2)}
                    rowRenderer={rowRendererFile}
                />
            )}

            <Modal
                isVisible={isVisible}
                onBackdropPress={() => {
                    showModal(false);
                    showRoomFix(false);
                }}
                avoidKeyboard={true}
                onRequestClose={() => showModal(false)}
                backdropOpacity={0.5}
                style={styles.modalStyle}>
                {roomFix && (
                    <View style={styles.roomNameChangeContainer}>
                        <IconMaterialCommunityIcons
                            onPress={() => {
                                showModal(false);
                                showRoomFix(false);
                            }}
                            style={styles.roomFixIcon}
                            name="close"
                            color={'gray'}
                            size={30}
                        />
                        <TouchableOpacity
                            onPress={() => pickPiture()}
                            style={styles.imageContainer}>
                            <UserIcon
                                width={120}
                                height={120}
                                isGroup={true}
                                roomIcon={picture ? picture.uri : selectedRoom.path}
                            />
                            <IconFontAwesome
                                style={styles.camerIcon}
                                name="camera"
                                color={'rgba(255,255,255,0.9)'}
                                size={40}
                            />
                        </TouchableOpacity>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                autoCorrect={false}
                                maxLength={50}
                                onChangeText={text => {
                                    setRoomName(text);
                                }}
                                returnKeyType="send"
                                autoFocus={true}
                                multiline={true}
                                style={styles.textInput}
                                value={roomName}
                            />
                            <IconMaterialCommunityIcons
                                style={center}
                                name="close"
                                color={'gray'}
                                size={20}
                            />
                        </View>
                        <View style={styles.modalSaveButton}>
                            <TouchableOpacity
                                onPress={() => {
                                    picSelected ? uploadImage() : changeNickName();
                                }}
                                style={styles.modalButton}>
                                {isRoomDataFixing ? (
                                    <ActivityIndicator style={center} size="small" color="white" />
                                ) : (
                                    <Text style={styles.modalButtonText}>{'Хадгалах'}</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Modal>
        </SafeAreaView>
    );
};

export default RecyclerView;
