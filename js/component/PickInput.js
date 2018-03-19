/**
 * Created by pain.xie on 2018/3/17.
 * 选择组件
 */

import React, {Component} from 'react';
import {
  Image,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import EditText from './EditText';

export default class PickInput extends EditText {
  constructor(props) {
    super(props);
  }

  extendRender() {
    let style = {
      marginRight: 64
    };
    return (
      <Image
        style={style}
        source={require('../../res/image/more.png')}
      />
    )
  }

  render() {
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={() => this.props.onPress()}>
          <View style={this.state.style.container}>
            {this.iconRender()}
            {this.textRender()}
            {this.editRender()}
            {this.extendRender()}
          </View>
        </TouchableWithoutFeedback>
        {this.errorRender()}
        {this.divideRender()}
      </View>
    );
  }

}