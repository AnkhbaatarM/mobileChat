import React from 'react';
import { View, Text, TouchableHighlight, Platform, FlatList } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Clipboard from '@react-native-community/clipboard';
import { COPY, DELETE, FORWARD, REPLY } from '../../../../../utils/files/SvgFiles/more_chat';
import styles, {
    contextCenter,
    contextMenuContainer,
    triangleShape,
    triangleShapeDown,
    contextMenuValueContainer,
} from './Styles';
import Modal from 'react-native-modal';
import RNUrlPreview from 'react-native-url-preview';
import { isEmoji, normalize } from '../../../../../../Gloabal/GlobalFunctions';
import { Fonts } from '../../../../../utils/fonts/Fonts';
import { height100 } from '../../../../../utils/dimensions/height';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { sendSocket } from '../../../../../Socket/Socket_i';
import { getSelectedRoom } from '../../../../../Socket/Socket_Var';
import { fileContainerStyle } from '../renderMsgByType/Styles';
import ChatFile from '../chatFile/chatFile';

const defaultColor = '#178ddf';
const greyColor = '#e5e9ec';
let heightVal = 0;
const contextMenu = ({
    isAuthor,
    msg,
    index,
    hideMenu = () => {},
    offset = 0,
    chat,
    compHeight,
    deleteChat = () => {},
    setReplyMsg = () => {},
}) => {
    console.log('chattatat',chat)
    const isBottom = height100 < offset + compHeight + 200;
    const msgOffset = () => {
        return {
            top: isBottom ? null : offset,
            bottom: isBottom ? height100 - (offset + compHeight + 25) : null,
            position: 'absolute',
            width: '100%',
            alignItems: isAuthor ? 'flex-end' : 'flex-start',
            // borderWidth: 1,
        };
    };
    const positionStyle = () => {
        return {
            justifyContent: isAuthor ? 'flex-end' : 'flex-start',
        };
    };
    const textMsgContainer = () => {
        return {
            backgroundColor: msgBackground(chat, isAuthor),
            borderRadius: 10,
            paddingTop: 8,
            paddingHorizontal: 10,
            marginRight: isAuthor ? 10 : 0,
            marginLeft: isAuthor ? 0 : 43,
            paddingBottom: Platform.OS === 'android' ? 10 : 8,
            maxWidth: '75%',
            paddingRight: 30,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        };
    };
    const fileMsgContainer = () => {
        return {
            backgroundColor: msgBackground(chat, isAuthor),
            borderRadius: 10,
            paddingTop: 8,
            paddingHorizontal: 10,
            marginRight: isAuthor ? 10 : 0,
            marginLeft: isAuthor ? 0 : 43,
            maxWidth: '75%',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            height: 130,
        };
    };
    const likeStyle = () => {
        if (isAuthor) {
            return { alignSelf: 'flex-end', marginRight: 9 };
        } else {
            return { alignSelf: 'flex-start', marginLeft: 47, marginTop: 9 };
        }
    };
    const msgBackground = () => {
        if (isEmoji(chat.msg) === '' || chat.msg_type === 2) {
            return 'transparent';
        } else if (isAuthor && chat.msg_type !== 4) {
            return defaultColor;
        } else {
            return greyColor;
        }
    };

    const textStyle = () => {
        return {
            fontFamily: Fonts.RobotoRegular,
            color: isAuthor ? 'white' : 'black',
            fontSize: isEmoji(msg) === '' ? 50 : normalize(16),
            textDecorationLine: msg.includes('http') ? 'underline' : 'none',
        };
    };

    const contextMenuCont = isTop => {
        return (
            <View
                style={contextMenuContainer(
                    isAuthor,
                    !chat.files || chat.files.length === 0 ? (isAuthor ? 200 : 110) : 110
                )}>
                <View
                    style={
                        isTop ? triangleShapeDown(isAuthor, index) : triangleShape(isAuthor, index)
                    }
                />
                <View style={contextMenuValueContainer(isTop)}>
                    {(!chat.files || chat.files.length === 0) && (
                        <TouchableHighlight
                            onPress={() => {
                                Clipboard.setString(msg);
                                hideMenu(true);
                            }}
                            style={styles.contextButton}>
                            <>
                                <SvgXml
                                    width="25"
                                    height="25"
                                    style={contextCenter}
                                    xml={COPY('#8d979f')}
                                />
                                <Text style={styles.contextText}>Хуулах</Text>
                            </>
                        </TouchableHighlight>
                    )}
                    {isAuthor && (
                        <TouchableHighlight
                            onPress={() => deleteChat(true)}
                            style={styles.contextButton}>
                            <>
                                <SvgXml
                                    width="25"
                                    height="25"
                                    style={contextCenter}
                                    xml={DELETE('#8d979f')}
                                />
                                <Text style={styles.contextText}>Устгах</Text>
                            </>
                        </TouchableHighlight>
                    )}
                    {/* <TouchableHighlight
                        onPress={() => console.log('forward')}
                        style={styles.contextButton}>
                        <>
                            <SvgXml
                                width="25"
                                height="25"
                                style={contextCenter}
                                xml={FORWARD('#8d979f')}
                            />
                            <Text style={styles.contextText}>Forward</Text>
                        </>
                    </TouchableHighlight> */}
                    <TouchableHighlight
                        onPress={() => {
                            setReplyMsg(chat);
                            hideMenu(true);
                        }}
                        style={styles.contextButton}>
                        <>
                            <SvgXml
                                width="25"
                                height="25"
                                style={contextCenter}
                                xml={REPLY('#8d979f')}
                            />
                            <Text style={styles.contextText}>Хариулах</Text>
                        </>
                    </TouchableHighlight>
                </View>
            </View>
        );
    };

    const renderFile = ({ item, index }) => {
        return <ChatFile index={index} item={item} isAuthor={isAuthor} />;
    };
    const renderFileThird = ({ item, index }) => {
        return <ChatFile index={index} item={item} />;
    };

    return (
        <Modal
            onBackButtonPress={hideMenu}
            onBackdropPress={hideMenu}
            animationInTiming={1}
            animationOutTiming={1}
            useNativeDriver={true}
            isVisible={true}
            backdropOpacity={0}
            style={styles.modalStyle}>
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => hideMenu()}
                style={msgOffset()}>
                <>
                    {isBottom && contextMenuCont(true)}
                    {(!chat.files || chat.files.length === 0) && chat.msg_type !== 2 && (
                        <View
                            onLayout={event => {
                                heightVal = event.nativeEvent.layout.height;
                            }}
                            style={textMsgContainer(isAuthor, chat)}>
                            <Text style={textStyle()}>{msg}</Text>
                            {msg.includes('http') && (
                                <RNUrlPreview
                                    containerStyle={styles.urlContainer}
                                    textContainerStyle={styles.urlTextContainer}
                                    imageProps={{ resizeMode: 'contain' }}
                                    titleStyle={styles.urlTitleStyle}
                                    descriptionStyle={styles.urlDescStyle}
                                    text={msg.toString()}
                                />
                            )}
                        </View>
                    )}
                    {chat.msg_type === 2 && (
                        <IconAnt style={likeStyle()} name="like1" size={32} color={defaultColor} />
                    )}
                    {chat.files && chat.files.length > 0 && (
                        <View
                            onLayout={event => {
                                heightVal = event.nativeEvent.layout.height;
                            }}
                            style={fileMsgContainer(isAuthor, chat)}>
                            {chat.files.length === 4 ? (
                                <FlatList
                                    key={'_'}
                                    style={fileContainerStyle(isAuthor)}
                                    columnWrapperStyle={positionStyle(isAuthor)}
                                    data={chat.files}
                                    numColumns={2}
                                    removeClippedSubviews={true}
                                    initialNumToRender={5}
                                    windowSize={15}
                                    keyExtractor={(obj, index) => '_' + index.toString()}
                                    renderItem={renderFile}
                                    scrollEnabled={false}
                                />
                            ) : (
                                <FlatList
                                    key={'#'}
                                    style={fileContainerStyle(isAuthor)}
                                    columnWrapperStyle={positionStyle(isAuthor)}
                                    data={chat.files}
                                    numColumns={3}
                                    removeClippedSubviews={true}
                                    initialNumToRender={5}
                                    windowSize={15}
                                    scrollEnabled={false}
                                    keyExtractor={(obj, index) => '#' + index.toString()}
                                    renderItem={renderFileThird}
                                />
                            )}
                        </View>
                    )}
                    {!isBottom && contextMenuCont(false)}
                </>
            </TouchableHighlight>
        </Modal>
    );
};
export default contextMenu;
