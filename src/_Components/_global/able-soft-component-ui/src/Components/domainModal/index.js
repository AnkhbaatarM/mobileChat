import Modal from 'react-native-modal';
import React from 'react';
import { View, Text, TouchableHighlight, FlatList } from 'react-native';
import styles from './style';
import { domain_list } from '../../../../../../../Gloabal/GlobalFunctions';
var domainlist = domain_list();
const DomainModal = ({ updateDomain = () => {}, onClose = () => {} }) => {
    return (
        <Modal
            isVisible={true}
            style={{ height: '100%' }}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}>
            <View style={styles.containerOutside}>
                <View style={{ flexDirection: 'row', paddingHorizontal: 0, paddingVertical: 0 }}>
                    <View style={{}}>
                        <Text style={styles.txtTitle}>
                            Та Able системийг хэрэглэдэг домайн хаягаа оруулна уу!
                        </Text>
                    </View>
                </View>
                <FlatList
                    data={domainlist}
                    style={{ height: '50%' }}
                    keyExtractor={obj => obj}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    renderItem={({ item, index }) => (
                        <TouchableHighlight
                            onPress={() => {
                                updateDomain(item.value);
                                onClose();
                            }}
                            style={styles.domainButton}>
                            <Text>{item.label}</Text>
                        </TouchableHighlight>
                    )}
                />
                {/* <Button
                    onPress={async () => {
                        onClose();
                    }}
                    label="Хадгалах"
                /> */}
            </View>
        </Modal>
    );
};

export default DomainModal;
