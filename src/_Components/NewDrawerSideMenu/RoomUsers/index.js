/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity,TouchableHighlight } from 'react-native';
import styles from './Styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectData, setRoomUsers } from '../../../../reduxStore/reducer';
import { UserIcon } from '../../_global/able-soft-component-ui';
import { width12, width16 } from '../../../utils/dimensions/width';
import { width2, width4 } from '../../_global/able-soft-component-ui/src/assets/dimensions/width';
import UserInfo from '../../_global/UserInfo';
import RoomIcon from '../../../_Components/_global/roomIcon/index'
let userInfo = {};

const RoomUsers = ({
    openSheet=()=>{}
}) => {
    const roomUsers = useSelector(state => selectData(state, 'roomUsers'));
    const [more, setMore] = useState(false);
    const [userInfoShown, showUserInfo] = useState(false);
    const [pressed,setPressed]=useState(false)
    const Rowrender = ({ item, index }) => {
        return (
            <TouchableHighlight
            underlayColor={'#f3f3f3'}
            onPressIn={()=>{setPressed(true),console.log('re',pressed)}}
            onPressOut={()=>{setPressed(false),console.log('rere',pressed)}}
            activeOpacity={1}
                onPress={() => {
                    userInfo = item;
                    showUserInfo(true);
                }}
                // onLongPress={()=>openSheet()}
                style={styles.tabContainer}>
                    <>
                <RoomIcon
                    path={{ uri: item.user_icon }}
                    width={width12}
                    height={width12}
                    backgroundColor={pressed?'#f3f3f3':'white'}
                    gender={item.gender}
                />
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.nameText}>
                        {item.system_name}
                    </Text>
                    <Text numberOfLines={1} style={styles.appNameText}>
                        {item.app_name}
                    </Text>
                </View>
                </>
            </TouchableHighlight>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Өрөөний гишүүд ({roomUsers.length})</Text>
            <FlatList
                style={{ height:more? (width16 + width2) * 6 :(width16 + width2) * 3}}
                data={roomUsers}
                scrollEnabled={more ? true : false}
                renderItem={Rowrender}
            />
            {!more && roomUsers.length > 4 && (
                <TouchableOpacity
                    style={[styles.tabContainer, { marginTop: width2 }]}
                    onPress={() => setMore(true)}>
                    <UserIcon
                        plusNumber={roomUsers.length - 4}
                        plus={true}
                        width={width12}
                        height={width12}
                        backgroundColor={'white'}
                    />
                    <Text style={[styles.nameText, { marginLeft: width4 }]}>Бусад</Text>
                </TouchableOpacity>
            )}
            <UserInfo
                showModal={userInfoShown}
                hideModal={() => showUserInfo(false)}
                userData={userInfo}
            />
        </View>
    );
};

export default RoomUsers;
