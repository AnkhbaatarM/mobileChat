import React, { useEffect, useState } from 'react';
import { View, TextInput, SafeAreaView, ActivityIndicator, LayoutAnimation } from 'react-native';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import IconEntypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LayoutUtil } from './LayoutUtil';
import { UserItems } from '../homeRoomSearchListItem';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import { socketPort } from '@SocketCon/Socket_i';
import { getRoomList } from '../../../Socket/Socket_Var';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { back_icon } from 'utils_svg/moreHeaderIcon';
import { SvgXml } from 'react-native-svg';
import { selectData } from '../../../../reduxStore/reducer';
import { useSelector } from 'react-redux';

IconEntypo.loadFont();

var styles = require('./Styles');

const RecyclerView = props => {
    // const state = useSelector(selectData);
    const myData = useSelector(state => selectData(state, 'myData'));
    const [search, setSearch] = useState('');
    const [dataProvider, setDataProvider] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    );
    const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(2));
    const [accessToken, setAccessToken] = useState('');
    const [userIds, setUserIds] = useState('');
    const [loadingUsers, setLoadingUsers] = useState(false);
    useEffect(() => {
        var userChat = '';
        setUserIds(userChat);
        const roomList = getRoomList();
        setDataProvider(dataProvider.cloneWithRows(roomList));
        setUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const setUserData = async () => {
        let user = await AsyncStorage.getItem('LoggedUser');
        let parsedUser = JSON.parse(user);
        setAccessToken(parsedUser.accessToken);
    };

    const sortArray = (newArray, compareArray) => {
        var singleRooms = [];
        var groupRooms = [];
        compareArray.map(item => {
            if (item.users.length === 2) {
                const index = item.users.findIndex(obj => obj.id !== myData.userId);
                if (index !== -1) {
                    const removeIndex = newArray.findIndex(obj => obj.id === item.users[index].id);
                    newArray.splice(removeIndex, 1);
                }
                singleRooms.push(item);
            } else {
                groupRooms.push(item);
            }
        });
        var com_names = [];
        newArray.map(item => {
            if (com_names.findIndex(obj => obj === item.com_name) === -1) {
                com_names.push(item.com_name);
            }
        });

        var SortedArray = [];
        if (groupRooms.length > 0) {
            SortedArray = [
                { title: 'Идэвхитэй өрөө', color: 'royalblue' },
                ...groupRooms,
                ...SortedArray,
            ];
        }
        if (singleRooms.length > 0) {
            SortedArray = [
                ...SortedArray,
                { title: 'Идэвхитэй түүх', color: 'royalblue' },
                ...singleRooms,
            ];
        }
        com_names.map(comName => {
            SortedArray.push({ title: comName, color: 'gray' });
            newArray.map(obj => {
                if (obj.com_name === comName) {
                    SortedArray.push(obj);
                }
            });
        });
        return SortedArray;
    };

    const searchRoom = async text => {
        setSearch(text);
        let user = await AsyncStorage.getItem('LoggedUser');
        let parsedUser = JSON.parse(user);
        const roomList = getRoomList();
        var newArray = roomList.filter(item => {
            const itemData = `${item.name.toLowerCase()}${item.name.toLowerCase()} ${item.name.toLowerCase()}`;
            const textData = text.toLowerCase();
            return itemData.indexOf(textData) > -1;
        });
        setDataProvider(dataProvider.cloneWithRows(newArray));
        if (text.length > 2) {
            setLoadingUsers(true);
            const uri = encodeURI(
                `${socketPort}chat//userList?name=${text}&comId=${myData.companyId}&userIds=${myData.userId}`
            );
            RNFetchBlob.config({
                trusty: true,
                // timeout: 8000,
            })
                .fetch('GET', uri, {
                    'x-access-token': parsedUser.accessToken,
                })
                .then(response => {
                    if (response.respInfo.status === 200) {
                        return response.json();
                    }
                    return null;
                })
                .then(async responseJson => {
                    const ComparedArray = responseJson.datas.sort((a, b) =>
                        a.com_name.localeCompare(b.com_name)
                    );
                    const SortedArray = sortArray(ComparedArray, newArray);
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setDataProvider(dataProvider.cloneWithRows(SortedArray));
                    setLoadingUsers(false);
                });
        }
    };

    const rowRenderer = (type, data, index) => {
        return (
            <UserItems
                accessToken={accessToken}
                index={index}
                item={data}
                navigation={props.navigation}
            />
        );
    };
    const renderFooter = () => {
        return loadingUsers ? (
            <ActivityIndicator style={{ alignSelf: 'center' }} size="large" color="black" />
        ) : null;
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', marginTop: 10 }}>
            <View style={styles.searchInput}>
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={{ width: 50, height: 35, justifyContent: 'center' }}>
                    <SvgXml
                        width="25"
                        height="20"
                        style={{ alignSelf: 'center' }}
                        xml={back_icon('gray')}
                    />
                </TouchableOpacity>
                <TextInput
                    placeholder={'Хайлт хийх'}
                    placeholderTextColor={'gray'}
                    style={styles.searchInputText}
                    value={search}
                    onChangeText={text => searchRoom(text)}
                />
                <FontAwesome style={{ alignSelf: 'center' }} name="search" size={20} color="gray" />
            </View>
            <RecyclerListView
                style={{ flex: 1, marginTop: 10 }}
                contentContainerStyle={{ paddingBottom: 50 }}
                dataProvider={dataProvider}
                layoutProvider={layoutProvider}
                rowRenderer={rowRenderer}
                renderFooter={renderFooter}
            />
        </SafeAreaView>
    );
};

export default RecyclerView;
