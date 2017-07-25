'use strict'

function plugin(Vue, DfConfig = {}) {
  if (!plugin.installed) {
    /* eslint-disable no-param-reassign */
    const vUrlList = {}
    const wxFnList = [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getLocalImgData',
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'playVoice',
      'pauseVoice',
      'stopVoice',
      'onVoicePlayEnd',
      'uploadVoice',
      'downloadVoice',
      'translateVoice',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'startSearchBeacons',
      'stopSearchBeacons',
      'onSearchBeacons',
      'closeWindow',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'scanQRCode',
      'openProductSpecificView',
      'chooseCard',
      'addCard',
      'openCard',
      'chooseWXPay'
    ]
    const wxPlugin = {
      config(conf, url = location.href.replace(location.hash, '')) {
        const wx = window.wx
        if (!wx) {
          return {
            status: false,
            errmsg: 'jweixin.js 文件未引入'
          }
        }

        return new Promise((resolve) => {
          if (vUrlList[encodeURIComponent(url)]) {
            resolve({
              status: true,
            })
          }
          DfConfig.jsApiList = DfConfig.jsApiList || wxFnList
          const opts = Object.assign(DfConfig, conf)
          wx.config(opts)
          wx.ready(() => {
            vUrlList[encodeURIComponent(url)] = true
            resolve({
              status: true,
            })
          })
          wx.error((res) => {
            resolve({
              status: true,
              errmsg: res
            })
          })
        })
      },
      async fn(fnName, params, conf, url) {
        const wx = window.wx
        const confData = await this.config(conf, url)
        if (confData.status !== true) {
          return confData
        }
        if (typeof wx[fnName] !== 'function') {
          return {
            status: false,
            errmsg: `微信JS-SDK不支持${fnName}方法`
          }
        }
        wx[fnName](params)
        return {
          errno: 0
        }
      }
    }
    for (let i = 0; i < wxFnList.length; i += 1) {
      wxPlugin[wxFnList[i]] = function (params, conf, url) {
        return wxPlugin.fn(wxFnList[i], params, conf, url)
      }
    }
    Vue.prototype.$wx = wxPlugin
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
