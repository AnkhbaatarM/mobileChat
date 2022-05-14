import AsyncStorage from '@react-native-community/async-storage';
import {
    Dimensions,
    PermissionsAndroid,
    Platform,
    Alert,
    Linking,
    PixelRatio,
    StatusBar,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {
    file_pdf,
    file_ppt,
    file_psd,
    file_rar,
    file_word,
    file_other,
    file_excel,
} from '../src/utils/files/SvgFiles/more_file_ext';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { socketPort } from '../src/Socket/Socket_i';
import { SELECT_ROOM, SET_SELECTED_USERS, UPDATE_CHAT_LIST } from '../src/Context/actions/more';
import moment from 'moment';
import * as mime from 'react-native-mime-types';
const { updateChatList, selectRoom } = require('../src/Socket/Socket_Var');

const screenWidth = Math.round(Dimensions.get('window').width);
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = screenWidth / 320;
// based on iphone 5s's scale
export function normalize2(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
}
export function normalize(size, standardScreenHeight = 780) {
    size = Platform.OS === 'ios' ? size - 2 : size;
    const pixelRatio = PixelRatio.get();
    const deviceHeight = Dimensions.get('window').height;
    const deviceWidth = Dimensions.get('window').width;
    if (pixelRatio >= 2 && pixelRatio < 3) {
        if (deviceWidth < 360) {
            return size * 0.95;
        }
        if (deviceHeight < 667) {
            return size;
        }
        if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 1.15;
        }
        return size * 1.25;
    }
    if (pixelRatio >= 3 && pixelRatio < 3.5) {
        if (deviceWidth <= 360) {
            return size;
        }
        if (deviceHeight < 667) {
            return size * 1.15;
        }
        if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 1.2;
        }
        return size * 1.27;
    }
    if (pixelRatio >= 3.5) {
        // catch Android font scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (deviceWidth <= 360) {
            return size;
            // Catch other smaller android height sizings
        }
        if (deviceHeight < 667) {
            return size * 1.2;
            // catch in-between size Androids and scale font up
            // a tad but not too much
        }
        if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 1.25;
        }
        // catch larger phablet devices
        return size * 1.4;
    }
    return Platform.OS === 'ios' ? size / 1.4 : size;
}
export let CallingVariable = '';
export let player = {
    _playing: false,
};

export function setPlayer(data) {
    player = data;
}
export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 780 ||
            dimen.width === 780 ||
            dimen.height === 812 ||
            dimen.width === 812 ||
            dimen.height === 844 ||
            dimen.width === 844 ||
            dimen.height === 896 ||
            dimen.width === 896 ||
            dimen.height === 926 ||
            dimen.width === 926)
    );
}

export function setCallingVariable(data) {
    CallingVariable = data;
}

export function isImageAcceptable(uri) {
    const newUri = uri !== undefined && uri !== null ? uri : '';
    return newUri;
}
export function isImageAcceptableWeb(uri) {
    const newUri = uri !== undefined && uri !== null && uri.includes('http') ? uri : '';
    return newUri;
}

export function mkEasyDate(date) {
    //Өгөгдсөн unixtime -ийг үгээр илэрхийлж буцаана
    const today = moment();
    const yesterday = moment().subtract(1, 'day');
    const engagementDate = moment(date);

    const isToday = moment(engagementDate).isSame(today, 'day');
    const isYesterday = moment(engagementDate).isSame(yesterday, 'day');

    const myDate = moment(date).unix();
    const now = moment().unix();
    const diffTime = now - myDate;

    let result = engagementDate.format('YYYY/MM/DD') + ' ' + engagementDate.format('HH:mm');
    const days = today.diff(engagementDate, 'days'); // =1

    if (diffTime < 60) {
        result = 'Дөнгөж сая';
    } else if (diffTime < 3600) {
        result = Math.floor(diffTime / 60) + ' мин';
    } else if (isToday) {
        const hourCnt = Math.floor(diffTime / 3600);
        result = hourCnt + ' цаг';
    } else if (isYesterday) {
        // result = `Өчигдөр  ${engagementDate.format('HH:mm')}`;
        result = 'Өчигдөр';
    } else {
        if (days === 2) {
            // result = 'Уржигдар ' + engagementDate.format('HH:mm');
            result = 'Уржигдар ';
        } else if (days < 7) {
            result = days + ' өдөр';
        }
    }

    return result;
}

export function mkRoomDate(date) {
    //Өгөгдсөн unixtime -ийг үгээр илэрхийлж буцаана
    const today = moment();
    const yesterday = moment().subtract(1, 'day');
    const engagementDate = moment(date);

    const isToday = moment(engagementDate).isSame(today, 'day');
    const isYesterday = moment(engagementDate).isSame(yesterday, 'day');

    const myDate = moment(date).unix();
    const now = moment().unix();
    const diffTime = now - myDate;
    const ThisYear =moment().format('YYYY');

    let result = engagementDate.format('YY/MM/DD') + ' ' + engagementDate.format('HH:mm');
    const days = today.diff(engagementDate, 'days'); // =1

    if (diffTime < 60) {
        result = 'Дөнгөж сая';
    } 
    else if (diffTime < 3600) {
        result = Math.floor(diffTime / 60) + ' мин';
    } else if (isToday) {
        const hourCnt = Math.floor(diffTime / 3600);
        result = hourCnt + ' цаг';
    } else if (isYesterday) {
        result = 'Өчигдөр';
    } else {
        if (days === 2) {
            result = 'Уржигдар';
        } else if (days < 7) {
            result = days + ' өдөр';
        }
        else if(ThisYear===engagementDate.format('YYYY')){
            result = engagementDate.format('MM/DD')+' ' +engagementDate.format('HH:mm')
        }
    }

    return result;
}
export function mkChatDate(date) {
    const today = moment();
    const yesterday = moment().subtract(1, 'day');
    const engagementDate = moment(date);

    const isToday = moment(engagementDate).isSame(today, 'day');
    const isYesterday = moment(engagementDate).isSame(yesterday, 'day');

    const myDate = moment(date).unix();
    const now = moment().unix();
    const diffTime = now - myDate;

    // let result = engagementDate.format('MM/DD') + ' ' + engagementDate.format('HH:mm');
    let result = engagementDate.format('HH:mm');
    const days = today.diff(engagementDate, 'days'); // =1

    if (diffTime < 60) {
        result = 'Дөнгөж сая';
    } else if (diffTime < 3600) {
        result = Math.floor(diffTime / 60) + ' мин';
    } else if (isToday) {
        const hourCnt = Math.floor(diffTime / 3600);
        result = hourCnt + ' цаг';
    }
    // else if (isYesterday) {
    //     result = `Өчигдөр  ${engagementDate.format('HH:mm')}`;
    // } else {
    //     if (days === 2) {
    //         result = 'Уржигдар ' + engagementDate.format('HH:mm');
    //     } else if (days < 7) {
    //         result = days + ' өдөр';
    //     }
    // }

    return result;
}

export function mkEasySeparteDate(date) {
    const today = moment();
    const yesterday = moment().subtract(1, 'day');
    const engagementDate = moment(date);

    const isToday = moment(engagementDate).isSame(today, 'day');
    const isYesterday = moment(engagementDate).isSame(yesterday, 'day');

    let result = engagementDate.format('YYYY/MM/DD');
    const days = today.diff(engagementDate, 'days'); // =1
    if (isToday) {
        result = 'Өнөөдөр';
    } else if (isYesterday) {
        result = 'Өчигдөр';
    } else {
        if (days === 2) {
            result = 'Уржигдар';
        } else if (days < 7) {
            result = days + ' өдөр';
        }
    }
    return result;
}

export function formattadDate(date) {
    const userDate = new Date(date);

    const myDate = moment(userDate).unix();
    const myDateFormat = moment(myDate * 1000);
    let result = myDateFormat.format('YYYY/MM/DD') + ' ' + myDateFormat.format('HH:mm');
    return result;
}

export function getDate(date) {
    const weekArr = ['Дав', 'Мяг', 'Лхг', 'Пүр', 'Баа', 'Бям', 'Ням'];
    const now = new Date();
    const diff = now.getTime() - Date.parse(date);
    let dateStr = '';
    const userDate = new Date(date);
    if (diff < 86400000 && userDate.getDay() === now.getDay()) {
        dateStr =
            userDate.getHours() +
            ':' +
            // eslint-disable-next-line radix
            (parseInt(userDate.getMinutes()) < 10
                ? `0${userDate.getMinutes()}`
                : userDate.getMinutes());
    } else if (diff < 604800000) {
        dateStr = weekArr[userDate.getDay() > 0 ? userDate.getDay() - 1 : 0];
    } else {
        dateStr =
            userDate.getFullYear() +
            '/' +
            (userDate.getMonth() + 1) +
            '/' +
            // eslint-disable-next-line radix
            (parseInt(userDate.getDate()) < 10 ? `0${userDate.getDate()}` : userDate.getDate());
    }
    return dateStr;
}

export const searchUserRoom = async (roomList, selectedUser, navigation, dispatch) => {
    const roomData = roomList.find(element => {
        return (
            element.users.length === 2 &&
            element.users.findIndex(obj => obj.id === selectedUser.id) !== -1
        );
    });
    if (roomData > -1) {
        selectRoom(roomData);
        dispatch({ type: SELECT_ROOM, list: roomData });
        navigation.navigate('More', {
            room_id: roomData._id,
        });
    } else {
        const user = await AsyncStorage.getItem('LoggedUser');
        const userData = JSON.parse(user);
        const users = [];
        users.push({
            id: selectedUser.id,
        });
        users.push({
            id: userData.userId,
        });
        const formData = [];
        formData.push({
            name: 'name',
            data: `${userData.userName},${selectedUser.system_name}`,
        });
        formData.push({ name: 'roomType', data: '0' });
        formData.push({ name: 'authorId', data: userData.userId.toString() });
        formData.push({ name: 'users', data: JSON.stringify(users) });
        formData.push({ name: 'isActive', data: '0' });
        updateChatList([]);
        dispatch({
            type: UPDATE_CHAT_LIST,
            list: [],
        });
        selectRoom({ _id: 'newRoom', name: selectedUser.system_name, users: users });
        dispatch({
            type: SELECT_ROOM,
            list: { _id: 'newRoom', name: selectedUser.system_name, users: users },
        });
        navigation.navigate('More');
        RNFetchBlob.config({
            trusty: true,
            // timeout: 8000,
        })
            .fetch(
                'POST',
                `${socketPort}api/rooms`,
                {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': userData.accessToken,
                    Accept: 'application/json',
                },
                formData
            )
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson !== null && responseJson.code !== 500) {
                    let roomExist = {};
                    roomExist = responseJson.data;
                    const newRoom = {
                        _id: roomExist._id,
                        authorId: userData.userId,
                        createdAt: Date.now(),
                        files: [],
                        hasNew: false,
                        isActive: true,
                        isHide: false,
                        isOnline: false,
                        lastMsgInfo: {},
                        name: `${userData.userName},${selectedUser.system_name}`,
                        path: responseJson.data.path,
                        updatedAt: Date.now(),
                        users: users,
                    };
                    dispatch({ type: SET_SELECTED_USERS, list: [] });
                    selectRoom(newRoom);
                    dispatch({ type: SELECT_ROOM, list: newRoom });
                }
            });
    }
};

export const createFormData = (photo, key = 'files') => {
    var fileName = photo.uri.split('\\').pop().split('/').pop();
    let uri =
        Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri.replace('file://', '');
    uri = encodeURI(uri);

    const form = [
        {
            name: key,
            filename: photo.fileName ? photo.fileName : fileName,
            type: photo.type,
            data: RNFetchBlob.wrap(uri),
        },
    ];
    return form;
};

export function removeHtmlTag(str) {
    str = str.toString();

    str = str
        .replace(/&#039;/g, '')
        .replace(/&amp/g, '')
        .replace(/&quot;/g, '')
        .replace(/&lt/g, '')
        .replace(/&gt/g, '')
        .replace(/;/g, ',');
    return str;
}
export function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    return year + '-' + (month + 1) + '-' + day;
}
export function DownloadFile(url, FileName) {
    if (Platform.OS === 'ios') {
        Linking.openURL(url);
    } else {
        request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {
            switch (result) {
                case RESULTS.GRANTED:
                    const { config, fs } = RNFetchBlob;
                    let options = {
                        fileCache: true,
                        // path: fs.dirs.DownloadDir + '/' + FileName.toString(),
                        addAndroidDownloads: {
                            useDownloadManager: true,
                            notification: true,
                            title: FileName,
                            description: 'File',
                            path: fs.dirs.DownloadDir + '/' + FileName.toString(),
                        },
                    };
                    config(options)
                        .fetch('GET', url)
                        .then(res => {
                            Alert.alert('Амжилттай татаж дууслаа', res.path());
                        });
                    break;
            }
        });
    }
}

export function extention(filename, mimet) {
    if (filename.includes('.')) {
        return filename.split('.').pop();
    } else {
        if (mimet) {
            const exten = mime.extension(mimet);
            return exten ? exten : 'txt';
        } else {
            return filename.split('.').pop();
        }
    }
}
export const fileType = (name, mimeT) => {
    if (
        extention(name, mimeT).toLowerCase() === 'jpg' ||
        extention(name, mimeT).toLowerCase() === 'png' ||
        extention(name, mimeT).toLowerCase() === 'jpeg' ||
        extention(name, mimeT).toLowerCase() === 'heic'
    ) {
        return 'image';
    } else if (extention(name, mimeT) === 'mp3' || extention(name, mimeT) === 'mp4') {
        return 'audio';
    } else {
        return 'file';
    }
};

export function setFileSvg(fileName, mimet, press) {
    switch (extention(fileName, mimet)) {
        case 'doc':
            return file_word(press);
        case 'DOC':
            return file_word(press);
        case 'docx':
            return file_word(press);
        case 'doc':
            return file_word(press);
        case 'pdf':
            return file_pdf(press);
        case 'zip':
            return file_rar(press);
        case 'ppt':
            return file_ppt(press);
        case 'pptx':
            return file_ppt(press);
        case 'xls':
            return file_excel(press);
        case 'xlsx':
            return file_excel(press);
        case 'ps':
            return file_psd(press);
        case 'psd':
            return file_psd(press);
        case 'rar':
            return file_rar(press);
        case 'mp3':
            return file_word(press);
        case 'mp4':
            return file_word(press);
        default:
            return 'empty';
    }
}

/**
 * @return {string}
 */

export function warningToast(duration, position) {
    return {
        position: 0.5,
        duration: duration,
        containerStyle: {
            backgroundColor: '#5a6173',
            borderRadius: 10,
            width: (screenWidth / 100) * 60,
            marginTop: position === 'bottom' ? (screenWidth / 100) * 90 : (screenWidth / 100) * 20,
        },
        textStyle: {
            fontSize: 13,
            textAlign: 'center',
            color: '#a3a9b8',
        },
    };
}
export function failToast(duration) {
    return {
        position: 0.01,
        duration: duration,
        containerStyle: {
            backgroundColor: '#7f5f5f',
            borderRadius: 5,
            width: (screenWidth / 100) * 70,
            marginTop: (screenWidth / 100) * 15,
        },
        textStyle: {
            fontSize: 13,
            textAlign: 'center',
            color: '#c1a8a8',
            marginBottom:3
        },
    };
}
export function successToast() {
    return {
        position: 40,
        containerStyle: {
            backgroundColor: '#80bd87',
            borderRadius: 10,
            width: (screenWidth / 100) * 80,
        },
        textStyle: {
            fontSize: 13,
            textAlign: 'center',
            color: 'white',
        },
    };
}
export function getExtension(name) {
    if (
        name.toLowerCase().split('.').pop() === 'xlsx' ||
        name.toLowerCase().split('.').pop() === 'x' ||
        name.toLowerCase().split('.').pop() === 'xl'
    ) {
        return 'xl';
    }
    if (
        name.toLowerCase().split('.').pop() === 'doc' ||
        name.toLowerCase().split('.').pop() === 'docx' ||
        name.toLowerCase().split('.').pop() === 'txt'
    ) {
        return 'doc';
    }
    if (name.toLowerCase().split('.').pop() === 'rar') {
        return 'rar';
    }
    if (
        name.toLowerCase().split('.').pop() === 'ps' ||
        name.toLowerCase().split('.').pop() === 'psd'
    ) {
        return 'ps';
    }
    if (
        name.toLowerCase().split('.').pop() === 'ppt' ||
        name.toLowerCase().split('.').pop() === 'pptx'
    ) {
        return 'ppt';
    }
    if (name.toLowerCase().split('.').pop() === 'pdf') {
        return 'pdf';
    }
    if (
        name.toLowerCase().split('.').pop() === 'jpg' ||
        name.toLowerCase().split('.').pop() === 'jpeg' ||
        name.toLowerCase().split('.').pop() === 'png'
    ) {
        return 'jpg';
    }
    if (
        name.toLowerCase().split('.').pop() === 'mp3' ||
        name.toLowerCase().split('.').pop() === 'mp4'
    ) {
        return 'audio';
    } else {
        return '';
    }
}

export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
        return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
export function formatBytesBrief(bytes, decimals = 2) {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return sizes[i];
}
export function formatBytesNumber(bytes, decimals = 2) {
    if (bytes === 0) {
        return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
}
export function getLimitSize(size) {
    var limit = getLimit();
    if (parseFloat(size) < parseFloat(limit)) {
        return true;
    } else {
        return false;
    }
}
export function getLimit() {
    return 1024 * 1024 * 100;
}
export async function RemoveIsLoggedIn() {
    await AsyncStorage.setItem('isLoggedIn', '0');
    await AsyncStorage.setItem('LoggedUser', '[]');
}
export function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
        newArray.push({
            sub_name: lookupObject[i].unix_date,
            sub_array: [],
            hide: false,
        });
    }
    return newArray;
}
export function domain_list() {
    return [
        {
            label: 'www.able.mn',
            value: 'https://www.able.mn/',
        },
        {
            label: 'ubtz.able.mn',
            value: 'https://ubtz.able.mn/',
        },
        {
            label: 'intranet.gov.mn',
            value: 'https://intranet.gov.mn/',
        },
        {
            label: 'able.tog.mn',
            value: 'https://able.tog.mn/',
        },
        {
            label: 'able.transco.mn',
            value: 'https://able.transco.mn/',
          },
          {
            label: 'able.e-mart.mn',
            value: 'https://able.e-mart.mn/',
          },
          {
            label: 'nots.able.mn',
            value: 'https://nots.able.mn/',
          },
        {
            label: 'intranet.mojha.gov.mn',
            value: 'https://intranet.mojha.gov.mn/',
        },
        {
            label: 'eoffice.president.mn',
            value: 'https://eoffice.president.mn/',
        },
        {
            label: 'intranet.mrpam.gov.mn(Local)',
            value: 'https://intranet.mrpam.gov.mn/',
        },
        {
            label: 'intranet.mrpam.gov.mn',
            value: 'https://intranet.mrpam.gov.mn/',
        },
        {
            label: 'office.msue.edu.mn',
            value: 'https://office.msue.edu.mn/',
        },
        {
            label: 'mcud.able.mn',
            value: 'https://mcud.able.mn/',
        },
        {
            label: 'ndc.able.mn',
            value: 'https://ndc.able.mn/',
        },
        {
            label: 'able.audit.mn',
            value: 'https://able.audit.mn/',
        },
    ];
}
export function getUserName(id, users) {
    const index = users.findIndex(obj => obj.id === id);
    return users[index].name;
}

export function decode(tmp) {
    try {
        if (tmp) {
            var basestring = 'AbleCloudSoftware2012';
            tmp = tmp.toString();
            var arr = tmp.split(' '),
                str = '',
                i = 0,
                bi = 0;
            for (; i < arr.length; i += 1) {
                str += String.fromCharCode(parseInt(arr[i], 16) - basestring.charCodeAt(bi));
                bi += 1;
                if (bi === basestring.length - 1) {
                    bi = 0;
                }
            }
            str = str.toString().substring(0, str.toString().length - 1);
            return str;
        }
    } catch (e) {
        console.log('decode: ' + e);
        return 'ERROR';
    }
}

export function msgTypeText(item) {
    switch (item.msg_type) {
        case 3:
            return `${getUserName(item)} өрөөний нэрийг ${item.msg} болгон солилоо`;
        case 5:
            return `${getUserName(item)} өрөөний зураг солилоо`;
        case 7:
            return `${getUserName(item)} өрөөнд хүн нэмлээ`;
    }
}
export function isEmoji(text) {
    return text
        ? text.replace(
              /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
              ''
          )
        : '';
}
export function makeid(length, key) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `${key}=${result}`;
}
export function secondsToMinute(s) {
    return (s - (s %= 60)) / 60 + (s > 9 ? ':' : ':0') + s;
}

export async function requesFetchNew(url, method, accessToken, body) {
    const NewUrl = encodeURI(url);
    let promise = new Promise(function (resolve, reject) {
        RNFetchBlob.config({
            trusty: true,
        })
            .fetch(
                method,
                NewUrl,
                {
                    'x-access-token': accessToken,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body ? body : null
            )
            .then(response => {
                if (response.respInfo.status >= 200 && response.respInfo.status < 300) {
                    return response.json();
                }
                return null;
            })
            .then(responseJson => {
                resolve(responseJson);
            })
            .catch(error => {
                resolve(null);
                console.warn('error_aldaa_request', error);
            });
    });
    try {
        return await promise;
    } catch (err) {
        return null;
    }
}
export const FetchURL = async (url, method, body, header) => {
    let promise = new Promise(function (resolve, reject) {
        RNFetchBlob.config({
            trusty: true,
        })
            .fetch(method, `${url}`, header !== null ? header : null, body !== null ? body : null)
            .then(response => {
                // console.log('respojserer',response.respInfo.status)
                if (response.respInfo.status === 200) {
                    return response.json();
                }
                return null;
            })
            .then(responseJson => {
                resolve(responseJson);
            })
            .catch(error => {
              console.log('aldaaa',error)
                resolve(null);
            });
    });
    try {
        return await promise;
    } catch (err) {
      console.log('ererererer',err)
        return null;
    }
  };
export const requestReadExternalStorage = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: 'read external storage permission ',
                message: 'external storage permission  ',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //console.log("granted");
            return true;
        } else {
            //console.log("denied");
            return false;
        }
    } catch (err) {
        console.warn('err+permission', err);
        return false;
    }
};
export const domainAddress = () => {
    return 'https://www.able.mn/';
};

export const requestWriteExternalStorage = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'write external storage permission ',
                message: 'external storage permission  ',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //console.log("granted");
            return true;
        } else {
            //console.log("denied");
            return false;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
};

export const extensions = () => {
    var files = [
        'doc',
        'docx',
        'xls',
        'xlsm',
        'ppt',
        'pptx',
        'rar',
        'zip',
        'txt',
        'mpp',
        'pub',
        'dwg',
        'psd',
        'fla',
        'swf',
        'jpg',
        'jpeg',
        'png',
        'gif',
        'avi',
        'mp3',
        'mp4',
        'mpeg',
        'mov',
        'wmv',
        'flv',
        '3gp',
        'pdf',
        'air',
        'chm',
        'exe',
        'dmg',
        'vsd',
        'vss',
        'vst',
        'vsw',
        'vdx',
        'vsx',
        'vtx',
        'vsdx',
        'vsdm',
        'vssx',
        'vstm',
        'vstx',
        'vsl',
        'sav',
        'spv',
        'ost',
        'pst',
    ];
    return files;
};
export const checkExtensions = name => {
    var ext = name.split('.').pop();
    var extlist = extensions();
    if (extlist.includes(ext)) {
        return true;
    } else {
        return false;
    }
};
