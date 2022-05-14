/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { app_logo } from '../../assets/icons/svg_icons';
const styles = require('./Styles');
const App = ({
    value = '',
    inputStyle = {},
    placeholder = 'Хайх',
    onChangeText = () => {},
    activeBorderHeight = 3,
    inActiveBorderHeight = 1,
    placeholderColor = '#7f879d',
    svgPath = color => app_logo(color),
    iconWidth = 15,
    iconHeight = 20,
    containerStyle = {},
    activeIconColor = 'white',
    activeBorderColor = 'white',
    inActiveIconColor = 'white',
    inActiveBorderColor = 'white',
    secureTextEntry = false,
    inputWithIconContainer = {},
    iconCustomStyle = {},
}) => {
    const [focused, setFocused] = useState(false);
    return (
        <View style={[styles.textInputContainerStyle, containerStyle]}>
            <View style={[styles.inputIconContainer, inputWithIconContainer]}>
                <TextInput
                    onFocus={() => {
                        setFocused(true);
                    }}
                    onBlur={() => {
                        setFocused(false);
                    }}
                    multiline={false}
                    autoCompleteType={'off'}
                    importantForAutofill={'no'}
                    selectionColor={'red'}
                    underlineColorAndroid="transparent"
                    spellCheck={false}
                    autoCorrect={false}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderColor}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    style={[styles.textInputStyle, inputStyle]}
                    secureTextEntry={secureTextEntry}
                />
                <SvgXml
                    style={[styles.iconStyle, iconCustomStyle]}
                    fillAll={focused ? activeIconColor : inActiveIconColor}
                    width={iconWidth}
                    height={iconHeight}
                    xml={svgPath(focused ? activeIconColor : inActiveIconColor)}
                />
            </View>
            <View
                style={[
                    styles.bottomBorder,
                    {
                        height: focused ? activeBorderHeight : inActiveBorderHeight,
                        borderRadius: (focused ? activeBorderHeight : inActiveBorderHeight) / 2,
                        backgroundColor: focused ? activeBorderColor : inActiveBorderColor,
                    },
                ]}
            />
        </View>
    );
};

export default App;
