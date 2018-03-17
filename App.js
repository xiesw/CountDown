/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {RouterStack} from "./js/routers/index"
import {Theme} from "./js/common/Theme";
import {regs} from './js/component/validate/Validate';

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    // 暂时关闭警告
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

