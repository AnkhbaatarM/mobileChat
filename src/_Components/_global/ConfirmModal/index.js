import React, { useRef } from 'react';
import { ActivityIndicator, View, Text, TouchableHighlight, Animated } from 'react-native';
import Modal from 'react-native-modal';

const styles = require('./Styles');

export const ConfirmModal = ({
    title = 'Баталгаажуулах асуулт',
    body = '',
    showModal = false,
    onPressButton = () => {},
    hideModal = () => {},
    loading,
}) => {
    const animated = useRef(new Animated.Value(0)).current;
    const boxInterpolation = animated.interpolate({
        inputRange: [0, 1],
        outputRange: ['white', '#516ca9'],
    });
    const changeColor = () => {
        Animated.timing(animated, {
            toValue: 1,
            duration: 0,
            useNativeDriver: false,
        }).start();
    };
    const changeColorToDefault = () => {
        Animated.timing(animated, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false,
        }).start();
    };
    return (
        <Modal
            onBackdropPress={() => hideModal(false)}
            onBackButtonPress={() => hideModal(false)}
            avoidKeyboard={true}
            backdropColor={'rgba(16,48,84,0.85)'}
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            backdropOpacity={1}
            isVisible={showModal}>
            <View style={styles.deleteWindow}>
                <Text style={styles.modalHeaderBold}>{title}</Text>
                <View style={styles.deleteLine} />
                <Text style={styles.modalDeleteHeader}>{body}</Text>
                <TouchableHighlight
                    onPressIn={() => changeColor()}
                    onPressOut={() => changeColorToDefault()}
                    underlayColor={'#becdef'}
                    onPress={onPressButton}
                    style={styles.modalButtonYes}>
                    {loading ? (
                        <ActivityIndicator style={styles.iconStyle} size="small" color="#516ca9" />
                    ) : (
                        <Animated.Text
                            style={[styles.modalButtonTextYes, { color: boxInterpolation }]}>
                            {'Устгах'}
                        </Animated.Text>
                    )}
                </TouchableHighlight>
            </View>
        </Modal>
    );
};
export default ConfirmModal;
