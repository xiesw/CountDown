/**
 * Created by pain.xie on 2018/3/23.
 * 集中创建Stores实体
 */
import HomeStore from "./HomeStore";
import SettingScene from "../scene/SettingScene";
import NavigationStore from "./NavigationStore";
import UserStore from "./UserStore";
import DataStore from "./DataStore";

class Stores {
  constructor() {
    this.navigation = new NavigationStore(this);
    this.homeStore = new HomeStore(this);
    this.userStore = new UserStore(this);
    this.dataStore = new DataStore(this);
    this.settingStore = new SettingScene(this);
  }

  clearStores() {
    this.userStore.clear();
    this.dataStore.clear();
  }
}

export default new Stores();