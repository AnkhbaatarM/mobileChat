import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'counter',
    initialState: {
        roomData: null,
        roomList: [],
        onlineUserList: [],
        chatList: [],
        myData: null,
        newMsgCount: 0,
        swipeRoom: null,
        roomImages: [],
        roomFiles: [],
        roomUsers: [],
        roomLinks: [],
        isAuth: null,
        roomCreateUsers: [],
        pictureIndex: 0,
        audioInterval: null,
        audio: null,
        swipedRoomUser: null,
        contextMenuInd: null,
        socketConnected: false,
    },
    reducers: {
        userAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setRoomData: (state, action) => {
            state.roomData = action.payload;
        },
        setSocketConnected: (state, action) => {
            state.socketConnected = true;
        },
        setRoomList: (state, action) => {
            state.roomList = [...action.payload];
        },
        setOnlineUserList: (state, action) => {
            state.onlineUserList = action.payload;
        },
        setChatList: (state, action) => {
            state.chatList = action.payload;
        },
        setMyData: (state, action) => {
            state.myData = action.payload;
        },
        setNewMsgCount: (state, action) => {
            state.newMsgCount = action.payload;
        },
        setSwipeRoom: (state, action) => {
            state.swipeRoom = action.payload;
        },
        setRoomImages: (state, action) => {
            state.roomImages = action.payload;
        },
        setRoomFiles: (state, action) => {
            state.roomFiles = action.payload;
        },
        setRoomUsers: (state, action) => {
            state.roomUsers = action.payload;
        },
        setRoomLinks: (state, action) => {
            state.roomLinks = action.payload;
        },
        setRoomCreateUsers: (state, action) => {
            state.roomCreateUsers = action.payload;
        },
        setAudio: (state, action) => {
            state.audio = action.payload;
        },
        setAudioInterval: (state, action) => {
            state.audioInterval = action.payload;
        },
        setSwipedRoomUser: (state, action) => {
            state.swipedRoomUser = action.payload;
        },
        setContextMenuIn: (state, action) => {
            state.contextMenuInd = action.payload;
        },
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const {
    setRoomData,
    setMyData,
    setChatList,
    setRoomList,
    setNewMsgCount,
    setSwipeRoom,
    setRoomImages,
    setOnlineUserList,
    setRoomFiles,
    setRoomUsers,
    userAuth,
    setRoomCreateUsers,
    setAudioInterval,
    setAudio,
    // setPictureIndex,
    setSwipedRoomUser,
    setContextMenuIn,
    setRoomLinks,
    setSocketConnected,
} = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectData = (state, value) => (value ? state.counter[value] : state.counter);

export default slice.reducer;
