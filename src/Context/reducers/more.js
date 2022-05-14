import {
    UPDATE_CHAT_LIST,
    SELECT_ROOM,
    SET_PICTURE_INDEX,
    SET_USER_TYPING,
    UPDATE_ROOM_USERS,
    UPDATE_SEEN_USERS,
    UPDATE_ROOM_FILES,
    UPDATE_SEARCH_LIST,
    UPDATE_ROOM_IMAGES,
    SWIPED_ROOM_USER,
    SET_INTERVAL_ID,
    SET_PLAYER_ID,
} from 'context_constants/more';

const initialAuth = {
    selectedRoom: null,
    chatList: [],
    roomUserList: [],
    swipeRoom: null,
    seenUsers: [],
    seenUsersMore: 0,
    roomFiles: [],
    roomImages: [],
    swipedRoomUser: null,
    pictureIndex: 0,
    intervalId: null,
    playerId: null,
    searchUserList: [],
    isUserTyping: {
        room: 0,
        typing: false,
    },
};

const reducerAuth = (state, action) => {
    switch (action.type) {
        case UPDATE_CHAT_LIST:
            return {
                ...state,
                chatList: action.list,
            };
        case SET_USER_TYPING:
            return {
                ...state,
                isUserTyping: action.list,
            };
        case UPDATE_SEARCH_LIST:
            return {
                ...state,
                searchUserList: action.list,
            };
        case SET_INTERVAL_ID:
            return {
                ...state,
                intervalId: action.list,
            };
        case SET_PLAYER_ID:
            return {
                ...state,
                playerId: action.list,
            };
        case SET_PICTURE_INDEX:
            return {
                ...state,
                pictureIndex: action.list,
            };
        case SELECT_ROOM:
            return {
                ...state,
                selectedRoom: action.list,
            };
        case UPDATE_ROOM_USERS:
            return {
                ...state,
                roomUserList: action.list,
            };
        case UPDATE_SEEN_USERS:
            return {
                ...state,
                seenUsers: action.list,
                seenUsersMore: action.count,
            };
        case UPDATE_ROOM_FILES:
            return {
                ...state,
                roomFiles: action.list,
            };
        case UPDATE_ROOM_IMAGES:
            return {
                ...state,
                roomImages: action.list,
            };
        case SWIPED_ROOM_USER:
            return {
                ...state,
                swipedRoomUser: action.list,
            };
        default:
            return state;
    }
};

export default [reducerAuth, initialAuth];
