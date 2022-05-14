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

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.MediaPlayer;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.preference.PreferenceManager;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.RequiresApi;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.facebook.drawee.view.SimpleDraweeView;
import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class IncomingCallScreenActivity extends ReactActivity {

    private static final String TAG = "MessagingService";
    private Ringtone ringtone;
    private MediaPlayer mp;
    LocalBroadcastManager mLocalBroadcastManager;
    BroadcastReceiver mBroadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if(intent.getAction().equals("com.incomingcallscreenactivity.action.close")){
                finish();
            }
        }
    };
    @RequiresApi(api = Build.VERSION_CODES.P)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mLocalBroadcastManager = LocalBroadcastManager.getInstance(this);
        IntentFilter mIntentFilter = new IntentFilter();
        mIntentFilter.addAction("com.incomingcallscreenactivity.action.close");
        mLocalBroadcastManager.registerReceiver(mBroadcastReceiver, mIntentFilter);

        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN | WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON | WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
                | WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED | WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD);

        setContentView(R.layout.activity_call_incoming);

        Intent intent = getIntent();
        String call_type=intent.getStringExtra("MESSAGE_TYPE");
        String incomingCallDisconnect="calldisconnected";
        String incomingCallStart="incomingcall";
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(this);
        String notifMessageType = sharedPref.getString("NOTIF_MESSAGE_TYPE", "incomingcall");
        mp = MediaPlayer.create(this, R.raw.ringtone_vcall);

        //ringtoneManager start
        Uri incoming_call_notif = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);
//        this.ringtone= RingtoneManager.getRingtone(getApplicationContext(), incoming_call_notif);
        //ringtoneManager end

        if(notifMessageType.equals(incomingCallStart)){
//            ringtone.setLooping(true);
//            ringtone.play();
            mp.start();
        }
        else if(notifMessageType.equals(incomingCallDisconnect)){
            finish();
//            mp.stop();
        }

        String host_name = intent.getStringExtra("CALLER_NAME");
        String group_name = intent.getStringExtra("GROUP_NAME");
        String incoming_call_type=intent.getStringExtra("CALL_TYPE");
        String incoming_image =intent.getStringExtra("CALL_IMAGE");
        Boolean isAppRuning=intent.getBooleanExtra("APP_STATE",false);
        TextView tvName = (TextView)findViewById(R.id.callerName);
        TextView groupName = (TextView)findViewById(R.id.callStatus);
        SimpleDraweeView draweeView = (SimpleDraweeView) findViewById(R.id.iv_image);
        Uri imageUri = Uri.parse("https://storage.able.mn/main.php?g=bG9ZhEltYWdl&path=dXNlckl4b2jvbDIwMzU5NzguanBn&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteUhJRCI6MjAzNTk3OCwibXlDb21JZCI6Miwia2V5IjoiYWJsZXNvZnQiLCJicm93c2VyIjoiQ2hyb21lIiwiYnJvd3NlclZlciI6Ijg3LjAuNDI4MC44OCIsIm9zIjoiTWFjIE9TIFgiLCJvc1R5cGUiOm51bGwsImxvY2F0aW9uIjoiVWxhbiBCYXRvcixNTig0Ny45MDc3LDEwNi44ODMyKSIsImNsaWVudElQIjoiMTUwLjEyOS4xNDMuMTc0IiwiY2xpZW50VHlwZSI6IndlYiIsInNjcmVlbldpZHRoIjoxMjgwLCJzY3JlZW5IZWlnaHQiOjgwMCwiaWF0IjoxNjA5OTg4Mjk4fQ.0OmrPimv7gWzdP7z4hcUyKgSodusB_ZYbufycNBluF0&cloudDir=1");
        draweeView.setImageURI(imageUri);
        tvName.setText(host_name);
        groupName.setText(group_name);

        //

        final ReactContext reactContext = getReactInstanceManager().getCurrentReactContext();

        ImageButton acceptCallBtn = (ImageButton) findViewById(R.id.accept_call_btn);
        acceptCallBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                WritableMap params = Arguments.createMap();
                params.putBoolean("done", true);
                params.putString("call_type",incoming_call_type);

                if(isAppRuning){
                    Intent intent = new Intent(IncomingCallScreenActivity.this, MainActivity.class);
                    intent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
                    intent.putExtra("CALL_TYPE",incoming_call_type);
                    finish();
                    startActivity(intent);
                    sendEvent(reactContext, "accept", params);
                }
                else{
                    sendEvent(reactContext, "accept", params);
                    finish();
                }
            }
        });

        ImageButton rejectCallBtn = (ImageButton) findViewById(R.id.reject_call_btn);
        rejectCallBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                WritableMap params = Arguments.createMap();
                params.putBoolean("done", true);
                params.putString("call_type",incoming_call_type);
                onDisconnected();
                if(isAppRuning){
                    Intent intent = new Intent(IncomingCallScreenActivity.this, MainActivity.class);
                    intent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY );
                    intent.putExtra("CALL_TYPE",incoming_call_type);
                    finish();
                    startActivity(intent);
                }
                else{
                    sendEvent(reactContext, "reject", params);
                    finish();
                }
            }
        });

        Handler handler = new Handler();

        handler.postDelayed(new Runnable() {
            public void run() {
                finish();
            }
        }, 45000);

    }
    public Bitmap getBitmapFromURL(String imageUrl) {
        try {
            URL url = new URL(imageUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            Bitmap myBitmap = BitmapFactory.decodeStream(input);
            return myBitmap;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }


    @Override
    public void onDestroy() {
        super.onDestroy();
        mLocalBroadcastManager.unregisterReceiver(mBroadcastReceiver);
        mp.stop();
    }

    private void onDisconnected() {
//do something
    }

    private void sendEvent(ReactContext reactContext, String eventName, WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}