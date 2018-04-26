package com.sc.countdown.widget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
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
     * 设置/更新widget界面
     */
    public static void updateWidget(Class c, Context context, WidgetBean widgetBean) {
        int appWidgetId = widgetBean.appWidgetId;
        RemoteViews remoteViews = new RemoteViews(context.getPackageName(), R.layout.timer_widget);
        if(TextUtils.isEmpty(widgetBean.id)) {
            Intent intent = new Intent(context, MainActivity.class);
            intent.setAction(Actions.APP_SELECT);
            intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
            PendingIntent pendingIntent = PendingIntent.getActivity(context, appWidgetId, intent,
                    PendingIntent.FLAG_UPDATE_CURRENT);
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
            remoteViews.setTextColor(R.id.day, getColor(timestamp));

            Intent intent = new Intent(context, MainActivity.class);
            intent.setAction(Actions.APP_DETAIL);
            intent.putExtra(WidgetBean.KEY_ID, widgetBean.id);
            PendingIntent pendingIntent = PendingIntent.getActivity(context, appWidgetId, intent,
                    PendingIntent.FLAG_UPDATE_CURRENT);
            remoteViews.setOnClickPendingIntent(R.id.widget, pendingIntent);
            saveData(widgetBean);
        }

        AppWidgetManager.getInstance(context).updateAppWidget(appWidgetId, remoteViews);
    }

    /**
     * 编辑后更新widget
     */
    public static void updateWidgetByEdit(Class c, Context context, WidgetBean widgetBean) {
        String id = widgetBean.id;
        ComponentName componentName = new ComponentName(context.getPackageName(), c.getName());
        int[] appWidgetIds = AppWidgetManager.getInstance(context).getAppWidgetIds(componentName);
        for(int appWidgetId : appWidgetIds) {
            String savedId = SpUtil.getString(WidgetBean.KEY_ID + appWidgetId);
            if(id.equals(savedId)) {
                widgetBean.appWidgetId = appWidgetId;
                updateWidget(c, context, widgetBean);
            }
        }
    }

    /**
     * 保存展示的数据
     */
    private static void saveData(WidgetBean widgetBean) {
        SpUtil.putInt(WidgetBean.KEY_APPWIDGETID + widgetBean.appWidgetId, widgetBean.appWidgetId);
        SpUtil.putString(WidgetBean.KEY_ID + widgetBean.appWidgetId, widgetBean.id);
        SpUtil.putString(WidgetBean.KEY_NAME + widgetBean.appWidgetId, widgetBean.name);
        SpUtil.putLong(WidgetBean.KEY_TIMESTAMP + widgetBean.appWidgetId, widgetBean.timestamp);
        SpUtil.putString(WidgetBean.KEY_COLOR + widgetBean.appWidgetId, widgetBean.color);

        Log.e("pain.xie saveData:", widgetBean.toString());
    }

    /**
     * 根据appWidgetId取出保存的的数据
     */
    protected static WidgetBean getWidgetBean(int appWidgetId) {
        WidgetBean widgetBean = new WidgetBean();
        int widgetId = SpUtil.getInt(WidgetBean.KEY_APPWIDGETID + appWidgetId, -1);
        widgetBean.appWidgetId = appWidgetId;
        if(widgetId != -1) {
            widgetBean.id = SpUtil.getString(WidgetBean.KEY_ID + appWidgetId);
            widgetBean.name = SpUtil.getString(WidgetBean.KEY_NAME + appWidgetId);
            widgetBean.timestamp = SpUtil.getLong(WidgetBean.KEY_TIMESTAMP + appWidgetId);
            widgetBean.color = SpUtil.getString(WidgetBean.KEY_COLOR + appWidgetId);
        }
        Log.e("pain.xie getWidgetBean:", widgetBean.toString());
        return widgetBean;
    }

    /**
     * 获取剩余天数
     */
    private static int getDay(long timestamp) {
        long time = System.currentTimeMillis();
        int day = (int) ((timestamp - time) / (1000 * 60 * 60 * 24));
        if(timestamp > time) {
            day++;
        }
        return Math.abs(day);
    }

    /**
     * 获得字体的颜色
     */
    private static int getColor(long timestamp) {
        if(timestamp > System.currentTimeMillis()) {
            return Color.parseColor(ORANGE);
        } else {
            return Color.parseColor(CYAN);
        }
    }

    /**
     * 返回标题背景颜色
     */
    private static int getTitleColor(long timestamp, String color) {
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
