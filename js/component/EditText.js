/**
 * Created by pain.xie on 2018/3/16.
 * 输入组价基类
 */

import React, {Component} from 'react';
import {
  TextInput,
  View,
  Image
} from 'react-native';

import {BaseComponent} from './BaseComponent'
import {ErrorComponent} from './ErrorComponent'
import {Validate} from './validate/Validate'
import {KeyboardUtil} from '../util/KeyboardUtil'
import {Theme} from "../common/Theme";

export default class EditText extends BaseComponent {
  constructor(props) {
    super(props);
    this.state.value = this.getText(props.value);
    this.props.keyboardType = KeyboardUtil.getKeyboardType(this.props.keyboardType);
  }

  componentWillReceiveProps(nextProps) {
  }

  setValue(value) {
    this.state.value = value;
  }

  getValue() {
    if (this.state.value === '') {
      return '';
    }
    else {
      if (this.props.dataType && this.props.dataType === 'number') {
        return +this.state.value;
      }
      else {
        return this.state.value;
      }
    }
  }

  getText(value) {
    if (value !== undefined && typeof(value) === 'number') {
      return value.toString();
    }
    else {
      console.log('pain.xie:', 3333,value)
      return value;
    }
  }

  onBlur() {
    this.validate();
  }

  onFocus() {
  }

  validate() {
    return this.validateWithValue(this.getValue());
  }

  validateWithValue(value) {
    let validate = Validate.validate(this.props.validate, value);
    if (!validate.result) {
      this.refs.errorComponent.show(validate.errorMessage);
    }
    else {
      this.refs.errorComponent.hide();
    }
    return validate.result;
  }

  getStyle() {
    return {
      container: {
        height: 49,
        width: "100%",
        marginHorizontal:32,
        flexDirection: 'row',
        alignItems: 'center',
      },
      text: {
        fontSize: 18,
        width: 105,
        paddingLeft: 16,
        color: Theme.color.textDefault
      },
      input: {
        flex: 1,
        fontSize: 18,
        color: Theme.color.textDefault,
        borderWidth: 0,
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0
      },
    };
  }

  iconRender() {
    let style = {
      marginRight: 20
    };
    return (
      <Image
        style={style}
        source={this.props.source}
      />
    );
  }

  textRender() {
    return (null);
  }

  editRender() {
    return (
      <TextInput
        style={this.state.style.input}
        editable={this.props.editable !== undefined ? this.props.editable : true}
        placeholder={this.props.placeholder}
        placeholderTextColor={Theme.color.placeholder}
        value={this.state.value}
        onChangeText={(value) => this.setState({value})}
        keyboardType={this.props.keyboardType}
        underlineColorAndroid='transparent'
        maxLength={this.props.maxLength}
        onBlur={() => this.onBlur()}
        onFocus={() => this.onFocus()}
        selectionColor={Theme.color.highLight}
      />
    );
  }

  extendRender() {
    let style = {
      marginRight:64
    };
    return(
      <View style={style}/>
    )
  }

  pickerRender() {
    return (null);
  }

  errorRender() {
    let errorStyle = {
      continer: {
        marginLeft: this.state.style.text.width
      }
    };
    return (<ErrorComponent ref='errorComponent' style={errorStyle}/>);
  }

  divideRender() {
    let style = {
      height: 0.5,
      backgroundColor: Theme.color.divide,
      opacity:0.5,
      marginLeft:75,
      marginRight:32
    };

    return <View style={style}/>
  }

  render() {
    return (
      <View style={{width: '100%'}}>
        <View style={this.state.style.container}>
          {this.iconRender()}
          {this.textRender()}
          {this.editRender()}
          {this.extendRender()}
        </View>
        {this.errorRender()}
        {this.pickerRender()}
        {this.divideRender()}
      </View>
    );
  }
}
