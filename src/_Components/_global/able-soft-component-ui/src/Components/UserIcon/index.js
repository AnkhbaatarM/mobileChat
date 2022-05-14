/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Image,Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SvgXml } from 'react-native-svg';
import {
    default_user_male,
    default_user_female,
    default_male_old,
    squirlce_border,
    squircleBG,
    squircleBgCut,
} from './utils/svg_mask';

var styles = require('./Styles');
const absolute = { position: 'absolute', left: -0.5 };

export const RoomIcon = ({
    plusNumber='1',
    plus=false,
    isOnline = false,
    center = true,
    path = require('./utils/people.png'),
    width = 40,
    height = 40,
    style = {},
    type = 'male',
    backgroundColor='white'
}) => {
    const placeholderIcon = () => {
        switch (type) {
            case 'male':
                return default_user_male();
            case 'female':
                return default_user_female();
            case 'male_old':
                return default_male_old();
            default:
                return default_user_male();
        }
    };
    const containerStyle = [
        {
            width: width,
            height: height,
            marginRight: center ? 0 : 10,
            alignSelf: 'center',
            backgroundColor: 'white',
        },
        style,
    ];
    return (
        <View style={containerStyle}>
            <SvgXml
                fill={'#ffffff'}
                style={absolute}
                width={width}
                height={height}
                rx={20}
                xml={placeholderIcon()}
            />
            {path && path.uri && path.uri !== '' && path.uri.includes('http') ? (
                <FastImage
                    style={[styles.userIcon, { width: width, height: height }]}
                    source={{
                        uri: path.uri,
                        priority: FastImage.priority.low,
                        resizeMode: FastImage.resizeMode.contain,
                    }}
                />
            ) : (
                <SvgXml
                    fill={'#ffffff'}
                    style={[styles.userIcon, { width: width + 1, height: height }]}
                    width={width}
                    height={height}
                    rx={20}
                    xml={placeholderIcon()}
                />
            )}
            {plus&&
            <View
            style={[
                absolute,{
                    width:width,
                    height:height,
                    backgroundColor:'rgba(0,0,0,0.6)',
                    justifyContent:'center',
                }
            ]}
            >
                <Text style={styles.plusText}>+{plusNumber}</Text>
            </View>
            }
            <SvgXml
                width={width + 1}
                height={height + 1}
                style={absolute}
                rx={20}
                xml={isOnline ? squircleBgCut() : squircleBG()}
            />
            <SvgXml
                width={width + 1}
                height={height + 1}
                style={absolute}
                rx={20}
                xml={
                    isOnline
                        ? squirlce_with_cut_border('rgba(0,0,0,0.2)')
                        : squirlce_border('rgba(0,0,0,0.2)')
                }
            />
            {isOnline && (
                <View
                    style={[
                        styles.activeView,
                        {
                            height: height / 4,
                            width: width / 4,
                            borderRadius: width / 4 / 2,
                        },
                    ]}
                />
            )}
            
        </View>
    );
};
export default RoomIcon;
