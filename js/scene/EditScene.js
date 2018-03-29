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
import {getWidth} from "../util/Utils"
import DateUtil from "../util/DateUtil";
import BaseScene from "./BaseScene";
import NormalEditText from '../component/NormalEditText';
import PickInput from '../component/PickInput';
import ColorPickInput from '../component/ColorPickInput';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {NavigationActions} from 'react-navigation'
import ListDialog from "../component/ListDialog";
import {APP_EVENT} from "../common/Constants";
import {Theme} from "../common/Theme";
import Stores from '../stores';
import {inject, observer} from 'mobx-react';
import ToastUtil from "../util/ToastUtil";

@inject('editStore')
@observer
export default class EditScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '编辑'
  };

  constructor(props) {
    super(props);
    this.handleData();
  }

  componentWillUnmount() {
    this.props.editStore.clear();
  }

  /**
   * 处理数据
   */
  handleData() {
    let store = this.props.editStore;
    if (Stores.editStore.isUpdate) {
      let data = Stores.dataStore.currentItemData;
      store.timestamp = data.timestamp;
      store.name = data.name;
      store.color = data.color;
      store.repeat = data.repeat;
      store.top = data.top;
      store.dateAndWeek = DateUtil.getDataAndWeek(store.timestamp);
    } else {
      store.timestamp = DateUtil.getTodayTimeStamp();
      store.dateAndWeek = DateUtil.getDataAndWeek(store.timestamp);
    }
  }

  /**
   * 处理时间控件选择值
   */
  handleDatePicked(date) {
    let store = this.props.editStore;
    let d = new Date(date);
    store.timestamp = DateUtil.getZeroTimeStamp(d.getTime());
    this.refs.date.setValue(DateUtil.getDataAndWeek(store.timestamp));
    Stores.editStore.isDateTimePickVisible = false;
  };

  /**
   * 处理重复弹窗选择值
   */
  onChangeRepeatValue(value) {
    this.props.editStore.repeat = value;
    this.refs.repeat.setValue(repeatMap.get(value));
    Stores.editStore.isRepeatDialogVisible = false;
  }

  /**
   * 处理置顶选择值
   * @param value
   */
  onChangeTopValue(value) {
    this.props.editStore.top = value;
    this.refs.top.setValue(topMap.get(value));
    Stores.editStore.isTopDialogVisible = false;
  }

  /**
   * 处理颜色改变值
   * @param color
   */
  onChangeColor(color) {
    let c = this.props.editStore.color;
    this.props.editStore.color = c === color? '': color;
  }

  /**
   * 点击删除按钮
   */
  deleteItem() {
    if (Stores.editStore.isUpdate) {
      Stores.dataStore.delete(Stores.dataStore.currentItemData);
      ToastUtil.show('删除成功');
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

    let store = this.props.editStore;
    let data = {};
    data.timestamp = store.timestamp;
    data.color = store.color;
    data.top = store.top;
    data.repeat = store.repeat;
    data.name = this.refs.title.getValue();

    if (Stores.editStore.isUpdate) {
      Stores.dataStore.update(Stores.dataStore.currentItemData, data);
      Stores.dataStore.currentItemData = data;
      ToastUtil.show('修改成功');
      this.props.navigation.goBack();
    } else {
      Stores.dataStore.insert(data);
      ToastUtil.show('添加成功');
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
    let store = this.props.editStore;
    return (
      <View style={styles.editContainer}>
        <NormalEditText
          ref='title'
          value={store.name}
          placeholder={'标题'}
          validate='title'
          source={require('../../res/image/title.png')}
        />

        <PickInput
          ref='date'
          value={store.dateAndWeek}
          onPress={() => store.isDateTimePickVisible = true}
          source={require('../../res/image/date.png')}
        />

        {/* pain.todo <PickInput*/}
        {/*ref='repeat'*/}
        {/*value={repeatMap.get(this.state.repeat)}*/}
        {/*onPress={() => store.isRepeatDialogVisible = true}*/}
        {/*source={require('../../res/image/repeat.png')}*/}
        {/*/>*/}

        <PickInput
          ref='top'
          value={topMap.get(store.top)}
          onPress={() => store.isTopDialogVisible = true}
          source={require('../../res/image/top.png')}
        />

        <ColorPickInput
          ref='color'
          editable={false}
          placeholder={'标记'}
          color={store.color}
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
    let store = this.props.editStore;
    return (
      <View style={{position: 'absolute'}}>
        <DateTimePicker
          isVisible={store.isDateTimePickVisible}
          onConfirm={(date) => this.handleDatePicked(date)}
          onCancel={() => store.isDateTimePickVisible = false}
          mode='date'
        />

        <ListDialog
          isVisible={store.isRepeatDialogVisible}
          ref='repeatDialog'
          options={repeatMap}
          value={store.repeat}
          onChange={(value = {}) => this.onChangeRepeatValue(value)}
        />

        <ListDialog
          isVisible={store.isTopDialogVisible}
          ref='topDialog'
          options={topMap}
          value={store.top}
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
    backgroundColor: Theme.color.btnRed,
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
    backgroundColor: Theme.color.btnBlue,
    elevation: 2,
    shadowColor: Theme.color.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: getWidth(2),
  },
  btnText: {
    fontSize: getWidth(18),
  }
});