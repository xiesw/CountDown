/**
 * Created by pain.xie on 2018/3/23.
 */
import Http from "./Http";

export default class Api {

  static getTest() {
    let url = 'http://121.42.181.106:8080/examples/welab/card.json';
    return Http.get(url);
  }

}