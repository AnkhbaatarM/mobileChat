/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useRef,useEffect} from 'react';
import { View, 
         Text, 
         TouchableHighlight, 
         Alert,
         ActivityIndicator,
         TouchableOpacity,
         FlatList} from 'react-native';
import { DrawerContentScrollView } from '../../navigations/navigationUtils';
import { SvgXml } from 'react-native-svg';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import RoomIcon from '../_global/roomIcon';
import styles from './Styles';
import RoomUsers from './RoomUsers';
import { arrow } from '../../utils/files/SvgFiles';
import { width25, width3, width4, width5, width6 } from '../../utils/dimensions/width';
import UserInfo from '../_global/UserInfo';
import Modal from 'react-native-modal';
import Attachs from './Attach';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { selectData } from '../../../reduxStore/reducer';
import { LayoutUtil } from '../../_Screens/More/moreRoomDetail/Screens/moreRoomDetailUsers/utils/LayoutUtil';
import AsyncStorage from '@react-native-community/async-storage';
import { getRoomList, getSelectedRoom, selectedRoom } from '../../Socket/Socket_Var';
import { socketPort, sendSocket } from '../../Socket/Socket_i';
import { UserItem } from '../../_Components/_more/moreDetailRoomUserItem';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Delete } from 'utils_svg/more_messageSection_icons';
import { get } from '../../utils/async';

let { selectRoom } = require('../../Socket/Socket_Var');


const DrawerSideMenu = ({ navigation }) => {
    const isDrawerOpen = useIsDrawerOpen();
    const [modalVisible, showModal] = useState(false);
    const [attachShown, showAttach] = useState(false);
    const roomUsers = useSelector(state => selectData(state, 'roomUsers'));
    const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(2));
    const [removeModal,showRemoveModal]=useState(false)
    const [removing, setRemoving] = useState(null);
    const dispatch = useDispatch();
    const refRBSheet = useRef();
    const [selectedUser, setSelectedUser] = useState({});
    const [selected, setSelected] = useState(null);
    const [loggedUserId,setLoggedUserId]=useState('')
    const [authorId,setAuthorId]=useState('')

    const myData = useSelector(state => selectData(state, 'myData'));

    useEffect(() => {
        // setDataProvider(dataProvider.cloneWithRows(roomUsers));
        getUserData()
        const selectedRoom=getSelectedRoom()
        setAuthorId(selectedRoom.authorId)
    }, []);

    const getUserData=async()=>{
        const userData= await get('LoggedUser');
        setLoggedUserId(userData.userId)
     }
    const selectUser = id => {
        setSelected(id);
    };
    const openSheet = user => {
        refRBSheet.current.open();
        setSelectedUser(user);
    };
    const setRemoveUserAuth = () => {
        showRemoveModal(true);
    };
    const removeUserFromRoom = async () => {
        setRemoving(true);
        let user = await AsyncStorage.getItem('LoggedUser');
        const userData = JSON.parse(user);
        const selectedRoom = getSelectedRoom();
        const room_id = selectedRoom._id;
        const name = selectedUser.system_name;
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
                    showRemoveModal(false);
                    selectRoom(selectedRoom);
                    dispatch(setRoomUsers(roomUsers));
                }
            })
            .catch(error => {
                console.log('error_aldaa', error);
            });
    };

    return (
        <>
            {isDrawerOpen && (
                <View style={styles.gestureContainer}>
                    <View style={isDrawerOpen ? styles.gestureLineActive : styles.gestureLine} />
                </View>
            )}
            <DrawerContentScrollView 
            scrollEnabled={false}
            style={styles.containerStyle}>
                <View style={styles.topContainer}>
                    <RoomIcon
                        width={50}
                        height={50}
                        roomIcon={selectedRoom.path}
                        isGroup={selectedRoom.roomType === 1}
                        style={{ alignSelf: 'flex-start' }}
                    />
                    <Text numberOfLines={2} style={styles.roomName}>{selectedRoom.name}</Text>
                </View>
                <RoomUsers 
                openSheet={openSheet}
                />
                {loggedUserId===authorId&&
                <TouchableHighlight
                underlayColor={'#D5D5D5'}
                 style={styles.addUserContainer}
                 onPress={()=>navigation.push('UserAdd')}
                >
                    <>
                    <IconMaterialCommunityIcons
                        name="account-plus-outline"
                        size={width6}
                        color="gray"
                    />
                    <Text style={styles.addUserText}>Өрөөнд хүн нэмэх</Text>
                    </>
                </TouchableHighlight>}
                <TouchableHighlight
                underlayColor={'#D5D5D5'}
                    style={styles.AttachButtonContaniner}
                    onPress={() => {
                        showModal(true);
                        setTimeout(() => {
                            showAttach(true);
                        }, 700);
                    }}>
                        <>
                    <Text style={styles.attachText}>Хавсралтууд</Text>
                    <SvgXml
                        style={{ alignSelf: 'center', marginLeft: width25 }}
                        width={width5}
                        height={width5}
                        xml={arrow()}
                    />
                    </>
                </TouchableHighlight>
                <Modal
                    onBackdropPress={() => {
                        navigation.closeDrawer();
                        requestAnimationFrame(() => {
                            showAttach(false);
                            showModal(false);
                        });
                    }}
                    onBackButtonPress={() => {
                        navigation.closeDrawer();
                        requestAnimationFrame(() => {
                            showAttach(false);
                            showModal(false);
                        });
                    }}
                    isVisible={modalVisible}
                    backdropOpacity={1}
                    backdropColor={'rgba(16,46,69,0.93)'}
                    style={styles.modalStyleAttach}>
                    {modalVisible && <Attachs attachShown={attachShown} />}
                </Modal>
                <Modal
                onBackdropPress={() => showRemoveModal(false)}
                avoidKeyboard={true}
                isVisible={removeModal}>
                <View style={styles.modalStyle}>
                    <Text style={styles.modalHeader}>
                        {'Энэ хэрэглэгчийг өрөөнөөс устгахдаа итгэлтэй байна уу !!'}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                showRemoveModal(false);
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
                        <SvgXml width="25" height="25" style={{alignSelf:'center'}}  xml={Delete('gray')} />
                        <Text style={styles.bottomSheetButtonLabel}>{'Хэрэглэгч хасах'}</Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>
            </DrawerContentScrollView>
        </>
    );
};

export default DrawerSideMenu;
