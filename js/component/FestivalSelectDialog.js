/**
 * Created by pain.xie on 2018/4/27.
 * 节日选择 后续开发
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
import ConfirmDialog from "./ConfirmDialog";
import {Festival} from "../common/Constants";

class FestivalSelectDialogCom extends BaseComponent {

  static dialogOptions = {
    hideOnPress: true,
  };

  constructor(props) {
    super(props);
  }

  renderItem() {
    return Festival.map((item, index, arr) => {


      return (
        <View>

        </View>
      )
    })
  }

  render() {
    let style = this.state.style;
    return (
      <View style={style.container}>
        {this.renderItem()}
      </View>
    );
  }

  getStyle() {
    return {
      container: {
        width: 280,
        height: 250,
        backgroundColor: 'white',
        borderRadius: 4,
        marginVertical: 35,
        marginHorizontal: getWidth(32)
      },
      item: {

      }
    };
  }
}

export default class FestivalSelectDialog extends MaskRootSibling {
  static show(props) {
    return createRootSibling(FestivalSelectDialogCom, props);
  }
}