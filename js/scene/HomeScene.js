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
  DeviceEventEmitter,
  AppState,
  FlatList,
  Image,
  AsyncStorage
} from 'react-native';
import BaseScene from "./BaseScene";
import data from '../data.json';
import HomeItem from "../component/HomeItem";
import {getWidth} from "../common/Global";
import DataDao from "../dao/DataDao";

export default class HomeScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '倒计时'
  };

  constructor(props) {
    super(props);
    this.sourceData = [];
    this.state = ({
      sourceData: []
    });
  }

  componentDidMount() {
    this.loadData();
    AppState.addEventListener('change', (nextAppState) => this.handleAppStateChange(nextAppState));
    // this.timer = setInterval(() => {
    //   this.setState({
    //     sourceData: this.sourceData
    //   })
    // }, 1000)
  }

  loadData() {
    DataDao.load().then(result => {
      this.sourceData = result;
      console.log('pain.xie', result);
      this.setState({
        sourceData: result
      })
    })
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  handleAppStateChange(nextAppState) {
    if (nextAppState === 'active') {
      console.log('pain.xie', 'active');
      //this.timer = setInterval(() => this.loadData(), 1000)
    } else {
      console.log('pain.xie', 'background');
      this.timer && clearInterval(this.timer);
    }
  }

  /**
   * 添加新条目
   */
  add() {
    this.props.navigation.navigate('EditScene', {sourceData: this.sourceData});
  }

  renderItem(itemData) {
    return <HomeItem
      sourceData={this.state.sourceData}
      data={itemData.item}
      {...this.props}
    />
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ref='list'
          style={styles.list}
          data={this.state.sourceData}
          keyExtractor={(itemData, index) => index}
          renderItem={(itemData) => this.renderItem(itemData)}
        />
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => this.add()}
        >
          <Image
            source={require('../../res/image/add.png')}
          />
        </TouchableOpacity>
      </View>
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
  imageContainer: {
    position: 'absolute',
    right: getWidth(36),
    bottom: getWidth(54),
    elevation: 2,
    shadowColor: '#666666',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: getWidth(2),
  }
});
