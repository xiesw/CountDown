/**
 * Created by pain.xie on 2018/4/13.
 */

/*
* WebViewBridge tom
* WebView执行JS 如果是执行卡死线程 请延迟执行
* this.refs.webview.injectJavaScript('setTimeout(function(){alert("event");},100);');
* h5调用window.postMessage(param)
* param
* {
    command:表明意图
    payload:{
      //表明内容
      screen:LoginScene,
      param:自定义参数
    }
  }
*/

class WebViewBridge {
  //暴露接口给h5
  static getJSMethodStr(str) {
    return `
    (function() {
      var originalPostMessage = window.postMessage;

      var patchedPostMessage = function(message, targetOrigin, transfer) { 
        originalPostMessage(message, targetOrigin, transfer);
      };

      patchedPostMessage.toString = function() { 
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage'); 
      };

      window.postMessage = patchedPostMessage;
    })();
    
    ${str} ;app = new Object();

    function postActionToApp(command, jsParams) {      
      var rnParams = {
        "command":command,
        "payload":jsParams
      };
      window.postMessage(JSON.stringify(rnParams));
    };

    function sendOpreationToApp(command,screen,param) {      
      var rnParams = {
        "command":command,
        "payload":{
          "screen":screen,
          "param":param,
        }
      };
      window.postMessage(JSON.stringify(rnParams));
    };
    
    app.executeAction = function (jsParams) {
      postActionToApp("executeAction",jsParams);
    };
  `
  }

  static initBridge(target, actions) {
    if (target && target.props.navigation) {
      let bridge = new WebViewBridge();
      bridge.target = target;
      return (e) => {
        bridge.bridgeReceiveMessage(e, actions)
      };
    } else {
      console.log('target does not have navigation');
      return null;
    }
  }

  bridgeReceiveMessage(e, actions) {
    try {
      let message = JSON.parse(e.nativeEvent.data)
      let command = message['command'];
      //no command
      if (command === undefined || command === '' || typeof (actions[command]) !== "function") {
        console.log(command + 'is not function or is undefined');
        return
      }
      if (__DEV__) {
        console.log('message', message);
      }
      //command is exist
      if ('executeAction' === command) {
        let payload = message['payload'];
        let {method = '', params = {}} = payload;
        if (method && typeof (actions[method]) === "function") {
          let methodAction = actions[method];
          (methodAction.bind(this.target))(payload);
          return;
        }
      }
      let action = actions[command];
      (action.bind(this.target))(message['payload']);
    } catch (error) {
      console.log("WLWebViewBridge can't parse to json:", error);
    }
  }
}

const WebViewCreateJsMethod = (js) => {
  return WebViewBridge.getJSMethodStr(js);
};

const WebViewCreateBridge = (obj, actions) => {
  return WebViewBridge.initBridge(obj, actions);
};

export {WebViewCreateJsMethod, WebViewCreateBridge};