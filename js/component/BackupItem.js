/**
 * Created by pain.xie on 2018/3/29.
 * 备份列表item
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AppState,
  Image
} from 'react-native';
import {getWidth} from "../util/Utils"
import DateUtil from "../util/DateUtil";
import {Theme} from "../common/Theme";
import Stores from "../stores";
import {EDIT_MODEL} from "../common/Constants";
import ToastUtil from "../util/ToastUtil";
import TestView from "./TestView";

export default class BackupItem extends Component {
  constructor(props) {
    super(props);
  }

  onPressItem() {
    TestView.show();
  }

  handleData() {
    let bmobObj = this.props.bmobObj;
    let data = JSON.parse(bmobObj.get('data'));

    this.objId = bmobObj.id;
    this.count = data.length;
    this.updatedAt = bmobObj.updatedAt;
  }

  render() {
    this.handleData();
    return (
      <TouchableOpacity
        onPress={() => this.onPressItem()}
        style={styles.container}
      >
        <View style={{flexDirection: 'row', marginHorizontal: 32, paddingVertical: getWidth(10)}}>
          <Text style={styles.time}>{this.updatedAt}</Text>
          <Text style={styles.count}>{`${this.count}条记录`}</Text>
          {this.objId === Stores.dataStore.selectedBackupItem ?
            <Image source={require('../../res/image/select.png')}/> : <View/>}
        </View>

        <View style={styles.divide}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  time: {
    flex: 2,
    fontSize: 14
  },
  count: {
    flex: 1,
    fontSize: 14
  },
  image: {},
  divide: {
    height: 0.5,
    opacity: 0.5,
    marginHorizontal: getWidth(32),
    backgroundColor: Theme.color.divide
  }
});

