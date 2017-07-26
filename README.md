# wx-js-sdk

## 使用
确保已引入 微信 js-sdk


###注册插件

``` js
import Wx from 'vue-wx-js'
Vue.use(Wx, { appId: 'xxxx',jsApiList: [] })
``` 
appId 必填
jsApiList 可不填，不填为所有

###组件里使用插件

``` js
await conf = await this.$wx.config(conf)
this.$wx.fnName(fnParam)
``` 

conf 为验证配置
fnName 与 wx.xxx 接口名一致

例如分享到朋友圈  this.$wx.onMenuShareTimeline = wx.onMenuShareTimeline

fnParam 为接口参数与微信接口参数一致


``` js
{
    debug: true, // 开发环境默认为 true 生产环境 false。
    appId: '', // 注册插件时已传，这里可以覆盖，不建议
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: [] // 注册插件时已传，这里可以覆盖，不建议
}
``` 