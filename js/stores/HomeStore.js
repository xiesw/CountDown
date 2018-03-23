/**
 * Created by pain.xie on 2018/3/23.
 * 首页数据类
 */

import {observable, action, runInAction, reaction, autorun, computed} from 'mobx';

export default class HomeStore {
  constructor(stores) {
    this.stores = stores;
  }

  @observable value = 1;

}