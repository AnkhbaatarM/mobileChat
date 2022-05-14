import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableHighlight, ActivityIndicator } from 'react-native';
import SeenUserInfo from '../moreChatSeenUserInfo';
import { SvgXml } from 'react-native-svg';
import { remove_icon } from '../../../utils/files/SvgFiles/moreHeaderIcon';
import Modal from 'react-native-modal';

const styles = require('./Styles');

export const ConfirmModal = ({ showModal = false, hideModal = () => {}, seenUsers }) => {
    const [listShown, showList] = useState(false);
    const seenUserInfo = (item, index) => {
        return <SeenUserInfo item={item} />;
    };
    return (
        <Modal
            onBackdropPress={() => hideModal(false)}
            onBackButtonPress={() => hideModal(false)}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            backdropColor={'rgba(16,48,84,0.85)'}
            backdropOpacity={1}
            onModalHide={() => showList(false)}
            onModalShow={() => showList(true)}
            isVisible={showModal}>
            {listShown ? (
                <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContainer}>
                    <View style={styles.contentContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.moreHeader}>{'Харсан хэрэглэгчид'}</Text>
                            <TouchableHighlight
                                onPress={() => hideModal()}
                                underlayColor={'rgba(0,0,0,0.2)'}
                                style={styles.buttonStyle}>
                                <SvgXml
                                    width={'100%'}
                                    height={'50%'}
                                    style={styles.searchIcon}
                                    xml={remove_icon('#909090')}
                                />
                            </TouchableHighlight>
                        </View>
                        {seenUsers.map((user, index) => {
                            return seenUserInfo(user, index);
                        })}
                    </View>
                </ScrollView>
            ) : (
                <ActivityIndicator style={{ alignSelf: 'center' }} color={'white'} size={'large'} />
            )}
        </Modal>
    );
};
export default ConfirmModal;
