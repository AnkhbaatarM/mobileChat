package com.ablechat;

import android.app.Application;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import androidx.annotation.RequiresApi;

import com.dieam.reactnativepushnotification.modules.RNPushNotificationHelper;

import static com.dieam.reactnativepushnotification.modules.RNPushNotification.LOG_TAG;

public class PushNotificationPublisher extends BroadcastReceiver {
    final static String NOTIFICATION_ID = "notificationId";

    @RequiresApi(api = Build.VERSION_CODES.N)
    @Override
    public void onReceive(Context context, Intent intent) {
        int id = intent.getIntExtra(NOTIFICATION_ID, 0);
        long currentTime = System.currentTimeMillis();

        Log.i(LOG_TAG, "NotificationPublisher: Prepare To Publish: " + id + ", Now Time: " + currentTime);

        Application applicationContext = (Application) context.getApplicationContext();

        new RNPushNotificationHelper(applicationContext)
                .sendToNotificationCentre(intent.getExtras());
    }
}
