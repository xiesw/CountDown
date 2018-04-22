/**
 * Created by pain on 2018/4/22.
 * android widget选择界面
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  NativeModules
} from 'react-native';
import BaseScene from "./BaseScene";
import {inject, observer} from 'mobx-react';
import HomeItem from "../component/HomeItem";
import Stores from '../stores';
import Utils from "../util/Utils";
import {useStrict, toJS} from 'mobx';

@inject('dataStore')
@observer
export default class SelectScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '选择',
  };

  constructor(props) {
    super(props);
  }

  onClickItem(data) {
    // pain.todo 调用android方法
    if(Utils.isAndroid()) {
      let RnWidgetUtil = NativeModules.RNWidgetUtil;
      console.log('pain.xie', this.props);
      data.appWidgetId = this.props.navigation.state.params.appWidgetId;
      RnWidgetUtil.onSelect(data);

    }
  }

  renderItem(itemData) {
    return (
      <HomeItem
        data={itemData.item}
        {...this.props}
        onClickItem = {(data) => this.onClickItem(data)}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ref='list'
          style={styles.list}
          data={toJS(Stores.dataStore.dataSource)}
          keyExtractor={(itemData, index) => index + ''}
          renderItem={(itemData) => this.renderItem(itemData)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
