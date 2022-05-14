import React from 'react';
import { Linking, Text, TouchableOpacity } from 'react-native';
import RNUrlPreview from 'react-native-url-preview';

const { styles } = require('./Styles');
const ImageRenderer = ({ item, navigation }) => {
    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    Linking.openURL(item.msgs.msg);
                }}
                style={styles.linkContainer}>
                <Text style={styles.urlText}>{item.msgs.msg}</Text>
                {/* {item.msgs.msg && (
                    <RNUrlPreview
                        containerStyle={styles.urlContainer}
                        textContainerStyle={styles.urlTextContainer}
                        imageProps={{ resizeMode: 'contain' }}
                        titleStyle={styles.urlTitleStyle}
                        descriptionStyle={styles.urlDescStyle}
                        text={item.msgs.msg}
                        imageStyle={styles.urlImage}
                        faviconStyle={styles.urlImage}
                    />
                )} */}
            </TouchableOpacity>
        </>
    );
};
export default ImageRenderer;
