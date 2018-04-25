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

    static public void select(int appWidgetId) {
        final WritableMap map = Arguments.createMap();
        map.putInt(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        Log.e("xieshangwu", "EventEmitter select");
        sendEvent(RNWidgetUtil.reactApplicationContext, "select", map);
    }

    static public void detail(String id) {
        final WritableMap map = Arguments.createMap();
        map.putString(WidgetBean.KEY_ID, id);
        Log.e("xieshangwu", "EventEmitter detail");
        sendEvent(RNWidgetUtil.reactApplicationContext, "detail", map);
    }

    static public void cancel() {
        Log.e("xieshangwu", "EventEmitter cancel");
        sendEvent(RNWidgetUtil.reactApplicationContext, "cancel", Arguments.createMap());
    }


    static private void sendEvent(ReactContext reactContext, String eventName, WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }


}
