import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { isImageAcceptable } from 'root/GlobalFunctions';
import { SvgXml } from 'react-native-svg';
import { squircleBgCut, squirlce_with_cut_border } from 'utils_svg/more_detail_icons';

var styles = require('./Styles');
export const RoomIcon = ({ item, height = 30, width = 30, showOnline = true }) => {
    return (
        <View style={{ width: width, height: height, marginRight: 10, alignSelf: 'center' }}>
            {/* <MaskedView
        maskElement={
          <SvgXml
            fill={'#ffffff'}
            width={width}
            height={height}
            rx={20}
            xml={squirlce_with_cut()} />
        }> */}
            <FastImage
                style={[styles.userIcon, { width: width, height: height }]}
                source={{ uri: isImageAcceptable(item.user_icon) }}
                resizeMode={FastImage.resizeMode.stretch}
            />
            <SvgXml
                width={width}
                height={height}
                style={{ position: 'absolute' }}
                rx={20}
                xml={squircleBgCut()}
            />
            <SvgXml
                width={width}
                height={height}
                style={{ position: 'absolute' }}
                rx={20}
                xml={squirlce_with_cut_border('rgba(0,0,0,0.2)')}
            />
            {/* </MaskedView> */}
            {showOnline && (
                <View
                    style={[
                        styles.activeView,
                        { height: height / 4, width: width / 4, borderRadius: width / 4 / 2 },
                    ]}
                />
            )}
        </View>
    );
};
export default RoomIcon;
