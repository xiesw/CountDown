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
    this.state = ({
      sourceData: []
    });
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    DataDao.load().then(result => {
      this.setState({
        sourceData: result
      })
    })
  }

  /**
   * 添加新条目
   */
  add() {
    this.props.navigation.navigate('EditScene', {sourceData: this.state.sourceData});
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
