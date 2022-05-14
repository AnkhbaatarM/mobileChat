/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import styles from './Styles';
import SearchBar from '../../../_global/HideableSearchInput/index';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import UserItems from '../../../_home/homeRoomCreateUserItem';
import { LayoutUtil } from '../../../_home/homeRoomSearchContainer/LayoutUtil';
import { useSelector } from 'react-redux';
import { selectData } from '../../../../../reduxStore/reducer';
import UserIcon from '../../../_global/roomIcon';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { SvgXml } from 'react-native-svg';
import { squircle_fill } from '../../../../utils/files/SvgFiles/moreHeaderIcon';
let userListVar = [];
const UserSearch = ({ searchByUser = () => {}, hideModal = () => {}, showList = false }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const roomUsers = useSelector(state => selectData(state, 'roomUsers'));
    const [dataProvider, setDataProvider] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    );
    const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(2));
    const flatlist = useRef(null);

    let chekedUsers = '';

    useEffect(() => {
        userListVar = [...roomUsers];
        setDataProvider(dataProvider.cloneWithRows([...userListVar]));
    }, []);
    const renderItem = (_type, data, index) => {
        return <UserItems index={index} item={data} selectUser={selectUser} />;
    };
    const selectUser = index => {
        const user = userListVar[index];
        const itemIndex = selectedUsers.findIndex(obj => obj.user.id === user.id);
        if (itemIndex !== -1) {
            userListVar[index] = {
                ...userListVar[index],
                ...{ isSelected: false },
            };
            selectedUsers.splice(itemIndex, 1);
        } else {
            userListVar[index] = {
                ...userListVar[index],
                ...{ isSelected: true },
            };
            selectedUsers.push({ user: user });
        }
        setDataProvider(dataProvider.cloneWithRows([...userListVar]));
    };
    const removeUserFromList = (item, index) => {
        const userIndex = dataProvider._data.findIndex(obj => obj.id === item.user.id);
        chekedUsers.replace(item.user.id, '').replace(',,', ',');
        selectedUsers.splice(index, 1);
        if (userIndex !== -1) {
            dataProvider._data[userIndex].isSelected = false;
            setDataProvider(dataProvider.cloneWithRows([...dataProvider._data]));
        }
        setSelectedUsers([...selectedUsers]);
    };
    const rowRenderer = ({ item, index }) => {
        return (
            <TouchableHighlight
                underlayColor={'white'}
                onPress={() => removeUserFromList(item, index)}
                style={styles.selectedUserSubContainer}>
                <>
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
                </>
            </TouchableHighlight>
        );
    };
    return (
        <View style={styles.MainContainer}>
            <SearchBar style={styles.searchContainer} hideSearchBar={() => hideModal()} />
            {selectedUsers.length > 0 && (
                <View style={styles.selectedMainCont}>
                    <View style={styles.selectedLine} />
                    <ScrollView
                        horizontal={true}
                        style={styles.selectedScroll}
                        ref={flatlist}
                        onContentSizeChange={() => {
                            flatlist.current.scrollToEnd();
                        }}
                        contentContainerStyle={styles.selectedScrollContent}>
                        {selectedUsers.map((user, index) => rowRenderer({ item: user, index }))}
                    </ScrollView>
                    <View style={styles.selectedCont}>
                        <SvgXml
                            width={35}
                            height={35}
                            style={styles.selectedSquircle}
                            xml={squircle_fill('#3578de')}
                        />
                        <Text style={styles.selectedCnt}>{selectedUsers.length}</Text>
                    </View>
                </View>
            )}
            {showList && dataProvider._data.length > 0 && (
                <RecyclerListView
                    style={styles.flexStyle}
                    contentContainerStyle={styles.listContainerStyle}
                    dataProvider={dataProvider}
                    layoutProvider={layoutProvider}
                    rowRenderer={renderItem}
                    // onEndReached={handleListEnd}
                    onEndReachedThreshold={10}
                    extendedState={dataProvider._data}
                />
            )}
            {selectedUsers.length > 0 && (
                <TouchableOpacity
                    onPress={() => searchByUser(selectedUsers)}
                    style={styles.roomCreateButton}>
                    <Text style={styles.buttonText}>{'Хайх'}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default UserSearch;
