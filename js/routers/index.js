/**
 * Created by xieshangwu on 2018/3/11.
 * 路由表
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import {StackNavigator} from 'react-navigation'
import HomeScene from '../scene/HomeScene';
import EditScene from "../scene/EditScene";
import DetailScene from "../scene/DetailScene";
import SettingScene from "../scene/SettingScene";
import AboutScene from "../scene/AboutScene";
import BackupScene from "../scene/BackupScene";
import RestoreScene from "../scene/RestoreScene";
import LoginScene from "../scene/LoginScene";
import WebViewScene from "../scene/WebViewScene";
import SelectScene from "../scene/SelectScene";


// 默认的导航栏样式
const CommonHeaderStyle = {
  backgroundColor: 'white',
  elevation: 0,
  shadowOpacity: 0,
  borderBottomWidth: 0
};

// 默认的导航栏标题样式
const CommonHeaderTitleStyle = {
  alignSelf: 'center',
  color: '#333',
  fontSize: 18,
  fontWeight: '100'
};


//查找导航栏传递的参数
function getRouteParams(navigation) {
  const {params, index} = navigation.state;
  const {routes} = navigation.state;
  if (params) {
    return params;
  } else if (Array.isArray(routes) && index >= 0) {
    let route = routes[index];
    const {params} = route;
    return params ? params : {};
  }
  return {};
}

// 获取导航栏配置
function getNavigationOptions(navigation) {
  const {params = {}, routeName} = navigation.state;
  const {
    headerRight,
    headerTitleStyle = {},
    headerStyle = {}
  } = getRouteParams(navigation);

  let options = {
    headerStyle: Object.assign({}, CommonHeaderStyle, headerStyle),
    headerTitleStyle: Object.assign({}, CommonHeaderTitleStyle, headerTitleStyle),
    headerBackTitle: null,
    headerRight: headerRight || <View/>
  };

  return options;

}

const RouterStack = StackNavigator(
  {
    HomeScene: {screen: HomeScene},
    DetailScene: {screen: DetailScene},
    EditScene: {screen: EditScene},
    SettingScene: {screen: SettingScene},
    AboutScene: {screen: AboutScene},
    BackupScene: {screen: BackupScene},
    RestoreScene: {screen: RestoreScene},
    LoginScene: {screen: LoginScene},
    WebViewScene: {screen: WebViewScene},
    SelectScene: {screen: SelectScene},
  },
  {
    navigationOptions: ({navigation}) => getNavigationOptions(navigation),
  }
);

export {RouterStack};