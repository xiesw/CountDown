/**
 * Created by pain.xie on 2018/3/22.
 * 设置页 选择条目
 */

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import {BaseComponent} from "../BaseComponent";
import {Theme} from "../../common/Theme";
import {getWidth} from "../../util/Utils";

export default class SelectItem extends BaseComponent {

  constructor(props) {
    super(props);
  }

  render() {
    let type = this.props.type;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.onPress()}
      >
        {type === Type.top || type === Type.single ? <View style={styles.divide}/> : null}

        <View style={styles.textContainer}>
          <Text style={styles.text}>{this.props.text}</Text>
          <Image source={require('../../../res/image/arrow.png')}/>
        </View>

        {type === Type.mid || type === Type.top ?
          <View style={[styles.divide, {marginHorizontal: getWidth(24)}]}/> : null}

        {type === Type.bottom || type === Type.single ? <View style={styles.divide}/> : null}

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  divide: {
    width: '100%',
    height: 0.5,
    opacity: 0.3,
    backgroundColor: Theme.color.divide
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: getWidth(24)
  },
  text: {
    flex: 1,
    color: 'black',
    marginVertical: getWidth(13),
    fontSize: getWidth(16)
  }
});

export const Type = {
  single: 'single',
  top: 'top',
  mid: 'mid',
  bottom: 'bottom'
};