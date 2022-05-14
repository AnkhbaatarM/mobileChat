import React from 'react';
import { TouchableOpacity, View, Text, TouchableHighlight, SafeAreaView } from 'react-native';
import RoomIcon from '../../../../_Components/_global/roomIcon/index';
import { back_icon } from 'utils_svg/moreHeaderIcon';
import { backButton } from '../../../../utils/files/SvgFiles/moreHeaderIcon';
import { SvgXml } from 'react-native-svg';
import { player } from 'root/GlobalFunctions';
import { useSelector, useDispatch } from 'react-redux';
import { selectData, setRoomData, setRoomList } from '../../../../../reduxStore/reducer';
import { roomList, getSelectedRoom } from '../../../../Socket/Socket_Var';
let { selectRoom, updateChatList } = require('../../../../Socket/Socket_Var');
import styles from './Styles';
const center = { alignSelf: 'center' };
const MoreHeader = ({ navigation }) => {
    const myData = useSelector(state => selectData(state, 'myData'));
    const newMsgCount = useSelector(state => selectData(state, 'newMsgCount'));
    const dispatch = useDispatch();
    let age = 0;
    let gender = 0;
    const selectedRoom = getSelectedRoom();
    if (selectedRoom && selectedRoom.roomType !== 1 && selectedRoom.users) {
        const other = selectedRoom.users.find(obj => obj.id !== myData.userId);
        age = other ? other.age : 20;
        gender = other ? other.gender : 1;
    }
    return (
        <SafeAreaView style={styles.container}>
            <TouchableHighlight
                underlayColor={'transparent'}
                style={styles.backButtonContainer}
                onPress={() => {
                    if (selectedRoom._id !== 'newRoom') {
                        navigation.navigate('Home');
                    } else {
                        navigation.goBack();
                    }
                    requestAnimationFrame(() => {
                        dispatch(setRoomList(roomList));
                        dispatch(setRoomData(null));
                        if (player._playing) {
                            player.release();
                        }
                        updateChatList([]);
                        selectRoom(null);
                    });
                }}>
                {newMsgCount > 0 ? (
                    <>
                        <SvgXml width={30} height={30} style={center} xml={backButton('gray')} />
                        <Text numberOfLines={1} style={styles.countText}>
                            {newMsgCount}
                        </Text>
                    </>
                ) : (
                    <SvgXml width="30" height="30" style={center} xml={back_icon('gray')} />
                )}
            </TouchableHighlight>
            <View style={styles.userImageContainer} onPress={() => navigation.navigate('RoomInfo')}>
                <RoomIcon
                    width={40}
                    height={40}
                    roomIcon={selectedRoom && selectedRoom.path ? selectedRoom.path : ''}
                    isGroup={selectedRoom && selectedRoom.roomType === 1}
                    age={age}
                    gender={gender}
                />
                <Text numberOfLines={1} style={styles.userName}>
                    {myData
                        ? selectedRoom && selectedRoom.name.replace(myData.userName, '')
                        : selectedRoom.name}
                </Text>
            </View>
        </SafeAreaView>
    );
};
export default MoreHeader;
