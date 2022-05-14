/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
    View,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    FlatList,
    Text,
} from 'react-native';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import { LayoutUtil } from './LayoutUtil';
import UserItems from '../homeRoomCreateUserItem';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { requesFetchNew } from '../../../../Gloabal/GlobalFunctions';
import { socketPort } from '../../../Socket/Socket_i';
import { back_icon } from 'utils_svg/moreHeaderIcon';
import { SvgXml } from 'react-native-svg';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import UserIcon from '../../_global/roomIcon';
import { selectData, setRoomCreateUsers } from '../../../../reduxStore/reducer';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Styles';
let userListVar = [];
const flexStart = { alignSelf: 'flex-start' };
const center = { alignSelf: 'center', height: 40 };
IconEntypo.loadFont();
let selectedList = [];
const RecyclerView = ({
    navigation,
    searchUserRoom = () => {},
    addNewUsersToRoom = () => {},
    type,
}) => {
    const myData = useSelector(state => selectData(state, 'myData'));
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [hasNext, setHasNext] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(2));
    const [dataProvider, setDataProvider] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    );
    useEffect(() => {
        setSelectedUsers([]);
        setDataProvider(dataProvider.cloneWithRows([]));
        searchUser(false);
    }, []);

    useEffect(() => {
        if (search !== '') {
            const timeOutId = setTimeout(() => searchUser(false), 500);
            return () => {
                console.log('No longer latest query') || clearTimeout(timeOutId);
            };
        }
    }, [search]);

    const searchUser = loadMore => {
        setHasNext(true);
        let url = `${socketPort}api/users/all?userName=${search}&limit=${20}&comId=${
            myData.companyId
        }&userIds=${myData.userId}`;
        if (loadMore) {
            setLoadingMore(true);
            url += `&page=${page}`;
        } else {
            setLoadingUsers(true);
        }
        requesFetchNew(url, 'GET', myData.accessToken).then(responseJson => {
            if (responseJson !== null) {
                let userList = responseJson.data.datas.sort((a, b) =>
                    a.company_name.localeCompare(b.company_name)
                );
                setHasNext(responseJson.data.hasNext);
                setPage(page + 1);
                if (loadMore) {
                    console.log('userList', userList);
                    userList = [...dataProvider._data, ...userList];
                    setLoadingMore(false);
                    userListVar = userList;
                    setDataProvider(dataProvider.cloneWithRows(userList));
                } else {
                    // const SortedArray = sortArray(userList);
                    // SortedArray.map(item => (item.isSelected = false));
                    userListVar = userList;
                    setDataProvider(dataProvider.cloneWithRows(userList));
                }
                setLoadingUsers(false);
            }
        });
    };

    const sortArray = newArray => {
        const com_names = [];
        newArray.map(item => {
            if (com_names.findIndex(obj => obj.com_id === item.com_id) === -1) {
                com_names.push({ company_name: item.company_name, com_id: item.com_id });
            }
        });
        const SortedArray = [];
        com_names.map(company => {
            SortedArray.push({ title: company.company_name, com_id: company.com_id });
            newArray.map(obj => {
                if (obj.com_id === company.com_id) {
                    SortedArray.push(obj);
                }
            });
        });
        return SortedArray;
    };

    const handleListEnd = () => {
        if (hasNext) {
            searchUser(true);
        }
    };
    const selectUser = index => {
        const user = userListVar[index];
        const itemIndex = selectedUsers.findIndex(obj => obj.user.id === user.id);
        if (itemIndex !== -1) {
            userListVar[index].isSelected = false;
            selectedUsers.splice(itemIndex, 1);
        } else {
            userListVar[index].isSelected = true;
            selectedUsers.push({ user: user });
        }
        setDataProvider(dataProvider.cloneWithRows([...userListVar]));
    };

    const setSelectAll = (com_id, index) => {
        let item = dataProvider._data[index];
        const isSelected = !item.isSelected;
        dataProvider._data[index].isSelected = isSelected;
        dataProvider._data.map((user, userInd, userArray) => {
            if (user.com_id === com_id) {
                dataProvider._data[userInd].isSelected = isSelected;
                if (userArray[index].isSelected) {
                    selectedUsers.push({ user: user });
                } else {
                    selectedUsers.map((val, ind, array) => array.splice(ind, 1));
                }
            }
        });
        setDataProvider(dataProvider.cloneWithRows([...dataProvider._data]));
    };

    const renderItem = (_type, data, index) => {
        return (
            <UserItems
                index={index}
                item={data}
                setSelectAll={setSelectAll}
                selectUser={selectUser}
            />
        );
    };
    const removeUserFromList = (item, index) => {
        const userIndex = dataProvider._data.findIndex(obj => obj.id === item.user.id);
        console.log('userIndex', item, userIndex);
        selectedUsers.splice(index, 1);
        if (userIndex !== -1) {
            dataProvider._data[userIndex].isSelected = false;
            setDataProvider(dataProvider.cloneWithRows([...dataProvider._data]));
        }
        setSelectedUsers([...selectedUsers]);
    };
    const rowRenderer = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => removeUserFromList(item, index)}
                style={styles.selectedUserSubContainer}>
                <UserIcon
                    showOnline={false}
                    roomIcon={item.user.user_icon}
                    width={40}
                    height={40}
                />

                <View style={styles.removeIconHolder}>
                    <IconFontAwesome
                        style={styles.deleteIcon}
                        size={15}
                        name="remove"
                        color={'#3b4252'}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    const roomCreateOrSearch = () => {
        dispatch(setRoomCreateUsers(selectedUsers));
        if (type === 'userAdd') {
            addNewUsersToRoom(selectedUsers);
        } else {
            if (selectedUsers.length > 1) {
                navigation.navigate('RoomCreate');
            } else {
                searchUserRoom(selectedUsers[0].user);
            }
        }
    };
    return (
        <SafeAreaView style={styles.rootContainer}>
            <View style={styles.searchInputContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backContainer}>
                    <SvgXml width="25" height="20" style={flexStart} xml={back_icon('gray')} />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput}
                    placeholder={'Хайх'}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={'black'}
                    returnKeyType={'done'}
                    value={search}
                    autoFocus={false}
                    onChangeText={text => setSearch(text)}
                />
                <TouchableOpacity style={styles.searchIcon}>
                    <IconFontAwesome style={flexStart} name="search" size={20} color="gray" />
                </TouchableOpacity>
            </View>
            {dataProvider._data.length > 0 && (
                <RecyclerListView
                    style={styles.flexStyle}
                    contentContainerStyle={styles.listContainerStyle}
                    dataProvider={dataProvider}
                    layoutProvider={layoutProvider}
                    rowRenderer={renderItem}
                    onEndReached={handleListEnd}
                    onEndReachedThreshold={10}
                    extendedState={dataProvider._data}
                />
            )}
            {loadingMore && <ActivityIndicator style={center} size="large" color="black" />}
            {loadingUsers && (
                <ActivityIndicator style={styles.flexStyle} size="large" color="black" />
            )}
            {selectedUsers.length > 0 && (
                <KeyboardAvoidingView
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 10}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardAvoidContainer}>
                    <FlatList
                        style={styles.selectedListStyle}
                        data={selectedUsers}
                        renderItem={rowRenderer}
                        keyExtractor={item => item.user.id}
                        horizontal={true}
                    />
                    {type === 'userAdd' && selectedUsers.length > 0 && (
                        <TouchableOpacity
                            onPress={roomCreateOrSearch}
                            style={styles.selectedUserContainer}>
                            <Text style={styles.buttonText}>{'Үргэлжлүүлэх'}</Text>
                            <IconFeather
                                style={styles.buttonIcon}
                                name="arrow-right"
                                size={20}
                                color="white"
                            />
                        </TouchableOpacity>
                    )}
                    {type !== 'userAdd' && selectedUsers.length > 1 && (
                        <TouchableOpacity
                            onPress={roomCreateOrSearch}
                            style={styles.selectedUserContainer}>
                            <Text style={styles.buttonText}>{'Үргэлжлүүлэх'}</Text>
                            <IconFeather
                                style={styles.buttonIcon}
                                name="arrow-right"
                                size={20}
                                color="white"
                            />
                        </TouchableOpacity>
                    )}
                </KeyboardAvoidingView>
            )}
        </SafeAreaView>
    );
};

export default RecyclerView;
