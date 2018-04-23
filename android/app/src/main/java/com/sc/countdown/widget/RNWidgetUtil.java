package com.sc.countdown.widget;

import android.appwidget.AppWidgetManager;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by xieshangwu on 2018/3/21
 */

public class RNWidgetUtil extends ReactContextBaseJavaModule {
    // pain.todo context 优化
    static ReactApplicationContext reactApplicationContext;

    public RNWidgetUtil(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactApplicationContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNWidgetUtil";
    }

    @ReactMethod
    public void onSelect(ReadableMap map) {
        int appWidgetId = map.getInt(AppWidgetManager.EXTRA_APPWIDGET_ID);
        String id = map.getString("id");
        String name = map.getString("name");
        double d = map.getDouble("timestamp");
        long timestamp = (long) d;
        String repeat = map.getString("repeat");
        boolean top = map.getBoolean("top");
        String color = map.getString("color");

        Intent intent = new Intent();
        Bundle bundle = new Bundle();
        bundle.putInt(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        bundle.putString("id",id);
        bundle.putString("name",name);
        bundle.putLong("timestamp",timestamp);
        bundle.putString("repeat",repeat);
        bundle.putBoolean("top",top);
        bundle.putString("color",color);
        bundle.putString("name",name);
        intent.putExtra("bundle", bundle);
        intent.setAction(Actions.WIDGET_SELECT);
        reactApplicationContext.sendBroadcast(intent);
    }

    @ReactMethod
    public void onDetail(ReadableMap map) {
        Log.e("xieshangwu", map.getString("id"));
        Log.e("xieshangwu", map.getString("name"));
        double d = map.getDouble("timestamp");
        Log.e("xieshangwu", "" + (long)d);
        Log.e("xieshangwu", "" + map.getDouble("timestamp"));
        Log.e("xieshangwu", map.getString("repeat"));
        Log.e("xieshangwu","" + map.getBoolean("top"));
        Log.e("xieshangwu", map.getString("color"));
    }

    static public void goSelect(int appWidgetId) {
        WritableMap map =  Arguments.createMap();
        map.putInt(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
        sendEvent(reactApplicationContext, "goSelect", map);
    }

    static private void sendEvent(ReactContext reactContext, String eventName, WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}