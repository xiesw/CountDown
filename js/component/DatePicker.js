/**
 * Created by pain.xie on 2018/3/29.
 * 仿魅族时间选择器
 */

import React from 'react'
import {
  View,
  Dimensions,
  Image,
  Text,
  ScrollView,
  TextInput,
  PixelRatio,
  AsyncStorage
} from 'react-native'

import {BaseComponent} from './BaseComponent';
import MaskRootSibling, {createRootSibling} from './MaskRootSibling';
import Stores from '../stores';
import {Theme} from "../common/Theme";
import {getWidth} from "../util/Utils";
import DateUtil from "../util/DateUtil";

class DatePickerCom extends BaseComponent {

  static dialogOptions = {
    hideOnPress: true,
  };

  constructor(props) {
    super(props);
  }

  render() {
    let style = this.state.style;
    return (
      <View style={style.container}>
      </View>
    );
  }

  getStyle() {
    return {
      container: {
        width: getWidth(325),
        height: getWidth(375),
        backgroundColor: 'white',
        borderRadius: 8,
        marginVertical: 35,
        marginHorizontal: getWidth(32)
      },
    };
  }
}

export default class DatePicker extends MaskRootSibling {
  static show(props) {
    return createRootSibling(DatePickerCom, props);
  }
}