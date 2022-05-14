import React from 'react';
import { Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import ImageZoom from 'react-native-image-pan-zoom';

var styles = require('./Styles');
export const ImageRenderer = props => {
    const item = props.item.files;
    return (
        <>
            <ReactNativeZoomableView
                maxZoom={1.5}
                minZoom={1}
                zoomStep={0.5}
                initialZoom={1}
                bindToBorders={true}
                contentStyle={{ padding: 0, borderWidth: 1 }}>
                <FastImage
                    source={{
                        uri:
                            item.path.replace('192.168.10.100', '192.168.10.30') +
                            '?accessToken=' +
                            props.accessToken,
                    }}
                    onPress={() => updateItem()}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.safeAreaView}
                />
            </ReactNativeZoomableView>
        </>
    );
};
