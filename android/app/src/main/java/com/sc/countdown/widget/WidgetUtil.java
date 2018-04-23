package com.sc.countdown.widget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.RemoteViews;

import com.sc.countdown.MainActivity;
import com.sc.countdown.R;

/**
 * Created by xieshangwu on 2018/4/22
 */

public class WidgetUtil {

    private static int sColor;

    /**
     * 设置widget界面
     *
     * @param c
     * @param context
     * @param bundle
     */
    public static void select(Class c, Context context, Bundle bundle) {
        int appWidgetId = bundle.getInt(AppWidgetManager.EXTRA_APPWIDGET_ID);
        long timestamp = bundle.getLong("timestamp");
        RemoteViews remoteViews = new RemoteViews(context.getPackageName(), R.layout.timer_widget);
        remoteViews.setTextViewText(R.id.title, bundle.getString("name"));
        remoteViews.setInt(R.id.title, "setBackgroundColor", Color.parseColor(bundle.getString("color")));
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
        PendingIntent pendingIntent = PendingIntent.getActivity(context, appWidgetId, intent, 0);
        remoteViews.setOnClickPendingIntent(R.id.widget, pendingIntent);

        AppWidgetManager.getInstance(context)
                .updateAppWidget(appWidgetId, remoteViews);
    }

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
            return Color.parseColor("#F2661C");
        } else {
            return Color.parseColor("#B4C6D2");
        }
    }
}
