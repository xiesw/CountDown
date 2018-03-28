/**
 * Created by pain.xie on 2018/3/26.
 * 备份页面
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import BaseScene from "./BaseScene";
import {inject, observer} from 'mobx-react';
import {getWidth} from "../util/Utils";

@inject('dataStore')
@observer
export default class BackupScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '备份/还原',
  };

  constructor(props) {
    super(props);
  }

  backup() {
    this.props.dataStore.autoBackup();
  }

  restore() {

  }

  render() {
    return (
      <View style={styles.container}>

        <View>
          <Text
            style={styles.btn}
            onPress={() => this.backup()}
          >备份</Text>
          <Text
            style={styles.btn}
            onPress={() => this.restore()}
          >还原</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  btnContainer: {
    flexDirection: 'row'
  },
  btn: {
    fontSize: getWidth(18),
    paddingHorizontal: getWidth(50),
    paddingVertical: getWidth(10),
    borderRadius: getWidth(2),
    borderWidth: 1
  },
});