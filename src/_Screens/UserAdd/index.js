import React, { useEffect } from 'react';
import { LayoutAnimation, SafeAreaView } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import { socketPort, sendSocket } from '@SocketCon/Socket_i';
import UserSearchComponent from '../../_Components/_home/homeRoomCreateUserContainer';
import { requesFetchNew } from '../../../Gloabal/GlobalFunctions';
import { useSelector, useDispatch } from 'react-redux';
import { selectData, setRoomUsers } from '../../../reduxStore/reducer';
import { selectRoom, getSelectedRoom } from '../../Socket/Socket_Var';

IconEntypo.loadFont();

const RecyclerView = ({ navigation }) => {
    const dispatch = useDispatch();
    // const state = useSelector(selectData);
    const roomCreateUsers = useSelector(state => selectData(state, 'roomCreateUsers'));
    const roomUsers = useSelector(state => selectData(state, 'roomUsers'));
    const myData = useSelector(state => selectData(state, 'myData'));
    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.opacity);
    }, [roomCreateUsers.length]);
    const addNewUsersToRoom = async users => {
        var userArray = [];
        var newUsers = [];
        var newRoomUsers = [];
        // console.log('users',users)
        const selectedRoom = getSelectedRoom();
        users.map((item, index) => {
            // console.log('item',item)
            userArray.push({
                userId: item.user.id,
                // name: item.user.system_name,
                // photo: item.user.user_icon,
            });
            newRoomUsers = [
                ...roomUsers,
                ...[
                    {
                        id: item.user.id,
                        isOnline: false,
                        last_seen: '',
                        name: item.user.system_name,
                        user_icon: item.user.user_icon,
                    },
                ],
            ];
            // console.log('newrooms',newRoomUsers)
            // roomUsers.unshift({
            //     id: item.user.id,
            //     isOnline: false,
            //     last_seen: '',
            //     name: item.user.system_name,
            //     path: item.user.photo,
            // });
            const userObj = {
                id: item.user.id,
                system_name: item.user.system_name,
                path: item.user.user_icon,
            };
            selectedRoom.users = [...[userObj], ...selectedRoom.users];
            newUsers = [
                {
                    id: item.user.id,
                    system_name: item.user.system_name,
                    user_icon: item.user.user_icon,
                },
            ];
            // newUsers.unshift({
            //     id: item.user.id,
            //     system_name: item.user.system_name,
            //     path: item.user.photo,
            // });
        });
        const body = {
            users: userArray,
        };
        // console.log('body',body)
        const user = await AsyncStorage.getItem('LoggedUser');
        const userData = JSON.parse(user);
        const room_id = selectedRoom._id;
        requesFetchNew(
            `${socketPort}api/rooms/${room_id}/user/addUsers`,
            'POST',
            userData.accessToken,
            JSON.stringify(body)
        )
            .then(responseJson => {
                if (responseJson !== null) {
                    sendSocket(selectedRoom._id, {
                        message: `${myData.userName} өрөөнд хүн нэмлээ:$option$:${JSON.stringify(
                            newUsers
                        )}`,
                        msg_type: 7,
                        files: [],
                        date: new Date(),
                        name: selectedRoom.name,
                        users: selectedRoom.users,
                        path: selectedRoom.path,
                        roomType: selectedRoom.roomType,
                    });
                    selectRoom(selectedRoom);
                    dispatch(setRoomUsers(newRoomUsers));
                    navigation.goBack();
                }
            })
            .catch(error => {
                console.warn('error_aldaa', error);
            });
    };
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 20, backgroundColor: 'white' }}>
            <UserSearchComponent
                navigation={navigation}
                type={'userAdd'}
                addNewUsersToRoom={addNewUsersToRoom}
            />
        </SafeAreaView>
    );
};

export default RecyclerView;
