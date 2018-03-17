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
    } else if (hour > 0) {
      return hour;
    } else if (minute > 0) {
      return minute;
    } else if (second > 0) {
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
    } else if (hour > 0) {
      return '时';
    } else if (minute > 0) {
      return '分';
    } else if (second > 0) {
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
    let time = Math.abs(timestamp - Date.now());
    let day = Math.floor(time / 1000 / 60 / 60 / 24);
    return day;
  }

  /**
   * 返回小时
   * @param timestamp
   * @returns {string}
   */
  static getHour(timestamp) {
    let time = Math.abs(timestamp - Date.now());
    let hour = Math.floor((time / (1000 * 60 * 60)) % 24);
    return hour;
  }

  /**
   * 返回分钟
   * @param timestamp
   * @returns {string}
   */
  static getMinute(timestamp) {
    let time = Math.abs(timestamp - Date.now());
    let minute = Math.floor((time / (1000 * 60)) % 60);
    return minute;
  }

  /**
   * 返回秒
   * @param timestamp
   * @returns {string}
   */
  static getSecond(timestamp) {
    let time = Math.abs(timestamp - Date.now());
    let second = Math.floor((time / 1000) % 60);
    return second;
  }

  /**
   * 返回毫秒
   * @param timestamp
   * @returns {string}
   */
  static getMillisecond(timestamp) {
    let time = Math.abs(timestamp - Date.now());
    let millisecond = Math.floor((time % 1000) / 10);
    return millisecond ;
  }

  /**
   * 是否过期
   * @param timestamp
   * @returns {boolean}
   */
  static isOverdue(timestamp) {
    return timestamp < Date.now();
  }

  /**
   * 获取今天零点时间戳
   */
  static getTodayTimeStamp() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let newDate = new Date(year + '/' + month + '/' + day);
    return newDate.getTime();
  }
}

const weekArray = ['日', '一', '二', '三', '四', '五', '六',];