/**
 * Created by pain.xie on 2018/3/16.
 */

import React from 'react';
import {Platform} from 'react-native';

export class KeyboardUtil {
  static getKeyboardType(type) {
    if (type) {
      if (Platform.OS === 'android') {
        switch (type) {
          case 'ascii-capable':
          case 'numbers-and-punctuation':
          case 'url':
          case 'number-pad':
          case 'name-phone-pad':
          case 'decimal-pad':
          case 'twitter':
          case 'web-search':
            return 'default';
          default:
            return type;
        }
      }
      return type;
    }
    else {
      return 'default';
    }
  }
}
