import React, { Component } from 'react';
import {
    Alert,
    Image,
    Text,
    TouchableOpacity,
    View,
    LayoutAnimation,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { loadUserIntro, likeUser } from './ApiInterFace';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import LogOut from './LogOutButton';
import RNFetchBlob from 'rn-fetch-blob';
import { socketPort } from '@SocketCon/Socket_i';

var styles = require('./Styles');

export default class UserManager extends Component {
    constructor(props) {
        super(props);
        this.changeUserManagerState = this.changeUserManagerState.bind(this);
        this.state = {
            DomainAddress: '',
            userIntro: [],
            userIntroLike: [],
            task: '',
            itemId: 0,
            likecount: 0,
            loading: true,
            backgroundColor: 'white',
            gestureName: 'none',
            showRole: false,
        };
    }

    changeUserManagerState(domain) {
        this.props.changeUserManagerState(domain);
    }

    async componentDidMount() {
        this.loadUserIntro();
        const domain = await AsyncStorage.getItem('DomainAddress');
        this.setState({
            DomainAddress: domain,
        });
    }

    //Todo Хэрэглэгчийн мэдээлэлийг ачааллана
    loadUserIntro = async () => {
        let user = await AsyncStorage.getItem('LoggedUser');
        let parsedUser = JSON.parse(user);
        loadUserIntro(parsedUser.userId)
            .then(response => response.json())
            .then(responseJson => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                responseJson.data.icon = parsedUser.userIcon;
                try {
                    if (responseJson.data !== undefined) {
                        this.setState({
                            userIntro: responseJson.data,
                            // userIntroLike: responseJson.data.like,
                            // itemId: responseJson.data.like.id,
                            // likecount: responseJson.data.like.plus,
                            loading: false,
                        });
                    }

                    if (responseJson.data.like.isLike === true) this.setState({ task: 'unlike' });
                    else this.setState({ task: 'like' });
                } catch (e) {
                    Alert.alert('Мэдээлэл ачааллах явцад алдаа гарлаа', responseJson.message);
                    console.warn(e);
                }
            })
            .catch(err => {
                console.warn(err);
            });
    };

    //Todo тухайн хэрэглэгчийн дэмжих дэмжилтээ хасах
    likeUser = () => {
        const { task, itemId, likecount } = this.state;
        likeUser(task, itemId)
            .then(response => response.json())
            .then(responseJson => {
                try {
                    Alert.alert('Амжилттай', responseJson.message);
                    if (task === 'like')
                        this.setState({ task: 'unlike', likecount: likecount + 1 });
                    else this.setState({ task: 'like', likecount: likecount - 1 });
                } catch (e) {
                    Alert.alert('Мэдээлэл ачааллах явцад алдаа гарлаа', responseJson.message);
                    console.error(e);
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
    onSwipeDown(gestureState) {
        this.changeUserManagerState();
    }
    logout = async () => {
        let user = await AsyncStorage.getItem('LoggedUser');
        let parsedUser = JSON.parse(user);
        let fcmToken = await AsyncStorage.getItem('device_token');
        const form = [
            { name: 'userId', data: parsedUser.userId },
            { name: 'registrationToken', data: fcmToken },
        ];
        RNFetchBlob.config({
            trusty: true,
            // timeout: 8000,
        })
            .fetch(
                'POST',
                `${socketPort}LogOut`,
                {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': parsedUser.accessToken,
                },
                form
            )
            .then(response => {
                return response.json();
            })
            .then(async responseJson => {
                await AsyncStorage.setItem('LoggedUser', JSON.stringify([]));
                await AsyncStorage.setItem('isLoggedIn', '0');
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Auth' }],
                });
            });
    };
    render() {
        const { DomainAddress, userIntro, userIntroLike, likecount, task } = this.state;
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
        };
        return (
            <>
                <View
                    config={config}
                    onSwipeDown={this.onSwipeDown}
                    style={{
                        width: '100%',
                        height: '100%',
                        padding: 20,
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 5,
                    }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        style={{
                            position: 'absolute',
                            justifyContent: 'center',
                            top: 10,
                            left: 15,
                            width: 30,
                            height: 30,
                        }}>
                        <IconFeather
                            style={{ alignSelf: 'center' }}
                            name="arrow-left"
                            size={30}
                            color="gray"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        style={{
                            position: 'absolute',
                            justifyContent: 'center',
                            top: 10,
                            right: 15,
                            width: 30,
                            height: 30,
                        }}>
                        <LogOut navigation={this.props.navigation} />
                    </TouchableOpacity>
                    <Image
                        style={styles.UserManagerIconPlaceHolder}
                        source={require('./Assets/images/user_empty_icon.png')}
                    />
                    {userIntro.icon !== null && (
                        <Image style={styles.UserManagerIcon} source={{ uri: userIntro.icon }} />
                    )}
                    <View
                        style={[
                            styles.UserManagerIconPlaceHolder,
                            { borderColor: 'gray', borderWidth: 0.5 },
                        ]}
                    />
                    <Text style={styles.UserManagerTextBig}>{userIntro.sysName}</Text>
                    <Text style={styles.UserManagerTextApp}>{userIntro.appName}</Text>
                    <Text style={styles.UserManagerTextDep}>
                        {userIntro.depName !== undefined
                            ? userIntro.depName.toUpperCase()
                            : userIntro.depName}
                    </Text>
                    <View style={styles.UserStatusContainer}>
                        <Text style={styles.UserStatusText}>
                            {' '}
                            {userIntroLike.status !== ''
                                ? userIntroLike.status
                                : 'Мэдээлэл оруулаагүй байна'}
                        </Text>
                        <TouchableOpacity
                            style={styles.UserManagerLike}
                            onPress={() => this.likeUser()}>
                            {task === 'like' && (
                                <Image
                                    style={{ width: 20, height: 20, marginRight: 2 }}
                                    source={require('./Assets/images/userintro_plus_left.png')}
                                />
                            )}
                            {task === 'unlike' && (
                                <Image
                                    style={{ width: 20, height: 20, marginRight: 2 }}
                                    source={require('./Assets/images/userintro_minus_left.png')}
                                />
                            )}
                            <Text style={styles.UserManagerTextSmall}> {likecount} </Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.showRole && (
                        <View style={{ width: '100%' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    LayoutAnimation.configureNext(
                                        LayoutAnimation.Presets.easeInEaseOut
                                    );
                                    this.setState({ showRole: false });
                                }}
                                style={styles.UserManagerDetail}>
                                <Text
                                    style={[
                                        styles.UserManagerDetailName,
                                        { width: '100%', textAlign: 'left' },
                                    ]}>
                                    <Icon name="chevron-left" size={12} color="rgb(118,118,118)" />
                                    {'  Ажил үүргийн хуваарь: '}{' '}
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.UserManagerDetailRole}>{userIntro.role}</Text>
                        </View>
                    )}
                    {!this.state.showRole && (
                        <View>
                            <View style={styles.UserManagerDetail}>
                                <Text style={styles.UserManagerDetailName}>И-мэйл хаяг: </Text>
                                <Text style={styles.UserManagerDetailValue}>
                                    {userIntro.email !== ''
                                        ? userIntro.email
                                        : 'Мэдээлэл оруулаагүй байна'}
                                </Text>
                            </View>
                            <View style={styles.UserManagerDetail}>
                                <Text style={styles.UserManagerDetailName}>
                                    {'Холбогдох утас: '}{' '}
                                </Text>
                                <Text
                                    style={[
                                        styles.UserManagerDetailSub,
                                        { color: 'rgb(78,78,78)' },
                                    ]}>
                                    {userIntro.phone !== ''
                                        ? userIntro.phone
                                        : 'Мэдээлэл оруулаагүй байна'}
                                </Text>
                            </View>
                            <View style={styles.UserManagerDetail}>
                                <Text style={styles.UserManagerDetailName}>
                                    {'Байгууллагын нэр: '}
                                </Text>
                                <Text style={[styles.UserManagerDetailValue, { color: 'black' }]}>
                                    {userIntro.comName}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    LayoutAnimation.configureNext(
                                        LayoutAnimation.Presets.easeInEaseOut
                                    );
                                    if (userIntro.role.toString().length > 100)
                                        this.setState({ showRole: true });
                                }}
                                style={styles.UserManagerDetail}>
                                <Text style={styles.UserManagerDetailName}>
                                    {'Ажил үүргийн\nхуваарь: '}{' '}
                                </Text>
                                <View style={{ width: '50%' }}>
                                    {userIntro.role !== undefined && (
                                        <Text
                                            numberOfLines={
                                                userIntro.role.toString().length > 100 ? 4 : null
                                            }
                                            style={[
                                                styles.UserManagerDetailSub,
                                                { color: 'rgb(78,78,78)', width: '100%' },
                                            ]}>
                                            {userIntro.role !== ''
                                                ? userIntro.role
                                                : 'Мэдээлэл оруулаагүй байна'}
                                        </Text>
                                    )}
                                    {userIntro.role !== undefined &&
                                        userIntro.role.toString().length > 100 && (
                                            <Text style={styles.seeMore}>{'(Дэлгэрэнгүй)'}</Text>
                                        )}
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                {this.state.loading && (
                    <ActivityIndicator
                        style={{ position: 'absolute', left: 0, top: 10 }}
                        size="small"
                        color="rgb(78,78,78)"
                    />
                )}
            </>
        );
    }
}
