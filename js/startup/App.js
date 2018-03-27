/**
 * https://github.com/facebook/react-native
 * 启动入口
 */

import React, {Component} from 'react';
import {StatusBar, Platform} from 'react-native';
import {RouterStack} from "../routers/index"
import Stores from "../stores";
import Global from "../common/Global";
import {observer, Provider} from 'mobx-react'
import {addNavigationHelpers} from "react-navigation";
import {useStrict, toJS} from 'mobx';

type Props = {};

@observer
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    // 关闭黄色警告
    console.disableYellowBox = true;
    this.navigationStore = Stores.navigation;
    Global.init();
  }

  render() {
    const {...storesArray} = Stores;
    return (
      <Provider {...storesArray}>
        <RouterStack
          navigation={
            addNavigationHelpers({
              dispatch: this.navigationStore.dispatch,
              state: toJS(this.navigationStore.navigationState),
              addListener: () => {
              },
            })}
        />
      </Provider>

    );

  }


}

