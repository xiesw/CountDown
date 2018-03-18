/**
 * Created by pain.xie on 2018/3/16.
 * 错误提示组件
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  Animated
} from 'react-native';

import {BaseComponent} from './BaseComponent'

export class ErrorComponent extends BaseComponent {
  constructor(props) {
    super(props);
    this.state.fadeInOpacity = new Animated.Value(0);
    this.state.isShow = false;
  }

  hide() {
    this.setState({
      text: '',
      isShow: false,
    });
  }

  show(errorMessage) {
    this.setState({
      text: errorMessage,
      isShow: true,
    });
    this.state.fadeInOpacity.setValue(0);
    Animated.spring(
      this.state.fadeInOpacity,
      {toValue: 1}
    ).start();
  }

  getStyle() {
    return {
      continer: {},
      text: {
        color: global.theme.color.textDanger,
        marginBottom: 5
      }
    };
  }

  render() {
    if (this.state.isShow) {
      return (
        <View style={[this.state.style.continer]}>
          <Animated.Text style={[this.state.style.text, {
            opacity: this.state.fadeInOpacity,
            transform: [{
              translateX: this.state.fadeInOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0]
              })
            }]
          }]}>{this.state.text}</Animated.Text>
        </View>
      );
    }
    else {
      return (null);
    }
  }
}
