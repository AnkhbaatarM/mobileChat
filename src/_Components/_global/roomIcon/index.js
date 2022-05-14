import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SvgXml } from 'react-native-svg';
import {
    default_user_female,
    default_user_male,
    default_male_old,
    default_female_old,
    room_icon,
    squirlce_border,
    squircleBgCut,
    squircleBG,
    squirlce_with_cut_border,
} from '../../../utils/files/SvgFiles/more_detail_icons';
import { isImageAcceptableWeb } from '../../../../Gloabal/GlobalFunctions';

var styles = require('./Styles');

export const RoomIcon = ({
    height,
    width,
    roomIcon = '',
    localImage = null,
    isGroup = false,
    isOnline = false,
    style,
    center,
    age = 20,
    gender = 0,
    backgroundColor = 'white',
}) => {
    const containerStyle = [
        {
            width: width,
            height: height,
            marginRight: center ? 0 : 10,
            alignSelf: 'center',
            backgroundColor: 'white',
            justifyContent: 'center',
        },
        style,
    ];
    const absolute = {
        position: 'absolute',
        overflow: 'visible',
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        borderColor: 'white',
    };
    const setDefaultIcon = () => {
        if (gender === 0) {
            if (age > 30) {
                return default_female_old();
            } else {
                return default_user_female();
            }
        } else {
            if (age < 30) {
                return default_user_male();
            } else {
                return default_male_old();
            }
        }
    };

    return (
        <View style={containerStyle}>
            <SvgXml
                fill={'#ffffff'}
                style={absolute}
                width={width}
                height={height}
                rx={20}
                xml={isGroup ? room_icon() : setDefaultIcon()}
            />
            {(roomIcon !== undefined && roomIcon !== '') || localImage !== null ? (
                <FastImage
                    style={styles.userIcon}
                    source={{
                        uri: localImage ? localImage : isImageAcceptableWeb(roomIcon),
                        priority: FastImage.priority.low,
                        resizeMode: FastImage.resizeMode.stretch,
                    }}
                />
            ) : (
                <SvgXml
                    fill={'#ffffff'}
                    style={styles.userIcon}
                    width={width}
                    height={height}
                    rx={20}
                    xml={isGroup ? room_icon() : setDefaultIcon()}
                />
            )}
            {/* <View style={absolute} /> */}
            <SvgXml
                width={'100%'}
                height={'100%'}
                style={absolute}
                rx={20}
                xml={isOnline ? squircleBgCut(backgroundColor) : squircleBG(backgroundColor)}
            />
            <SvgXml
                width={'100%'}
                height={'100%'}
                style={absolute}
                rx={20}
                xml={
                    isOnline
                        ? squirlce_with_cut_border('rgba(0,0,0,0.1)')
                        : squirlce_border('rgba(0,0,0,0.1)')
                }
            />
            {isOnline && (
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
