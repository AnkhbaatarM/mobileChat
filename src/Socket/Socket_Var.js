import { set } from '../utils/async';

export var myData = [];
export var roomList = [];
export var onLineUserList = [];
export var chatList = [];
export let selectedRoom = null;
export let pictureIndex = 0;
export let contextMenuInd = 0;
export let chatColor = '#357FE5';
export let msgCount = 0;
export let player = null;
export let playerInterval = null;
export let playerAnimation = null;
export let playerIndex = null;

export function roomListVariableUpdate(list, userId) {
    roomList = list;
    if (userId) {
        set(`roomList=${userId}`, roomList);
    }
}

export function setPlayerIndex(data) {
    playerIndex = data;
}

export function getPlayerIndex(data) {
    return playerIndex;
}

export function setPlayer(data) {
    player = data;
}

export function getPlayer(data) {
    return player;
}

export function setPlayerInterval(data) {
    playerInterval = data;
}

export function getPlayerAnimation(data) {
    return playerAnimation;
}

export function setPlayerAnimation(data) {
    playerAnimation = data;
}

export function getPlayerInterval(data) {
    return playerInterval;
}

export function setMsgCount(value) {
    msgCount = value;
}
export function setChatColor(color) {
    chatColor = color;
}
export function setMyDataVar(data) {
    myData = data;
}
export function setContextMenuIn(index) {
    contextMenuInd = index;
}
export function setPictureIndex(index) {
    pictureIndex = index;
}

export function updateOnlineUsers(list) {
    onLineUserList = list;
}

export function updateChatList(list) {
    chatList = list;
}

export function selectRoom(room) {
    selectedRoom = room;
}

export function getMyData() {
    return myData;
}
export function getSelectedRoom() {
    return selectedRoom;
}
export function getRoomList() {
    return roomList;
}

export function getOnlineUsers() {
    return onLineUserList;
}

export function getChatList() {
    return chatList;
}
export function getMsgCount() {
    return msgCount;
}
export function chatListChageValueUsingKey(index, key, value) {
    const newObj = { msgs: { ...chatList[index][key], ...value } };
    return newObj;
}
