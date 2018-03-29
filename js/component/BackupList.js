/**
 * Created by pain.xie on 2018/3/29.
 * 备份列表
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {BaseComponent} from "./BaseComponent";
import {getWidth} from "../util/Utils";
import {Theme} from "../common/Theme";
import {useStrict, toJS} from 'mobx';
import BackupItem from './BackupItem';
import Stores from "../stores";

export default class BackupList extends BaseComponent {
  constructor(props) {
    super(props);
  }

  renderItem(itemData) {
    return (<BackupItem
        bmobObj={itemData.item}
      />
    )
  }

  render() {
    this.dataSource = this.props.data;
    return (
      <View>
        <FlatList
          ref='list'
          style={styles.list}
          data={this.dataSource}
          keyExtractor={(itemData, index) => index + ''}
          renderItem={(itemData) => this.renderItem(itemData)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    maxHeight: getWidth(300)
  },
});