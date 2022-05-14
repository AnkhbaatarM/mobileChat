import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { selectData} from '../../../../reduxStore/reducer';
import { useSelector, useDispatch } from 'react-redux';
import { pictureIndex, selectedRoom,setPictureIndex } from '../../../Socket/Socket_Var';
import { isImageAcceptable } from '../../../../Gloabal/GlobalFunctions';

var styles = require('./Styles');
const ImageRenderer = ({ 
    index,
    item, 
    navigation 
}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const myData = useSelector(state => selectData(state, 'myData'));
    const roomImages = useSelector(state => selectData(state, 'roomImages'));
    let path = isImageAcceptable(item.files.path);
    path = path !== '' ? path + `&accessToken=${myData.accessToken}` : ''
    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    const pictureIndex = roomImages.findIndex(obj => obj.files.path === item.files.path);
                    console.log('pic',pictureIndex)
                    setPictureIndex(pictureIndex);
                    navigation.navigate('FullScreen', {
                        room_id: selectedRoom._id,
                    });
                }}
                style={styles.pictureContainer}>
                <FastImage
                    onLoadEnd={() => setLoading(false)}
                    source={{ uri: path }}
                    style={styles.pictureStyle}
                />
                {loading && (
                    <ActivityIndicator color={'black'} size={'large'} style={styles.loaderStyle} />
                )}

                <View style={styles.pictureStyleOverlay} />
            </TouchableOpacity>
        </>
    );
};
export default ImageRenderer;
