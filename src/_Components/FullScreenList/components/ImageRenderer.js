import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, Animated, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFoundation from 'react-native-vector-icons/Foundation';
import { DownloadFile } from 'root/GlobalFunctions';
import { useSelector } from 'react-redux';
import { selectData } from '../../../../reduxStore/reducer';
const center = { alignSelf: 'center' };
const styles = require('./Styles');
export const ImageRenderer = ({ item, startScroll = () => {}, navigation }) => {
    const myData = useSelector(state => selectData(state, 'myData'));

    const logOutZoomState = (event, gestureState, zoomableViewEventObject) => {
        if (zoomableViewEventObject.zoomLevel > 1) {
            startScroll(false);
        } else {
            startScroll(true);
        }
    };
    const fadeAnim = useRef(new Animated.Value(1)).current;

    return (
        <>
            <ReactNativeZoomableView
                maxZoom={1.5}
                minZoom={1}
                zoomStep={0.5}
                initialZoom={1}
                bindToBorders={true}
                onZoomAfter={logOutZoomState}
                onDoubleTapAfter={logOutZoomState}
                contentStyle={{ padding: 0, borderWidth: 1 }}>
                <View style={styles.safeAreaView}>
                    <FastImage
                        source={{
                            uri: `${item.path}&accessToken=${myData.accessToken}`,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.imageStyle}
                        onLoadStart={() =>
                            Animated.timing(fadeAnim, {
                                toValue: 1,
                                duration: 0,
                                useNativeDriver: true,
                            }).start()
                        }
                        onLoadEnd={() =>
                            Animated.timing(fadeAnim, {
                                toValue: 0,
                                duration: 0,
                                useNativeDriver: true,
                            }).start()
                        }
                    />
                </View>
                <Animated.View
                    style={[
                        styles.loaderView,
                        {
                            opacity: fadeAnim,
                        },
                    ]}>
                    <ActivityIndicator style={center} size={'large'} color={'white'} />
                </Animated.View>
            </ReactNativeZoomableView>
            <View onPress={() => navigation.goBack()} style={styles.moreContainer}>
                <TouchableOpacity
                    style={styles.button}
                    // onPress={() => scrollView.scrollToIndex(state.more.pictureIndex)}
                >
                    <IconFeather
                        style={styles.iconStyle}
                        name="more-horizontal"
                        size={30}
                        color="white"
                    />
                    <Text style={styles.moreText}>{'Дэлгэрэнгүй'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        DownloadFile(`${item.path}&accessToken=${myData.accessToken}`, item.name)
                    }>
                    <IconFoundation
                        style={styles.iconStyle}
                        name="download"
                        size={30}
                        color="white"
                    />
                    <Text style={styles.moreText}>{'Татаж авах'}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};
