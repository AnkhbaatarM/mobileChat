/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectData, setRoomImages } from '../../../../../../reduxStore/reducer';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import ImageRenderer from '../../../../../_Components/_more/moreDetailImageItem';
import { socketPort } from '../../../../../Socket/Socket_i';
import { selectedRoom } from '../../../../../Socket/Socket_Var';
import { requesFetchNew } from '../../../../../../Gloabal/GlobalFunctions';
import { width85 } from '../../../../../utils/dimensions/width';
import MoreInfoHeader from '../../../../../_Headers/MoreInfoHeader';
import moment from 'moment';
var styles = require('./Styles');
const RoomImages = ({ navigation }) => {
    const dispatch = useDispatch()
    const myData = useSelector(state => selectData(state, 'myData'));
    const roomImages = useSelector(state => selectData(state, 'roomImages'));

    const [dataProvider, setDataProvider] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    );
    const [loadingFiles, setLoadingFiles] = useState(false);
    const [moreLoading, setMoreLoading] = useState(false);
    const LayoutUtil = new LayoutProvider(
        () => {
            return 'VSEL';
        },
        (type, dim) => {
            switch (type) {
                case 'VSEL':
                    dim.width = width85 / 3;
                    dim.height = width85 / 3;
                    break;
                default:
                    dim.width = 0;
                    dim.heigh = 0;
            }
        }
    );
    useEffect(() => {
        getRoomAllImages();
    }, []);

    const getRoomAllImages = () => {
        setLoadingFiles(false);
        let url = `${socketPort}api/rooms/${selectedRoom._id}/files?type=${1}`;
        // if (roomImages.length > 0) {
        //     const fileId = roomImages[roomImages.length - 1].files._id;
        //     url += `&fileId=${fileId}`;
        // }
        requesFetchNew(url, 'GET', myData.accessToken).then(responseJson => {
            if (responseJson !== null) {
                setLoadingFiles(false);
                const images = responseJson.data.datas;
                setDataProvider(dataProvider.cloneWithRows(images));
            } else {
                setLoadingFiles(false);
            }
        });
    };
    const LoadNext = () => {
        setMoreLoading(true);
        let lastImgDate = dataProvider._data[dataProvider._data.length - 1].files.createdAt;
        lastImgDate = Date.parse(lastImgDate);
        let url = `${socketPort}api/rooms/${
            selectedRoom._id
        }/files?type=${1}&moreDate=${lastImgDate}`;
        requesFetchNew(url, 'GET', myData.accessToken).then(responseJson => {
            if (responseJson !== null) {
                setLoadingFiles(false);
                const roomImagesNext = responseJson.data.datas;
                dispatch(setRoomImages([...dataProvider._data, ...roomImagesNext]))
                setDataProvider(
                    dataProvider.cloneWithRows([...dataProvider._data, ...roomImagesNext])
                );
            } else {
                setLoadingFiles(false);
            }
        });
    };
    const rowRendererImage = (type, data, index) => {
        return <ImageRenderer index={index} item={data} navigation={navigation} />;
    };
    return (
        <SafeAreaView style={styles.container}>
            <MoreInfoHeader title={'Зургууд'} navigation={navigation} />
            {loadingFiles ? (
                <ActivityIndicator color={'gray'} style={styles.center} size={'large'} />
            ) : (
                dataProvider._data.length > 0 && (
                    <RecyclerListView
                        style={styles.listStyle}
                        contentContainerStyle={styles.listContainerStyle}
                        dataProvider={dataProvider}
                        layoutProvider={LayoutUtil}
                        rowRenderer={rowRendererImage}
                        onEndReached={LoadNext}
                    />
                )
            )}
            {loadingFiles && (
                <ActivityIndicator color={'gray'} style={styles.center} size={'large'} />
            )}
        </SafeAreaView>
    );
};

export default RoomImages;
