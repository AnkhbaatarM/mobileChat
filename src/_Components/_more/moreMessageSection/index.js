import React, { useState, useRef } from 'react';
import {
    View,
    Keyboard,
    KeyboardAvoidingView,
    TextInput,
    FlatList,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    Alert,
    Text,
    Animated,
} from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { sendSocket, SocketIO, socketPort } from '../../../Socket/Socket_i';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { isIphoneX } from '../../../../Gloabal/GlobalFunctions';
import {
    Gallery_img,
    Camera,
    File,
    File_menu,
    Audio_chat,
    Smile,
    Send,
    DinDon,
} from 'utils_svg/more_messageSection_icons';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import VoiceRecorder from '../moreMessageSectionRecorder/index';
import AsyncStorage from '@react-native-community/async-storage';
import { SvgXml } from 'react-native-svg';
import { back_icon } from 'utils_svg/moreHeaderIcon';
import MoreMessageSectionFile from '../moreMessageSectionFile';
import { selectData, setChatList } from '../../../../reduxStore/reducer';
import { useSelector, useDispatch } from 'react-redux';
import { updateChatList, chatList, getSelectedRoom } from '../../../Socket/Socket_Var';
import { remove_icon } from '../../../utils/files/SvgFiles/moreHeaderIcon';
import { TouchableHighlight } from 'react-native-gesture-handler';
// import ImagePicker from 'react-native-image-crop-picker';
var Sound = require('react-native-sound');
Sound.setCategory('Playback');
const defaultColor = 'rgb(56,130,227)';
const padding10 = { padding: 10 };
const options = {
    selectionLimit:0,
    title: 'Явуулах зурагаа сонгоно уу',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    maxWidth: 800,
    maxHeight: 800,
    quality: 1,
    noData: true,
    saveToPhotos: false,
};

const styles = require('./Styles');
let inputValue = '';

const MessageSection = ({ scrollView, replyMsg = null, setReplyMsg = () => {} }) => {
    const dispatch = useDispatch();
    const myData = useSelector(state => selectData(state, 'myData'));
    const [focused, setFocused] = useState(false);
    const [fileSelecter, showFileSelecter] = useState(false);
    const [emojiSelector, showEmojiSelector] = useState(false);
    const [audioRecorder, showAudioRecorder] = useState(false);
    const [FileTypes, setFileTypes] = useState([
        {
            id: 0,
            name: 'Camera',
            icon: Camera('white'),
            backgroundColor: '#526ba3',
            icon_Color: 'white',
            isUploading: false,
        },
        {
            id: 1,
            name: 'Gallery',
            icon: Gallery_img('white'),
            backgroundColor: '#526ba3',
            icon_Color: 'white',
            isUploading: false,
        },
        {
            id: 2,
            name: 'File',
            icon: File(),
            backgroundColor: '#526ba3',
            icon_Color: 'white',
            isUploading: false,
        },
        {
            id: 3,
            name: 'Audio',
            icon: Audio_chat('white'),
            backgroundColor: '#526ba3',
            icon_Color: 'white',
            isUploading: false,
        },
    ]);
    const [sendIconShown, showSendIcon] = useState(false);
    const inputRef = useRef();
    let timeOutId = null;

    const animated = useRef(new Animated.Value(0)).current;
    const setFocusedValue = value => {
        setFocused(value);
    };
    const DinDonSound = new Sound('buzz.wav', Sound.MAIN_BUNDLE);
    const whoosh = new Sound('whoosh.wav', Sound.MAIN_BUNDLE);
    const uploadImageFromCamera = async () => {
        ImagePicker.launchCamera(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                FileTypes[0].isUploading = true;
                setFileTypes([...FileTypes]);
                uploadFileToServer(response, 0, `IMG_${Date.now()}.jpg`, true);
            }
        });
    };
    const uploadImage = async () => {

        ImagePicker.launchImageLibrary(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.warn('User cancelled image picker');
            } else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.warn('User tapped custom button: ', response.customButton);
            } else {
                FileTypes[1].isUploading = true;
                setFileTypes([...FileTypes]);
                uploadFileToServer(response, 1, null, true);
            }
        });
    };
    const uploadFile = async () => {
        inputValue = '';
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
            });
            console.log('result', results);
            var form = [];
            for (const res of results) {
                var unc =
                    Platform.OS === 'ios'
                        ? // ?res.uri
                          decodeURIComponent(res.uri.replace('file://', ''))
                        : res.uri;
                form.push({
                    name: 'files',
                    filename: res.name,
                    type: res.type,
                    data: RNFetchBlob.wrap(unc),
                });
                console.log('res.name', res.name);
            }
            FileTypes[2].isUploading = true;
            setFileTypes([...FileTypes]);
            results[0].fileName = results[0].name;
            FileTypes[2].isUploading = false;
            uploadFileToServer(results[0], 2);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    };

    const uploadFileToServer = async (response, index, cameraName, isImage) => {
        const room_id = getSelectedRoom()._id;
        const user = await AsyncStorage.getItem('LoggedUser');
        const userData = JSON.parse(user);
        let filename =
            response.fileName !== null ? response.fileName : response.uri.split('/').pop();
        if (cameraName) {
            filename = cameraName;
        }
        var unc =
            Platform.OS === 'ios'
                ? decodeURIComponent(response.uri.replace('file://', ''))
                : response.uri;
        const form = [
            {
                name: 'files',
                filename: filename,
                type: response.type,
                data: RNFetchBlob.wrap(unc),
            },
            {
                name: 'name',
                data: `${filename},`,
            },
        ];
        console.log('form', form);
        RNFetchBlob.config({
            trusty: true,
            // timeout: 8000,
        })
            .fetch(
                'POST',
                `${socketPort}api/rooms/upload?roomId=${room_id}`,
                {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': userData.accessToken,
                    Accept: 'application/json',
                },
                form
            )
            .then(respFile => {
                return respFile.json();
            })
            .then(responseJson => {
                if (responseJson && responseJson.data.length > 0) {
                    sendFileToChatList(responseJson.data);
                    FileTypes[index].isUploading = false;
                    setFileTypes([...FileTypes]);
                    if (scrollView.current) {
                        scrollView.current.scrollToOffset({ animated: true, offset: 0 });
                    }
                    RNFetchBlob.fs
                        .unlink(response.uri)
                        .then(() => {
                            console.log('deleted');
                        })
                        .catch(err => {
                            console.log('delete_err', err);
                        });
                }
            })
            .catch(error => {
                Alert.alert('error_aldaa', error);
                console.warn('error_aldaa', error);
            });
    };

    const sendFileToChatList = fileData => {
        const tmpId = `${Date.now()}-${myData.userId}`;
        const room_id = getSelectedRoom()._id;
        sendSocket(room_id, {
            message: fileData.length > 1 ? '' : fileData[0].name,
            msg_type: 1,
            tmpId: tmpId,
            files: fileData,
            createdAt: new Date(),
            mimetype: fileData[0].mimetype,
            from_image: myData.userIcon,
        }); // file ywuulsanii daraa msg ywuulah heseg
        const selectedRoom = getSelectedRoom();
        if (selectedRoom && room_id === selectedRoom._id) {
            const newArray = [
                ...[
                    {
                        msgs: {
                            _id: tmpId,
                            msg: fileData.length > 1 ? '' : fileData[0].name,
                            from: myData.userId,
                            createdAt: new Date().toISOString(),
                            msg_type: 1,
                            files: fileData,
                            from_image: myData.userIcon,
                            tmpId: tmpId,
                        },
                    },
                ],
                ...chatList,
            ];
            updateChatList(newArray);
            dispatch(setChatList(newArray));
        }
    };
    const sendNewMessage = msg => {
        showSendIcon(false);
        inputValue = '';
        inputRef.current.setNativeProps({ text: '' });
        const tmpId = `${Date.now()}-${myData.userId}`;
        let msg_type = 0;
        let chatText = msg;
        const selectedRoom = getSelectedRoom();
        switch (msg) {
            case '~buzz~':
                msg_type = 4;
                chatText = 'Дин Дон';
                DinDonSound.play();
                break;
            case '👍':
                msg_type = 2;
                break;
            default:
                break;
        }
        if (msg.includes('http')) {
            msg_type = 8;
        }
        const newObj = {
            msgs: {
                _id: tmpId,
                msg: msg,
                from: myData.userId,
                createdAt: new Date().toISOString(),
                msg_type: msg_type,
                files: null,
                from_image: myData.userIcon,
                tmpId: tmpId,
            },
        };
        if (replyMsg) {
            Object.assign(newObj.msgs, {
                msg_type: 15,
                replyMsg: replyMsg.msg,
                replyFrom: replyMsg.from,
                replyId: replyMsg._id,
            });
            if (replyMsg.msg_type === 1 || (replyMsg.files && replyMsg.files.length > 0)) {
                Object.assign(newObj.msgs, {
                    replyFiles: replyMsg.files,
                    replyMsgType: 1,
                });
            }
            setReplyMsg(null);
        }
        const newList = [...[newObj], ...chatList];
        updateChatList(newList);
        requestAnimationFrame(() => {
            if (selectedRoom) {
                const sendMsg = {
                    msg_type: msg_type,
                    tmpId: tmpId,
                    message: chatText,
                    roomType: selectedRoom.roomType,
                };

                if (replyMsg) {
                    Object.assign(sendMsg, {
                        msg_type: 15,
                        replyMsg: replyMsg.msg,
                        replyFrom: replyMsg.from,
                        replyId: replyMsg._id,
                    });
                    if (replyMsg.msg_type === 1 || (replyMsg.files && replyMsg.files.length > 0)) {
                        Object.assign(sendMsg, {
                            replyFiles: replyMsg.files,
                            replyMsgType: 1,
                        });
                    }
                    setReplyMsg(null);
                }
                dispatch(setChatList([...newList]));
                if (sendMsg.msg_type !== 4) {
                    // whoosh.play()
                }
                sendSocket(selectedRoom._id, sendMsg);
            }
        });
    };
    const showAudioRecoder = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        showEmojiSelector(false);
        showFileSelecter(false);
        showAudioRecorder(true);
        Keyboard.dismiss();
    };

    const FileComponent = ({ item, index }) => {
        return (
            <MoreMessageSectionFile
                item={item}
                index={index}
                uploadImage={uploadImage}
                uploadImageFromCamera={uploadImageFromCamera}
                uploadFile={uploadFile}
                showAudioRecoder={showAudioRecoder}
            />
        );
    };
    const hideVoiceRecoder = () => {
        showAudioRecorder(false);
    };
    const inpputFocused = () => {
        setFocusedValue(true);
        if (scrollView.current) {
            scrollView.current.scrollToOffset({
                animated: true,
                offset: 0,
            });
        }
        showEmojiSelector(false);
        showFileSelecter(false);
    };

    // useEffect(() => {
    //     if (message !== '') {
    //         const timeOutId = setTimeout(() => {
    //             sendSocket(selectedRoom._id, {
    //                 imWritting: true,
    //                 isTyping: false,
    //             });
    //         }, 1000);
    //         return () => {
    //             console.log('user not typing') || clearTimeout(timeOutId);
    //         };
    //     }
    // }, [message]);

    const typingOnInput = text => {
        inputValue = text;
        if (text.length > 0 && !sendIconShown) {
            showSendIcon(true);
        }
        if (text.length === 0 && sendIconShown) {
            showSendIcon(false);
        }
        if (inputValue !== '') {
            clearTimeout(timeOutId);
            timeOutId = setTimeout(() => {
                const selectedRoom = getSelectedRoom();
                if (SocketIO && selectedRoom !== null) {
                    sendSocket(selectedRoom._id, {
                        imWritting: true,
                        isTyping: false,
                    });
                }
            }, 2500);
        }
    };
    const changeColor = () => {
        Animated.timing(animated, {
            toValue: 1,
            duration: 0,
            useNativeDriver: false,
        }).start();
    };
    const changeColorToDefault = () => {
        Animated.timing(animated, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false,
        }).start();
    };
    return (
        <>
            <KeyboardAvoidingView
                keyboardVerticalOffset={Platform.OS === 'ios' ? (isIphoneX() ? 80 : 30) : 10}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidStyle}>
                {replyMsg && (
                    <View style={styles.replyContainer}>
                        <View style={styles.replyValueContainer}>
                            <Text style={styles.replyTitle}>{'Хариулж буй чат '}</Text>
                            <Text style={styles.replyText}>{replyMsg.msg}</Text>
                        </View>
                        <TouchableHighlight
                            onPress={() => setReplyMsg(null)}
                            onPressIn={() => changeColor()}
                            onPressOut={() => changeColorToDefault()}
                            underlayColor={'rgba(0,0,0,0.5)'}
                            style={styles.replyDelete}>
                            <SvgXml
                                width={15}
                                height={15}
                                xml={remove_icon('black')}
                                style={styles.replyIcon}
                            />
                        </TouchableHighlight>
                    </View>
                )}
                {!audioRecorder && (
                    <View style={styles.msgSectionContainer}>
                        {focused ? (
                            <TouchableOpacity
                                onPress={() => setFocusedValue(false)}
                                style={padding10}>
                                <SvgXml
                                    width="25"
                                    height="20"
                                    style={styles.centerStyle}
                                    xml={back_icon(defaultColor)}
                                />
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.containerFlex}>
                                <TouchableOpacity
                                    onPress={() => {
                                        LayoutAnimation.configureNext(
                                            LayoutAnimation.Presets.spring
                                        );
                                        showFileSelecter(!fileSelecter);
                                        showEmojiSelector(false);
                                        Keyboard.dismiss();
                                    }}
                                    style={padding10}>
                                    <SvgXml
                                        width="25"
                                        height="25"
                                        style={styles.centerStyle}
                                        xml={File_menu(fileSelecter ? defaultColor : 'gray')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        sendNewMessage('~buzz~');
                                        // DinDonSound.play()
                                    }}
                                    style={padding10}>
                                    <SvgXml
                                        width="25"
                                        height="25"
                                        style={styles.centerStyle}
                                        xml={DinDon(audioRecorder ? defaultColor : 'gray')}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                        <View style={styles.msgItemsContainer}>
                            <TextInput
                                name="username"
                                onBlur={() => setFocusedValue(false)}
                                onFocus={() => inpputFocused()}
                                autoCorrect={false}
                                maxLength={4000}
                                placeholder={'Чат бичих....'}
                                placeholderTextColor={'gray'}
                                onChangeText={typingOnInput}
                                multiline={true}
                                style={styles.textInputStyle}
                                ref={inputRef}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    LayoutAnimation.configureNext(
                                        LayoutAnimation.Presets.easeInEaseOut
                                    );
                                    Keyboard.dismiss();
                                    showEmojiSelector(!emojiSelector);
                                    showFileSelecter(false);
                                }}>
                                <SvgXml
                                    width="25"
                                    height="25"
                                    style={styles.centerStyle}
                                    xml={Smile(emojiSelector ? defaultColor : 'gray')}
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                requestAnimationFrame(() => {
                                    if (inputValue !== '') {
                                        sendNewMessage(inputValue);
                                    } else {
                                        sendNewMessage('👍');
                                    }
                                });
                            }}
                            style={styles.msgButtonContainer}>
                            {sendIconShown ? (
                                <SvgXml
                                    width="25"
                                    height="25"
                                    style={styles.sendIconStyle}
                                    xml={Send(emojiSelector ? defaultColor : 'gray')}
                                />
                            ) : (
                                <IconAnt
                                    style={styles.sendIconStyle}
                                    name="like1"
                                    size={30}
                                    color={defaultColor}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                )}
                {fileSelecter && (
                    <View style={styles.fileSelecterContainer}>
                        <FlatList
                            data={FileTypes}
                            renderItem={FileComponent}
                            horizontal={true}
                            keyExtractor={obj => obj.id.toString()}
                            style={styles.fileListStyle}
                        />
                    </View>
                )}
                {emojiSelector && (
                    <View style={styles.emojiContainerStyle}>
                        <EmojiSelector
                            columns={10}
                            showSearchBar={false}
                            showTabs={false}
                            showHistory={false}
                            showSectionTitles={false}
                            category={Categories.emotion}
                            onEmojiSelected={emoji => {
                                inputValue += emoji;
                                if (inputValue.length > 0 && !sendIconShown) {
                                    showSendIcon(true);
                                }
                                if (inputValue.length === 0 && sendIconShown) {
                                    showSendIcon(false);
                                }
                                inputRef.current.setNativeProps({ text: inputValue });
                            }}
                        />
                    </View>
                )}
                {audioRecorder && (
                    <VoiceRecorder
                        uploadFileToServer={response => uploadFileToServer(response, 1)}
                        hideComp={hideVoiceRecoder}
                    />
                )}
            </KeyboardAvoidingView>
        </>
    );
};
export default MessageSection;
