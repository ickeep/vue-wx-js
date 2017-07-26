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
      config(conf) {
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
      fn(fnName, params) {
        const wx = window.wx
        if (typeof wx[fnName] !== 'function') {
          return {
            status: false,
            errmsg: `微信JS-SDK不支持${fnName}方法`
          }
        }
        wx[fnName](params)
        return {
          status: true,
        }
      }
    }
    for (let i = 0; i < wxFnList.length; i += 1) {
      wxPlugin[wxFnList[i]] = function (params) {
        return wxPlugin.fn(wxFnList[i], params)
      }
    }
    Vue.prototype.$wx = wxPlugin
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
