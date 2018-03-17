/**
 * Created by xieshangwu on 2018/3/11.
 * 路由表
 */

import {StackNavigator, SafeAreaView} from 'react-navigation'
import { View, Text, StatusBar, Platform, Easing,Animated} from 'react-native';
import HomeScene from '../scene/HomeScene';
import EditScene from "../scene/EditScene";
import DetailScene from "../scene/DetailScene";
import SettingScene from "../scene/SettingScene";
import AboutScene from "../scene/AboutScene";


// 默认的导航栏样式
const CommonHeaderStyle = {
  backgroundColor: '#ffffff',
  elevation: 0,
  shadowOpacity: 0,
  borderBottomWidth:0
};

// 默认的导航栏标题样式
const CommonHeaderTitleStyle = {
  alignSelf: 'center',
  color: '#333',
  fontSize: 18,
  fontWeight: '100'
};


//查找导航栏传递的参数
function getRouteParams(navigation){
  const {params,index} = navigation.state;
  const {routes} = navigation.state;
  if (params){
    return params;
  } else if (Array.isArray(routes)&&index >= 0){
    let route = routes[index];
    const { params } = route;
    return params ? params:{};
  }
  return {};
}



function getNavigationOptions(navigation) {
  const { params = {}, routeName } = navigation.state;
  const {
    rightCom,
    headerTitleStyle = {},
    headerStyle = {}
  } = getRouteParams(navigation);

  let options = {
    headerStyle : Object.assign({}, CommonHeaderStyle, headerStyle),
    headerTitleStyle : Object.assign({}, CommonHeaderTitleStyle , headerTitleStyle),
    headerBackTitle:null,
  };

  return options;

}

const RouterStack = StackNavigator(
  {
    HomeScene: {screen: HomeScene},
    DetailScene: {screen: DetailScene},
    EditScene: {screen: EditScene},
    SettingScene: {screen: SettingScene},
    AboutScene: {screen: AboutScene},
  },
  {
    navigationOptions: ({ navigation }) => getNavigationOptions(navigation),
  }
);

export {RouterStack};