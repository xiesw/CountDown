package com.sc.countdown.widget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.RemoteViews;

import com.sc.countdown.MainActivity;
import com.sc.countdown.R;

/**
 * Implementation of App Widget functionality.
 */
public class TimerWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int
            appWidgetId) {

        // Construct the RemoteViews object
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.timer_widget);

        Intent intent = new Intent(context, MainActivity.class);
        intent.setAction(Actions.SELECT);
        intent.putExtra("appWidgetId", appWidgetId);
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, 0);
        views.setOnClickPendingIntent(R.id.widget, pendingIntent);
        Log.e("appWidgetId", appWidgetId + "");
        // Instruct the widget manager to update the widget
        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for(int i = 0; i < appWidgetIds.length; i++) {
            Log.e("pain.xie", i + "xieshangwu");
            updateAppWidget(context, appWidgetManager, appWidgetIds[i]);
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

        Bundle bundle = intent.getBundleExtra("bundle");
        switch(intent.getAction()) {
            case Actions.DELETE:

                break;
            case Actions.UPDATE:
                Log.e("xieshangwu", "onReceive UPDATE");
                break;
            case Actions.WIDGET_SELECT:
                Log.e("xieshangwu", "onReceive WIDGET_SELECT");
                WidgetUtil.select(TimerWidget.class, context, bundle);
                break;
        }

    }
}

