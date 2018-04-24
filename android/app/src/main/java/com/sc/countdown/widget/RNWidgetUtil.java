package com.sc.countdown.widget;

import android.appwidget.AppWidgetManager;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

/**
 * Created by xieshangwu on 2018/3/21
 */

public class RNWidgetUtil extends ReactContextBaseJavaModule {
    // pain.todo context 优化
    public static ReactApplicationContext reactApplicationContext;

    public RNWidgetUtil(ReactApplicationContext reactContext) {
        super(reactContext);
        Log.e("xieshangwu", "RNWidgetUtil init");
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
        String color = map.getString("color");

        Intent intent = new Intent();
        WidgetBean widgetBean = new WidgetBean(appWidgetId, id, name, timestamp, color);
        intent.putExtra("data", widgetBean);
        intent.setAction(Actions.WIDGET_SELECT);

        Log.e("xieshangwu", widgetBean.toString());

        reactApplicationContext.sendBroadcast(intent);
    }

    @ReactMethod
    public void onDetail(ReadableMap map) {
    }
}