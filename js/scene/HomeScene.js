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
  Image
} from 'react-native';
import BaseScene from "./BaseScene";
import data from '../data.json';
import HomeItem from "../component/HomeItem";
import {getWidth} from "../common/Global";

export default class HomeScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '倒计时'
  };

  constructor(props) {
    super(props);
    this.state = ({
      sourceData: data
    });
  }

  /**
   * 添加新条目
   */
  add() {
    this.props.navigation.navigate('EditScene');
  }

  renderItem(itemData) {
    return <HomeItem data={itemData.item} {...this.props}/>
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
