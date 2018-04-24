package com.sc.countdown;

import android.appwidget.AppWidgetManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.os.Handler;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.sc.countdown.widget.Actions;
import com.sc.countdown.widget.EventEmitter;
import com.sc.countdown.widget.RNWidgetUtil;
import com.umeng.analytics.MobclickAgent;

public class MainActivity extends ReactActivity {

    private static final String EXITACTION = "action2exit";
    private ExitReceiver exitReceiver = new ExitReceiver();

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "CountDown";
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle
            persistentState) {
        super.onCreate(savedInstanceState, persistentState);
        MobclickAgent.setSessionContinueMillis(1000);
        MobclickAgent.setScenarioType(this, MobclickAgent.EScenarioType.E_DUM_NORMAL);

    }

    @Override
    protected void onStart() {
        super.onStart();


        IntentFilter filter = new IntentFilter();
        filter.addAction(EXITACTION);
        registerReceiver(exitReceiver, filter);
    }

    @Override
    public void onResume() {
        super.onResume();
        Log.e("xieshangwu", "onStart");
        Intent intent = getIntent();
        if(intent.getAction() != null) {
            switch(intent.getAction()) {
                case Actions.SELECT:
                    final int appWidgetId = intent.getIntExtra(AppWidgetManager
                            .EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID);

                    Log.e("xieshangwu", "onStart appWidgetId:" + appWidgetId);
                    if(RNWidgetUtil.reactApplicationContext == null) {
                        new Handler().postDelayed(new Runnable() {
                            @Override
                            public void run() {
                                EventEmitter.goSelect(appWidgetId);
                            }
                        }, 500);
                    } else {
                        EventEmitter.goSelect(appWidgetId);
                    }
                    break;
                case Actions.DETAIL:

                    break;
            }
        }
        MobclickAgent.onResume(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
        unregisterReceiver(exitReceiver);

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    class ExitReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            //收到广播时，finish
            moveTaskToBack(true);
        }
    }
}
