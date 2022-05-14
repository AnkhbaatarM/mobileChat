import React, { useState } from 'react';
import { TextInput, Animated, View, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { width4, width5 } from '../../_global/able-soft-component-ui/src/assets/dimensions/width';
import styles from './Styles';
import Modal from 'react-native-modal';
import UserSearch from './UserSearch';
import {
    arrowLeft,
    search,
    calendar,
    users,
} from '../../../utils/files/SvgFiles/more_detail_icons';
const center = { alignSelf: 'center' };
export const SearchBar = ({
    searchValue = () => {},
    hideSearchBar = () => {},
    searchByUser = () => {},
    userListShow = () => {},
    left,
    fadeAnim,
    input,
}) => {
    const [modalVisible, showModal] = useState(false);
    const [listShown, showList] = useState(false);
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
            <TouchableOpacity style={styles.arrowCont} onPress={() => hideSearchBar()}>
                <SvgXml
                    xml={arrowLeft('#919191')}
                    width={width4}
                    height={width4}
                    style={{ alignSelf: 'center', marginHorizontal: 10 }}
                />
            </TouchableOpacity>
            <View style={styles.searchInput}>
                <SvgXml
                    xml={search('#919191')}
                    width={width5}
                    height={width5}
                    style={{ alignSelf: 'center', marginLeft: 10 }}
                />
                <TextInput
                    ref={input}
                    // placeholderTextColor={'rgba(255,255,255,0.5)'}
                    style={styles.searchInputText}
                    placeholder={'Файлын нэр'}
                    onChangeText={value => searchValue(value)}
                    onFocus={() => {}}
                />
            </View>
            <TouchableOpacity style={[styles.buttonContainer, { marginHorizontal: 15 }]}>
                <SvgXml xml={calendar('#FA545A')} width={width4} height={width4} style={center} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                    showModal(true);
                    userListShow(true);
                    setTimeout(() => {
                        showList(true);
                    }, 500);
                }}>
                <SvgXml xml={users('#857CCF')} width={width5} height={width5} style={center} />
            </TouchableOpacity>
            <Modal
                onBackdropPress={() => {
                    showList(false);
                    showModal(false);
                }}
                onBackButtonPress={() => {
                    showList(false);
                    showModal(false);
                }}
                isVisible={modalVisible}
                backdropOpacity={1}
                animationIn={'zoomIn'}
                animationOut={'zoomOut'}
                backdropColor={'rgba(16,46,69,0.93)'}
                style={{ margin: 0 }}>
                {modalVisible && (
                    <UserSearch
                        showList={listShown}
                        searchByUser={user => {
                            showList(false);
                            showModal(false);
                            userListShow(false);
                            searchByUser(user);
                        }}
                        hideModal={() => {
                            showList(false);
                            showModal(false);
                            userListShow(false);
                        }}
                    />
                )}
            </Modal>
        </Animated.View>
    );
};
export default SearchBar;
