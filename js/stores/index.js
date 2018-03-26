/**
 * Created by pain.xie on 2018/3/23.
 * 集中创建Stores实体
 */
import HomeStore from "./HomeStore";
import SettingScene from "../scene/SettingScene";
import NavigationStore from "./NavigationStore";
import UserStore from "./UserStore";

class Stores {
  constructor() {
    this.navigation = new NavigationStore(this);
    this.homeStore = new HomeStore(this);
    this.settingStore = new SettingScene(this);
    this.userStore = new UserStore(this);
  }

  clearStores() {
    this.userStore.clear();
  }
}

export default new Stores();