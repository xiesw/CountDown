/**
 * Created by xieshangwu on 2018/3/11.
 * 详情页
 */


import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import BaseScene from "./BaseScene";


export default class DetailScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '倒计时',
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