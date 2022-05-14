package com.ablechat;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.ContentResolver;
import android.media.AudioAttributes;
import android.net.Uri;
import android.os.Build;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import com.facebook.react.ReactActivityDelegate;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.facebook.react.ReactRootView;
import com.facebook.react.ReactActivity;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
      return new ReactActivityDelegate(this, getMainComponentName()) {
          @Override
          protected ReactRootView createRootView() {
              if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//                  NotificationChannel notificationChannel = new NotificationChannel("new_msg", "My Emailer", NotificationManager.IMPORTANCE_HIGH);
//                  notificationChannel.setShowBadge(true);
//                  notificationChannel.setDescription("");
//                  AudioAttributes att = new AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_NOTIFICATION)
//                          .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
//                          .build();
//                    notificationChannel.setSound(Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + getPackageName() + "/raw/whoosh"), att);
//                    notificationChannel.enableVibration(true);
//                    notificationChannel.setVibrationPattern(new long[]{400, 400});
//                    notificationChannel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);
//                  NotificationManager manager = getSystemService(NotificationManager.class);
//                  manager.createNotificationChannel(notificationChannel);

                  NotificationChannel buzzNotificationChannel = new NotificationChannel("new_buzz", "My Emailer", NotificationManager.IMPORTANCE_HIGH);
                  buzzNotificationChannel.setShowBadge(true);
                  buzzNotificationChannel.setDescription("");
                  AudioAttributes buzzAtt = new AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_NOTIFICATION)
                          .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                          .build();
                          buzzNotificationChannel.setSound(Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + getPackageName() + "/raw/buzz"), buzzAtt);
                          buzzNotificationChannel.enableVibration(true);
                          buzzNotificationChannel.setVibrationPattern(new long[]{400, 400});
                          buzzNotificationChannel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);
                  NotificationManager buzzManager = getSystemService(NotificationManager.class);
                  buzzManager.createNotificationChannel(buzzNotificationChannel);
        }

              return new RNGestureHandlerEnabledRootView(MainActivity.this);
          }
      };
  }
  @Override
  protected String getMainComponentName() {
    return "AbleChat";
  }
   @Override
    public void invokeDefaultOnBackPressed() {
        moveTaskToBack(true);
    }
}
