/**
 * Created by pain.xie on 2018/3/17.
 * 数据操作类
 */

import React from 'react';
import {
  AsyncStorage
} from 'react-native';

const AsyncStorage_Name = 'Data';

export default class DataDao {

  constructor(props) {
  }

  /**
   * 加载数据
   * @returns {Promise}
   */
  static load() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(AsyncStorage_Name, (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result) {
            resolve(JSON.parse(result));
          } else {
            reject('data is empty');
          }
        }
      })
    });
  }

  /**
   * 保存数据
   * @param data
   */
  static save(data) {
    AsyncStorage.setItem(AsyncStorage_Name, JSON.stringify(data));
  }

}

