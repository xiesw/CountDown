package com.sc.countdown.widget;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.sc.countdown.MainApplication;

/**
 * Created by xieshangwu on 2018/4/22
 */

public class EventEmitter {

    static public void goSelect() {
        sendEvent(new ReactApplicationContext(MainApplication.getApplication()
                .getApplicationContext()), "goSelect", null);
    }

    static private void sendEvent(ReactContext reactContext, String eventName, WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

}
