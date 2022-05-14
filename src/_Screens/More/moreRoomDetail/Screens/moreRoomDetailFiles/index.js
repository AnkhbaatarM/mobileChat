/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectData, setRoomFiles, setRoomImages } from '../../../../../../reduxStore/reducer';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import FileRenderer from '../../../../../_Components/_more/moreDetailFileItem';
import { socketPort } from '../../../../../Socket/Socket_i';
import { selectedRoom } from '../../../../../Socket/Socket_Var';
import { requesFetchNew } from '../../../../../../Gloabal/GlobalFunctions';
import { width100, width85 } from '../../../../../utils/dimensions/width';
import MoreInfoHeader from '../../../../../_Headers/MoreInfoHeader';
var styles = require('./Styles');
const RoomFiles = ({ navigation }) => {
    const myData = useSelector(state => selectData(state, 'myData'));
    const roomUsers = useSelector(state => selectData(state, 'roomUsers'));
    const roomFiles = useSelector(state => selectData(state, 'roomFiles'));

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
                    dim.width = width100;
                    dim.height = width85 / 3 + 10;
                    break;
                default:
                    dim.width = 0;
                    dim.heigh = 0;
            }
        }
    );
    useEffect(() => {
        setDataProvider(dataProvider.cloneWithRows(roomUsers));
        getRoomAllImages();
    }, []);

    const getRoomAllImages = () => {
        setLoadingFiles(true);
        let url = `${socketPort}api/rooms/${selectedRoom._id}/files?type=${1}`;
        if (roomFiles.length > 0) {
            const fileId = roomFiles[roomFiles.length - 1].files._id;
            url += `&fileId=${fileId}`;
        }
        requesFetchNew(url, 'GET', myData.accessToken).then(responseJson => {
            if (responseJson !== null) {
                setLoadingFiles(false);
                const files = responseJson.data.datas;
                requestAnimationFrame(() => {
                    dispatch(setRoomFiles(files));
                });
            } else {
                setLoadingFiles(false);
            }
        });
    };
    const rowRender = (type, data, index) => {
        return (
            <FileRenderer
                index={index}
                item={data}
                navigation={navigation}
                accessToken={myData.accessToken}
            />
        );
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <MoreInfoHeader title={'Файлууд'} navigation={navigation} />
            {roomFiles.length > 0 && (
                <RecyclerListView
                    style={styles.listStyle}
                    contentContainerStyle={styles.listContainerStyle}
                    dataProvider={dataProvider.cloneWithRows(roomFiles)}
                    layoutProvider={LayoutUtil}
                    rowRenderer={rowRender}
                />
            )}
        </SafeAreaView>
    );
};

export default RoomFiles;
