package com.sc.countdown;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.meituan.android.walle.WalleChannelReader;
import com.sc.countdown.utils.DplusReactPackage;
import com.sc.countdown.utils.RNUMConfigure;
import com.umeng.commonsdk.UMConfigure;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private static MainApplication application;


    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage> asList(
                    new MainReactPackage(),
                    new CustomerPackage(),
                    new DplusReactPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    public static MainApplication getApplication() {
        return application;
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        application = this;
        initYuoMeng();
    }

    public void initYuoMeng() {
        String channel = WalleChannelReader.getChannel(this.getApplicationContext());
        if(channel == null) {
            channel = "official";
        }
        Log.e("pain.xie", channel);
        RNUMConfigure.init(this, "5abde506f43e484f9b0000e2", channel, UMConfigure.DEVICE_TYPE_PHONE,
                "669c30a9584623e70e8cd01b0381dcb4");
        UMConfigure.setLogEnabled(true);
    }

}
