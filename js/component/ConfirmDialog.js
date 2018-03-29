/**
 * Created by pain.xie on 2018/3/29.
 * 确认弹框
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
import ToastUtil from "../util/ToastUtil";

class ConfirmDialogCom extends BaseComponent {

  static dialogOptions = {
    hideOnPress: false,
  };

  constructor(props) {
    super(props);
  }

  cancel() {
    this.props.closeMask();
  }

  ok() {
    this.props.confirm();
    this.props.closeMask();
  }

  render() {
    let style = this.state.style;
    return (
      <View style={style.container}>
        <Text style={style.content}>{this.props.message}</Text>
        <View style={style.divide}/>

        <View style={style.btnContainer}>
          <Text
            style={style.btnDelete}
            onPress={() => this.cancel()}
          >取消</Text>
          <View style={style.divide2}/>
          <Text
            style={style.btnSelect}
            onPress={() => this.ok()}
          >确认</Text>
        </View>
      </View>
    );
  }

  getStyle() {
    return {
      container: {
        width: 280,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 4,
        marginVertical: 35,
        marginHorizontal: getWidth(32)
      },
      content: {
        flex: 1,
        margin: 20,
        fontSize: 18
      },
      divide: {
        width: '100%',
        height: 0.5,
        opacity: 0.5,
        backgroundColor: Theme.color.divide
      },
      divide2: {
        width: 0.5,
        height: '100%',
        opacity: 0.5,
        backgroundColor: Theme.color.divide
      },
      btnContainer: {
        flexDirection: 'row'
      },
      btnDelete: {
        flex: 1,
        fontSize: getWidth(16),
        color: Theme.color.btnRed,
        textAlign: 'center',
        paddingVertical: getWidth(12)
      },
      btnSelect: {
        flex: 1,
        fontSize: getWidth(16),
        color: Theme.color.btnBlue,
        textAlign: 'center',
        paddingVertical: getWidth(12)
      }
    };
  }
}

export default class ConfirmDialog extends MaskRootSibling {
  static show(props) {
    return createRootSibling(ConfirmDialogCom, props);
  }
}