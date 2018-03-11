/**
 * Created by xieshangwu on 2018/3/11.
 * 关于页面
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import BaseScene from "./BaseScene";


export default class AboutScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '关于'
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('DetailScene');
          }}
        >
          <Text>hi</Text>

        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});