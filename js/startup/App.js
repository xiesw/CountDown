/**
 * https://github.com/facebook/react-native
 * 启动入口
 */

import React, {Component} from 'react';
import {StatusBar, Platform} from 'react-native';
import {RouterStack} from "../routers/index"

import Global from "../common/Global";

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    // 关闭黄色警告
    console.disableYellowBox = true;
    Global.init();
  }

  render() {
    return (
      <RouterStack/>
    );
  }
}

