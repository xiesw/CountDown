/**
* @Tom
* 全局dialog容器
* 默认支持.show方式 或者 是以组件形式加载 <Demo />
* 使用时 view 应和 实际调用组件分开，请参考EnvConfigView组件
*   //用来支持.show方法
*   static show(props) {
*    //处理属性传递和view与容器的结合
*    return createRootSibling(TestCom, props);
*   }

    //用来支持组件挂载形式
*   constructor(props) {
    super(props);
    this.ComponentClass = TestCom;
  }



*/


import React, {
  Component,
} from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import MaskContainer from './MaskContainer';


class MaskRootSibling extends Component {
  static siblingCount = 0
  static siblings = []

  constructor(props){
    super(props);
    this.ComponentClass = null;
    this._maskSibling = null;
  }

  componentWillMount() {

    if (!this.ComponentClass.noPushSiblings) {
      this.index = ++MaskRootSibling.siblingCount
      MaskRootSibling.siblings.push(this)
    }

    this.notAllowClose = this.ComponentClass.notAllowClose

    this._maskSibling = new RootSiblings(
      this._getContainer(this.props)
    );

  };

  componentWillReceiveProps(nextProps){
    this._maskSibling.update(
      this._getContainer(nextProps)
    );
  };

  componentWillUnmount() {
    this.hide();
  };

  hide(){
    this.ComponentClass.noPushSiblings ? this._maskSibling.destroy() : removeFormSibling(this.index, true);
  }

  _getContainer(props) {
    let ComponentClass = this.ComponentClass;
    const { 
      onShow,
      visible, 
      afterClose,
      ...otherProps} = props;

    return (
      <MaskContainer
        visible={visible}
        afterClose={afterClose}
        removeDialog={() => { 
          this.hide();
         } }
        didShow={(cRef, dRef) => {
          onShow && onShow(cRef);
        } }>
        <ComponentClass {...otherProps} />
      </MaskContainer>
    )
  }

  render() {
    return null;
  }
}

export function createRootSibling(ComponentClass, props = {}) {
  let obj = new Object();
  const {
    onShow,
    visible = true,
    afterClose,
    ...otherProps} = props;

  if (!ComponentClass) {
    console.warn(`ComponentClass must be component.`)
    return;
  }
  let _maskSibling = new RootSiblings(
    <MaskContainer
      visible={visible}
      afterClose={afterClose}
      removeDialog={() => { 
        ComponentClass.noPushSiblings ? hide(obj._maskSibling) : removeFormSibling(obj.index, true);
      } }

      didShow={(cRef, dRef) => {
        onShow && onShow(cRef);
      } }>
      <ComponentClass {...otherProps} />
    </MaskContainer>
  );

  //除开Loading 这种不加入队列
  if (!ComponentClass.noPushSiblings) {
    obj.index = ++MaskRootSibling.siblingCount

    MaskRootSibling.siblings.push(obj)
  }
  obj._maskSibling = _maskSibling;
  obj.notAllowClose = ComponentClass.notAllowClose
  //外部调用hide 会移除dialog
  obj.hide = () => { 
    ComponentClass.noPushSiblings ? hide(obj._maskSibling) : removeFormSibling(obj.index, true);
  };
  return obj;
}

export function removeFormSibling(index,ignoreCheck) {

  if (MaskRootSibling.siblings.length == 0) return;

  if (index && index > 0) {
    for (var i = 0; i < MaskRootSibling.siblings.length; i++) {
      let obj = MaskRootSibling.siblings[i]
      if (obj.index === index) {
        hide(obj._maskSibling);
        MaskRootSibling.siblings.splice(i, 1)
        return;
      }
    }
  } else{
    let lastObj = MaskRootSibling.siblings[MaskRootSibling.siblings.length-1]
    if (!ignoreCheck && lastObj.notAllowClose) return;
    let obj = MaskRootSibling.siblings.pop()
    hide(obj._maskSibling);
  }

}

//移除所有弹框 包括手势页
export function removeAllSiblings() {
  while (MaskRootSibling.siblings.length > 0) {
    let obj = MaskRootSibling.siblings.pop()
    hide(obj._maskSibling);
  }
}

function hide(_maskSibling) {
  let element = _maskSibling;
  if (element instanceof RootSiblings) {
    element.destroy();
  } else {
    console.warn(`DialogCom.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof element}\` instead.`)
  }
}

// class MaskRootSibling extends Component {
//   static displayName = 'Toast';
//   static propTypes = ToastContainer.propTypes;
//   static positions = positions;
//   static durations = durations;

//   static show = (message, options = { position: positions.BOTTOM, duration: durations.SHORT }) => {
//     return new RootSiblings(<ToastContainer
//       {...options}
//       visible={true}
//       >
//       {message}
//     </ToastContainer>);
//   };

//   static hide = toast => {
//     if (toast instanceof RootSiblings) {
//       toast.destroy();
//     } else {
//       console.warn(`Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`);
//     }
//   };

//   _toast = null;

//   componentWillMount = () => {
//     this._toast = new RootSiblings(<ToastContainer
//       {...this.props}
//       duration={0}
//       />);
//   };

//   componentWillReceiveProps = nextProps => {
//     this._toast.update(<ToastContainer
//       {...nextProps}
//       duration={0}
//       />);
//   };

//   componentWillUnmount = () => {
//     this._toast.destroy();
//   };

//   render() {
//     return null;
//   }
// }

// export {
//   RootSiblings as Manager
// };
// export default Toast;

export default MaskRootSibling
