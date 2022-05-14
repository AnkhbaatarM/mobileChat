/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Text,
    SafeAreaView,
} from 'react-native';
import { DataProvider } from 'recyclerlistview';
import { LayoutUtil } from './utils/LayoutUtil';
import { UserItem } from '../../../../../_Components/_more/moreDetailRoomUserItem';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-gesture-handler';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import { back_icon } from 'utils_svg/moreHeaderIcon';
import { SvgXml } from 'react-native-svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Delete } from 'utils_svg/more_messageSection_icons';
import { requesFetchNew, searchUserRoom } from '../../../../../../Gloabal/GlobalFunctions';
import { socketPort, sendSocket } from '../../../../../Socket/Socket_i';
import { useSelector, useDispatch } from 'react-redux';
import { selectData, setRoomUsers } from '../../../../../../reduxStore/reducer';
let { selectRoom } = require('../../../../../Socket/Socket_Var');
import { getRoomList, getSelectedRoom, selectedRoom } from '../../../../../Socket/Socket_Var';
import { get } from '../../../../../utils/async';

const center = { alignSelf: 'center' };
var styles = require('./Styles');
const RecyclerView = ({ navigation }) => {
    const dispatch = useDispatch();
    // const state = useSelector(selectData);
    const myData = useSelector(state => selectData(state, 'myData'));
    const roomUsers = useSelector(state => selectData(state, 'roomUsers'));

    const [dataProvider, setDataProvider] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    );
    const [search, setSearch] = useState('');
    const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(2));
    const [isShowModal, showModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const [removing, setRemoving] = useState(null);
    const [selectedUser, setSelectedUser] = useState({});
    const [authorId,setAuthorId]=useState('')
    const [loggedUserId,setLoggedUserId]=useState('')
    const refRBSheet = useRef();

    useEffect(() => {
        setDataProvider(dataProvider.cloneWithRows(roomUsers));
        getUserData()
        const selectedRoom=getSelectedRoom()
        setAuthorId(selectedRoom.authorId)
    }, []);
    const getUserData=async()=>{
       const userData= await get('LoggedUser');
       setLoggedUserId(userData.userId)
    }
    const rowRenderer = ({ item, index }) => {
        return (
            <UserItem
                setRemoveUserAuth={setRemoveUserAuth}
                openSheet={openSheet}
                selected={selected}
                selectUser={selectUser}
                searchUserRoom={user => {
                    const roomList = getRoomList();
                    searchUserRoom(roomList, user, navigation, dispatch);
                }}
                index={index}
                item={item}
                navigation={navigation}
            />
        );
    };

    const openSheet = user => {
        refRBSheet.current.open();
        setSelectedUser(user);
    };

    const setRemoveUserAuth = () => {
        showModal(true);
    };

    const searchUser = text => {
        setSearch(text);
        const roomList = getRoomList();
        const newArray = roomList.filter(item => {
            const itemData = `${item.name.toLowerCase()}${item.name.toLowerCase()} ${item.name.toLowerCase()}`;
            const textData = text.toLowerCase();
            return itemData.indexOf(textData) > -1;
        });
        setDataProvider(dataProvider.cloneWithRows(newArray));
    };

    const selectUser = id => {
        setSelected(id);
    };

    const removeUserFromRoom = async () => {
        setRemoving(true);
        let user = await AsyncStorage.getItem('LoggedUser');
        const userData = JSON.parse(user);
        const selectedRoom = getSelectedRoom();
        const room_id = selectedRoom._id;
        const name = selectedUser.system_name;
        console.log('selecetede',selectedUser.system_name)
        requesFetchNew(
            `${socketPort}api/rooms/${room_id}/user/${selectedUser.id}`,
            'DELETE',
            userData.accessToken
        )
            .then(responseJson => {
                console.log('resp',responseJson)
                if (responseJson !== null) {
                    const roomUserIndex = roomUsers.findIndex(obj => obj.id === selectedUser.id);
                    if (roomUserIndex !== -1) {
                        roomUsers.splice(roomUserIndex, 1);
                    }
                    const userIndex = selectedRoom.users.findIndex(
                        obj => obj.id === selectedUser.id
                    );
                    if (userIndex !== -1) {
                        selectedRoom.users.splice(userIndex, 1);
                    }
                    sendSocket(selectedRoom._id, {
                        message: `${
                            myData.userName
                        } өрөөнөөс ${name}-г хаслаа :$option$:${JSON.stringify(selectedUser)}`,
                        msg_type: 9,
                        files: [],
                        date: new Date(),
                        name: selectedRoom.name,
                        users: selectedRoom.users,
                        path: selectedRoom.path,
                        from_image: myData.userIcon,
                        roomType: selectedRoom.roomType,
                    });
                    setRemoving(false);
                    showModal(false);
                    selectRoom(selectedRoom);
                    dispatch(setRoomUsers(roomUsers));
                }
            })
            .catch(error => {
                console.log('error_aldaa', error);
            });
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{ alignSelf: 'center', flexDirection: 'row' }}>
                    <SvgXml width="25" height="20" style={center} xml={back_icon('gray')} />
                    <Text style={styles.userName}>{`  Гишүүд(${roomUsers.length})`}</Text>
                </TouchableOpacity>
               {loggedUserId===authorId && <TouchableOpacity
                    onPress={() => {
                        navigation.push('UserAdd');
                    }}
                    style={center}>
                    <IconMaterialCommunityIcons
                        style={center}
                        name="account-plus-outline"
                        size={30}
                        color="gray"
                    />
                </TouchableOpacity>}
            </View>

            <View onPress={() => searchUser()} style={styles.searchInput}>
                <TextInput
                    placeholder={'Хайлт хийх'}
                    placeholderTextColor={'gray'}
                    style={styles.searchInputText}
                    value={search}
                    onChangeText={text => searchUser(text)}
                />
                <IconFontAwesome style={center} name="search" size={20} color="gray" />
            </View>
            <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{ margin: 3, marginTop: 10, paddingBottom: 50 }}
                data={roomUsers}
                layoutProvider={layoutProvider}
                renderItem={rowRenderer}
            />
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                closeOnPressBack={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'transparent',
                    },
                    draggableIcon: {
                        backgroundColor: '#000',
                        // borderWidth: 1
                    },
                    container: {
                        borderWidth: 1,
                        borderTopEndRadius: 20,
                        borderTopStartRadius: 20,
                        backgroundColor: 'white',
                    },
                }}
                height={140}>
                <View
                    style={{
                        justifyContent: 'space-between',
                        flex: 1,
                        paddingVertical: 10,
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            setRemoveUserAuth();
                        }}
                        style={styles.bottomSheetButton}>
                        <SvgXml width="25" height="25" style={center} xml={Delete('gray')} />
                        <Text style={styles.bottomSheetButtonLabel}>{'Хэрэглэгч хасах'}</Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>

            <Modal
                onBackdropPress={() => showModal(false)}
                avoidKeyboard={true}
                isVisible={isShowModal}>
                <View style={styles.modalStyle}>
                    <Text style={styles.modalHeader}>
                        {'Энэ хэрэглэгчийг өрөөнөөс устгахдаа итгэлтэй байна уу !!'}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                showModal(false);
                            }}
                            style={styles.cancelButton}>
                            <Text style={styles.buttonText}>{'Үгүй'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                removeUserFromRoom();
                            }}
                            style={styles.deleteButton}>
                            {removing ? (
                                <ActivityIndicator
                                    style={{ alignSelf: 'center' }}
                                    size="small"
                                    color="white"
                                />
                            ) : (
                                <Text style={styles.buttonText}>{'Тийм'}</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default RecyclerView;
