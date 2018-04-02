package com.sc.countdown;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Build;
import android.provider.Settings;
import android.telephony.TelephonyManager;
import android.text.TextUtils;
import android.util.Log;

import com.meituan.android.walle.WalleChannelReader;

/**
 * Created by xieshangwu on 2018/3/22
 */

public class ConfigUtil {

    /**
     * 获取app名称
     *
     * @param context
     * @return
     */
    public static String getAppName(Context context) {
        try {
            String appName = context.getString(R.string.app_name);
            return appName.length() == 0 ? "" : appName;
        } catch(Exception e) {
            e.printStackTrace();
        }
        return "CountDown";
    }

    /**
     * 获得手机渠道号
     *
     * @param reactApplicationContext
     * @return
     */
    public static String getChannel(Context reactApplicationContext) {
        String channel = WalleChannelReader.getChannel(reactApplicationContext);
        if(channel == null) {
            channel = "official";
        }
        Log.e("pain.xie:getChannel", channel);
        return channel;
    }

    /**
     * 获得设备id
     *
     * @return
     */
    public static String getDeviceId() {
        TelephonyManager tm = (TelephonyManager) MainApplication.getApplication()
                .getSystemService(Context.TELEPHONY_SERVICE);
        String deviceId = tm.getDeviceId();
        String serialNumber = tm.getSimSerialNumber();
        @SuppressWarnings("deprecation") String androidId = Settings.System.getString
                (MainApplication
                .getApplication()
                .getContentResolver(), Settings.System.ANDROID_ID);

        StringBuilder builder = new StringBuilder();
        if(null != deviceId) {
            builder.append(deviceId);
        }
        if(null != serialNumber) {
            builder.append(serialNumber);
        }
        if(null != androidId) {
            builder.append(androidId);
        }

        return String.valueOf(builder.toString().hashCode());
    }

    /**
     * 获得app版本
     *
     * @param context
     * @return
     */
    public static String getAppVersionName(Context context) {

        String versionName = "";
        try {

            PackageManager pm = context.getPackageManager();
            PackageInfo pi = pm.getPackageInfo(context.getPackageName(), 0);
            versionName = pi.versionName;
            int versioncode = pi.versionCode;
            if(TextUtils.isEmpty(versionName) || versionName.length() <= 0) {
                return "";
            }
        } catch(Exception e) {
            e.printStackTrace();
        }

        return versionName;
    }

    /**
     * 获得手机型号
     *
     * @param context
     * @return
     */
    public static String getBrand(Context context) {
        return Build.BRAND; // 设备型号
    }


}
