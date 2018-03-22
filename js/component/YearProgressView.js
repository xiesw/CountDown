/**
 * Created by pain.xie on 2018/3/22.
 * 今年进度条
 */

import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {BaseComponent} from "./BaseComponent";
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {getWidth} from "../common/Global";
import {Theme} from "../common/Theme";
import DateUtil from "../util/DateUtil";

export default class YearProgressView extends BaseComponent {

  constructor(props) {
    super(props);
  }


  renderText(fill) {
    let year = new Date().getFullYear();
    return (
      <View style={styles.textContainer}>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.year}>{year}</Text>
          <Text style={styles.remain}>还剩</Text>
        </View>

        <View style={{flexDirection:'row'}}>
          <Text style={styles.fill}>{Number(fill).toFixed(0)}</Text>
          <Text style={styles.percent}>%</Text>
        </View>
      </View>
    )
  }

  render() {
    let fill = DateUtil.getRemainOfYear();

    return (
      <AnimatedCircularProgress
        ref='circularProgress'
        size={getWidth(180)}
        width={getWidth(10)}
        fill={fill}
        rotation={0}
        tintColor={Theme.color.orange}
        backgroundColor={Theme.color.lightCyan}>

        {(fill) => (
          this.renderText(fill)
        )}

      </AnimatedCircularProgress>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    justifyContent:'center',
    alignItems:'center'
  },
  year:{
    fontSize: getWidth(32),
  },
  remain:{
    fontSize: getWidth(14),
    marginTop: getWidth(18),
    marginLeft: getWidth(5)
  },
  fill:{
    color:'black',
    fontSize: getWidth(48),
  },
  percent:{
    color:'black',
    fontSize: getWidth(20),
    marginTop: getWidth(28),
    marginLeft: getWidth(5)
  },

});

