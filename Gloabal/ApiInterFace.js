
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

//Todo Ирсэн бичигтэй хамааралтай хүсэлтүүд
export async function uploadFileToServer(formData) {
  let DomainAddress = await AsyncStorage.getItem('DomainAddress');
  let username = await AsyncStorage.getItem('logUserName');
  let password = await AsyncStorage.getItem('logPassword');
  //console.log("fomr data ", formData)
  var uri = encodeURI(
    `${DomainAddress}mobileApi.php?&uName=${username}&uPass=${password}&request=global&versionCode=15&appName=mail&a=file&t=upload`,
  );
  return fetch(uri, {
    method: 'POST',
    // headers: new Headers({
    //     'Content-Type': 'multipart/form-data;boundary=*****',
    //     "ENCTYPE": "multipart/form-data",
    // }),
    body: formData,
  });
}
export const createFormData = (photo) => {
  const data = new FormData();
  data.append('uploaded_file', {
    name: photo.newimage,
    type: Platform.OS === 'android' ? photo.type : 'File',
    tmp_name:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });
  return data;
};
export async function setNotificationToken() {
  let DomainAddress = await AsyncStorage.getItem('DomainAddress');
  let username = await AsyncStorage.getItem('logUserName');
  let password = await AsyncStorage.getItem('logPassword');
  let FireBaseToken = '';
  return fetch(DomainAddress + 'mobileApi.php?', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
    // Todo Post request ywuulahdaa parameteruudee zaaj ogj baigaa heseg
    body: `&uName=${username}
                &uPass=${password}
                &appName=newsfeed
                &request=notification
                &osName=android
                &token=${FireBaseToken}`,
  });
}
export async function sendGlobalRequest(payload) {
  let DomainAddress = await AsyncStorage.getItem('DomainAddress');
  let username = await AsyncStorage.getItem('logUserName');
  let password = await AsyncStorage.getItem('logPassword');
  let user = await AsyncStorage.getItem('LoggedUser');
  let parsedUname = JSON.parse(user);
  //console.log("payload send global request ", payload)
  return fetch(DomainAddress + 'mobileApi.php?', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
    // Todo Post request ywuulahdaa parameteruudee zaaj ogj baigaa heseg
    body: `&uName=${username}
                &uPass=${password}
                ${payload}`,
  });
}
//Todo тухайн ирсэн бичгийг шилжүүлэх хүсэлт
export async function executeShiftReceived(docId, receiverId, rule, sharedIds) {
  let DomainAddress = await AsyncStorage.getItem('DomainAddress');
  let username = await AsyncStorage.getItem('logUserName');
  let password = await AsyncStorage.getItem('logPassword');
  return fetch(DomainAddress + 'mobileApi.php?', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
    // Todo Post request ywuulahdaa parameteruudee zaaj ogj baigaa heseg
    body: `&uName=${username}
                &uPass=${password}
                &appName=newsfeed
                &request=newsfeed
                &a=execute
                &t=shift
                &p=docs
                &m=received
                &docId=${docId}
                &receiverId=${receiverId}
                &rule=${rule}
                &sharedIds=${sharedIds}`,
  });
}

export const getGroupList = async (navigation, type) => {
  let DomainAddress = await AsyncStorage.getItem('DomainAddress');
  let username = await AsyncStorage.getItem('logUserName');
  let password = await AsyncStorage.getItem('logPassword');
  let uri = encodeURI(
    `uName=${username}&uPass=${password}&appName=public&request=public&a=show&t=groupList&type=${type}`,
  );
  //let FireBaseToken = await AsyncStorage.getItem('fcmToken');
  return fetch(DomainAddress + 'mobileApi.php?', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
    // Todo Post request ywuulahdaa parameteruudee zaaj ogj baigaa heseg
    body: uri,
  });
};
