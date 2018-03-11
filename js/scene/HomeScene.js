/**
 * Created by xieshangwu on 2018/3/11.
 * 首页
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import BaseScene from "./BaseScene";

export default class HomeScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '倒计时'
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
       <View style={styles.container}>
         <TouchableOpacity
           onPress={() => {
             this.props.navigation.navigate('AboutScene');
           }}
         >
            <Text>hello</Text>

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
