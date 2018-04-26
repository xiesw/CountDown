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
import MaskRootSibling, {removeFormSibling} from '../component/MaskRootSibling';

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
      this.goHomeScene();
      Stores.dataStore.appWidgetId = data.appWidgetId;
      let dataSource = toJS(Stores.dataStore.dataSource);
      if(dataSource.length !== 0) {
        Stores.dataStore.selectMode = true;
      }
    })
  }

  /**
   * 添加详情监听
   */
  static addDetailListener() {
    this.detailEmitter = DeviceEventEmitter.addListener('detail', (data) => {
      console.log('pain.xie', 'detail', data);
      this.goHomeScene();
      if(Stores.dataStore.loadDataComplete) {
        this.goDetailScene(data);
      } else {
        setTimeout(() => {
          this.goDetailScene(data);
        }, 500);
      }
    })
  }

  static goDetailScene(data) {
    let dataSource = toJS(Stores.dataStore.dataSource);
    Stores.dataStore.selectMode = false;
    console.log('pain.xie:', 'addDetailListener', dataSource);
    for (let item of dataSource ) {
      if(item.id === data.id) {
        Stores.dataStore.currentItemData = item;
        Stores.editStore.model = EDIT_MODEL.update;
        Stores.navigation.navigate({routeName: 'DetailScene'});
      }
    }
  }

  static addNormalListener() {
    this.normalEmitter = DeviceEventEmitter.addListener('cancel', (data) => {
      Stores.dataStore.selectMode = false;
    })
  }

  static goHomeScene() {
    removeFormSibling();
    Stores.navigation.goBack({routeName: 'HomeScene'});
  }

  static remove() {
    this.selectEmitter && this.selectEmitter.remove();
    this.detailEmitter && this.detailEmitter.remove();
    this.normalEmitter && this.normalEmitter.remove();
  }

};