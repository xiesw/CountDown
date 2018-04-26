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
import com.facebook.react.bridge.ReactContext;
import com.sc.countdown.widget.Actions;
import com.sc.countdown.widget.EventEmitter;
import com.sc.countdown.widget.WidgetBean;
import com.umeng.analytics.MobclickAgent;

public class MainActivity extends ReactActivity {

    private SelectReceiver mSelectReceiver;
    private DetailReceiver mDetailReceiver;

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
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        MobclickAgent.setSessionContinueMillis(1000);
        MobclickAgent.setScenarioType(this, MobclickAgent.EScenarioType.E_DUM_NORMAL);

        Log.e("pain.xie", "onCreate");
        Intent intent = getIntent();
        handleIntent(intent);
    }

    @Override
    protected void onStart() {
        super.onStart();
    }

    @Override
    public void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        Log.e("pain.xie", "onNewIntent");
        handleIntent(intent);
    }

    /**
     * 处理intent
     * @param intent
     */
    private void handleIntent(Intent intent) {
        ReactContext context = getReactInstanceManager().getCurrentReactContext();
        if(intent.getAction() != null) {
            switch(intent.getAction()) {
                case Actions.APP_SELECT:
                    sendSelectEvent(context, intent);
                    break;

                case Actions.APP_DETAIL:
                    sendDetailEvent(context, intent);
                    break;

                default:
                    EventEmitter.normal(context);
                    break;
            }
        }
    }

    /**
     * 向js发送选择item广播
     * @param context
     * @param intent
     */
    private void sendSelectEvent(ReactContext context, Intent intent) {
        final int appWidgetId = intent.getIntExtra(WidgetBean.KEY_APPWIDGETID, AppWidgetManager
                .INVALID_APPWIDGET_ID);

        Log.e("pain.xie", "onStart appWidgetId:" + appWidgetId);
        if(context == null) {
            mSelectReceiver = new SelectReceiver();
            IntentFilter filter = new IntentFilter();
            filter.addAction(Actions.BROADCAST_INIT);
            mSelectReceiver.setAppWidgetId(appWidgetId);
            registerReceiver(mSelectReceiver, filter);
        } else {
            EventEmitter.select(context, appWidgetId);
        }
    }

    /**
     * 向js发送详情广播
     * @param context
     * @param intent
     */
    private void sendDetailEvent(ReactContext context, Intent intent) {
        final String id = intent.getStringExtra(WidgetBean.KEY_ID);

        Log.e("pain.xie", "onStart id:" + id);
        if(context == null) {
            mDetailReceiver = new DetailReceiver();
            IntentFilter filter = new IntentFilter();
            filter.addAction(Actions.BROADCAST_INIT);
            mDetailReceiver.setId(id);
            registerReceiver(mDetailReceiver, filter);
        } else {
            EventEmitter.detail(context, id);
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if(mSelectReceiver != null) {
            unregisterReceiver(mSelectReceiver);
        }
        if(mDetailReceiver != null) {
            unregisterReceiver(mDetailReceiver);
        }
    }

    // reactContext初始化完成广播
    class SelectReceiver extends BroadcastReceiver {

        int appWidgetId;

        @Override
        public void onReceive(Context context, Intent intent) {
            if(intent.getAction().equals(Actions.BROADCAST_INIT)) {
                ReactContext reactContext = getReactInstanceManager().getCurrentReactContext();
                Log.e("pain.xie SelectReceiver", reactContext + "");
                if(reactContext != null) {
                    EventEmitter.select(reactContext, appWidgetId);
                } else {
                    new Handler().postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            ReactContext rc = getReactInstanceManager().getCurrentReactContext();
                            Log.e("pain.xie postDelayed", rc + "");
                            EventEmitter.select(rc, appWidgetId);
                        }
                    }, 500);
                }
            }
        }

        public void setAppWidgetId(int appWidgetId) {
            this.appWidgetId = appWidgetId;
        }
    }

    // reactContext初始化完成广播
    class DetailReceiver extends BroadcastReceiver {

        String id;

        @Override
        public void onReceive(Context context, Intent intent) {
            if(intent.getAction().equals(Actions.BROADCAST_INIT)) {
                ReactContext reactContext = getReactInstanceManager().getCurrentReactContext();
                Log.e("pain.xie DetailReceiver", reactContext + "");
                if(reactContext != null) {
                    EventEmitter.detail(reactContext, id);
                } else {
                    new Handler().postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            ReactContext rc = getReactInstanceManager().getCurrentReactContext();
                            Log.e("pain.xie postDelayed", rc + "");
                            EventEmitter.detail(rc, id);
                        }
                    }, 1000);
                }
            }
        }

        public void setId(String id) {
            this.id = id;
        }
    }
}
