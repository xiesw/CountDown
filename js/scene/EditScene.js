/**
 * Created by xieshangwu on 2018/3/11.
 * 添加倒计时页面
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {getWidth} from "../common/Global"
import DateUtil from "../util/DateUtil";
import BaseScene from "./BaseScene";
import NormalEditText from '../component/NormalEditText';
import PickInput from '../component/PickInput';
import ColorPickInput from '../component/ColorPickInput';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DataDao from "../dao/DataDao";

export default class EditScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '倒计时'
  };

  constructor(props) {
    super(props);
    this.data = this.props.navigation.state.params.data;
    this.sourceData = this.props.navigation.state.params.sourceData;
    this.state = {
      isDatePickerVisible: false,
      color: ''
    }
  }

  showDatePicker() {
    this.setState({isDatePickerVisible: true})
  }

  hideDatePicker() {
    this.setState({isDatePickerVisible: false})
  }

  handleDatePicked(date) {
    let d = new Date(date);
    console.log('pain.xie', DateUtil.getDataAndWeek(d.getTime()));
    this.hideDatePicker();
  };

  onPickDate() {
    this.showDatePicker();
  }

  showRepeatDialog() {

  }

  showTopDialog() {

  }

  onChangeColor(color) {
    let c = this.state.color === color ? '' : color
    this.setState({
      color: c
    });
  }

  delete() {

  }

  ok() {
    DataDao.save(this.sourceData);
  }


  editRender() {
    return (
      <View style={styles.editContainer}>
        <NormalEditText
          ref='title'
          placeholder={'标题'}
          validate='notnull'
          source={require('../../res/image/title.png')}
        />

        <PickInput
          ref='date'
          editable={false}
          placeholder={'选择日期'}
          onPress={() => this.onPickDate()}
          source={require('../../res/image/time.png')}
        />

        <PickInput
          ref='repeat'
          editable={false}
          placeholder={'重复'}
          onPress={() => this.showRepeatDialog()}
          source={require('../../res/image/repeat.png')}
        />

        <PickInput
          ref='top'
          editable={false}
          placeholder={'置顶'}
          onPress={() => this.showTopDialog()}
          source={require('../../res/image/top.png')}
        />

        <ColorPickInput
          ref='color'
          editable={false}
          placeholder={'标记'}
          color={this.state.color}
          onChange={(color) => this.onChangeColor(color)}
          source={require('../../res/image/mark.png')}
        />
      </View>
    )
  }

  btnRender() {
    return (
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => this.delete()}
          style={styles.btnDelete}
        >
          <Text style={styles.btnText}>删除</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.ok()}
          style={styles.btnOk}
        >
          <Text style={styles.btnText}>确定</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {

    return (
      <View style={styles.container}>

        {this.editRender()}

        {this.btnRender()}

        <DateTimePicker
          isVisible={this.state.isDatePickerVisible}
          onConfirm={(date) => this.handleDatePicked(date)}
          onCancel={() => this.hideDatePicker()}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  editContainer: {
    marginTop: 30
  },

  btnContainer: {
    flexDirection: 'row',
    marginTop: 32
  },
  btnDelete: {
    flex: 1,
    height: getWidth(48),
    marginLeft: getWidth(32),
    marginRight: getWidth(16),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getWidth(2),
    backgroundColor: '#FE3824',
    elevation: 2,
    shadowColor: '#666666',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: getWidth(2),
  },
  btnOk: {
    flex: 1,
    height: getWidth(48),
    marginLeft: getWidth(16),
    marginRight: getWidth(32),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getWidth(2),
    backgroundColor: '#618FE7',
    elevation: 2,
    shadowColor: '#666666',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: getWidth(2),
  },
  btnText: {
    fontSize: getWidth(18),
    color: 'white'
  }
});