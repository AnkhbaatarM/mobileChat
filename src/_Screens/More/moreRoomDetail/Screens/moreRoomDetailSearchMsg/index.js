import React, { useState } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import { LayoutUtil } from './utils/LayoutUtil';
import { ConversationRenderer } from './components/ConversationRenderer';
import IconFeather from 'react-native-vector-icons/Feather';
import { TextInput } from 'react-native-gesture-handler';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { requesFetchNew } from 'root/GlobalFunctions';
import { socketPort } from '@SocketCon/Socket_i';
import { useSelector } from 'react-redux';
import { selectData } from '../../../../../../reduxStore/reducer';
import { selectedRoom } from '../../../../../Socket/Socket_Var';

const styles = require('./Styles');
const center = { alignSelf: 'center' };
const RecyclerView = props => {
    // const state = useSelector(selectData);
    const myData = useSelector(state => selectData(state, 'myData'));

    const [dataProvider, setDataProvider] = useState(
        new DataProvider((r1, r2) => {
            return r1 !== r2;
        })
    );
    const [search, setSearch] = useState('');
    const [modalVisible, hideModal] = useState(true);
    const [layoutProvider] = useState(LayoutUtil.getLayoutProvider(2));

    const searchConversation = () => {
        console.log(
            'socketPort',
            `${socketPort}api/rooms/${selectedRoom._id}/msgs/find?msg=${search}`
        );
        requesFetchNew(
            `${socketPort}api/rooms/${selectedRoom._id}/msgs/find?msg=${search}`,
            'GET',
            myData.accessToken
        ).then(responseJson => {
            hideModal(false);
            setDataProvider(dataProvider.cloneWithRows(responseJson.data.datas));
        });
    };

    const rowRenderer = (type, data, index) => {
        return <ConversationRenderer index={index} item={data} navigation={props.navigation} />;
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.goBack();
                    }}
                    style={{ flexDirection: 'row' }}>
                    <IconMaterialIcons style={center} name="arrow-back" size={25} color="gray" />
                    <Text style={styles.valueText}>{`  Илэрц (${dataProvider._size})`}</Text>
                </TouchableOpacity>
                <IconFeather
                    onPress={() => hideModal(true)}
                    style={center}
                    name="search"
                    size={20}
                    color="gray"
                />
            </View>
            {dataProvider._size > 0 && (
                <RecyclerListView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ margin: 3, marginTop: 10, paddingBottom: 50 }}
                    // onEndReached={this.handleListEnd}
                    dataProvider={dataProvider}
                    layoutProvider={layoutProvider}
                    rowRenderer={rowRenderer}
                />
            )}

            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => {
                    hideModal(false);
                }}
                avoidKeyboard={true}
                onRequestClose={() => hideModal(false)}
                backdropOpacity={0.5}
                style={{ flex: 1, justifyContent: 'center', backgroundColor: 'transparent' }}>
                <View style={styles.inputContainer}>
                    {/* <View
                        onPress={() => searchUser()}
                        style={styles.searchInput}> */}
                    <TextInput
                        placeholder={'Хайлт хийх'}
                        placeholderTextColor={'gray'}
                        style={styles.searchInputTextModal}
                        value={search}
                        autoFocus={true}
                        onChangeText={text => setSearch(text)}
                    />
                    {/* <IconFeather style={{ alignSelf: 'center' }} name="search" size={20} color="gray" /> */}
                    {/* </View> */}
                    <TouchableOpacity
                        onPress={() => {
                            if (search !== '') {
                                searchConversation();
                            }
                        }}
                        style={styles.buttonContainer}>
                        <IconFeather style={center} name="search" size={20} color="white" />
                        <Text style={styles.buttonText}>{' Хайх'}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default RecyclerView;
