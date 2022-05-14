import React from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SvgXml } from 'react-native-svg';
import {
    squirlce_border_moon,
    squirlce_border,
    squircleBG,
    squircleBGMoon,
} from './utils/svg_mask';
import {
    default_user_female,
    default_user_male,
    default_male_old,
    default_female_old,
} from '../../../utils/files/SvgFiles/more_detail_icons';
var styles = require('./Styles');

const setDefaultIcon = (gender, age) => {
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
export const RoomIcon = ({
    width = 60,
    height = 60,
    borderColor = 'rgba(0,0,0)',
    totalCount = 5,
    extraCountStyle = {},
    backgroundColor = 'white',
    array = [
        require('./utils/people.png'),
        require('./utils/people.png'),
        require('./utils/people.png'),
        require('./utils/people.png'),
    ],
    extraCount = array.length - totalCount + 1 > 0 ? array.length - totalCount : 0,
    displayArray = array.slice(0, totalCount + 1),
}) => {
    const containerWidth = (width / 1.2) * displayArray.length;

    const absolutPos = { position: 'absolute', flexGrow: 1, width: '100%' };
    const viewContainerStyle = index => {
        const left = index !== 0 ? (width * index) / 1.2 : 0;
        return {
            width: width,
            height: height,
            alignSelf: 'center',
            position: 'absolute',
            left: left,
            justifyContent: 'center',
        };
    };
    const isImageAcceptable = url => {
        const newUrl =
            url !== undefined && url !== null && url.includes('http')
                ? {
                      uri: url,
                      priority: FastImage.priority.low,
                      cache: FastImage.cacheControl.cacheOnly,
                  }
                : require('./utils/people.png');
        return newUrl;
    };

    return (
        <View style={[styles.mainContainer, { height: height, width: containerWidth }]}>
            {displayArray.map((item, index) => {
                if (index !== displayArray.length - 1) {
                    return (
                        <View key={index.toString()} style={viewContainerStyle(index)}>
                            <SvgXml
                                fill={'#ffffff'}
                                style={[
                                    styles.userIcon,
                                    { width: width, height: height },
                                    absolutPos,
                                ]}
                                width={width}
                                height={height}
                                rx={20}
                                xml={setDefaultIcon()}
                            />
                            <FastImage
                                style={[styles.userIcon, { flexGrow: 1, width: '100%', left: 0.5 }]}
                                source={
                                    item.uri
                                        ? isImageAcceptable(item.uri)
                                        : require('./utils/people.png')
                                }
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <SvgXml
                                width={'100%'}
                                height={'100%'}
                                style={[styles.userIcon, absolutPos]}
                                xml={squircleBGMoon(backgroundColor)}
                            />

                            <SvgXml
                                width={'100%'}
                                height={'100%'}
                                style={[styles.userIcon, absolutPos]}
                                rx={20}
                                xml={squirlce_border_moon(borderColor)}
                            />
                        </View>
                    );
                } else {
                    return (
                        <View style={viewContainerStyle(index)}>
                            {extraCount > 0 ? (
                                <View
                                    style={[
                                        styles.userIcon,
                                        {
                                            width: width,
                                            height: height,
                                            backgroundColor: 'gray',
                                            justifyContent: 'center',
                                        },
                                    ]}>
                                    <Text style={[styles.extraCountStyle, extraCountStyle]}>
                                        {`+${extraCount}`}
                                    </Text>
                                    <SvgXml
                                        width={width}
                                        height={height}
                                        style={absolutPos}
                                        rx={20}
                                        xml={squirlce_border(borderColor)}
                                    />
                                    <SvgXml
                                        width={width}
                                        height={height}
                                        style={absolutPos}
                                        rx={20}
                                        xml={squircleBG('white')}
                                    />
                                </View>
                            ) : (
                                <>
                                    <SvgXml
                                        fill={'#ffffff'}
                                        style={[
                                            styles.userIcon,
                                            { width: width, height: height },
                                            absolutPos,
                                        ]}
                                        width={width}
                                        height={height}
                                        rx={20}
                                        xml={setDefaultIcon()}
                                    />
                                    <FastImage
                                        style={[styles.userIcon, { flexGrow: 1, width: '100%' }]}
                                        source={
                                            item.uri
                                                ? isImageAcceptable(item.uri)
                                                : require('./utils/people.png')
                                        }
                                        resizeMode={FastImage.resizeMode.stretch}
                                    />

                                    <SvgXml
                                        width={width}
                                        height={height}
                                        style={absolutPos}
                                        rx={20}
                                        xml={squircleBG(backgroundColor)}
                                    />
                                    <SvgXml
                                        width={width}
                                        height={height}
                                        style={absolutPos}
                                        rx={20}
                                        xml={squirlce_border(borderColor)}
                                    />
                                </>
                            )}
                        </View>
                    );
                }
            })}
        </View>
    );
};
export default RoomIcon;
