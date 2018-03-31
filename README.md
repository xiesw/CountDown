# CountDown
个人倒计时项目: 使用RN开发 可以同时运行在ios 及 android上,供大家学习交流

### 1. 个人开发工具
    Macbook Pro + WebStorm + iphone模拟器 + android

### 2. 如何运行
```
1. 安装node
    brew install node
    安装完node后建议设置npm镜像以加速后面的过程（或使用科学上网工具）。
    npm config set registry https://registry.npm.taobao.org --global
    npm config set disturl https://npm.taobao.org/dist --global
   
2. 安装React Native的命令行工具（react-native-cli）
    React Native的命令行工具用于执行创建、初始化、更新项目、运行打包服务（packager）等任务。
    npm install -g react-native-cli
    
3. 拉取代码
   
4. 运行ios
    在代码根目录下运行:
    npm install
    react-native run-ios
   
5. 运行android
    在代码根目录下运行:
    npm install
    react-native run-android
```

### 3. 目录结构
```
CountDown
    |
    |--android  android工程
    |--ios      ios工程
    |--res           图片等资源文件
    |--node_modules  引用的三方库
    |--package.json  包管理文件
    |--.sketch       sketch设计文件
    |
    |--js
        |--common   通用操作, 配置主题,常量,全局操作
        |--component 组件
        |--net      网络请求(尚未有网络模块)
        |   |--bmob 比目云
        |--routers  路由表
        |--scene    页面文件
        |--startup  启动入口
        |--stores   数据存储类
        |--util     工具类
```
### 4. 引用三方组件:
```
    react-navigation: 导航
    react-native-modal-datetime-picker: 选择时间组件
    react-native-simple-dialogs: dialog组件
    mobx:  简单、可扩展的状态管理
    react-native-root-toast: toast
    react-native-root-siblings: 从根布局添加视图

```
### 5. 数据结构
```
{
    "name": 'new year',       //string
    "timestamp": '1516322747974',  //number
    "repeat": 'once',         //enum{'once','everyDay','everyWeek','everyMouth','everyYear'}
    "top": false,           //boolean
    "color":"#000000"         //string
}
```

### 6. app预览:   

<img src="http://ovxz7mlox.bkt.clouddn.com/Group.png" width="640"/>

app: 1.1完成后提供  
note:   
1. app时间系统为本机系统   
2. 卸载app将会丢失数据,请在设置里
3. 备份的数据存储在比目云上, 数据对开发者是可见的, 账号的密码开发者不可见

### 7. todo:
```
    1.0
        基本功能   ok
        bug整理   ok
        代码整理ok
        ui细节整理 ok 
        bug去掉颜色首页 ok
        ios键盘收入 ok
    1.1
        空白提示 ok
        开源文档 ok
        设置页面 ok
        关于页面 ok
        用户系统 ok
        android 回退栈 ok
        Toast 组件 ok
        弹窗      ok
        备份系统    ok
        引入labal, mobx ok
        walle打包 ok
        统计系统 ok
        多渠道统计 ok
        上架
    1.2 
        沉沁式状态栏
        设置时间组件
        重复功能
        loading
```

