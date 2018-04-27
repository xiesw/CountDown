package com.sc.countdown;

import android.app.Activity;
import android.graphics.Color;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.sc.countdown.statusbar.StatusBarUtil;
import com.sc.countdown.utils.ConfigUtil;

/**
 * Created by xieshangwu on 2018/3/21
 */

public class RNAppUtil extends ReactContextBaseJavaModule {
    ReactApplicationContext reactApplicationContext;

    public RNAppUtil(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactApplicationContext = reactContext;
    }


    @Override
    public String getName() {
        return "RNAppUtil";
    }

    /**
     * 设置状态栏
     */
    @ReactMethod
    public void setStatusBar() {
        final Activity activity = getCurrentActivity();
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                StatusBarUtil.setStatusBar(activity, Color.parseColor("#FFFFFF"));
            }
        });
    }

    /**
     * 获取手机及app信息
     *
     * @param promise
     */
    @ReactMethod
    public void getAppInfo(Promise promise) {
        try {
            WritableMap result = Arguments.createMap();
            result.putString("appName", ConfigUtil.getAppName(getCurrentActivity()));
            result.putString("version", ConfigUtil.getAppVersionName(getCurrentActivity()));
            String deviceID = "";
            try {
                deviceID = ConfigUtil.getDeviceId();
            } catch(Exception e) {
                e.printStackTrace();
            }
            result.putString("deviceId", deviceID);
            result.putString("channel", ConfigUtil.getChannel(reactApplicationContext));
            result.putString("brand", ConfigUtil.getBrand(reactApplicationContext));
            promise.resolve(result);
        } catch(IllegalViewOperationException e) {
            promise.reject(e.getMessage());
        }
    }
}