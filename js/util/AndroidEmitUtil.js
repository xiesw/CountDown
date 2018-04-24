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

export default class AndroidEmitUtil {

  static init() {
    this.addSelectListener();
    this.addDetailListener();
    this.addNormalListener();
  }

  static addSelectListener() {
    this.selectEmitter = DeviceEventEmitter.addListener('select', (data) => {
      this.appWidgetId = data.appWidgetId;
      console.log('pain.xie', data);
      Stores.dataStore.selectMode = true;
    })
  }

  static addDetailListener() {
    this.detailEmitter = DeviceEventEmitter.addListener('detail', (data) => {
    })
  }

  static addNormalListener() {
    this.normalEmitter = DeviceEventEmitter.addListener('cancel', (data) => {
      console.log('pain.xie:', "js cancel");
      Stores.dataStore.selectMode = false;
    })
  }

  static getId() {
    return this.appWidgetId;
  }

  static remove() {
    this.selectEmitter && this.selectEmitter.remove();
    this.detailEmitter && this.detailEmitter.remove();
    this.normalEmitter && this.normalEmitter.remove();
  }

};