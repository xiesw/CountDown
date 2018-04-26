package com.sc.countdown.widget;

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
    ReactApplicationContext reactApplicationContext;

    public RNWidgetUtil(ReactApplicationContext reactContext) {
        super(reactContext);
        Log.e("xieshangwu", "RNWidgetUtil init");
        this.reactApplicationContext = reactContext;
        sendContextBroadcast(reactContext);
    }

    /**
     * 发送reactContext初始化完成broadcast
     */
    private void sendContextBroadcast(ReactApplicationContext reactContext) {
        Intent intent = new Intent();
        intent.setAction("com.alreadyLoading");      //设置Action
        reactContext.sendBroadcast(intent);
    }

    @Override
    public String getName() {
        return "RNWidgetUtil";
    }

    /**
     * js 调用app 选择
     */
    @ReactMethod
    public void onSelect(ReadableMap map) {
        int appWidgetId = map.getInt(WidgetBean.KEY_APPWIDGETID);
        sendBroadcast(Actions.WIDGET_SELECT, map, appWidgetId);
    }

    /**
     * ja 调用app 更新
     */
    @ReactMethod
    public void onUpdate(ReadableMap map) {
        int appWidgetId = -1;
        sendBroadcast(Actions.WIDGET_UPDATE, map, appWidgetId);
    }

    /**
     * 向weiget发送广播
     * @param map
     * @param appWidgetId
     */
    private void sendBroadcast(String action, ReadableMap map, int appWidgetId) {
        String id = map.getString("id");
        String name = map.getString("name");
        double d = map.getDouble("timestamp");
        long timestamp = (long) d;
        String color = map.getString("color");

        Intent intent = new Intent();
        WidgetBean widgetBean = new WidgetBean(appWidgetId, id, name, timestamp, color);
        intent.putExtra("data", widgetBean);
        intent.setAction(action);

        reactApplicationContext.sendBroadcast(intent);
    }

}