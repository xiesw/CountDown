/**
 * Created by xieshangwu on 2018/3/11.
 * 首页
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import BaseScene from "./BaseScene";
import data from '../data.json';
import HomeItem from "../component/HomeItem";

export default class HomeScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '倒计时'
  };

  constructor(props) {
    super(props);
    this.state = ({
      sourceData: data
    })
    this.testTime();
  }

  testTime() {

  }

  renderItem(itemData) {
    return <HomeItem data={itemData.item}/>
  }

  render() {
    return (
      <FlatList
        ref='list'
        style={styles.list}
        data={this.state.sourceData}
        keyExtractor={(itemData, index) => index}
        renderItem={(itemData) => this.renderItem(itemData)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
