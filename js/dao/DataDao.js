/**
 * Created by pain.xie on 2018/3/17.
 * 数据操作类
 */

import React from 'react';
import {
  Text,
  View,
  AsyncStorage
} from 'react-native';

const AsyncStorage_Name = 'Data';

export default class DataDao {

  constructor(props) {
  }

  static load() {
    return new Promise((resolve, reject) => {
      console.log('pain.xie', 'start load');
      AsyncStorage.getItem(AsyncStorage_Name, (error, result) => {
        if (error) {
          console.log('pain.xie', 'load error');
          reject(error);
        } else {
          if (result) {
            console.log('pain.xie', 'load success');
            resolve(JSON.parse(result));
          } else {
            console.log('pain.xie', 'load empty');
            reject('gesture password is empty');
          }
        }
      })
    });
  }

  static save(data) {
    AsyncStorage.setItem(AsyncStorage_Name, JSON.stringify(data));
  }

  static clear() {

    return AsyncStorage.clear();
  }
}

