/**
 * Created by pain on 2018/3/27.
 * 倒计时数据类
 */
import React from 'react';
import {
  AsyncStorage
} from 'react-native';
import {observable, action, runInAction, reaction, autorun, computed} from 'mobx';
import DateUtil from "../util/DateUtil";
import {useStrict, toJS} from 'mobx';
import Utils from "../util/Utils";

const AsyncStorage_Name = 'Data';
export default class DataStore {
  constructor(stores) {
    this.stores = stores;
  }

  // 所有展示的数据
  @observable dataSource = [];
  // 当前详情数据
  @observable currentItemData = {};

  @action
  clear() {
    this.dataSource = [];
    this.currentItemData = {};
  }

  @computed
  get isEmpty() {
    return toJS(this.dataSource).length === 0;
  }

  /**
   * 从本地加载数据
   * @returns {Promise}
   */
  @action
  load() {
    AsyncStorage.getItem(AsyncStorage_Name, (error, result) => {
      if (!error && result) {
        console.log('pain.xie', result);
        let dataArray = JSON.parse(result);
        this.sortData(dataArray);
        this.dataSource = dataArray;
      }
    })
  }

  /**
   * 保存数据到本地
   * @param data
   */
  @action
  save() {
    AsyncStorage.setItem(AsyncStorage_Name, JSON.stringify(toJS(this.dataSource)));
  }

  /**
   * 删除数据
   * @param data
   */
  @action
  delete(data) {
    let dataArray = toJS(this.dataSource);
    Utils.removeArrayByTimeStamp(dataArray, data);
    this.reset(dataArray);
  }

  /**
   * 更新数据
   * @param oldData
   * @param newData
   */
  @action
  update(oldData, newData) {
    let dataArray = toJS(this.dataSource);
    this.currentItemData = newData;
    Utils.removeArrayByTimeStamp(dataArray, oldData);
    dataArray.push(newData);
    this.reset(dataArray);
  }

  /**
   * 新增数据
   * @param data
   */
  @action
  insert(data) {
    let dataArray = toJS(this.dataSource);
    dataArray.push(data);
    this.reset(dataArray);
  }

  /**
   * 重置数据源
   * @param dataSource
   */
  @action
  reset(dataSource) {
    this.sortData(dataSource);
    this.dataSource = dataSource;
    this.save();
  }


  /**
   * 处理数据(排序)
   * @param result
   */
  sortData(result) {
    let sortFun = (obj1, obj2) => {
      let isOverDue1 = DateUtil.isOverdue(obj1.timestamp);
      let isOverDue2 = DateUtil.isOverdue(obj2.timestamp);
      if (obj1.top !== obj2.top) {
        return obj2.top - obj1.top;
      } else if (isOverDue1 !== isOverDue2) {
        return isOverDue1 - isOverDue2;
      } else {
        return isOverDue1 ? obj2.timestamp - obj1.timestamp : obj1.timestamp - obj2.timestamp;
      }
    };
    result.sort(sortFun);
  }
};