/**
 * Created by pain.xie on 2018/3/29.
 * T
 */
import Toast from 'react-native-root-toast';

export default class ToastUtil {

  /**
   * 显示Toast
   * @param message 要显示的消息
   * @param params 参数 / 有默认参数
   */
  static show(message, params) {
    let defParams = {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
      },
      onShown: () => {
      },
      onHide: () => {
      },
      onHidden: () => {
      }
    };

    let p = Object.assign(defParams, params);

    Toast.show(message, p);
  }
}