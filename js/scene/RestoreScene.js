/**
 * Created by pain.xie on 2018/3/26.
 * 恢复页面
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import BaseScene from "./BaseScene";
import {inject, observer} from 'mobx-react';

@inject('dataStore')
@observer
export default class RestoreScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '恢复',
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