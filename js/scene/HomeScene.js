/**
 * Created by xieshangwu on 2018/3/11.
 * 首页
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  DeviceEventEmitter,
  FlatList,
  Image,
  Text
} from 'react-native';
import BaseScene from "./BaseScene";
import HomeItem from "../component/HomeItem";
import {getWidth} from "../common/Global";
import DataDao from "../dao/DataDao";
import DateUtil from "../util/DateUtil";
import {appEvent} from "../common/Constants";
import {Theme} from "../common/Theme";
import YearProgressView from "../component/YearProgressView";

export default class HomeScene extends BaseScene {

  static navigationOptions = ({navigation}) => ({
    headerTitle: '倒计时',
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          HomeScene.goSettingScene(navigation);
        }}
      >
        <Image
          style={{marginRight: 20}}
          source={require('../../res/image/setting.png')}
        />
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = ({
      sourceData: []
    });
  }

  componentDidMount() {
    this.loadData();
    this.dataChangeListener = DeviceEventEmitter.addListener(appEvent.dataChange, () => {
      this.loadData();
    })
  }

  componentWillUnmount() {
    this.dataChangeListener && this.dataChangeListener.remove();
  }

  /**
   * 加载数据
   */
  loadData() {
    DataDao.load().then(result => {
      this.handleData(result);
    })
  }

  /**
   * 处理数据(排序)
   * @param result
   */
  handleData(result) {
    let sortFun = (obj1, obj2) => {
      let isOverDue1 = DateUtil.isOverdue(obj1.timestamp);
      let isOverDue2 = DateUtil.isOverdue(obj2.timestamp);
      if (obj1.top !== obj2.top) {
        return obj2.top - obj1.top;
      } else if (isOverDue1 !== isOverDue2) {
        return isOverDue1 - isOverDue2;
      } else {
        return isOverDue1 ? obj2.timestamp - obj1.timestamp : obj1.timestamp - obj2.timestamp;
      }
    };
    result.sort(sortFun);
    this.setState({
      sourceData: result
    })
  }

  static goSettingScene(navigation) {
    navigation.navigate('SettingScene');
  }

  /**
   * 添加新条目
   */
  add() {
    this.props.navigation.navigate('EditScene', {sourceData: this.state.sourceData});
  }

  renderItem(itemData) {
    return (
      <HomeItem
        sourceData={this.state.sourceData}
        data={itemData.item}
        {...this.props}
      />
    )
  }

  renderEmptyView() {
    return ( this.state.sourceData.length === 0
        ? <View style={styles.emptyContainer}>
          <YearProgressView/>
          <Text style={styles.note}>点击右下角按钮添加倒计时项目</Text>
        </View>
        : null
    );

  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderEmptyView()}

        <FlatList
          ref='list'
          style={styles.list}
          data={this.state.sourceData}
          keyExtractor={(itemData, index) => index + ''}
          renderItem={(itemData) => this.renderItem(itemData)}
        />

        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => this.add()}
        >
          <Image source={require('../../res/image/add.png')}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginTop: 20,
  },

  emptyContainer: {
    marginTop: getWidth(100),
    justifyContent: 'center',
    alignItems: 'center'
  },
  note: {
    marginTop: getWidth(32),
    color: Theme.color.textGray,
    fontSize: 18
  },

  imageContainer: {
    position: 'absolute',
    right: getWidth(36),
    bottom: getWidth(54),
    elevation: 2,
    shadowColor: Theme.color.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: getWidth(2),
  },

});
