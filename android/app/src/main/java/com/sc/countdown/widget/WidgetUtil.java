package com.sc.countdown.widget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.RemoteViews;

import com.sc.countdown.MainActivity;
import com.sc.countdown.R;
import com.sc.countdown.utils.SpUtil;

/**
 * Created by xieshangwu on 2018/4/22
 */

public class WidgetUtil {

    private static String ORANGE = "#F2661C";
    private static String CYAN = "#B4C6D2";

    private static String RED = "#FB565A";
    private static String YELLOW = "#F7A538";
    private static String BLUE = "#51B7F4";
    private static String PURPLE = "#CF81E1";
    private static String GREEN = "#73CF4B";
    private static String GRAY = "#A5A5A5";

    /**
     * 设置widget界面
     *
     * @param c
     * @param context
     * @param widgetBean
     */
    public static void updateWidget(Class c, Context context, WidgetBean widgetBean) {
        int appWidgetId = widgetBean.appWidgetId;
        RemoteViews remoteViews = new RemoteViews(context.getPackageName(), R.layout.timer_widget);
        if(TextUtils.isEmpty(widgetBean.id)) {
            Intent intent = new Intent(context, MainActivity.class);
            intent.setAction(Actions.SELECT);
            intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
            PendingIntent pendingIntent = PendingIntent.getActivity(context, appWidgetId, intent, 0);
            remoteViews.setOnClickPendingIntent(R.id.widget, pendingIntent);
        } else {
            long timestamp = widgetBean.timestamp;
            remoteViews.setTextViewText(R.id.title, widgetBean.name);
            remoteViews.setInt(R.id.title, "setBackgroundResource", getTitleColor(timestamp,
                    widgetBean.color));
            remoteViews.setInt(R.id.image, "setVisibility", View.GONE);
            remoteViews.setInt(R.id.textContainer, "setVisibility", View.VISIBLE);
            int day = getDay(timestamp);

            remoteViews.setTextViewText(R.id.day, day + "");
            remoteViews.setTextViewText(R.id.unit, "天");
            remoteViews.setTextColor(R.id.day, getColor(timestamp));
            remoteViews.setTextColor(R.id.unit, getColor(timestamp));

            Intent intent = new Intent(context, MainActivity.class);
            intent.setAction(Actions.DETAIL);
            intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
            PendingIntent pendingIntent = PendingIntent.getActivity(context, appWidgetId, intent,
                    0);
            remoteViews.setOnClickPendingIntent(R.id.widget, pendingIntent);
            saveData(widgetBean);
        }

        AppWidgetManager.getInstance(context).updateAppWidget(appWidgetId, remoteViews);
    }

    private static void saveData(WidgetBean widgetBean) {
        SpUtil.putInt(WidgetBean.KEY_APPWIDGETID + widgetBean.appWidgetId, widgetBean.appWidgetId);
        SpUtil.putString(WidgetBean.KEY_ID + widgetBean.appWidgetId, widgetBean.id);
        SpUtil.putString(WidgetBean.KEY_NAME + widgetBean.appWidgetId, widgetBean.name);
        SpUtil.putLong(WidgetBean.KEY_TIMESTAMP + widgetBean.appWidgetId, widgetBean.timestamp);
        SpUtil.putString(WidgetBean.KEY_COLOR + widgetBean.appWidgetId, widgetBean.color);
    }

    public static WidgetBean getWidgetBean(int appWidgetId) {
        WidgetBean widgetBean = new WidgetBean();
        int widgetId = SpUtil.getInt(WidgetBean.KEY_APPWIDGETID + appWidgetId, -1);
        widgetBean.appWidgetId = appWidgetId;
        if(widgetId != -1) {
            widgetBean.id = SpUtil.getString(WidgetBean.KEY_ID + appWidgetId);
            widgetBean.name = SpUtil.getString(WidgetBean.KEY_NAME + appWidgetId);
            widgetBean.timestamp = SpUtil.getLong(WidgetBean.KEY_TIMESTAMP + appWidgetId);
            widgetBean.color = SpUtil.getString(WidgetBean.KEY_COLOR + appWidgetId);
            Log.e("xieshangwu", widgetBean.toString());
        }
        return widgetBean;
    }

    /**
     * 获取剩余时间
     *
     * @param timestamp
     * @return
     */
    private static int getDay(long timestamp) {
        long time = System.currentTimeMillis();

        int day = (int) ((time - timestamp) / (1000 * 60 * 60 * 24));
        if(timestamp > time) {
            day++;
        }

        return Math.abs(day);
    }

    public static int getColor(long timestamp) {
        if(timestamp > System.currentTimeMillis()) {
            return Color.parseColor(ORANGE);
        } else {
            return Color.parseColor(CYAN);
        }
    }

    /**
     * 返回背景颜色
     */
    public static int getTitleColor(long timestamp, String color) {
        try {
            if(!TextUtils.isEmpty(color)) {
                if(color.equalsIgnoreCase(RED)) {
                    return R.drawable.widget_text_bg_red;
                } else if(color.equalsIgnoreCase(YELLOW)) {
                    return R.drawable.widget_text_bg_yellow;
                } else if(color.equalsIgnoreCase(BLUE)) {
                    return R.drawable.widget_text_bg_blue;
                } else if(color.equalsIgnoreCase(PURPLE)) {
                    return R.drawable.widget_text_bg_purple;
                } else if(color.equalsIgnoreCase(GREEN)) {
                    return R.drawable.widget_text_bg_green;
                } else if(color.equalsIgnoreCase(GRAY)) {
                    return R.drawable.widget_text_bg_gray;
                }
            }
        } catch(Exception e) {
            e.printStackTrace();
        }

        if(timestamp > System.currentTimeMillis()) {
            return R.drawable.widget_text_bg;
        } else {
            return R.drawable.widget_text_bg_cyan;
        }
    }
}
