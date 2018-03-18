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
  AppState,
  DeviceEventEmitter,
} from 'react-native';
import {getWidth} from "../common/Global"
import DateUtil from "../util/DateUtil";

const REFRESH_TIME = 1000;
export default class HomeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: '',
      stateColor: '',
      date: '',
      time: '',
      unit: '',
      top: false
    };
    this.handleData();
  }

  /**
   * 处理显示的数据
   * @param props
   */
  handleData() {
    // pain.todo 刷新优化
    this.data = this.props.data;
    let date = this.data.timestamp;
    let isOverdue = DateUtil.isOverdue(date);
    this.color = this.data.color;
    this.stateColor = isOverdue ?
      global.theme.color.lightCyan : global.theme.color.orange;
    this.date = DateUtil.getDataAndWeek(date);
    this.name = isOverdue ?
      this.data.name + ' 已经' : '距离 ' + this.data.name + ' 还有';
    this.time = DateUtil.getBiggestTime(date);
    this.unit = DateUtil.getBiggestTimeUnit(date);
    this.top = this.data.top;

    this.state.name = this.name;
    this.state.color = this.color;
    this.state.stateColor = this.stateColor;
    this.state.date = this.date;
    this.state.time = this.time;
    this.state.unit = this.unit;
    this.state.top = this.top;

    this.setState({
      name: this.name,
      color: this.color,
      stateColor: this.stateColor,
      date: this.date,
      time: this.time,
      unit: this.unit,
      top: this.top,
    });
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.handleData();
    }, REFRESH_TIME);
    AppState.addEventListener('change', (nextAppState) => this.handleAppStateChange(nextAppState));
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', (nextAppState) => this.handleAppStateChange(nextAppState));
    this.timer && clearInterval(this.timer)
  }

  handleAppStateChange(nextAppState) {
    if (nextAppState === 'active') {
      this.timer = setInterval(() => this.handleData(), REFRESH_TIME)
    } else {
      this.timer && clearInterval(this.timer);
    }
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
    return (
      <TouchableOpacity
        onPress={() => this.onPressItem()}
        style={styles.container}
      >
        <View style={[styles.dot, {backgroundColor: this.state.color}]}/>
        <View style={styles.midContainer}>
          <Text style={styles.date}>{this.state.date}</Text>
          <Text style={styles.name}>{this.state.name}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.time}>{this.state.time}</Text>
          <Text style={styles.unit}>{this.state.unit}</Text>
        </View>
        <View style={[styles.state, {backgroundColor: this.state.stateColor}]}/>
        <View/>

        {this.state.top
          ?<View style={styles.topContainer}>
          <Text style={styles.top}>置顶</Text>
        </View>
          : null}
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
  },

  topContainer: {
    position: 'absolute',
    width: getWidth(28),
    height: getWidth(15),
    justifyContent: 'center',
    alignItems: 'center',
    top: getWidth(4),
    right: getWidth(28),
    borderRadius: getWidth(2),
    borderWidth: 0.5,
    borderColor:'#979797'
  },
  top: {
    fontSize: getWidth(9)
  }
});

