# CountDown
个人倒计时项目: 使用RN开发 可以同时运行在ios 及 android上

开发进度: 
```
    倒计时项目:  
        ui评审:  ok
        创建工程:  ok
        引入react-navigaton:  ok
        引入弹窗一套:  
            提高:   
                引入labal, mobx  
        数据结构:  ok
        首页展示:   ok
        详情页:    ok
        资料填写页:  ok
        时间选择组件:  ok
        重复性组件:  ok
        开源文档:
        打包上架:
```

todo:
```
    1.0
        bug整理   ok
        代码整理ok
        ui细节整理 ok 
        bug去掉颜色首页 ok
        ios键盘收入 ok
        空白提示
    
    2.0
        重复功能
        沉沁式状态栏
        设置时间组件
        设置页面
        关于页面
        备份系统
        开源文档
        统计系统
        walle打包
        多渠道统计
        打包上架
```


数据结构:
```
{
    "name": 'new year',       //string
    "timestamp": '1516322747974',  //number
    "repeat": 'once',         //enum{'once','everyDay','everyWeek','everyMouth','everyYear'}
    "top": false,           //boolean
    "color":"#000000"         //string
}
```