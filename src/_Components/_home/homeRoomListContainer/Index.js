import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    AppState,
    RefreshControl,
    SafeAreaView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    FlatList,
    TouchableHighlight
} from 'react-native';
import RtcEngine from 'react-native-agora';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import RBSheet from 'react-native-raw-bottom-sheet';
import { SvgXml } from 'react-native-svg';
import IconFeather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { DataProvider, RecyclerListView } from 'recyclerlistview';
import RNFetchBlob from 'rn-fetch-blob';
import { Delete, SipCall } from 'utils_svg/more_messageSection_icons';
import { requesFetchNew, secondsToMinute } from '../../../../Gloabal/GlobalFunctions';
import { selectData, setNewMsgCount, setRoomList } from '../../../../reduxStore/reducer';
import {
    connectCallProSocket,
    sendCallProScocket,
    sendSocket,
    socketPort,
    SocketVideo,
} from '../../../Socket/Socket_i';
import { height50 } from '../../../utils/dimensions/height';
import ConfirmModal from '../../_global/ConfirmModal';
import HideOnScrollShadow from '../../_global/HideOnScrollShadow';
import UserIcon from '../../_global/roomIcon';
import { RoomListItem } from '../homeRoomListItem/Index';
import { LayoutUtil } from './LayoutUtil';
import { useNetInfo } from '@react-native-community/netinfo';
import styles from './Styles';
import { roomListVariableUpdate, setMsgCount, getRoomList } from '../../../Socket/Socket_Var';
import { width15, width2, width3, width4, width5, width6, width90 } from '../../../utils/dimensions/width';
import { mute,delete1,pin,leave,unmute} from '../../../utils/files/SvgFiles/ChatMenuIcons';
import Attachs from '../../NewDrawerSideMenu/Attach';
import { File } from '../../../utils/files/SvgFiles/more_detail_icons';
var engine = null;
var intervalID;
const iconStyle = { alignSelf: 'center' };
const RecyclerView = ({ searchUserRoom = () => {}, navigation, search }) => {
    const dispatch = useDispatch();
    // const state = useSelector(selectData);
    const myData = useSelector(state => selectData(state, 'myData'));
    const reduxRoomList = useSelector(state => selectData(state, 'roomList'));

    const [isShowModal, showModal] = useState(false);
    const [callUserIcon, setCallUserIcon] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [roomListLoading, setRoomListLoading] = useState(true);
    let [callTime, setCallTime] = useState(0);
    const [showDeleteWindow, setShowDeleteWindow] = useState(false);
    const [channelName, setChannelName] = useState(null);
    const [deleteRoomData, setDeleteRoomData] = useState({});
    const [sheetRoom, setSheetRoom] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [hasNext, setHasNext] = useState(true);
    const [page, setPage] = useState(1);
    const [sipPhone, setSipPhone] = useState('.....');
    const [moreLoading, setMoreLoading] = useState(false);
    const refRBSheet = useRef(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [pressed,setPressed]=useState(false)
    const [modalVisible,setModal]=useState(false)
    const [attachShown,showAttach]=useState(false)
    const [dataProvider] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    );
    const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(2));
    const fadeSheetAnim = useRef(new Animated.Value(0)).current;
    const netInfo = useNetInfo();

    useEffect(() => {
        deleteWindow(false);
        console.log(netInfo.isConnected.toString());
    }, [netInfo]);
    useEffect(() => {
        setUserData();
        roomListLoadApi(false, '', 0);
        AppState.addEventListener('change', _handleAppStateChange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const _handleAppStateChange = async nextAppState => {
        if (nextAppState === 'active') {
            setHasNext(true);
            roomListLoadApi(false, '', 0);
        }
    };
    const ChatMenu = [
        {
            label: 'Өрөөг устгах',
            type: 'delete',
            id: 1,
            icon:delete1()
        },


    ];
    const roomListLoadApi = async (loadMore, searchValue, pageValue) => {
        let user = await AsyncStorage.getItem('LoggedUser');
        const userData = JSON.parse(user);
        let url = `${socketPort}api/rooms?userId=${userData.userId}&limit=10`;
        if (reduxRoomList.length > 0 && loadMore) {
            const lastIndex = reduxRoomList.length - 1;
            const last_date = reduxRoomList[lastIndex].lastMsgInfo.createdAt;
            const date = Date.parse(last_date);
            url = `${socketPort}api/rooms?userId=${userData.userId}&limit=10&lastDate=${date}&page=${pageValue}`;
            setMoreLoading(true);
        }
        if (searchValue !== '') {
            url += `&roomName=${searchValue}`;
        }
        requesFetchNew(url, 'GET', userData.accessToken).then(async responseJson => {
            setRefreshing(false);
            if (responseJson !== undefined && responseJson !== null) {
                setPage(pageValue + 1);
                let list = [];
                setHasNext(responseJson.data.hasNext);
                if (responseJson.data.result.length !== 0) {
                    list = responseJson.data.result;
                }
                if (loadMore) {
                    list = [...reduxRoomList, ...list];
                    setMoreLoading(false);
                } else {
                    setRoomListLoading(false);
                }
                roomListVariableUpdate(list, userData.userId);
                dispatch(setRoomList(list));
                if (!loadMore) {
                    setMsgCount(responseJson.data.newCount.length);
                    dispatch(setNewMsgCount(responseJson.data.newCount.length));
                }
            } else {
                setRoomListLoading(false);
            }
        });
    };

    const setUserData = async () => {
        let user = await AsyncStorage.getItem('LoggedUser');
        let parsedUser = JSON.parse(user);
        setAccessToken(parsedUser.accessToken);
    };

    const rowRenderer = (_type, data, index) => {
        if (data) {
            return (
                <RoomListItem
                    accessToken={accessToken}
                    index={index}
                    item={data}
                    navigation={navigation}
                    callSipAudio={item => getUserInfo(item)}
                    setRemoveUserAuth={setRemoveUserAuth}
                    openSheet={openSheet}
                    searchUserRoom={searchUserRoom}
                />
            );
        } else {
            return null;
        }
    };

    const openSheet = roomData => {
        setSheetRoom(roomData);
        Animated.timing(fadeSheetAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
        // sheetRef.current.snapTo(0);
        refRBSheet.current.open();
    };

    const setRemoveUserAuth = room_id => {
        refRBSheet.current.close();
        requestAnimationFrame(() => {
            const roomList = getRoomList();
            const index = roomList.findIndex(obj => obj._id === room_id);
            deleteRoomData.room_id = room_id;
            deleteRoomData.index = index;
            setDeleteRoomData(deleteRoomData);
            setTimeout(() => {
                deleteWindow(true);
            }, 500);
        });
    };
    const callSipAudio = item => {
        const index = item.users.findIndex(obj => obj.id !== myData.userId);
        setCallUserIcon(item.users[index].path);
        request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {
            switch (result) {
                case RESULTS.GRANTED:
                    startSipAudioCall();
                    break;
            }
        });
    };



    const deleteRoom = (room_id, index) => {
        const roomList = getRoomList();
        roomList.splice(index, 1);
        sendSocket(room_id, {
            deleteRoom: true,
        });
        deleteWindow(false);
    };

    const deleteWindow = isshow => {
        setShowDeleteWindow(isshow);
    };
    const startSipAudioCall = async phone_number => {
        setSipPhone(phone_number);
        console.log('wopooop');
        const body = JSON.stringify({
            type: 'web',
            name: 'erdenebileg@able.mn',
            password: 'password123',
        });
        connectCallProSocket();
        RNFetchBlob.config({
            trusty: true,
            timeout: 5000,
        })
            .fetch(
                'POST',
                'https://api.callpro.mn/v1/login',
                {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'PZlwA8U9I55R5yCxSTNzc12qJ6cTy0aeai391Cuk',
                },
                body
            )
            .then(result => result.json())
            .then(responseJson => {
                console.log('sippp', responseJson);
                const sipCallPro = responseJson.result;
                const bodyToken = JSON.stringify({
                    callToken: sipCallPro.callToken,
                    type: 'sip',
                    destination: phone_number.toString(),
                    video: '0',
                });
                RNFetchBlob.config({
                    trusty: true,
                    timeout: 5000,
                })
                    .fetch(
                        'POST',
                        'https://api.callpro.mn/v1/call',
                        {
                            'Content-Type': 'application/json',
                            'X-Api-Key': 'PZlwA8U9I55R5yCxSTNzc12qJ6cTy0aeai391Cuk',
                        },
                        bodyToken
                    )
                    .then(result => result.json())
                    .then(callRespnonse => {
                        const newChannelName = callRespnonse.channelName;
                        const channelToken = callRespnonse.channelToken;
                        setChannelName(newChannelName);
                        sendCallProScocket('room', newChannelName);
                        const data = {
                            channelName: newChannelName,
                            type: 'call',
                            hash: callRespnonse.hash,
                        };
                        sendCallProScocket('message', JSON.stringify(data));
                        SocketVideo.on('message', async function (msg) {
                            if (msg.type === 'answer') {
                                engine = await RtcEngine.create(callRespnonse.appId);
                                await engine.enableAudio();
                                if (engine !== null) {
                                    engine?.joinChannel(
                                        channelToken,
                                        newChannelName,
                                        null,
                                        myData.userId
                                    );
                                }
                                intervalID = setInterval(() => {
                                    callTime += 1;
                                    setCallTime(callTime);
                                }, 1000);
                            }
                            if (msg.type === 'bye') {
                                //leave room & disconnect
                                SocketVideo.emit('leave', msg.channelName);
                                SocketVideo.disconnect();
                                endCall();
                            }
                        });
                    });
            })
            .catch(error => {
                console.log('erooor', error);
            });
    };

    const endCall = () => {
        if (SocketVideo !== null) {
            SocketVideo.emit('leave', channelName);
            SocketVideo.disconnect();
            clearInterval(intervalID);
            if (engine !== null) {
                engine?.leaveChannel();
            }
        }
        clearInterval(intervalID);
        setCallTime(0);
        showModal(false);
    };

    const getUserInfo = async item => {
        setSipPhone('.....');
        showModal(true);
        console.log('selectedUser', item);

        const selectedRoom = reduxRoomList.find(obj => obj._id === item._id);
        if (selectedRoom) {
            const selectedUser = selectedRoom.users.find(obj => obj.id !== myData.userId);
            startSipAudioCall(selectedUser.phone.toString());
        }
    };

    useEffect(() => {
        const timeOutId = setTimeout(() => roomListLoadApi(false, search, 0), 500);
        return () => {
            console.log('No longer latest query') || clearTimeout(timeOutId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);
    
    const ChatMenuList = ({ item, index }) => {
        return (
            <>
           {sheetRoom.authorId === myData.userId && 
           <TouchableHighlight
           onPressIn={()=>setPressed(true)}
           onPress={()=>
            {
                if(item.type==='delete'){
                    setRemoveUserAuth(sheetRoom._id)
                }
            }
            }
           underlayColor={'#f3f3f3'}
           style={{flexDirection:'row',padding:width4}}
           >
               <>
               <SvgXml
               width={width5}
               height={width5}
               style={iconStyle}
               xml={item.icon}
            />
               <Text style={styles.textLabel}>{item.label}</Text>
               </>
           </TouchableHighlight>}
           </>
        );
    };
    const renderContent = () => (
        <View style={styles.sheetRowContainer}>

            {sheetRoom && (
                <View style={styles.sheetRow}>
                    <View style={styles.sheetUserContainer}>
                        <UserIcon
                            width={width15}
                            height={width15}
                            roomIcon={sheetRoom.path}
                            isOnline={sheetRoom.isOnline}
                            isGroup={sheetRoom.roomType === 1}
                            style={{ marginRight: 8 }}
                        />
                        <View style={styles.groupNameRow}>
                            <View style={styles.line}></View>
                        <Text style={styles.bottomSheetButtonLabel}>
                            {sheetRoom &&
                                sheetRoom.name.replace(myData.userName, '').replace(',', '')}
                        </Text>
                        <View style={styles.line}></View>
                        </View>
                    </View>
                    <TouchableHighlight
                                    onPress={() => {
                                        setModal(true)
                                        setTimeout(() => {
                                            showAttach(true);
                                        }, 700);
                                    }}
                                    underlayColor={'#f3f3f3'}
                                    style={styles.bottomSheetButton}>
                                        <>
                                        <SvgXml
               width={width5}
               height={width5}
               style={iconStyle}
               xml={File('gray')}
            />
                                    <Text style={styles.bottomSheetButtonLabel}>
                                        {'Хавсралтууд'}
                                    </Text>
                                    </>
                                </TouchableHighlight>
                    {sheetRoom.users.length > 2 && (
                        <>
                <FlatList
                data={ChatMenu}
                renderItem={ChatMenuList}
                style={{paddingHorizontal:width6}}
                keyExtractor={item => item.id}
            />
             <Modal
                    onBackdropPress={() => {
                        setModal(false);
                        // attachShown(false)
                    }}
                    onBackButtonPress={() => {
                        setModal(false);
                        // attachShown(false)
                    }}
                    isVisible={modalVisible}
                    backdropOpacity={1}
                    backdropColor={'rgba(16,46,69,0.93)'}
                    style={styles.modalStyleAttach}>
                    {modalVisible && <Attachs attachShown={attachShown}  />}
                </Modal>
                        </>
                    )}
                     
                            
                    {/* <TouchableOpacity
                                onPress={() => getUserInfo(sheetRoom)}
                                style={styles.bottomSheetButton}>
                                <SvgXml
                                    width="25"
                                    height="25"
                                    style={iconStyle}
                                    xml={SipCall('gray')}
                                />
                                <Text style={styles.bottomSheetButtonLabel}>{'Дуудлага хийх'}</Text>
                            </TouchableOpacity> */}
               
                </View>
            )}
            
            <View style={styles.handler} />
        </View>
    );

    return (
        <SafeAreaView style={styles.mainContainer}>
            {reduxRoomList !== null && reduxRoomList.length > 0 && (
                <RecyclerListView
                    style={styles.listStyle}
                    contentContainerStyle={styles.listContainerStyle}
                    onEndReached={() => {
                        roomListLoadApi(true, search, 0);
                    }}
                    onEndReachedThreshold={10}
                    dataProvider={dataProvider.cloneWithRows(reduxRoomList)}
                    layoutProvider={layoutProvider}
                    rowRenderer={rowRenderer}
                    onScroll={event =>
                        Animated.timing(fadeAnim, {
                            toValue: event.nativeEvent.contentOffset.y < 10 ? 0 : 1,
                            duration: 0,
                            useNativeDriver: true,
                        }).start()
                    }
                    scrollViewProps={{
                        showsVerticalScrollIndicator: false,
                        refreshControl: (
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => {8
                                    setRefreshing(true);
                                    roomListLoadApi(false, search, page);
                                }}
                            />
                        ),
                    }}
                    renderFooter={() => {
                        return reduxRoomList && reduxRoomList.length > 0 && moreLoading ? (
                            <ActivityIndicator style={iconStyle} size="large" color="gray" />
                        ) : null;
                    }}
                />
            )}
            <HideOnScrollShadow fadeAnim={fadeAnim} />
            {roomListLoading && (
                <ActivityIndicator style={styles.listLoadingStyle} size="large" color="gray" />
            )}
            <Modal
                onBackdropPress={() => deleteWindow(false)}
                onBackButtonPress={() => deleteWindow(false)}
                avoidKeyboard={true}
                isVisible={isShowModal}>
                <View style={styles.modalContainer}>
                    <UserIcon width={60} height={60} center={true} />
                    <Text style={styles.modalHeader}>{sipPhone}</Text>
                    {callTime > 0 ? (
                        <Text style={styles.modalBody}>{secondsToMinute(callTime)}</Text>
                    ) : (
                        <FastImage
                            style={styles.callLoadingContainer}
                            source={require('utils_gif/loadingCall.gif')}
                        />
                    )}

                    <TouchableOpacity onPress={() => endCall()} style={styles.modalButtonCircle}>
                        <IconFeather style={iconStyle} name="phone-off" size={18} color="white" />
                    </TouchableOpacity>
                </View>
            </Modal>
            <ConfirmModal
                title={'Баталгаажуулах асуулт'}
                body={'Та энэ өрөөг устгах гэж байна! \nУстгах уу?'}
                hideModal={deleteWindow}
                showModal={showDeleteWindow}
                loading={deleting}
                onPressButton={() => deleteRoom(deleteRoomData.room_id, deleteRoomData.index)}
            />
            {sheetRoom && (
                <>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            refRBSheet.current.close();
                            setSheetRoom(null);
                        }}>
                        <Animated.View
                            style={[
                                styles.sheetBackground,
                                {
                                    opacity: fadeSheetAnim,
                                },
                            ]}
                        />
                    </TouchableWithoutFeedback>
                </>
            )}
            <RBSheet
                onClose={() => {
                    setSheetRoom(null);
                }}
                ref={refRBSheet}
                animationType={'slide'}
                closeOnDragDown={true}
                height={height50 + 20}
                openDuration={100}
                customStyles={{
                    container: {
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                    },
                    wrapper: {
                        backgroundColor: 'transparent',
                    },
                    draggableIcon: {
                        backgroundColor: 'transparent',
                    },
                }}>
                {renderContent()}
            </RBSheet>
        </SafeAreaView>
    );
};

export default RecyclerView;
