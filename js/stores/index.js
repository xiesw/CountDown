/**
 * Created by pain.xie on 2018/3/23.
 * 集中创建Stores实体
 */
import HomeStore from "./HomeStore";
import SettingScene from "../scene/SettingScene";
import NavigationStore from "./NavigationStore";
import UserStore from "./UserStore";
import DataStore from "./DataStore";
import EditStore from "./EditStore";

class Stores {
  constructor() {
    this.navigation = new NavigationStore(this);
    this.homeStore = new HomeStore(this);
    this.userStore = new UserStore(this);
    this.dataStore = new DataStore(this);
    this.editStore = new EditStore(this);
    this.settingStore = new SettingScene(this);
  }

  /**
   * 清除数据
   */
  clearStores() {
    this.userStore.clear();
    this.dataStore.clear();
    this.editStore.clear();
  }
}

export default new Stores();