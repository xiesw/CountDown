/**
 * Created by pain.xie on 2018/3/26.
 * 备份页面
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import BaseScene from "./BaseScene";
import {inject, observer} from 'mobx-react';
import {getWidth} from "../util/Utils";
import DescribeView from "../component/setting/DescribeView";
import BackupList from "../component/BackupList";
import {Theme} from "../common/Theme";
import Stores from "../stores";
import {useStrict, toJS} from 'mobx';
import ToastUtil from "../util/ToastUtil";
import ConfirmDialog from "../component/ConfirmDialog";
import {observable, action, runInAction, reaction, autorun, computed} from 'mobx';
import AnalyticsUtil from '../util/um/AnalyticsUtil'
import {APP_EVENT} from "../common/Constants";
import Utils from "../util/Utils";
import UpdateUtil from "../util/UpdateUtil";

@inject('dataStore')
@observer
export default class BackupScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '备份/还原',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dataStore.fetchBackupData();
    AnalyticsUtil.onEvent(APP_EVENT.BackupScene);
  }

  componentWillUnmount() {
    this.props.dataStore.selectedId = '';
    this.props.dataStore.selectBackupData = [];
  }

  /**
   * 备份数据
   */
  backup() {
    if (toJS(this.props.dataStore.backupData).length > 50) {
      ToastUtil.show('个人最多备份数为50条');
    } else if(toJS(this.props.dataStore.dataSource).length === 0){
      ToastUtil.show('当前无数据可备份');
    }else {
      this.props.dataStore.backup()
        .then(() => {
          ToastUtil.show('备份成功');
          Stores.dataStore.fetchBackupData();
        });
      AnalyticsUtil.onEvent(APP_EVENT.Backup);
    }
  }

  /**
   * 显示确定还原弹出
   */
  showConfirmDialog() {
    if (this.props.dataStore.selectedId) {
      ConfirmDialog.show({
        message: '确定还原吗?',
        confirm: () => this.restore()
      });
    } else {
      ToastUtil.show('请从列表中选择还原的数据')
    }
  }

  /**
   * 还原数据
   */
  restore() {
    let dataArr = toJS(this.props.dataStore.selectBackupData);
    UpdateUtil.updateId(dataArr);
    this.props.dataStore.reset(dataArr);
    ToastUtil.show('还原成功');
    AnalyticsUtil.onEvent(APP_EVENT.Restore);
  }

  render() {
    let store = this.props.dataStore;
    return (
      <View style={styles.container}>

        <View>
          <DescribeView
            text='自动备份'
          />
          <BackupList
            data={toJS(store.autoBackupData)}
          />
          <DescribeView
            text='手动备份'
          />
          <BackupList
            data={toJS(store.backupData)}
          />
        </View>

        <View style={styles.btnContainer}>

          <Text
            style={styles.btnBackup}
            onPress={() => this.backup()}
          >备份</Text>
          <Text
            style={styles.btnRestore}
            onPress={() => this.showConfirmDialog()}
          >还原</Text>
        </View>

        <Text style={styles.account}>
          {`当前账户: ${Stores.userStore.username}`}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: getWidth(28)

  },
  btnBackup: {
    fontSize: getWidth(18),
    paddingHorizontal: getWidth(50),
    paddingVertical: getWidth(10),
    borderRadius: getWidth(2),
    borderWidth: 1,
    color: Theme.color.btnBlue,
    borderColor: Theme.color.btnBlue,
  },
  btnRestore: {
    fontSize: getWidth(18),
    paddingHorizontal: getWidth(50),
    paddingVertical: getWidth(10),
    borderRadius: getWidth(2),
    borderWidth: 1,
    color: Theme.color.red,
    borderColor: Theme.color.red
  },
  account: {
    color: Theme.color.textGray,
    marginTop: getWidth(12),
    fontSize: 12,
    alignSelf: 'center'
  }
});