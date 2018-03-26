/**
 * Created by xieshangwu on 2018/3/11.
 * 简单的工具
 */

import {Platform} from 'react-native';

export default class Utils {

  /**
   * 移除数组里的项
   * @param arr
   * @param item
   */
  static removeArrayItem(arr, item) {
    if (!arr) {
      return
    }
    let index = arr.indexOf(item);

    if (index !== -1) {
      arr.splice(index, 1);
    }
  }

  /**
   * 是否是Android
   */
  static isAndroid() {
    return Platform.OS === 'android';
  }

}

