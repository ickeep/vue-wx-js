'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function plugin(Vue) {
  var DfConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!plugin.installed) {
    (function () {
      /* eslint-disable no-param-reassign */
      var wxFnList = ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getLocalImgData', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'translateVoice', 'getNetworkType', 'openLocation', 'getLocation', 'startSearchBeacons', 'stopSearchBeacons', 'onSearchBeacons', 'closeWindow', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'scanQRCode', 'openProductSpecificView', 'chooseCard', 'addCard', 'openCard', 'chooseWXPay'];

      var tmpFn = function tmpFn(fnName, params) {
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
      };
      var wxPlugin = {
        config: function config(conf) {
          var wx = window.wx;
          if (!wx) {
            return {
              status: false,
              errmsg: 'jweixin.js 文件未引入'
            };
          }

          return new _promise2.default(function (resolve) {
            DfConfig.jsApiList = DfConfig.jsApiList || wxFnList.concat();
            var opts = (0, _assign2.default)(DfConfig, conf);

            wx.config(opts);

            wx.ready(function () {
              resolve({
                status: true
              });
            });

            wx.error(function (res) {
              resolve({
                status: false,
                errmsg: res
              });
            });
          });
        }
      };

      var _loop = function _loop(i) {
        wxPlugin[wxFnList[i]] = function (params) {
          return tmpFn(wxFnList[i], params);
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
