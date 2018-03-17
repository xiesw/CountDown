/**
 * Created by pain.xie on 2018/3/17.
 * 数据类
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
      AsyncStorage.getItem(AsyncStorage_Name, (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result) {
            resolve(JSON.parse(result));
          } else {
            reject('gesture password is empty');
          }
        }
      })
    });
  }

  static save(data) {
    AsyncStorage.setItem(AsyncStorage_Name, JSON.stringify(data));
  }
}

