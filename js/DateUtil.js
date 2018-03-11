/**
 * Created by xieshangwu on 2018/3/11.
 * 时间工作类
 */

export default class DateUtil {
  /**
   * 根据时间戳返回日期和星期
   * @param timestamp
   * @returns {string} 2009-1-2 星期二
   */
  static getDataAndWeek(timestamp) {
    let date = new Date();
    date.setTime(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let week = date.getDay();
    return year + '-' + month + '-' + day + ' 星期' + weekArray[week];
  }

  /**
   * 根据时间戳返回非0最大单位的时间
   * @param timestamp
   * @returns {string}
   */
  static getBiggestTime(timestamp) {
    let time = Math.abs(timestamp - Date.now());
    let day = Math.floor(time / 1000 / 60 / 60 / 24);
    let hour = Math.floor(time / 1000 / 60 / 60);
    let minute = Math.floor(time / 1000 / 60);
    let second = Math.floor(time / 1000);
    if (day > 0) {
      return day;
    } else if(hour > 0) {
      return hour;
    } else if(minute > 0) {
      return minute;
    } else if(second > 0) {
      return second;
    } else {
      return 0;
    }
  }

  /**
   * 返回最大显示时间的单位
   * @param timestamp
   * @returns {string}
   */
  static getBiggestTimeUnit(timestamp) {
    let time = Math.abs(timestamp - Date.now());
    let day = Math.floor(time / 1000 / 60 / 60 / 24);
    let hour = Math.floor(time / 1000 / 60 / 60);
    let minute = Math.floor(time / 1000 / 60);
    let second = Math.floor(time / 1000);
    if (day > 0) {
      return '天';
    } else if(hour > 0) {
      return '时';
    } else if(minute > 0) {
      return '分';
    } else if(second > 0) {
      return '秒';
    } else {
      return '';
    }
  }

  /**
   * 返回总天数
   * @param timestamp
   * @returns {string}
   */
  static getDaysCount(timestamp) {

    return 'dfa'
  }

  /**
   * 返回时间
   * @param timestamp
   * @returns {string}
   */
  static getTime(timestamp) {

    return 'hah';
  }

  /**
   * 是否过期
   * @param timestamp
   * @returns {boolean}
   */
  static isOverdue(timestamp) {
    return timestamp < Date.now();
  }
}

const weekArray = ['日', '一', '二', '三', '四', '五', '六',];