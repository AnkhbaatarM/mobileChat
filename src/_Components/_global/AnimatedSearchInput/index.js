import React, { useRef } from 'react';
import { TextInput, Animated, View, TouchableHighlight, ActivityIndicator } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { remove_icon, searchIcon } from '../../../utils/files/SvgFiles/moreHeaderIcon';
import { width4 } from '../../../utils/dimensions/width';

const styles = require('./Styles');

export const SearchBar = ({
    search = () => {},
    hideSearchBar = () => {},
    left = new Animated.Value(1),
    fadeAnim = new Animated.Value(1),
    input,
    loading = false,
}) => {
    return (
        <Animated.View
            style={[
                styles.searchInputContainer,
                {
                    opacity: fadeAnim,
                    transform: [
                        {
                            translateX: left,
                        },
                    ],
                },
            ]}>
            <View style={styles.searchInput}>
                <SvgXml
                    width="20"
                    height="20"
                    style={styles.searchIcon}
                    xml={searchIcon('#909090')}
                />
                <TextInput
                    // editable={searchShown}
                    ref={input}
                    placeholder={'Хайлт хийх'}
                    placeholderTextColor={'#909090'}
                    style={styles.searchInputText}
                    onChangeText={text => search(text)}
                />
                <TouchableHighlight
                    onPress={() => hideSearchBar()}
                    underlayColor={'rgba(0,0,0,0.2)'}
                    style={styles.buttonStyle}>
                    {loading ? (
                        <ActivityIndicator
                            style={styles.searchIcon}
                            size={'small'}
                            color={'#909090'}
                        />
                    ) : (
                        <SvgXml
                            width={width4}
                            height={width4}
                            style={styles.searchIcon}
                            xml={remove_icon('#909090')}
                        />
                    )}
                </TouchableHighlight>
            </View>
        </Animated.View>
    );
};
export default SearchBar;
