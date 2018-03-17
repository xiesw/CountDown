/**
 * Created by pain.xie on 2018/3/17.
 * 颜色选择输入框
 */

import React, {Component} from 'react';
import {
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Modal,
  Platform,
  DeviceEventEmitter,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import EditText from './EditText';
import {markColor} from "../common/Constants"
import {getWidth} from "../common/Global";

export default class ColorPickInput extends EditText {
  constructor(props) {
    super(props);
  }

  onChange(color) {
    this.props.onChange(color);
  }

  renderOptions() {
    return markColor.map((color, index, arr) => {
      let style = (color === this.props.color ? styles.dotSelect : styles.dot);
      return (
        <TouchableOpacity
          activeOpacity={1}
          style={[style, {backgroundColor: color}]}
          key={index}
          onPress={() => this.onChange(color)}
        />
      );
    });
  }

  extendRender() {
    let style = {
      marginRight: 64,
      width: getWidth(180),
      flexDirection: 'row',
      justifyContent: 'space-between'
    };

    return (
      <View style={style}>
        {this.renderOptions()}
      </View>
    )
  }


}

const styles = StyleSheet.create({
  dot: {
    width: getWidth(24),
    height: getWidth(24),
    borderRadius: getWidth(24),
  },
  dotSelect: {
    width: getWidth(24),
    height: getWidth(24),
    borderRadius: getWidth(24),
    borderColor: '#000000',
    borderWidth: 2
  }
});