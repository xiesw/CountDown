/**
 * Created by xieshangwu on 2018/3/11.
 * 简单的工具
 */

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
}

