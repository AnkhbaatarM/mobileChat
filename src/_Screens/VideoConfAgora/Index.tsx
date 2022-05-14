import React, { Component } from 'react';
import { Platform, Image, Text, TouchableOpacity, View } from 'react-native';
import RtcEngine, { RtcLocalView, RtcRemoteView, VideoRenderMode } from 'react-native-agora';
import io from 'socket.io-client';
import styles from './Style';
import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';
import RNFetchBlob from 'rn-fetch-blob';
import { sendSocket } from '@SocketCon/Socket_i';
import IconFeather from 'react-native-vector-icons/Feather';
import { isImageAcceptable } from 'root/GlobalFunctions';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import RNCallKeep from 'react-native-callkeep';

interface Props {}

/**
 * @property peerIds Array for storing connected peers
 * @property appId
 * @property channelName Channel Name for the current session
 * @property joinSucceed State variable for storing success
 */
interface State {
    appId: string;
    channelName: string;
    joinSucceed: boolean;
    channelToken: string;
    peerIds: number[];
    userId: any;
    hash: string;
    localStream: any;
    startType: string;
    roomUsers: any[];
    roomPath: string;
    videoOffOn: boolean;
    audioOffOn: boolean;
    NotifyText: string;
    videoType: string;
}
let timeOut: number;
export default class Index extends Component<Props, State> {
    _engine?: RtcEngine;
    _socket: io;
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            appId: '',
            channelName: '',
            channelToken: '',
            joinSucceed: false,
            peerIds: [],
            userId: 0,
            hash: '',
            localStream: null,
            startType: '',
            roomUsers: [],
            roomPath: '',
            videoOffOn: true,
            audioOffOn: true,
            NotifyText: 'Дуудаж байна ...',
            videoType: 'audio',
        };
        if (Platform.OS === 'android') {
            // Request required permissions from Android
        }
    }
    componentDidMount() {
        const { params } = this.props.route;
        this.setState({ startType: params.startType, videoType: params.videoType });

        if (params.startType === 'create') {
            var users = JSON.parse(params.roomUsers);
            const myIndex = users.findIndex((obj: { id: any }) => obj.id === params.userId);
            if (users.length == 2) {
                users = users.splice(myIndex, 1);
                this.setState({ roomUsers: users });
                this.setState({ roomPath: users[0].path });
            } else {
                this.setState({ roomPath: params.roomPath });
                this.setState({ roomUsers: users });
            }
            this.startSipVideoCall(params.userId, params.roomId, params.videoType);
        } else if (params.startType === 'join') {
            this.setState({
                appId: params.appId,
                channelName: params.channelName,
                channelToken: params.channelToken,
                userId: params.userId,
                NotifyText: 'Холбогдож байна түр хүлээнэ үү ...',
            });
            this.init(params.appId, params.roomId, params.videoType);
        }
        this.startLocalStream();
    }

    startSipVideoCall = async (userId: any, roomId: any, videoType: any) => {
        const body = JSON.stringify({
            type: 'web',
            name: 'erdenebileg@able.mn',
            password: 'password123',
        });
        RNFetchBlob.config({
            trusty: true,
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
                console.warn('login_response', responseJson);
                const sipCallPro = responseJson.result;
                const bodyToken = JSON.stringify({
                    callToken: sipCallPro.callToken,
                    type: 'sip',
                    video: 1,
                });
                RNFetchBlob.config({
                    trusty: true,
                    // timeout: 5000
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
                    .then(responseJson => {
                        const msg = {
                            channelName: responseJson.channelName,
                            channelToken: responseJson.channelToken,
                            appId: responseJson.appId,
                            userId: userId,
                            hash: responseJson.hash,
                            roomId: roomId,
                            videoType: videoType,
                        };
                        sendSocket(roomId, {
                            message: JSON.stringify(msg),
                            msg_type: 4,
                            isGroup: false,
                            files: null,
                            date: new Date(),
                        });
                        this.setState({
                            appId: responseJson.appId,
                            channelName: responseJson.channelName,
                            channelToken: responseJson.channelToken,
                            userId: userId,
                        });
                        this.init(responseJson.appId, videoType, roomId);
                    });
            });
    };

    startLocalStream = async () => {
        // isFront will determine if the initial camera should face user or environment
        const isFront = true;
        const devices = await mediaDevices.enumerateDevices();

        const facing = isFront ? 'front' : 'environment';
        const videoSourceId = devices.find(
            (device: { kind: string; facing: string }) =>
                device.kind === 'videoinput' && device.facing === facing
        );
        const facingMode = isFront ? 'user' : 'environment';
        const constraints = {
            audio: true,
            video: {
                mandatory: {
                    minWidth: 500, // Provide your own width, height and frame rate here
                    minHeight: 300,
                    minFrameRate: 30,
                },
                facingMode,
                optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
            },
        };
        const newStream = await mediaDevices.getUserMedia(constraints);
        this.setState({ localStream: newStream });
    };

    /**
     * @name init
     * @description Function to initialize the Rtc Engine, attach event listeners and actions
     */
    init = async (appId: string, videoType: string, roomId: any) => {
        this._engine = await RtcEngine.create(appId);
        if (videoType === 'video') await this._engine.enableVideo();
        await this._engine.enableAudio();
        this._engine.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed);
            clearTimeout(timeOut);
            // Get current peer IDs
            const { peerIds } = this.state;
            // If new user
            if (peerIds.indexOf(uid) === -1) {
                this.setState({
                    // Add peer ID to state array
                    peerIds: [...peerIds, uid],
                });
            }
        });

        this._engine.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason);
            this.setState({ NotifyText: 'Холболт тасарлаа' });
            const { peerIds } = this.state;
            this.setState({
                // Remove peer ID from state array
                peerIds: peerIds.filter(id => id !== uid),
            });
        });

        // If Local user joins RTC channel
        this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
            console.log('JoinChannelSuccess', channel, uid, elapsed);
            // Set state variable to true
            this.setState({
                joinSucceed: true,
            });
        });
        this._socket = io.connect('https://socket.callpro.mn', { path: '/able', secure: true });
        this._socket.on('connect', (socket: any) => {
            console.warn('socket', socket);
            // socket.emit('room', responseJson.channelName);
        });
        this._socket.emit('room', this.state.channelName);
        this._socket.on('message', async (msg: { type: string; channelName: any }) => {
            console.warn('msg_type', msg);
            if (msg.type == 'answer') {
                await this._engine?.joinChannel(
                    this.state.channelToken,
                    this.state.channelName,
                    null,
                    this.state.userId
                );
            }
            if (msg.type == 'bye') {
                //leave room & disconnect
                this.setState({ NotifyText: 'Disconnected' });
                this._socket.emit('leave', msg.channelName);
                this._socket.disconnect();
                this.endCall();
            }
        });

        var data = {
            channelName: this.state.channelName,
            type: 'call',
            hash: this.state.hash,
        };
        this._socket.emit('message', JSON.stringify(data));
        var data = {
            channelName: this.state.channelName,
            type: 'answer',
            hash: this.state.hash,
        };
        this._socket.emit('message', JSON.stringify(data));
        timeOut = setTimeout(() => {
            sendSocket(roomId, {
                message: 'Видео дуудлага ирсэн',
                msg_type: 4,
                isGroup: false,
                files: null,
                date: new Date(),
            });
            this.setState({ NotifyText: 'Disconnected' });
            this._socket.emit('leave', this.state.channelName);
            this._socket.disconnect();
            this.endCall();
        }, 60000);
    };

    /**
     * @name startCall
     * @description Function to start the call
     */
    startCall = async () => {
        // Join Channel using null token and channel name
        await this._engine?.joinChannel(
            this.state.channelToken,
            this.state.channelName,
            null,
            this.state.userId
        );
    };

    /**
     * @name endCall
     * @description Function to end the call
     */
    endCall = async () => {
        this._socket.emit('leave', this.state.channelName);
        this._socket.disconnect();
        await this._engine?.leaveChannel();
        this.setState({ peerIds: [], joinSucceed: false });
        this.props.navigation.goBack();
        RNCallKeep.endAllCalls();
    };

    render() {
        const { peerIds, roomUsers, videoOffOn, audioOffOn, NotifyText, videoType } = this.state;
        return (
            <View style={styles.max}>
                <View style={styles.max}>
                    {this._renderVideos()}
                    {peerIds.length == 0 && <Text style={styles.callingText}> {NotifyText} </Text>}
                    {(videoType === 'audio' || (peerIds.length == 0 && roomUsers.length > 0)) &&
                        this._renderUserIcons()}

                    <IconFeather
                        onPress={() => {
                            this.endCall();
                        }}
                        style={{ position: 'absolute', top: 20, left: 20 }}
                        name="arrow-left"
                        size={30}
                        color="white"
                    />
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            position: 'absolute',
                            paddingBottom: 40,
                            paddingTop: 20,
                            justifyContent: 'space-evenly',
                            bottom: 0,
                            backgroundColor: 'black',
                            borderTopRightRadius: 40,
                            borderTopLeftRadius: 40,
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ videoOffOn: !videoOffOn });
                                videoOffOn
                                    ? this._engine?.disableVideo()
                                    : this._engine?.enableVideo();
                            }}
                            style={[
                                styles.button,
                                { backgroundColor: 'gray', alignSelf: 'center' },
                            ]}>
                            <MaterialCommunityIcons
                                style={{ alignSelf: 'center' }}
                                name={videoOffOn ? 'camera-off' : 'camera'}
                                size={30}
                                color="white"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ audioOffOn: !audioOffOn });
                                audioOffOn
                                    ? this._engine?.disableAudio()
                                    : this._engine?.enableAudio();
                            }}
                            style={[
                                styles.button,
                                { backgroundColor: 'gray', alignSelf: 'center' },
                            ]}>
                            <MaterialCommunityIcons
                                style={{ alignSelf: 'center' }}
                                name={audioOffOn ? 'microphone-off' : 'microphone'}
                                size={30}
                                color="white"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.endCall}
                            style={[
                                styles.button,
                                { backgroundColor: 'red', alignSelf: 'center' },
                            ]}>
                            <SimpleLineIcons
                                style={{ alignSelf: 'center' }}
                                name="call-end"
                                size={30}
                                color="white"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this._engine?.switchCamera()}
                            style={[
                                styles.button,
                                { backgroundColor: 'gray', alignSelf: 'center' },
                            ]}>
                            <MaterialCommunityIcons
                                style={{ alignSelf: 'center' }}
                                name="camera-switch"
                                size={30}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    _renderUserIcons = () => {
        const { roomUsers, roomPath } = this.state;
        return (
            <>
                {roomUsers.length > 2 && (roomPath === undefined || roomPath === '') && (
                    <View style={styles.userIconContainer}>
                        <FastImage
                            style={[
                                styles.groupIcon,
                                {
                                    position: 'absolute',
                                    left: 0,
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                },
                            ]}
                            source={require('./images/people.png')}>
                            <Image
                                style={[styles.groupIcon, { position: 'absolute' }]}
                                source={{ uri: isImageAcceptable(roomUsers[0].path) }}
                            />
                        </FastImage>
                        <FastImage
                            style={[
                                styles.groupIcon,
                                {
                                    position: 'absolute',
                                    bottom: 0,
                                    right: -15,
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                },
                            ]}
                            source={require('./images/people.png')}>
                            <Image
                                style={[styles.groupIcon, { position: 'absolute' }]}
                                source={{
                                    uri:
                                        isImageAcceptable(roomUsers[0].path) !== ''
                                            ? roomUsers[0].path
                                            : isImageAcceptable(roomUsers[2].path),
                                }}
                            />
                        </FastImage>
                    </View>
                )}
                {roomUsers.length > 2 && (roomPath !== undefined || roomPath !== '') && (
                    <FastImage
                        style={[styles.userIcon, { marginRight: 10, marginTop: '30%' }]}
                        source={require('./images/team.png')}>
                        <Image
                            style={[styles.userIcon, { backgroundColor: 'red' }]}
                            source={{ uri: isImageAcceptable(roomPath) }}
                        />
                    </FastImage>
                )}
                {roomUsers.length === 1 && (roomPath !== undefined || roomPath !== '') && (
                    <FastImage
                        style={[styles.userIcon, { marginRight: 10, marginTop: '30%' }]}
                        source={require('./images/people.png')}>
                        <Image
                            style={[styles.userIcon, { backgroundColor: 'red' }]}
                            source={{ uri: isImageAcceptable(roomPath) }}
                        />
                    </FastImage>
                )}
            </>
        );
    };

    _renderVideos = () => {
        const { joinSucceed, peerIds } = this.state;
        return joinSucceed ? (
            <View style={styles.fullView}>
                {peerIds.length > 0 && (
                    <RtcRemoteView.SurfaceView
                        style={peerIds.length !== 0 ? styles.max : styles.remote}
                        uid={peerIds[0]}
                        channelId={this.state.channelName}
                        renderMode={VideoRenderMode.Hidden}
                    />
                )}
                <RtcLocalView.SurfaceView
                    style={
                        peerIds.length !== 0
                            ? [
                                  styles.remote,
                                  { position: 'absolute', top: 10, right: 10, borderRadius: 10 },
                              ]
                            : styles.max
                    }
                    channelId={this.state.channelName}
                    renderMode={VideoRenderMode.Hidden}
                    zOrderMediaOverlay={true}
                />
            </View>
        ) : (
            this.state.localStream !== null && (
                <RTCView style={{ flex: 1 }} streamURL={this.state.localStream.toURL()} />
            )
        );
    };

    _renderRemoteVideos = () => {
        const { peerIds } = this.state;
        return (
            <View style={styles.remoteContainer}>
                {peerIds.map((value, index, array) => {
                    return (
                        <RtcRemoteView.SurfaceView
                            style={styles.remote}
                            uid={value}
                            channelId={this.state.channelName}
                            renderMode={VideoRenderMode.Hidden}
                            zOrderMediaOverlay={true}
                        />
                    );
                })}
            </View>
        );
    };
}
