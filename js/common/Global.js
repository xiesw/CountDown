/**
 * Created by pain.xie on 2018/3/8.
 * 全局公共操作
 */
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  StatusBar,
  NativeModules
} from 'react-native';
import {Theme} from "./Theme";
import {regs} from '../component/validate/Validate';
import {EnvHost} from "../net/Env";
import bmob from '../net/bmob/bmob';
import Stores from '../stores/index';

global.evn = {
  isDebug: true,
  environment: '',
  hosts: ''
};

global.appInfo = {
  appName: 'CountDown',
  version: '1.1.0',
  channel: 'appStore',
  brand: 'iphone',
  deviceId: '',
};

export default class Global {

  static init() {
    global.theme = Theme;
    global.validaterRegs = regs;
    this.setStatusBar();
    this.loadUserInfo();
    this.loadAppInfo();
    this.initialEnv();
    this.initBmob();
  }

  /**
   * 设置android状态栏(未实现)
   * todo
   */
  static setStatusBar() {
    if (Platform.OS === "android") {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor('rgba(0,0,0,0.2)');
    }
  }

  /**
   * 加载用户信息
   */
  static loadUserInfo() {
    Stores.userStore.loadInfo();
  }

  /**
   * 加载app信息
   * @param callback
   */
  static loadAppInfo(callback) {
    let RnAppUtil = NativeModules.RNAppUtil;
    RnAppUtil.getAppInfo().then((result) => {
      console.log('pain.xie:', result);
      if (Platform.OS === 'android') {
        global.appInfo = result;
      } else {
        if (result && result[0]) {
          global.appInfo = result[0]
        }
      }
    })
  }

  /**
   * 设置环境
   */
  static initialEnv() {
    Global.setEnv('dev');
  }

  /**
   * 设置环境
   * @param env
   */
  static setEnv(env) {
    global.env = {
      environment: env,
      hosts: EnvHost[env],
      isDebug: env !== 'product'
    };
  }

  /**
   * 获取url host地址
   * @param key
   * @returns {*}
   */
  static getHost(key) {
    return global.env.hosts[key];
  };

  /**
   * 初始化比目
   */
  static initBmob() {
    // 测试环境数据库
    bmob.Bmob.initialize('2fc5489d6682bfb17ad3a7c62156afd0', '9c7465e3f2ae21010850c4594f354b72');
  }

}
