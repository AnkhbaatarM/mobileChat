/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
    TouchableHighlight,
    Text,
    ActivityIndicator,
    LayoutAnimation,
    Animated,
    Dimensions,
    Easing,
    View,
} from 'react-native';
const width69 = (Dimensions.get('window').width * 69) / 100;
const styles = require('./Styles');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableHighlight);
const animVal = new Animated.Value(1);
const interpolateIcon = animVal.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
});

const App = ({
    containerStyle = {
        width: width69,
        height: 50,
        backgroundColor: '#03d7fc',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5,
    },
    customLoaderStyle = {
        borderRadius: 25,
        alignSelf: 'center',
        backgroundColor: '#03d7fc',
        width: 50,
        height: 50,
        borderWidth: 2,
    },
    labelStyle = {},
    label = 'Нэвтрэх',
    showIndicator = true,
    onPress = () => {},
}) => {
    const [loader, showLoader] = useState(false);
    const [pressed, setPressed] = useState(false);

    const scaleAnim = Animated.spring(animVal, { toValue: 0.98, useNativeDriver: true });
    const deScaleAnim = Animated.spring(animVal, { toValue: 1, useNativeDriver: true });

    return (
        <AnimatedTouchable
            onPress={async () => {
                // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                showLoader(true);
                await onPress();
                showLoader(false);
            }}
            onPressIn={() => {
                scaleAnim.start();
                setPressed(true);
            }}
            onPressOut={() => {
                deScaleAnim.start();
                setPressed(false);
            }}
            underlayColor={'#fe8e8e'}
            style={
                loader
                    ? [containerStyle, styles.loadingButtonContainer]
                    : [
                          styles.buttonContainer,
                          containerStyle,
                          { transform: [{ scale: interpolateIcon }] },
                      ]
            }>
            {loader && showIndicator ? (
                <View style={[styles.loaderStyle, customLoaderStyle]}>
                    <ActivityIndicator
                        style={{ alignSelf: 'center', top: 1, left: 1 }}
                        color={'white'}
                        size={'large'}
                    />
                </View>
            ) : (
                <Text
                    style={[
                        styles.buttonLabel,
                        labelStyle,
                        { color: pressed ? '#a53434' : 'white' },
                    ]}>
                    {label}
                </Text>
            )}
        </AnimatedTouchable>
    );
};

export default App;
