/**
 * Created by pain.xie on 2018/3/17.
 * 常量
 */
import {Theme} from "./Theme";

// 标记颜色
export const MARK_COLOR = [
  Theme.color.red,
  Theme.color.yellow,
  Theme.color.blue,
  Theme.color.purple,
  Theme.color.green,
  Theme.color.gray,
];

// 编辑页的模式 新增/
export const EDIT_MODEL = {
  new: 'new',
  update: 'update'
};

// 密码 solt
export const SOLT = 'a628501d48f4044d701b7af62fea1a87b2075337764b65b46587f60919009dd7';

// 应用统计事件
export const APP_EVENT = {
  HoneScene: 'HomePage', // 进到首页
  DetailScene: 'DetailScene', //进到详情页
  EditScene: 'EditScene',
  BackupScene: 'BackupScene',
  AboutScene: 'AboutScene',
  LoginScene: 'LoginScene',
  Add: 'Add',   // 点击新增按钮
  Edit: 'Edit', // 点击编辑按钮
  Delete: 'Delete', // 点击删除
  Confirm: 'Confirm', // 点击确认
  Setting: 'Setting', // 点击设置按
  Register: 'Register',
  Login: 'Login',
  GitHub: 'GitHub',
  Backup: 'Backup',
  Restore: 'Restore',
  WidgetDetail:'WidgetDetail',
  NewWidget:'NewWidget'
};
