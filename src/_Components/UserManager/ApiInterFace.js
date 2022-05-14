
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

export async function loadUserIntro(userId) {
    let DomainAddress = await AsyncStorage.getItem('DomainAddress');
    let username = await AsyncStorage.getItem('logUserName');
    let password = await AsyncStorage.getItem('logPassword');
    return fetch(`https://www.able.mn/mobileApi.php?&uName=${username}&uPass=${password}&appName=newsfeed&request=global&a=usermanager&t=info&userId=${userId}`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', }),
        // Todo Post request ywuulahdaa parameteruudee zaaj ogj baigaa heseg
    })
}

export async function likeUser(task, itemId) {
    let DomainAddress = await AsyncStorage.getItem('DomainAddress');
    let username = await AsyncStorage.getItem('logUserName');
    let password = await AsyncStorage.getItem('logPassword');
    return fetch(DomainAddress + "mobileApi.php?", {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', }),
        // Todo Post request ywuulahdaa parameteruudee zaaj ogj baigaa heseg
        body: `&uName=${username}
                &uPass=${password}
                &appName=newsfeed
                &request=global
                &a=usermanager
                &t=${task}
                &itemId=${itemId}`
    })
}



