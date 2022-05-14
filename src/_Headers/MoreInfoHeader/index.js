import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { back_icon } from 'utils_svg/moreHeaderIcon';
import { SvgXml } from 'react-native-svg';

import styles from './Styles';
const MoreHeader = ({ navigation, title = '' }) => {
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.container}>
            <SvgXml width="25" height="20" style={styles.iconStyle} xml={back_icon('gray')} />
            <Text numberOfLines={1} style={styles.userName}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};
export default MoreHeader;
