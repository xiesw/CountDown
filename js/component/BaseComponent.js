/**
 * Created by pain.xie on 2018/3/16.
 * 深度合并
 */

import React, {Component} from 'react';
import {DeepAssign} from '../util/DeepAssign'

export class BaseComponent extends Component {
  constructor(props) {
    super(props);
    let style = DeepAssign.deepAssign({}, this.getStyle(), props.style);
    this.state = {
      style: style,
    };
  }

  setValue(value) {

  }

  getValue() {

  }

  getStyle() {
    return {};
  }

  getRefs() {
    return {};
  }

  validateAllRefs() {
    let result = true;
    let refs = this.getRefs();
    for (let ref in refs) {
      result = this.refs[ref].validate() && result;
    }
    return result;
  }

  getRefsData() {
    let refsData = {};
    let refs = this.getRefs();
    for (let ref in refs) {
      refsData[ref] = this.refs[ref].getValue();
    }
    return refsData;
  }

  render() {
    return (
      null
    )
  }
}