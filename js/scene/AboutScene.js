/**
 * Created by xieshangwu on 2018/3/11.
 * 关于页面
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';
import BaseScene from "./BaseScene";
import {getWidth} from "../util/Utils";
import {Theme} from "../common/Theme";
import AnalyticsUtil from '../util/um/AnalyticsUtil'
import {APP_EVENT} from "../common/Constants";

export default class AboutScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '关于'
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AnalyticsUtil.onEvent(APP_EVENT.AboutScene);
  }

  goGitHub() {
    let url = 'https://github.com/xiesw/CountDown';
    Linking.openURL(url)
      .catch((err) => {
        console.log('An error occurred', err);
      });
    AnalyticsUtil.onEvent(APP_EVENT.GitHub);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../res/image/timer.png')}
        />
        <Text style={styles.title}>{global.appInfo.appName}</Text>
        <Text style={styles.version}>{`version:${global.appInfo.version}`}</Text>
        <Text style={styles.des}>{'开源的倒计时app项目\n' + '采用ReactNative开发,同时适用于ios/android平台'}</Text>

        <View style={styles.card}>
          <Text style={styles.contact}>联系方式:</Text>
          <Text style={styles.text}>{'Author:  pain.xie'}</Text>
          <Text style={styles.text}>{'E-mail:  pal_xie@foxmail.com'}</Text>
          <Text style={styles.text}>{'Location:  ShenZhen'}</Text>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => this.goGitHub()}
          >
            <Text style={styles.text}>{'GitHub:  '}</Text>
            <Text style={styles.link}>{'https://github.com/xiesw/CountDown'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>{'欢迎各位issues、star'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    marginTop: getWidth(50)
  },
  title: {
    fontSize: 18,
    color: 'black',
    marginTop: getWidth(16)
  },
  version: {
    fontSize: 12,
    color: Theme.color.textGray
  },
  des: {
    marginTop: getWidth(10),
    fontSize: 12,
    textAlign: 'center'
  },
  card: {
    width: '100%',
    marginTop: getWidth(30),
    marginLeft: getWidth(32)
  },
  contact: {
    fontSize: getWidth(14),
    color: Theme.color.blue

  },
  text: {
    fontSize: getWidth(14),
    color: Theme.color.textDefault,
    marginTop: 8
  },
  link: {
    marginTop: 8,
    fontSize: getWidth(14),
    color: Theme.color.blue
  }

});