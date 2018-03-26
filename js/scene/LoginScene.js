/**
 * Created by pain.xie on 2018/3/26.
 * 登陆页
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import BaseScene from "./BaseScene";
import NormalEditText from '../component/NormalEditText';
import {inject, observer} from 'mobx-react';

@inject('userStore')
@observer
export default class LoginScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '登陆',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLogin: true
    };
  }

  onPressBtn() {

  }

  onPressNote() {

  }

  render() {
    let store = this.props.userStore;
    return (
      <View style={styles.container}>

        <NormalEditText
          ref='username'
          placeholder={'用户名'}
          validate='username'
          source={require('../../res/image/username.png')}
        />

        <NormalEditText
          ref='password'
          placeholder={'密码'}
          validate='password'
          source={require('../../res/image/password.png')}
        />

        {!this.state.isLogin
          ? <NormalEditText
            ref='passwordConfirm'
            placeholder={'密码'}
            validate='password'
            source={require('../../res/image/password.png')}
          />
          : null}

        <Text
          style={styles.btn}
          onPress={() => this.onPressBtn()}
        >
          {this.state.isLogin ? '登陆' : '注册'}
        </Text>

        <Text
          style={styles.note}
          onPress={() => this.onPressNote()}
        >
          {this.state.isLogin ? '还没有账号, 去注册' : '已有账号, 去登陆'}
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {},
  note: {

  }
});