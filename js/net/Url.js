/**
 * Created by pain.xie on 2018/3/23.
 * url 工具类
 */
import Global from "../common/Global";

export default class Url {
  static getHost = (api) => Global.getHost('host') + api;

  static getParamString(data) {
    let p = '?';
    for (let key in data) {
      p += key + '=' + data[key] + '&';
    }
    return p.length === 0 ? '' : p.substring(0, p.length - 2);
  }

  static reduceDomian(url) {
    let index = url.indexOf('://');
    if (index !== -1) {
      let sub = url.substring(index + 3, url.length);
      index = sub.indexOf('/');
      return sub.substring(index, sub.length);
    }
    return url;
  }

  static welabEnvUrl(url) {
    let env = '';
    if (Env.matchEnv('integration3')) {
      env = '-fat';
    } else if (Env.matchEnv('integration2')) {
      env = '-dev';
    }
    let envUrl = env.length > 0 ? url.replace('.wolaidai.com', env + '.wolaidai.com') : url;
    console.log('URL__welabEnvUrl:', envUrl);
    return envUrl;
  }

  static PATH = {

  }
}