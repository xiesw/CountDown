package com.sc.countdown.widget;

import android.appwidget.AppWidgetManager;

import java.io.Serializable;

/**
 * Created by xieshangwu on 2018/4/24
 */

public class WidgetBean implements Serializable{

    private static final long serialVersionUID = 1L;

    public static final String KEY_APPWIDGETID = "appWidgetId";
    public static final String KEY_ID = "id";
    public static final String KEY_NAME = "name";
    public static final String KEY_TIMESTAMP = "timestamp";
    public static final String KEY_COLOR = "color";
    public static final String KEY_DATA = "data";

    public int appWidgetId = AppWidgetManager.INVALID_APPWIDGET_ID;
    public String id = "";
    public String name = "";
    public long timestamp = 0;
    public String color = "";

    public WidgetBean() {

    }

    public WidgetBean(int appWidgetId,String id, String name, long timestamp, String color) {
        this.appWidgetId = appWidgetId;
        this.id = id;
        this.name = name;
        this.timestamp = timestamp;
        this.color = color;
    }

    @Override
    public String toString() {
        return "WidgetBean{" + "appWidgetId=" + appWidgetId + ", id='" + id + '\'' + ", name='" +
                name + '\'' + ", timestamp=" + timestamp + ", color='" + color + '\'' + '}';
    }
}