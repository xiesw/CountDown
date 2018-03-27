/**
 * Created by pain.xie on 2018/3/23.
 * 导航栏数据
 */

import {observable, action, runInAction, reaction, autorun, computed} from 'mobx';
import {
  DeviceEventEmitter,
  Keyboard
} from 'react-native';
import {RouterStack} from '../routers'
import {NavigationActions} from 'react-navigation'
import {useStrict, toJS} from 'mobx';

//返回当前所在路由
export const getCurrentRoute = (state) => {
  const findCurrentRoute = (navState) => {
    if (typeof navState.index !== 'undefined') {
      return findCurrentRoute(navState.routes[navState.index])
    }
    return navState;
  };
  return findCurrentRoute(state)
};

//获取将要跳转的路由
export const getActionRoute = (action) => {
  const findCurrentRoute = (navAction) => {
    if (typeof navAction.actions !== 'undefined') {
      return findCurrentRoute(navAction.actions[navAction.index])
    }
    return navAction.routeName
  };
  return findCurrentRoute(action)
};

export default class NavigationStore {
  constructor(stores) {
    this.stores = stores;
    autorun(() => {
      if (__DEV__) {
      }
    })
  }

  @observable navigationState = {
    index: 0,
    routes: [
      {
        routeName: "HomeScene"
      }
    ]
  };

  goBack(param = {key: null}) {
    if (param.hasOwnProperty('routeName')) {
      let routers = [].slice.call(this.navigationState.routes);
      let find = false;
      Array.isArray(routers) && routers.some((value) => {
        if (find) {
          if (value.key) {
            param.key = value.key;
          }
          return true;
        }
        if (value.routeName === param.routeName) {
          find = true;
        }
      })
    }

    this.dispatch(
      NavigationActions.back(param)
    );
  }

  navigate(routerParam) {
    this.dispatch(
      NavigationActions.navigate(routerParam)
    );
  }

  reset(routerParam) {
    this.dispatch(
      NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate(routerParam)
        ]
      })
    );
  }

  @action dispatch = (action) => {
    return (this.navigationState = RouterStack.router.getStateForAction(
      action,
      this.navigationState
    ));
  };
}