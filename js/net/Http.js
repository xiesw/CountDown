/**
 * Created by pain.xie on 2018/3/23.
 */

export default class Http {
  static get(url) {
    return this.asyncGet(url);
  }

  static asyncGet(url) {
    return fetch(url, {method: 'GET'}).
      then(response => Http.processResponse(response));
  }

  static processResponse(response) {
    return new Promise((resolve, reject) => {
      let {status = 0 } = response;
      if (status >= 200 && status < 400) {
        resolve(response.json());
      }
    })
  }
}