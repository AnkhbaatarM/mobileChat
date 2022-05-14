import React from 'react';
import { View, Text, FlatList } from 'react-native';
import RNUrlPreview from 'react-native-url-preview';
import { SvgXml } from 'react-native-svg';
import { isEmoji, normalize, normalize2 } from '../../../../../../Gloabal/GlobalFunctions';
import { Fonts } from 'font_directory/Fonts';
import IconAnt from 'react-native-vector-icons/AntDesign';
import ChatFile from '../chatFile/chatFile';
import RoomIcon from '../../../../_global/roomIcon';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UserIconGroup from '../../../../_global/UserIconGroup';
import {
    video_call,
    video_call_declined,
} from '../../../../../utils/files/SvgFiles/moreHeaderIcon';
import { DinDon, massMsg } from '../../../../../utils/files/SvgFiles/more_messageSection_icons';
import {
    chatTextBackgroundColor,
    fileContainerStyle,
    styles,
    textMsgContainer,
    likeStyle,
    replyMsgContainer,
    massMsgContainer,
    massMsgIconConatiner,
    massMsgTitleConatiner,
    massMsgTitle,
} from './Styles';
import { REPLY } from '../../../../../utils/files/SvgFiles/more_chat';
import { chatListIcon } from '../../../../../_Screens/Profile/assets';
const defaultColor = '#178ddf';
const greyColor = '#e5e9ec';

const icon_name = data => {
    switch (data.msg_type) {
        case 3:
            return <IconMaterialIcons style={center} name={'edit'} size={15} color="gray" />;
        case 5:
            return <IconMaterialIcons style={center} name={'image'} size={15} color="gray" />;
        case 7:
            return <AntDesign style={center} name={'adduser'} size={15} color="gray" />;
        case 9:
            return <SimpleLineIcons style={center} name={'logout'} size={15} color="gray" />;
    }
};

const center = { alignSelf: 'center' };
const positionStyle = isAuthor => {
    return {
        justifyContent: isAuthor ? 'flex-end' : 'flex-start',
    };
};
const RenderByMsgType = ({
    msg,
    isAuthor,
    chat,
    type,
    navigation,
    fileLenght,
    chatIndex,
    setShowDate,
}) => {
    const textStyle = (extraStyle = {}) => {
        return Object.assign(
            {
                fontFamily: Fonts.RobotoRegular,
                // backgroundColor: chatTextBackgroundColor(msg, isAuthor, type),
                color: isAuthor ? 'white' : 'black',
                fontSize: isEmoji(msg) === '' ? 50 : normalize2(15),
                textDecorationLine: msg.includes('http') ? 'underline' : 'none',
            },
            extraStyle
        );
    };
    const renderFile = ({ item, index }) => {
        return (
            <ChatFile
                navigation={navigation}
                index={chatIndex}
                fileLenght={fileLenght}
                item={item}
                setShowDate={evt => setShowDate(evt)}
                isAuthor={isAuthor}
            />
        );
    };
    const renderFileThird = ({ item, index }) => {
        return (
            <ChatFile
                navigation={navigation}
                index={chatIndex}
                fileLenght={fileLenght}
                item={item}
                setShowDate={evt => setShowDate(evt)}
            />
        );
    };

    switch (type) {
        case 0: {
            return (
                <View
                    underlayColor={isAuthor ? defaultColor : greyColor}
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
            );
        }
        case 1:
            if (chat.files) {
                return chat.files && chat.files.length === 4 ? (
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
                );
            } else {
                return null;
            }
        case 2: {
            return (
                <View underlayColor={'transparent'}>
                    <IconAnt style={likeStyle()} name="like1" size={30} color={defaultColor} />
                </View>
            );
        }
        case 3: {
            const msgSender = msg.split(':$option$:')[0];
            const msgDetail = msg.split(':$option$:')[1];
            return (
                <Text style={styles.notifyText}>
                    {icon_name(chat)}
                    {msgSender}
                    <Text style={styles.notifyTextBold}>{msgDetail}</Text>
                </Text>
            );
        }
        case 4: {
            return (
                <View style={textMsgContainer(isAuthor, chat)}>
                    <View style={styles.dinDonContainer}>
                        <SvgXml width="25" height="25" style={center} xml={DinDon('red')} />
                        <Text style={styles.dinDonText}>{' Дин Дон'}</Text>
                    </View>
                </View>
            );
        }
        case 5: {
            const uri = msg.split(':$option$:')[1];
            return (
                <View style={styles.centerStyle}>
                    <RoomIcon style={center} width={30} height={30} roomIcon={uri} />
                    <Text style={styles.notifyText}>
                        {icon_name(chat)}
                        {` ${msg.split(':$option$:')[0]}`}
                    </Text>
                </View>
            );
        }
        case 7: {
            const user = JSON.parse(msg.split(':$option$:')[1]);
            return (
                <View style={styles.centerStyle}>
                    <UserIconGroup
                        borderColor={'rgba(0,0,0,0.3)'}
                        width={20}
                        height={20}
                        array={user}
                    />
                    <Text style={styles.notifyText}>
                        {icon_name(chat)}
                        {` ${msg.split(':$option$:')[0]} `}
                    </Text>
                </View>
            );
        }
        case 8: {
            return (
                <View style={textMsgContainer(isAuthor, chat)}>
                    <Text style={textStyle(msg)}>{msg}</Text>
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
            );
        }
        case 9: {
            const deleteUser = JSON.parse(msg.split(':$option$:')[1]);
            const msgSender = msg.split(':$option$:')[0];
            return (
                <Text style={styles.notifyText}>
                    {icon_name(chat)}
                    {msgSender}
                    <Text style={styles.notifyTextBold}>{deleteUser.system_name}</Text>
                </Text>
            );
        }
        case 10: {
            return (
                <View style={styles.videoUnAnsweredContainer}>
                    <SvgXml width="25" height="25" style={center} xml={video_call('green')} />
                    <Text style={styles.videoCallText}>
                        {'Видео дуудлага хийсэн=' + chat.msg_type}
                    </Text>
                </View>
            );
        }
        case 11: {
            return (
                <View style={styles.videoUnAnsweredContainer}>
                    <SvgXml width="25" height="25" style={center} xml={video_call('red')} />
                    <Text style={styles.videoCallText}>{'Видео дуудлага=' + chat.msg_type}</Text>
                </View>
            );
        }
        case 12: {
            return (
                <View style={styles.videoUnAnsweredContainer}>
                    <SvgXml
                        width="25"
                        height="25"
                        style={center}
                        xml={video_call_declined('red')}
                    />
                    <Text style={styles.videoCallText}>
                        {'Видео дуудлага avaagui=' + chat.msg_type}
                    </Text>
                </View>
            );
        }
        case 14: {
            const msgFix = msg
                .replace('<font', '')
                .replace('class="massMsg"', '')
                .replace('color="blue">', '')
                .replace('Шуурхай мессеж', '')
                .replace('</font>', '')
                .replace('<br>', '');
            return (
                <View
                    underlayColor={isAuthor ? defaultColor : greyColor}
                    style={textMsgContainer(isAuthor, chat)}>
                    <View style={massMsgContainer(isAuthor)}>
                        {isAuthor && (
                            <View style={massMsgIconConatiner(isAuthor)}>
                                <SvgXml xml={massMsg('white')} style={center} />
                            </View>
                        )}
                        <View style={massMsgTitleConatiner(isAuthor)}>
                            <Text style={massMsgTitle(isAuthor)}>{'Шуурхай мессеж'}</Text>
                        </View>
                        {!isAuthor && (
                            <View style={massMsgIconConatiner(isAuthor)}>
                                <SvgXml xml={massMsg('white')} style={center} />
                            </View>
                        )}
                    </View>
                    <Text style={textStyle({ paddingLeft: 10 })}>{msgFix}</Text>
                </View>
            );
        }
        case 15: {
            const msgFix = msg
                .replace('<font', '')
                .replace('class="massMsg"', '')
                .replace('color="blue">', '')
                .replace('Шуурхай мессеж', '')
                .replace('</font>', '')
                .replace('<br>', '');
            return (
                <>
                    <View style={replyMsgContainer(isAuthor)}>
                        {chat.replyMsgType === 1 ? (
                            chat.replyFiles.length === 4 ? (
                                <FlatList
                                    key={'_'}
                                    style={fileContainerStyle(isAuthor)}
                                    columnWrapperStyle={positionStyle(isAuthor)}
                                    data={chat.replyFiles}
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
                                    data={chat.replyFiles}
                                    numColumns={3}
                                    removeClippedSubviews={true}
                                    initialNumToRender={5}
                                    windowSize={15}
                                    scrollEnabled={false}
                                    keyExtractor={(obj, index) => '#' + index.toString()}
                                    renderItem={renderFileThird}
                                />
                            )
                        ) : (
                            <>
                                <View style={styles.replyView}>
                                    <Text style={styles.replyTxt}>{chat.replyMsg}</Text>
                                </View>
                            </>
                        )}
                        <View
                            underlayColor={isAuthor ? defaultColor : greyColor}
                            style={textMsgContainer(isAuthor, chat, {
                                marginTop:
                                    isEmoji(chat.msg) === '' || chat.msg_type === 2 ? -20 : -10,
                                maxWidth: '100%',
                            })}>
                            <Text style={textStyle()}>{msgFix}</Text>
                        </View>
                    </View>
                </>
            );
        }
        default:
            return (
                <View
                    underlayColor={isAuthor ? defaultColor : greyColor}
                    style={textMsgContainer(isAuthor, chat)}>
                    <Text style={textStyle()}>{msg}</Text>
                </View>
            );
    }
};
export default RenderByMsgType;
