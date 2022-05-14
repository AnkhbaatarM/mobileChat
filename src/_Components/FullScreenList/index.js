import React, { useState } from 'react';
import { TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import { LayoutUtil } from './utils/LayoutUtil';
import { ImageRenderer } from './components/ImageRenderer';
import IconFeather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { selectData } from '../../../reduxStore/reducer';
import { pictureIndex, selectedRoom } from '../../Socket/Socket_Var';
const styles = require('./Styles');
const center = { alignSelf: 'center' };
const RecyclerView = ({ navigation }) => {
    const myData = useSelector(state => selectData(state, 'myData'));
    const roomImages = useSelector(state => selectData(state, 'roomImages'));

    const [dataProvider] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    );
    const [layoutProvider] = useState(LayoutUtil.getLayoutProvider());
    const [scroll, setScroll] = useState(true);
    let scrollView = null;
    const rowRenderer = (type, data, index) => {
        return (
            <ImageRenderer
                accessToken={myData.accessToken}
                scrollView={scrollView}
                index={index}
                item={data.files}
                stopScroll={stopScroll}
                startScroll={startScroll}
                navigation={navigation}
            />
        );
    };

    const stopScroll = update => {
        setScroll(update);
    };
    const startScroll = update => {
        setScroll(update);
    };
    // console.log('roomImages',roomImages)
    return (
        <SafeAreaView style={styles.contentContainerStyle}>
            {roomImages.length > 0 && (
                <RecyclerListView
                    style={styles.containerStyle}
                    dataProvider={dataProvider.cloneWithRows(roomImages)}
                    layoutProvider={layoutProvider}
                    rowRenderer={rowRenderer}
                    scrollEnabled={scroll}
                    ref={ref => {
                        scrollView = ref;
                    }}
                    pagingEnabled={true}
                    isHorizontal={true}
                    initialRenderIndex={pictureIndex}
                />
            )}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.searchInput}>
                <IconFeather style={center} name="chevron-left" size={30} color="white" />
                <Text style={styles.searchInputText}>{selectedRoom.name}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default RecyclerView;
