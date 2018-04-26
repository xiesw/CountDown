/**
 * Created by xieshangwu on 2018/3/11.
 * 首页
 */

import React, {Component} from 'react';
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
import BaseScene from "./BaseScene";
import HomeItem from "../component/HomeItem";
import {getWidth} from "../util/Utils";
import {Theme} from "../common/Theme";
import YearProgressView from "../component/YearProgressView";
import {inject, observer} from 'mobx-react';
import {useStrict, toJS} from 'mobx';
import Stores from '../stores';
import {EDIT_MODEL} from "../common/Constants";
import AnalyticsUtil from '../util/um/AnalyticsUtil'
import {APP_EVENT} from "../common/Constants";
import ToastUtil from "../util/ToastUtil";
import AndroidEmitUtil from "../util/AndroidEmitUtil";

@inject('dataStore')
@observer
export default class HomeScene extends BaseScene {

  static navigationOptions = ({navigation}) => {
    let rightView =
      <TouchableOpacity
        onPress={() => {
          if (!Stores.dataStore.selectMode) {
            HomeScene.goSettingScene(navigation);
          }
        }}
      >
        <Image
          style={{marginRight: 20}}
          source={require('../../res/image/setting.png')}
        />
      </TouchableOpacity>;

    return {
      headerTitle: '倒计时',
      headerRight: rightView,
      headerLeft: (<View/>)
    }
  };

  constructor(props) {
    super(props);
    //AndroidEmitUtil.init();
  }

  componentDidMount() {
    this.loadData();
    AnalyticsUtil.onEvent(APP_EVENT.HoneScene);
  }

  componentWillUnmount() {
    this.props.dataStore.selectMode = false;
    AndroidEmitUtil.remove();
  }

  /**
   * 加载数据
   */
  loadData() {
    this.props.dataStore.load();
  }

  static goSettingScene() {
    AnalyticsUtil.onEvent(APP_EVENT.Setting);
    Stores.navigation.navigate({routeName: 'SettingScene'});
  }

  /**
   * 添加新条目
   */
  add() {
    Stores.editStore.model = EDIT_MODEL.new;
    this.props.navigation.navigate('EditScene',);
    AnalyticsUtil.onEvent(APP_EVENT.Add);

    // let title = '测试';
    // let url = 'http://www.palxie.xyz';
    // this.props.navigation.navigate('WebViewScene', {url, title})
  }

  onClickItem(data) {
    if (this.props.dataStore.selectMode) {
      let RnWidgetUtil = NativeModules.RNWidgetUtil;
      data.appWidgetId = Stores.dataStore.appWidgetId;
      RnWidgetUtil.onSelect(data);
      this.props.dataStore.selectMode = false;
      ToastUtil.show("已选择");
    } else {
      Stores.dataStore.currentItemData = data;
      Stores.editStore.model = EDIT_MODEL.update;
      this.props.navigation.navigate('DetailScene');
    }
  }

  renderItem(itemData) {
    return (
      <HomeItem
        data={itemData.item}
        {...this.props}
        onClickItem={(data) => this.onClickItem(data)}
      />
    )
  }

  renderEmptyView() {
    return ( this.props.dataStore.isEmpty && this.props.dataStore.loadDataComplete
        ? <View style={styles.emptyContainer}>
          <YearProgressView/>
          <Text style={styles.note}>点击右下角按钮添加倒计时项目</Text>
        </View>
        : null
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderEmptyView()}

        {this.props.dataStore.selectMode ?
          <Text style={styles.note}>请选择需要展示的条目</Text>
          : null}

        <FlatList
          ref='list'
          style={styles.list}
          data={toJS(Stores.dataStore.dataSource)}
          keyExtractor={(itemData, index) => index + ''}
          renderItem={(itemData) => this.renderItem(itemData)}
        />

        {!this.props.dataStore.selectMode ?
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => this.add()}
          >
            <Image source={require('../../res/image/add.png')}/>
          </TouchableOpacity> : null}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginTop: 20,
  },

  emptyContainer: {
    marginTop: getWidth(100),
    justifyContent: 'center',
    alignItems: 'center'
  },
  note: {
    marginTop: getWidth(32),
    color: Theme.color.textGray,
    fontSize: 18,
    alignSelf: 'center'
  },

  imageContainer: {
    position: 'absolute',
    right: getWidth(36),
    bottom: getWidth(54),
    elevation: 2,
    shadowColor: Theme.color.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: getWidth(2),
  },

});
