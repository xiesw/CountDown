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

  static addSelectListener() {
    this.selectEmitter = DeviceEventEmitter.addListener('select', (data) => {
      this.appWidgetId = data.appWidgetId;
      console.log('pain.xie', data);
      Stores.dataStore.selectMode = true;
    })
  }

  static addDetailListener() {
    this.detailEmitter = DeviceEventEmitter.addListener('detail', (data) => {
      this.id = data.id;
      let dataSource = toJS(Stores.dataStore.dataSource);
      for (let item of dataSource ) {
        if(item.id === this.id) {
          Stores.dataStore.currentItemData = item;
          Stores.editStore.model = EDIT_MODEL.update;
          Stores.navigation.reset({routeName: 'DetailScene'});
        }
      }

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