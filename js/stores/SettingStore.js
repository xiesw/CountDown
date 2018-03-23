/**
 * Created by pain.xie on 2018/3/23.
 */


import {observable, action, runInAction, reaction, autorun, computed} from 'mobx';

export default class HomeStore {
  constructor(stores) {
    this.stores = stores;
  }

  @observable unit = 'minute';

}