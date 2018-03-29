/**
 * Created by pain.xie on 2018/3/29.
 */

import React from 'react'
import {
  View,
  Dimensions,
  Image,
  Text,
  ScrollView,
  TextInput,
  PixelRatio,
  AsyncStorage
} from 'react-native'

import  {BaseComponent} from './BaseComponent';
import MaskRootSibling, {createRootSibling} from './MaskRootSibling';
import Stores from '../stores';

class TestViewCom extends BaseComponent {

  static dialogOptions = {
    hideOnPress: true,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{width: 110, height: 110, backgroundColor: 'red'}}>

      </View>
    );
  }

  getStyle() {
    return {
      container: {
        width: 280,
        height: 250,
        backgroundColor: global.theme.color.contentBgColor_default,
        paddingVertical: 10,
        borderRadius: 4,
        marginVertical: 35,
        alignItems: 'center'
      },
      dot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        marginRight: 10,
        marginTop: 5,
        backgroundColor: '#FF5A10'
      },
      text: {
        fontSize: 12,
        color: '#929292',
        lineHeight:18
      },
      btn: {
        btn: {
          width: '86%',
        }
      },
      interestText: {
        color: '#333333',
        fontSize: 14,
        marginTop:29
      },
      interestTextRed: {
        color: '#FF5A10',
        fontSize: 14
      },

    };
  }
}

export default class TestView extends MaskRootSibling {
  static show(props) {
    return createRootSibling(TestViewCom, props);
  }
}