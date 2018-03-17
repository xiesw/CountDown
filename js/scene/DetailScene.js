/**
 * Created by xieshangwu on 2018/3/11.
 * 详情页
 */


import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import {getWidth} from "../common/Global"
import DateUtil from "../util/DateUtil";
import BaseScene from "./BaseScene";
import {Theme} from "../common/Theme";


export default class DetailScene extends BaseScene {

  static navigationOptions = {
    headerTitle: '倒计时',
  };

  constructor(props) {
    super(props);
    this.data = this.props.navigation.state.params.data;
    this.sourceData = this.props.navigation.state.params.sourceData;
    this.handleData();
  }

  handleData() {
    let timestamp = this.data.timestamp;
    let isOverdue = DateUtil.isOverdue(timestamp);
    this.title = isOverdue ?
      this.data.name + ' 已经' : '距离 ' + this.data.name + ' 还有';
    this.color = this.data.color || Theme.color.lightBlue;

    this.day = DateUtil.getDaysCount(timestamp);
    this.hour = DateUtil.getHour(timestamp);
    this.minute = DateUtil.getMinute(timestamp);
    this.second = DateUtil.getSecond(timestamp);
    this.millisecond = DateUtil.getMillisecond(timestamp);

    this.dateText = DateUtil.getDataAndWeek(timestamp);
  }

  edit() {
    this.props.navigation.navigate('EditScene', {sourceData: this.sourceData, data: this.data});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={[styles.titleContainer, {backgroundColor: this.color}]}>
            <Text style={styles.title}>{this.title}</Text>
          </View>

          <View style={styles.dayContainer}>
            <Text style={styles.day}>{this.day}</Text>
            <Text style={styles.dayUnit}>天</Text>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.number}>{this.hour}</Text>
            <Text style={styles.unit}>时</Text>
            <Text style={styles.number}>{this.minute}</Text>
            <Text style={styles.unit}>分</Text>
            <Text style={styles.number}>{this.second}</Text>
            <Text style={styles.unit}>秒</Text>
            <Text style={styles.number}>{this.millisecond}</Text>
          </View>

          <View style={styles.divide}/>

          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{this.dateText}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => this.edit()}
        >
          <Image
            source={require('../../res/image/edit.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: getWidth(303),
    marginTop: getWidth(52),
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: getWidth(8),
    elevation: 2,
    shadowColor: '#666666',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: getWidth(2),
  },
  titleContainer: {
    width: '100%',
    height: getWidth(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: getWidth(8),
    borderTopLeftRadius: getWidth(8),
  },
  title: {
    fontSize: getWidth(18),
    color: 'white',
  },

  dayContainer: {
    marginTop: getWidth(26),
    flexDirection: 'row'
  },
  day: {
    fontSize: getWidth(72),
    marginRight: getWidth(12)
  },
  dayUnit: {
    fontSize: getWidth(24),
    marginTop: getWidth(45)
  },

  timeContainer: {
    marginTop: getWidth(5),
    flexDirection: 'row'
  },
  number: {
    fontSize: getWidth(24),
    color: '#4A4A4A',
  },
  unit: {
    fontSize: getWidth(12),
    marginHorizontal: getWidth(4),
    marginTop: getWidth(12)
  },

  divide: {
    width: '100%',
    height: 0.5,
    marginTop: getWidth(55),
    backgroundColor: '#C3C3C3'
  },

  dateContainer: {
    width: '100%',
    height: getWidth(60),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F6F5',
    borderBottomLeftRadius: getWidth(8),
    borderBottomRightRadius: getWidth(8),
  },
  dateText: {
    fontSize: getWidth(18),
    color: '#4A4A4A',
  },

  imageContainer: {
    position: 'absolute',
    right: getWidth(36),
    bottom: getWidth(54),
    elevation: 2,
    shadowColor: '#666666',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: getWidth(2),
  }
});