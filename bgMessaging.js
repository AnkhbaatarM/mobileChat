import firebase from '@react-native-firebase/app';

/**
 * this code is resolved in background, so debugger and logs doesn't work here.
 * It's easier to test code somewhere else in foreground and then paste here.
 */
export default async message => {
    const notification = new firebase.notifications.Notification();
    notification.android
        .setChannelId('notifications-channel')
        .setNotificationId(message.messageId)
        .setTitle(message.data.title)
        .setBody(message.data.body);

    console.log('messagedasda', message);
    if (message.data.largeIcon) {
        notification.android.setLargeIcon(message.data.largeIcon);
    }
    if (message.data.bigPicture) {
        notification.android.setBigPicture(message.data.bigPicture);
    }
    firebase.notifications().displayNotification(notification);
    return Promise.resolve();
};
