package com.ablechat;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;

import androidx.core.content.res.ResourcesCompat;

import com.dieam.reactnativepushnotification.modules.RNPushNotification;

class PushNotificationConfig {
    private static final String KEY_CHANNEL_NAME = "com.dieam.reactnativepushnotification.notification_channel_name";
    private static final String KEY_CHANNEL_DESCRIPTION = "com.dieam.reactnativepushnotification.notification_channel_description";
    private static final String KEY_NOTIFICATION_FOREGROUND = "com.dieam.reactnativepushnotification.notification_foreground";
    private static final String KEY_NOTIFICATION_COLOR = "com.dieam.reactnativepushnotification.notification_color";

    private static Bundle metadata;
    private Context context;

    public PushNotificationConfig(Context context) {
        this.context = context;
        if (metadata == null) {
            try {
                ApplicationInfo applicationInfo = context.getPackageManager().getApplicationInfo(context.getPackageName(), PackageManager.GET_META_DATA);
                metadata = applicationInfo.metaData;
            } catch (PackageManager.NameNotFoundException e) {
                e.printStackTrace();
                Log.e(RNPushNotification.LOG_TAG, "Error reading application meta, falling back to defaults");
                metadata = new Bundle();
            }
        }
    }

    public String getChannelName() {
        try {
            final String name = metadata.getString(KEY_CHANNEL_NAME);
            if (name != null && name.length() > 0) {
                return name;
            }
        } catch (Exception e) {
            Log.w(RNPushNotification.LOG_TAG, "Unable to find " + KEY_CHANNEL_NAME + " in manifest. Falling back to default");
        }
        // Default
        return "rn-push-notification-channel";
    }
    public String getChannelDescription() {
        try {
            final String description = metadata.getString(KEY_CHANNEL_DESCRIPTION);
            if (description != null) {
                return description;
            }
        } catch (Exception e) {
            Log.w(RNPushNotification.LOG_TAG, "Unable to find " + KEY_CHANNEL_DESCRIPTION + " in manifest. Falling back to default");
        }
        // Default
        return "";
    }

    public int getNotificationColor() {
        try {
            int resourceId = metadata.getInt(KEY_NOTIFICATION_COLOR);
            return ResourcesCompat.getColor(context.getResources(), resourceId, null);
        } catch (Exception e) {
            Log.w(RNPushNotification.LOG_TAG, "Unable to find " + KEY_NOTIFICATION_COLOR + " in manifest. Falling back to default");
        }
        // Default
        return -1;
    }

    public boolean getNotificationForeground() {
        try {
            return metadata.getBoolean(KEY_NOTIFICATION_FOREGROUND, false);
        } catch (Exception e) {
            Log.w(RNPushNotification.LOG_TAG, "Unable to find " + KEY_NOTIFICATION_FOREGROUND + " in manifest. Falling back to default");
        }
        // Default
        return false;
    }
}
