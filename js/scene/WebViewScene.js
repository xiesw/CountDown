/**
 * Created by pain.xie on 2018/4/13.
 * webview 容器类
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  WebView
} from 'react-native';
import BaseScene from "./BaseScene";
import Http from "../net/Http";
import {Theme} from "../common/Theme";
import {WebViewCreateBridge, WebViewCreateJsMethod} from "../hybrid/WebViewBridge";
import {BridgeActions} from "../hybrid/WebViewBridgeAction";

export default class WebViewScene extends BaseScene {

  static navigationOptions = ({navigation, screenProps}) => {
    const {params = {}} = navigation.state;
    const {title} = params;
    return {
      headerTitle: title,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      title: ''
    };
    this.init();
  }

  init() {
    const {params = {}} = this.props.navigation.state;
    const {onMessage, scalesPageToFit, url, title} = params;
    this.state.url = url;
    this.state.title = title;
    this.onMessageBridge = onMessage ? onMessage : WebViewCreateBridge(this, BridgeActions);
    this.scalesPageToFit = typeof scalesPageToFit === 'boolean' ? scalesPageToFit : true;
    this.injectedJavaScript = WebViewCreateJsMethod();
  }

  onLoad(event) {
    console.log('webview onLoad:', event);
  }

  onLoadStart() {

  }

  onLoadEnd(event) {
    console.log('webview onLoadEnd:', event);
  }

  onError(event) {
    console.log('webview onError:', event.nativeEvent);
  }

  // 获取url 或者 html
  getSource() {
    const {params = {}} = this.props.navigation.state;
    const {source} = params;
    return source ? source :
      this.getNormalSource();
  }

  getNormalSource() {
    const {params = {}} = this.props.navigation.state;
    const {sourceMethod, sourceBody} = params;
    return {
      'uri': this.state.url,
      'method': sourceMethod,
      'headers': this.getSourceHeader(),
      'body': sourceBody
    };
  }

  getSourceHeader() {
    return Http.getHeaders();
  }

  getLoadingCom() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'small'} color={Theme.color.orange}/>
        <Text style={{marginTop: 8, color: Theme.color.textBlack}}>加载中</Text>
      </View>);
  }

  onNavigationStateChange(navState) {
    if (__DEV__) console.log('webview load url:' + navState.url);

    let title = this.state.title;
    let navParams = {
      webview: this.refs.webview,
      webGoBack: navState.canGoBack,
      startUrl: this.state.url,
      url: navState.url
    };
    if (!title && navState.title !== 'about:blank' && !navState.loading) {
      navParams.title = navState.title;
    }
    this.props.navigation.setParams(navParams);
  }


  onShouldStartLoadWithRequest(event) {
    let url = event.url;
    if (url.indexOf('ios://') === 0) {
      this.doH5UrlActionForIOS(url);
      return false;
    }
    return true;
  }

  doH5UrlActionForIOS(url) {
    try {
      let v = url.split('//');
      let v1 = v[1].split('/');
      let action = v1[0];

      let paramsIndex = url.indexOf(action) + action.length + 1;

      let params = url.substr(paramsIndex);
      let decodeParam = decodeURI(params);
      decodeParam && BridgeActions[action] && (BridgeActions[action].bind(this))(decodeParam);
    } catch (error) {
      console.log('doH5UrlActionForIOS error', error);
    }
  }

  getWebViewOptions() {
    return {
      source: this.getSource(),
      ref: 'webview',
      style: styles.webView,
      injectedJavaScript: this.injectedJavaScript,
      automaticallyAdjustContentInsets: true,
      onMessage: this.onMessageBridge,
      javaScriptEnabled: true,
      domStorageEnabled: true,
      bounces: false,
      decelerationRate: "normal",
      onNavigationStateChange: this.onNavigationStateChange.bind(this),
      onShouldStartLoadWithRequest: this.onShouldStartLoadWithRequest.bind(this),
      // onLoadEnd: this.onLoadEnd.bind(this),
      // onError: this.onError,
      // onLoadStart: this.props.onLoadStart ? this.props.onLoadStart : this.onLoadStart.bind(this),
      // onLoad: (e) => {
      //   this.onLoad(e)
      // },
      // startInLoadingState: true,
      ///renderLoading: this.getLoadingCom,
      scalesPageToFit: this.state.scalesPageToFit,
    }
  }
  extendRender() {
    return null;
  }

  render() {
    const options = this.getWebViewOptions();
    return (
      <View style={styles.container}>
        <WebView {...options}/>
        {this.extendRender()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1
  }
});
