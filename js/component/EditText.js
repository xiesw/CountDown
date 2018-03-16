/**
 * Created by pain.xie on 2018/3/16.
 */

import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions
} from 'react-native';

import {BaseComponent} from './BaseComponent'
import {ErrorComponent} from './ErrorComponent'
import {Validate} from './validate/Validate'
import {KeyboardUtil} from '../util/KeyboardUtil'

export class EditText extends BaseComponent {
  constructor(props) {
    super(props);
    this.state.value = this.getText(props.value);
    this.props.keyboardType = KeyboardUtil.getKeyboardType(this.props.keyboardType);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: this.getText(nextProps.value),
    });
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        fontSize: 14,
        width: 105,
        paddingLeft: 16,
        color: global.theme.color.textDefault
      },
      input: {
        width: Dimensions.get('window').width - 105,
        fontSize: 14,
        color: global.theme.color.textDefault,
        borderWidth: 0,
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0
      },
    };
  }

  textRender() {
    return (
      <Text style={this.state.style.text}>{this.props.title}</Text>
    );
  }

  editRender() {
    return (
      <TextInput
        style={this.state.style.input}
        editable={this.props.editable !== undefined ? this.props.editable : true}
        placeholder={this.props.placeholder}
        placeholderTextColor={global.theme.color.placeholder}
        value={this.state.value}
        onChangeText={(value) => this.setState({value})}
        keyboardType={this.props.keyboardType}
        underlineColorAndroid='transparent'
        maxLength={this.props.maxLength}
        onBlur={() => this.onBlur()}
        onFocus={() => this.onFocus()}
        selectionColor={global.theme.color.highLight}
      />
    );
  }

  extendRender() {
    return (null);
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

  render() {
    return (
      <View>
        <View style={this.state.style.container}>
          {this.textRender()}
          {this.editRender()}
          {this.extendRender()}
        </View>
        {this.errorRender()}
        {this.pickerRender()}
      </View>
    );
  }
}
