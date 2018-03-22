/**
 * Created by pain.xie on 2018/3/22.
 * 设置页 说明Text
 */

import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {BaseComponent} from "../BaseComponent";
import {Theme} from "../../common/Theme";
import {getWidth} from "../../common/Global";

export default class DescribeView extends BaseComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={styles.container}>{this.props.text}</Text>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    color: Theme.color.textGray,
    fontSize:12,
    marginLeft:getWidth(18),
    marginVertical:(10)
  },
});