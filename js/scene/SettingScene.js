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

export default class SettingScene extends BaseScene {
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