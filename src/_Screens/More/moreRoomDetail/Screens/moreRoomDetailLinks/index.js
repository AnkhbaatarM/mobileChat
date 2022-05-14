/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectData, setRoomLinks } from '../../../../../../reduxStore/reducer';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import LinkRender from '../../../../../_Components/_more/moreDetailLinkItem';
import { socketPort } from '../../../../../Socket/Socket_i';
import { selectedRoom } from '../../../../../Socket/Socket_Var';
import { requesFetchNew } from '../../../../../../Gloabal/GlobalFunctions';
import { width85 } from '../../../../../utils/dimensions/width';
import MoreInfoHeader from '../../../../../_Headers/MoreInfoHeader';
var styles = require('./Styles');
const RoomLinks = ({ navigation }) => {
    // const state = useSelector(selectData);
    const roomImages = useSelector(state => selectData(state, 'roomImages'));
    const myData = useSelector(state => selectData(state, 'myData'));

    const dispatch = useDispatch();
    const [dataProvider, setDataProvider] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    );
    const [loadingFiles, setLoadingFiles] = useState(false);
    const LayoutUtil = new LayoutProvider(
        () => {
            return 'VSEL';
        },
        (type, dim) => {
            switch (type) {
                case 'VSEL':
                    dim.width = width85;
                    dim.height = width85 / 2.6;
                    break;
                default:
                    dim.width = 0;
                    dim.heigh = 0;
            }
        }
    );
    useEffect(() => {
        setDataProvider(dataProvider.cloneWithRows([]));
        getRoomAllLinks();
    }, []);

    const getRoomAllLinks = () => {
        setLoadingFiles(true);
        let url = `${socketPort}api/rooms/${selectedRoom._id}/files?type=${8}`;
        if (roomImages.length > 0) {
            const fileId = roomImages[roomImages.length - 1].files._id;
            url += `&fileId=${fileId}`;
        }
        requesFetchNew(url, 'GET', myData.accessToken).then(responseJson => {
            if (responseJson !== null && responseJson.data.datas) {
                setLoadingFiles(false);
                const roomLinks = responseJson.data.datas;
                dispatch(setRoomLinks(roomLinks));
                setDataProvider(dataProvider.cloneWithRows(roomLinks));
            } else {
                setLoadingFiles(false);
            }
        });
    };
    const rowRendererImage = (type, data, index) => {
        return <LinkRender index={index} item={data} navigation={navigation} />;
    };
    return (
        <SafeAreaView style={styles.container}>
            <MoreInfoHeader title={'Линкүүд'} navigation={navigation} />
            {loadingFiles && (
                <ActivityIndicator color={'#558ce6'} size={'large'} style={styles.loadingStyle} />
            )}
            {dataProvider._data.length > 0 && (
                <RecyclerListView
                    style={styles.listStyle}
                    // contentContainerStyle={styles.listContainerStyle}
                    dataProvider={dataProvider}
                    layoutProvider={LayoutUtil}
                    rowRenderer={rowRendererImage}
                />
            )}
        </SafeAreaView>
    );
};

export default RoomLinks;
