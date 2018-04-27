/**
 * Created by pain.xie on 2018/4/24.
 */
import {
  DeviceEventEmitter,
} from 'react-native';
import Stores from '../stores';
import {useStrict, toJS} from 'mobx';
import {APP_EVENT, EDIT_MODEL} from "../common/Constants";
import {removeFormSibling} from '../component/MaskRootSibling';
import AnalyticsUtil from '../util/um/AnalyticsUtil'

const EVENT_SELECT = "event_select";
const EVENT_DETAIL = "event_detail";
const EVENT_NORMAL = "event_normal";

export default class AndroidEmitUtil {


  static init() {
    this.addSelectListener();
    this.addDetailListener();
    this.addNormalListener();
  }

  /**
   * 添加选择监听
   */
  static addSelectListener() {
    this.selectEmitter = DeviceEventEmitter.addListener(EVENT_SELECT, (data) => {
      console.log('pain.xie', EVENT_SELECT, data);
      this.goHomeScene();
      if (Stores.dataStore.loadDataComplete) {
        this.goSelect(data);``
      } else {
        setTimeout(() => {
          this.goSelect(data);
        }, 500);
      }
    })
  }

  /**
   * 添加详情监听
   */
  static addDetailListener() {
    this.detailEmitter = DeviceEventEmitter.addListener(EVENT_DETAIL, (data) => {
      console.log('pain.xie', EVENT_DETAIL, data);
      this.goHomeScene();
      if (Stores.dataStore.loadDataComplete) {
        this.goDetailScene(data);
      } else {
        setTimeout(() => {
          this.goDetailScene(data);
        }, 500);
      }
    })
  }

  /**
   * 正常进入首页监听
   */
  static addNormalListener() {
    this.normalEmitter = DeviceEventEmitter.addListener(EVENT_NORMAL, (data) => {
      console.log('pain.xie', EVENT_NORMAL);
      Stores.dataStore.selectMode = false;
    })
  }

  /**
   * 导航至首页选择
   * @param data
   */
  static goSelect(data) {
    Stores.dataStore.appWidgetId = data.appWidgetId;
    let dataSource = toJS(Stores.dataStore.dataSource);
    if (dataSource.length !== 0) {
      Stores.dataStore.selectMode = true;
    }
  }

  /**
   * 导航至详情页面
   * @param data
   */
  static goDetailScene(data) {
    let dataSource = toJS(Stores.dataStore.dataSource);
    Stores.dataStore.selectMode = false;
    console.log('pain.xie:', 'addDetailListener', dataSource);
    AnalyticsUtil.onEvent(APP_EVENT.WidgetDetail);
    for (let item of dataSource) {
      if (item.id === data.id) {
        Stores.dataStore.currentItemData = item;
        Stores.editStore.model = EDIT_MODEL.update;
        Stores.navigation.navigate({routeName: 'DetailScene'});
      }
    }
  }

  /**
   * 如果不在首页 退回到首页
   */
  static goHomeScene() {
    removeFormSibling();
    Stores.navigation.goBack({routeName: 'HomeScene'});
  }

  /**
   * 移除监听
   */
  static remove() {
    this.selectEmitter && this.selectEmitter.remove();
    this.detailEmitter && this.detailEmitter.remove();
    this.normalEmitter && this.normalEmitter.remove();
  }

};