package com.sc.countdown.widget;

import android.appwidget.AppWidgetManager;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by xieshangwu on 2018/4/22
 */

public class EventEmitter {

    static public void goSelect(int appWidgetId) {
        final WritableMap map = Arguments.createMap();
        map.putInt(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        Log.e("xieshangwu", "EventEmitter goSelect");
        sendEvent(RNWidgetUtil.reactApplicationContext, "goSelect", map);
    }

    static private void sendEvent(ReactContext reactContext, String eventName, WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

}
