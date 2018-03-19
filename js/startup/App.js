/**
 * https://github.com/facebook/react-native
 * 启动入口
 */

import React, {Component} from 'react';
import {RouterStack} from "../routers/index"
import {Theme} from "../common/Theme";
import {regs} from '../component/validate/Validate';

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    // 关闭黄色警告
    console.disableYellowBox = true;
    this.init();
  }

  init() {
    global.theme = Theme;
    global.validaterRegs = regs;
  }

  render() {
    return (
      <RouterStack/>
    );
  }
}

