package com.ablechat;

import android.app.ActivityManager;
import android.app.ActivityManager.RunningAppProcessInfo;
import android.app.Application;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import org.json.JSONObject;

import java.util.List;
import java.util.Map;
import java.util.Random;

import static android.content.Context.ACTIVITY_SERVICE;
import static com.dieam.reactnativepushnotification.modules.RNPushNotification.LOG_TAG;

public class ReceivedMessageHandler {
    private FirebaseMessagingService mFirebaseMessagingService;

    public ReceivedMessageHandler(@NonNull FirebaseMessagingService service) {
        this.mFirebaseMessagingService = service;
    }

    public void handleReceivedMessage(RemoteMessage message) {
        final Bundle bundle = new Bundle();
            String title = message.getData().get("title");
            String body = message.getData().get("body");
            String color = message.getData().get("color");
            String sound = message.getData().get("sound");
            String group = message.getData().get("group");
            String msg_type = message.getData().get("msg_type");
            String largeIcon = message.getData().get("largeIcon");
            String groupName = message.getData().get("groupName");
            String room_id = message.getData().get("room_id");
            String tag = message.getData().get("tag");
            String sender_id = message.getData().get("sender_id");
            String roomIcon = message.getData().get("roomIcon");
            String soundName = "whoosh";
            switch (msg_type){
                case "txt":
                    soundName ="whoosh";
                    break;
                case "dindon":
                    soundName ="buzz";
                    break;
            }
        Log.i("soundName",soundName);


        bundle.putString("title", title);
            bundle.putString("message", body);
            bundle.putString("sound", sound);
            bundle.putString("color", color);
            bundle.putString("group", group);
            bundle.putString("tag", tag);
            bundle.putBoolean("vibrate", true);
            bundle.putString("msg_type", msg_type);
            bundle.putString("largeIcon", largeIcon);
            bundle.putString("sender_id", sender_id);
            bundle.putBoolean("playSound", true);
            bundle.putString("soundName", soundName);
            bundle.putString("groupName", groupName);
            bundle.putString("room_id", room_id);
            bundle.putString("roomIcon", roomIcon);




        Map<String, String> notificationData = message.getData();

        // Copy `twi_body` to `message` to support Twilio
        if (notificationData.containsKey("twi_body")) {
            bundle.putString("message", notificationData.get("twi_body"));
        }
        JSONObject data = getPushData(notificationData.get("data"));
        Bundle dataBundle = new Bundle();
        for(Map.Entry<String, String> entry : notificationData.entrySet()) {
            dataBundle.putString(entry.getKey(), entry.getValue());
        }
        bundle.putParcelable("data", dataBundle);

        Log.v(LOG_TAG, "onMessageReceived: " + bundle);

        // We need to run this on the main thread, as the React code assumes that is true.
        // Namely, DevServerHelper constructs a Handler() without a Looper, which triggers:
        // "Can't create handler inside thread that has not called Looper.prepare()"
        Handler handler = new Handler(Looper.getMainLooper());
        handler.post(new Runnable() {
            @RequiresApi(api = Build.VERSION_CODES.N)
            public void run() {
                // Construct and load our normal React JS code bundle
                ReactInstanceManager mReactInstanceManager = ((ReactApplication) mFirebaseMessagingService.getApplication()).getReactNativeHost().getReactInstanceManager();
                ReactContext context = mReactInstanceManager.getCurrentReactContext();
                // If it's constructed, send a notificationre
                if (context != null) {
                    handleRemotePushNotification((ReactApplicationContext) context, bundle);
                } else {
                    // Otherwise wait for construction, then send the notification
                    mReactInstanceManager.addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
                        public void onReactContextInitialized(ReactContext context) {
                            handleRemotePushNotification((ReactApplicationContext) context, bundle);
                        }
                    });
                    if (!mReactInstanceManager.hasStartedCreatingInitialContext()) {
                        // Construct it in the background
                        mReactInstanceManager.createReactContextInBackground();
                    }
                }
            }
        });
    }

    private JSONObject getPushData(String dataString) {
        try {
            return new JSONObject(dataString);
        } catch (Exception e) {
            return null;
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    private void handleRemotePushNotification(ReactApplicationContext context, Bundle bundle) {

        // If notification ID is not provided by the user for push notification, generate one at random
        if (bundle.getString("id") == null) {
            Random randomNumberGenerator = new Random(System.currentTimeMillis());
            bundle.putString("id", String.valueOf(randomNumberGenerator.nextInt()));
        }

        PushNotificationConfig config = new PushNotificationConfig(mFirebaseMessagingService.getApplication());

        Boolean isForeground = isApplicationInForeground();

        PushNotificationJsDelivery jsDelivery = new PushNotificationJsDelivery(context);
        bundle.putBoolean("foreground", isForeground);
        bundle.putBoolean("userInteraction", true);
//        jsDelivery.notifyNotification(bundle);

        // If contentAvailable is set to true, then send out a remote fetch event
        if (bundle.getString("contentAvailable", "false").equalsIgnoreCase("true")) {
            jsDelivery.notifyRemoteFetch(bundle);
        }

        Log.v(LOG_TAG, "sendNotification: " + bundle);

        if (config.getNotificationForeground() || !isForeground) {
            Application applicationContext = (Application) context.getApplicationContext();
            PushNotificationHelper pushNotificationHelper = new PushNotificationHelper(applicationContext);
            pushNotificationHelper.sendToNotificationCentre(bundle);
        }
    }

    private boolean isApplicationInForeground() {
        ActivityManager activityManager = (ActivityManager) mFirebaseMessagingService.getSystemService(ACTIVITY_SERVICE);
        List<RunningAppProcessInfo> processInfos = activityManager.getRunningAppProcesses();
        if (processInfos != null) {
            for (RunningAppProcessInfo processInfo : processInfos) {
                if (processInfo.processName.equals(mFirebaseMessagingService.getPackageName())
                    && processInfo.importance == RunningAppProcessInfo.IMPORTANCE_FOREGROUND
                    && processInfo.pkgList.length > 0) {
                    return true;
                }
            }
        }
        return false;
    }

}
