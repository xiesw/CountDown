package com.sc.countdown.widget;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.os.Bundle;
import android.widget.RemoteViews;

import com.sc.countdown.R;

/**
 * Created by xieshangwu on 2018/4/22
 */

public class WidgetUtil {

    public static void select(Class c, Context context, Bundle bundle) {
        RemoteViews remoteViews
                = new RemoteViews(context.getPackageName(), bundle.getInt("appWidgetId"));
        remoteViews.setTextViewText(R.id.title, bundle.getString("name"));
        AppWidgetManager.getInstance(context).updateAppWidget(
                new ComponentName(context, c), remoteViews);
    }

}
