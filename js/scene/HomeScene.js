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
import {getWidth} from "../util/Utils";
import {Theme} from "../common/Theme";
import YearProgressView from "../component/YearProgressView";
import {inject, observer} from 'mobx-react';
import {useStrict, toJS} from 'mobx';
import Stores from '../stores';
import {EDIT_MODEL} from "../common/Constants";

@inject('dataStore')
@observer
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
    ),
    headerLeft: (<View/>)
  });

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadData();
  }

  /**
   * 加载数据
   */
  loadData() {
    this.props.dataStore.load();
  }

  static goSettingScene() {
    Stores.navigation.navigate({routeName:'SettingScene'});
  }

  /**
   * 添加新条目
   */
  add() {
    Stores.editStore.model = EDIT_MODEL.new;
    this.props.navigation.navigate('EditScene',);
  }

  renderItem(itemData) {
    return (
      <HomeItem
        data={itemData.item}
        {...this.props}
      />
    )
  }

  renderEmptyView() {
    return ( this.props.dataStore.isEmpty
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
          data={toJS(Stores.dataStore.dataSource)}
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
};

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
