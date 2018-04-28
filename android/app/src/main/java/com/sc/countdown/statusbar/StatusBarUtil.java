package com.sc.countdown.statusbar;

import android.annotation.TargetApi;
import android.app.Activity;
import android.graphics.Color;
import android.os.Build;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

/**
 * Created by xieshangwu on 2018/4/27
 * https://www.jianshu.com/p/7f5a9969be53
 */
public class StatusBarUtil {

    /**
     * 设置状态栏颜色及字体图标显示样式
     *  miui 和flyme 5.0以上, 其他机型android6.0以上
     * @param activity
     * @param color    状态栏颜色
     * @param darkMode 状态栏文字图标颜色 true:黑色  false:白色
     */
    public static void setStatusBar(Activity activity, String color, boolean darkMode) {
        try {
            int colorValue = Color.parseColor(color);
            if(OSUtils.isFlyme() && OSUtils.isOSL()) {
                FlymeStatusbarUtil.setStatusBarDarkIcon(activity, darkMode);
                setStatusBarColor(activity, colorValue);

            } else if(OSUtils.isMIUI() && OSUtils.isOSL()) {
                MiuiStatusbarUtil.setStatusBarDarkIcon(activity, darkMode);
                setStatusBarColor(activity, colorValue);

            } else if(OSUtils.isOSM()) {
                setOSMStatusDrakIcon(activity, darkMode);
                setStatusBarColor(activity, colorValue);
            }
        } catch(Exception e) {
            Log.e("pain.xie", "statusbar error");
            e.printStackTrace();
        }
    }

    /**
     * 修改状态栏颜色
     *
     * @param activity
     * @param color
     */
    private static void setStatusBarColor(Activity activity, int color) {

        if(OSUtils.isOSL()) {
            Window window = activity.getWindow();
            //      window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(color);
        }
    }

    /**
     * android6.0以上状态栏图标文字颜色
     * @param activity
     * @param dark
     */
    private static void setOSMStatusDrakIcon(Activity activity, boolean dark) {
        if(OSUtils.isOSL()) {
            View decorView = activity.getWindow().getDecorView();
            if(dark) {
                decorView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
            } else {
                decorView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
            }
        }
    }

    /**
     * 修改状态栏为全透明
     *
     * @param activity
     */
    @TargetApi(19)
    public static void transparencyBar(Activity activity) {
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = activity.getWindow();
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(Color.TRANSPARENT);

        }
    }

}