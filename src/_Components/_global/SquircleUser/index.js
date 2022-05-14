import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { isImageAcceptable } from 'root/GlobalFunctions';
import { SvgXml } from 'react-native-svg';
import {
    squirlce,
    squirlce_border,
    deafult_user,
} from '../../../utils/files/SvgFiles/more_detail_icons';
import MaskedView from '@react-native-community/masked-view';

var styles = require('./Styles');
export const RoomIcon = ({ path, height = 20, width = 20, style = {}, showImage = true }) => {
    const containerStyle = [{ width: width, height: height, alignSelf: 'center' }, style];
    const center = { position: 'absolute' };
    return (
        <View style={containerStyle}>
            <MaskedView
                maskElement={
                    <SvgXml
                        fill={'#ffffff'}
                        width={width}
                        height={height}
                        rx={20}
                        xml={squirlce('white')}
                    />
                }>
                {showImage && (
                    <>
                        <SvgXml
                            width={width}
                            height={height}
                            style={center}
                            rx={20}
                            xml={deafult_user()}
                        />
                        <FastImage
                            style={[styles.userIcon, { width: width, height: height }]}
                            source={{ uri: isImageAcceptable(path) }}
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                        <SvgXml
                            width={width}
                            height={height}
                            style={center}
                            rx={20}
                            xml={squirlce_border('rgba(0,0,0,0.2)')}
                        />
                    </>
                )}
                {!showImage && (
                    <View
                        style={[
                            styles.userIcon,
                            { width: width, height: height, backgroundColor: 'white' },
                        ]}
                    />
                )}
            </MaskedView>
        </View>
    );
};
export default RoomIcon;
