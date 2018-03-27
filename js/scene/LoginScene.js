/**
 * Created by pain.xie on 2018/3/26.
 * 登陆页
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native';
import BaseScene from "./BaseScene";
import NormalEditText from '../component/NormalEditText';
import {inject, observer} from 'mobx-react';
import {getWidth} from "../util/Utils";
import {Theme} from "../common/Theme";

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
    if(this.validateAll()) {
      if (this.state.isLogin) {

      } else {

      }
    }
  }

  onPressNote() {
    this.setState({
      isLogin: !this.state.isLogin
    })
  }

  validateAll() {
    if (this.state.isLogin) {
      return this.refs.username.validate() && this.refs.password.validate();
    } else {
      let result = this.refs.username.validate() && this.refs.password.validate() && this.refs.passwordConfirm.validate();
      if (result) {
        return false;
      }
      if (this.refs.password.getValue() !== this.refs.passwordConfirm.getValue()) {
        return false;
      }
      return true;
    }
  }

  render() {
    let store = this.props.userStore;
    return (
      <ScrollView
        bounces={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
      >
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
              placeholder={'确认密码'}
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
            {this.state.isLogin ? '还没有账号, 去' : '已有账号, 去'}
            <Text style={styles.noteOrigin}>
              {this.state.isLogin ? '注册' : '登陆'}
            </Text>
          </Text>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40
  },
  btn: {
    marginTop: getWidth(28),
    fontSize: getWidth(18),
    paddingHorizontal: getWidth(50),
    paddingVertical: getWidth(10),
    borderRadius: getWidth(2),
    borderWidth: 0.5,
    color: Theme.color.btnBlue,
    borderColor: Theme.color.btnBlue
  },
  note: {
    fontSize: getWidth(12),
    marginTop: getWidth(15),
    color: Theme.color.textGray
  },
  noteOrigin: {
    fontSize: getWidth(12),
    color: Theme.color.textDanger
  }
});