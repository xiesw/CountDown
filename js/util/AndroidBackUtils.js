/**
 * Created by pain.xie on 2018/3/27.
 * 处理android返回
 */

import React from 'react';
import {
  Platform,
  BackHandler,
} from 'react-native';

import Stores from '../stores';

import {getCurrentRoute} from '../stores/NavigationStore';

const NoBackRoutes = [];

const WebViewRoutes = [];

export default {
  //监听安卓返回键
  addBackAndroidListener() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        return this.onBackAndroid();
      });
    }
  },

  onBackAndroid() {
    const currentRoute = getCurrentRoute(Stores.navigation.navigationState);
    const routes = [].slice.call(Stores.navigation.navigationState.routes);

    if (routes.length > 1 && NoBackRoutes.indexOf(currentRoute.routeName) === -1) {
      Stores.navigation.goBack();
      return true;
    }

    if (this.lastBackPressed && (this.lastBackPressed + 2000 >= Date.now())) {
      return BackHandler.exitApp();
    }
    this.lastBackPressed = Date.now();
    return true;
  }
}

