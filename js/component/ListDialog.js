/**
 * Created by xieshangwu on 2018/3/18.
 * 列表选择弹窗
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import {BaseComponent} from "./BaseComponent";
import {Dialog} from 'react-native-simple-dialogs';
import {getWidth} from "../common/Global";
import {Theme} from "../common/Theme";

export default class ListDialog extends BaseComponent {
  constructor(props) {
    super(props);
    this.selectedValue = props.value;
    this.optionsMap = props.options;
    this.state = {
      dialogVisible: false
    }
  }

  setVisible(value) {
    this.setState({
      dialogVisible: value
    })
  }

  onPressItem(key) {
    this.selectedValue = key;
    this.props.onChange(key);
    this.setVisible(false);
  }

  renderItems() {
    let renderCount = 0;
    let viewArray = [];
    this.optionsMap.forEach((value, key, map) => {

      let isSelect = this.selectedValue === key;
      let color = isSelect ? Theme.color.textSelect : Theme.color.textDefault;
      let text = value;
      let length = this.optionsMap.size;

      viewArray.push(
        <View>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => this.onPressItem(key)}
          >
            <Text style={[styles.text, {color}]}>{text}</Text>
            {isSelect ?
              <Image source={require('../../res/image/select.png')}/>
              : null
            }
          </TouchableOpacity>

          {renderCount++ !== (length - 1) ?
            <View style={styles.divide}/>
            : null
          }
        </View>
      );
    });

    return viewArray;
  }

  render() {
    return (
      <Dialog
        visible={this.state.dialogVisible}
        title="置顶"
        onTouchOutside={() => this.setState({dialogVisible: false})}>
        <View>
          {this.renderItems()}
        </View>
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    height: getWidth(48),
    marginHorizontal: getWidth(18),
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    fontSize: getWidth(18),
    flex: 1
  },
  divide: {
    width: '100%',
    backgroundColor: Theme.color.divide,
    height: 0.5,
    alignSelf: 'center',
    marginHorizontal: getWidth(30),
    opacity:0.2
  }
});