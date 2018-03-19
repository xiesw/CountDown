/**
 * Created by xieshangwu on 2018/3/11.
 * 简单的工具
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

export default class Utils {

  /**
   * 移除数组里的项
   * @param arr
   * @param item
   */
  static removeArrayItem(arr, item) {
    let length = arr.length;
    if (length === 0) {
      return;
    }
    let index = 0;
    for (let i = 0; i < length; i++) {
      if (arr[i] === item) {
        index = i;
        break;
      }
    }
    if(index < length) {
      arr.splice(index, 1);
    }
  }
}

