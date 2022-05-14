import React, { useEffect, useState, useRef } from 'react';
import { TextInput, Animated, View, Easing, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { room_search } from 'utils_svg/home_tab';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { remove_icon } from '../../../utils/files/SvgFiles/moreHeaderIcon';
var styles = require('./Styles');

const center = { alignSelf: 'center', marginLeft: 5 };

export const SearchBar = ({
    search = () => {},
    hideSearchBar = () => {},
    style = {},
    value = 'text',
    removeColor = '#909090',
    placeholder = 'Хайлт хийх',
}) => {
    const input = useRef();
    return (
        <View style={[styles.searchInput, style]}>
            <SvgXml width="20" height="20" style={center} xml={room_search('#909090')} />
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={'#909090'}
                style={styles.searchInputText}
                onChangeText={text => search(text)}
                ref={input}
            />
            {value.length > 0 && (
                <TouchableOpacity
                    style={center}
                    onPress={() => {
                        input.current.setNativeProps({ text: '' });
                        search('');
                        hideSearchBar();
                    }}>
                    <SvgXml width={15} height={15} style={center} xml={remove_icon(removeColor)} />
                </TouchableOpacity>
            )}
        </View>
    );
};
export default SearchBar;
