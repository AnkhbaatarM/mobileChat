/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect } from 'react';
import { TouchableHighlight, View, Animated, Text } from 'react-native';
import styles from './Styles';
import { SvgXml } from 'react-native-svg';
// import { room_list, user_list, profile } from '';
import { useSelector } from 'react-redux';
import { selectData } from '../../../reduxStore/reducer';
import { user_list, room_list, profile } from '../../utils/files/SvgFiles/tab_icons';
import { width5, width5_5 } from '../_global/able-soft-component-ui/src/assets/dimensions/width';

const center = { alignSelf: 'center' };
const animationStyle = (isFocused, clicked, animationValue) => {
    return {
        backgroundColor: isFocused ? '#ff3f4c' : 'transparent',
        transform:
            clicked && isFocused
                ? [
                      {
                          scaleX: animationValue,
                      },
                  ]
                : null,
    };
};
export const MyTabBar = ({ navState, descriptors, navigation, newCount = 0, userCount = 0 }) => {
    const focusedOptions = descriptors[navState.routes[navState.index].key].options;
    // const state = useSelector(selectData);
    const onlineUserList = useSelector(state => selectData(state, 'onlineUserList'));
    const newMsgCount = useSelector(state => selectData(state, 'newMsgCount'));

    const [clicked, setClicked] = useState(false);
    if (focusedOptions.tabBarVisible === false) {
        return null;
    }
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        startAnimation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newMsgCount]);
    const animatedStyle = {
        transform: [
            {
                translateY: animatedValue,
            },
        ],
    };
    const startAnimation = toValue => {
        Animated.timing(animatedValue, {
            toValue: -10,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };
    const TabIcon = (name, isFocused) => {
        switch (name) {
            case 'Users':
                return (
                    <>
                        <View
                            style={[
                                styles.countContainer,
                                { backgroundColor: isFocused ? '#ff3f4c' : '#e1e2e3' },
                            ]}>
                            <Text
                                style={[styles.countText, { color: isFocused ? 'white' : 'gray' }]}>
                                {onlineUserList.length}
                            </Text>
                        </View>
                        <SvgXml
                            xml={user_list(isFocused ? undefined : '#b9b9b9')}
                            width={width5_5}
                            height={width5_5}
                            style={center}
                        />
                    </>
                );
            case 'Home':
                return (
                    <>
                        {newMsgCount > 0 && (
                            <View
                                style={[
                                    styles.countContainer,
                                    { backgroundColor: isFocused ? '#ff3f4c' : '#e1e2e3' },
                                ]}>
                                <Text
                                    style={[
                                        styles.countText,
                                        { color: isFocused ? 'white' : 'gray' },
                                    ]}>
                                    {newMsgCount}
                                </Text>
                            </View>
                        )}
                        <SvgXml
                            xml={room_list(isFocused ? undefined : '#b9b9b9')}
                            width={width5_5}
                            height={width5_5}
                            style={center}
                        />
                    </>
                );
            case 'Profile':
                return (
                    <SvgXml
                        xml={profile(isFocused ? undefined : '#b9b9b9')}
                        width={width5}
                        height={width5}
                        style={center}
                    />
                );
            default:
                break;
        }
    };

    return (
        <View style={styles.rootContainer}>
            {navState.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;
                const isFocused = navState.index === index;
                const animationValue = useRef(new Animated.Value(0)).current;
                const scaleValue = useRef(0);
                const onPress = () => {
                    setClicked(true);
                    runAnimationOnClick(1);
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };
                const runAnimationOnClick = value => {
                    scaleValue.current = value;
                    Animated.spring(animationValue, {
                        toValue: 1,
                        useNativeDriver: true, // <-- Add this
                    }).start();
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableHighlight
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        key={route.name}
                        activeOpacity={1}
                        onLongPress={onLongPress}
                        underlayColor={'rgba(0,0,0,0.1)'}
                        style={styles.tabContainer}>
                        <>
                            <Animated.View
                                style={[
                                    styles.radiusBorderTop,
                                    animationStyle(isFocused, clicked, animationValue),
                                ]}
                            />
                            {TabIcon(label, isFocused)}
                        </>
                    </TouchableHighlight>
                );
            })}
        </View>
    );
};
