/**
 * Created by pain on 2018/4/21.
 */
import Utils from "./Utils";

export default class UpdateUtil {

  /**
   * 升级数据,为所有数据添加id
   * @param arr
   * @returns {*}
   */
  static updateId(arr) {
    if(!arr || arr.length === 0) {
      return false;
    }

    if(arr[0].id) {
      return false;
    }

    arr.forEach((item, index, arr) => {
      item.id = Utils.createId();
    });

    return true;
  }


}