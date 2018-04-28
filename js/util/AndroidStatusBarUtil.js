/**
 * Created by pain.xie on 2018/4/28.
 */

import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  StatusBar,
  NativeModules
} from 'react-native';
import Utils from "./Utils";

export default class AndroidStatusBarUtil {

  static setStyle(color, darkMode) {
    if (Utils.isAndroid()) {
      let RnAppUtil = NativeModules.RNAppUtil;
      RnAppUtil.setStatusBar({color, darkMode});
    }
  }

}