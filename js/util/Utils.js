/**
 * Created by xieshangwu on 2018/3/11.
 * 简单的工具
 */

import {
  Dimensions,
  Platform,
} from 'react-native';

const BASE_WIN_HEIGHT = 667;
const BASE_WIN_WIDTH = 375;

/** 根据实际屏幕尺寸转换对应的像素高度 */
export const getHeight = h => {
  let {height} = Dimensions.get('window');
  return h * (height / BASE_WIN_HEIGHT);
};

/** 根据实际屏幕尺寸转换对应的像素宽度 */
export const getWidth = w => {
  let {width} = Dimensions.get('window');
  return w * (width / BASE_WIN_WIDTH);
};

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
   * 通过时间戳移除数组数据
   * @param arr
   * @param item
   */
  static removeArrayByTimeStamp(arr, item) {
    if(!arr) {
      return
    }
    let index = -1;
    let length = arr.length;
    for(let i = 0; i< length; i++) {
      if(arr[i].timestamp === item.timestamp) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      arr.splice(index, 1);
    }
  }

  /**
   * 通过id移除数组数据
   * @param arr
   * @param item
   */
  static removeArrayById(arr, item) {
    if(!arr) {
      return
    }
    let index = -1;
    let length = arr.length;
    for(let i = 0; i< length; i++) {
      if(arr[i].id === item.id) {
        index = i;
        break;
      }
    }
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

  /**
   * 生成16位随机id
   */
  static createId() {
    return Math.random().toString(36).substr(2);
  }

}

