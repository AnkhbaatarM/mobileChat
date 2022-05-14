/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.ablechat;

import android.annotation.SuppressLint;
import android.app.ActivityManager;
import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.Iterator;
import java.util.List;

/**
 * NOTE: There can only be one service in each app that receives FCM messages. If multiple
 * are declared in the Manifest then the first one will be chosen.
 *
 * In order to make this Java sample functional, you must remove the following from the Kotlin messaging
 * service in the AndroidManifest.xml:
 *
 * <intent-filter>
 *   <action android:name="com.google.firebase.MESSAGING_EVENT" />
 * </intent-filter>
 */

@SuppressLint("MissingFirebaseInstanceTokenRefresh")
public class MyFirebaseMessagingService
        extends FirebaseMessagingService {
    private ReceivedMessageHandler mMessageReceivedHandler = new ReceivedMessageHandler(this);

    public static final String MESSAGE_EVENT = "messaging-message";
    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        try {
            String notifDataType = remoteMessage.getData().get("type");
            String callImage = remoteMessage.getData().get("callImage");
            String room_id = remoteMessage.getData().get("room_id");
            // duudlaga ireh ued
            String startCallType="incomingcall";
            String disconnectCallType="calldisconnected";
            if(startCallType.equals(notifDataType)|| disconnectCallType.equals(notifDataType)) {
                showIncomingCallScreen(remoteMessage,!isAppRunning());
            }else{
                mMessageReceivedHandler.handleReceivedMessage(remoteMessage);
//                int SUMMARY_ID = 0;
//                String channelId = "Your_channel_id";
//                String GROUP_KEY_WORK_EMAIL = "com.android.example.WORK_EMAIL";
//                NotificationCompat.Builder mBuilder =
//                        new NotificationCompat.Builder(this.getApplicationContext(), channelId);
//                Intent intent = new Intent(this, MainActivity.class);
//                intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
//                final Bundle bundle = new Bundle();
//                bundle.putBoolean("userInteraction", true);
//                intent.putExtra("notification", bundle);
//                PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent,
//                        PendingIntent.FLAG_UPDATE_CURRENT);
//                mBuilder.setContentIntent(pendingIntent);
//                mBuilder.setFullScreenIntent(pendingIntent,true);
//                Notification summaryNotification =
//                        new NotificationCompat.Builder(this, channelId)
//                                .setContentTitle("dasdadad")
//                                //set content text to support devices running API level < 24
//                                .setContentText("Two new messages")
//                                .setSmallIcon(R.drawable.ic_launcher)
//                                //build summary info into InboxStyle template
//                                .setStyle(new NotificationCompat.InboxStyle()
//                                        .addLine("Alex Faarborg  Check this out")
//                                        .addLine("Jeff Chang    Launch Party")
//                                        .setBigContentTitle("2 new messages")
//                                        .setSummaryText("janedoe@example.com"))
//                                //specify which group this notification belongs to
//                                .setGroup(GROUP_KEY_WORK_EMAIL)
//                                //set this notification as the summary for the group
//                                .setGroupSummary(true)
//                                .build();
//
//                NotificationCompat.BigTextStyle bigText = new NotificationCompat.BigTextStyle();
//                bigText.bigText(remoteMessage.getData().get("body"));
//                bigText.setBigContentTitle(remoteMessage.getData().get("title"));
//                bigText.setSummaryText(remoteMessage.getData().get("title"));
//                mBuilder.setContentIntent(pendingIntent);
//                mBuilder.setSmallIcon(R.mipmap.ic_launcher_round);
//                mBuilder.setLargeIcon(BitmapFactory.decodeResource(this.getResources(),
//                        R.mipmap.ic_launcher));
//                mBuilder.setContentTitle("Your Title");
//                mBuilder.setContentText("Your text");
//                mBuilder.setPriority(Notification.PRIORITY_MAX);
//                mBuilder.setStyle(bigText);
//                mBuilder.setGroup(GROUP_KEY_WORK_EMAIL);
//                mBuilder.setAutoCancel(true);
//                NotificationManager mNotificationManager =
//                        (NotificationManager) this.getSystemService(Context.NOTIFICATION_SERVICE);
//
//                // === Removed some obsoletes
//                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
//                {
//                    NotificationChannel channel = new NotificationChannel(
//                            channelId,
//                            "Channel human readable title",
//                            NotificationManager.IMPORTANCE_DEFAULT);
//                    mNotificationManager.createNotificationChannel(channel);
//                    mBuilder.setChannelId(channelId);
//                }
//                mNotificationManager.notify(SUMMARY_ID, summaryNotification);
//                assert room_id != null;
//                mNotificationManager.notify(Integer.parseInt(room_id), mBuilder.build());
            }
        } catch (Exception e) {
                Log.i("Error", String.valueOf(e));
        }
    }


    private void showIncomingCallScreen(RemoteMessage remoteMessage,boolean isAppRunning) {
        String notifDataType = remoteMessage.getData().get("type");
        String startCallType="incomingcall";
        String disconnectCallType="calldisconnected";
        if( startCallType.equals(notifDataType)) {
            Intent i = new Intent(getApplicationContext(), IncomingCallScreenActivity.class);
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
            i.putExtra("CALLER_NAME", remoteMessage.getData().get("callerName"));
            i.putExtra("CALL_TYPE",remoteMessage.getData().get("type"));
            i.putExtra("GROUP_NAME",remoteMessage.getData().get("groupName"));
            i.putExtra("CALL_IMAGE",remoteMessage.getData().get("callImage"));
            i.putExtra("APP_STATE",isAppRunning);
            startActivity(i);
        }else if(disconnectCallType.equals((notifDataType))){
            LocalBroadcastManager localBroadcastManager = LocalBroadcastManager
                    .getInstance(MyFirebaseMessagingService.this);
            localBroadcastManager.sendBroadcast(new Intent(
                    "com.incomingcallscreenactivity.action.close"));
        }
    }

    private boolean isAppRunning() {
        ActivityManager m = (ActivityManager) this.getSystemService( ACTIVITY_SERVICE );
        List<ActivityManager.RunningTaskInfo> runningTaskInfoList =  m.getRunningTasks(10);
        Iterator<ActivityManager.RunningTaskInfo> itr = runningTaskInfoList.iterator();
        int n=0;
        while(itr.hasNext()){
            n++;
            itr.next();
        }
        if(n==1){ // App is killed
            return false;
        }
        return true; // App is in background or foreground
    }
}