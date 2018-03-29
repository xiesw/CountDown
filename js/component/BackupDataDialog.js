/**
 * Created by pain.xie on 2018/3/29.
 * 显示备份详细数据
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

class BackupDataDialogCom extends BaseComponent {

  static dialogOptions = {
    hideOnPress: true,
  };

  constructor(props) {
    super(props);
  }

  showDeleteDialog() {
    ConfirmDialog.show({
      message: '确定删除备份吗?',
      confirm: () => this.delete()
    });
  }

  delete() {
    Stores.dataStore.deleteBackupData(this.props.objId)
      .then(() => {
        ToastUtil.show('删除成功');
        Stores.dataStore.selectedId = '';
        Stores.dataStore.selectBackupData = [];
        Stores.dataStore.fetchBackupData();
      });
    this.props.closeMask();
  }

  select() {
    Stores.dataStore.selectedId = this.props.objId;
    Stores.dataStore.selectBackupData = this.props.data;
    this.props.closeMask();
  }

  renderData() {
    let data = this.props.data;
    return data.map((item, index, arr) => {
      let name = item.name;
      let date = DateUtil.getDataAndWeek(item.timestamp);

      return (
        <View style={this.state.style.item}>
          <Text style={{flex: 1}}>{name}</Text>
          <Text style={{flex: 2}}>{date}</Text>
        </View>
      )
    })
  }

  render() {
    let style = this.state.style;
    return (
      <View style={style.container}>
        <Text style={style.title}>数据</Text>
        <ScrollView style={style.content}>
          {this.renderData()}
        </ScrollView>
        <View style={style.divide}/>

        <View style={style.btnContainer}>
          <Text
            style={style.btnDelete}
            onPress={() => {
              this.showDeleteDialog()
            }}
          >删除</Text>
          <View style={style.divide2}/>
          <Text
            style={style.btnSelect}
            onPress={() => this.select()}
          >选择</Text>
        </View>
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
      title: {
        fontSize: 16,
        marginTop: 20,
        marginLeft: getWidth(32)
      },
      content: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20
      },
      item: {
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: getWidth(32),
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

export default class BackupDataDialog extends MaskRootSibling {
  static show(props) {
    return createRootSibling(BackupDataDialogCom, props);
  }
}