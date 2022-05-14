package com.ablechat;


import android.app.ActivityManager;
import android.app.ActivityManager.RunningAppProcessInfo;
import android.app.Application;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.media.AudioAttributes;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.text.format.DateUtils;
import android.util.Log;
import android.widget.RemoteViews;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.resource.bitmap.CenterCrop;
import com.bumptech.glide.load.resource.bitmap.RoundedCorners;
import com.bumptech.glide.request.RequestOptions;
import com.bumptech.glide.request.target.AppWidgetTarget;
import com.bumptech.glide.request.transition.Transition;
import com.facebook.common.executors.UiThreadImmediateExecutorService;
import com.facebook.common.references.CloseableReference;
import com.facebook.datasource.DataSource;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.imagepipeline.core.ImagePipeline;
import com.facebook.imagepipeline.datasource.BaseBitmapDataSubscriber;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.imagepipeline.request.ImageRequest;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.List;
import java.util.Objects;

import static com.dieam.reactnativepushnotification.modules.RNPushNotification.LOG_TAG;

public class PushNotificationHelper {
    private static final long DEFAULT_VIBRATION = 300L;
    private static final String NOTIFICATION_CHANNEL_ID = "rn-push-notification-channel-id";

    private Context context;
    private PushNotificationConfig config;

    public PushNotificationHelper(Application context) {
        this.context = context;
        this.config = new PushNotificationConfig(context);
    }

    public Class getMainActivityClass() {
        String packageName = context.getPackageName();
        Intent launchIntent = context.getPackageManager().getLaunchIntentForPackage(packageName);
        assert launchIntent != null;
        String className = Objects.requireNonNull(launchIntent.getComponent()).getClassName();
        try {
            return Class.forName(className);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    public void sendToNotificationCentre(Bundle bundle) {
        try {
            Class intentClass = getMainActivityClass();
            if (intentClass == null) {
                Log.e(LOG_TAG, "No activity class found for the notification");
                return;
            }

//            if (bundle.getString("message") == null) {
//                // this happens when a 'data' notification is received - we do not synthesize a local notification in this case
//                Log.d(LOG_TAG, "Cannot send to notification centre because there is no 'message' field in: " + bundle);
//                return;
//            }

            String notificationIdString = bundle.getString("id");
            if (notificationIdString == null) {
                Log.e(LOG_TAG, "No notification ID specified for the notification");
                return;
            }

            Resources res = context.getResources();
            String packageName = context.getPackageName();

            String channel_id = NOTIFICATION_CHANNEL_ID;
            String title = bundle.getString("title");
            String msg_type = bundle.getString("msg_type");
            String body = bundle.getString("message");
            String group = bundle.getString("group");
            String groupName = bundle.getString("groupName");
            String tag = bundle.getString("tag");
            String largeIcon = bundle.getString("largeIcon");
            String roomIcon = bundle.getString("roomIcon");
            int sender_id = Integer.parseInt(Objects.requireNonNull(bundle.getString("sender_id")));
            int room_id = Integer.parseInt(Objects.requireNonNull(bundle.getString("room_id")));

            if (title == null) {
                ApplicationInfo appInfo = context.getApplicationInfo();
                title = context.getPackageManager().getApplicationLabel(appInfo).toString();
            }

//            channel_id = channel_id + "-" + importance;

            int visibility = NotificationCompat.VISIBILITY_PRIVATE;
        //     Uri receive =  RingtoneManager.getDefaultUri(R.raw.whoosh);
        //    if(msg_type.contains("txt")){
        //        receive = RingtoneManager.getDefaultUri(R.raw.whoosh);
        //    }else{
        //        receive = RingtoneManager.getDefaultUri(R.raw.buzz);
        //    }
            Log.i("msg_type",msg_type);
//            switch(msg_type){
//                case "msg":
//                    receive = RingtoneManager.getDefaultUri(R.raw.whoosh);
//                    break;
//                case "dindon":
//                    receive = RingtoneManager.getDefaultUri(R.raw.buzz);
//                    break;
//            }
            RemoteViews collapsedView = new RemoteViews(context.getPackageName(), R.layout.notification_small);
            collapsedView.setImageViewResource(R.id.big_icon, R.drawable.ic_launcher);
            assert group != null;
            collapsedView.setTextViewText(R.id.content_title, title);
            collapsedView.setTextViewText(R.id.timestamp, DateUtils.formatDateTime(context, System.currentTimeMillis(), DateUtils.FORMAT_SHOW_TIME));
            collapsedView.setTextViewText(R.id.content_text, body);
            AppWidgetTarget awt = new AppWidgetTarget(context, R.id.big_icon, collapsedView,1) {
                @Override
                public void onResourceReady(@NonNull Bitmap resource, Transition<? super Bitmap> transition) {
                    super.onResourceReady(resource, transition);
                }
            };
            RequestOptions options = new RequestOptions()
                    .override(300, 300)
                    .placeholder(R.drawable.ic_launcher)
                    .error(R.drawable.ic_launcher);
            Glide.with(context.getApplicationContext())
                    .asBitmap()
                    .load(largeIcon)
                    .apply(options)
                    .transform(new CenterCrop(),new RoundedCorners(150))
                    .into(awt);
            Log.i("MSG_TYPE_EQ", String.valueOf(msg_type.contains("dindon")));
            AudioAttributes audioAttributes = new AudioAttributes.Builder()
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .setUsage(AudioAttributes.USAGE_NOTIFICATION)
                    .build();
            Uri soundUri = Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://"+ context.getPackageName() + "/" + R.raw.whoosh);
           if(msg_type.contains("dindon")){
               soundUri = Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://"+ context.getPackageName() + "/" + R.raw.buzz);
           }else{
               soundUri = Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://"+ context.getPackageName() + "/" + R.raw.whoosh);
           }
            NotificationCompat.Builder notification = new NotificationCompat.Builder(context, channel_id)
                    .setTicker(bundle.getString("ticker"))
                    .setVisibility(visibility)
                    .setPriority(NotificationCompat.PRIORITY_HIGH)
                    .setSound(soundUri)
//                    .setSound(Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://"+ context.getPackageName() + "/" + R.raw.buzz))
                    .setContentText(bundle.getString("message"))
                    .setStyle(new NotificationCompat.DecoratedCustomViewStyle())
                    .setCustomContentView(collapsedView)
                    .setContentTitle(groupName)
                    .setGroup(String.valueOf(room_id))
                    .setAutoCancel(true);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) { // API 26 and higher
                notification.setDefaults(Notification.DEFAULT_LIGHTS);
                // setSound(soundUri)
            }

            int smallIconResId;
            int largeIconResId;

            String smallIcon = bundle.getString("smallIcon");

            if (smallIcon != null) {
                smallIconResId = res.getIdentifier(smallIcon, "mipmap", packageName);
            } else {
                smallIconResId = res.getIdentifier("ic_notification", "mipmap", packageName);
            }

            if (smallIconResId == 0) {
                smallIconResId = res.getIdentifier("ic_launcher", "mipmap", packageName);

                if (smallIconResId == 0) {
                    smallIconResId = android.R.drawable.ic_dialog_info;
                }
            }

            if (largeIcon != null) {
                largeIconResId = res.getIdentifier(largeIcon, "mipmap", packageName);
            } else {
                largeIconResId = res.getIdentifier("ic_launcher", "mipmap", packageName);
            }

            Bitmap largeIconBitmap = BitmapFactory.decodeResource(res, largeIconResId);

            if (largeIconResId != 0 && (largeIcon != null || Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP)) {
                notification.setLargeIcon(largeIconBitmap);
            }

            notification.setSmallIcon(smallIconResId);
            Intent intent = new Intent(context, intentClass);
            intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            bundle.putBoolean("userInteraction", true);
            intent.putExtra("notification", bundle);

//            Uri soundUri = null;

            if (!bundle.containsKey("playSound") || bundle.getBoolean("playSound")) {
//                soundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);

                String soundName = bundle.getString("soundName");

//                if (soundName != null) {
//                    if (!"default".equalsIgnoreCase(soundName)) {
//
//                        // sound name can be full filename, or just the resource name.
//                        // So the strings 'my_sound.mp3' AND 'my_sound' are accepted
//                        // The reason is to make the iOS and android javascript interfaces compatible
//
//                        int resId;
//                        if (context.getResources().getIdentifier(soundName, "raw", context.getPackageName()) != 0) {
//                            resId = context.getResources().getIdentifier(soundName, "raw", context.getPackageName());
//                        } else {
//                            soundName = soundName.substring(0, soundName.lastIndexOf('.'));
//                            resId = context.getResources().getIdentifier(soundName, "raw", context.getPackageName());
//                        }
////                        soundUri = Uri.parse("android.resource://" + context.getPackageName() + "/" + resId);
////                        Log.i("SOUND", String.valueOf(soundUri));
////                        notification.setSound(soundUri);
//                    }
//                }

            }

            if (bundle.containsKey("ongoing") || bundle.getBoolean("ongoing")) {
                notification.setOngoing(bundle.getBoolean("ongoing"));
            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                notification.setCategory(NotificationCompat.CATEGORY_CALL);

                String color = bundle.getString("color");
                int defaultColor = this.config.getNotificationColor();
                if (color != null) {
                    notification.setColor(Color.parseColor(color));
                } else if (defaultColor != -1) {
                    notification.setColor(defaultColor);
                }
            }

            int notificationID = Integer.parseInt(notificationIdString);

            PendingIntent pendingIntent = PendingIntent.getActivity(context, notificationID, intent,
                    PendingIntent.FLAG_UPDATE_CURRENT);

            NotificationManager notificationManager = notificationManager();

            long[] vibratePattern = new long[]{0};

            if (!bundle.containsKey("vibrate") || bundle.getBoolean("vibrate")) {
                long vibration = bundle.containsKey("vibration") ? (long) bundle.getDouble("vibration") : DEFAULT_VIBRATION;
                if (vibration == 0)
                    vibration = DEFAULT_VIBRATION;

            //    channel_id = channel_id + "-" + vibration;

                vibratePattern = new long[]{0, vibration};

                notification.setVibrate(vibratePattern);
            }

//            checkOrCreateChannel(notificationManager, channel_id, soundUri, importance, vibratePattern);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
                {
                  if(msg_type.equals("txt")) { 
                      NotificationChannel channel = new NotificationChannel(
                            channel_id,
                            "Channel human readable title",
                            NotificationManager.IMPORTANCE_DEFAULT);
                     channel.setSound(Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://"+ context.getPackageName() + "/" + R.raw.whoosh), audioAttributes);
                    notificationManager.createNotificationChannel(channel);
                    notification.setChannelId(channel_id);
                   }else
                   {
                    NotificationChannel channel = new NotificationChannel(
                            channel_id = channel_id + "-" + "buzz",
                            "Channel human readable title",
                            NotificationManager.IMPORTANCE_DEFAULT);
                     channel.setSound(Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://"+ context.getPackageName() + "/" + R.raw.buzz), audioAttributes);
                    notificationManager.createNotificationChannel(channel);
                    notification.setChannelId(channel_id);
                   }
                }
            notification.setContentIntent(pendingIntent);
            notification.setFullScreenIntent(pendingIntent,true);

            JSONArray actionsArray = null;
            try {
                actionsArray = bundle.getString("actions") != null ? new JSONArray(bundle.getString("actions")) : null;
            } catch (JSONException e) {
                Log.e(LOG_TAG, "Exception while converting actions to JSON object.", e);
            }

            if (actionsArray != null) {
                // No icon for now. The icon value of 0 shows no icon.
                int icon = 0;

                // Add button for each actions.
                for (int i = 0; i < actionsArray.length(); i++) {
                    String action;
                    try {
                        action = actionsArray.getString(i);
                    } catch (JSONException e) {
                        Log.e(LOG_TAG, "Exception while getting action from actionsArray.", e);
                        continue;
                    }

                    Intent actionIntent = new Intent(context, intentClass);
                    actionIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                    actionIntent.setAction(packageName + "." + action);

                    // Add "action" for later identifying which button gets pressed.
                    bundle.putString("action", action);
                    actionIntent.putExtra("notification", bundle);
                    actionIntent.setPackage(packageName);

                    PendingIntent pendingActionIntent = PendingIntent.getActivity(context, notificationID, actionIntent,
                            PendingIntent.FLAG_UPDATE_CURRENT);
                    notification.addAction(icon, action, pendingActionIntent);
                }
            }

            // Remove the notification from the shared preferences once it has been shown
            // to avoid showing the notification again when the phone is rebooted. If the
            // notification is not removed, then every time the phone is rebooted, we will
            // try to reschedule all the notifications stored in shared preferences and since
            // these notifications will be in the past time, they will be shown immediately
            // to the user which we shouldn't do. So, remove the notification from the shared
            // preferences once it has been shown to the user. If it is a repeating notification
            // it will be scheduled again.
            if (!(this.isApplicationInForeground(context) && bundle.getBoolean("ignoreInForeground"))) {
                Notification summaryNotification =
                        new NotificationCompat.Builder(context, channel_id)
                                .setContentTitle(groupName)
                                //set content text to support devices running API level < 24
                                .setContentText("Two new messages")
                                .setSmallIcon(R.drawable.ic_launcher)
                                //build summary info into InboxStyle template
                                .setStyle(new NotificationCompat.InboxStyle()
                                        .addLine(title)
                                        .setBigContentTitle("2 new messages")
                                        .setSummaryText(groupName))
                                //specify which group this notification belongs to
                                .setGroup(String.valueOf(room_id))
                            //    .setSound(receive)
                                //set this notification as the summary for the group
                                .setGroupSummary(true)
                                .setAutoCancel(true)
                                .build();
                ImageRequest imageRequest = ImageRequest.fromUri(roomIcon);
                ImagePipeline imagePipeline = Fresco.getImagePipeline();
                DataSource<CloseableReference<CloseableImage>> dataSource = imagePipeline.fetchDecodedImage(imageRequest, null);
                dataSource.subscribe(
                        new BaseBitmapDataSubscriber() {

                            @Override
                            protected void onNewResultImpl(Bitmap bitmap) {
                                notification.setLargeIcon(bitmap);
                                Notification info = notification.build();
                                info.defaults |= Notification.DEFAULT_LIGHTS;
                                assert tag != null;
                                if (!tag.equals("")) {
                                    notificationManager.notify(sender_id, info);
                                } else {
                                    notificationManager.notify(room_id+'0'+sender_id, info);
                                    notificationManager.notify(room_id, summaryNotification);
                                }
                            }

                            @Override
                            protected void onFailureImpl(DataSource<CloseableReference<CloseableImage>> dataSource) {
                                // In general, failing to fetch the image should not keep us from displaying the
                                // notification. We proceed without the bitmap.
                                notification.setLargeIcon(null);
                                Notification info = notification.build();
                                assert tag != null;
                                if (!tag.equals("")) {
                                    notificationManager.notify(sender_id, info);
                                } else {
                                    notificationManager.notify(room_id+'0'+sender_id, info);
                                    notificationManager.notify(room_id, summaryNotification);
                                }
                            }
                        },
                        UiThreadImmediateExecutorService.getInstance()
                );

            }

            // Can't use setRepeating for recurring notifications because setRepeating
            // is inexact by default starting API 19 and the notifications are not fired
            // at the exact time. During testing, it was found that notifications could
            // late by many minutes.
        } catch (Exception e) {
            Log.e(LOG_TAG, "failed to send push notification", e);
        }
    }

    private NotificationManager notificationManager() {
        return (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
    }
//String letter to integer
    public static Long getNumericReferenceNumber(String str) {

        String result = "";

        for (int i = 0; i < str.length(); i++) {

            char ch = str.charAt(i);

            if (Character.isLetter(ch)) {
                char initialCharacter = Character.isUpperCase(ch) ? 'A' : 'a';
                result = result.concat(String.valueOf((ch - initialCharacter + 1)));
            } else result = result + ch;
        }

        return Long.parseLong(result);
    }
    private boolean isApplicationInForeground(Context context) {
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<RunningAppProcessInfo> processInfos = activityManager.getRunningAppProcesses();
        if (processInfos != null) {
            for (RunningAppProcessInfo processInfo : processInfos) {
                if (processInfo.processName.equals(context.getPackageName())
                    && processInfo.importance == RunningAppProcessInfo.IMPORTANCE_FOREGROUND
                    && processInfo.pkgList.length > 0) {
                    return true;
                }
            }
        }
        return false;
    }

}
