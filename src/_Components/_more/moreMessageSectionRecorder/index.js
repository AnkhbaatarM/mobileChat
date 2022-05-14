import React, { Component } from 'react';
import { Text, PermissionsAndroid, Platform, View } from 'react-native';
import { Player, Recorder } from '@react-native-community/audio-toolkit';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
const defaultColor = 'rgb(56,130,227)';

const filename = 'test.mp4';
var styles = require('./Styles');

type Props = {};

type State = {
    stopButtonDisabled: boolean,
    playButtonDisabled: boolean,
    recordButtonDisabled: boolean,

    loopButtonStatus: boolean,
    progress: number,
    timer: number,
    error: string | null,
};

export default class Index extends Component<Props, State> {
    player: Player | null;
    recorder: Recorder | null;
    lastSeek: number;
    _progressInterval: IntervalID;
    intervalID: IntervalID;

    constructor(props: Props) {
        super(props);

        this.state = {
            isPressing: false,
            stopButtonDisabled: true,
            playButtonDisabled: true,
            recordButtonDisabled: true,
            fsPath: '',
            loopButtonStatus: false,
            progress: 0,
            timer: 0,
            error: null,
        };
    }

    componentDidMount() {
        this.player = null;
        this.recorder = null;
        this.lastSeek = 0;
        // this._reloadPlayer();
        this._reloadRecorder();
        this._toggleRecord();
        this.intervalID = setInterval(() => {
            this.setState({ timer: (this.state.timer += 1) });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this._progressInterval);
    }

    _shouldUpdateProgressBar() {
        // Debounce progress bar update by 200 ms
        return Date.now() - this.lastSeek > 200;
    }

    _updateState(err) {
        this.setState({
            stopButtonDisabled: !this.player || !this.player.canStop,
            playButtonDisabled: !this.player || !this.player.canPlay || this.recorder.isRecording,
            recordButtonDisabled: !this.recorder || (this.player && !this.player.isStopped),
        });
        // this.props.hideComp();
    }

    _playPause() {
        console.warn('player_start');
        this.player.playPause((err, paused) => {
            if (err) {
                console.warn('error_player', err);
            }
            // this._updateState();
        });
    }

    _stop() {
        this.player.stop(() => {
            this._updateState();
        });
    }

    _seek(percentage) {
        if (!this.player) {
            return;
        }

        this.lastSeek = Date.now();

        let position = percentage * this.player.duration;

        this.player.seek(position, () => {
            this._updateState();
        });
    }

    _reloadPlayer() {
        if (this.player !== null && this.player) {
            this.player.destroy();
        }
        try {
            this.player = new Player(filename, {
                autoDestroy: false,
            }).prepare(err => {
                if (err) {
                    console.warn('error at _reloadPlayer():');
                    console.log(err);
                }
                this._updateState();
            });

            this._updateState();
        } catch (error) {
            console.warn('errooor_player', error);
        }
    }
    _reloadRecorder() {
        if (this.recorder !== null && this.recorder) {
            this.recorder.destroy();
        }
        this.recorder = new Recorder(filename, {
            bitrate: 256000,
            channels: 2,
            sampleRate: 44100,
            quality: 'max',
        });
        this._updateState();
    }

    checkFileExist() {
        var RNFS = require('react-native-fs');
        return RNFS.readFile(RNFS.DocumentDirectoryPath + '/test.mp4')
            .then(success => {
                console.warn('FILE exists!', success);
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    _getRecorderPath() {
        if (this.recorder) {
            this.recorder.destroy();
        }

        this.recorder = new Recorder(filename, {
            bitrate: 256000,
            channels: 2,
            sampleRate: 44100,
            quality: 'max',
        }).prepare((err, fsPath) => {
            this.setState({ fsPath: fsPath });
        });

        this._updateState();
    }
    uploadAudio = async () => {
        var RNFS = require('react-native-fs');
        // let user = await AsyncStorage.getItem('LoggedUser');
        // let parsedUser = JSON.parse(user);
        try {
            // var form = [];
            const fsPath = RNFS.DocumentDirectoryPath + '/test.mp4';
            var unc = Platform.OS === 'ios' ? decodeURIComponent(fsPath) : fsPath;
            const audioFile = {
                fileName: `${Date.now()}.mp4`,
                type: 'audio/mp4',
                uri: unc,
            };
            this.props.uploadFileToServer(audioFile);
            this.props.hideComp();
            // form.push({
            //     name: 'files',
            //     filename: 'test.mp4',
            //     type: 'audio/mp4',
            //     data: RNFetchBlob.wrap(unc),
            // });

            // RNFetchBlob.config({
            //     trusty: true,
            //     // timeout: 8000,
            // })
            //     .fetch(
            //         'POST',
            //         `https://mysql.able.mn:8000/chat/upload?roomId=${this.props.room_id}`,
            //         {
            //             // 'Content-Type': 'multipart/form-data',
            //             'x-access-token': parsedUser.accessToken,
            //         },
            //         form
            //     )
            //     .then(response => {
            //         if (response.respInfo.status === 200) {
            //             return response.json();
            //         }
            //         return null;
            //     })
            //     .then(responseJson => {
            //         if (responseJson !== null) {
            //             this._updateState();
            //             sendSocket(this.props.room_id, {
            //                 message: responseJson.length > 1 ? '' : responseJson[0].name,
            //                 msg_type: 1,
            //                 files: responseJson,
            //                 date: new Date(),
            //             }); // file ywuulsanii daraa msg ywuulah heseg
            //             this.props.hideComp(responseJson);
            //         }
            //     })
            //     .catch(error => {
            //         alert('upload error', error);
            //     });
        } catch (err) {
            console.log('aldaaa', err);
        }
    };

    _toggleRecord(remove) {
        if (this.player) {
            this.player.destroy();
        }

        let recordAudioRequest;
        if (Platform.OS == 'android') {
            recordAudioRequest = this._requestRecordAudioPermission();
        } else {
            recordAudioRequest = new Promise(function (resolve, reject) {
                resolve(true);
            });
        }

        recordAudioRequest.then(hasPermission => {
            if (!hasPermission) {
                this.setState({
                    error: 'Record Audio Permission was denied',
                });
                return;
            }

            this.recorder.toggleRecord((err, stopped) => {
                if (err) {
                    alert('error_recorder', err);
                }
                if (stopped) {
                    this._reloadRecorder();
                    console.log('remove', remove);
                    if (remove === false) {
                        this.uploadAudio();
                    }
                } else {
                    console.log('error_recorder', err);
                }
            });
        });
    }

    async _requestRecordAudioPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: 'Microphone Permission',
                    message:
                        'ExampleApp needs access to your microphone to test react-native-audio-toolkit.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    _toggleLooping(value) {
        this.setState({
            loopButtonStatus: value,
        });
        if (this.player) {
            this.player.looping = value;
        }
    }
    secondsToMinute = s => {
        return (s - (s %= 60)) / 60 + (s > 9 ? ':' : ':0') + s;
    };
    render() {
        const { isPressing, timer } = this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => {
                        this._toggleRecord(true);
                        this.setState({ timer: 0 });
                        this.props.hideComp();
                    }}>
                    <IconFontAwesome
                        style={{ margin: 10, alignSelf: 'center' }}
                        name="trash"
                        size={30}
                        color={'red'}
                    />
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <FastImage
                        style={styles.imageGif}
                        resizeMode={FastImage.resizeMode.stretch}
                        source={require('./assets/wave.gif')}
                    />
                    <Text style={styles.timerText}>{this.secondsToMinute(timer)}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        this._toggleRecord(false);
                        this.setState({ timer: 0 });
                    }}>
                    <Ionicons
                        style={{ margin: 10, alignSelf: 'center' }}
                        name="md-send"
                        size={30}
                        color={defaultColor}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
