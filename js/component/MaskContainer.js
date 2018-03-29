/**
 * Create by Tom
 * 全局弹窗容器
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ViewPropTypes,
  StyleSheet,
  ActivityIndicator,
  Easing,
  Text,
  Animated,
  TouchableOpacity
} from 'react-native';

//dialog 组件提供的可配置参数
//duration dialog显示的时间
//easing dialog显示的动画
//backgroundColor dialog 背景颜色
//hideOnPress 点击黑框 是否关闭
//delay 延迟关闭时间 默认为0  不自动关闭 只要大于0 按照设定时间关闭
//demo

// 组件内 编写  或者组件挂载显示时 传入props-> dialogOptions
/*
  static dialogOptions = {
    duration : 500,
    easing: Easing.in(Easing.ease),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    hideOnPress: false,
    // removeWhenHide: true,
    delay: 3 
  }

  组件内如果需要关闭dialog   请调用 this.props.closeMask();
*/
const Default_Options = {
  duration: 250,
  easing: Easing.in(Easing.ease),
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  hideOnPress: false,
  // removeWhenHide: true,
  delay: 0,
  position: 'center'
}

export default class MaskContainer extends Component {

  static propTypes = {
    ...ViewPropTypes,
    containerStyle: ViewPropTypes.style,
    visible: PropTypes.bool,
    children: PropTypes.element.isRequired,//限制传入单个子级
  };

  constructor(props) {
    super(props);
    this.options = this.dueOptions();
    this.state = {
      visible: props.visible,
      opacity: new Animated.Value(0.5),
      bounceValue: new Animated.Value(1.1)
    };
  }

  dueOptions() {
    const { type, props: { dialogOptions} } = this.props.children;
    let options = dialogOptions || (type&&type.dialogOptions);
    if (options) {
      return Object.assign({}, Default_Options, options);
    }
    return Default_Options;
  }

  _animating = false;

  componentWillReceiveProps = nextProps => {
    if (nextProps.visible !== this.props.visible) {
      if (this.isVisible(nextProps.visible)) {
        this._show();
      } else {
        this._hide();
      }

      this.setState({
        visible: nextProps.visible
      });
    }
  }

  componentDidMount() {
    if (this.refs.element) {
      this.props.didShow && this.props.didShow(this.refs.element, this);
    }
    if (this.isVisible(this.state.visible)) {
      this._show();
    }
  };

  componentWillUnmount() {
    this._hide();
  };

  _hide = () => {
    if (!this._animating) {
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: this.options.duration,
        easing: this.options.easing
      }).start(({finished}) => {
        if (finished) {
          this._animating = false;
          this.props.afterClose && this.props.afterClose();
          this.props.removeDialog && this.props.removeDialog();
          // this.options.removeWhenHide && this.props.removeDialog && this.props.removeDialog();
        }
      });
    }
  };

  _show = () => {
    if (!this._animating) {
      this._animating = true;
      Animated.parallel([
      Animated.spring( //  基础的单次弹跳物理模型
        this.state.bounceValue, {
          toValue: 1,
          friction: 5,// 摩擦力，默认为7.
          tension: 40,// 张力，默认40。
        }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: this.options.duration,
        easing: this.options.easing
      })
    ]).start(({finished}) => {
        if (finished) {
          this._animating = !finished;
          if (parseInt(this.options.delay) > 0) {
            setTimeout(() => {
              this._hide();
            }, this.options.delay)
          }
        }
      });
    }
  };


  isVisible = visible => {
    return visible && (
      visible === true ||
      (Array.isArray(visible) && visible.length > 0) ||
      visible === 'true')
  }

  cloneElement() {
    return React.cloneElement(this.props.children, {
      closeMask: () => {
        this._animating = false;
        this.props.afterClose && this.props.afterClose();
        this.props.removeDialog && this.props.removeDialog();
      },
      ref: 'element'

    })
  }

  getLayout() {
    switch (this.options.position) {
      case 'center': {
        return {
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0
        }
      }
      case 'left': {
        return {
          top: 0,
          left: 0,
          // width: undefined,
          // height: undefined
        }
      }

      case 'right': {
        return {
          top: 0,
          right: 0,
          // width: undefined,
          // height: undefined
        }
      }
      case 'bottom': {
        return {
          bottom: 0,
          left: 0,
          // width: undefined,
          // height: undefined
        }
      }
      case 'top': {
        return {
          top: 0,
          left: 0,
          // width: undefined,
          // height: undefined,
        }
      }
      default: {
        const { type } = this.props.children;

        console.warn(`The position for class ${type.name}\` is Invalid.\n The position must be value of \'center\'|\'top\'|\'bottom\'|\'left\'|\'right\' `)
      }
    }
  }

  render() {
    const visible = this.isVisible(this.state.visible);
    let children = this.cloneElement();
    return (
      visible
        ?
        <Animated.View style={[styles.container, {
          backgroundColor: this.options.backgroundColor,
          opacity: this.state.opacity,
          transform: [  // scale, scaleX, scaleY, translateX, translateY, rotate, rotateX, rotateY, rotateZ
            { scale: this.state.bounceValue }
          ]
        }, this.getLayout()]}>
          <TouchableOpacity activeOpacity={1} style={styles.touchView} onPress={() => {
            if (Boolean(this.options.hideOnPress)) {
              this._hide();
            }
          } }>
          </TouchableOpacity>

          {
            children
          }
        </Animated.View>
        : null
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  touchView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }
})



