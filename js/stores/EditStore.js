/**
 * Created by pain.xie on 2018/3/28.
 * 编辑页数据
 */


import React from 'react';
import {observable, action, runInAction, reaction, autorun, computed} from 'mobx';
import {useStrict, toJS} from 'mobx';
import {EDIT_MODEL} from "../common/Constants";

const AsyncStorage_Name = 'Data';
export default class EditStore {
  constructor(stores) {
    this.stores = stores;
  }

  @action
  clear() {
    this.isDateTimePickVisible = false;
    this.isTopDialogVisible = false;
    this.isRepeatDialogVisible = false;

    this.name = '';
    this.timestamp = 0;
    this.repeat = 'once';
    this.top = false;
    this.color = '';
    this.dateAndWeek = '';
  }

  // 是编辑还是新增
  @observable model = EDIT_MODEL.new;

  // 编辑值
  @observable name = '';
  @observable timestamp = 0;
  @observable repeat = 'once';
  @observable top = false;
  @observable color = '';

  @observable dateAndWeek = '';

  // 控制dialog显示
  @observable isDateTimePickVisible = false;
  @observable isTopDialogVisible = false;
  @observable isRepeatDialogVisible = false;


  @computed
  get isUpdate() {
    return this.model === EDIT_MODEL.update;
  }


};

