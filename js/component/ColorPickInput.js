/**
 * Created by pain.xie on 2018/3/17.
 * 颜色选择输入框
 */

import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import EditText from './EditText';
import {MARK_COLOR} from "../common/Constants"
import {getWidth} from "../util/Utils";

export default class ColorPickInput extends EditText {
  constructor(props) {
    super(props);
  }

  onChange(color) {
    this.props.onChange(color);
  }

  renderOptions() {
    return MARK_COLOR.map((color, index, arr) => {
      //let style = (color === this.props.color ? styles.dotSelect : styles.dot);
      let style = styles.dot;
      return (
        <TouchableOpacity
          activeOpacity={1}
          style={[style, {backgroundColor: color}]}
          key={index}
          onPress={() => this.onChange(color)}
        >
          {color === this.props.color ?
            <Image
              source={require('../../res/image/select.png')}
              style={styles.image}
            />
            : null
          }
        </TouchableOpacity>
      );
    });
  }

  extendRender() {
    return (
      <View style={styles.container}>
        {this.renderOptions()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 64,
    height: getWidth(30),
    width: getWidth(180),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dot: {
    justifyContent:'center',
    alignItems:'center',
    width: getWidth(24),
    height: getWidth(24),
    borderRadius: getWidth(24),
  },
  dotSelect: {
    width: getWidth(30),
    height: getWidth(30),
    borderRadius: getWidth(24),
    borderColor: 'black',
    borderWidth: 2
  },
  image: {
    width: getWidth(18),
    height: getWidth(13),
    tintColor: 'white',
  }
});