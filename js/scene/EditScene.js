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
  DeviceEventEmitter,
  ScrollView
} from 'react-native';
import {getWidth} from "../common/Global"
import DateUtil from "../util/DateUtil";
import BaseScene from "./BaseScene";
import NormalEditText from '../component/NormalEditText';
import PickInput from '../component/PickInput';
import ColorPickInput from '../component/ColorPickInput';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DataDao from "../dao/DataDao";
import {NavigationActions} from 'react-navigation'
import Utils from "../util/Utils";
import ListDialog from "../component/ListDialog";
import {appEvent} from "../common/Constants";
import {Theme} from "../common/Theme";

export default class EditScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '编辑'
  };

  constructor(props) {
    super(props);
    this.data = this.props.navigation.state.params.data;
    this.sourceData = this.props.navigation.state.params.sourceData;
    this.state = {
      isDatePickerVisible: false,
      color: '',
      repeat: 'once',
      top: false,
    };

    this.handleData();
  }

  /**
   * 处理数据
   */
  handleData() {
    this.timestamp = DateUtil.getTodayTimeStamp();
    this.date = DateUtil.getDataAndWeek(this.timestamp);

    if (this.data) {
      this.name = this.data.name;
      this.timestamp = this.data.timestamp;
      this.date = DateUtil.getDataAndWeek(this.timestamp);

      this.state.color = this.data.color;
      this.state.top = this.data.top;
      this.state.repeat = this.data.repeat;
      this.setState({
        color: this.date.color,
        top: this.data.top,
        repeat: this.data.repeat
      });
    }
  }

  /**
   * 设置时间控件显示/隐藏
   * @param visible
   */
  setDatePickerVisible(visible) {
    this.setState({isDatePickerVisible: visible})
  }

  /**
   * 处理时间控件选择值
   */
  handleDatePicked(date) {
    let d = new Date(date);
    this.timestamp = DateUtil.getZeroTimeStamp(d.getTime());
    this.refs.date.setValue(DateUtil.getDataAndWeek(this.timestamp));
    this.setDatePickerVisible(false);
  };

  /**
   * 显示重复弹窗
   */
  showRepeatDialog() {
    this.refs.repeatDialog.setVisible(true);
  }

  /**
   * 处理重复弹窗选择值
   */
  onChangeRepeatValue(value) {
    this.state.repeat = value;
    this.setState({
      repeat: value
    });
    this.refs.repeat.setValue(repeatMap.get(value));

  }

  /**
   * 显示置顶弹窗
   */
  showTopDialog() {
    this.refs.topDialog.setVisible(true);
  }

  /**
   * 处理置顶选择值
   * @param value
   */
  onChangeTopValue(value) {
    this.state.top = value;
    this.setState({
      top: value
    });
    this.refs.top.setValue(topMap.get(value));
  }

  /**
   * 处理颜色改变值
   * @param color
   */
  onChangeColor(color) {
    let c = this.state.color === color ? '' : color;
    this.setState({
      color: c
    });
  }

  /**
   * 点击删除按钮
   */
  deleteItem() {
    if (this.data) {
      Utils.removeArrayItem(this.sourceData, this.data);
      DataDao.save(this.sourceData);
      this.resetToHome();
    } else {
      this.props.navigation.goBack();
    }
  }

  /**
   * 点击确定按钮
   */
  saveItem() {
    if (!this.validateAll()) {
      return;
    }

    if (this.data) {
      this.data.timestamp = this.timestamp;
      this.data.color = this.state.color;
      this.data.top = this.state.top;
      this.data.repeat = this.state.repeat;
      this.data.name = this.refs.title.getValue();
    } else {
      let data = {};
      data.timestamp = this.timestamp;
      data.color = this.state.color;
      data.top = this.state.top;
      data.repeat = this.state.repeat;
      data.name = this.refs.title.getValue();
      this.sourceData.push(data);
    }
    DataDao.save(this.sourceData);

    if (this.data) {
      DeviceEventEmitter.emit(appEvent.dataChange);
      this.props.navigation.goBack();
    } else {
      this.resetToHome();
    }
  }

  /**
   * 跳转到首页
   */
  resetToHome() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'HomeScene'})
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  /**
   * 校验所有选项
   * @returns {*}
   */
  validateAll() {
    return this.refs.title.validate();
  }

  editRender() {
    return (
      <View style={styles.editContainer}>
        <NormalEditText
          ref='title'
          value={this.name}
          placeholder={'标题'}
          validate='title'
          source={require('../../res/image/title.png')}
        />

        <PickInput
          ref='date'
          value={this.date}
          onPress={() => this.setDatePickerVisible(true)}
          source={require('../../res/image/date.png')}
        />

        {/* pain.todo <PickInput*/}
          {/*ref='repeat'*/}
          {/*value={repeatMap.get(this.state.repeat)}*/}
          {/*onPress={() => this.showRepeatDialog()}*/}
          {/*source={require('../../res/image/repeat.png')}*/}
        {/*/>*/}

        <PickInput
          ref='top'
          value={topMap.get(this.state.top)}
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
          onPress={() => this.deleteItem()}
          style={styles.btnDelete}
        >
          <Text style={styles.btnText}>删除</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.saveItem()}
          style={styles.btnOk}
        >
          <Text style={styles.btnText}>确定</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderDialog() {
    return (
      <View style={{position: 'absolute'}}>
        <DateTimePicker
          isVisible={this.state.isDatePickerVisible}
          onConfirm={(date) => this.handleDatePicked(date)}
          onCancel={() => this.setDatePickerVisible(false)}
          mode='date'
        />

        <ListDialog
          ref='repeatDialog'
          options={repeatMap}
          value={this.state.repeat}
          onChange={(value = {}) => this.onChangeRepeatValue(value)}
        />

        <ListDialog
          ref='topDialog'
          options={topMap}
          value={this.state.top}
          onChange={(value = {}) => this.onChangeTopValue(value)}
        />
      </View>
    )
  }

  render() {
    return (

      <ScrollView
        bounces={false}
        overScrollMode="never"
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {this.editRender()}

        {this.btnRender()}

        {this.renderDialog()}

      </ScrollView>

    );
  }
}

const topMap = new Map([
  [true, '置顶'],
  [false, '不置顶']
]);

const repeatMap = new Map([
  ['once', '仅一次'],
  ['everyDay', '每天'],
  ['everyWeek', '每周'],
  ['everyMouth', '每月'],
  ['everyYear', '每年'],
]);

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
    shadowColor: Theme.color.shadow,
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
    shadowColor: Theme.color.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: getWidth(2),
  },
  btnText: {
    fontSize: getWidth(18),
    color: 'white'
  }
});