import React, { useState, useEffect } from 'react';
import { RefreshControl, SafeAreaView, Animated } from 'react-native';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import { LayoutUtil } from './LayoutUtil';
import { UserListItem } from '../homeUserListItem/Index';
import { requesFetchNew } from '../../../../Gloabal/GlobalFunctions';
import { socketPort } from '../../../Socket/Socket_i';
import SearchBar from '../../_global/HideableSearchInput/index';
import { useSelector, useDispatch } from 'react-redux';
import { setOnlineUserList, selectData } from '../../../../reduxStore/reducer';
import { updateOnlineUsers, getOnlineUsers } from '../../../Socket/Socket_Var';

import styles from './Styles';
let page = 1;
let hasNext = true;
const RecyclerView = ({ searchUserRoom = () => {}, navigation }) => {
    const dispatch = useDispatch();
    const myData = useSelector(state => selectData(state, 'myData'));
    const onlineUserList = useSelector(state => selectData(state, 'onlineUserList'));
    // console.log('onLineUsers',onlineUserList)
    const [refreshing, setRefreshing] = useState(false);
    const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(2));
    const [dataProvider, setDataProvider] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    );
    const [scrollYValue] = useState(new Animated.Value(0));
    const clampedScroll = Animated.diffClamp(
        Animated.add(
            scrollYValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
                useNativeDriver: true,
            }),
            new Animated.Value(0)
        ),
        0,
        50
    );

    const rowRenderer = (type, data, index) => {
        return (
            <>
            {data.system_name&&<UserListItem
                index={index}
                item={data}
                navigation={navigation}
                searchUserRoom={searchUserRoom}
            />}
            </>
        );
    };

    const fetchOnlineUsers = loadMore => {
        let url = `${socketPort}api/users/online?comId=${myData.companyId}`;
        if (loadMore) {
            page += 1;
            url += `&page=${page}&limit=20`;
        } else {
            page = 0;
            hasNext = true;
        }
        setRefreshing(true);
        requesFetchNew(url, 'GET', myData.accessToken, null).then(responseJson => {
            setRefreshing(false);
            if (responseJson !== null) {
                let respArray = responseJson.data.datas;
                hasNext = responseJson.data.hasNext;
                const index = respArray.findIndex(obj => obj.id === myData.userId);
                if (index !== -1) {
                    respArray.splice(index, 1);
                }
                if (loadMore) {
                    respArray = [...getOnlineUsers(), ...respArray];
                }
                updateOnlineUsers(respArray);
                dispatch(setOnlineUserList(respArray));
            }
        });
    };
    const searchUser = text => {
        const newArray = getOnlineUsers().filter(item => {
            const itemData = `${item.system_name.toLowerCase()}${item.system_name.toLowerCase()} ${item.system_name.toLowerCase()}`;
            const textData = text.toLowerCase();
            return itemData.indexOf(textData) > -1;
        });
        setDataProvider(dataProvider.cloneWithRows(newArray));
    };

    useEffect(() => {
        setDataProvider(dataProvider.cloneWithRows(getOnlineUsers()));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onlineUserList]);

    return (
        <SafeAreaView style={styles.containerStyle}>
            <RecyclerListView
                style={styles.listStyle}
                contentContainerStyle={styles.listContainerStyle}
                dataProvider={dataProvider}
                layoutProvider={layoutProvider}
                rowRenderer={rowRenderer}
                onEndReached={() => (hasNext ? fetchOnlineUsers(true) : null)}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
                    {
                        useNativeDriver: false,
                    }
                )}
                scrollViewProps={{
                    refreshControl: (
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => {
                                fetchOnlineUsers(false);
                            }}
                        />
                    ),
                }}
            />
            <SearchBar
                clampedScroll={clampedScroll}
                search={searchUser}
                hideSearchBar={() => searchUser('')}
            />
        </SafeAreaView>
    );
};

export default RecyclerView;
