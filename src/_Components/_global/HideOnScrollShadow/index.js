import React from 'react';
import { Animated, View } from 'react-native';
const styles = require('./Styles');

export const SearchBar = ({ fadeAnim }) => {
    return (
        <Animated.View
            style={[
                styles.viewContainer,
                {
                    opacity: fadeAnim,
                },
            ]}>
            <View style={styles.viewShadow} />
        </Animated.View>
    );
};
export default SearchBar;
