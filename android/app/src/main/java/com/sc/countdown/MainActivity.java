package com.sc.countdown;

import android.appwidget.AppWidgetManager;
import android.content.Intent;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.sc.countdown.widget.Actions;
import com.sc.countdown.widget.RNWidgetUtil;
import com.umeng.analytics.MobclickAgent;

public class MainActivity extends ReactActivity {

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
        Log.e("xieshangwu", "onStart");
        Intent intent = getIntent();
        if(intent.getAction() != null) {
            switch(intent.getAction()) {
                case Actions.SELECT:
                    int appWidgetId = intent.getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, 0);
                    Log.e("xieshangwu", "onStart appWidgetId:" + appWidgetId);
                    RNWidgetUtil.goSelect(appWidgetId);
                    break;
                case Actions.DETAIL:

                    break;
            }
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}
