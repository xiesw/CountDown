import { AppRegistry } from 'react-native';
import App from './js/startup/App';

if (!(__DEV__)) {
  global.console.log = (...param) => {
  }
}

AppRegistry.registerComponent('CountDown', () => App);
