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
import bmob from '../net/bmob/bmob';

const Bmob = bmob.Bmob;
const AsyncStorage_Name = 'Data';
export default class DataStore {
  constructor(stores) {
    this.stores = stores;
  }

  // 所有展示的数据
  @observable dataSource = [];
  // 当前详情数据
  @observable currentItemData = {};

  // 自动备份的数据
  @observable autoBackupData = [];
  @observable backupData = [];
  @observable selectedBackupItem = '';

  @action
  clear() {
    this.currentItemData = {};
    this.autoBackupData = [];
    this.backupData = [];
    this.selectedBackupItem = '';
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
    if (this.stores.userStore.hasLogin) {
      this.autoBackup();
    }
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

  /**
   * 自动备份
   */
  @action
  autoBackup() {
    let username = this.stores.userStore.username;
    let Data = Bmob.Object.extend("data");
    // 有备份过 删除备份, 没备份过 新增备份
    this.checkHasAutoBackup()
      .then((result) => {
        let d = new Data();
        return new Promise((resolve, reject) => {
          d.set("username", username)
            .set("autoBackup", true)
            .set("timestamp", Date.now())
            .set("data", JSON.stringify(toJS(this.dataSource)));
          d.save(null, {
            success: (object) => {
              resolve(object);
            },
            error: function (error) {
              reject(error.message);
            }
          })
        })
      })
  }

  /**
   * 检查是否已经自动备份过了,有则删除
   */
  @action
  checkHasAutoBackup() {
    let username = this.stores.userStore.username;
    let Data = Bmob.Object.extend("data");
    let query = new Bmob.Query(Data);
    query.equalTo("username", username);
    query.equalTo("autoBackup", true);
    return new Promise((resolve, reject) => {
      query.find({
        success: (result) => {
          if (result.length > 0) {
            query.get(result[0].id, {
              success: function (object) {
                object.destroy();
                resolve(true)
              },
              error: function (object, error) {
              }
            });
          } else {
            resolve(true);
          }
        }, error: (error) => {
        }
      });
    })
  }

  /**
   * 手动备份数据
   * @returns {Promise}
   */
  @action
  backup() {
    let username = this.stores.userStore.username;
    let Data = Bmob.Object.extend("data");
    let d = new Data();
    return new Promise((resolve, reject) => {
      d.set("username", username)
        .set("autoBackup", false)
        .set("timestamp", Date.now())
        .set("data", JSON.stringify(toJS(this.dataSource)));
      d.save(null, {
        success: (object) => {
          resolve(object);
        },
        error: function (error) {
          reject(error.message);
        }
      })
    })
  }

  /**
   * 删除备份的数据
   * @param id
   */
  deleteBackupData(id) {
    let username = this.stores.userStore.username;
    let Data = Bmob.Object.extend("data");
    let query = new Bmob.Query(Data);
    query.equalTo("username", username);
    return new Promise((resolve, reject) => {
      query.get(id, {
        success: function (object) {
          object.destroy();
          resolve(true)
        },
        error: function (object, error) {
          reject(false);
        }
      });
    })
  }

  /**
   * 获取备份的数据
   * @returns {Promise}
   */
  @action
  fetchBackupData() {
    let username = this.stores.userStore.username;
    let Data = Bmob.Object.extend("data");
    let query = new Bmob.Query(Data);
    query.equalTo("username", username);
    return new Promise((resolve, reject) => {
      query.find({
        success: (result) => {
          if (result) {
            let autoBackupArr = [];
            let backupArr = [];
            result.forEach((item, index, arr) => {
              if (item.get('autoBackup')) {
                autoBackupArr.push(item);
              } else {
                backupArr.push(item);
              }
            });

            console.log('pain.xie:', autoBackupArr);
            console.log('pain.xie:', backupArr);
            this.autoBackupData = autoBackupArr;
            this.backupData = backupArr;
          }
        }, error: (error) => {
        }
      });
    })
  }

};