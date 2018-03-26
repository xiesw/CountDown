/**
 * Created by pain.xie on 2018/3/26.
 * 备份页面
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import BaseScene from "./BaseScene";

export default class BackupScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '备份',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});