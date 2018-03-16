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
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class AddScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '倒计时'
  };

  constructor(props) {
    super(props);
    this.state={
      isDateTimePickerVisible: false,
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    let d = new Date(date);
    console.log('pain.xie', DateUtil.getDataAndWeek(d.getTime()));
    this._hideDateTimePicker();
  };

  delete() {

  }

  ok() {
    this._showDateTimePicker();
  }

  render() {

    return (
      <View style={styles.container}>
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

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: 'row',

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