/**
 * Created by xieshangwu on 2018/3/11.
 * 设置页面
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import BaseScene from "./BaseScene";
import DescribeView from "../component/setting/DescribeView";
import SelectItem, {Type} from "../component/setting/SelectItem";
import bmob from '../net/bmob/bmob';
import Stores from '../stores'
import {Theme} from "../common/Theme";
import {getWidth} from "../util/Utils";
import {inject, observer} from 'mobx-react';

@inject('userStore')
@observer
export default class SettingScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '设置',
  };

  constructor(props) {
    super(props);
  }

  /**
   * 设置是否选择时间
   */
  onPressDatetime() {

  }

  /**
   * 设置显示单位
   */
  onPressFrequency() {

  }

  /**
   * 备份
   */
  onPressBackup() {
    if(Stores.userStore.hasLogin) {
      this.props.navigation.navigate('BackupScene');
    } else {
      this.props.navigation.navigate('LoginScene');
    }
  }

  /**
   * 恢复
   */
  onPressRestore() {
    this.props.navigation.navigate('RestoreScene');
  }

  /**
   * 关于
   */
  onPressAbout() {
    this.props.navigation.navigate('AboutScene');
  }

  /**
   * 登陆/退出
   */
  onPressLogin() {
    if (Stores.userStore.hasLogin) {
      Stores.userStore.removeInfo();
    } else {
      this.props.navigation.navigate('LoginScene');
    }
  }

  renderLoginView() {
    let color = this.props.userStore.hasLogin ? Theme.color.btnRed : Theme.color.btnBlue;
    let text = this.props.userStore.hasLogin ? '退出' : '登陆';
    let note = this.props.userStore.hasLogin ? `当前账户: ${Stores.userStore.username}` : '登陆账号可进行备份/恢复数据';

    return (
      <View style={styles.loginContainer}>
        <Text
          style={[styles.btn, {color, borderColor: color}]}
          onPress={() => this.onPressLogin()}
        >
          {text}
        </Text>
        <Text style={styles.note}>{note}</Text>
      </View>
    )
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
        <DescribeView text='备份与恢复'/>
        <SelectItem
          text='备份/还原'
          type={Type.single}
          onPress={() => this.onPressBackup()}
        />

        {/*<SelectItem*/}
          {/*text='恢复数据'*/}
          {/*type={Type.bottom}*/}
          {/*onPress={() => this.onPressRestore()}*/}
        {/*/>*/}
        <DescribeView text='关于'/>
        <SelectItem
          text='关于'
          type={Type.single}
          onPress={() => this.onPressAbout()}
        />

        {this.renderLoginView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loginContainer: {
    alignItems: 'center',
    marginTop: getWidth(25),
  },
  btn: {
    fontSize: getWidth(18),
    paddingHorizontal: getWidth(50),
    paddingVertical: getWidth(10),
    borderRadius: getWidth(2),
    borderWidth: 1
  },
  note: {
    fontSize: 12,
    marginTop: getWidth(12)
  }
});