package com.sc.countdown;

import android.app.Activity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by xieshangwu on 2018/3/21
 */

public class StatusBarPlus extends ReactContextBaseJavaModule {
    public StatusBarPlus(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "StatusBarPlus";
    }

    @ReactMethod
    public void setDarkContent() {
        final Activity activity = getCurrentActivity();
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
            }
        });
    }
}