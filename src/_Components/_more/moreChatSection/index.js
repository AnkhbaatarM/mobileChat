import React, { useState } from 'react';
import { View, Text, TouchableHighlight, Animated, Linking, Easing } from 'react-native';
import styles from './Styles';
import { mkChatDate, mkEasySeparteDate } from '../../../../Gloabal/GlobalFunctions';
import UserIcon from '../../_global/SquircleUser';
import UserIconGroup from '../../_global/UserIconGroup';
import StickyDateRow from './components/stickyDateRow/stickyDateRow';
import RenderByMsgType from './components/renderMsgByType/renderMsgByType';
import ContextMenu from './components/contextMenu/contextMenu';
import ConfirmModal from '../../_global/ConfirmModal/index';
import SeenUsersModal from '../SeenUsersModal';
import UserInfo from '../../_global/UserInfo';
import { sendSocket } from '../../../Socket/Socket_i';
import { useSelector, useDispatch } from 'react-redux';
import { selectData, setChatList,setRoomImages } from '../../../../reduxStore/reducer';
import { getSelectedRoom, updateChatList } from '../../../Socket/Socket_Var';
import { getChatList } from '../../../Socket/Socket_Var';
import moment from 'moment';
import { NetInfoCellularGeneration } from '@react-native-community/netinfo';
import { Image } from 'react-native-svg';

const chatContainerPost = (type, isAuthor, from, previtem, item) => {
    let style = {};
    if (type === 3 || type === 5 || type === 7 || type === 9) {
        style = { justifyContent: 'center', alignItems: 'center', alignContent: 'center' };
    } else {
        style = {
            justifyContent: isAuthor ? 'flex-end' : 'flex-start',
            paddingTop: from ? 15 : 2,
        };
        if (previtem) {
            if (previtem.msgs.from !== item.from) {
                style.paddingTop = 15;
            } else {
                style.paddingTop = 2;
            }
            if (item.from_name && !isAuthor) {
                style.paddingTop = 2;
            }
        }
    }
    return style;
};

const deleteMsgContainer = (isAuthor, item) => {
    return {
        marginRight: isAuthor ? 5 : 0,
        paddingTop: 6,
        paddingBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.2)',
        maxWidth: '75%',
        borderStyle: 'dashed',
    };
};
let userData = {
    id: null,
    age: 0,
    app_name: '',
    com_id: '',
    company_name: '',
    createdAt: '',
    gender: 1,
    last_seen: '',
    phone: '',
    position: 7,
    status: '',
    system_name: '',
    user_icon: '',
};
let delWindowTxt = 'Энэ чатыг устгахдаа итгэлтэй байна уу!';
let delByDate = false;
const ChatItem = ({
    item,
    index,
    navigation,
    nextitem,
    previtem,
    scrollContainer = null,
    displayedDate = '',
    setReplyMsg = () => {},
}) => {
    const myData = useSelector(state => selectData(state, 'myData'));
    const roomImages = useSelector(state => selectData(state, 'roomImages'));
    const dispatch = useDispatch();
    const [showDate, setShowDate] = useState(false);
    const [showModal, hideModal] = useState(false);
    const [isShowModal, setShowModal] = useState(false);
    const [userShown, showUserInfo] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [offset, setOffSet] = useState(0);
    const [compHeight, setCompHeigth] = useState(0);
    const isAuthor = myData.userId === item.from;
    const type = item.msg_type;
    const msg = item.msg;
    const animatedValue = new Animated.Value(0);
    //chat bichsen hereglegchiin iconiig zurj haruulj baigaa
    const showUserIcon = () => {
        const selectedRoom = getSelectedRoom();
        if (selectedRoom) {
            if (item.from_image !== undefined && !isAuthor) {
                return (
                    <TouchableHighlight
                        style={styles.flexEndStyle}
                        onPress={() => {
                            const userinfo = selectedRoom.users.find(user => user.id === item.from);
                            userData = userinfo;
                            showUserInfo(true);
                        }}>
                        <UserIcon width={28} height={28} path={item.from_image} />
                    </TouchableHighlight>
                );
            } else {
                return <View style={styles.userNotShown} />;
            }
        }
    };

    const deleteChat = (msgId,index,fileId) => {
        const selectedRoom = getSelectedRoom();
        // sendSocket(selectedRoom._id, {
        //     deleteMsg: true,
        //     msgId: msgId,
        //     deleteType: 'msg',
        // });
        const imageIndex =[]
        if(fileId){
            console.log('rrrrrrrr',roomImages)
        roomImages.map((item)=>{
            if(item.files._id!==undefined){imageIndex.push(item.files._id)}
        }) 
        console.log('idnexqweqwe',imageIndex)
        console.log('fileIddddd',fileId)

       const indexData = imageIndex.indexOf(fileId)
       console.log('qweqweqe',indexData)
       roomImages.splice(0, 1);
       console.log('NewroomImages',roomImages)
    //    dispatch(setRoomImages(roomImages))
    }
        // const myChats = [...getChatList()];
        // myChats[index] = {
        //     msgs: { ...myChats[index].msgs, ...{ isdelete: 1 } },
        // };
        // updateChatList(myChats);
        // dispatch(setChatList(myChats));
    };

    const openLink = () => {
        const selectedRoom = getSelectedRoom();
        if (msg.includes('http')) {
            sendSocket(selectedRoom._id, {
                linkOpen: true,
                userId: myData.userId,
                msgId: item._id,
            });
            Linking.openURL(msg);
        }
    };

    const msgDate = () => {
        const date = (
            <Text style={isAuthor ? styles.chatDateTextAuthor : styles.chatDateText}>
                {mkChatDate(item.createdAt)}
            </Text>
        );
        if (previtem) {
            const diff = Math.abs(new Date(previtem.msgs.createdAt) - new Date(item.createdAt));
            const minutes = Math.floor(diff / 1000 / 60);
            if (nextitem && previtem.msgs.from !== item.from) {
                return (
                    <Text style={isAuthor ? styles.chatDateTextAuthor : styles.chatDateText}>
                        {mkChatDate(item.createdAt)}
                    </Text>
                );
            }
            if (
                mkChatDate(previtem.msgs.createdAt) !== mkChatDate(item.createdAt) &&
                !item.hidden &&
                minutes > 1
            ) {
                return date;
            }
        }
    };
    const showUserName = () => {
        if (item.from_name) {
            return (
                <Text style={isAuthor ? styles.fromNameAuthor : styles.fromName}>
                    {item.from_name}
                </Text>
            );
        }
    };

    const hideAndShowDateItems = displayDate => {
        const chatList = getChatList();
        chatList.map((chat, ind, array) => {
            if (mkEasySeparteDate(chat.msgs.createdAt) === displayDate) {
                chatList[ind] = {
                    msgs: { ...chatList[ind].msgs, ...{ hidden: !chatList[ind].msgs.hidden } },
                };
            }
        });
        dispatch(setChatList(chatList));
        // dispatch({ type: SET_INTERVAL_ID, list: 1909090 });
    };

    const measureView = event => {
        setCompHeigth(event.nativeEvent.layout.height);
        // setContextHeight(event.nativeEvent.layout.height);
        // setContextWidth(event.nativeEvent.layout.width);
    };

    const showDateDeleteConfirm = dltMsgDate => {
        delWindowTxt = `Та ${dltMsgDate}-ны даваа гарагт харилцсан бүх мессежийг устгах гэж байна! Үнэхээр устгах уу?`;
        delByDate = dltMsgDate;
        setShowModal(true);
    };

    const deleteChatByDate = () => {
        const selectedRoom = getSelectedRoom();
        sendSocket(selectedRoom._id, {
            deleteMsg: true,
            msgDate: delByDate,
            deleteType: 'byDate',
        });
        const list = [];
        getChatList().map(chat => list.push(chat));
        list.map((chat, i, array) => {
            if (
                moment(chat.msgs.createdAt).format('YYYY/MM/DD') === delByDate &&
                chat.msgs.from === myData.userId
            ) {
                array[i] = {
                    msgs: { ...array[i].msgs, ...{ isdelete: 1 } },
                };
            }
        });
        updateChatList(list);
        dispatch(setChatList(list));
    };
    return (
        <>
            {item.seenUsers && item.seenUsers.length > 0 && (
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={() => {
                        requestAnimationFrame(() => {
                            hideModal(true);
                        });
                    }}
                    style={styles.seenUserContainer}>
                    <View style={styles.seenUserIconContainer}>
                        <UserIconGroup
                            borderColor={'rgba(0,0,0,0.3)'}
                            width={20}
                            height={20}
                            array={item.seenUsers}
                        />
                    </View>
                    {/* {seenUserShown && (
                        <View style={styles.seenUserNameContainer}>
                            {item.seenUsers.map(user => (
                                <Text style={styles.seenUserName}>{user.name} ,</Text>
                            ))}
                        </View>
                    )} */}
                </TouchableHighlight>
            )}
            {!item.hidden && (
                <>
                    {msgDate()}
                    <TouchableHighlight
                        onLayout={event => measureView(event)}
                        underlayColor={'transparent'}
                        onPress={() => {
                            if (msg.includes('http')) {
                                openLink();
                            }
                        }}
                        onLongPress={evt => {
                            setShowDate(true);
                            const { pageY, locationY } = evt.nativeEvent;
                            const newYValue = pageY - locationY;
                            setOffSet(newYValue - 8);
                        }}
                        style={[
                            styles.mainContainer,
                            chatContainerPost(type, isAuthor, item.from_image, nextitem, item),
                        ]}>
                        <>
                            {showUserIcon()}
                            {item.isdelete !== 1 && (
                                <RenderByMsgType
                                    isAuthor={isAuthor}
                                    msg={msg}
                                    chat={item}
                                    navigation={navigation}
                                    type={type}
                                    fileLenght={item.files ? item.files.length : 0}
                                    chatIndex={index}
                                    displayedDate={displayedDate}
                                    setShowDate={evt => {
                                        const { pageY, locationY } = evt.nativeEvent;
                                        const newYValue = pageY - locationY;
                                        setOffSet(newYValue - 8);
                                        setShowDate(true);
                                    }}
                                />
                            )}
                            {item && item.isdelete === 1 && (
                                <View style={deleteMsgContainer(isAuthor, item)}>
                                    <Text style={styles.deleteText}>{'Устгасан мессеж'}</Text>
                                </View>
                            )}
                            {showDate && item.isdelete !== 1 && (
                                <ContextMenu
                                    msg={msg}
                                    // setShowModal={setShowModal}
                                    isAuthor={isAuthor}
                                    index={index}
                                    hideMenu={() => setShowDate(false)}
                                    deleteChat={() => {
                                        delWindowTxt = 'Энэ чатыг устгахдаа итгэлтэй байна уу!';
                                        delByDate = false;
                                        setShowDate(false);
                                        setShowModal(true);
                                    }}
                                    offset={offset}
                                    chat={item}
                                    displayedDate={displayedDate}
                                    compHeight={compHeight}
                                    setReplyMsg={setReplyMsg}
                                />
                            )}
                        </>
                    </TouchableHighlight>
                    {showUserName()}
                </>
            )}
            <StickyDateRow
                item={item}
                nextitem={nextitem}
                hideAndShowDateItems={hideAndShowDateItems}
                deleteChat={showDateDeleteConfirm}
                scrollContainer={scrollContainer}
                index={index}
            />
            <SeenUsersModal
                seenUsers={item.seenUsers}
                showModal={showModal}
                hideModal={() => hideModal(false)}
            />
            <ConfirmModal
                title={'Баталгаажуулах асуулт'}
                body={delWindowTxt}
                hideModal={() => setShowModal(false)}
                showModal={isShowModal}
                loading={deleting}
                onPressButton={async () => {
                    setDeleting(true);
                    requestAnimationFrame(async () => {
                        if (delByDate) {
                            await deleteChatByDate();
                        } else {
                            await deleteChat(item._id, index,item.files[0].fileId);
                        }
                        delByDate = false;
                        setShowModal(false);
                        setDeleting(false);
                    });
                }}
            />
            <UserInfo
                userData={userData}
                hideModal={() => showUserInfo(false)}
                showModal={userShown}
            />
        </>
    );
};
export default ChatItem;
