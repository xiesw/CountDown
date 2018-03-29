/**
 * Created by pain.xie on 2018/3/26.
 * 管理用户信息
 */
import {
  AsyncStorage
} from 'react-native';
import {observable, action, runInAction, reaction, autorun, computed} from 'mobx';
import bmob from '../net/bmob/bmob';

const Bmob = bmob.Bmob;
const AsyncStorage_Name = 'userInfo';
export default class UserStore {
  constructor(stores) {
    this.stores = stores;
  }

  @observable username = '';
  @observable password = '';

  @action
  clear() {
    this.username = '';
    this.password = '';
  }

  @computed
  get hasLogin() {
    return this.username && this.password;
  }

  /**
   * 加载用户信息
   * @returns {Promise}
   */
  @action
  loadInfo() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(AsyncStorage_Name, (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result) {
            let data = JSON.parse(result);
            this.username = data.username;
            this.password = data.password;
          } else {
            reject('data is empty');
          }
        }
      })
    });
  }

  /**
   * 保存用户信息
   */
  @action
  saveInfo() {
    let data = {
      username: this.username,
      password: this.password
    };
    AsyncStorage.setItem(AsyncStorage_Name, JSON.stringify(data));
  }

  /**
   * 移除用户信息
   */
  @action
  removeInfo() {
    this.clear();
    AsyncStorage.removeItem(AsyncStorage_Name);
  }

  /**
   * 检查用户名是否已经存在
   * @param username
   * @returns {Promise}
   */
  @action
  checkUser(username) {
    let User = Bmob.Object.extend("_User");
    let query = new Bmob.Query(User);
    return new Promise((resolve, reject) => {
      query.equalTo("username", username).find({
        success: (result) => {
          if (result.length === 0) {
            resolve('该用户名可用');
          } else {
            reject("用户名已存在");
          }
        }, error: (error) => {
          reject("异常");
        }
      });
    })
  }

  /**
   * 注册
   * @param username
   * @param password
   * @returns {Promise}
   */
  @action
  register(username, password) {
    let User = Bmob.Object.extend("_User");
    let _user = new User();
    return new Promise((resolve, reject) => {
      _user.set("username", username).set("password", password);
      _user.save(null, {
        success: (object) => {
          resolve(object);
          runInAction(() => {
            this.username = username;
            this.password = password;
            this.saveInfo();
            resolve('登陆成功')
          })
        },
        error: function (error) {
          reject(error.message);
        }
      })
    })
  }

  /**
   * 登陆验证
   * @param username
   * @param password
   * @returns {Promise}
   */
  @action
  login(username, password) {
    let User = Bmob.Object.extend("_User");
    let query = new Bmob.Query(User);
    return new Promise((resolve, reject) => {
      query.equalTo("username", username);
      query.equalTo("password", password);
      query.find({
        success: (result) => {
          if (result.length === 1) {
            runInAction(() => {
              this.username = username;
              this.password = password;
              this.saveInfo();
            });
            resolve('登陆成功');
          } else {
            reject("用户名或密码错误");
          }
        }, error: (error) => {
          reject("用户名或密码错误");
        }
      });
    })
  }

}