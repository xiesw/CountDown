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
const BASE_WIN_HEIGHT = 667;
const BASE_WIN_WIDTH = 375;

global.evn = {
  isDebug: true
};

global.appInfo = {
  appName: 'CountDown',
  version: '1.1.0',
  channel: 'appStore',
  brand: 'iphone',
  deviceId: '',
};
/** 根据实际屏幕尺寸转换对应的像素高度 */
export const getHeight = h=> {
  let {height} = Dimensions.get('window');
  return h * (height / BASE_WIN_HEIGHT);
};

/** 根据实际屏幕尺寸转换对应的像素宽度 */
export const getWidth = w=> {
  let {width} = Dimensions.get('window');
  return w * (width / BASE_WIN_WIDTH);
};

export default class Global {

  static init() {
    global.theme = Theme;
    global.validaterRegs = regs;
    this.setStatusBar();
    this.loadAppInfo();
  }

  static setStatusBar() {
    if(Platform.OS === "android") {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor('rgba(0,0,0,0.2)');
    }
  }

  static loadAppInfo(callback) {
    let RnAppUtil = NativeModules.RNAppUtil;
    RnAppUtil.getAppInfo().then((result) => {
      console.log('pain.xie:', result);
      if(Platform.OS === 'android') {
        global.appInfo = result;
      } else {
        if(result && result[0]) {
          global.appInfo = result[0]
        }
      }
    })
  }

}
