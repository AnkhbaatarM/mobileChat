import {
    UPDATE_ROOM_LIST,
    UPDATE_USER_LIST,
    SELECT_SWIPE_ROOM,
    SET_ME,
    SET_MSG_COUNT,
    UPDATE_SEARCH_USERS,
    SET_SELECTED_USERS,
} from 'context_constants/home';
import AsyncStorage from '@react-native-community/async-storage';

const initialAuth = {
    roomList: [],
    userList: [],
    swipeRoom: null,
    me: {},
    msgCount: 0,
    searchUsers: [],
    selectedUsers: [],
};

const reducerAuth = (state, action) => {
    switch (action.type) {
        case UPDATE_ROOM_LIST:
            console.log(action.type, action.list.length, action.location);
            return {
                ...state,
                roomList: action.list,
            };
        case UPDATE_USER_LIST:
            return {
                ...state,
                userList: action.list,
            };
        case SELECT_SWIPE_ROOM:
            return {
                ...state,
                swipeRoom: action.list,
            };
        case SET_MSG_COUNT:
            return {
                ...state,
                msgCount: action.list,
            };
        case SET_ME:
            return {
                ...state,
                me: action.list,
            };
        case UPDATE_SEARCH_USERS:
            return {
                ...state,
                searchUsers: action.list,
            };
        case SET_SELECTED_USERS:
            return {
                ...state,
                selectedUsers: action.list,
            };
        default:
            return state;
    }
};

async function saveData(me, list) {
    if (me !== {}) {
        await AsyncStorage.setItem(`Room_List?userId=${me.userId}`, JSON.stringify(list));
    }
}

export default [reducerAuth, initialAuth];
