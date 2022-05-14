import React, { useState, useRef } from 'react';
import { mkEasySeparteDate } from '../../../../../../Gloabal/GlobalFunctions';
import { View, TouchableHighlight, Animated, Easing, Text, ActivityIndicator } from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
    hide_date_icon,
    delete_date_icon,
} from '../../../../../utils/files/SvgFiles/moreHeaderIcon';
import moment from 'moment';
const center = { alignSelf: 'center' };
const styles = require('./Styles');

const StickyDateRow = ({
    nextitem,
    item,
    deleteChat = () => {},
    hideAndShowDateItems = () => {},
    scrollContainer = null,
    index,
}) => {
    const [stickyDetail, showStikcyDetail] = useState(false);
    const [loading, showLoad] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const spinValue = useRef(new Animated.Value(0)).current;
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-90deg'],
    });
    const displayDate = mkEasySeparteDate(item.createdAt);
    const renderDate = () => {
        return (
            <>
                <View style={styles.stickyDateContainer}>
                    <View style={stickyDetail ? styles.stickyRowActive : styles.stickyRow} />
                    <View style={stickyDetail ? styles.stickyValuContainer : center}>
                        <TouchableHighlight
                            style={
                                stickyDetail ? styles.stickyDateViewActive : styles.stickyDateView
                            }
                            underlayColor={'#dee0e3'}
                            onPress={() => {
                                if (stickyDetail) {
                                    Animated.timing(spinValue, {
                                        toValue: 0,
                                        duration: 200,
                                        easing: Easing.linear,
                                        useNativeDriver: true,
                                    }).start();
                                } else {
                                    Animated.timing(spinValue, {
                                        toValue: 1,
                                        duration: 200,
                                        easing: Easing.linear,
                                        useNativeDriver: true,
                                    }).start();
                                }
                                showLoad(true);
                                showStikcyDetail(!stickyDetail);
                                requestAnimationFrame(() => {
                                    hideAndShowDateItems(displayDate);
                                    showLoad(false);
                                    scrollContainer.scrollToIndex({
                                        animated: false,
                                        index: index,
                                    });
                                });
                            }}>
                            <>
                                <Text
                                    style={
                                        stickyDetail
                                            ? styles.stickyDateTextActive
                                            : styles.stickyDateText
                                    }>
                                    {displayDate}
                                </Text>
                                {loading ? (
                                    <ActivityIndicator
                                        size={'small'}
                                        style={center}
                                        color={'black'}
                                    />
                                ) : (
                                    <Animated.View
                                        style={[
                                            center,
                                            {
                                                transform: [{ rotate: spin }],
                                            },
                                        ]}>
                                        <SvgXml
                                            width="10"
                                            height="10"
                                            style={
                                                stickyDetail
                                                    ? styles.hideDateIcon
                                                    : styles.openDateIcon
                                            }
                                            xml={hide_date_icon(
                                                stickyDetail ? '#47505a' : '#737c88'
                                            )}
                                        />
                                    </Animated.View>
                                )}
                            </>
                        </TouchableHighlight>
                        {stickyDetail && (
                            <TouchableHighlight
                                underlayColor={'#dee0e3'}
                                onPress={() => {
                                    setDeleting(true);
                                    deleteChat(moment(item.createdAt).format('YYYY/MM/DD'));
                                    setDeleting(false);
                                }}
                                style={styles.deleteDateIcon}>
                                {deleting ? (
                                    <ActivityIndicator
                                        size={'small'}
                                        style={center}
                                        color={'black'}
                                    />
                                ) : (
                                    <SvgXml
                                        width="14"
                                        height="14"
                                        style={center}
                                        xml={delete_date_icon('#737c88')}
                                    />
                                )}
                            </TouchableHighlight>
                        )}
                    </View>
                </View>
            </>
        );
    };
    if (nextitem !== null) {
        if (mkEasySeparteDate(nextitem.msgs.createdAt) !== displayDate) {
            return renderDate();
        }
    } else {
        return renderDate();
    }
    return null;
};

export default StickyDateRow;
