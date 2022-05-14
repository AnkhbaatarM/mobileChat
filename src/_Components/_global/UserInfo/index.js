import React, { useRef } from 'react';
import { ActivityIndicator, View, Text, TouchableHighlight, Animated } from 'react-native';
import Modal from 'react-native-modal';
import UserIcon from '../roomIcon';
import MaskView from '../SquircleUser';

const styles = require('./Styles');

export const UserInfoWindow = ({
    userData = {
        id: null,
        age: 0,
        app_name: '',
        com_id: '',
        company_name: '',
        createdAt: '',
        gender: 1,
        last_seen: '',
        phone: '',
        position: 7,
        status: '',
        system_name: '',
        user_icon: '',
    },
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
            backdropTransitionInTiming={0}
            backdropTransitionOutTiming={0}
            backdropColor={'rgba(16,48,84,0.85)'}
            backdropOpacity={1}
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            useNativeDriver={true}
            isVisible={showModal}>
            <View style={styles.deleteWindow}>
                <View style={styles.valueContainer}>
                    <UserIcon center width={75} height={75} roomIcon={userData.user_icon} />
                    <Text style={styles.modalHeaderBold}>{userData.system_name}</Text>
                    <Text style={styles.modalDeleteHeader}>{userData.app_name}</Text>
                    <View style={styles.statusContainer}>
                        <Text style={styles.statusText}>
                            {userData.status !== '' ? userData.status : 'Статус оруулаагүй!'}
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default UserInfoWindow;
