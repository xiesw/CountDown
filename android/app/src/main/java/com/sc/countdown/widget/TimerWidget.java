package com.sc.countdown.widget;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

/**
 * Implementation of App Widget functionality.
 */
public class TimerWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int
            appWidgetId) {
        WidgetUtil.updateWidget(TimerWidget.class, context, WidgetUtil.getWidgetBean(appWidgetId));
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for(int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }

    @Override
    public void onDeleted(Context context, int[] appWidgetIds) {
        super.onDeleted(context, appWidgetIds);
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);

        if(AppWidgetManager.getInstance(context)
                .getAppWidgetIds(new ComponentName(context, TimerWidget.class)).length == 0) {
            return;
        }

        WidgetBean widgetBean = (WidgetBean) intent.getSerializableExtra("data");
        switch(intent.getAction()) {
            case Actions.WIDGET_DELETE:

                break;
            case Actions.WIDGET_UPDATE:
                Log.e("xieshangwu", "onReceive UPDATE");
                WidgetUtil.updateWidgetByEidt(TimerWidget.class, context, widgetBean);
                break;
            case Actions.WIDGET_SELECT:
                WidgetUtil.updateWidget(TimerWidget.class, context, widgetBean);
                break;
        }

    }
}

