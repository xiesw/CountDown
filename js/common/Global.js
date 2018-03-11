/**
 * Created by pain.xie on 2018/3/8.
 * 全局公共操作
 */
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

const BASE_WIN_HEIGHT = 667;
const BASE_WIN_WIDTH = 375;

/** 根据实际屏幕尺寸转换对应的像素高度 */
export const getHeight = h=> {
  let {height, width} = Dimensions.get('window');
  return h * (height / BASE_WIN_HEIGHT);
};

/** 根据实际屏幕尺寸转换对应的像素宽度 */
export const getWidth = w=> {
  let {height, width} = Dimensions.get('window');
  return w * (width / BASE_WIN_WIDTH);
};

export default class Global {


}
