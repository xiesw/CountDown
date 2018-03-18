/**
 * Created by xieshangwu on 2018/3/11.
 * 首页列表item
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {getWidth} from "../common/Global"
import DateUtil from "../util/DateUtil";


export default class HomeItem extends Component {
  constructor(props) {
    super(props);
    this.handleData(props);
  }

  /**
   * 处理显示的数据
   * @param props
   */
  handleData(props) {
    this.data = props.data;
    let date = this.data.timestamp;
    let isOverdue = DateUtil.isOverdue(date);
    this.stateColor = isOverdue ?
      global.theme.color.lightCyan : global.theme.color.orange;
    this.date = DateUtil.getDataAndWeek(date);
    this.name = isOverdue ?
      this.data.name + ' 已经' : '距离 ' + this.data.name + ' 还有';
    this.time = DateUtil.getBiggestTime(date);
    this.unit = DateUtil.getBiggestTimeUnit(date);
  }

  /**
   * 点击条目
   */
  onPressItem() {
    this.props.navigation.navigate('DetailScene', {
      sourceData: this.props.sourceData,
      data: this.data
    });
  }

  render() {
    console.log('pain.xie', 'renderItem');
    return (
      <TouchableOpacity
        onPress={() => this.onPressItem()}
        style={styles.container}
      >
        <View style={[styles.dot, {backgroundColor: this.data.color}]}/>
        <View style={styles.midContainer}>
          <Text style={styles.date}>{this.date}</Text>
          <Text style={styles.name}>{this.name}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.time}>{this.time}</Text>
          <Text style={styles.unit}>{this.unit}</Text>
        </View>
        <View style={[styles.state, {backgroundColor: this.stateColor}]}/>
        <View/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 18,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: getWidth(8),
    elevation: 2,
    shadowColor: '#666666',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: getWidth(8),
  },
  dot: {
    height: getWidth(15),
    width: getWidth(15),
    borderRadius: 15,
    marginTop: getWidth(4),
    marginLeft: getWidth(4),
    marginRight: getWidth(10)
  },
  midContainer: {
    flex: 7,
  },
  date: {
    fontSize: getWidth(9),
    color: '#4A4A4A',
    marginTop: getWidth(23)
  },
  name: {
    fontSize: getWidth(18),
    color: 'black',
    marginTop: getWidth(4),
    marginBottom: getWidth(14)
  },
  rightContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  time: {
    fontSize: getWidth(36),
    color: 'black',
    marginTop: getWidth(23),
  },
  unit: {
    fontSize: getWidth(18),
    marginTop: getWidth(39),
  },
  state: {
    height: '100%',
    width: getWidth(10),
    borderTopRightRadius: getWidth(8),
    borderBottomRightRadius: getWidth(8),
  }
});

