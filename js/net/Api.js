/**
 * Created by pain.xie on 2018/3/23.
 * api 中心(管理所有的请求)
 */
import Http from "./Http";
import Url from "./Url";

export default class Api {

  static getTest() {
    let url = Url.getHost('examples/welab/card.json');
    return Http.get(url);
  }

}