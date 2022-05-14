import React, { useState } from 'react';
import { Text, TouchableHighlight, View, TouchableOpacity, Platform } from 'react-native';
import { mkEasyDate, mkRoomDate } from '../../../../Gloabal/GlobalFunctions';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { Fonts } from 'font_directory/Fonts';
import { SvgXml } from 'react-native-svg';
import Swipeout from 'react-native-swipeout';
import { video_call, user_add, file } from 'utils_svg/roomTypeIcons';
import RoomIcon from '../../_global/roomIcon/index';
import { DinDon, Delete, SipCall } from 'utils_svg/more_messageSection_icons';
import { width14, width15, width4_5 } from '../../../utils/dimensions/width';
import { height8 } from '../../../utils/dimensions/height';
import { styles, massMsgStyle, msgStyle, buzzStyle, dotStyle } from './Styles';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectData,
    setNewMsgCount,
    setRoomImages,
    setSwipeRoom,
} from '../../../../reduxStore/reducer';
import {
    updateChatList,
    roomListVariableUpdate,
    selectRoom,
    getRoomList,
    getMsgCount,
    setMsgCount,
    getSelectedRoom,
    getMyData,
} from '../../../Socket/Socket_Var';
import { massMsg } from '../../../utils/files/SvgFiles/more_messageSection_icons';
import { width10, width3, width3_8, width4 } from '../../_global/able-soft-component-ui/src/assets/dimensions/width';
let { roomList } = require('../../../Socket/Socket_Var');

export const RoomListItem = ({
    item,
    index,
    navigation,
    callSipAudio = () => {},
    setRemoveUserAuth = () => {},
    openSheet = () => {},
    searchUserRoom = () => {},
}) => {
    const dispatch = useDispatch();
    // const state = useSelector(selectData);
    const myData = useSelector(state => selectData(state, 'myData'));
    const swipeRoom = useSelector(state => selectData(state, 'swipeRoom'));

    const [press, setPress] = useState(false);
    const msg_type = item.lastMsgInfo ? item.lastMsgInfo.lastMsgType : 0;
    let gender = 0;
    let age = 20;
    if (item.roomType !== 1 && item.users) {
        const other = item.users.find(obj => obj.id !== myData.userId);
        age = other ? other.age : 20;
        gender = other ? other.gender : 1;
    }

    const enterRoom = () => {
        const name = item.name.replace(`${myData.userName}`, '');
        item.name = name;
        navigation.navigate('More');
        selectRoom(item);
        if (item.lastMsgInfo) {
            updateChatList([]);
            requestAnimationFrame(() => {
                if (item.hasNew) {
                    roomList = getRoomList();
                    roomList[index] = { ...roomList[index], ...{ hasNew: false } };
                    roomListVariableUpdate(roomList, myData.userId);
                    let msgCount = getMsgCount();
                    msgCount -= 1;
                    setMsgCount(msgCount);
                    dispatch(setNewMsgCount(msgCount));
                }
            });
        } else {
            searchUserRoom(item);
        }
    };
    const swipeoutSingleBtn = [
        {
            backgroundColor: 'white',
            component: (
                <View style={styles.swipeContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setRemoveUserAuth(item._id, index);
                        }}
                        style={styles.swipeDelete}>
                        <SvgXml
                            width="25"
                            height="25"
                            style={styles.swipeIcon}
                            xml={Delete('white')}
                        />
                    </TouchableOpacity>
                </View>
            ),
        },
    ];
    const swipeoutBtns = [
        {
            backgroundColor: 'white',
            component: (
                <View style={styles.swipeContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            callSipAudio(item);
                        }}
                        style={styles.swipeSipCall}>
                        <SvgXml
                            width="25"
                            height="25"
                            style={styles.swipeIcon}
                            xml={SipCall('white')}
                        />
                    </TouchableOpacity>
                </View>
            ),
        },
        {
            backgroundColor: 'white',
            component: (
                <View style={styles.swipeContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setRemoveUserAuth(item._id, index);
                        }}
                        style={styles.swipeDelete}>
                        <SvgXml
                            width="25"
                            height="25"
                            style={styles.swipeIcon}
                            xml={Delete('white')}
                        />
                    </TouchableOpacity>
                </View>
            ),
        },
    ];
    //msg typaas hamaaran oor oor icon haruulah
    const msgTypeIcon = () => {
        // console.log('msg_type',item)
        switch (msg_type) {
            case 1:
                return (
                    <SvgXml
                        fill={'#ffffff'}
                        style={styles.msgTypeIcon}
                        width={width3_8}
                        height={width3_8}
                        xml={file(item.hasNew ? '#2972d9' : '#7c7c7c')}
                    />
                );
            case 10:
                return (
                    <SvgXml
                        fill={'#ffffff'}
                        style={styles.msgTypeIcon}
                        width={width3_8}
                        height={width3_8}
                        xml={video_call(item.hasNew ? '#2972d9' : '#7c7c7c')}
                    />
                );
                case 14:
                return (
                    <View style={styles.massIconCon}>
                    <SvgXml
                        width={width4_5 - 8}
                        height={width4_5 - 8}
                        style={styles.dindonIconStyle}
                        xml={massMsg('white')}
                    />
                </View>
                );
            case 7:
                return (
                    <SvgXml
                        fill={'#ffffff'}
                        style={styles.msgTypeIcon}
                        width={width3_8}
                        height={width3_8}
                        xml={user_add(item.hasNew ? '#2972d9' : '#7c7c7c')}
                    />
                );
        }
    };

    const showMsgOption = () => {
        switch (msg_type) {
            case 2:
                return (
                    <IconAnt
                        style={styles.likeIconStyle}
                        name="like1"
                        size={width4_5}
                        color={item.hasNew ? '#2972d9' : '#b1b1b1'}
                    />
                );
            case 4:
                return (
                    <View style={styles.dindonContainer}>
                        <SvgXml
                            width={width4_5}
                            height={width4_5}
                            style={styles.dindonIconStyle}
                            xml={DinDon(item.hasNew ? 'red' : '#b1b1b1')}
                        />
                        <Text style={[styles.last_msg, buzzStyle(item.hasNew)]}>{' Дин Дон'}</Text>
                    </View>
                );
            case 14:
                const msg = item.lastMsgInfo.lastMsg.replace(
                    '<font class="massMsg" color="blue">Шуурхай мессеж</font><br>',
                    ''
                );
                return (
                        <Text
                            numberOfLines={1}
                            style={[styles.last_msg, massMsgStyle(item.hasNew)]}>
                            {item.lastMsgInfo.lastMsg}
                        </Text>
                );
            default:
                return (
                    <Text numberOfLines={1} style={[styles.last_msg, msgStyle(item.hasNew)]}>
                        {msg_type === 1 ? 'Файл ирлээ' : item.lastMsgInfo.lastMsg}
                    </Text>
                );
        }
    };

    const swipeDisabled = () => {
        if (Platform.OS === 'android') {
            return true;
        } else if (item.users && item.users.length > 2 && item.authorId !== myData.userId) {
            return true;
        } else if (item.users && item.users.length === 2) {
            return true;
        }
    };
    return (
        <View style={styles.roomItemMainContainer}>
            <Swipeout
                buttonWidth={60}
                autoClose={true}
                backgroundColor={'white'}
                close={swipeRoom !== item._id}
                onOpen={() => {
                    dispatch(setSwipeRoom(item._id));
                }}
                disabled={swipeDisabled()}
                sensitivity={100}
                style={styles.containerStyle}
                right={item.users && item.users.length > 2 ? swipeoutSingleBtn : swipeoutBtns}>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={'#f3f3f3'}
                    onLongPress={() => {
                        openSheet(item),
                        selectRoom(item)
                        // enterRoom(item.id)
                    }}
                    onPress={() => {
                        enterRoom(item._id);
                        // dispatch(setRoomImages([]))
                    }}
                    onPressIn={() => setPress(true)}
                    onPressOut={() => setPress(false)}
                    style={styles.safeAreaView}>
                    <View style={styles.userStatus}>
                        <RoomIcon
                            index={index}
                            width={width14}
                            height={width14}
                            roomIcon={item.path}
                            isOnline={item.isOnline}
                            gender={gender}
                            age={age}
                            isGroup={item.roomType === 1}
                            style={styles.roomIcon}
                            backgroundColor={press ? '#f3f3f3' : 'white'}
                        />
                        <View style={styles.userContainer}>
                            <Text
                                numberOfLines={1}
                                style={[
                                    styles.roomName,
                                    {
                                        fontFamily: item.hasNew ? Fonts.ArialBold : Fonts.Arial,
                                    },
                                ]}>
                                {item.name
                                    ? item.name.replace(myData.userName, '').replace(',', '')
                                    : item.name}
                            </Text>
                            {item.lastMsgInfo && (
                                <View style={styles.msgContainer}>
                                    {msgTypeIcon()}
                                    {showMsgOption()}
                                    <View style={dotStyle(item.hasNew)} />
                                    <Text numberOfLines={1} style={[styles.last_date, msgStyle(item.hasNew)]}>
                                        {`${mkRoomDate(item.lastMsgInfo.createdAt)}`}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </TouchableHighlight>
            </Swipeout>
        </View>
    );
};
export default RoomListItem;
