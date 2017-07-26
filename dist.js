'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function plugin(Vue) {
  var DfConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!plugin.installed) {
    (function () {
      /* eslint-disable no-param-reassign */
      var vUrlList = {};
      var wxFnList = ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getLocalImgData', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'translateVoice', 'getNetworkType', 'openLocation', 'getLocation', 'startSearchBeacons', 'stopSearchBeacons', 'onSearchBeacons', 'closeWindow', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'scanQRCode', 'openProductSpecificView', 'chooseCard', 'addCard', 'openCard', 'chooseWXPay'];
      var wxPlugin = {
        config: function config(conf) {
          var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : location.href.replace(location.hash, '');

          var wx = window.wx;
          if (!wx) {
            return {
              status: false,
              errmsg: 'jweixin.js 文件未引入'
            };
          }

          return new Promise(function (resolve) {
            if (vUrlList[encodeURIComponent(url)]) {
              resolve({
                status: true
              });
            }
            DfConfig.jsApiList = DfConfig.jsApiList || wxFnList;
            var opts = Object.assign(DfConfig, conf);
            wx.config(opts);
            wx.ready(function () {
              vUrlList[encodeURIComponent(url)] = true;
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
        fn: function fn(fnName, params, conf, url) {
          var _this = this;

          return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var wx, confData;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    wx = window.wx;
                    _context.next = 3;
                    return _this.config(conf, url);

                  case 3:
                    confData = _context.sent;

                    if (!(confData.status !== true)) {
                      _context.next = 6;
                      break;
                    }

                    return _context.abrupt('return', confData);

                  case 6:
                    if (!(typeof wx[fnName] !== 'function')) {
                      _context.next = 8;
                      break;
                    }

                    return _context.abrupt('return', {
                      status: false,
                      errmsg: '\u5FAE\u4FE1JS-SDK\u4E0D\u652F\u6301' + fnName + '\u65B9\u6CD5'
                    });

                  case 8:
                    wx[fnName](params);
                    return _context.abrupt('return', {
                      status: true
                    });

                  case 10:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }))();
        }
      };

      var _loop = function _loop(i) {
        wxPlugin[wxFnList[i]] = function (params, conf, url) {
          return wxPlugin.fn(wxFnList[i], params, conf, url);
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
