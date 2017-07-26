'use strict';

exports.__esModule = true;
function plugin(Vue) {
  var DfConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!plugin.installed) {
    (function () {
      /* eslint-disable no-param-reassign */
      var wxFnList = ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getLocalImgData', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'translateVoice', 'getNetworkType', 'openLocation', 'getLocation', 'startSearchBeacons', 'stopSearchBeacons', 'onSearchBeacons', 'closeWindow', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'scanQRCode', 'openProductSpecificView', 'chooseCard', 'addCard', 'openCard', 'chooseWXPay'];
      var wxPlugin = {
        config: function config(conf) {
          var wx = window.wx;
          if (!wx) {
            return {
              status: false,
              errmsg: 'jweixin.js 文件未引入'
            };
          }

          return new Promise(function (resolve) {

            DfConfig.jsApiList = DfConfig.jsApiList || wxFnList;
            var opts = Object.assign(DfConfig, conf);
            wx.config(opts);
            wx.ready(function () {
              resolve({
                status: true
              });
            });
            wx.error(function (res) {
              resolve({
                status: true,
                errmsg: res
              });
            });
          });
        },
        fn: function fn(fnName, params) {
          var wx = window.wx;
          if (typeof wx[fnName] !== 'function') {
            return {
              status: false,
              errmsg: '\u5FAE\u4FE1JS-SDK\u4E0D\u652F\u6301' + fnName + '\u65B9\u6CD5'
            };
          }
          wx[fnName](params);
          return {
            status: true
          };
        }
      };

      var _loop = function _loop(i) {
        wxPlugin[wxFnList[i]] = function (params) {
          return wxPlugin.fn(wxFnList[i], params);
        };
      };

      for (var i = 0; i < wxFnList.length; i += 1) {
        _loop(i);
      }
      Vue.prototype.$wx = wxPlugin;
    })();
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

exports.default = plugin;
