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
 * 参考https://www.jianshu.com/p/7f5a9969be53
 */
public class StatusBarUtil {

    private static final String TAG = "StatusBarUtil";
    // 排除有问题的厂商
    private static final String[] excludeBRAND = {"Zuk"};

    /**
     * 设置状态栏颜色及字体图标显示样式
     * miui 和flyme 5.0以上, 其他机型android5.0以上
     * @param activity 当前activity
     * @param color 状态栏颜色
     */
    public static void setStatusBar(Activity activity, String color) {
        try {
            int colorValue = Color.parseColor(color);
            // 根据状态栏是否偏黑色来设置 图标文字颜色
            boolean isBlack = FlymeStatusbarUtil.isBlackColor(colorValue, 200);
            setStatusBar(activity, color, !isBlack);
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 设置状态栏颜色及字体图标显示样式
     * miui 和flyme 5.0以上, 其他机型android5.0以上
     * @param activity 当前activity
     * @param color    状态栏颜色
     * @param darkMode 状态栏文字图标颜色 true:黑色  false:白色 (6.0以上有效)
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

            } else if(OSUtils.isOSL()) {
                setOSMStatusDarkIcon(activity, darkMode);
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
     * @param activity 当前activity
     * @param color 状态栏颜色
     */
    private static void setStatusBarColor(Activity activity, int color) {

        if(OSUtils.isOSL()) {
            Window window = activity.getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            // 5.0 5.1无法设置黑色图标 防止纯白状态栏无法看见图标文字
            if(!OSUtils.isOSM() || isExclude()) {
                color = addGrey(color);
            }
            window.setStatusBarColor(color);
        }
    }

    /**
     * android6.0以上状态栏图标文字颜色
     * @param activity 当前activity
     * @param dark 状态栏文字图标颜色 true:黑色  false:白色 (6.0以上有效)
     */
    private static void setOSMStatusDarkIcon(Activity activity, boolean dark) {
        if(OSUtils.isOSM()) {
            View decorView = activity.getWindow().getDecorView();
            if(dark) {
                decorView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
            } else {
                decorView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
            }
        }
    }

    /**
     *  将颜色添加一个灰度
     * @param color 状态栏颜色
     * @return int 带灰色的颜色
     */
    private static int addGrey(int color) {
        double greyValue = 0.9;
        int blue = (int) ((color & 0x000000FF) * greyValue);
        int green = (int) (((color & 0x0000FF00) >> 8) * greyValue);
        int red = (int) (((color & 0x00FF0000) >> 16) * greyValue);

        return Color.rgb(red, green, blue);
    }

    /**
     * 修改状态栏为全透明
     * @param activity 当前activity
     */
    @TargetApi(19)
    private static void transparencyBar(Activity activity) {
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = activity.getWindow();
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(Color.TRANSPARENT);

        }
    }

    /**
     * 是否在排除列表外
     */
    private static boolean isExclude() {
        String brand = Build.BRAND;
        for(String str : excludeBRAND) {
            if(str.equalsIgnoreCase(brand)) {
                return true;
            }
        }
        return false;
    }

}