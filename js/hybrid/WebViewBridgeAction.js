/**
 * Created by pain.xie on 2018/4/13.
 */

import {
  NativeModules,
  Clipboard,
  Linking
} from 'react-native';

/*＊ response object：{method:指定执行的具体操作,params:自定义参数体}  */
function response2H5(obj) {
  let objStr = JSON.stringify(obj);
  console.log('response2H5', objStr);
  this.refs.webview.injectJavaScript(`setTimeout(function(){window.welabResponse && welabResponse('${objStr}');},100)`);
}

function test(payload) {
  let {params=''} = payload;
  console.log('pain.xie:', params);
}

const BridgeActions = {
  test
};

export {BridgeActions};