/**
 * Created by xieshangwu on 2018/3/11.
 * 设置页面
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import BaseScene from "./BaseScene";
import DescribeView from "../component/setting/DescribeView";
import SelectItem, {Type} from "../component/setting/SelectItem";
import * as Keychain from 'react-native-keychain';

export default class SettingScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '设置',
  };

  constructor(props) {
    super(props);
  }

  onPressDatetime() {

  }

  onPressFrequency() {

  }

  onPressBackup() {
    Keychain.setGenericPassword('ios', 'fuckd');
  }

  onPressRestore() {
    Keychain.getGenericPassword()
      .then(result => {
        console.log('pain.xie', result)
      })
  }

  onPressAbout() {
    this.props.navigation.navigate('AboutScene');
  }


  render() {
    return (
      <View style={styles.container}>
        {/*<DescribeView text='时间设置'/>*/}
        {/*<SelectItem*/}
          {/*text='输入选择时间:'*/}
          {/*type={Type.top}*/}
          {/*onPress={() => this.onPressDatetime()}*/}
        {/*/>*/}

        {/*<SelectItem*/}
          {/*text='时间刷新频率:'*/}
          {/*type={Type.bottom}*/}
          {/*onPress={() => this.onPressFrequency()}*/}
        {/*/>*/}
        {/*<DescribeView text='备份与恢复'/>*/}
        {/*<SelectItem*/}
          {/*text='备份数据'*/}
          {/*type={Type.top}*/}
          {/*onPress={() => this.onPressBackup()}*/}
        {/*/>*/}

        {/*<SelectItem*/}
          {/*text='恢复数据'*/}
          {/*type={Type.bottom}*/}
          {/*onPress={() => this.onPressRestore()}*/}
        {/*/>*/}
        {/*<DescribeView text='关于'/>*/}
        {/*<SelectItem*/}
          {/*text='关于'*/}
          {/*type={Type.single}*/}
          {/*onPress={() => this.onPressAbout()}*/}
        {/*/>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});