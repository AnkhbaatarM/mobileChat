import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
const styles = require('./Styles');

const StickyDateRow = ({ displayedDate }) => {
    const input = useRef();
    // if (displayedDate !== '') {
    //     return (
    //         <View style={styles.stickyDateContainer}>
    //             <View style={styles.stickyDateView}>
    //                 <TextInput editable={false} ref={input} style={styles.stickyDateText} />
    //             </View>
    //         </View>
    //     );
    // } else {
    //     return null;
    // }
    return null;
};

export default StickyDateRow;
