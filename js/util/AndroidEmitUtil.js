/**
 * Created by pain.xie on 2018/4/24.
 */
import {
  StyleSheet,
  AppState,
  View,
  TouchableOpacity,
  DeviceEventEmitter,
  FlatList,
  Image,
  Text,
  NativeModules
} from 'react-native';
import Stores from '../stores';
import {useStrict, toJS} from 'mobx';
import {EDIT_MODEL} from "../common/Constants";

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
    this.selectEmitter = DeviceEventEmitter.addListener('select', (data) => {
      console.log('pain.xie', 'select', data);
      Stores.dataStore.appWidgetId = data.appWidgetId;
      Stores.dataStore.selectMode = true;
    })
  }

  /**
   * 添加详情监听
   */
  static addDetailListener() {
    this.detailEmitter = DeviceEventEmitter.addListener('detail', (data) => {
      console.log('pain.xie', 'detail', data);
      let dataSource = toJS(Stores.dataStore.dataSource);
      console.log('pain.xie:', 'addDetailListener', dataSource);
      for (let item of dataSource ) {
        if(item.id === data.id) {
          Stores.dataStore.currentItemData = item;
          Stores.editStore.model = EDIT_MODEL.update;
          Stores.navigation.navigate({routeName: 'DetailScene'});
        }
      }

    })
  }

  static addNormalListener() {
    this.normalEmitter = DeviceEventEmitter.addListener('cancel', (data) => {
      Stores.dataStore.selectMode = false;
    })
  }

  static remove() {
    this.selectEmitter && this.selectEmitter.remove();
    this.detailEmitter && this.detailEmitter.remove();
    this.normalEmitter && this.normalEmitter.remove();
  }

};