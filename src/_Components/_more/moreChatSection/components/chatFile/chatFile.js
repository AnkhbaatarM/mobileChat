import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableHighlight, Animated, TextInput } from 'react-native';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Sound from 'react-native-sound';
import { SvgXml } from 'react-native-svg';
import {
    DownloadFile,
    extention,
    setFileSvg,
    isImageAcceptableWeb,
    fileType,
} from '../../../../../../Gloabal/GlobalFunctions';
import { file_other } from '../../../../../utils/files/SvgFiles/more_file_ext';
import { useSelector, useDispatch } from 'react-redux';
import { selectData, setAudioInterval, setAudio } from '../../../../../../reduxStore/reducer';
import {
    setPictureIndex,
    selectedRoom,
    setPlayer,
    getPlayer,
    getPlayerInterval,
    setPlayerInterval,
    getPlayerAnimation,
    setPlayerIndex,
    getPlayerIndex,
} from '../../../../../Socket/Socket_Var';

const styles = require('./Styles');
const defaultColor = 'rgb(56,130,227)';

let intervalID;
const center = { alignSelf: 'center' };
const fileIconStyle = press => {
    return {
        width: 90,
        height: 110,
        backgroundColor: 'transparent',
        borderWidth: press ? 2 : 0,
        borderColor: press ? 'rgba(200,200,200)' : 'transparent',
        borderRadius: 10,
    };
};
const imageStyle = (isOverlay, press) => {
    return {
        width: 90,
        height: 110,
        backgroundColor: isOverlay ? 'transparent' : 'gray',
        position: isOverlay ? 'absolute' : 'relative',
        borderWidth: isOverlay ? 1 : press ? 2 : 0,
        borderColor: isOverlay
            ? press
                ? 'rgba(200,200,200,0.8)'
                : 'rgba(200,200,200,0.8)'
            : press
            ? 'transparent'
            : 'transparent',
        borderRadius: 10,
    };
};

const ChatFile = ({ navigation, item, index, fileLenght, setShowDate = () => {}, isAuthor }) => {
    const myData = useSelector(state => selectData(state, 'myData'));
    const roomImages = useSelector(state => selectData(state, 'roomImages'));
    const barWidth = useRef(new Animated.Value(0)).current;
    const durationText = useRef();

    const [press, setPress] = useState(false);
    const [audioDone, setAudioDone] = useState(true);
    const fileTypeValue = fileType(item.name, item.mimetype);
    const filePath =
        fileTypeValue === 'image'
            ? `${item.small_path ? item.small_path : item.path}&accessToken=${myData.accessToken}`
            : `${item.path}&accessToken=${myData.accessToken}`;
    useEffect(() => {
        if (fileTypeValue === 'audio') {
            durationText.current.setNativeProps({ text: '0:00' });
        }
        return () => {
            const currentPlayer = getPlayer();
            if (currentPlayer && currentPlayer._playing) {
                currentPlayer.release();
            }
        };
    }, []);
    const containerStyle = () => {
        return {
            backgroundColor: 'transparent',
            height: fileTypeValue === 'audio' ? 40 : 110,
            width: fileTypeValue === 'audio' ? 190 : 90,
            marginTop: 2,
            marginRight: isAuthor ? 0 : 3,
            marginLeft: isAuthor ? 3 : 0,
        };
    };

    const playAudio = path => {
        setPlayerIndex(index);
        setAudioDone(false);
        Sound.setCategory('Playback');
        durationText.current.setNativeProps({ text: '0:00' });
        const currentPlayer = getPlayer();
        const audioInterval = getPlayerInterval();
        const playerAnim = getPlayerAnimation();
        if (playerAnim) {
            Animated.timing(playerAnim, {
                duration: 0,
                toValue: 0,
                useNativeDriver: false,
            }).start();
        }
        Animated.timing(barWidth, {
            duration: 0,
            toValue: 0,
            useNativeDriver: false,
        }).start();
        if (currentPlayer && currentPlayer._playing) {
            currentPlayer.release();
        }

        const newPlayer = new Sound(encodeURI(path), null, error => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            const animation = Animated.timing(barWidth, {
                duration: newPlayer.getDuration() * 1000,
                toValue: 190,
                useNativeDriver: false,
            });
            animation.start(() => {
                clearPlayer(newInterval, animation);
            });
            let currentTime = 0;
            const newInterval = setInterval(() => {
                const currentPlayerIndex = getPlayerIndex();
                currentTime += 1;
                durationText.current.setNativeProps({ text: secondsToMinute(currentTime) });
                if (currentTime > newPlayer.getDuration()) {
                    clearPlayer(newInterval, animation);
                }
                if (currentPlayerIndex !== index) {
                    clearPlayer(newInterval, animation, true);
                }
            }, 1000);
            setPlayerInterval(newInterval);
            // Play the sound with an onEnd callback
            newPlayer.play(success => {
                if (success) {
                    clearPlayer(newInterval, animation);
                    // console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
            if (audioInterval) {
                clearInterval(audioInterval);
                setPlayerInterval(null);
            }
        });
        setPlayer(newPlayer);
    };

    const clearPlayer = (interval, animation, end) => {
        animation.stop();
        Animated.timing(barWidth, {
            duration: 0,
            toValue: 0,
            useNativeDriver: false,
        }).start();
        durationText.current.setNativeProps({ text: '0:00' });
        clearInterval(interval);
        animation.stop();
        setAudioDone(true);
    };

    const secondsToMinute = s => {
        return (s - (s %= 60)) / 60 + (s > 9 ? ':' : ':0') + parseInt(s, 10);
    };
    const onPressFile = () => {
        if (navigation) {
            switch (fileTypeValue) {
                case 'image':
                    if (roomImages.length > 0) {
                        const pictureIndex = roomImages.findIndex(
                            obj => obj.files.name === item.name && obj.files.size === item.size
                        );
                        setPictureIndex(pictureIndex !== -1 ? pictureIndex : 0);
                    }
                    navigation.navigate('FullScreen', {
                        room_id: selectedRoom._id,
                    });
                    break;
                case 'audio':
                    playAudio(filePath);
                    break;
                case 'file':
                    DownloadFile(filePath, item.name);
                    break;
            }
        }
    };
    return (
        <TouchableHighlight
            underlayColor={'transparent'}
            onPressIn={() => setPress(true)}
            onPressOut={() => setPress(false)}
            onPress={() => onPressFile()}
            onLongPress={evt => setShowDate(evt)}
            style={containerStyle(fileLenght, item.name)}>
            <>
                {fileTypeValue === 'image' && filePath && (
                    <>
                        <FastImage
                            source={{
                                uri: isImageAcceptableWeb(filePath),
                                priority: FastImage.priority.low,
                            }}
                            resizeMode={FastImage.resizeMode.stretch}
                            style={imageStyle(false, press)}
                        />
                        <View style={imageStyle(true, press)} />
                    </>
                )}
                {fileTypeValue === 'audio' && (
                    <View style={styles.audioContainer}>
                        <View style={styles.progressContainerMain}>
                            <Animated.View style={[styles.animProgressCon, { width: barWidth }]} />
                            <View style={styles.playerContainer}>
                                <FontAwesome5
                                    style={center}
                                    name={audioDone ? 'play' : 'pause'}
                                    size={10}
                                    color={'white'}
                                />
                                <View style={styles.progressValue} />
                                <TextInput ref={durationText} style={styles.timerText} />
                            </View>
                        </View>
                    </View>
                )}
                {fileTypeValue === 'file' && (
                    <>
                        <SvgXml
                            style={fileIconStyle(press)}
                            width={90}
                            height={110}
                            xml={
                                setFileSvg(item.name, item.mimetype) === 'empty'
                                    ? file_other(press)
                                    : setFileSvg(item.name, item.mimetype, press)
                            }
                        />
                        {setFileSvg(item.name, item.mimetype) === 'empty' && (
                            <Text
                                ellipsizeMode={'tail'}
                                numberOfLines={2}
                                style={press ? styles.otherFileExtPress : styles.otherFileExt}>
                                {extention(item.name, item.mimetype)}
                            </Text>
                        )}
                    </>
                )}
            </>
        </TouchableHighlight>
    );
};
export default ChatFile;
