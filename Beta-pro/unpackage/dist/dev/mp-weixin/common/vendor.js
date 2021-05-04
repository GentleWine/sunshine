(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"PsyProgram","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!*******************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/index.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 12));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 13));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 17));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 18));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 22));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 23));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 24));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 25));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 26));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 27));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 28));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 15));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 14));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 29));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 16));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 30));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 31));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 32));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 33));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 34));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 35);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 36));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 37));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 38));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 39));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 12:
/*!******************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/mixin/mixin.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!********************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/request/index.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 14));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!*************************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/deepMerge.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 15:
/*!*************************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/deepClone.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 16:
/*!********************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/test.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),

/***/ 17:
/*!***************************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/queryParams.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 18:
/*!*********************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/route.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 20);

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"PsyProgram","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"PsyProgram","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"PsyProgram","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"PsyProgram","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 21);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 21:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 22:
/*!**************************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/timeFormat.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 23:
/*!************************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/timeFrom.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 24:
/*!*****************************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/colorGradient.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),

/***/ 25:
/*!********************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/guid.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 26:
/*!*********************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/color.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 27:
/*!*************************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/type2icon.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 28:
/*!***************************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/randomArray.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 29:
/*!***********************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/addUnit.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!**********************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/random.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 31:
/*!********************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/trim.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 313:
/*!**************************************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/components/u-parse/libs/MpHtmlParser.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {/**
 * html 解析器
 * @tutorial https://github.com/jin-yufeng/Parser
 * @version 20201029
 * @author JinYufeng
 * @listens MIT
 */
var cfg = __webpack_require__(/*! ./config.js */ 314),
blankChar = cfg.blankChar,
CssHandler = __webpack_require__(/*! ./CssHandler.js */ 315),
windowWidth = uni.getSystemInfoSync().windowWidth;
var emoji;

function MpHtmlParser(data) {var _this = this;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  this.attrs = {};
  this.CssHandler = new CssHandler(options.tagStyle, windowWidth);
  this.data = data;
  this.domain = options.domain;
  this.DOM = [];
  this.i = this.start = this.audioNum = this.imgNum = this.videoNum = 0;
  options.prot = (this.domain || '').includes('://') ? this.domain.split('://')[0] : 'http';
  this.options = options;
  this.state = this.Text;
  this.STACK = [];
  // 工具函数
  this.bubble = function () {
    for (var i = _this.STACK.length, item; item = _this.STACK[--i];) {
      if (cfg.richOnlyTags[item.name]) return false;
      item.c = 1;
    }
    return true;
  };
  this.decode = function (val, amp) {
    var i = -1,
    j,en;
    while (1) {
      if ((i = val.indexOf('&', i + 1)) == -1) break;
      if ((j = val.indexOf(';', i + 2)) == -1) break;
      if (val[i + 1] == '#') {
        en = parseInt((val[i + 2] == 'x' ? '0' : '') + val.substring(i + 2, j));
        if (!isNaN(en)) val = val.substr(0, i) + String.fromCharCode(en) + val.substr(j + 1);
      } else {
        en = val.substring(i + 1, j);
        if (cfg.entities[en] || en == amp)
        val = val.substr(0, i) + (cfg.entities[en] || '&') + val.substr(j + 1);
      }
    }
    return val;
  };
  this.getUrl = function (url) {
    if (url[0] == '/') {
      if (url[1] == '/') url = _this.options.prot + ':' + url;else
      if (_this.domain) url = _this.domain + url;
    } else if (_this.domain && url.indexOf('data:') != 0 && !url.includes('://'))
    url = _this.domain + '/' + url;
    return url;
  };
  this.isClose = function () {return _this.data[_this.i] == '>' || _this.data[_this.i] == '/' && _this.data[_this.i + 1] == '>';};
  this.section = function () {return _this.data.substring(_this.start, _this.i);};
  this.parent = function () {return _this.STACK[_this.STACK.length - 1];};
  this.siblings = function () {return _this.STACK.length ? _this.parent().children : _this.DOM;};
}
MpHtmlParser.prototype.parse = function () {
  if (emoji) this.data = emoji.parseEmoji(this.data);
  for (var c; c = this.data[this.i]; this.i++) {
    this.state(c);}
  if (this.state == this.Text) this.setText();
  while (this.STACK.length) {this.popNode(this.STACK.pop());}
  return this.DOM;
};
// 设置属性
MpHtmlParser.prototype.setAttr = function () {
  var name = this.attrName.toLowerCase(),
  val = this.attrVal;
  if (cfg.boolAttrs[name]) this.attrs[name] = 'T';else
  if (val) {
    if (name == 'src' || name == 'data-src' && !this.attrs.src) this.attrs.src = this.getUrl(this.decode(val, 'amp'));else
    if (name == 'href' || name == 'style') this.attrs[name] = this.decode(val, 'amp');else
    if (name.substr(0, 5) != 'data-') this.attrs[name] = val;
  }
  this.attrVal = '';
  while (blankChar[this.data[this.i]]) {this.i++;}
  if (this.isClose()) this.setNode();else
  {
    this.start = this.i;
    this.state = this.AttrName;
  }
};
// 设置文本节点
MpHtmlParser.prototype.setText = function () {
  var back,text = this.section();
  if (!text) return;
  text = cfg.onText && cfg.onText(text, function () {return back = true;}) || text;
  if (back) {
    this.data = this.data.substr(0, this.start) + text + this.data.substr(this.i);
    var j = this.start + text.length;
    for (this.i = this.start; this.i < j; this.i++) {this.state(this.data[this.i]);}
    return;
  }
  if (!this.pre) {
    // 合并空白符
    var flag,tmp = [];
    for (var i = text.length, c; c = text[--i];) {
      if (!blankChar[c]) {
        tmp.unshift(c);
        if (!flag) flag = 1;
      } else {
        if (tmp[0] != ' ') tmp.unshift(' ');
        if (c == '\n' && flag == void 0) flag = 0;
      }}
    if (flag == 0) return;
    text = tmp.join('');
  }
  this.siblings().push({
    type: 'text',
    text: this.decode(text) });

};
// 设置元素节点
MpHtmlParser.prototype.setNode = function () {
  var node = {
    name: this.tagName.toLowerCase(),
    attrs: this.attrs },

  close = cfg.selfClosingTags[node.name];
  if (this.options.nodes.length) node.type = 'node';
  this.attrs = {};
  if (!cfg.ignoreTags[node.name]) {
    // 处理属性
    var attrs = node.attrs,
    style = this.CssHandler.match(node.name, attrs, node) + (attrs.style || ''),
    styleObj = {};
    if (attrs.id) {
      if (this.options.compress & 1) attrs.id = void 0;else
      if (this.options.useAnchor) this.bubble();
    }
    if (this.options.compress & 2 && attrs.class) attrs.class = void 0;
    switch (node.name) {
      case 'a':
      case 'ad':


        this.bubble();
        break;
      case 'font':
        if (attrs.color) {
          styleObj['color'] = attrs.color;
          attrs.color = void 0;
        }
        if (attrs.face) {
          styleObj['font-family'] = attrs.face;
          attrs.face = void 0;
        }
        if (attrs.size) {
          var size = parseInt(attrs.size);
          if (size < 1) size = 1;else
          if (size > 7) size = 7;
          var map = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
          styleObj['font-size'] = map[size - 1];
          attrs.size = void 0;
        }
        break;
      case 'embed':

        var src = node.attrs.src || '',
        type = node.attrs.type || '';
        if (type.includes('video') || src.includes('.mp4') || src.includes('.3gp') || src.includes('.m3u8'))
        node.name = 'video';else
        if (type.includes('audio') || src.includes('.m4a') || src.includes('.wav') || src.includes('.mp3') || src.includes(
        '.aac'))
        node.name = 'audio';else
        break;
        if (node.attrs.autostart)
        node.attrs.autoplay = 'T';
        node.attrs.controls = 'T';





      case 'video':
      case 'audio':
        if (!attrs.id) attrs.id = node.name + ++this["".concat(node.name, "Num")];else
        this["".concat(node.name, "Num")]++;
        if (node.name == 'video') {
          if (this.videoNum > 3)
          node.lazyLoad = 1;
          if (attrs.width) {
            styleObj.width = parseFloat(attrs.width) + (attrs.width.includes('%') ? '%' : 'px');
            attrs.width = void 0;
          }
          if (attrs.height) {
            styleObj.height = parseFloat(attrs.height) + (attrs.height.includes('%') ? '%' : 'px');
            attrs.height = void 0;
          }
        }
        if (!attrs.controls && !attrs.autoplay) attrs.controls = 'T';
        attrs.source = [];
        if (attrs.src) {
          attrs.source.push(attrs.src);
          attrs.src = void 0;
        }
        this.bubble();
        break;
      case 'td':
      case 'th':
        if (attrs.colspan || attrs.rowspan)
        for (var k = this.STACK.length, item; item = this.STACK[--k];) {
          if (item.name == 'table') {
            item.flag = 1;
            break;
          }}}

    if (attrs.align) {
      if (node.name == 'table') {
        if (attrs.align == 'center') styleObj['margin-inline-start'] = styleObj['margin-inline-end'] = 'auto';else
        styleObj['float'] = attrs.align;
      } else styleObj['text-align'] = attrs.align;
      attrs.align = void 0;
    }
    // 压缩 style
    var styles = style.split(';');
    style = '';
    for (var i = 0, len = styles.length; i < len; i++) {
      var info = styles[i].split(':');
      if (info.length < 2) continue;
      var _key = info[0].trim().toLowerCase(),
      _value = info.slice(1).join(':').trim();
      if (_value[0] == '-' || _value.includes('safe'))
      style += ";".concat(_key, ":").concat(_value);else
      if (!styleObj[_key] || _value.includes('import') || !styleObj[_key].includes('import'))
      styleObj[_key] = _value;
    }
    if (node.name == 'img') {
      if (attrs.src && !attrs.ignore) {
        if (this.bubble())
        attrs.i = (this.imgNum++).toString();else
        attrs.ignore = 'T';
      }
      if (attrs.ignore) {
        style += ';-webkit-touch-callout:none';
        styleObj['max-width'] = '100%';
      }
      var width;
      if (styleObj.width) width = styleObj.width;else
      if (attrs.width) width = attrs.width.includes('%') ? attrs.width : parseFloat(attrs.width) + 'px';
      if (width) {
        styleObj.width = width;
        attrs.width = '100%';
        if (parseInt(width) > windowWidth) {
          styleObj.height = '';
          if (attrs.height) attrs.height = void 0;
        }
      }
      if (styleObj.height) {
        attrs.height = styleObj.height;
        styleObj.height = '';
      } else if (attrs.height && !attrs.height.includes('%'))
      attrs.height = parseFloat(attrs.height) + 'px';
    }
    for (var key in styleObj) {
      var value = styleObj[key];
      if (!value) continue;
      if (key.includes('flex') || key == 'order' || key == 'self-align') node.c = 1;
      // 填充链接
      if (value.includes('url')) {
        var j = value.indexOf('(');
        if (j++ != -1) {
          while (value[j] == '"' || value[j] == "'" || blankChar[value[j]]) {j++;}
          value = value.substr(0, j) + this.getUrl(value.substr(j));
        }
      }
      // 转换 rpx
      else if (value.includes('rpx'))
        value = value.replace(/[0-9.]+\s*rpx/g, function ($) {return parseFloat($) * windowWidth / 750 + 'px';});else
        if (key == 'white-space' && value.includes('pre') && !close)
        this.pre = node.pre = true;
      style += ";".concat(key, ":").concat(value);
    }
    style = style.substr(1);
    if (style) attrs.style = style;
    if (!close) {
      node.children = [];
      if (node.name == 'pre' && cfg.highlight) {
        this.remove(node);
        this.pre = node.pre = true;
      }
      this.siblings().push(node);
      this.STACK.push(node);
    } else if (!cfg.filter || cfg.filter(node, this) != false)
    this.siblings().push(node);
  } else {
    if (!close) this.remove(node);else
    if (node.name == 'source') {
      var parent = this.parent();
      if (parent && (parent.name == 'video' || parent.name == 'audio') && node.attrs.src)
      parent.attrs.source.push(node.attrs.src);
    } else if (node.name == 'base' && !this.domain) this.domain = node.attrs.href;
  }
  if (this.data[this.i] == '/') this.i++;
  this.start = this.i + 1;
  this.state = this.Text;
};
// 移除标签
MpHtmlParser.prototype.remove = function (node) {var _this2 = this;
  var name = node.name,
  j = this.i;
  // 处理 svg
  var handleSvg = function handleSvg() {
    var src = _this2.data.substring(j, _this2.i + 1);
    node.attrs.xmlns = 'http://www.w3.org/2000/svg';
    for (var key in node.attrs) {
      if (key == 'viewbox') src = " viewBox=\"".concat(node.attrs.viewbox, "\"") + src;else
      if (key != 'style') src = " ".concat(key, "=\"").concat(node.attrs[key], "\"") + src;
    }
    src = '<svg' + src;
    var parent = _this2.parent();
    if (node.attrs.width == '100%' && parent && (parent.attrs.style || '').includes('inline'))
    parent.attrs.style = 'width:300px;max-width:100%;' + parent.attrs.style;
    _this2.siblings().push({
      name: 'img',
      attrs: {
        src: 'data:image/svg+xml;utf8,' + src.replace(/#/g, '%23'),
        style: node.attrs.style,
        ignore: 'T' } });


  };
  if (node.name == 'svg' && this.data[j] == '/') return handleSvg(this.i++);
  while (1) {
    if ((this.i = this.data.indexOf('</', this.i + 1)) == -1) {
      if (name == 'pre' || name == 'svg') this.i = j;else
      this.i = this.data.length;
      return;
    }
    this.start = this.i += 2;
    while (!blankChar[this.data[this.i]] && !this.isClose()) {this.i++;}
    if (this.section().toLowerCase() == name) {
      // 代码块高亮
      if (name == 'pre') {
        this.data = this.data.substr(0, j + 1) + cfg.highlight(this.data.substring(j + 1, this.i - 5), node.attrs) + this.data.
        substr(this.i - 5);
        return this.i = j;
      } else if (name == 'style')
      this.CssHandler.getStyle(this.data.substring(j + 1, this.i - 7));else
      if (name == 'title')
      this.DOM.title = this.data.substring(j + 1, this.i - 7);
      if ((this.i = this.data.indexOf('>', this.i)) == -1) this.i = this.data.length;
      if (name == 'svg') handleSvg();
      return;
    }
  }
};
// 节点出栈处理
MpHtmlParser.prototype.popNode = function (node) {
  // 空白符处理
  if (node.pre) {
    node.pre = this.pre = void 0;
    for (var i = this.STACK.length; i--;) {
      if (this.STACK[i].pre)
      this.pre = true;}
  }
  var siblings = this.siblings(),
  len = siblings.length,
  childs = node.children;
  if (node.name == 'head' || cfg.filter && cfg.filter(node, this) == false)
  return siblings.pop();
  var attrs = node.attrs;
  // 替换一些标签名
  if (cfg.blockTags[node.name]) node.name = 'div';else
  if (!cfg.trustTags[node.name]) node.name = 'span';
  // 处理列表
  if (node.c && (node.name == 'ul' || node.name == 'ol')) {
    if ((node.attrs.style || '').includes('list-style:none')) {
      for (var _i = 0, child; child = childs[_i++];) {
        if (child.name == 'li')
        child.name = 'div';}
    } else if (node.name == 'ul') {
      var floor = 1;
      for (var _i2 = this.STACK.length; _i2--;) {
        if (this.STACK[_i2].name == 'ul') floor++;}
      if (floor != 1)
      for (var _i3 = childs.length; _i3--;) {
        childs[_i3].floor = floor;}
    } else {
      for (var _i4 = 0, num = 1, _child; _child = childs[_i4++];) {
        if (_child.name == 'li') {
          _child.type = 'ol';
          _child.num = function (num, type) {
            if (type == 'a') return String.fromCharCode(97 + (num - 1) % 26);
            if (type == 'A') return String.fromCharCode(65 + (num - 1) % 26);
            if (type == 'i' || type == 'I') {
              num = (num - 1) % 99 + 1;
              var one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
              ten = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
              res = (ten[Math.floor(num / 10) - 1] || '') + (one[num % 10 - 1] || '');
              if (type == 'i') return res.toLowerCase();
              return res;
            }
            return num;
          }(num++, attrs.type) + '.';
        }}
    }
  }
  // 处理表格
  if (node.name == 'table') {
    var padding = parseFloat(attrs.cellpadding),
    spacing = parseFloat(attrs.cellspacing),
    border = parseFloat(attrs.border);
    if (node.c) {
      if (isNaN(padding)) padding = 2;
      if (isNaN(spacing)) spacing = 2;
    }
    if (border) attrs.style = "border:".concat(border, "px solid gray;").concat(attrs.style || '');
    if (node.flag && node.c) {
      // 有 colspan 或 rowspan 且含有链接的表格转为 grid 布局实现
      attrs.style = "".concat(attrs.style || '', ";").concat(spacing ? ";grid-gap:".concat(spacing, "px") : ';border-left:0;border-top:0');
      var row = 1,
      col = 1,
      colNum,
      trs = [],
      children = [],
      map = {};
      (function f(ns) {
        for (var i = 0; i < ns.length; i++) {
          if (ns[i].name == 'tr') trs.push(ns[i]);else
          f(ns[i].children || []);
        }
      })(node.children);
      for (var _i5 = 0; _i5 < trs.length; _i5++) {
        for (var j = 0, td; td = trs[_i5].children[j]; j++) {
          if (td.name == 'td' || td.name == 'th') {
            while (map[row + '.' + col]) {col++;}
            var cell = {
              name: 'div',
              c: 1,
              attrs: {
                style: (td.attrs.style || '') + (border ? ";border:".concat(border, "px solid gray") + (spacing ? '' :
                ';border-right:0;border-bottom:0') : '') + (padding ? ";padding:".concat(padding, "px") : '') },

              children: td.children };

            if (td.attrs.colspan) {
              cell.attrs.style += ';grid-column-start:' + col + ';grid-column-end:' + (col + parseInt(td.attrs.colspan));
              if (!td.attrs.rowspan) cell.attrs.style += ';grid-row-start:' + row + ';grid-row-end:' + (row + 1);
              col += parseInt(td.attrs.colspan) - 1;
            }
            if (td.attrs.rowspan) {
              cell.attrs.style += ';grid-row-start:' + row + ';grid-row-end:' + (row + parseInt(td.attrs.rowspan));
              if (!td.attrs.colspan) cell.attrs.style += ';grid-column-start:' + col + ';grid-column-end:' + (col + 1);
              for (var k = 1; k < td.attrs.rowspan; k++) {map[row + k + '.' + col] = 1;}
            }
            children.push(cell);
            col++;
          }
        }
        if (!colNum) {
          colNum = col - 1;
          attrs.style += ";grid-template-columns:repeat(".concat(colNum, ",auto)");
        }
        col = 1;
        row++;
      }
      node.children = children;
    } else {
      attrs.style = "border-spacing:".concat(spacing, "px;").concat(attrs.style || '');
      if (border || padding)
      (function f(ns) {
        for (var i = 0, n; n = ns[i]; i++) {
          if (n.name == 'th' || n.name == 'td') {
            if (border) n.attrs.style = "border:".concat(border, "px solid gray;").concat(n.attrs.style || '');
            if (padding) n.attrs.style = "padding:".concat(padding, "px;").concat(n.attrs.style || '');
          } else f(n.children || []);
        }
      })(childs);
    }
    if (this.options.autoscroll) {
      var table = Object.assign({}, node);
      node.name = 'div';
      node.attrs = {
        style: 'overflow:scroll' };

      node.children = [table];
    }
  }
  this.CssHandler.pop && this.CssHandler.pop(node);
  // 自动压缩
  if (node.name == 'div' && !Object.keys(attrs).length && childs.length == 1 && childs[0].name == 'div')
  siblings[len - 1] = childs[0];
};
// 状态机
MpHtmlParser.prototype.Text = function (c) {
  if (c == '<') {
    var next = this.data[this.i + 1],
    isLetter = function isLetter(c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';};
    if (isLetter(next)) {
      this.setText();
      this.start = this.i + 1;
      this.state = this.TagName;
    } else if (next == '/') {
      this.setText();
      if (isLetter(this.data[++this.i + 1])) {
        this.start = this.i + 1;
        this.state = this.EndTag;
      } else this.Comment();
    } else if (next == '!' || next == '?') {
      this.setText();
      this.Comment();
    }
  }
};
MpHtmlParser.prototype.Comment = function () {
  var key;
  if (this.data.substring(this.i + 2, this.i + 4) == '--') key = '-->';else
  if (this.data.substring(this.i + 2, this.i + 9) == '[CDATA[') key = ']]>';else
  key = '>';
  if ((this.i = this.data.indexOf(key, this.i + 2)) == -1) this.i = this.data.length;else
  this.i += key.length - 1;
  this.start = this.i + 1;
  this.state = this.Text;
};
MpHtmlParser.prototype.TagName = function (c) {
  if (blankChar[c]) {
    this.tagName = this.section();
    while (blankChar[this.data[this.i]]) {this.i++;}
    if (this.isClose()) this.setNode();else
    {
      this.start = this.i;
      this.state = this.AttrName;
    }
  } else if (this.isClose()) {
    this.tagName = this.section();
    this.setNode();
  }
};
MpHtmlParser.prototype.AttrName = function (c) {
  if (c == '=' || blankChar[c] || this.isClose()) {
    this.attrName = this.section();
    if (blankChar[c])
    while (blankChar[this.data[++this.i]]) {;}
    if (this.data[this.i] == '=') {
      while (blankChar[this.data[++this.i]]) {;}
      this.start = this.i--;
      this.state = this.AttrValue;
    } else this.setAttr();
  }
};
MpHtmlParser.prototype.AttrValue = function (c) {
  if (c == '"' || c == "'") {
    this.start++;
    if ((this.i = this.data.indexOf(c, this.i + 1)) == -1) return this.i = this.data.length;
    this.attrVal = this.section();
    this.i++;
  } else {
    for (; !blankChar[this.data[this.i]] && !this.isClose(); this.i++) {;}
    this.attrVal = this.section();
  }
  this.setAttr();
};
MpHtmlParser.prototype.EndTag = function (c) {
  if (blankChar[c] || c == '>' || c == '/') {
    var name = this.section().toLowerCase();
    for (var i = this.STACK.length; i--;) {
      if (this.STACK[i].name == name) break;}
    if (i != -1) {
      var node;
      while ((node = this.STACK.pop()).name != name) {this.popNode(node);}
      this.popNode(node);
    } else if (name == 'p' || name == 'br')
    this.siblings().push({
      name: name,
      attrs: {} });

    this.i = this.data.indexOf('>', this.i);
    this.start = this.i + 1;
    if (this.i == -1) this.i = this.data.length;else
    this.state = this.Text;
  }
};
module.exports = MpHtmlParser;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 314:
/*!********************************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/components/u-parse/libs/config.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* 配置文件 */
var cfg = {
  // 出错占位图
  errorImg: null,
  // 过滤器函数
  filter: null,
  // 代码高亮函数
  highlight: null,
  // 文本处理函数
  onText: null,
  // 实体编码列表
  entities: {
    quot: '"',
    apos: "'",
    semi: ';',
    nbsp: '\xA0',
    ensp: "\u2002",
    emsp: "\u2003",
    ndash: '–',
    mdash: '—',
    middot: '·',
    lsquo: '‘',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    bull: '•',
    hellip: '…' },

  blankChar: makeMap(' ,\xA0,\t,\r,\n,\f'),
  boolAttrs: makeMap('allowfullscreen,autoplay,autostart,controls,ignore,loop,muted'),
  // 块级标签，将被转为 div
  blockTags: makeMap('address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section'),
  // 将被移除的标签
  ignoreTags: makeMap('area,base,canvas,frame,iframe,input,link,map,meta,param,script,source,style,svg,textarea,title,track,wbr'),
  // 只能被 rich-text 显示的标签
  richOnlyTags: makeMap('a,colgroup,fieldset,legend'),
  // 自闭合的标签
  selfClosingTags: makeMap('area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr'),
  // 信任的标签
  trustTags: makeMap('a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video'),
  // 默认的标签样式
  userAgentStyles: {
    address: 'font-style:italic',
    big: 'display:inline;font-size:1.2em',
    blockquote: 'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px',
    caption: 'display:table-caption;text-align:center',
    center: 'text-align:center',
    cite: 'font-style:italic',
    dd: 'margin-left:40px',
    mark: 'background-color:yellow',
    pre: 'font-family:monospace;white-space:pre;overflow:scroll',
    s: 'text-decoration:line-through',
    small: 'display:inline;font-size:0.8em',
    u: 'text-decoration:underline' } };



function makeMap(str) {
  var map = Object.create(null),
  list = str.split(',');
  for (var i = list.length; i--;) {
    map[list[i]] = true;}
  return map;
}


if (wx.canIUse('editor')) {
  cfg.blockTags.pre = void 0;
  cfg.ignoreTags.rp = true;
  Object.assign(cfg.richOnlyTags, makeMap('bdi,bdo,caption,rt,ruby'));
  Object.assign(cfg.trustTags, makeMap('bdi,bdo,caption,pre,rt,ruby'));
}







module.exports = cfg;

/***/ }),

/***/ 315:
/*!************************************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/components/u-parse/libs/CssHandler.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cfg = __webpack_require__(/*! ./config.js */ 314),
isLetter = function isLetter(c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';};

function CssHandler(tagStyle) {
  var styles = Object.assign(Object.create(null), cfg.userAgentStyles);
  for (var item in tagStyle) {
    styles[item] = (styles[item] ? styles[item] + ';' : '') + tagStyle[item];}
  this.styles = styles;
}
CssHandler.prototype.getStyle = function (data) {
  this.styles = new parser(data, this.styles).parse();
};
CssHandler.prototype.match = function (name, attrs) {
  var tmp,matched = (tmp = this.styles[name]) ? tmp + ';' : '';
  if (attrs.class) {
    var items = attrs.class.split(' ');
    for (var i = 0, item; item = items[i]; i++) {
      if (tmp = this.styles['.' + item])
      matched += tmp + ';';}
  }
  if (tmp = this.styles['#' + attrs.id])
  matched += tmp + ';';
  return matched;
};
module.exports = CssHandler;

function parser(data, init) {
  this.data = data;
  this.floor = 0;
  this.i = 0;
  this.list = [];
  this.res = init;
  this.state = this.Space;
}
parser.prototype.parse = function () {
  for (var c; c = this.data[this.i]; this.i++) {
    this.state(c);}
  return this.res;
};
parser.prototype.section = function () {
  return this.data.substring(this.start, this.i);
};
// 状态机
parser.prototype.Space = function (c) {
  if (c == '.' || c == '#' || isLetter(c)) {
    this.start = this.i;
    this.state = this.Name;
  } else if (c == '/' && this.data[this.i + 1] == '*')
  this.Comment();else
  if (!cfg.blankChar[c] && c != ';')
  this.state = this.Ignore;
};
parser.prototype.Comment = function () {
  this.i = this.data.indexOf('*/', this.i) + 1;
  if (!this.i) this.i = this.data.length;
  this.state = this.Space;
};
parser.prototype.Ignore = function (c) {
  if (c == '{') this.floor++;else
  if (c == '}' && ! --this.floor) {
    this.list = [];
    this.state = this.Space;
  }
};
parser.prototype.Name = function (c) {
  if (cfg.blankChar[c]) {
    this.list.push(this.section());
    this.state = this.NameSpace;
  } else if (c == '{') {
    this.list.push(this.section());
    this.Content();
  } else if (c == ',') {
    this.list.push(this.section());
    this.Comma();
  } else if (!isLetter(c) && (c < '0' || c > '9') && c != '-' && c != '_')
  this.state = this.Ignore;
};
parser.prototype.NameSpace = function (c) {
  if (c == '{') this.Content();else
  if (c == ',') this.Comma();else
  if (!cfg.blankChar[c]) this.state = this.Ignore;
};
parser.prototype.Comma = function () {
  while (cfg.blankChar[this.data[++this.i]]) {;}
  if (this.data[this.i] == '{') this.Content();else
  {
    this.start = this.i--;
    this.state = this.Name;
  }
};
parser.prototype.Content = function () {
  this.start = ++this.i;
  if ((this.i = this.data.indexOf('}', this.i)) == -1) this.i = this.data.length;
  var content = this.section();
  for (var i = 0, item; item = this.list[i++];) {
    if (this.res[item]) this.res[item] += ';' + content;else
    this.res[item] = content;}
  this.list = [];
  this.state = this.Space;
};

/***/ }),

/***/ 32:
/*!*********************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/toast.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 33:
/*!*************************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/getParent.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 34:
/*!***********************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/$parent.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 35:
/*!*******************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/sys.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 36:
/*!************************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/debounce.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 37:
/*!************************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/function/throttle.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 38:
/*!********************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/config/config.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-12-17
var version = '1.8.3';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 39:
/*!********************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/config/zIndex.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 393:
/*!*******************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/util/emitter.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 递归使用 call 方式this指向
                                                                                                      * @param componentName // 需要找的组件的名称
                                                                                                      * @param eventName // 事件名称
                                                                                                      * @param params // 需要传递的参数
                                                                                                      */
function _broadcast(componentName, eventName, params) {
  // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =
{
  methods: {
    /**
              * 派发 (向上查找) (一个)
              * @param componentName // 需要找的组件的名称
              * @param eventName // 事件名称
              * @param params // 需要传递的参数
              */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent 找到最近的父节点 $root 根节点
      var name = parent.$options.name; // 获取当前组件实例的name
      // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
      // 循环出当前名称的一样的组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 有节点表示当前找到了name一样的实例
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
        * 广播 (向下查找) (广播多个)
        * @param componentName // 需要找的组件的名称
        * @param eventName // 事件名称
        * @param params // 需要传递的参数
        */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),

/***/ 394:
/*!***************************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/uview-ui/libs/util/async-validator.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/* eslint no-console:0 */
var formatRegExp = /%[sdj%]/g;
var warning = function warning() {}; // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && Object({"NODE_ENV":"development","VUE_APP_NAME":"PsyProgram","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}) && "development" !== 'production' && typeof window !==
'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}

function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var i = 1;
  var f = args[0];
  var len = args.length;

  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }

  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }

      if (i >= len) {
        return x;
      }

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

          break;

        default:
          return x;}

    });

    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += " " + arg;
    }

    return str;
  }

  return f;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  return false;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;

    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }

    var original = index;
    index = index + 1;

    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject({
          errors: errors,
          fields: convertFieldsError(errors) }) :
        resolve();
      };

      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });

    _pending["catch"](function (e) {
      return e;
    });

    return _pending;
  }

  var firstFields = option.firstFields || [];

  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }

  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;

      if (total === objArrLength) {
        callback(results);
        return results.length ? reject({
          errors: results,
          fields: convertFieldsError(results) }) :
        resolve();
      }
    };

    if (!objArrKeys.length) {
      callback(results);
      resolve();
    }

    objArrKeys.forEach(function (key) {
      var arr = objArr[key];

      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function (e) {
    return e;
  });
  return pending;
}

function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }

    return {
      message: typeof oe === 'function' ? oe() : oe,
      field: oe.field || rule.fullField };

  };
}

function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];

        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = _extends({}, target[s], {}, value);
        } else {
          target[s] = value;
        }
      }
    }
  }

  return target;
}

/**
   *  Rule for validating required fields.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}

/**
   *  Rule for validating whitespace.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}

/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i };

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function _float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }

    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear ===
    'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    // 修改源码，将字符串数值先转为数值
    return typeof +value === 'number';
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  } };

/**
        *  Rule for validating the type of a value.
        *
        *  @param rule The validation rule.
        *  @param value The value of the field on the source object.
        *  @param source The source object being validated.
        *  @param errors An array of errors that this rule may add
        *  validation errors to.
        *  @param options The validation options.
        *  @param options.messages The validation messages.
        */

function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }

  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;

  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check

  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/**
   *  Rule for validating minimum and maximum allowed values.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);

  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type


  if (!key) {
    return false;
  }

  if (arr) {
    val = value.length;
  }

  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}

var ENUM = 'enum';
/**
                    *  Rule for validating a value exists in an enumerable list.
                    *
                    *  @param rule The validation rule.
                    *  @param value The value of the field on the source object.
                    *  @param source The source object being validated.
                    *  @param errors An array of errors that this rule may add
                    *  validation errors to.
                    *  @param options The validation options.
                    *  @param options.messages The validation messages.
                    */

function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];

  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/**
   *  Rule for validating a regular expression pattern.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;

      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);

      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}

var rules = {
  required: required,
  whitespace: whitespace,
  type: type,
  range: range,
  "enum": enumerable,
  pattern: pattern$1 };


/**
                         *  Performs validation for string types.
                         *
                         *  @param rule The validation rule.
                         *  @param value The value of the field on the source object.
                         *  @param callback The callback function.
                         *  @param source The source object being validated.
                         *  @param options The validation options.
                         *  @param options.messages The validation messages.
                         */

function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'string');

    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);

      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }

  callback(errors);
}

/**
   *  Validates a function.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (value === '') {
      value = undefined;
    }

    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a boolean.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates the regular expression type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is an integer.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is a floating point number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an array.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'array') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'array');

    if (!isEmptyValue(value, 'array')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an object.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

var ENUM$1 = 'enum';
/**
                      *  Validates an enumerable list.
                      *
                      *  @param rule The validation rule.
                      *  @param value The value of the field on the source object.
                      *  @param callback The callback function.
                      *  @param source The source object being validated.
                      *  @param options The validation options.
                      *  @param options.messages The validation messages.
                      */

function enumerable$1(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a regular expression pattern.
   *
   *  Performs validation when a rule only contains
   *  a pattern property but is not declared as a string type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

function date(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      var dateObject;

      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }

      rules.type(rule, dateObject, source, errors, options);

      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }

  callback(errors);
}

function required$1(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value;
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
}

function type$1(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, ruleType);

    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Performs validation for any type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);
  }

  callback(errors);
}

var validators = {
  string: string,
  method: method,
  number: number,
  "boolean": _boolean,
  regexp: regexp,
  integer: integer,
  "float": floatFn,
  array: array,
  object: object,
  "enum": enumerable$1,
  pattern: pattern$2,
  date: date,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any: any };


function newMessages() {
  return {
    "default": 'Validation error on field %s',
    required: '%s is required',
    "enum": '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid' },

    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      "boolean": '%s is not a %s',
      integer: '%s is not an %s',
      "float": '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s' },

    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters' },

    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s' },

    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length' },

    pattern: {
      mismatch: '%s value %s does not match pattern %s' },

    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    } };

}
var messages = newMessages();

/**
                               *  Encapsulates a validation schema.
                               *
                               *  @param descriptor An object declaring validation rules
                               *  for this schema.
                               */

function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}

Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }

    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};
    var z;
    var item;

    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o, oc) {
    var _this = this;

    if (o === void 0) {
      o = {};
    }

    if (oc === void 0) {
      oc = function oc() {};
    }

    var source = source_;
    var options = o;
    var callback = oc;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }

      return Promise.resolve();
    }

    function complete(results) {
      var i;
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          var _errors;

          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }

      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }

      callback(errors, fields);
    }

    if (options.messages) {
      var messages$1 = this.messages();

      if (messages$1 === messages) {
        messages$1 = newMessages();
      }

      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }

    var arr;
    var value;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;

        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }

          value = source[z] = rule.transform(value);
        }

        if (typeof rule === 'function') {
          rule = {
            validator: rule };

        } else {
          rule = _extends({}, rule);
        }

        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);

        if (!rule.validator) {
          return;
        }

        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z });

      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField ===
      'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;

      function addFullfield(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key });

      }

      function cb(e) {
        if (e === void 0) {
          e = [];
        }

        var errors = e;

        if (!Array.isArray(errors)) {
          errors = [errors];
        }

        if (!options.suppressWarning && errors.length) {
          Schema.warning('async-validator:', errors);
        }

        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(complementError(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }

        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }

            return doIt(errors);
          }

          var fieldsSchema = {};

          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }

          fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);

          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }

          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);

          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }

          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];

            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }

            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }

            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }

      var res;

      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);

        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || rule.field + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }

      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }

    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }

    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }

    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');

    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }

    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }

    return validators[this.getType(rule)] || false;
  } };


Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }

  validators[type] = validator;
};

Schema.warning = warning;
Schema.messages = messages;var _default =

Schema;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/node-libs-browser/mock/process.js */ 395)))

/***/ }),

/***/ 395:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 396);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 396:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 395)))

/***/ }),

/***/ 4:
/*!***********************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/pages.json ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 46:
/*!*******************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/utils/jsrsasign.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.decodeToken = void 0;var _jsrsasign = _interopRequireDefault(__webpack_require__(/*! jsrsasign */ 47));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var decodeToken = function decodeToken(token) {
  var obj = null;
  if (token !== '') {
    var payload = _jsrsasign.default.KJUR.jws.JWS.parse(token);
    if (payload.hasOwnProperty('payloadObj')) {
      obj = payload.payloadObj;
    }
  }
  return obj;
};exports.decodeToken = decodeToken;

/***/ }),

/***/ 47:
/*!****************************************************************************************!*\
  !*** /Users/mo/代码集合/HBuilderProjects/Beta-pro/node_modules/jsrsasign/lib/jsrsasign.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {
var navigator = {};
navigator.userAgent = false;

var window = {};
/*
                  * jsrsasign(all) 10.1.5 (2021-01-17) (c) 2010-2020 Kenji Urushima | kjur.github.com/jsrsasign/license
                  */

/*!
                     Copyright (c) 2011, Yahoo! Inc. All rights reserved.
                     Code licensed under the BSD License:
                     http://developer.yahoo.com/yui/license.html
                     version: 2.9.0
                     */
if (YAHOO === undefined) {var YAHOO = {};}YAHOO.lang = { extend: function extend(g, h, f) {if (!h || !g) {throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");}var d = function d() {};d.prototype = h.prototype;g.prototype = new d();g.prototype.constructor = g;g.superclass = h.prototype;if (h.prototype.constructor == Object.prototype.constructor) {h.prototype.constructor = h;}if (f) {var b;for (b in f) {g.prototype[b] = f[b];}var e = function e() {},c = ["toString", "valueOf"];try {if (/MSIE/.test(navigator.userAgent)) {e = function e(j, i) {for (b = 0; b < c.length; b = b + 1) {var l = c[b],k = i[l];if (typeof k === "function" && k != Object.prototype[l]) {j[l] = k;}}};}} catch (a) {}e(g.prototype, f);}} };

/*! CryptoJS v3.1.2 core-fix.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * code.google.com/p/crypto-js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * (c) 2009-2013 by Jeff Mott. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * code.google.com/p/crypto-js/wiki/License
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * THIS IS FIX of 'core.js' to fix Hmac issue.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * https://code.google.com/p/crypto-js/issues/detail?id=84
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * https://crypto-js.googlecode.com/svn-history/r667/branches/3.x/src/core.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       */
var CryptoJS = CryptoJS || function (e, g) {var a = {};var b = a.lib = {};var j = b.Base = function () {function n() {}return { extend: function extend(p) {n.prototype = this;var o = new n();if (p) {o.mixIn(p);}if (!o.hasOwnProperty("init")) {o.init = function () {o.$super.init.apply(this, arguments);};}o.init.prototype = o;o.$super = this;return o;}, create: function create() {var o = this.extend();o.init.apply(o, arguments);return o;}, init: function init() {}, mixIn: function mixIn(p) {for (var o in p) {if (p.hasOwnProperty(o)) {this[o] = p[o];}}if (p.hasOwnProperty("toString")) {this.toString = p.toString;}}, clone: function clone() {return this.init.prototype.extend(this);} };}();var l = b.WordArray = j.extend({ init: function init(o, n) {o = this.words = o || [];if (n != g) {this.sigBytes = n;} else {this.sigBytes = o.length * 4;}}, toString: function toString(n) {return (n || h).stringify(this);}, concat: function concat(t) {var q = this.words;var p = t.words;var n = this.sigBytes;var s = t.sigBytes;this.clamp();if (n % 4) {for (var r = 0; r < s; r++) {var o = p[r >>> 2] >>> 24 - r % 4 * 8 & 255;q[n + r >>> 2] |= o << 24 - (n + r) % 4 * 8;}} else {for (var r = 0; r < s; r += 4) {q[n + r >>> 2] = p[r >>> 2];}}this.sigBytes += s;return this;}, clamp: function clamp() {var o = this.words;var n = this.sigBytes;o[n >>> 2] &= 4294967295 << 32 - n % 4 * 8;o.length = e.ceil(n / 4);}, clone: function clone() {var n = j.clone.call(this);n.words = this.words.slice(0);return n;}, random: function random(p) {var o = [];for (var n = 0; n < p; n += 4) {o.push(e.random() * 4294967296 | 0);}return new l.init(o, p);} });var m = a.enc = {};var h = m.Hex = { stringify: function stringify(p) {var r = p.words;var o = p.sigBytes;var q = [];for (var n = 0; n < o; n++) {var s = r[n >>> 2] >>> 24 - n % 4 * 8 & 255;q.push((s >>> 4).toString(16));q.push((s & 15).toString(16));}return q.join("");}, parse: function parse(p) {var n = p.length;var q = [];for (var o = 0; o < n; o += 2) {q[o >>> 3] |= parseInt(p.substr(o, 2), 16) << 24 - o % 8 * 4;}return new l.init(q, n / 2);} };var d = m.Latin1 = { stringify: function stringify(q) {var r = q.words;var p = q.sigBytes;var n = [];for (var o = 0; o < p; o++) {var s = r[o >>> 2] >>> 24 - o % 4 * 8 & 255;n.push(String.fromCharCode(s));}return n.join("");}, parse: function parse(p) {var n = p.length;var q = [];for (var o = 0; o < n; o++) {q[o >>> 2] |= (p.charCodeAt(o) & 255) << 24 - o % 4 * 8;}return new l.init(q, n);} };var c = m.Utf8 = { stringify: function stringify(n) {try {return decodeURIComponent(escape(d.stringify(n)));} catch (o) {throw new Error("Malformed UTF-8 data");}}, parse: function parse(n) {return d.parse(unescape(encodeURIComponent(n)));} };var i = b.BufferedBlockAlgorithm = j.extend({ reset: function reset() {this._data = new l.init();this._nDataBytes = 0;}, _append: function _append(n) {if (typeof n == "string") {n = c.parse(n);}this._data.concat(n);this._nDataBytes += n.sigBytes;}, _process: function _process(w) {var q = this._data;var x = q.words;var n = q.sigBytes;var t = this.blockSize;var v = t * 4;var u = n / v;if (w) {u = e.ceil(u);} else {u = e.max((u | 0) - this._minBufferSize, 0);}var s = u * t;var r = e.min(s * 4, n);if (s) {for (var p = 0; p < s; p += t) {this._doProcessBlock(x, p);}var o = x.splice(0, s);q.sigBytes -= r;}return new l.init(o, r);}, clone: function clone() {var n = j.clone.call(this);n._data = this._data.clone();return n;}, _minBufferSize: 0 });var f = b.Hasher = i.extend({ cfg: j.extend(), init: function init(n) {this.cfg = this.cfg.extend(n);this.reset();}, reset: function reset() {i.reset.call(this);this._doReset();}, update: function update(n) {this._append(n);this._process();return this;}, finalize: function finalize(n) {if (n) {this._append(n);}var o = this._doFinalize();return o;}, blockSize: 512 / 32, _createHelper: function _createHelper(n) {return function (p, o) {return new n.init(o).finalize(p);};}, _createHmacHelper: function _createHmacHelper(n) {return function (p, o) {return new k.HMAC.init(n, o).finalize(p);};} });var k = a.algo = {};return a;}(Math);
/*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                CryptoJS v3.1.2 x64-core-min.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                code.google.com/p/crypto-js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                (c) 2009-2013 by Jeff Mott. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                code.google.com/p/crypto-js/wiki/License
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
(function (g) {var a = CryptoJS,f = a.lib,e = f.Base,h = f.WordArray,a = a.x64 = {};a.Word = e.extend({ init: function init(b, c) {this.high = b;this.low = c;} });a.WordArray = e.extend({ init: function init(b, c) {b = this.words = b || [];this.sigBytes = c != g ? c : 8 * b.length;}, toX32: function toX32() {for (var b = this.words, c = b.length, a = [], d = 0; d < c; d++) {var e = b[d];a.push(e.high);a.push(e.low);}return h.create(a, this.sigBytes);}, clone: function clone() {for (var b = e.clone.call(this), c = b.words = this.words.slice(0), a = c.length, d = 0; d < a; d++) {c[d] = c[d].clone();}return b;} });})();

/*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 CryptoJS v3.1.2 cipher-core.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 code.google.com/p/crypto-js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 (c) 2009-2013 by Jeff Mott. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 code.google.com/p/crypto-js/wiki/License
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */
CryptoJS.lib.Cipher || function (u) {var g = CryptoJS,f = g.lib,k = f.Base,l = f.WordArray,q = f.BufferedBlockAlgorithm,r = g.enc.Base64,v = g.algo.EvpKDF,n = f.Cipher = q.extend({ cfg: k.extend(), createEncryptor: function createEncryptor(a, b) {return this.create(this._ENC_XFORM_MODE, a, b);}, createDecryptor: function createDecryptor(a, b) {return this.create(this._DEC_XFORM_MODE, a, b);}, init: function init(a, b, c) {this.cfg = this.cfg.extend(c);this._xformMode = a;this._key = b;this.reset();}, reset: function reset() {q.reset.call(this);this._doReset();}, process: function process(a) {this._append(a);
      return this._process();}, finalize: function finalize(a) {a && this._append(a);return this._doFinalize();}, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function _createHelper(a) {return { encrypt: function encrypt(b, c, d) {return ("string" == typeof c ? s : j).encrypt(a, b, c, d);}, decrypt: function decrypt(b, c, d) {return ("string" == typeof c ? s : j).decrypt(a, b, c, d);} };} });f.StreamCipher = n.extend({ _doFinalize: function _doFinalize() {return this._process(!0);}, blockSize: 1 });var m = g.mode = {},t = function t(a, b, c) {var d = this._iv;d ? this._iv = u : d = this._prevBlock;for (var e =
    0; e < c; e++) {a[b + e] ^= d[e];}},h = (f.BlockCipherMode = k.extend({ createEncryptor: function createEncryptor(a, b) {return this.Encryptor.create(a, b);}, createDecryptor: function createDecryptor(a, b) {return this.Decryptor.create(a, b);}, init: function init(a, b) {this._cipher = a;this._iv = b;} })).extend();h.Encryptor = h.extend({ processBlock: function processBlock(a, b) {var c = this._cipher,d = c.blockSize;t.call(this, a, b, d);c.encryptBlock(a, b);this._prevBlock = a.slice(b, b + d);} });h.Decryptor = h.extend({ processBlock: function processBlock(a, b) {var c = this._cipher,d = c.blockSize,e = a.slice(b, b + d);c.decryptBlock(a,
      b);t.call(this, a, b, d);this._prevBlock = e;} });m = m.CBC = h;h = (g.pad = {}).Pkcs7 = { pad: function pad(a, b) {for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, e = [], f = 0; f < c; f += 4) {e.push(d);}c = l.create(e, c);a.concat(c);}, unpad: function unpad(a) {a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255;} };f.BlockCipher = n.extend({ cfg: n.cfg.extend({ mode: m, padding: h }), reset: function reset() {n.reset.call(this);var a = this.cfg,b = a.iv,a = a.mode;if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor;else c = a.createDecryptor, this._minBufferSize = 1;
      this._mode = c.call(a, this, b && b.words);}, _doProcessBlock: function _doProcessBlock(a, b) {this._mode.processBlock(a, b);}, _doFinalize: function _doFinalize() {var a = this.cfg.padding;if (this._xformMode == this._ENC_XFORM_MODE) {a.pad(this._data, this.blockSize);var b = this._process(!0);} else b = this._process(!0), a.unpad(b);return b;}, blockSize: 4 });var p = f.CipherParams = k.extend({ init: function init(a) {this.mixIn(a);}, toString: function toString(a) {return (a || this.formatter).stringify(this);} }),m = (g.format = {}).OpenSSL = { stringify: function stringify(a) {var b = a.ciphertext;a = a.salt;
      return (a ? l.create([1398893684, 1701076831]).concat(a).concat(b) : b).toString(r);}, parse: function parse(a) {a = r.parse(a);var b = a.words;if (1398893684 == b[0] && 1701076831 == b[1]) {var c = l.create(b.slice(2, 4));b.splice(0, 4);a.sigBytes -= 16;}return p.create({ ciphertext: a, salt: c });} },j = f.SerializableCipher = k.extend({ cfg: k.extend({ format: m }), encrypt: function encrypt(a, b, c, d) {d = this.cfg.extend(d);var e = a.createEncryptor(c, d);b = e.finalize(b);e = e.cfg;return p.create({ ciphertext: b, key: c, iv: e.iv, algorithm: a, mode: e.mode, padding: e.padding,
        blockSize: a.blockSize, formatter: d.format });}, decrypt: function decrypt(a, b, c, d) {d = this.cfg.extend(d);b = this._parse(b, d.format);return a.createDecryptor(c, d).finalize(b.ciphertext);}, _parse: function _parse(a, b) {return "string" == typeof a ? b.parse(a, this) : a;} }),g = (g.kdf = {}).OpenSSL = { execute: function execute(a, b, c, d) {d || (d = l.random(8));a = v.create({ keySize: b + c }).compute(a, d);c = l.create(a.words.slice(b), 4 * c);a.sigBytes = 4 * b;return p.create({ key: a, iv: c, salt: d });} },s = f.PasswordBasedCipher = j.extend({ cfg: j.cfg.extend({ kdf: g }), encrypt: function encrypt(a,
    b, c, d) {d = this.cfg.extend(d);c = d.kdf.execute(c, a.keySize, a.ivSize);d.iv = c.iv;a = j.encrypt.call(this, a, b, c.key, d);a.mixIn(c);return a;}, decrypt: function decrypt(a, b, c, d) {d = this.cfg.extend(d);b = this._parse(b, d.format);c = d.kdf.execute(c, a.keySize, a.ivSize, b.salt);d.iv = c.iv;return j.decrypt.call(this, a, b, c.key, d);} });}();

/*
                                                                                                                                                                                                                                                                                                                                                                          CryptoJS v3.1.2 aes.js
                                                                                                                                                                                                                                                                                                                                                                          code.google.com/p/crypto-js
                                                                                                                                                                                                                                                                                                                                                                          (c) 2009-2013 by Jeff Mott. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                          code.google.com/p/crypto-js/wiki/License
                                                                                                                                                                                                                                                                                                                                                                          */
(function () {for (var q = CryptoJS, x = q.lib.BlockCipher, r = q.algo, j = [], y = [], z = [], A = [], B = [], C = [], s = [], u = [], v = [], w = [], g = [], k = 0; 256 > k; k++) {g[k] = 128 > k ? k << 1 : k << 1 ^ 283;}for (var n = 0, l = 0, k = 0; 256 > k; k++) {var f = l ^ l << 1 ^ l << 2 ^ l << 3 ^ l << 4,f = f >>> 8 ^ f & 255 ^ 99;j[n] = f;y[f] = n;var t = g[n],D = g[t],E = g[D],b = 257 * g[f] ^ 16843008 * f;z[n] = b << 24 | b >>> 8;A[n] = b << 16 | b >>> 16;B[n] = b << 8 | b >>> 24;C[n] = b;b = 16843009 * E ^ 65537 * D ^ 257 * t ^ 16843008 * n;s[f] = b << 24 | b >>> 8;u[f] = b << 16 | b >>> 16;v[f] = b << 8 | b >>> 24;w[f] = b;n ? (n = t ^ g[g[g[E ^ t]]], l ^= g[g[l]]) : n = l = 1;}var F = [0, 1, 2, 4, 8,
  16, 32, 64, 128, 27, 54],r = r.AES = x.extend({ _doReset: function _doReset() {for (var c = this._key, e = c.words, a = c.sigBytes / 4, c = 4 * ((this._nRounds = a + 6) + 1), b = this._keySchedule = [], h = 0; h < c; h++) {if (h < a) b[h] = e[h];else {var d = b[h - 1];h % a ? 6 < a && 4 == h % a && (d = j[d >>> 24] << 24 | j[d >>> 16 & 255] << 16 | j[d >>> 8 & 255] << 8 | j[d & 255]) : (d = d << 8 | d >>> 24, d = j[d >>> 24] << 24 | j[d >>> 16 & 255] << 16 | j[d >>> 8 & 255] << 8 | j[d & 255], d ^= F[h / a | 0] << 24);b[h] = b[h - a] ^ d;}}e = this._invKeySchedule = [];for (a = 0; a < c; a++) {h = c - a, d = a % 4 ? b[h] : b[h - 4], e[a] = 4 > a || 4 >= h ? d : s[j[d >>> 24]] ^ u[j[d >>> 16 & 255]] ^ v[j[d >>>
        8 & 255]] ^ w[j[d & 255]];}}, encryptBlock: function encryptBlock(c, e) {this._doCryptBlock(c, e, this._keySchedule, z, A, B, C, j);}, decryptBlock: function decryptBlock(c, e) {var a = c[e + 1];c[e + 1] = c[e + 3];c[e + 3] = a;this._doCryptBlock(c, e, this._invKeySchedule, s, u, v, w, y);a = c[e + 1];c[e + 1] = c[e + 3];c[e + 3] = a;}, _doCryptBlock: function _doCryptBlock(c, e, a, b, h, d, j, m) {for (var n = this._nRounds, f = c[e] ^ a[0], g = c[e + 1] ^ a[1], k = c[e + 2] ^ a[2], p = c[e + 3] ^ a[3], l = 4, t = 1; t < n; t++) {var q = b[f >>> 24] ^ h[g >>> 16 & 255] ^ d[k >>> 8 & 255] ^ j[p & 255] ^ a[l++],r = b[g >>> 24] ^ h[k >>> 16 & 255] ^ d[p >>> 8 & 255] ^ j[f & 255] ^ a[l++],s =
        b[k >>> 24] ^ h[p >>> 16 & 255] ^ d[f >>> 8 & 255] ^ j[g & 255] ^ a[l++],p = b[p >>> 24] ^ h[f >>> 16 & 255] ^ d[g >>> 8 & 255] ^ j[k & 255] ^ a[l++],f = q,g = r,k = s;}q = (m[f >>> 24] << 24 | m[g >>> 16 & 255] << 16 | m[k >>> 8 & 255] << 8 | m[p & 255]) ^ a[l++];r = (m[g >>> 24] << 24 | m[k >>> 16 & 255] << 16 | m[p >>> 8 & 255] << 8 | m[f & 255]) ^ a[l++];s = (m[k >>> 24] << 24 | m[p >>> 16 & 255] << 16 | m[f >>> 8 & 255] << 8 | m[g & 255]) ^ a[l++];p = (m[p >>> 24] << 24 | m[f >>> 16 & 255] << 16 | m[g >>> 8 & 255] << 8 | m[k & 255]) ^ a[l++];c[e] = q;c[e + 1] = r;c[e + 2] = s;c[e + 3] = p;}, keySize: 8 });q.AES = x._createHelper(r);})();

/*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   CryptoJS v3.1.2 tripledes-min.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   code.google.com/p/crypto-js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   (c) 2009-2013 by Jeff Mott. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   code.google.com/p/crypto-js/wiki/License
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */
(function () {function j(b, c) {var a = (this._lBlock >>> b ^ this._rBlock) & c;this._rBlock ^= a;this._lBlock ^= a << b;}function l(b, c) {var a = (this._rBlock >>> b ^ this._lBlock) & c;this._lBlock ^= a;this._rBlock ^= a << b;}var h = CryptoJS,e = h.lib,n = e.WordArray,e = e.BlockCipher,g = h.algo,q = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],p = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47,
  55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],r = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],s = [{ "0": 8421888, 268435456: 32768, 536870912: 8421378, 805306368: 2, 1073741824: 512, 1342177280: 8421890, 1610612736: 8389122, 1879048192: 8388608, 2147483648: 514, 2415919104: 8389120, 2684354560: 33280, 2952790016: 8421376, 3221225472: 32770, 3489660928: 8388610, 3758096384: 0, 4026531840: 33282, 134217728: 0, 402653184: 8421890, 671088640: 33282, 939524096: 32768, 1207959552: 8421888, 1476395008: 512, 1744830464: 8421378, 2013265920: 2,
    2281701376: 8389120, 2550136832: 33280, 2818572288: 8421376, 3087007744: 8389122, 3355443200: 8388610, 3623878656: 32770, 3892314112: 514, 4160749568: 8388608, 1: 32768, 268435457: 2, 536870913: 8421888, 805306369: 8388608, 1073741825: 8421378, 1342177281: 33280, 1610612737: 512, 1879048193: 8389122, 2147483649: 8421890, 2415919105: 8421376, 2684354561: 8388610, 2952790017: 33282, 3221225473: 514, 3489660929: 8389120, 3758096385: 32770, 4026531841: 0, 134217729: 8421890, 402653185: 8421376, 671088641: 8388608, 939524097: 512, 1207959553: 32768, 1476395009: 8388610,
    1744830465: 2, 2013265921: 33282, 2281701377: 32770, 2550136833: 8389122, 2818572289: 514, 3087007745: 8421888, 3355443201: 8389120, 3623878657: 0, 3892314113: 33280, 4160749569: 8421378 }, { "0": 1074282512, 16777216: 16384, 33554432: 524288, 50331648: 1074266128, 67108864: 1073741840, 83886080: 1074282496, 100663296: 1073758208, 117440512: 16, 134217728: 540672, 150994944: 1073758224, 167772160: 1073741824, 184549376: 540688, 201326592: 524304, 218103808: 0, 234881024: 16400, 251658240: 1074266112, 8388608: 1073758208, 25165824: 540688, 41943040: 16, 58720256: 1073758224,
    75497472: 1074282512, 92274688: 1073741824, 109051904: 524288, 125829120: 1074266128, 142606336: 524304, 159383552: 0, 176160768: 16384, 192937984: 1074266112, 209715200: 1073741840, 226492416: 540672, 243269632: 1074282496, 260046848: 16400, 268435456: 0, 285212672: 1074266128, 301989888: 1073758224, 318767104: 1074282496, 335544320: 1074266112, 352321536: 16, 369098752: 540688, 385875968: 16384, 402653184: 16400, 419430400: 524288, 436207616: 524304, 452984832: 1073741840, 469762048: 540672, 486539264: 1073758208, 503316480: 1073741824, 520093696: 1074282512,
    276824064: 540688, 293601280: 524288, 310378496: 1074266112, 327155712: 16384, 343932928: 1073758208, 360710144: 1074282512, 377487360: 16, 394264576: 1073741824, 411041792: 1074282496, 427819008: 1073741840, 444596224: 1073758224, 461373440: 524304, 478150656: 0, 494927872: 16400, 511705088: 1074266128, 528482304: 540672 }, { "0": 260, 1048576: 0, 2097152: 67109120, 3145728: 65796, 4194304: 65540, 5242880: 67108868, 6291456: 67174660, 7340032: 67174400, 8388608: 67108864, 9437184: 67174656, 10485760: 65792, 11534336: 67174404, 12582912: 67109124, 13631488: 65536,
    14680064: 4, 15728640: 256, 524288: 67174656, 1572864: 67174404, 2621440: 0, 3670016: 67109120, 4718592: 67108868, 5767168: 65536, 6815744: 65540, 7864320: 260, 8912896: 4, 9961472: 256, 11010048: 67174400, 12058624: 65796, 13107200: 65792, 14155776: 67109124, 15204352: 67174660, 16252928: 67108864, 16777216: 67174656, 17825792: 65540, 18874368: 65536, 19922944: 67109120, 20971520: 256, 22020096: 67174660, 23068672: 67108868, 24117248: 0, 25165824: 67109124, 26214400: 67108864, 27262976: 4, 28311552: 65792, 29360128: 67174400, 30408704: 260, 31457280: 65796, 32505856: 67174404,
    17301504: 67108864, 18350080: 260, 19398656: 67174656, 20447232: 0, 21495808: 65540, 22544384: 67109120, 23592960: 256, 24641536: 67174404, 25690112: 65536, 26738688: 67174660, 27787264: 65796, 28835840: 67108868, 29884416: 67109124, 30932992: 67174400, 31981568: 4, 33030144: 65792 }, { "0": 2151682048, 65536: 2147487808, 131072: 4198464, 196608: 2151677952, 262144: 0, 327680: 4198400, 393216: 2147483712, 458752: 4194368, 524288: 2147483648, 589824: 4194304, 655360: 64, 720896: 2147487744, 786432: 2151678016, 851968: 4160, 917504: 4096, 983040: 2151682112, 32768: 2147487808,
    98304: 64, 163840: 2151678016, 229376: 2147487744, 294912: 4198400, 360448: 2151682112, 425984: 0, 491520: 2151677952, 557056: 4096, 622592: 2151682048, 688128: 4194304, 753664: 4160, 819200: 2147483648, 884736: 4194368, 950272: 4198464, 1015808: 2147483712, 1048576: 4194368, 1114112: 4198400, 1179648: 2147483712, 1245184: 0, 1310720: 4160, 1376256: 2151678016, 1441792: 2151682048, 1507328: 2147487808, 1572864: 2151682112, 1638400: 2147483648, 1703936: 2151677952, 1769472: 4198464, 1835008: 2147487744, 1900544: 4194304, 1966080: 64, 2031616: 4096, 1081344: 2151677952,
    1146880: 2151682112, 1212416: 0, 1277952: 4198400, 1343488: 4194368, 1409024: 2147483648, 1474560: 2147487808, 1540096: 64, 1605632: 2147483712, 1671168: 4096, 1736704: 2147487744, 1802240: 2151678016, 1867776: 4160, 1933312: 2151682048, 1998848: 4194304, 2064384: 4198464 }, { "0": 128, 4096: 17039360, 8192: 262144, 12288: 536870912, 16384: 537133184, 20480: 16777344, 24576: 553648256, 28672: 262272, 32768: 16777216, 36864: 537133056, 40960: 536871040, 45056: 553910400, 49152: 553910272, 53248: 0, 57344: 17039488, 61440: 553648128, 2048: 17039488, 6144: 553648256,
    10240: 128, 14336: 17039360, 18432: 262144, 22528: 537133184, 26624: 553910272, 30720: 536870912, 34816: 537133056, 38912: 0, 43008: 553910400, 47104: 16777344, 51200: 536871040, 55296: 553648128, 59392: 16777216, 63488: 262272, 65536: 262144, 69632: 128, 73728: 536870912, 77824: 553648256, 81920: 16777344, 86016: 553910272, 90112: 537133184, 94208: 16777216, 98304: 553910400, 102400: 553648128, 106496: 17039360, 110592: 537133056, 114688: 262272, 118784: 536871040, 122880: 0, 126976: 17039488, 67584: 553648256, 71680: 16777216, 75776: 17039360, 79872: 537133184,
    83968: 536870912, 88064: 17039488, 92160: 128, 96256: 553910272, 100352: 262272, 104448: 553910400, 108544: 0, 112640: 553648128, 116736: 16777344, 120832: 262144, 124928: 537133056, 129024: 536871040 }, { "0": 268435464, 256: 8192, 512: 270532608, 768: 270540808, 1024: 268443648, 1280: 2097152, 1536: 2097160, 1792: 268435456, 2048: 0, 2304: 268443656, 2560: 2105344, 2816: 8, 3072: 270532616, 3328: 2105352, 3584: 8200, 3840: 270540800, 128: 270532608, 384: 270540808, 640: 8, 896: 2097152, 1152: 2105352, 1408: 268435464, 1664: 268443648, 1920: 8200, 2176: 2097160, 2432: 8192,
    2688: 268443656, 2944: 270532616, 3200: 0, 3456: 270540800, 3712: 2105344, 3968: 268435456, 4096: 268443648, 4352: 270532616, 4608: 270540808, 4864: 8200, 5120: 2097152, 5376: 268435456, 5632: 268435464, 5888: 2105344, 6144: 2105352, 6400: 0, 6656: 8, 6912: 270532608, 7168: 8192, 7424: 268443656, 7680: 270540800, 7936: 2097160, 4224: 8, 4480: 2105344, 4736: 2097152, 4992: 268435464, 5248: 268443648, 5504: 8200, 5760: 270540808, 6016: 270532608, 6272: 270540800, 6528: 270532616, 6784: 8192, 7040: 2105352, 7296: 2097160, 7552: 0, 7808: 268435456, 8064: 268443656 }, { "0": 1048576,
    16: 33555457, 32: 1024, 48: 1049601, 64: 34604033, 80: 0, 96: 1, 112: 34603009, 128: 33555456, 144: 1048577, 160: 33554433, 176: 34604032, 192: 34603008, 208: 1025, 224: 1049600, 240: 33554432, 8: 34603009, 24: 0, 40: 33555457, 56: 34604032, 72: 1048576, 88: 33554433, 104: 33554432, 120: 1025, 136: 1049601, 152: 33555456, 168: 34603008, 184: 1048577, 200: 1024, 216: 34604033, 232: 1, 248: 1049600, 256: 33554432, 272: 1048576, 288: 33555457, 304: 34603009, 320: 1048577, 336: 33555456, 352: 34604032, 368: 1049601, 384: 1025, 400: 34604033, 416: 1049600, 432: 1, 448: 0, 464: 34603008, 480: 33554433,
    496: 1024, 264: 1049600, 280: 33555457, 296: 34603009, 312: 1, 328: 33554432, 344: 1048576, 360: 1025, 376: 34604032, 392: 33554433, 408: 34603008, 424: 0, 440: 34604033, 456: 1049601, 472: 1024, 488: 33555456, 504: 1048577 }, { "0": 134219808, 1: 131072, 2: 134217728, 3: 32, 4: 131104, 5: 134350880, 6: 134350848, 7: 2048, 8: 134348800, 9: 134219776, 10: 133120, 11: 134348832, 12: 2080, 13: 0, 14: 134217760, 15: 133152, 2147483648: 2048, 2147483649: 134350880, 2147483650: 134219808, 2147483651: 134217728, 2147483652: 134348800, 2147483653: 133120, 2147483654: 133152, 2147483655: 32,
    2147483656: 134217760, 2147483657: 2080, 2147483658: 131104, 2147483659: 134350848, 2147483660: 0, 2147483661: 134348832, 2147483662: 134219776, 2147483663: 131072, 16: 133152, 17: 134350848, 18: 32, 19: 2048, 20: 134219776, 21: 134217760, 22: 134348832, 23: 131072, 24: 0, 25: 131104, 26: 134348800, 27: 134219808, 28: 134350880, 29: 133120, 30: 2080, 31: 134217728, 2147483664: 131072, 2147483665: 2048, 2147483666: 134348832, 2147483667: 133152, 2147483668: 32, 2147483669: 134348800, 2147483670: 134217728, 2147483671: 134219808, 2147483672: 134350880, 2147483673: 134217760,
    2147483674: 134219776, 2147483675: 0, 2147483676: 133120, 2147483677: 2080, 2147483678: 131104, 2147483679: 134350848 }],t = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],m = g.DES = e.extend({ _doReset: function _doReset() {for (var b = this._key.words, c = [], a = 0; 56 > a; a++) {var f = q[a] - 1;c[a] = b[f >>> 5] >>> 31 - f % 32 & 1;}b = this._subKeys = [];for (f = 0; 16 > f; f++) {for (var d = b[f] = [], e = r[f], a = 0; 24 > a; a++) {d[a / 6 | 0] |= c[(p[a] - 1 + e) % 28] << 31 - a % 6, d[4 + (a / 6 | 0)] |= c[28 + (p[a + 24] - 1 + e) % 28] << 31 - a % 6;}d[0] = d[0] << 1 | d[0] >>> 31;for (a = 1; 7 > a; a++) {d[a] >>>=
          4 * (a - 1) + 3;}d[7] = d[7] << 5 | d[7] >>> 27;}c = this._invSubKeys = [];for (a = 0; 16 > a; a++) {c[a] = b[15 - a];}}, encryptBlock: function encryptBlock(b, c) {this._doCryptBlock(b, c, this._subKeys);}, decryptBlock: function decryptBlock(b, c) {this._doCryptBlock(b, c, this._invSubKeys);}, _doCryptBlock: function _doCryptBlock(b, c, a) {this._lBlock = b[c];this._rBlock = b[c + 1];j.call(this, 4, 252645135);j.call(this, 16, 65535);l.call(this, 2, 858993459);l.call(this, 8, 16711935);j.call(this, 1, 1431655765);for (var f = 0; 16 > f; f++) {for (var d = a[f], e = this._lBlock, h = this._rBlock, g = 0, k = 0; 8 > k; k++) {g |= s[k][((h ^
          d[k]) & t[k]) >>> 0];}this._lBlock = h;this._rBlock = e ^ g;}a = this._lBlock;this._lBlock = this._rBlock;this._rBlock = a;j.call(this, 1, 1431655765);l.call(this, 8, 16711935);l.call(this, 2, 858993459);j.call(this, 16, 65535);j.call(this, 4, 252645135);b[c] = this._lBlock;b[c + 1] = this._rBlock;}, keySize: 2, ivSize: 2, blockSize: 2 });h.DES = e._createHelper(m);g = g.TripleDES = e.extend({ _doReset: function _doReset() {var b = this._key.words;this._des1 = m.createEncryptor(n.create(b.slice(0, 2)));this._des2 = m.createEncryptor(n.create(b.slice(2, 4)));this._des3 =
      m.createEncryptor(n.create(b.slice(4, 6)));}, encryptBlock: function encryptBlock(b, c) {this._des1.encryptBlock(b, c);this._des2.decryptBlock(b, c);this._des3.encryptBlock(b, c);}, decryptBlock: function decryptBlock(b, c) {this._des3.decryptBlock(b, c);this._des2.encryptBlock(b, c);this._des1.decryptBlock(b, c);}, keySize: 6, ivSize: 2, blockSize: 2 });h.TripleDES = e._createHelper(g);})();

/*
                                                                                                                                                                                                                                                                                                                                                                                                                  CryptoJS v3.1.2 enc-base64.js
                                                                                                                                                                                                                                                                                                                                                                                                                  code.google.com/p/crypto-js
                                                                                                                                                                                                                                                                                                                                                                                                                  (c) 2009-2013 by Jeff Mott. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                  code.google.com/p/crypto-js/wiki/License
                                                                                                                                                                                                                                                                                                                                                                                                                  */
(function () {var h = CryptoJS,j = h.lib.WordArray;h.enc.Base64 = { stringify: function stringify(b) {var e = b.words,f = b.sigBytes,c = this._map;b.clamp();b = [];for (var a = 0; a < f; a += 3) {for (var d = (e[a >>> 2] >>> 24 - 8 * (a % 4) & 255) << 16 | (e[a + 1 >>> 2] >>> 24 - 8 * ((a + 1) % 4) & 255) << 8 | e[a + 2 >>> 2] >>> 24 - 8 * ((a + 2) % 4) & 255, g = 0; 4 > g && a + 0.75 * g < f; g++) {b.push(c.charAt(d >>> 6 * (3 - g) & 63));}}if (e = c.charAt(64)) for (; b.length % 4;) {b.push(e);}return b.join("");}, parse: function parse(b) {var e = b.length,f = this._map,c = f.charAt(64);c && (c = b.indexOf(c), -1 != c && (e = c));for (var c = [], a = 0, d = 0; d <
      e; d++) {if (d % 4) {var g = f.indexOf(b.charAt(d - 1)) << 2 * (d % 4),h = f.indexOf(b.charAt(d)) >>> 6 - 2 * (d % 4);c[a >>> 2] |= (g | h) << 24 - 8 * (a % 4);a++;}}return j.create(c, a);}, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };})();

/*
                                                                                                                                                                                                                                                                                       CryptoJS v3.1.2 md5.js
                                                                                                                                                                                                                                                                                       code.google.com/p/crypto-js
                                                                                                                                                                                                                                                                                       (c) 2009-2013 by Jeff Mott. All rights reserved.
                                                                                                                                                                                                                                                                                       code.google.com/p/crypto-js/wiki/License
                                                                                                                                                                                                                                                                                       */
(function (E) {function h(a, f, g, j, p, h, k) {a = a + (f & g | ~f & j) + p + k;return (a << h | a >>> 32 - h) + f;}function k(a, f, g, j, p, h, k) {a = a + (f & j | g & ~j) + p + k;return (a << h | a >>> 32 - h) + f;}function l(a, f, g, j, h, k, l) {a = a + (f ^ g ^ j) + h + l;return (a << k | a >>> 32 - k) + f;}function n(a, f, g, j, h, k, l) {a = a + (g ^ (f | ~j)) + h + l;return (a << k | a >>> 32 - k) + f;}for (var r = CryptoJS, q = r.lib, F = q.WordArray, s = q.Hasher, q = r.algo, a = [], t = 0; 64 > t; t++) {a[t] = 4294967296 * E.abs(E.sin(t + 1)) | 0;}q = q.MD5 = s.extend({ _doReset: function _doReset() {this._hash = new F.init([1732584193, 4023233417, 2562383102, 271733878]);},
    _doProcessBlock: function _doProcessBlock(m, f) {for (var g = 0; 16 > g; g++) {var j = f + g,p = m[j];m[j] = (p << 8 | p >>> 24) & 16711935 | (p << 24 | p >>> 8) & 4278255360;}var g = this._hash.words,j = m[f + 0],p = m[f + 1],q = m[f + 2],r = m[f + 3],s = m[f + 4],t = m[f + 5],u = m[f + 6],v = m[f + 7],w = m[f + 8],x = m[f + 9],y = m[f + 10],z = m[f + 11],A = m[f + 12],B = m[f + 13],C = m[f + 14],D = m[f + 15],b = g[0],c = g[1],d = g[2],e = g[3],b = h(b, c, d, e, j, 7, a[0]),e = h(e, b, c, d, p, 12, a[1]),d = h(d, e, b, c, q, 17, a[2]),c = h(c, d, e, b, r, 22, a[3]),b = h(b, c, d, e, s, 7, a[4]),e = h(e, b, c, d, t, 12, a[5]),d = h(d, e, b, c, u, 17, a[6]),c = h(c, d, e, b, v, 22, a[7]),
      b = h(b, c, d, e, w, 7, a[8]),e = h(e, b, c, d, x, 12, a[9]),d = h(d, e, b, c, y, 17, a[10]),c = h(c, d, e, b, z, 22, a[11]),b = h(b, c, d, e, A, 7, a[12]),e = h(e, b, c, d, B, 12, a[13]),d = h(d, e, b, c, C, 17, a[14]),c = h(c, d, e, b, D, 22, a[15]),b = k(b, c, d, e, p, 5, a[16]),e = k(e, b, c, d, u, 9, a[17]),d = k(d, e, b, c, z, 14, a[18]),c = k(c, d, e, b, j, 20, a[19]),b = k(b, c, d, e, t, 5, a[20]),e = k(e, b, c, d, y, 9, a[21]),d = k(d, e, b, c, D, 14, a[22]),c = k(c, d, e, b, s, 20, a[23]),b = k(b, c, d, e, x, 5, a[24]),e = k(e, b, c, d, C, 9, a[25]),d = k(d, e, b, c, r, 14, a[26]),c = k(c, d, e, b, w, 20, a[27]),b = k(b, c, d, e, B, 5, a[28]),e = k(e, b,
      c, d, q, 9, a[29]),d = k(d, e, b, c, v, 14, a[30]),c = k(c, d, e, b, A, 20, a[31]),b = l(b, c, d, e, t, 4, a[32]),e = l(e, b, c, d, w, 11, a[33]),d = l(d, e, b, c, z, 16, a[34]),c = l(c, d, e, b, C, 23, a[35]),b = l(b, c, d, e, p, 4, a[36]),e = l(e, b, c, d, s, 11, a[37]),d = l(d, e, b, c, v, 16, a[38]),c = l(c, d, e, b, y, 23, a[39]),b = l(b, c, d, e, B, 4, a[40]),e = l(e, b, c, d, j, 11, a[41]),d = l(d, e, b, c, r, 16, a[42]),c = l(c, d, e, b, u, 23, a[43]),b = l(b, c, d, e, x, 4, a[44]),e = l(e, b, c, d, A, 11, a[45]),d = l(d, e, b, c, D, 16, a[46]),c = l(c, d, e, b, q, 23, a[47]),b = n(b, c, d, e, j, 6, a[48]),e = n(e, b, c, d, v, 10, a[49]),d = n(d, e, b, c,
      C, 15, a[50]),c = n(c, d, e, b, t, 21, a[51]),b = n(b, c, d, e, A, 6, a[52]),e = n(e, b, c, d, r, 10, a[53]),d = n(d, e, b, c, y, 15, a[54]),c = n(c, d, e, b, p, 21, a[55]),b = n(b, c, d, e, w, 6, a[56]),e = n(e, b, c, d, D, 10, a[57]),d = n(d, e, b, c, u, 15, a[58]),c = n(c, d, e, b, B, 21, a[59]),b = n(b, c, d, e, s, 6, a[60]),e = n(e, b, c, d, z, 10, a[61]),d = n(d, e, b, c, q, 15, a[62]),c = n(c, d, e, b, x, 21, a[63]);g[0] = g[0] + b | 0;g[1] = g[1] + c | 0;g[2] = g[2] + d | 0;g[3] = g[3] + e | 0;}, _doFinalize: function _doFinalize() {var a = this._data,f = a.words,g = 8 * this._nDataBytes,j = 8 * a.sigBytes;f[j >>> 5] |= 128 << 24 - j % 32;var h = E.floor(g /
      4294967296);f[(j + 64 >>> 9 << 4) + 15] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360;f[(j + 64 >>> 9 << 4) + 14] = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360;a.sigBytes = 4 * (f.length + 1);this._process();a = this._hash;f = a.words;for (g = 0; 4 > g; g++) {j = f[g], f[g] = (j << 8 | j >>> 24) & 16711935 | (j << 24 | j >>> 8) & 4278255360;}return a;}, clone: function clone() {var a = s.clone.call(this);a._hash = this._hash.clone();return a;} });r.MD5 = s._createHelper(q);r.HmacMD5 = s._createHmacHelper(q);})(Math);

/*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             CryptoJS v3.1.2 sha1-min.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             code.google.com/p/crypto-js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             (c) 2009-2013 by Jeff Mott. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             code.google.com/p/crypto-js/wiki/License
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             */
(function () {var k = CryptoJS,b = k.lib,m = b.WordArray,l = b.Hasher,d = [],b = k.algo.SHA1 = l.extend({ _doReset: function _doReset() {this._hash = new m.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);}, _doProcessBlock: function _doProcessBlock(n, p) {for (var a = this._hash.words, e = a[0], f = a[1], h = a[2], j = a[3], b = a[4], c = 0; 80 > c; c++) {if (16 > c) d[c] = n[p + c] | 0;else {var g = d[c - 3] ^ d[c - 8] ^ d[c - 14] ^ d[c - 16];d[c] = g << 1 | g >>> 31;}g = (e << 5 | e >>> 27) + b + d[c];g = 20 > c ? g + ((f & h | ~f & j) + 1518500249) : 40 > c ? g + ((f ^ h ^ j) + 1859775393) : 60 > c ? g + ((f & h | f & j | h & j) - 1894007588) : g + ((f ^ h ^
        j) - 899497514);b = j;j = h;h = f << 30 | f >>> 2;f = e;e = g;}a[0] = a[0] + e | 0;a[1] = a[1] + f | 0;a[2] = a[2] + h | 0;a[3] = a[3] + j | 0;a[4] = a[4] + b | 0;}, _doFinalize: function _doFinalize() {var b = this._data,d = b.words,a = 8 * this._nDataBytes,e = 8 * b.sigBytes;d[e >>> 5] |= 128 << 24 - e % 32;d[(e + 64 >>> 9 << 4) + 14] = Math.floor(a / 4294967296);d[(e + 64 >>> 9 << 4) + 15] = a;b.sigBytes = 4 * d.length;this._process();return this._hash;}, clone: function clone() {var b = l.clone.call(this);b._hash = this._hash.clone();return b;} });k.SHA1 = l._createHelper(b);k.HmacSHA1 = l._createHmacHelper(b);})();

/*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            CryptoJS v3.1.2 sha256-min.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            code.google.com/p/crypto-js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            (c) 2009-2013 by Jeff Mott. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            code.google.com/p/crypto-js/wiki/License
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */
(function (k) {for (var g = CryptoJS, h = g.lib, v = h.WordArray, j = h.Hasher, h = g.algo, s = [], t = [], u = function u(q) {return 4294967296 * (q - (q | 0)) | 0;}, l = 2, b = 0; 64 > b;) {var d;a: {d = l;for (var w = k.sqrt(d), r = 2; r <= w; r++) {if (!(d % r)) {d = !1;break a;}}d = !0;}d && (8 > b && (s[b] = u(k.pow(l, 0.5))), t[b] = u(k.pow(l, 1 / 3)), b++);l++;}var n = [],h = h.SHA256 = j.extend({ _doReset: function _doReset() {this._hash = new v.init(s.slice(0));}, _doProcessBlock: function _doProcessBlock(q, h) {for (var a = this._hash.words, c = a[0], d = a[1], b = a[2], k = a[3], f = a[4], g = a[5], j = a[6], l = a[7], e = 0; 64 > e; e++) {if (16 > e) n[e] =
        q[h + e] | 0;else {var m = n[e - 15],p = n[e - 2];n[e] = ((m << 25 | m >>> 7) ^ (m << 14 | m >>> 18) ^ m >>> 3) + n[e - 7] + ((p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10) + n[e - 16];}m = l + ((f << 26 | f >>> 6) ^ (f << 21 | f >>> 11) ^ (f << 7 | f >>> 25)) + (f & g ^ ~f & j) + t[e] + n[e];p = ((c << 30 | c >>> 2) ^ (c << 19 | c >>> 13) ^ (c << 10 | c >>> 22)) + (c & d ^ c & b ^ d & b);l = j;j = g;g = f;f = k + m | 0;k = b;b = d;d = c;c = m + p | 0;}a[0] = a[0] + c | 0;a[1] = a[1] + d | 0;a[2] = a[2] + b | 0;a[3] = a[3] + k | 0;a[4] = a[4] + f | 0;a[5] = a[5] + g | 0;a[6] = a[6] + j | 0;a[7] = a[7] + l | 0;}, _doFinalize: function _doFinalize() {var d = this._data,b = d.words,a = 8 * this._nDataBytes,c = 8 * d.sigBytes;
      b[c >>> 5] |= 128 << 24 - c % 32;b[(c + 64 >>> 9 << 4) + 14] = k.floor(a / 4294967296);b[(c + 64 >>> 9 << 4) + 15] = a;d.sigBytes = 4 * b.length;this._process();return this._hash;}, clone: function clone() {var b = j.clone.call(this);b._hash = this._hash.clone();return b;} });g.SHA256 = j._createHelper(h);g.HmacSHA256 = j._createHmacHelper(h);})(Math);

/*
                                                                                                                                                                                                                                                                                                                                                                         CryptoJS v3.1.2 sha224-min.js
                                                                                                                                                                                                                                                                                                                                                                         code.google.com/p/crypto-js
                                                                                                                                                                                                                                                                                                                                                                         (c) 2009-2013 by Jeff Mott. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                         code.google.com/p/crypto-js/wiki/License
                                                                                                                                                                                                                                                                                                                                                                         */
(function () {var b = CryptoJS,d = b.lib.WordArray,a = b.algo,c = a.SHA256,a = a.SHA224 = c.extend({ _doReset: function _doReset() {this._hash = new d.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);}, _doFinalize: function _doFinalize() {var a = c._doFinalize.call(this);a.sigBytes -= 4;return a;} });b.SHA224 = c._createHelper(a);b.HmacSHA224 = c._createHmacHelper(a);})();

/*
                                                                                                                                                                                                                                                                                                                                                                                                                                             CryptoJS v3.1.2 sha512-min.js
                                                                                                                                                                                                                                                                                                                                                                                                                                             code.google.com/p/crypto-js
                                                                                                                                                                                                                                                                                                                                                                                                                                             (c) 2009-2013 by Jeff Mott. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                             code.google.com/p/crypto-js/wiki/License
                                                                                                                                                                                                                                                                                                                                                                                                                                             */
(function () {function a() {return d.create.apply(d, arguments);}for (var n = CryptoJS, r = n.lib.Hasher, e = n.x64, d = e.Word, T = e.WordArray, e = n.algo, ea = [a(1116352408, 3609767458), a(1899447441, 602891725), a(3049323471, 3964484399), a(3921009573, 2173295548), a(961987163, 4081628472), a(1508970993, 3053834265), a(2453635748, 2937671579), a(2870763221, 3664609560), a(3624381080, 2734883394), a(310598401, 1164996542), a(607225278, 1323610764), a(1426881987, 3590304994), a(1925078388, 4068182383), a(2162078206, 991336113), a(2614888103, 633803317),
  a(3248222580, 3479774868), a(3835390401, 2666613458), a(4022224774, 944711139), a(264347078, 2341262773), a(604807628, 2007800933), a(770255983, 1495990901), a(1249150122, 1856431235), a(1555081692, 3175218132), a(1996064986, 2198950837), a(2554220882, 3999719339), a(2821834349, 766784016), a(2952996808, 2566594879), a(3210313671, 3203337956), a(3336571891, 1034457026), a(3584528711, 2466948901), a(113926993, 3758326383), a(338241895, 168717936), a(666307205, 1188179964), a(773529912, 1546045734), a(1294757372, 1522805485), a(1396182291,
  2643833823), a(1695183700, 2343527390), a(1986661051, 1014477480), a(2177026350, 1206759142), a(2456956037, 344077627), a(2730485921, 1290863460), a(2820302411, 3158454273), a(3259730800, 3505952657), a(3345764771, 106217008), a(3516065817, 3606008344), a(3600352804, 1432725776), a(4094571909, 1467031594), a(275423344, 851169720), a(430227734, 3100823752), a(506948616, 1363258195), a(659060556, 3750685593), a(883997877, 3785050280), a(958139571, 3318307427), a(1322822218, 3812723403), a(1537002063, 2003034995), a(1747873779, 3602036899),
  a(1955562222, 1575990012), a(2024104815, 1125592928), a(2227730452, 2716904306), a(2361852424, 442776044), a(2428436474, 593698344), a(2756734187, 3733110249), a(3204031479, 2999351573), a(3329325298, 3815920427), a(3391569614, 3928383900), a(3515267271, 566280711), a(3940187606, 3454069534), a(4118630271, 4000239992), a(116418474, 1914138554), a(174292421, 2731055270), a(289380356, 3203993006), a(460393269, 320620315), a(685471733, 587496836), a(852142971, 1086792851), a(1017036298, 365543100), a(1126000580, 2618297676), a(1288033470,
  3409855158), a(1501505948, 4234509866), a(1607167915, 987167468), a(1816402316, 1246189591)], v = [], w = 0; 80 > w; w++) {v[w] = a();}e = e.SHA512 = r.extend({ _doReset: function _doReset() {this._hash = new T.init([new d.init(1779033703, 4089235720), new d.init(3144134277, 2227873595), new d.init(1013904242, 4271175723), new d.init(2773480762, 1595750129), new d.init(1359893119, 2917565137), new d.init(2600822924, 725511199), new d.init(528734635, 4215389547), new d.init(1541459225, 327033209)]);}, _doProcessBlock: function _doProcessBlock(a, d) {for (var f = this._hash.words,
      F = f[0], e = f[1], n = f[2], r = f[3], G = f[4], H = f[5], I = f[6], f = f[7], w = F.high, J = F.low, X = e.high, K = e.low, Y = n.high, L = n.low, Z = r.high, M = r.low, $ = G.high, N = G.low, aa = H.high, O = H.low, ba = I.high, P = I.low, ca = f.high, Q = f.low, k = w, g = J, z = X, x = K, A = Y, y = L, U = Z, B = M, l = $, h = N, R = aa, C = O, S = ba, D = P, V = ca, E = Q, m = 0; 80 > m; m++) {var s = v[m];if (16 > m) var j = s.high = a[d + 2 * m] | 0,b = s.low = a[d + 2 * m + 1] | 0;else {var j = v[m - 15],b = j.high,p = j.low,j = (b >>> 1 | p << 31) ^ (b >>> 8 | p << 24) ^ b >>> 7,p = (p >>> 1 | b << 31) ^ (p >>> 8 | b << 24) ^ (p >>> 7 | b << 25),u = v[m - 2],b = u.high,c = u.low,u = (b >>> 19 | c << 13) ^ (b <<
          3 | c >>> 29) ^ b >>> 6,c = (c >>> 19 | b << 13) ^ (c << 3 | b >>> 29) ^ (c >>> 6 | b << 26),b = v[m - 7],W = b.high,t = v[m - 16],q = t.high,t = t.low,b = p + b.low,j = j + W + (b >>> 0 < p >>> 0 ? 1 : 0),b = b + c,j = j + u + (b >>> 0 < c >>> 0 ? 1 : 0),b = b + t,j = j + q + (b >>> 0 < t >>> 0 ? 1 : 0);s.high = j;s.low = b;}var W = l & R ^ ~l & S,t = h & C ^ ~h & D,s = k & z ^ k & A ^ z & A,T = g & x ^ g & y ^ x & y,p = (k >>> 28 | g << 4) ^ (k << 30 | g >>> 2) ^ (k << 25 | g >>> 7),u = (g >>> 28 | k << 4) ^ (g << 30 | k >>> 2) ^ (g << 25 | k >>> 7),c = ea[m],fa = c.high,da = c.low,c = E + ((h >>> 14 | l << 18) ^ (h >>> 18 | l << 14) ^ (h << 23 | l >>> 9)),q = V + ((l >>> 14 | h << 18) ^ (l >>> 18 | h << 14) ^ (l << 23 | h >>> 9)) + (c >>> 0 < E >>> 0 ? 1 :
        0),c = c + t,q = q + W + (c >>> 0 < t >>> 0 ? 1 : 0),c = c + da,q = q + fa + (c >>> 0 < da >>> 0 ? 1 : 0),c = c + b,q = q + j + (c >>> 0 < b >>> 0 ? 1 : 0),b = u + T,s = p + s + (b >>> 0 < u >>> 0 ? 1 : 0),V = S,E = D,S = R,D = C,R = l,C = h,h = B + c | 0,l = U + q + (h >>> 0 < B >>> 0 ? 1 : 0) | 0,U = A,B = y,A = z,y = x,z = k,x = g,g = c + b | 0,k = q + s + (g >>> 0 < c >>> 0 ? 1 : 0) | 0;}J = F.low = J + g;F.high = w + k + (J >>> 0 < g >>> 0 ? 1 : 0);K = e.low = K + x;e.high = X + z + (K >>> 0 < x >>> 0 ? 1 : 0);L = n.low = L + y;n.high = Y + A + (L >>> 0 < y >>> 0 ? 1 : 0);M = r.low = M + B;r.high = Z + U + (M >>> 0 < B >>> 0 ? 1 : 0);N = G.low = N + h;G.high = $ + l + (N >>> 0 < h >>> 0 ? 1 : 0);O = H.low = O + C;H.high = aa + R + (O >>> 0 < C >>> 0 ? 1 : 0);P = I.low = P + D;
      I.high = ba + S + (P >>> 0 < D >>> 0 ? 1 : 0);Q = f.low = Q + E;f.high = ca + V + (Q >>> 0 < E >>> 0 ? 1 : 0);}, _doFinalize: function _doFinalize() {var a = this._data,d = a.words,f = 8 * this._nDataBytes,e = 8 * a.sigBytes;d[e >>> 5] |= 128 << 24 - e % 32;d[(e + 128 >>> 10 << 5) + 30] = Math.floor(f / 4294967296);d[(e + 128 >>> 10 << 5) + 31] = f;a.sigBytes = 4 * d.length;this._process();return this._hash.toX32();}, clone: function clone() {var a = r.clone.call(this);a._hash = this._hash.clone();return a;}, blockSize: 32 });n.SHA512 = r._createHelper(e);n.HmacSHA512 = r._createHmacHelper(e);})();

/*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    CryptoJS v3.1.2 sha384-min.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    code.google.com/p/crypto-js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    (c) 2009-2013 by Jeff Mott. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    code.google.com/p/crypto-js/wiki/License
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    */
(function () {var c = CryptoJS,a = c.x64,b = a.Word,e = a.WordArray,a = c.algo,d = a.SHA512,a = a.SHA384 = d.extend({ _doReset: function _doReset() {this._hash = new e.init([new b.init(3418070365, 3238371032), new b.init(1654270250, 914150663), new b.init(2438529370, 812702999), new b.init(355462360, 4144912697), new b.init(1731405415, 4290775857), new b.init(2394180231, 1750603025), new b.init(3675008525, 1694076839), new b.init(1203062813, 3204075428)]);}, _doFinalize: function _doFinalize() {var a = d._doFinalize.call(this);a.sigBytes -= 16;return a;} });c.SHA384 =
  d._createHelper(a);c.HmacSHA384 = d._createHmacHelper(a);})();

/*
                                                                 CryptoJS v3.1.2 ripemd160-min.js
                                                                 code.google.com/p/crypto-js
                                                                 (c) 2009-2013 by Jeff Mott. All rights reserved.
                                                                 code.google.com/p/crypto-js/wiki/License
                                                                 */
/*
                                                                    
                                                                    (c) 2012 by Cedric Mesnil. All rights reserved.
                                                                    
                                                                    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                    
                                                                        - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                        - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                    
                                                                    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                    */
(function () {var q = CryptoJS,d = q.lib,n = d.WordArray,p = d.Hasher,d = q.algo,x = n.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]),y = n.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]),z = n.create([11, 14, 15, 12,
  5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]),A = n.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]),B = n.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),C = n.create([1352829926, 1548603684, 1836072691,
  2053994217, 0]),d = d.RIPEMD160 = p.extend({ _doReset: function _doReset() {this._hash = n.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);}, _doProcessBlock: function _doProcessBlock(e, v) {for (var b = 0; 16 > b; b++) {var c = v + b,f = e[c];e[c] = (f << 8 | f >>> 24) & 16711935 | (f << 24 | f >>> 8) & 4278255360;}var c = this._hash.words,f = B.words,d = C.words,n = x.words,q = y.words,p = z.words,w = A.words,t,g,h,j,r,u,k,l,m,s;u = t = c[0];k = g = c[1];l = h = c[2];m = j = c[3];s = r = c[4];for (var a, b = 0; 80 > b; b += 1) {a = t + e[v + n[b]] | 0, a = 16 > b ? a + ((g ^ h ^ j) + f[0]) : 32 > b ? a + ((g & h | ~g & j) + f[1]) : 48 > b ?
        a + (((g | ~h) ^ j) + f[2]) : 64 > b ? a + ((g & j | h & ~j) + f[3]) : a + ((g ^ (h | ~j)) + f[4]), a |= 0, a = a << p[b] | a >>> 32 - p[b], a = a + r | 0, t = r, r = j, j = h << 10 | h >>> 22, h = g, g = a, a = u + e[v + q[b]] | 0, a = 16 > b ? a + ((k ^ (l | ~m)) + d[0]) : 32 > b ? a + ((k & m | l & ~m) + d[1]) : 48 > b ? a + (((k | ~l) ^ m) + d[2]) : 64 > b ? a + ((k & l | ~k & m) + d[3]) : a + ((k ^ l ^ m) + d[4]), a |= 0, a = a << w[b] | a >>> 32 - w[b], a = a + s | 0, u = s, s = m, m = l << 10 | l >>> 22, l = k, k = a;}a = c[1] + h + m | 0;c[1] = c[2] + j + s | 0;c[2] = c[3] + r + u | 0;c[3] = c[4] + t + k | 0;c[4] = c[0] + g + l | 0;c[0] = a;}, _doFinalize: function _doFinalize() {var e = this._data,d = e.words,b = 8 * this._nDataBytes,c = 8 * e.sigBytes;
      d[c >>> 5] |= 128 << 24 - c % 32;d[(c + 64 >>> 9 << 4) + 14] = (b << 8 | b >>> 24) & 16711935 | (b << 24 | b >>> 8) & 4278255360;e.sigBytes = 4 * (d.length + 1);this._process();e = this._hash;d = e.words;for (b = 0; 5 > b; b++) {c = d[b], d[b] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360;}return e;}, clone: function clone() {var d = p.clone.call(this);d._hash = this._hash.clone();return d;} });q.RIPEMD160 = p._createHelper(d);q.HmacRIPEMD160 = p._createHmacHelper(d);})(Math);

/*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              CryptoJS v3.1.2 hmac.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              code.google.com/p/crypto-js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              (c) 2009-2013 by Jeff Mott. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              code.google.com/p/crypto-js/wiki/License
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              */
(function () {var c = CryptoJS,k = c.enc.Utf8;c.algo.HMAC = c.lib.Base.extend({ init: function init(a, b) {a = this._hasher = new a.init();"string" == typeof b && (b = k.parse(b));var c = a.blockSize,e = 4 * c;b.sigBytes > e && (b = a.finalize(b));b.clamp();for (var f = this._oKey = b.clone(), g = this._iKey = b.clone(), h = f.words, j = g.words, d = 0; d < c; d++) {h[d] ^= 1549556828, j[d] ^= 909522486;}f.sigBytes = g.sigBytes = e;this.reset();}, reset: function reset() {var a = this._hasher;a.reset();a.update(this._iKey);}, update: function update(a) {this._hasher.update(a);return this;}, finalize: function finalize(a) {var b =
      this._hasher;a = b.finalize(a);b.reset();return b.finalize(this._oKey.clone().concat(a));} });})();

/*
                                                                                                          CryptoJS v3.1.2 pbkdf2-min.js
                                                                                                          code.google.com/p/crypto-js
                                                                                                          (c) 2009-2013 by Jeff Mott. All rights reserved.
                                                                                                          code.google.com/p/crypto-js/wiki/License
                                                                                                          */
(function () {var b = CryptoJS,a = b.lib,d = a.Base,m = a.WordArray,a = b.algo,q = a.HMAC,l = a.PBKDF2 = d.extend({ cfg: d.extend({ keySize: 4, hasher: a.SHA1, iterations: 1 }), init: function init(a) {this.cfg = this.cfg.extend(a);}, compute: function compute(a, b) {for (var c = this.cfg, f = q.create(c.hasher, a), g = m.create(), d = m.create([1]), l = g.words, r = d.words, n = c.keySize, c = c.iterations; l.length < n;) {var h = f.update(b).finalize(d);f.reset();for (var j = h.words, s = j.length, k = h, p = 1; p < c; p++) {k = f.finalize(k);f.reset();for (var t = k.words, e = 0; e < s; e++) {j[e] ^= t[e];}}g.concat(h);
        r[0]++;}g.sigBytes = 4 * n;return g;} });b.PBKDF2 = function (a, b, c) {return l.create(c).compute(a, b);};})();

/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
                                                                                                                          */
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var b64pad = "=";function hex2b64(d) {var b;var e;var a = "";for (b = 0; b + 3 <= d.length; b += 3) {e = parseInt(d.substring(b, b + 3), 16);a += b64map.charAt(e >> 6) + b64map.charAt(e & 63);}if (b + 1 == d.length) {e = parseInt(d.substring(b, b + 1), 16);a += b64map.charAt(e << 2);} else {if (b + 2 == d.length) {e = parseInt(d.substring(b, b + 2), 16);a += b64map.charAt(e >> 2) + b64map.charAt((e & 3) << 4);}}if (b64pad) {while ((a.length & 3) > 0) {a += b64pad;}}return a;}function b64tohex(f) {var d = "";var e;var b = 0;var c;var a;for (e = 0; e < f.length; ++e) {if (f.charAt(e) == b64pad) {break;}a = b64map.indexOf(f.charAt(e));if (a < 0) {continue;}if (b == 0) {d += int2char(a >> 2);c = a & 3;b = 1;} else {if (b == 1) {d += int2char(c << 2 | a >> 4);c = a & 15;b = 2;} else {if (b == 2) {d += int2char(c);d += int2char(a >> 2);c = a & 3;b = 3;} else {d += int2char(c << 2 | a >> 4);d += int2char(a & 15);b = 0;}}}}if (b == 1) {d += int2char(c << 2);}return d;}function b64toBA(e) {var d = b64tohex(e);var c;var b = new Array();for (c = 0; 2 * c < d.length; ++c) {b[c] = parseInt(d.substring(2 * c, 2 * c + 2), 16);}return b;};
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       */
var dbits;var canary = 244837814094590;var j_lm = (canary & 16777215) == 15715070;function BigInteger(e, d, f) {if (e != null) {if ("number" == typeof e) {this.fromNumber(e, d, f);} else {if (d == null && "string" != typeof e) {this.fromString(e, 256);} else {this.fromString(e, d);}}}}function nbi() {return new BigInteger(null);}function am1(f, a, b, e, h, g) {while (--g >= 0) {var d = a * this[f++] + b[e] + h;h = Math.floor(d / 67108864);b[e++] = d & 67108863;}return h;}function am2(f, q, r, e, o, a) {var k = q & 32767,p = q >> 15;while (--a >= 0) {var d = this[f] & 32767;var g = this[f++] >> 15;var b = p * d + g * k;d = k * d + ((b & 32767) << 15) + r[e] + (o & 1073741823);o = (d >>> 30) + (b >>> 15) + p * g + (o >>> 30);r[e++] = d & 1073741823;}return o;}function am3(f, q, r, e, o, a) {var k = q & 16383,p = q >> 14;while (--a >= 0) {var d = this[f] & 16383;var g = this[f++] >> 14;var b = p * d + g * k;d = k * d + ((b & 16383) << 14) + r[e] + o;o = (d >> 28) + (b >> 14) + p * g;r[e++] = d & 268435455;}return o;}if (j_lm && navigator.appName == "Microsoft Internet Explorer") {BigInteger.prototype.am = am2;dbits = 30;} else {if (j_lm && navigator.appName != "Netscape") {BigInteger.prototype.am = am1;dbits = 26;} else {BigInteger.prototype.am = am3;dbits = 28;}}BigInteger.prototype.DB = dbits;BigInteger.prototype.DM = (1 << dbits) - 1;BigInteger.prototype.DV = 1 << dbits;var BI_FP = 52;BigInteger.prototype.FV = Math.pow(2, BI_FP);BigInteger.prototype.F1 = BI_FP - dbits;BigInteger.prototype.F2 = 2 * dbits - BI_FP;var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";var BI_RC = new Array();var rr, vv;rr = "0".charCodeAt(0);for (vv = 0; vv <= 9; ++vv) {BI_RC[rr++] = vv;}rr = "a".charCodeAt(0);for (vv = 10; vv < 36; ++vv) {BI_RC[rr++] = vv;}rr = "A".charCodeAt(0);for (vv = 10; vv < 36; ++vv) {BI_RC[rr++] = vv;}function int2char(a) {return BI_RM.charAt(a);}function intAt(b, a) {var d = BI_RC[b.charCodeAt(a)];return d == null ? -1 : d;}function bnpCopyTo(b) {for (var a = this.t - 1; a >= 0; --a) {b[a] = this[a];}b.t = this.t;b.s = this.s;}function bnpFromInt(a) {this.t = 1;this.s = a < 0 ? -1 : 0;if (a > 0) {this[0] = a;} else {if (a < -1) {this[0] = a + this.DV;} else {this.t = 0;}}}function nbv(a) {var b = nbi();b.fromInt(a);return b;}function bnpFromString(h, c) {var e;if (c == 16) {e = 4;} else {if (c == 8) {e = 3;} else {if (c == 256) {e = 8;} else {if (c == 2) {e = 1;} else {if (c == 32) {e = 5;} else {if (c == 4) {e = 2;} else {this.fromRadix(h, c);return;}}}}}}this.t = 0;this.s = 0;var g = h.length,d = false,f = 0;while (--g >= 0) {var a = e == 8 ? h[g] & 255 : intAt(h, g);if (a < 0) {if (h.charAt(g) == "-") {d = true;}continue;}d = false;if (f == 0) {this[this.t++] = a;} else {if (f + e > this.DB) {this[this.t - 1] |= (a & (1 << this.DB - f) - 1) << f;this[this.t++] = a >> this.DB - f;} else {this[this.t - 1] |= a << f;}}f += e;if (f >= this.DB) {f -= this.DB;}}if (e == 8 && (h[0] & 128) != 0) {this.s = -1;if (f > 0) {this[this.t - 1] |= (1 << this.DB - f) - 1 << f;}}this.clamp();if (d) {BigInteger.ZERO.subTo(this, this);}}function bnpClamp() {var a = this.s & this.DM;while (this.t > 0 && this[this.t - 1] == a) {--this.t;}}function bnToString(c) {if (this.s < 0) {return "-" + this.negate().toString(c);}var e;if (c == 16) {e = 4;} else {if (c == 8) {e = 3;} else {if (c == 2) {e = 1;} else {if (c == 32) {e = 5;} else {if (c == 4) {e = 2;} else {return this.toRadix(c);}}}}}var g = (1 << e) - 1,l,a = false,h = "",f = this.t;var j = this.DB - f * this.DB % e;if (f-- > 0) {if (j < this.DB && (l = this[f] >> j) > 0) {a = true;h = int2char(l);}while (f >= 0) {if (j < e) {l = (this[f] & (1 << j) - 1) << e - j;l |= this[--f] >> (j += this.DB - e);} else {l = this[f] >> (j -= e) & g;if (j <= 0) {j += this.DB;--f;}}if (l > 0) {a = true;}if (a) {h += int2char(l);}}}return a ? h : "0";}function bnNegate() {var a = nbi();BigInteger.ZERO.subTo(this, a);return a;}function bnAbs() {return this.s < 0 ? this.negate() : this;}function bnCompareTo(b) {var d = this.s - b.s;if (d != 0) {return d;}var c = this.t;d = c - b.t;if (d != 0) {return this.s < 0 ? -d : d;}while (--c >= 0) {if ((d = this[c] - b[c]) != 0) {return d;}}return 0;}function nbits(a) {var c = 1,b;if ((b = a >>> 16) != 0) {a = b;c += 16;}if ((b = a >> 8) != 0) {a = b;c += 8;}if ((b = a >> 4) != 0) {a = b;c += 4;}if ((b = a >> 2) != 0) {a = b;c += 2;}if ((b = a >> 1) != 0) {a = b;c += 1;}return c;}function bnBitLength() {if (this.t <= 0) {return 0;}return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);}function bnpDLShiftTo(c, b) {var a;for (a = this.t - 1; a >= 0; --a) {b[a + c] = this[a];}for (a = c - 1; a >= 0; --a) {b[a] = 0;}b.t = this.t + c;b.s = this.s;}function bnpDRShiftTo(c, b) {for (var a = c; a < this.t; ++a) {b[a - c] = this[a];}b.t = Math.max(this.t - c, 0);b.s = this.s;}function bnpLShiftTo(j, e) {var b = j % this.DB;var a = this.DB - b;var g = (1 << a) - 1;var f = Math.floor(j / this.DB),h = this.s << b & this.DM,d;for (d = this.t - 1; d >= 0; --d) {e[d + f + 1] = this[d] >> a | h;h = (this[d] & g) << b;}for (d = f - 1; d >= 0; --d) {e[d] = 0;}e[f] = h;e.t = this.t + f + 1;e.s = this.s;e.clamp();}function bnpRShiftTo(g, d) {d.s = this.s;var e = Math.floor(g / this.DB);if (e >= this.t) {d.t = 0;return;}var b = g % this.DB;var a = this.DB - b;var f = (1 << b) - 1;d[0] = this[e] >> b;for (var c = e + 1; c < this.t; ++c) {d[c - e - 1] |= (this[c] & f) << a;d[c - e] = this[c] >> b;}if (b > 0) {d[this.t - e - 1] |= (this.s & f) << a;}d.t = this.t - e;d.clamp();}function bnpSubTo(d, f) {var e = 0,g = 0,b = Math.min(d.t, this.t);while (e < b) {g += this[e] - d[e];f[e++] = g & this.DM;g >>= this.DB;}if (d.t < this.t) {g -= d.s;while (e < this.t) {g += this[e];f[e++] = g & this.DM;g >>= this.DB;}g += this.s;} else {g += this.s;while (e < d.t) {g -= d[e];f[e++] = g & this.DM;g >>= this.DB;}g -= d.s;}f.s = g < 0 ? -1 : 0;if (g < -1) {f[e++] = this.DV + g;} else {if (g > 0) {f[e++] = g;}}f.t = e;f.clamp();}function bnpMultiplyTo(c, e) {var b = this.abs(),f = c.abs();var d = b.t;e.t = d + f.t;while (--d >= 0) {e[d] = 0;}for (d = 0; d < f.t; ++d) {e[d + b.t] = b.am(0, f[d], e, d, 0, b.t);}e.s = 0;e.clamp();if (this.s != c.s) {BigInteger.ZERO.subTo(e, e);}}function bnpSquareTo(d) {var a = this.abs();var b = d.t = 2 * a.t;while (--b >= 0) {d[b] = 0;}for (b = 0; b < a.t - 1; ++b) {var e = a.am(b, a[b], d, 2 * b, 0, 1);if ((d[b + a.t] += a.am(b + 1, 2 * a[b], d, 2 * b + 1, e, a.t - b - 1)) >= a.DV) {d[b + a.t] -= a.DV;d[b + a.t + 1] = 1;}}if (d.t > 0) {d[d.t - 1] += a.am(b, a[b], d, 2 * b, 0, 1);}d.s = 0;d.clamp();}function bnpDivRemTo(n, h, g) {var w = n.abs();if (w.t <= 0) {return;}var k = this.abs();if (k.t < w.t) {if (h != null) {h.fromInt(0);}if (g != null) {this.copyTo(g);}return;}if (g == null) {g = nbi();}var d = nbi(),a = this.s,l = n.s;var v = this.DB - nbits(w[w.t - 1]);if (v > 0) {w.lShiftTo(v, d);k.lShiftTo(v, g);} else {w.copyTo(d);k.copyTo(g);}var p = d.t;var b = d[p - 1];if (b == 0) {return;}var o = b * (1 << this.F1) + (p > 1 ? d[p - 2] >> this.F2 : 0);var A = this.FV / o,z = (1 << this.F1) / o,x = 1 << this.F2;var u = g.t,s = u - p,f = h == null ? nbi() : h;d.dlShiftTo(s, f);if (g.compareTo(f) >= 0) {g[g.t++] = 1;g.subTo(f, g);}BigInteger.ONE.dlShiftTo(p, f);f.subTo(d, d);while (d.t < p) {d[d.t++] = 0;}while (--s >= 0) {var c = g[--u] == b ? this.DM : Math.floor(g[u] * A + (g[u - 1] + x) * z);if ((g[u] += d.am(0, c, g, s, 0, p)) < c) {d.dlShiftTo(s, f);g.subTo(f, g);while (g[u] < --c) {g.subTo(f, g);}}}if (h != null) {g.drShiftTo(p, h);if (a != l) {BigInteger.ZERO.subTo(h, h);}}g.t = p;g.clamp();if (v > 0) {g.rShiftTo(v, g);}if (a < 0) {BigInteger.ZERO.subTo(g, g);}}function bnMod(b) {var c = nbi();this.abs().divRemTo(b, null, c);if (this.s < 0 && c.compareTo(BigInteger.ZERO) > 0) {b.subTo(c, c);}return c;}function Classic(a) {this.m = a;}function cConvert(a) {if (a.s < 0 || a.compareTo(this.m) >= 0) {return a.mod(this.m);} else {return a;}}function cRevert(a) {return a;}function cReduce(a) {a.divRemTo(this.m, null, a);}function cMulTo(a, c, b) {a.multiplyTo(c, b);this.reduce(b);}function cSqrTo(a, b) {a.squareTo(b);this.reduce(b);}Classic.prototype.convert = cConvert;Classic.prototype.revert = cRevert;Classic.prototype.reduce = cReduce;Classic.prototype.mulTo = cMulTo;Classic.prototype.sqrTo = cSqrTo;function bnpInvDigit() {if (this.t < 1) {return 0;}var a = this[0];if ((a & 1) == 0) {return 0;}var b = a & 3;b = b * (2 - (a & 15) * b) & 15;b = b * (2 - (a & 255) * b) & 255;b = b * (2 - ((a & 65535) * b & 65535)) & 65535;b = b * (2 - a * b % this.DV) % this.DV;return b > 0 ? this.DV - b : -b;}function Montgomery(a) {this.m = a;this.mp = a.invDigit();this.mpl = this.mp & 32767;this.mph = this.mp >> 15;this.um = (1 << a.DB - 15) - 1;this.mt2 = 2 * a.t;}function montConvert(a) {var b = nbi();a.abs().dlShiftTo(this.m.t, b);b.divRemTo(this.m, null, b);if (a.s < 0 && b.compareTo(BigInteger.ZERO) > 0) {this.m.subTo(b, b);}return b;}function montRevert(a) {var b = nbi();a.copyTo(b);this.reduce(b);return b;}function montReduce(a) {while (a.t <= this.mt2) {a[a.t++] = 0;}for (var c = 0; c < this.m.t; ++c) {var b = a[c] & 32767;var d = b * this.mpl + ((b * this.mph + (a[c] >> 15) * this.mpl & this.um) << 15) & a.DM;b = c + this.m.t;a[b] += this.m.am(0, d, a, c, 0, this.m.t);while (a[b] >= a.DV) {a[b] -= a.DV;a[++b]++;}}a.clamp();a.drShiftTo(this.m.t, a);if (a.compareTo(this.m) >= 0) {a.subTo(this.m, a);}}function montSqrTo(a, b) {a.squareTo(b);this.reduce(b);}function montMulTo(a, c, b) {a.multiplyTo(c, b);this.reduce(b);}Montgomery.prototype.convert = montConvert;Montgomery.prototype.revert = montRevert;Montgomery.prototype.reduce = montReduce;Montgomery.prototype.mulTo = montMulTo;Montgomery.prototype.sqrTo = montSqrTo;function bnpIsEven() {return (this.t > 0 ? this[0] & 1 : this.s) == 0;}function bnpExp(h, j) {if (h > 4294967295 || h < 1) {return BigInteger.ONE;}var f = nbi(),a = nbi(),d = j.convert(this),c = nbits(h) - 1;d.copyTo(f);while (--c >= 0) {j.sqrTo(f, a);if ((h & 1 << c) > 0) {j.mulTo(a, d, f);} else {var b = f;f = a;a = b;}}return j.revert(f);}function bnModPowInt(b, a) {var c;if (b < 256 || a.isEven()) {c = new Classic(a);} else {c = new Montgomery(a);}return this.exp(b, c);}BigInteger.prototype.copyTo = bnpCopyTo;BigInteger.prototype.fromInt = bnpFromInt;BigInteger.prototype.fromString = bnpFromString;BigInteger.prototype.clamp = bnpClamp;BigInteger.prototype.dlShiftTo = bnpDLShiftTo;BigInteger.prototype.drShiftTo = bnpDRShiftTo;BigInteger.prototype.lShiftTo = bnpLShiftTo;BigInteger.prototype.rShiftTo = bnpRShiftTo;BigInteger.prototype.subTo = bnpSubTo;BigInteger.prototype.multiplyTo = bnpMultiplyTo;BigInteger.prototype.squareTo = bnpSquareTo;BigInteger.prototype.divRemTo = bnpDivRemTo;BigInteger.prototype.invDigit = bnpInvDigit;BigInteger.prototype.isEven = bnpIsEven;BigInteger.prototype.exp = bnpExp;BigInteger.prototype.toString = bnToString;BigInteger.prototype.negate = bnNegate;BigInteger.prototype.abs = bnAbs;BigInteger.prototype.compareTo = bnCompareTo;BigInteger.prototype.bitLength = bnBitLength;BigInteger.prototype.mod = bnMod;BigInteger.prototype.modPowInt = bnModPowInt;BigInteger.ZERO = nbv(0);BigInteger.ONE = nbv(1);
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
function bnClone() {var a = nbi();this.copyTo(a);return a;}function bnIntValue() {if (this.s < 0) {if (this.t == 1) {return this[0] - this.DV;} else {if (this.t == 0) {return -1;}}} else {if (this.t == 1) {return this[0];} else {if (this.t == 0) {return 0;}}}return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];}function bnByteValue() {return this.t == 0 ? this.s : this[0] << 24 >> 24;}function bnShortValue() {return this.t == 0 ? this.s : this[0] << 16 >> 16;}function bnpChunkSize(a) {return Math.floor(Math.LN2 * this.DB / Math.log(a));}function bnSigNum() {if (this.s < 0) {return -1;} else {if (this.t <= 0 || this.t == 1 && this[0] <= 0) {return 0;} else {return 1;}}}function bnpToRadix(c) {if (c == null) {c = 10;}if (this.signum() == 0 || c < 2 || c > 36) {return "0";}var f = this.chunkSize(c);var e = Math.pow(c, f);var i = nbv(e),j = nbi(),h = nbi(),g = "";this.divRemTo(i, j, h);while (j.signum() > 0) {g = (e + h.intValue()).toString(c).substr(1) + g;j.divRemTo(i, j, h);}return h.intValue().toString(c) + g;}function bnpFromRadix(m, h) {this.fromInt(0);if (h == null) {h = 10;}var f = this.chunkSize(h);var g = Math.pow(h, f),e = false,a = 0,l = 0;for (var c = 0; c < m.length; ++c) {var k = intAt(m, c);if (k < 0) {if (m.charAt(c) == "-" && this.signum() == 0) {e = true;}continue;}l = h * l + k;if (++a >= f) {this.dMultiply(g);this.dAddOffset(l, 0);a = 0;l = 0;}}if (a > 0) {this.dMultiply(Math.pow(h, a));this.dAddOffset(l, 0);}if (e) {BigInteger.ZERO.subTo(this, this);}}function bnpFromNumber(f, e, h) {if ("number" == typeof e) {if (f < 2) {this.fromInt(1);} else {this.fromNumber(f, h);if (!this.testBit(f - 1)) {this.bitwiseTo(BigInteger.ONE.shiftLeft(f - 1), op_or, this);}if (this.isEven()) {this.dAddOffset(1, 0);}while (!this.isProbablePrime(e)) {this.dAddOffset(2, 0);if (this.bitLength() > f) {this.subTo(BigInteger.ONE.shiftLeft(f - 1), this);}}}} else {var d = new Array(),g = f & 7;d.length = (f >> 3) + 1;e.nextBytes(d);if (g > 0) {d[0] &= (1 << g) - 1;} else {d[0] = 0;}this.fromString(d, 256);}}function bnToByteArray() {var b = this.t,c = new Array();c[0] = this.s;var e = this.DB - b * this.DB % 8,f,a = 0;if (b-- > 0) {if (e < this.DB && (f = this[b] >> e) != (this.s & this.DM) >> e) {c[a++] = f | this.s << this.DB - e;}while (b >= 0) {if (e < 8) {f = (this[b] & (1 << e) - 1) << 8 - e;f |= this[--b] >> (e += this.DB - 8);} else {f = this[b] >> (e -= 8) & 255;if (e <= 0) {e += this.DB;--b;}}if ((f & 128) != 0) {f |= -256;}if (a == 0 && (this.s & 128) != (f & 128)) {++a;}if (a > 0 || f != this.s) {c[a++] = f;}}}return c;}function bnEquals(b) {return this.compareTo(b) == 0;}function bnMin(b) {return this.compareTo(b) < 0 ? this : b;}function bnMax(b) {return this.compareTo(b) > 0 ? this : b;}function bnpBitwiseTo(c, h, e) {var d,g,b = Math.min(c.t, this.t);for (d = 0; d < b; ++d) {e[d] = h(this[d], c[d]);}if (c.t < this.t) {g = c.s & this.DM;for (d = b; d < this.t; ++d) {e[d] = h(this[d], g);}e.t = this.t;} else {g = this.s & this.DM;for (d = b; d < c.t; ++d) {e[d] = h(g, c[d]);}e.t = c.t;}e.s = h(this.s, c.s);e.clamp();}function op_and(a, b) {return a & b;}function bnAnd(b) {var c = nbi();this.bitwiseTo(b, op_and, c);return c;}function op_or(a, b) {return a | b;}function bnOr(b) {var c = nbi();this.bitwiseTo(b, op_or, c);return c;}function op_xor(a, b) {return a ^ b;}function bnXor(b) {var c = nbi();this.bitwiseTo(b, op_xor, c);return c;}function op_andnot(a, b) {return a & ~b;}function bnAndNot(b) {var c = nbi();this.bitwiseTo(b, op_andnot, c);return c;}function bnNot() {var b = nbi();for (var a = 0; a < this.t; ++a) {b[a] = this.DM & ~this[a];}b.t = this.t;b.s = ~this.s;return b;}function bnShiftLeft(b) {var a = nbi();if (b < 0) {this.rShiftTo(-b, a);} else {this.lShiftTo(b, a);}return a;}function bnShiftRight(b) {var a = nbi();if (b < 0) {this.lShiftTo(-b, a);} else {this.rShiftTo(b, a);}return a;}function lbit(a) {if (a == 0) {return -1;}var b = 0;if ((a & 65535) == 0) {a >>= 16;b += 16;}if ((a & 255) == 0) {a >>= 8;b += 8;}if ((a & 15) == 0) {a >>= 4;b += 4;}if ((a & 3) == 0) {a >>= 2;b += 2;}if ((a & 1) == 0) {++b;}return b;}function bnGetLowestSetBit() {for (var a = 0; a < this.t; ++a) {if (this[a] != 0) {return a * this.DB + lbit(this[a]);}}if (this.s < 0) {return this.t * this.DB;}return -1;}function cbit(a) {var b = 0;while (a != 0) {a &= a - 1;++b;}return b;}function bnBitCount() {var c = 0,a = this.s & this.DM;for (var b = 0; b < this.t; ++b) {c += cbit(this[b] ^ a);}return c;}function bnTestBit(b) {var a = Math.floor(b / this.DB);if (a >= this.t) {return this.s != 0;}return (this[a] & 1 << b % this.DB) != 0;}function bnpChangeBit(c, b) {var a = BigInteger.ONE.shiftLeft(c);this.bitwiseTo(a, b, a);return a;}function bnSetBit(a) {return this.changeBit(a, op_or);}function bnClearBit(a) {return this.changeBit(a, op_andnot);}function bnFlipBit(a) {return this.changeBit(a, op_xor);}function bnpAddTo(d, f) {var e = 0,g = 0,b = Math.min(d.t, this.t);while (e < b) {g += this[e] + d[e];f[e++] = g & this.DM;g >>= this.DB;}if (d.t < this.t) {g += d.s;while (e < this.t) {g += this[e];f[e++] = g & this.DM;g >>= this.DB;}g += this.s;} else {g += this.s;while (e < d.t) {g += d[e];f[e++] = g & this.DM;g >>= this.DB;}g += d.s;}f.s = g < 0 ? -1 : 0;if (g > 0) {f[e++] = g;} else {if (g < -1) {f[e++] = this.DV + g;}}f.t = e;f.clamp();}function bnAdd(b) {var c = nbi();this.addTo(b, c);return c;}function bnSubtract(b) {var c = nbi();this.subTo(b, c);return c;}function bnMultiply(b) {var c = nbi();this.multiplyTo(b, c);return c;}function bnSquare() {var a = nbi();this.squareTo(a);return a;}function bnDivide(b) {var c = nbi();this.divRemTo(b, c, null);return c;}function bnRemainder(b) {var c = nbi();this.divRemTo(b, null, c);return c;}function bnDivideAndRemainder(b) {var d = nbi(),c = nbi();this.divRemTo(b, d, c);return new Array(d, c);}function bnpDMultiply(a) {this[this.t] = this.am(0, a - 1, this, 0, 0, this.t);++this.t;this.clamp();}function bnpDAddOffset(b, a) {if (b == 0) {return;}while (this.t <= a) {this[this.t++] = 0;}this[a] += b;while (this[a] >= this.DV) {this[a] -= this.DV;if (++a >= this.t) {this[this.t++] = 0;}++this[a];}}function NullExp() {}function nNop(a) {return a;}function nMulTo(a, c, b) {a.multiplyTo(c, b);}function nSqrTo(a, b) {a.squareTo(b);}NullExp.prototype.convert = nNop;NullExp.prototype.revert = nNop;NullExp.prototype.mulTo = nMulTo;NullExp.prototype.sqrTo = nSqrTo;function bnPow(a) {return this.exp(a, new NullExp());}function bnpMultiplyLowerTo(b, f, e) {var d = Math.min(this.t + b.t, f);e.s = 0;e.t = d;while (d > 0) {e[--d] = 0;}var c;for (c = e.t - this.t; d < c; ++d) {e[d + this.t] = this.am(0, b[d], e, d, 0, this.t);}for (c = Math.min(b.t, f); d < c; ++d) {this.am(0, b[d], e, d, 0, f - d);}e.clamp();}function bnpMultiplyUpperTo(b, e, d) {--e;var c = d.t = this.t + b.t - e;d.s = 0;while (--c >= 0) {d[c] = 0;}for (c = Math.max(e - this.t, 0); c < b.t; ++c) {d[this.t + c - e] = this.am(e - c, b[c], d, 0, 0, this.t + c - e);}d.clamp();d.drShiftTo(1, d);}function Barrett(a) {this.r2 = nbi();this.q3 = nbi();BigInteger.ONE.dlShiftTo(2 * a.t, this.r2);this.mu = this.r2.divide(a);this.m = a;}function barrettConvert(a) {if (a.s < 0 || a.t > 2 * this.m.t) {return a.mod(this.m);} else {if (a.compareTo(this.m) < 0) {return a;} else {var b = nbi();a.copyTo(b);this.reduce(b);return b;}}}function barrettRevert(a) {return a;}function barrettReduce(a) {a.drShiftTo(this.m.t - 1, this.r2);if (a.t > this.m.t + 1) {a.t = this.m.t + 1;a.clamp();}this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);while (a.compareTo(this.r2) < 0) {a.dAddOffset(1, this.m.t + 1);}a.subTo(this.r2, a);while (a.compareTo(this.m) >= 0) {a.subTo(this.m, a);}}function barrettSqrTo(a, b) {a.squareTo(b);this.reduce(b);}function barrettMulTo(a, c, b) {a.multiplyTo(c, b);this.reduce(b);}Barrett.prototype.convert = barrettConvert;Barrett.prototype.revert = barrettRevert;Barrett.prototype.reduce = barrettReduce;Barrett.prototype.mulTo = barrettMulTo;Barrett.prototype.sqrTo = barrettSqrTo;function bnModPow(q, f) {var o = q.bitLength(),h,b = nbv(1),v;if (o <= 0) {return b;} else {if (o < 18) {h = 1;} else {if (o < 48) {h = 3;} else {if (o < 144) {h = 4;} else {if (o < 768) {h = 5;} else {h = 6;}}}}}if (o < 8) {v = new Classic(f);} else {if (f.isEven()) {v = new Barrett(f);} else {v = new Montgomery(f);}}var p = new Array(),d = 3,s = h - 1,a = (1 << h) - 1;p[1] = v.convert(this);if (h > 1) {var A = nbi();v.sqrTo(p[1], A);while (d <= a) {p[d] = nbi();v.mulTo(A, p[d - 2], p[d]);d += 2;}}var l = q.t - 1,x,u = true,c = nbi(),y;o = nbits(q[l]) - 1;while (l >= 0) {if (o >= s) {x = q[l] >> o - s & a;} else {x = (q[l] & (1 << o + 1) - 1) << s - o;if (l > 0) {x |= q[l - 1] >> this.DB + o - s;}}d = h;while ((x & 1) == 0) {x >>= 1;--d;}if ((o -= d) < 0) {o += this.DB;--l;}if (u) {p[x].copyTo(b);u = false;} else {while (d > 1) {v.sqrTo(b, c);v.sqrTo(c, b);d -= 2;}if (d > 0) {v.sqrTo(b, c);} else {y = b;b = c;c = y;}v.mulTo(c, p[x], b);}while (l >= 0 && (q[l] & 1 << o) == 0) {v.sqrTo(b, c);y = b;b = c;c = y;if (--o < 0) {o = this.DB - 1;--l;}}}return v.revert(b);}function bnGCD(c) {var b = this.s < 0 ? this.negate() : this.clone();var h = c.s < 0 ? c.negate() : c.clone();if (b.compareTo(h) < 0) {var e = b;b = h;h = e;}var d = b.getLowestSetBit(),f = h.getLowestSetBit();if (f < 0) {return b;}if (d < f) {f = d;}if (f > 0) {b.rShiftTo(f, b);h.rShiftTo(f, h);}while (b.signum() > 0) {if ((d = b.getLowestSetBit()) > 0) {b.rShiftTo(d, b);}if ((d = h.getLowestSetBit()) > 0) {h.rShiftTo(d, h);}if (b.compareTo(h) >= 0) {b.subTo(h, b);b.rShiftTo(1, b);} else {h.subTo(b, h);h.rShiftTo(1, h);}}if (f > 0) {h.lShiftTo(f, h);}return h;}function bnpModInt(e) {if (e <= 0) {return 0;}var c = this.DV % e,b = this.s < 0 ? e - 1 : 0;if (this.t > 0) {if (c == 0) {b = this[0] % e;} else {for (var a = this.t - 1; a >= 0; --a) {b = (c * b + this[a]) % e;}}}return b;}function bnModInverse(f) {var j = f.isEven();if (this.isEven() && j || f.signum() == 0) {return BigInteger.ZERO;}var i = f.clone(),h = this.clone();var g = nbv(1),e = nbv(0),l = nbv(0),k = nbv(1);while (i.signum() != 0) {while (i.isEven()) {i.rShiftTo(1, i);if (j) {if (!g.isEven() || !e.isEven()) {g.addTo(this, g);e.subTo(f, e);}g.rShiftTo(1, g);} else {if (!e.isEven()) {e.subTo(f, e);}}e.rShiftTo(1, e);}while (h.isEven()) {h.rShiftTo(1, h);if (j) {if (!l.isEven() || !k.isEven()) {l.addTo(this, l);k.subTo(f, k);}l.rShiftTo(1, l);} else {if (!k.isEven()) {k.subTo(f, k);}}k.rShiftTo(1, k);}if (i.compareTo(h) >= 0) {i.subTo(h, i);if (j) {g.subTo(l, g);}e.subTo(k, e);} else {h.subTo(i, h);if (j) {l.subTo(g, l);}k.subTo(e, k);}}if (h.compareTo(BigInteger.ONE) != 0) {return BigInteger.ZERO;}if (k.compareTo(f) >= 0) {return k.subtract(f);}if (k.signum() < 0) {k.addTo(f, k);} else {return k;}if (k.signum() < 0) {return k.add(f);} else {return k;}}var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];function bnIsProbablePrime(e) {var d,b = this.abs();if (b.t == 1 && b[0] <= lowprimes[lowprimes.length - 1]) {for (d = 0; d < lowprimes.length; ++d) {if (b[0] == lowprimes[d]) {return true;}}return false;}if (b.isEven()) {return false;}d = 1;while (d < lowprimes.length) {var a = lowprimes[d],c = d + 1;while (c < lowprimes.length && a < lplim) {a *= lowprimes[c++];}a = b.modInt(a);while (d < c) {if (a % lowprimes[d++] == 0) {return false;}}}return b.millerRabin(e);}function bnpMillerRabin(f) {var g = this.subtract(BigInteger.ONE);var c = g.getLowestSetBit();if (c <= 0) {return false;}var h = g.shiftRight(c);f = f + 1 >> 1;if (f > lowprimes.length) {f = lowprimes.length;}var b = nbi();for (var e = 0; e < f; ++e) {b.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);var l = b.modPow(h, this);if (l.compareTo(BigInteger.ONE) != 0 && l.compareTo(g) != 0) {var d = 1;while (d++ < c && l.compareTo(g) != 0) {l = l.modPowInt(2, this);if (l.compareTo(BigInteger.ONE) == 0) {return false;}}if (l.compareTo(g) != 0) {return false;}}}return true;}BigInteger.prototype.chunkSize = bnpChunkSize;BigInteger.prototype.toRadix = bnpToRadix;BigInteger.prototype.fromRadix = bnpFromRadix;BigInteger.prototype.fromNumber = bnpFromNumber;BigInteger.prototype.bitwiseTo = bnpBitwiseTo;BigInteger.prototype.changeBit = bnpChangeBit;BigInteger.prototype.addTo = bnpAddTo;BigInteger.prototype.dMultiply = bnpDMultiply;BigInteger.prototype.dAddOffset = bnpDAddOffset;BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;BigInteger.prototype.modInt = bnpModInt;BigInteger.prototype.millerRabin = bnpMillerRabin;BigInteger.prototype.clone = bnClone;BigInteger.prototype.intValue = bnIntValue;BigInteger.prototype.byteValue = bnByteValue;BigInteger.prototype.shortValue = bnShortValue;BigInteger.prototype.signum = bnSigNum;BigInteger.prototype.toByteArray = bnToByteArray;BigInteger.prototype.equals = bnEquals;BigInteger.prototype.min = bnMin;BigInteger.prototype.max = bnMax;BigInteger.prototype.and = bnAnd;BigInteger.prototype.or = bnOr;BigInteger.prototype.xor = bnXor;BigInteger.prototype.andNot = bnAndNot;BigInteger.prototype.not = bnNot;BigInteger.prototype.shiftLeft = bnShiftLeft;BigInteger.prototype.shiftRight = bnShiftRight;BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;BigInteger.prototype.bitCount = bnBitCount;BigInteger.prototype.testBit = bnTestBit;BigInteger.prototype.setBit = bnSetBit;BigInteger.prototype.clearBit = bnClearBit;BigInteger.prototype.flipBit = bnFlipBit;BigInteger.prototype.add = bnAdd;BigInteger.prototype.subtract = bnSubtract;BigInteger.prototype.multiply = bnMultiply;BigInteger.prototype.divide = bnDivide;BigInteger.prototype.remainder = bnRemainder;BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;BigInteger.prototype.modPow = bnModPow;BigInteger.prototype.modInverse = bnModInverse;BigInteger.prototype.pow = bnPow;BigInteger.prototype.gcd = bnGCD;BigInteger.prototype.isProbablePrime = bnIsProbablePrime;BigInteger.prototype.square = bnSquare;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       */
function Arcfour() {this.i = 0;this.j = 0;this.S = new Array();}function ARC4init(d) {var c, a, b;for (c = 0; c < 256; ++c) {this.S[c] = c;}a = 0;for (c = 0; c < 256; ++c) {a = a + this.S[c] + d[c % d.length] & 255;b = this.S[c];this.S[c] = this.S[a];this.S[a] = b;}this.i = 0;this.j = 0;}function ARC4next() {var a;this.i = this.i + 1 & 255;this.j = this.j + this.S[this.i] & 255;a = this.S[this.i];this.S[this.i] = this.S[this.j];this.S[this.j] = a;return this.S[a + this.S[this.i] & 255];}Arcfour.prototype.init = ARC4init;Arcfour.prototype.next = ARC4next;function prng_newstate() {return new Arcfour();}var rng_psize = 256;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
var rng_state;var rng_pool;var rng_pptr;function rng_seed_int(a) {rng_pool[rng_pptr++] ^= a & 255;rng_pool[rng_pptr++] ^= a >> 8 & 255;rng_pool[rng_pptr++] ^= a >> 16 & 255;rng_pool[rng_pptr++] ^= a >> 24 & 255;if (rng_pptr >= rng_psize) {rng_pptr -= rng_psize;}}function rng_seed_time() {rng_seed_int(new Date().getTime());}if (rng_pool == null) {rng_pool = new Array();rng_pptr = 0;var t;if (window !== undefined && (window.crypto !== undefined || window.msCrypto !== undefined)) {var crypto = window.crypto || window.msCrypto;if (crypto.getRandomValues) {var ua = new Uint8Array(32);crypto.getRandomValues(ua);for (t = 0; t < 32; ++t) {rng_pool[rng_pptr++] = ua[t];}} else {if (navigator.appName == "Netscape" && navigator.appVersion < "5") {var z = window.crypto.random(32);for (t = 0; t < z.length; ++t) {rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;}}}}while (rng_pptr < rng_psize) {t = Math.floor(65536 * Math.random());rng_pool[rng_pptr++] = t >>> 8;rng_pool[rng_pptr++] = t & 255;}rng_pptr = 0;rng_seed_time();}function rng_get_byte() {if (rng_state == null) {rng_seed_time();rng_state = prng_newstate();rng_state.init(rng_pool);for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {rng_pool[rng_pptr] = 0;}rng_pptr = 0;}return rng_state.next();}function rng_get_bytes(b) {var a;for (a = 0; a < b.length; ++a) {b[a] = rng_get_byte();}}function SecureRandom() {}SecureRandom.prototype.nextBytes = rng_get_bytes;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */
function parseBigInt(b, a) {return new BigInteger(b, a);}function linebrk(c, d) {var a = "";var b = 0;while (b + d < c.length) {a += c.substring(b, b + d) + "\n";b += d;}return a + c.substring(b, c.length);}function byte2Hex(a) {if (a < 16) {return "0" + a.toString(16);} else {return a.toString(16);}}function pkcs1pad2(e, h) {if (h < e.length + 11) {throw "Message too long for RSA";return null;}var g = new Array();var d = e.length - 1;while (d >= 0 && h > 0) {var f = e.charCodeAt(d--);if (f < 128) {g[--h] = f;} else {if (f > 127 && f < 2048) {g[--h] = f & 63 | 128;g[--h] = f >> 6 | 192;} else {g[--h] = f & 63 | 128;g[--h] = f >> 6 & 63 | 128;g[--h] = f >> 12 | 224;}}}g[--h] = 0;var b = new SecureRandom();var a = new Array();while (h > 2) {a[0] = 0;while (a[0] == 0) {b.nextBytes(a);}g[--h] = a[0];}g[--h] = 2;g[--h] = 0;return new BigInteger(g);}function oaep_mgf1_arr(c, a, e) {var b = "",d = 0;while (b.length < a) {b += e(String.fromCharCode.apply(String, c.concat([(d & 4278190080) >> 24, (d & 16711680) >> 16, (d & 65280) >> 8, d & 255])));d += 1;}return b;}function oaep_pad(q, a, f, l) {var c = KJUR.crypto.MessageDigest;var o = KJUR.crypto.Util;var b = null;if (!f) {f = "sha1";}if (typeof f === "string") {b = c.getCanonicalAlgName(f);l = c.getHashLength(b);f = function f(i) {return hextorstr(o.hashHex(rstrtohex(i), b));};}if (q.length + 2 * l + 2 > a) {throw "Message too long for RSA";}var k = "",e;for (e = 0; e < a - q.length - 2 * l - 2; e += 1) {k += "\x00";}var h = f("") + k + "\x01" + q;var g = new Array(l);new SecureRandom().nextBytes(g);var j = oaep_mgf1_arr(g, h.length, f);var p = [];for (e = 0; e < h.length; e += 1) {p[e] = h.charCodeAt(e) ^ j.charCodeAt(e);}var m = oaep_mgf1_arr(p, g.length, f);var d = [0];for (e = 0; e < g.length; e += 1) {d[e + 1] = g[e] ^ m.charCodeAt(e);}return new BigInteger(d.concat(p));}function RSAKey() {this.n = null;this.e = 0;this.d = null;this.p = null;this.q = null;this.dmp1 = null;this.dmq1 = null;this.coeff = null;}function RSASetPublic(b, a) {this.isPublic = true;this.isPrivate = false;if (typeof b !== "string") {this.n = b;this.e = a;} else {if (b != null && a != null && b.length > 0 && a.length > 0) {this.n = parseBigInt(b, 16);this.e = parseInt(a, 16);} else {throw "Invalid RSA public key";}}}function RSADoPublic(a) {return a.modPowInt(this.e, this.n);}function RSAEncrypt(d) {var a = pkcs1pad2(d, this.n.bitLength() + 7 >> 3);if (a == null) {return null;}var e = this.doPublic(a);if (e == null) {return null;}var b = e.toString(16);if ((b.length & 1) == 0) {return b;} else {return "0" + b;}}function RSAEncryptOAEP(f, e, b) {var a = oaep_pad(f, this.n.bitLength() + 7 >> 3, e, b);if (a == null) {return null;}var g = this.doPublic(a);if (g == null) {return null;}var d = g.toString(16);if ((d.length & 1) == 0) {return d;} else {return "0" + d;}}RSAKey.prototype.doPublic = RSADoPublic;RSAKey.prototype.setPublic = RSASetPublic;RSAKey.prototype.encrypt = RSAEncrypt;RSAKey.prototype.encryptOAEP = RSAEncryptOAEP;RSAKey.prototype.type = "RSA";
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */
function pkcs1unpad2(g, j) {var a = g.toByteArray();var f = 0;while (f < a.length && a[f] == 0) {++f;}if (a.length - f != j - 1 || a[f] != 2) {return null;}++f;while (a[f] != 0) {if (++f >= a.length) {return null;}}var e = "";while (++f < a.length) {var h = a[f] & 255;if (h < 128) {e += String.fromCharCode(h);} else {if (h > 191 && h < 224) {e += String.fromCharCode((h & 31) << 6 | a[f + 1] & 63);++f;} else {e += String.fromCharCode((h & 15) << 12 | (a[f + 1] & 63) << 6 | a[f + 2] & 63);f += 2;}}}return e;}function oaep_mgf1_str(c, a, e) {var b = "",d = 0;while (b.length < a) {b += e(c + String.fromCharCode.apply(String, [(d & 4278190080) >> 24, (d & 16711680) >> 16, (d & 65280) >> 8, d & 255]));d += 1;}return b;}function oaep_unpad(o, b, g, p) {var e = KJUR.crypto.MessageDigest;var r = KJUR.crypto.Util;var c = null;if (!g) {g = "sha1";}if (typeof g === "string") {c = e.getCanonicalAlgName(g);p = e.getHashLength(c);g = function g(d) {return hextorstr(r.hashHex(rstrtohex(d), c));};}o = o.toByteArray();var h;for (h = 0; h < o.length; h += 1) {o[h] &= 255;}while (o.length < b) {o.unshift(0);}o = String.fromCharCode.apply(String, o);if (o.length < 2 * p + 2) {throw "Cipher too short";}var f = o.substr(1, p);var s = o.substr(p + 1);var q = oaep_mgf1_str(s, p, g);var k = [],h;for (h = 0; h < f.length; h += 1) {k[h] = f.charCodeAt(h) ^ q.charCodeAt(h);}var l = oaep_mgf1_str(String.fromCharCode.apply(String, k), o.length - p, g);var j = [];for (h = 0; h < s.length; h += 1) {j[h] = s.charCodeAt(h) ^ l.charCodeAt(h);}j = String.fromCharCode.apply(String, j);if (j.substr(0, p) !== g("")) {throw "Hash mismatch";}j = j.substr(p);var a = j.indexOf("\x01");var m = a != -1 ? j.substr(0, a).lastIndexOf("\x00") : -1;if (m + 1 != a) {throw "Malformed data";}return j.substr(a + 1);}function RSASetPrivate(c, a, b) {this.isPrivate = true;if (typeof c !== "string") {this.n = c;this.e = a;this.d = b;} else {if (c != null && a != null && c.length > 0 && a.length > 0) {this.n = parseBigInt(c, 16);this.e = parseInt(a, 16);this.d = parseBigInt(b, 16);} else {throw "Invalid RSA private key";}}}function RSASetPrivateEx(g, d, e, c, b, a, h, f) {this.isPrivate = true;this.isPublic = false;if (g == null) {throw "RSASetPrivateEx N == null";}if (d == null) {throw "RSASetPrivateEx E == null";}if (g.length == 0) {throw "RSASetPrivateEx N.length == 0";}if (d.length == 0) {throw "RSASetPrivateEx E.length == 0";}if (g != null && d != null && g.length > 0 && d.length > 0) {this.n = parseBigInt(g, 16);this.e = parseInt(d, 16);this.d = parseBigInt(e, 16);this.p = parseBigInt(c, 16);this.q = parseBigInt(b, 16);this.dmp1 = parseBigInt(a, 16);this.dmq1 = parseBigInt(h, 16);this.coeff = parseBigInt(f, 16);} else {throw "Invalid RSA private key in RSASetPrivateEx";}}function RSAGenerate(b, i) {var a = new SecureRandom();var f = b >> 1;this.e = parseInt(i, 16);var c = new BigInteger(i, 16);for (;;) {for (;;) {this.p = new BigInteger(b - f, 1, a);if (this.p.subtract(BigInteger.ONE).gcd(c).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {break;}}for (;;) {this.q = new BigInteger(f, 1, a);if (this.q.subtract(BigInteger.ONE).gcd(c).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {break;}}if (this.p.compareTo(this.q) <= 0) {var h = this.p;this.p = this.q;this.q = h;}var g = this.p.subtract(BigInteger.ONE);var d = this.q.subtract(BigInteger.ONE);var e = g.multiply(d);if (e.gcd(c).compareTo(BigInteger.ONE) == 0) {this.n = this.p.multiply(this.q);if (this.n.bitLength() == b) {this.d = c.modInverse(e);this.dmp1 = this.d.mod(g);this.dmq1 = this.d.mod(d);this.coeff = this.q.modInverse(this.p);break;}}}this.isPrivate = true;}function RSADoPrivate(a) {if (this.p == null || this.q == null) {return a.modPow(this.d, this.n);}var c = a.mod(this.p).modPow(this.dmp1, this.p);var b = a.mod(this.q).modPow(this.dmq1, this.q);while (c.compareTo(b) < 0) {c = c.add(this.p);}return c.subtract(b).multiply(this.coeff).mod(this.p).multiply(this.q).add(b);}function RSADecrypt(b) {if (b.length != Math.ceil(this.n.bitLength() / 4)) {throw new Error("wrong ctext length");}var d = parseBigInt(b, 16);var a = this.doPrivate(d);if (a == null) {return null;}return pkcs1unpad2(a, this.n.bitLength() + 7 >> 3);}function RSADecryptOAEP(e, d, b) {if (e.length != Math.ceil(this.n.bitLength() / 4)) {throw new Error("wrong ctext length");}var f = parseBigInt(e, 16);var a = this.doPrivate(f);if (a == null) {return null;}return oaep_unpad(a, this.n.bitLength() + 7 >> 3, d, b);}RSAKey.prototype.doPrivate = RSADoPrivate;RSAKey.prototype.setPrivate = RSASetPrivate;RSAKey.prototype.setPrivateEx = RSASetPrivateEx;RSAKey.prototype.generate = RSAGenerate;RSAKey.prototype.decrypt = RSADecrypt;RSAKey.prototype.decryptOAEP = RSADecryptOAEP;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */
function ECFieldElementFp(b, a) {this.x = a;this.q = b;}function feFpEquals(a) {if (a == this) {return true;}return this.q.equals(a.q) && this.x.equals(a.x);}function feFpToBigInteger() {return this.x;}function feFpNegate() {return new ECFieldElementFp(this.q, this.x.negate().mod(this.q));}function feFpAdd(a) {return new ECFieldElementFp(this.q, this.x.add(a.toBigInteger()).mod(this.q));}function feFpSubtract(a) {return new ECFieldElementFp(this.q, this.x.subtract(a.toBigInteger()).mod(this.q));}function feFpMultiply(a) {return new ECFieldElementFp(this.q, this.x.multiply(a.toBigInteger()).mod(this.q));}function feFpSquare() {return new ECFieldElementFp(this.q, this.x.square().mod(this.q));}function feFpDivide(a) {return new ECFieldElementFp(this.q, this.x.multiply(a.toBigInteger().modInverse(this.q)).mod(this.q));}ECFieldElementFp.prototype.equals = feFpEquals;ECFieldElementFp.prototype.toBigInteger = feFpToBigInteger;ECFieldElementFp.prototype.negate = feFpNegate;ECFieldElementFp.prototype.add = feFpAdd;ECFieldElementFp.prototype.subtract = feFpSubtract;ECFieldElementFp.prototype.multiply = feFpMultiply;ECFieldElementFp.prototype.square = feFpSquare;ECFieldElementFp.prototype.divide = feFpDivide;function ECPointFp(c, a, d, b) {this.curve = c;this.x = a;this.y = d;if (b == null) {this.z = BigInteger.ONE;} else {this.z = b;}this.zinv = null;}function pointFpGetX() {if (this.zinv == null) {this.zinv = this.z.modInverse(this.curve.q);}return this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q));}function pointFpGetY() {if (this.zinv == null) {this.zinv = this.z.modInverse(this.curve.q);}return this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q));}function pointFpEquals(a) {if (a == this) {return true;}if (this.isInfinity()) {return a.isInfinity();}if (a.isInfinity()) {return this.isInfinity();}var c, b;c = a.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(a.z)).mod(this.curve.q);if (!c.equals(BigInteger.ZERO)) {return false;}b = a.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(a.z)).mod(this.curve.q);return b.equals(BigInteger.ZERO);}function pointFpIsInfinity() {if (this.x == null && this.y == null) {return true;}return this.z.equals(BigInteger.ZERO) && !this.y.toBigInteger().equals(BigInteger.ZERO);}function pointFpNegate() {return new ECPointFp(this.curve, this.x, this.y.negate(), this.z);}function pointFpAdd(l) {if (this.isInfinity()) {return l;}if (l.isInfinity()) {return this;}var p = l.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(l.z)).mod(this.curve.q);var o = l.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(l.z)).mod(this.curve.q);if (BigInteger.ZERO.equals(o)) {if (BigInteger.ZERO.equals(p)) {return this.twice();}return this.curve.getInfinity();}var j = new BigInteger("3");var e = this.x.toBigInteger();var n = this.y.toBigInteger();var c = l.x.toBigInteger();var k = l.y.toBigInteger();var m = o.square();var i = m.multiply(o);var d = e.multiply(m);var g = p.square().multiply(this.z);var a = g.subtract(d.shiftLeft(1)).multiply(l.z).subtract(i).multiply(o).mod(this.curve.q);var h = d.multiply(j).multiply(p).subtract(n.multiply(i)).subtract(g.multiply(p)).multiply(l.z).add(p.multiply(i)).mod(this.curve.q);var f = i.multiply(this.z).multiply(l.z).mod(this.curve.q);return new ECPointFp(this.curve, this.curve.fromBigInteger(a), this.curve.fromBigInteger(h), f);}function pointFpTwice() {if (this.isInfinity()) {return this;}if (this.y.toBigInteger().signum() == 0) {return this.curve.getInfinity();}var g = new BigInteger("3");var c = this.x.toBigInteger();var h = this.y.toBigInteger();var e = h.multiply(this.z);var j = e.multiply(h).mod(this.curve.q);var i = this.curve.a.toBigInteger();var k = c.square().multiply(g);if (!BigInteger.ZERO.equals(i)) {k = k.add(this.z.square().multiply(i));}k = k.mod(this.curve.q);var b = k.square().subtract(c.shiftLeft(3).multiply(j)).shiftLeft(1).multiply(e).mod(this.curve.q);var f = k.multiply(g).multiply(c).subtract(j.shiftLeft(1)).shiftLeft(2).multiply(j).subtract(k.square().multiply(k)).mod(this.curve.q);var d = e.square().multiply(e).shiftLeft(3).mod(this.curve.q);return new ECPointFp(this.curve, this.curve.fromBigInteger(b), this.curve.fromBigInteger(f), d);}function pointFpMultiply(d) {if (this.isInfinity()) {return this;}if (d.signum() == 0) {return this.curve.getInfinity();}var m = d;var l = m.multiply(new BigInteger("3"));var b = this.negate();var j = this;var q = this.curve.q.subtract(d);var o = q.multiply(new BigInteger("3"));var c = new ECPointFp(this.curve, this.x, this.y);var a = c.negate();var g;for (g = l.bitLength() - 2; g > 0; --g) {j = j.twice();var n = l.testBit(g);var f = m.testBit(g);if (n != f) {j = j.add(n ? this : b);}}for (g = o.bitLength() - 2; g > 0; --g) {c = c.twice();var p = o.testBit(g);var r = q.testBit(g);if (p != r) {c = c.add(p ? c : a);}}return j;}function pointFpMultiplyTwo(c, a, b) {var d;if (c.bitLength() > b.bitLength()) {d = c.bitLength() - 1;} else {d = b.bitLength() - 1;}var f = this.curve.getInfinity();var e = this.add(a);while (d >= 0) {f = f.twice();if (c.testBit(d)) {if (b.testBit(d)) {f = f.add(e);} else {f = f.add(this);}} else {if (b.testBit(d)) {f = f.add(a);}}--d;}return f;}ECPointFp.prototype.getX = pointFpGetX;ECPointFp.prototype.getY = pointFpGetY;ECPointFp.prototype.equals = pointFpEquals;ECPointFp.prototype.isInfinity = pointFpIsInfinity;ECPointFp.prototype.negate = pointFpNegate;ECPointFp.prototype.add = pointFpAdd;ECPointFp.prototype.twice = pointFpTwice;ECPointFp.prototype.multiply = pointFpMultiply;ECPointFp.prototype.multiplyTwo = pointFpMultiplyTwo;function ECCurveFp(e, d, c) {this.q = e;this.a = this.fromBigInteger(d);this.b = this.fromBigInteger(c);this.infinity = new ECPointFp(this, null, null);}function curveFpGetQ() {return this.q;}function curveFpGetA() {return this.a;}function curveFpGetB() {return this.b;}function curveFpEquals(a) {if (a == this) {return true;}return this.q.equals(a.q) && this.a.equals(a.a) && this.b.equals(a.b);}function curveFpGetInfinity() {return this.infinity;}function curveFpFromBigInteger(a) {return new ECFieldElementFp(this.q, a);}function curveFpDecodePointHex(d) {switch (parseInt(d.substr(0, 2), 16)) {case 0:return this.infinity;case 2:case 3:return null;case 4:case 6:case 7:var a = (d.length - 2) / 2;var c = d.substr(2, a);var b = d.substr(a + 2, a);return new ECPointFp(this, this.fromBigInteger(new BigInteger(c, 16)), this.fromBigInteger(new BigInteger(b, 16)));default:return null;}}ECCurveFp.prototype.getQ = curveFpGetQ;ECCurveFp.prototype.getA = curveFpGetA;ECCurveFp.prototype.getB = curveFpGetB;ECCurveFp.prototype.equals = curveFpEquals;ECCurveFp.prototype.getInfinity = curveFpGetInfinity;ECCurveFp.prototype.fromBigInteger = curveFpFromBigInteger;ECCurveFp.prototype.decodePointHex = curveFpDecodePointHex;
/*! (c) Stefan Thomas | https://github.com/bitcoinjs/bitcoinjs-lib
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
ECFieldElementFp.prototype.getByteLength = function () {return Math.floor((this.toBigInteger().bitLength() + 7) / 8);};ECPointFp.prototype.getEncoded = function (c) {var d = function d(h, f) {var g = h.toByteArrayUnsigned();if (f < g.length) {g = g.slice(g.length - f);} else {while (f > g.length) {g.unshift(0);}}return g;};var a = this.getX().toBigInteger();var e = this.getY().toBigInteger();var b = d(a, 32);if (c) {if (e.isEven()) {b.unshift(2);} else {b.unshift(3);}} else {b.unshift(4);b = b.concat(d(e, 32));}return b;};ECPointFp.decodeFrom = function (g, c) {var f = c[0];var e = c.length - 1;var d = c.slice(1, 1 + e / 2);var b = c.slice(1 + e / 2, 1 + e);d.unshift(0);b.unshift(0);var a = new BigInteger(d);var h = new BigInteger(b);return new ECPointFp(g, g.fromBigInteger(a), g.fromBigInteger(h));};ECPointFp.decodeFromHex = function (g, c) {var f = c.substr(0, 2);var e = c.length - 2;var d = c.substr(2, e / 2);var b = c.substr(2 + e / 2, e / 2);var a = new BigInteger(d, 16);var h = new BigInteger(b, 16);return new ECPointFp(g, g.fromBigInteger(a), g.fromBigInteger(h));};ECPointFp.prototype.add2D = function (c) {if (this.isInfinity()) {return c;}if (c.isInfinity()) {return this;}if (this.x.equals(c.x)) {if (this.y.equals(c.y)) {return this.twice();}return this.curve.getInfinity();}var g = c.x.subtract(this.x);var e = c.y.subtract(this.y);var a = e.divide(g);var d = a.square().subtract(this.x).subtract(c.x);var f = a.multiply(this.x.subtract(d)).subtract(this.y);return new ECPointFp(this.curve, d, f);};ECPointFp.prototype.twice2D = function () {if (this.isInfinity()) {return this;}if (this.y.toBigInteger().signum() == 0) {return this.curve.getInfinity();}var b = this.curve.fromBigInteger(BigInteger.valueOf(2));var e = this.curve.fromBigInteger(BigInteger.valueOf(3));var a = this.x.square().multiply(e).add(this.curve.a).divide(this.y.multiply(b));var c = a.square().subtract(this.x.multiply(b));var d = a.multiply(this.x.subtract(c)).subtract(this.y);return new ECPointFp(this.curve, c, d);};ECPointFp.prototype.multiply2D = function (b) {if (this.isInfinity()) {return this;}if (b.signum() == 0) {return this.curve.getInfinity();}var g = b;var f = g.multiply(new BigInteger("3"));var l = this.negate();var d = this;var c;for (c = f.bitLength() - 2; c > 0; --c) {d = d.twice();var a = f.testBit(c);var j = g.testBit(c);if (a != j) {d = d.add2D(a ? this : l);}}return d;};ECPointFp.prototype.isOnCurve = function () {var d = this.getX().toBigInteger();var i = this.getY().toBigInteger();var f = this.curve.getA().toBigInteger();var c = this.curve.getB().toBigInteger();var h = this.curve.getQ();var e = i.multiply(i).mod(h);var g = d.multiply(d).multiply(d).add(f.multiply(d)).add(c).mod(h);return e.equals(g);};ECPointFp.prototype.toString = function () {return "(" + this.getX().toBigInteger().toString() + "," + this.getY().toBigInteger().toString() + ")";};ECPointFp.prototype.validate = function () {var c = this.curve.getQ();if (this.isInfinity()) {throw new Error("Point is at infinity.");}var a = this.getX().toBigInteger();var b = this.getY().toBigInteger();if (a.compareTo(BigInteger.ONE) < 0 || a.compareTo(c.subtract(BigInteger.ONE)) > 0) {throw new Error("x coordinate out of bounds");}if (b.compareTo(BigInteger.ONE) < 0 || b.compareTo(c.subtract(BigInteger.ONE)) > 0) {throw new Error("y coordinate out of bounds");}if (!this.isOnCurve()) {throw new Error("Point is not on the curve.");}if (this.multiply(c).isInfinity()) {throw new Error("Point is not a scalar multiple of G.");}return true;};
/*! Mike Samuel (c) 2009 | code.google.com/p/json-sans-eval
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */
var jsonParse = function () {var e = "(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)";var j = '(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';var i = '(?:"' + j + '*")';var d = new RegExp("(?:false|true|null|[\\{\\}\\[\\]]|" + e + "|" + i + ")", "g");var k = new RegExp("\\\\(?:([^u])|u(.{4}))", "g");var g = { '"': '"', "/": "/", "\\": "\\", b: "\b", f: "\f", n: "\n", r: "\r", t: "\t" };function h(l, m, n) {return m ? g[m] : String.fromCharCode(parseInt(n, 16));}var c = new String("");var a = "\\";var f = { "{": Object, "[": Array };var b = Object.hasOwnProperty;return function (u, q) {var p = u.match(d);var x;var v = p[0];var l = false;if ("{" === v) {x = {};} else {if ("[" === v) {x = [];} else {x = [];l = true;}}var t;var r = [x];for (var o = 1 - l, m = p.length; o < m; ++o) {v = p[o];var w;switch (v.charCodeAt(0)) {default:w = r[0];w[t || w.length] = +v;t = void 0;break;case 34:v = v.substring(1, v.length - 1);if (v.indexOf(a) !== -1) {v = v.replace(k, h);}w = r[0];if (!t) {if (w instanceof Array) {t = w.length;} else {t = v || c;break;}}w[t] = v;t = void 0;break;case 91:w = r[0];r.unshift(w[t || w.length] = []);t = void 0;break;case 93:r.shift();break;case 102:w = r[0];w[t || w.length] = false;t = void 0;break;case 110:w = r[0];w[t || w.length] = null;t = void 0;break;case 116:w = r[0];w[t || w.length] = true;t = void 0;break;case 123:w = r[0];r.unshift(w[t || w.length] = {});t = void 0;break;case 125:r.shift();break;}}if (l) {if (r.length !== 1) {throw new Error();}x = x[0];} else {if (r.length) {throw new Error();}}if (q) {var s = function s(C, B) {var D = C[B];if (D && typeof D === "object") {var n = null;for (var z in D) {if (b.call(D, z) && D !== C) {var y = s(D, z);if (y !== void 0) {D[z] = y;} else {if (!n) {n = [];}n.push(z);}}}if (n) {for (var A = n.length; --A >= 0;) {delete D[n[A]];}}}return q.call(C, B, D);};x = s({ "": x }, "");}return x;};}();
if (typeof KJUR == "undefined" || !KJUR) {KJUR = {};}if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {KJUR.asn1 = {};}KJUR.asn1.ASN1Util = new function () {this.integerToByteHex = function (a) {var b = a.toString(16);if (b.length % 2 == 1) {b = "0" + b;}return b;};this.bigIntToMinTwosComplementsHex = function (j) {var f = j.toString(16);if (f.substr(0, 1) != "-") {if (f.length % 2 == 1) {f = "0" + f;} else {if (!f.match(/^[0-7]/)) {f = "00" + f;}}} else {var a = f.substr(1);var e = a.length;if (e % 2 == 1) {e += 1;} else {if (!f.match(/^[0-7]/)) {e += 2;}}var g = "";for (var d = 0; d < e; d++) {g += "f";}var c = new BigInteger(g, 16);var b = c.xor(j).add(BigInteger.ONE);f = b.toString(16).replace(/^-/, "");}return f;};this.getPEMStringFromHex = function (a, b) {return hextopem(a, b);};this.newObject = function (k) {var F = KJUR,o = F.asn1,v = o.ASN1Object,B = o.DERBoolean,e = o.DERInteger,t = o.DERBitString,h = o.DEROctetString,x = o.DERNull,y = o.DERObjectIdentifier,m = o.DEREnumerated,g = o.DERUTF8String,f = o.DERNumericString,A = o.DERPrintableString,w = o.DERTeletexString,q = o.DERIA5String,E = o.DERUTCTime,j = o.DERGeneralizedTime,b = o.DERVisibleString,l = o.DERBMPString,n = o.DERSequence,c = o.DERSet,s = o.DERTaggedObject,p = o.ASN1Util.newObject;if (k instanceof o.ASN1Object) {return k;}var u = Object.keys(k);if (u.length != 1) {throw new Error("key of param shall be only one.");}var H = u[0];if (":asn1:bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:visstr:bmpstr:seq:set:tag:".indexOf(":" + H + ":") == -1) {throw new Error("undefined key: " + H);}if (H == "bool") {return new B(k[H]);}if (H == "int") {return new e(k[H]);}if (H == "bitstr") {return new t(k[H]);}if (H == "octstr") {return new h(k[H]);}if (H == "null") {return new x(k[H]);}if (H == "oid") {return new y(k[H]);}if (H == "enum") {return new m(k[H]);}if (H == "utf8str") {return new g(k[H]);}if (H == "numstr") {return new f(k[H]);}if (H == "prnstr") {return new A(k[H]);}if (H == "telstr") {return new w(k[H]);}if (H == "ia5str") {return new q(k[H]);}if (H == "utctime") {return new E(k[H]);}if (H == "gentime") {return new j(k[H]);}if (H == "visstr") {return new b(k[H]);}if (H == "bmpstr") {return new l(k[H]);}if (H == "asn1") {return new v(k[H]);}if (H == "seq") {var d = k[H];var G = [];for (var z = 0; z < d.length; z++) {var D = p(d[z]);G.push(D);}return new n({ array: G });}if (H == "set") {var d = k[H];var G = [];for (var z = 0; z < d.length; z++) {var D = p(d[z]);G.push(D);}return new c({ array: G });}if (H == "tag") {var C = k[H];if (Object.prototype.toString.call(C) === "[object Array]" && C.length == 3) {var r = p(C[2]);return new s({ tag: C[0], explicit: C[1], obj: r });} else {return new s(C);}}};this.jsonToASN1HEX = function (b) {var a = this.newObject(b);return a.getEncodedHex();};}();KJUR.asn1.ASN1Util.oidHexToInt = function (a) {var j = "";var k = parseInt(a.substr(0, 2), 16);var d = Math.floor(k / 40);var c = k % 40;var j = d + "." + c;var e = "";for (var f = 2; f < a.length; f += 2) {var g = parseInt(a.substr(f, 2), 16);var h = ("00000000" + g.toString(2)).slice(-8);e = e + h.substr(1, 7);if (h.substr(0, 1) == "0") {var b = new BigInteger(e, 2);j = j + "." + b.toString(10);e = "";}}return j;};KJUR.asn1.ASN1Util.oidIntToHex = function (f) {var e = function e(a) {var k = a.toString(16);if (k.length == 1) {k = "0" + k;}return k;};var d = function d(o) {var n = "";var k = new BigInteger(o, 10);var a = k.toString(2);var l = 7 - a.length % 7;if (l == 7) {l = 0;}var q = "";for (var m = 0; m < l; m++) {q += "0";}a = q + a;for (var m = 0; m < a.length - 1; m += 7) {var p = a.substr(m, 7);if (m != a.length - 7) {p = "1" + p;}n += e(parseInt(p, 2));}return n;};if (!f.match(/^[0-9.]+$/)) {throw "malformed oid string: " + f;}var g = "";var b = f.split(".");var j = parseInt(b[0]) * 40 + parseInt(b[1]);g += e(j);b.splice(0, 2);for (var c = 0; c < b.length; c++) {g += d(b[c]);}return g;};KJUR.asn1.ASN1Object = function (e) {var c = true;var b = null;var d = "00";var f = "00";var a = "";this.params = null;this.getLengthHexFromValue = function () {if (typeof this.hV == "undefined" || this.hV == null) {throw new Error("this.hV is null or undefined");}if (this.hV.length % 2 == 1) {throw new Error("value hex must be even length: n=" + a.length + ",v=" + this.hV);}var j = this.hV.length / 2;var i = j.toString(16);if (i.length % 2 == 1) {i = "0" + i;}if (j < 128) {return i;} else {var h = i.length / 2;if (h > 15) {throw "ASN.1 length too long to represent by 8x: n = " + j.toString(16);}var g = 128 + h;return g.toString(16) + i;}};this.getEncodedHex = function () {if (this.hTLV == null || this.isModified) {this.hV = this.getFreshValueHex();this.hL = this.getLengthHexFromValue();this.hTLV = this.hT + this.hL + this.hV;this.isModified = false;}return this.hTLV;};this.getValueHex = function () {this.getEncodedHex();return this.hV;};this.getFreshValueHex = function () {return "";};this.setByParam = function (g) {this.params = g;};if (e != undefined) {if (e.tlv != undefined) {this.hTLV = e.tlv;this.isModified = false;}}};KJUR.asn1.DERAbstractString = function (c) {KJUR.asn1.DERAbstractString.superclass.constructor.call(this);var b = null;var a = null;this.getString = function () {return this.s;};this.setString = function (d) {this.hTLV = null;this.isModified = true;this.s = d;this.hV = utf8tohex(this.s).toLowerCase();};this.setStringHex = function (d) {this.hTLV = null;this.isModified = true;this.s = null;this.hV = d;};this.getFreshValueHex = function () {return this.hV;};if (typeof c != "undefined") {if (typeof c == "string") {this.setString(c);} else {if (typeof c.str != "undefined") {this.setString(c.str);} else {if (typeof c.hex != "undefined") {this.setStringHex(c.hex);}}}}};YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);KJUR.asn1.DERAbstractTime = function (c) {KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);var b = null;var a = null;this.localDateToUTC = function (g) {var e = g.getTime() + g.getTimezoneOffset() * 60000;var f = new Date(e);return f;};this.formatDate = function (m, o, e) {var g = this.zeroPadding;var n = this.localDateToUTC(m);var p = String(n.getFullYear());if (o == "utc") {p = p.substr(2, 2);}var l = g(String(n.getMonth() + 1), 2);var q = g(String(n.getDate()), 2);var h = g(String(n.getHours()), 2);var i = g(String(n.getMinutes()), 2);var j = g(String(n.getSeconds()), 2);var r = p + l + q + h + i + j;if (e === true) {var f = n.getMilliseconds();if (f != 0) {var k = g(String(f), 3);k = k.replace(/[0]+$/, "");r = r + "." + k;}}return r + "Z";};this.zeroPadding = function (e, d) {if (e.length >= d) {return e;}return new Array(d - e.length + 1).join("0") + e;};this.getString = function () {return this.s;};this.setString = function (d) {this.hTLV = null;this.isModified = true;this.s = d;this.hV = stohex(d);};this.setByDateValue = function (h, j, e, d, f, g) {var i = new Date(Date.UTC(h, j - 1, e, d, f, g, 0));this.setByDate(i);};this.getFreshValueHex = function () {return this.hV;};};YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);KJUR.asn1.DERAbstractStructured = function (b) {KJUR.asn1.DERAbstractString.superclass.constructor.call(this);var a = null;this.setByASN1ObjectArray = function (c) {this.hTLV = null;this.isModified = true;this.asn1Array = c;};this.appendASN1Object = function (c) {this.hTLV = null;this.isModified = true;this.asn1Array.push(c);};this.asn1Array = new Array();if (typeof b != "undefined") {if (typeof b.array != "undefined") {this.asn1Array = b.array;}}};YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);KJUR.asn1.DERBoolean = function (a) {KJUR.asn1.DERBoolean.superclass.constructor.call(this);this.hT = "01";if (a == false) {this.hTLV = "010100";} else {this.hTLV = "0101ff";}};YAHOO.lang.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);KJUR.asn1.DERInteger = function (a) {KJUR.asn1.DERInteger.superclass.constructor.call(this);this.hT = "02";this.setByBigInteger = function (b) {this.hTLV = null;this.isModified = true;this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(b);};this.setByInteger = function (c) {var b = new BigInteger(String(c), 10);this.setByBigInteger(b);};this.setValueHex = function (b) {this.hV = b;};this.getFreshValueHex = function () {return this.hV;};if (typeof a != "undefined") {if (typeof a.bigint != "undefined") {this.setByBigInteger(a.bigint);} else {if (typeof a["int"] != "undefined") {this.setByInteger(a["int"]);} else {if (typeof a == "number") {this.setByInteger(a);} else {if (typeof a.hex != "undefined") {this.setValueHex(a.hex);}}}}}};YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);KJUR.asn1.DERBitString = function (b) {if (b !== undefined && typeof b.obj !== "undefined") {var a = KJUR.asn1.ASN1Util.newObject(b.obj);b.hex = "00" + a.getEncodedHex();}KJUR.asn1.DERBitString.superclass.constructor.call(this);this.hT = "03";this.setHexValueIncludingUnusedBits = function (c) {this.hTLV = null;this.isModified = true;this.hV = c;};this.setUnusedBitsAndHexValue = function (c, e) {if (c < 0 || 7 < c) {throw "unused bits shall be from 0 to 7: u = " + c;}var d = "0" + c;this.hTLV = null;this.isModified = true;this.hV = d + e;};this.setByBinaryString = function (e) {e = e.replace(/0+$/, "");var f = 8 - e.length % 8;if (f == 8) {f = 0;}for (var g = 0; g <= f; g++) {e += "0";}var j = "";for (var g = 0; g < e.length - 1; g += 8) {var d = e.substr(g, 8);var c = parseInt(d, 2).toString(16);if (c.length == 1) {c = "0" + c;}j += c;}this.hTLV = null;this.isModified = true;this.hV = "0" + f + j;};this.setByBooleanArray = function (e) {var d = "";for (var c = 0; c < e.length; c++) {if (e[c] == true) {d += "1";} else {d += "0";}}this.setByBinaryString(d);};this.newFalseArray = function (e) {var c = new Array(e);for (var d = 0; d < e; d++) {c[d] = false;}return c;};this.getFreshValueHex = function () {return this.hV;};if (typeof b != "undefined") {if (typeof b == "string" && b.toLowerCase().match(/^[0-9a-f]+$/)) {this.setHexValueIncludingUnusedBits(b);} else {if (typeof b.hex != "undefined") {this.setHexValueIncludingUnusedBits(b.hex);} else {if (typeof b.bin != "undefined") {this.setByBinaryString(b.bin);} else {if (typeof b.array != "undefined") {this.setByBooleanArray(b.array);}}}}}};YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);KJUR.asn1.DEROctetString = function (b) {if (b !== undefined && typeof b.obj !== "undefined") {var a = KJUR.asn1.ASN1Util.newObject(b.obj);b.hex = a.getEncodedHex();}KJUR.asn1.DEROctetString.superclass.constructor.call(this, b);this.hT = "04";};YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);KJUR.asn1.DERNull = function () {KJUR.asn1.DERNull.superclass.constructor.call(this);this.hT = "05";this.hTLV = "0500";};YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);KJUR.asn1.DERObjectIdentifier = function (a) {KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);this.hT = "06";this.setValueHex = function (b) {this.hTLV = null;this.isModified = true;this.s = null;this.hV = b;};this.setValueOidString = function (b) {var c = oidtohex(b);if (c == null) {throw new Error("malformed oid string: " + b);}this.hTLV = null;this.isModified = true;this.s = null;this.hV = c;};this.setValueName = function (c) {var b = KJUR.asn1.x509.OID.name2oid(c);if (b !== "") {this.setValueOidString(b);} else {throw new Error("DERObjectIdentifier oidName undefined: " + c);}};this.setValueNameOrOid = function (b) {if (b.match(/^[0-2].[0-9.]+$/)) {this.setValueOidString(b);} else {this.setValueName(b);}};this.getFreshValueHex = function () {return this.hV;};this.setByParam = function (b) {if (typeof b === "string") {this.setValueNameOrOid(b);} else {if (b.oid !== undefined) {this.setValueNameOrOid(b.oid);} else {if (b.name !== undefined) {this.setValueNameOrOid(b.name);} else {if (b.hex !== undefined) {this.setValueHex(b.hex);}}}}};if (a !== undefined) {this.setByParam(a);}};YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);KJUR.asn1.DEREnumerated = function (a) {KJUR.asn1.DEREnumerated.superclass.constructor.call(this);this.hT = "0a";this.setByBigInteger = function (b) {this.hTLV = null;this.isModified = true;this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(b);};this.setByInteger = function (c) {var b = new BigInteger(String(c), 10);this.setByBigInteger(b);};this.setValueHex = function (b) {this.hV = b;};this.getFreshValueHex = function () {return this.hV;};if (typeof a != "undefined") {if (typeof a["int"] != "undefined") {this.setByInteger(a["int"]);} else {if (typeof a == "number") {this.setByInteger(a);} else {if (typeof a.hex != "undefined") {this.setValueHex(a.hex);}}}}};YAHOO.lang.extend(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object);KJUR.asn1.DERUTF8String = function (a) {KJUR.asn1.DERUTF8String.superclass.constructor.call(this, a);this.hT = "0c";};YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);KJUR.asn1.DERNumericString = function (a) {KJUR.asn1.DERNumericString.superclass.constructor.call(this, a);this.hT = "12";};YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);KJUR.asn1.DERPrintableString = function (a) {KJUR.asn1.DERPrintableString.superclass.constructor.call(this, a);this.hT = "13";};YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);KJUR.asn1.DERTeletexString = function (a) {KJUR.asn1.DERTeletexString.superclass.constructor.call(this, a);this.hT = "14";};YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);KJUR.asn1.DERIA5String = function (a) {KJUR.asn1.DERIA5String.superclass.constructor.call(this, a);this.hT = "16";};YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);KJUR.asn1.DERVisibleString = function (a) {KJUR.asn1.DERIA5String.superclass.constructor.call(this, a);this.hT = "1a";};YAHOO.lang.extend(KJUR.asn1.DERVisibleString, KJUR.asn1.DERAbstractString);KJUR.asn1.DERBMPString = function (a) {KJUR.asn1.DERBMPString.superclass.constructor.call(this, a);this.hT = "1e";};YAHOO.lang.extend(KJUR.asn1.DERBMPString, KJUR.asn1.DERAbstractString);KJUR.asn1.DERUTCTime = function (a) {KJUR.asn1.DERUTCTime.superclass.constructor.call(this, a);this.hT = "17";this.setByDate = function (b) {this.hTLV = null;this.isModified = true;this.date = b;this.s = this.formatDate(this.date, "utc");this.hV = stohex(this.s);};this.getFreshValueHex = function () {if (typeof this.date == "undefined" && typeof this.s == "undefined") {this.date = new Date();this.s = this.formatDate(this.date, "utc");this.hV = stohex(this.s);}return this.hV;};if (a !== undefined) {if (a.str !== undefined) {this.setString(a.str);} else {if (typeof a == "string" && a.match(/^[0-9]{12}Z$/)) {this.setString(a);} else {if (a.hex !== undefined) {this.setStringHex(a.hex);} else {if (a.date !== undefined) {this.setByDate(a.date);}}}}}};YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);KJUR.asn1.DERGeneralizedTime = function (a) {KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, a);this.hT = "18";this.withMillis = false;this.setByDate = function (b) {this.hTLV = null;this.isModified = true;this.date = b;this.s = this.formatDate(this.date, "gen", this.withMillis);this.hV = stohex(this.s);};this.getFreshValueHex = function () {if (this.date === undefined && this.s === undefined) {this.date = new Date();this.s = this.formatDate(this.date, "gen", this.withMillis);this.hV = stohex(this.s);}return this.hV;};if (a !== undefined) {if (a.str !== undefined) {this.setString(a.str);} else {if (typeof a == "string" && a.match(/^[0-9]{14}Z$/)) {this.setString(a);} else {if (a.hex !== undefined) {this.setStringHex(a.hex);} else {if (a.date !== undefined) {this.setByDate(a.date);}}}}if (a.millis === true) {this.withMillis = true;}}};YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);KJUR.asn1.DERSequence = function (a) {KJUR.asn1.DERSequence.superclass.constructor.call(this, a);this.hT = "30";this.getFreshValueHex = function () {var c = "";for (var b = 0; b < this.asn1Array.length; b++) {var d = this.asn1Array[b];c += d.getEncodedHex();}this.hV = c;return this.hV;};};YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);KJUR.asn1.DERSet = function (a) {KJUR.asn1.DERSet.superclass.constructor.call(this, a);this.hT = "31";this.sortFlag = true;this.getFreshValueHex = function () {var b = new Array();for (var c = 0; c < this.asn1Array.length; c++) {var d = this.asn1Array[c];b.push(d.getEncodedHex());}if (this.sortFlag == true) {b.sort();}this.hV = b.join("");return this.hV;};if (typeof a != "undefined") {if (typeof a.sortflag != "undefined" && a.sortflag == false) {this.sortFlag = false;}}};YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);KJUR.asn1.DERTaggedObject = function (b) {KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);var a = KJUR.asn1;this.hT = "a0";this.hV = "";this.isExplicit = true;this.asn1Object = null;this.setASN1Object = function (c, d, e) {this.hT = d;this.isExplicit = c;this.asn1Object = e;if (this.isExplicit) {this.hV = this.asn1Object.getEncodedHex();this.hTLV = null;this.isModified = true;} else {this.hV = null;this.hTLV = e.getEncodedHex();this.hTLV = this.hTLV.replace(/^../, d);this.isModified = false;}};this.getFreshValueHex = function () {return this.hV;};this.setByParam = function (c) {if (c.tag != undefined) {this.hT = c.tag;}if (c.explicit != undefined) {this.isExplicit = c.explicit;}if (c.tage != undefined) {this.hT = c.tage;this.isExplicit = true;}if (c.tagi != undefined) {this.hT = c.tagi;this.isExplicit = false;}if (c.obj != undefined) {if (c.obj instanceof a.ASN1Object) {this.asn1Object = c.obj;this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);} else {if (typeof c.obj == "object") {this.asn1Object = a.ASN1Util.newObject(c.obj);this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);}}}};if (b != undefined) {this.setByParam(b);}};YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
var ASN1HEX = new function () {}();ASN1HEX.getLblen = function (c, a) {if (c.substr(a + 2, 1) != "8") {return 1;}var b = parseInt(c.substr(a + 3, 1));if (b == 0) {return -1;}if (0 < b && b < 10) {return b + 1;}return -2;};ASN1HEX.getL = function (c, b) {var a = ASN1HEX.getLblen(c, b);if (a < 1) {return "";}return c.substr(b + 2, a * 2);};ASN1HEX.getVblen = function (d, a) {var c, b;c = ASN1HEX.getL(d, a);if (c == "") {return -1;}if (c.substr(0, 1) === "8") {b = new BigInteger(c.substr(2), 16);} else {b = new BigInteger(c, 16);}return b.intValue();};ASN1HEX.getVidx = function (c, b) {var a = ASN1HEX.getLblen(c, b);if (a < 0) {return a;}return b + (a + 1) * 2;};ASN1HEX.getV = function (d, a) {var c = ASN1HEX.getVidx(d, a);var b = ASN1HEX.getVblen(d, a);return d.substr(c, b * 2);};ASN1HEX.getTLV = function (b, a) {return b.substr(a, 2) + ASN1HEX.getL(b, a) + ASN1HEX.getV(b, a);};ASN1HEX.getTLVblen = function (b, a) {return 2 + ASN1HEX.getLblen(b, a) * 2 + ASN1HEX.getVblen(b, a) * 2;};ASN1HEX.getNextSiblingIdx = function (d, a) {var c = ASN1HEX.getVidx(d, a);var b = ASN1HEX.getVblen(d, a);return c + b * 2;};ASN1HEX.getChildIdx = function (e, k) {var l = ASN1HEX;var j = [];var c, f, g;c = l.getVidx(e, k);f = l.getVblen(e, k) * 2;if (e.substr(k, 2) == "03") {c += 2;f -= 2;}g = 0;var d = c;while (g <= f) {var b = l.getTLVblen(e, d);g += b;if (g <= f) {j.push(d);}d += b;if (g >= f) {break;}}return j;};ASN1HEX.getNthChildIdx = function (d, b, e) {var c = ASN1HEX.getChildIdx(d, b);return c[e];};ASN1HEX.getIdxbyList = function (e, d, c, i) {var g = ASN1HEX;var f, b;if (c.length == 0) {if (i !== undefined) {if (e.substr(d, 2) !== i) {return -1;}}return d;}f = c.shift();b = g.getChildIdx(e, d);if (f >= b.length) {return -1;}return g.getIdxbyList(e, b[f], c, i);};ASN1HEX.getIdxbyListEx = function (f, k, b, g) {var m = ASN1HEX;var d, l;if (b.length == 0) {if (g !== undefined) {if (f.substr(k, 2) !== g) {return -1;}}return k;}d = b.shift();l = m.getChildIdx(f, k);var j = 0;for (var e = 0; e < l.length; e++) {var c = f.substr(l[e], 2);if (typeof d == "number" && !m.isContextTag(c) && j == d || typeof d == "string" && m.isContextTag(c, d)) {return m.getIdxbyListEx(f, l[e], b, g);}if (!m.isContextTag(c)) {j++;}}return -1;};ASN1HEX.getTLVbyList = function (d, c, b, f) {var e = ASN1HEX;var a = e.getIdxbyList(d, c, b, f);if (a == -1) {return null;}if (a >= d.length) {return null;}return e.getTLV(d, a);};ASN1HEX.getTLVbyListEx = function (d, c, b, f) {var e = ASN1HEX;var a = e.getIdxbyListEx(d, c, b, f);if (a == -1) {return null;}return e.getTLV(d, a);};ASN1HEX.getVbyList = function (e, c, b, g, i) {var f = ASN1HEX;var a, d;a = f.getIdxbyList(e, c, b, g);if (a == -1) {return null;}if (a >= e.length) {return null;}d = f.getV(e, a);if (i === true) {d = d.substr(2);}return d;};ASN1HEX.getVbyListEx = function (b, e, a, d, f) {var j = ASN1HEX;var g, c, i;g = j.getIdxbyListEx(b, e, a, d);if (g == -1) {return null;}i = j.getV(b, g);if (b.substr(g, 2) == "03" && f !== false) {i = i.substr(2);}return i;};ASN1HEX.getInt = function (e, b, f) {if (f == undefined) {f = -1;}try {var c = e.substr(b, 2);if (c != "02" && c != "03") {return f;}var a = ASN1HEX.getV(e, b);if (c == "02") {return parseInt(a, 16);} else {return bitstrtoint(a);}} catch (d) {return f;}};ASN1HEX.getOID = function (c, a, d) {if (d == undefined) {d = null;}try {if (c.substr(a, 2) != "06") {return d;}var e = ASN1HEX.getV(c, a);return hextooid(e);} catch (b) {return d;}};ASN1HEX.getOIDName = function (d, a, f) {if (f == undefined) {f = null;}try {var e = ASN1HEX.getOID(d, a, f);if (e == f) {return f;}var b = KJUR.asn1.x509.OID.oid2name(e);if (b == "") {return e;}return b;} catch (c) {return f;}};ASN1HEX.getString = function (d, b, e) {if (e == undefined) {e = null;}try {var a = ASN1HEX.getV(d, b);return hextorstr(a);} catch (c) {return e;}};ASN1HEX.hextooidstr = function (e) {var h = function h(b, a) {if (b.length >= a) {return b;}return new Array(a - b.length + 1).join("0") + b;};var l = [];var o = e.substr(0, 2);var f = parseInt(o, 16);l[0] = new String(Math.floor(f / 40));l[1] = new String(f % 40);var m = e.substr(2);var k = [];for (var g = 0; g < m.length / 2; g++) {k.push(parseInt(m.substr(g * 2, 2), 16));}var j = [];var d = "";for (var g = 0; g < k.length; g++) {if (k[g] & 128) {d = d + h((k[g] & 127).toString(2), 7);} else {d = d + h((k[g] & 127).toString(2), 7);j.push(new String(parseInt(d, 2)));d = "";}}var n = l.join(".");if (j.length > 0) {n = n + "." + j.join(".");}return n;};ASN1HEX.dump = function (t, c, l, g) {var p = ASN1HEX;var j = p.getV;var y = p.dump;var w = p.getChildIdx;var e = t;if (t instanceof KJUR.asn1.ASN1Object) {e = t.getEncodedHex();}var q = function q(A, i) {if (A.length <= i * 2) {return A;} else {var v = A.substr(0, i) + "..(total " + A.length / 2 + "bytes).." + A.substr(A.length - i, i);return v;}};if (c === undefined) {c = { ommit_long_octet: 32 };}if (l === undefined) {l = 0;}if (g === undefined) {g = "";}var x = c.ommit_long_octet;var z = e.substr(l, 2);if (z == "01") {var h = j(e, l);if (h == "00") {return g + "BOOLEAN FALSE\n";} else {return g + "BOOLEAN TRUE\n";}}if (z == "02") {var h = j(e, l);return g + "INTEGER " + q(h, x) + "\n";}if (z == "03") {var h = j(e, l);if (p.isASN1HEX(h.substr(2))) {var k = g + "BITSTRING, encapsulates\n";k = k + y(h.substr(2), c, 0, g + "  ");return k;} else {return g + "BITSTRING " + q(h, x) + "\n";}}if (z == "04") {var h = j(e, l);if (p.isASN1HEX(h)) {var k = g + "OCTETSTRING, encapsulates\n";k = k + y(h, c, 0, g + "  ");return k;} else {return g + "OCTETSTRING " + q(h, x) + "\n";}}if (z == "05") {return g + "NULL\n";}if (z == "06") {var m = j(e, l);var b = KJUR.asn1.ASN1Util.oidHexToInt(m);var o = KJUR.asn1.x509.OID.oid2name(b);var a = b.replace(/\./g, " ");if (o != "") {return g + "ObjectIdentifier " + o + " (" + a + ")\n";} else {return g + "ObjectIdentifier (" + a + ")\n";}}if (z == "0a") {return g + "ENUMERATED " + parseInt(j(e, l)) + "\n";}if (z == "0c") {return g + "UTF8String '" + hextoutf8(j(e, l)) + "'\n";}if (z == "13") {return g + "PrintableString '" + hextoutf8(j(e, l)) + "'\n";}if (z == "14") {return g + "TeletexString '" + hextoutf8(j(e, l)) + "'\n";}if (z == "16") {return g + "IA5String '" + hextoutf8(j(e, l)) + "'\n";}if (z == "17") {return g + "UTCTime " + hextoutf8(j(e, l)) + "\n";}if (z == "18") {return g + "GeneralizedTime " + hextoutf8(j(e, l)) + "\n";}if (z == "1a") {return g + "VisualString '" + hextoutf8(j(e, l)) + "'\n";}if (z == "1e") {return g + "BMPString '" + hextoutf8(j(e, l)) + "'\n";}if (z == "30") {if (e.substr(l, 4) == "3000") {return g + "SEQUENCE {}\n";}var k = g + "SEQUENCE\n";var d = w(e, l);var f = c;if ((d.length == 2 || d.length == 3) && e.substr(d[0], 2) == "06" && e.substr(d[d.length - 1], 2) == "04") {var o = p.oidname(j(e, d[0]));var r = JSON.parse(JSON.stringify(c));r.x509ExtName = o;f = r;}for (var u = 0; u < d.length; u++) {k = k + y(e, f, d[u], g + "  ");}return k;}if (z == "31") {var k = g + "SET\n";var d = w(e, l);for (var u = 0; u < d.length; u++) {k = k + y(e, c, d[u], g + "  ");}return k;}var z = parseInt(z, 16);if ((z & 128) != 0) {var n = z & 31;if ((z & 32) != 0) {var k = g + "[" + n + "]\n";var d = w(e, l);for (var u = 0; u < d.length; u++) {k = k + y(e, c, d[u], g + "  ");}return k;} else {var h = j(e, l);if (ASN1HEX.isASN1HEX(h)) {var k = g + "[" + n + "]\n";k = k + y(h, c, 0, g + "  ");return k;} else {if (h.substr(0, 8) == "68747470") {h = hextoutf8(h);} else {if (c.x509ExtName === "subjectAltName" && n == 2) {h = hextoutf8(h);}}}var k = g + "[" + n + "] " + h + "\n";return k;}}return g + "UNKNOWN(" + z + ") " + j(e, l) + "\n";};ASN1HEX.isContextTag = function (c, b) {c = c.toLowerCase();var f, e;try {f = parseInt(c, 16);} catch (d) {return -1;}if (b === undefined) {if ((f & 192) == 128) {return true;} else {return false;}}try {var a = b.match(/^\[[0-9]+\]$/);if (a == null) {return false;}e = parseInt(b.substr(1, b.length - 1), 10);if (e > 31) {return false;}if ((f & 192) == 128 && (f & 31) == e) {return true;}return false;} catch (d) {return false;}};ASN1HEX.isASN1HEX = function (e) {var d = ASN1HEX;if (e.length % 2 == 1) {return false;}var c = d.getVblen(e, 0);var b = e.substr(0, 2);var f = d.getL(e, 0);var a = e.length - b.length - f.length;if (a == c * 2) {return true;}return false;};ASN1HEX.checkStrictDER = function (g, o, d, c, r) {var s = ASN1HEX;if (d === undefined) {if (typeof g != "string") {throw new Error("not hex string");}g = g.toLowerCase();if (!KJUR.lang.String.isHex(g)) {throw new Error("not hex string");}d = g.length;c = g.length / 2;if (c < 128) {r = 1;} else {r = Math.ceil(c.toString(16)) + 1;}}var k = s.getL(g, o);if (k.length > r * 2) {throw new Error("L of TLV too long: idx=" + o);}var n = s.getVblen(g, o);if (n > c) {throw new Error("value of L too long than hex: idx=" + o);}var q = s.getTLV(g, o);var f = q.length - 2 - s.getL(g, o).length;if (f !== n * 2) {throw new Error("V string length and L's value not the same:" + f + "/" + n * 2);}if (o === 0) {if (g.length != q.length) {throw new Error("total length and TLV length unmatch:" + g.length + "!=" + q.length);}}var b = g.substr(o, 2);if (b === "02") {var a = s.getVidx(g, o);if (g.substr(a, 2) == "00" && g.charCodeAt(a + 2) < 56) {throw new Error("not least zeros for DER INTEGER");}}if (parseInt(b, 16) & 32) {var p = s.getVblen(g, o);var m = 0;var l = s.getChildIdx(g, o);for (var e = 0; e < l.length; e++) {var j = s.getTLV(g, l[e]);m += j.length;s.checkStrictDER(g, l[e], d, c, r);}if (p * 2 != m) {throw new Error("sum of children's TLV length and L unmatch: " + p * 2 + "!=" + m);}}};ASN1HEX.oidname = function (a) {var c = KJUR.asn1;if (KJUR.lang.String.isHex(a)) {a = c.ASN1Util.oidHexToInt(a);}var b = c.x509.OID.oid2name(a);if (b === "") {b = a;}return b;};
if (typeof KJUR == "undefined" || !KJUR) {KJUR = {};}if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {KJUR.asn1 = {};}if (typeof KJUR.asn1.x509 == "undefined" || !KJUR.asn1.x509) {KJUR.asn1.x509 = {};}KJUR.asn1.x509.Certificate = function (h) {KJUR.asn1.x509.Certificate.superclass.constructor.call(this);var d = KJUR,c = d.asn1,f = c.DERBitString,b = c.DERSequence,g = c.x509,a = g.TBSCertificate,e = g.AlgorithmIdentifier;this.params = undefined;this.setByParam = function (i) {this.params = i;};this.sign = function () {var l = this.params;var k = l.sigalg;if (l.sigalg.name != undefined) {k = l.sigalg.name;}var i = l.tbsobj.getEncodedHex();var j = new KJUR.crypto.Signature({ alg: k });j.init(l.cakey);j.updateHex(i);l.sighex = j.sign();};this.getPEM = function () {return hextopem(this.getEncodedHex(), "CERTIFICATE");};this.getEncodedHex = function () {var k = this.params;if (k.tbsobj == undefined || k.tbsobj == null) {k.tbsobj = new a(k);}if (k.sighex == undefined && k.cakey != undefined) {this.sign();}if (k.sighex == undefined) {throw new Error("sighex or cakey parameter not defined");}var i = [];i.push(k.tbsobj);i.push(new e({ name: k.sigalg }));i.push(new f({ hex: "00" + k.sighex }));var j = new b({ array: i });return j.getEncodedHex();};if (h != undefined) {this.params = h;}};YAHOO.lang.extend(KJUR.asn1.x509.Certificate, KJUR.asn1.ASN1Object);KJUR.asn1.x509.TBSCertificate = function (f) {KJUR.asn1.x509.TBSCertificate.superclass.constructor.call(this);var b = KJUR,i = b.asn1,d = i.x509,c = i.DERTaggedObject,h = i.DERInteger,g = i.DERSequence,l = d.AlgorithmIdentifier,e = d.Time,a = d.X500Name,j = d.Extensions,k = d.SubjectPublicKeyInfo;this.params = null;this.setByParam = function (m) {this.params = m;};this.getEncodedHex = function () {var n = [];var q = this.params;if (q.version != undefined || q.version != 1) {var m = 2;if (q.version != undefined) {m = q.version - 1;}var p = new c({ obj: new h({ "int": m }) });n.push(p);}n.push(new h(q.serial));n.push(new l({ name: q.sigalg }));n.push(new a(q.issuer));n.push(new g({ array: [new e(q.notbefore), new e(q.notafter)] }));n.push(new a(q.subject));n.push(new k(KEYUTIL.getKey(q.sbjpubkey)));if (q.ext !== undefined && q.ext.length > 0) {n.push(new c({ tag: "a3", obj: new j(q.ext) }));}var o = new KJUR.asn1.DERSequence({ array: n });return o.getEncodedHex();};if (f !== undefined) {this.setByParam(f);}};YAHOO.lang.extend(KJUR.asn1.x509.TBSCertificate, KJUR.asn1.ASN1Object);KJUR.asn1.x509.Extensions = function (d) {KJUR.asn1.x509.Extensions.superclass.constructor.call(this);var c = KJUR,b = c.asn1,a = b.DERSequence,e = b.x509;this.aParam = [];this.setByParam = function (f) {this.aParam = f;};this.getEncodedHex = function () {var f = [];for (var h = 0; h < this.aParam.length; h++) {var l = this.aParam[h];var k = l.extname;var j = null;if (l.extn != undefined) {j = new e.PrivateExtension(l);} else {if (k == "subjectKeyIdentifier") {j = new e.SubjectKeyIdentifier(l);} else {if (k == "keyUsage") {j = new e.KeyUsage(l);} else {if (k == "subjectAltName") {j = new e.SubjectAltName(l);} else {if (k == "issuerAltName") {j = new e.IssuerAltName(l);} else {if (k == "basicConstraints") {j = new e.BasicConstraints(l);} else {if (k == "cRLDistributionPoints") {j = new e.CRLDistributionPoints(l);} else {if (k == "certificatePolicies") {j = new e.CertificatePolicies(l);} else {if (k == "authorityKeyIdentifier") {j = new e.AuthorityKeyIdentifier(l);} else {if (k == "extKeyUsage") {j = new e.ExtKeyUsage(l);} else {if (k == "authorityInfoAccess") {j = new e.AuthorityInfoAccess(l);} else {if (k == "cRLNumber") {j = new e.CRLNumber(l);} else {if (k == "cRLReason") {j = new e.CRLReason(l);} else {if (k == "ocspNonce") {j = new e.OCSPNonce(l);} else {if (k == "ocspNoCheck") {j = new e.OCSPNoCheck(l);} else {if (k == "adobeTimeStamp") {j = new e.AdobeTimeStamp(l);} else {throw new Error("extension not supported:" + JSON.stringify(l));}}}}}}}}}}}}}}}}if (j != null) {f.push(j);}}var g = new a({ array: f });return g.getEncodedHex();};if (d != undefined) {this.setByParam(d);}};YAHOO.lang.extend(KJUR.asn1.x509.Extensions, KJUR.asn1.ASN1Object);KJUR.asn1.x509.Extension = function (d) {KJUR.asn1.x509.Extension.superclass.constructor.call(this);var f = null,a = KJUR,e = a.asn1,h = e.DERObjectIdentifier,i = e.DEROctetString,b = e.DERBitString,g = e.DERBoolean,c = e.DERSequence;this.getEncodedHex = function () {var m = new h({ oid: this.oid });var l = new i({ hex: this.getExtnValueHex() });var k = new Array();k.push(m);if (this.critical) {k.push(new g());}k.push(l);var j = new c({ array: k });return j.getEncodedHex();};this.critical = false;if (d !== undefined) {if (d.critical !== undefined) {this.critical = d.critical;}}};YAHOO.lang.extend(KJUR.asn1.x509.Extension, KJUR.asn1.ASN1Object);KJUR.asn1.x509.KeyUsage = function (f) {KJUR.asn1.x509.KeyUsage.superclass.constructor.call(this, f);var a = X509.KEYUSAGE_NAME;this.getExtnValueHex = function () {return this.asn1ExtnValue.getEncodedHex();};this.oid = "2.5.29.15";if (f !== undefined) {if (f.bin !== undefined) {this.asn1ExtnValue = new KJUR.asn1.DERBitString(f);}if (f.names !== undefined && f.names.length !== undefined) {var e = f.names;var d = "000000000";for (var c = 0; c < e.length; c++) {for (var b = 0; b < a.length; b++) {if (e[c] === a[b]) {d = d.substring(0, b) + "1" + d.substring(b + 1, d.length);}}}this.asn1ExtnValue = new KJUR.asn1.DERBitString({ bin: d });}}};YAHOO.lang.extend(KJUR.asn1.x509.KeyUsage, KJUR.asn1.x509.Extension);KJUR.asn1.x509.BasicConstraints = function (g) {KJUR.asn1.x509.BasicConstraints.superclass.constructor.call(this, g);var c = KJUR.asn1,e = c.DERBoolean,f = c.DERInteger,b = c.DERSequence;var a = false;var d = -1;this.getExtnValueHex = function () {var i = new Array();if (this.cA) {i.push(new e());}if (this.pathLen > -1) {i.push(new f({ "int": this.pathLen }));}var h = new b({ array: i });this.asn1ExtnValue = h;return this.asn1ExtnValue.getEncodedHex();};this.oid = "2.5.29.19";this.cA = false;this.pathLen = -1;if (g !== undefined) {if (g.cA !== undefined) {this.cA = g.cA;}if (g.pathLen !== undefined) {this.pathLen = g.pathLen;}}};YAHOO.lang.extend(KJUR.asn1.x509.BasicConstraints, KJUR.asn1.x509.Extension);KJUR.asn1.x509.CRLDistributionPoints = function (d) {KJUR.asn1.x509.CRLDistributionPoints.superclass.constructor.call(this, d);var b = KJUR,a = b.asn1,c = a.x509;this.getExtnValueHex = function () {return this.asn1ExtnValue.getEncodedHex();};this.setByDPArray = function (e) {var f = [];for (var g = 0; g < e.length; g++) {if (e[g] instanceof KJUR.asn1.ASN1Object) {f.push(e[g]);} else {var h = new c.DistributionPoint(e[g]);f.push(h);}}this.asn1ExtnValue = new a.DERSequence({ array: f });};this.setByOneURI = function (f) {var e = new c.DistributionPoint({ fulluri: f });this.setByDPArray([e]);};this.oid = "2.5.29.31";if (d !== undefined) {if (d.array !== undefined) {this.setByDPArray(d.array);} else {if (d.uri !== undefined) {this.setByOneURI(d.uri);}}}};YAHOO.lang.extend(KJUR.asn1.x509.CRLDistributionPoints, KJUR.asn1.x509.Extension);KJUR.asn1.x509.DistributionPoint = function (e) {KJUR.asn1.x509.DistributionPoint.superclass.constructor.call(this);var a = null,c = KJUR,b = c.asn1,d = b.x509.DistributionPointName;this.getEncodedHex = function () {var f = new b.DERSequence();if (this.asn1DP != null) {var g = new b.DERTaggedObject({ explicit: true, tag: "a0", obj: this.asn1DP });f.appendASN1Object(g);}this.hTLV = f.getEncodedHex();return this.hTLV;};if (e !== undefined) {if (e.dpobj !== undefined) {this.asn1DP = e.dpobj;} else {if (e.dpname !== undefined) {this.asn1DP = new d(e.dpname);} else {if (e.fulluri !== undefined) {this.asn1DP = new d({ full: [{ uri: e.fulluri }] });}}}}};YAHOO.lang.extend(KJUR.asn1.x509.DistributionPoint, KJUR.asn1.ASN1Object);KJUR.asn1.x509.DistributionPointName = function (h) {KJUR.asn1.x509.DistributionPointName.superclass.constructor.call(this);var g = null,d = null,a = null,f = null,c = KJUR,b = c.asn1,e = b.DERTaggedObject;this.getEncodedHex = function () {if (this.type != "full") {throw new Error("currently type shall be 'full': " + this.type);}this.asn1Obj = new e({ explicit: false, tag: this.tag, obj: this.asn1V });this.hTLV = this.asn1Obj.getEncodedHex();return this.hTLV;};if (h !== undefined) {if (b.x509.GeneralNames.prototype.isPrototypeOf(h)) {this.type = "full";this.tag = "a0";this.asn1V = h;} else {if (h.full !== undefined) {this.type = "full";this.tag = "a0";this.asn1V = new b.x509.GeneralNames(h.full);} else {throw new Error("This class supports GeneralNames only as argument");}}}};YAHOO.lang.extend(KJUR.asn1.x509.DistributionPointName, KJUR.asn1.ASN1Object);KJUR.asn1.x509.CertificatePolicies = function (f) {KJUR.asn1.x509.CertificatePolicies.superclass.constructor.call(this, f);var c = KJUR,b = c.asn1,e = b.x509,a = b.DERSequence,d = e.PolicyInformation;this.params = null;this.getExtnValueHex = function () {var j = [];for (var h = 0; h < this.params.array.length; h++) {j.push(new d(this.params.array[h]));}var g = new a({ array: j });this.asn1ExtnValue = g;return this.asn1ExtnValue.getEncodedHex();};this.oid = "2.5.29.32";if (f !== undefined) {this.params = f;}};YAHOO.lang.extend(KJUR.asn1.x509.CertificatePolicies, KJUR.asn1.x509.Extension);KJUR.asn1.x509.PolicyInformation = function (d) {KJUR.asn1.x509.PolicyInformation.superclass.constructor.call(this, d);var c = KJUR.asn1,b = c.DERSequence,e = c.DERObjectIdentifier,a = c.x509.PolicyQualifierInfo;this.params = null;this.getEncodedHex = function () {if (this.params.policyoid === undefined && this.params.array === undefined) {throw new Error("parameter oid and array missing");}var f = [new e(this.params.policyoid)];if (this.params.array !== undefined) {var j = [];for (var h = 0; h < this.params.array.length; h++) {j.push(new a(this.params.array[h]));}if (j.length > 0) {f.push(new b({ array: j }));}}var g = new b({ array: f });return g.getEncodedHex();};if (d !== undefined) {this.params = d;}};YAHOO.lang.extend(KJUR.asn1.x509.PolicyInformation, KJUR.asn1.ASN1Object);KJUR.asn1.x509.PolicyQualifierInfo = function (e) {KJUR.asn1.x509.PolicyQualifierInfo.superclass.constructor.call(this, e);var c = KJUR.asn1,b = c.DERSequence,d = c.DERIA5String,f = c.DERObjectIdentifier,a = c.x509.UserNotice;this.params = null;this.getEncodedHex = function () {if (this.params.cps !== undefined) {var g = new b({ array: [new f({ oid: "1.3.6.1.5.5.7.2.1" }), new d({ str: this.params.cps })] });return g.getEncodedHex();}if (this.params.unotice != undefined) {var g = new b({ array: [new f({ oid: "1.3.6.1.5.5.7.2.2" }), new a(this.params.unotice)] });return g.getEncodedHex();}};if (e !== undefined) {this.params = e;}};YAHOO.lang.extend(KJUR.asn1.x509.PolicyQualifierInfo, KJUR.asn1.ASN1Object);KJUR.asn1.x509.UserNotice = function (e) {KJUR.asn1.x509.UserNotice.superclass.constructor.call(this, e);var a = KJUR.asn1.DERSequence,d = KJUR.asn1.DERInteger,c = KJUR.asn1.x509.DisplayText,b = KJUR.asn1.x509.NoticeReference;this.params = null;this.getEncodedHex = function () {var f = [];if (this.params.noticeref !== undefined) {f.push(new b(this.params.noticeref));}if (this.params.exptext !== undefined) {f.push(new c(this.params.exptext));}var g = new a({ array: f });return g.getEncodedHex();};if (e !== undefined) {this.params = e;}};YAHOO.lang.extend(KJUR.asn1.x509.UserNotice, KJUR.asn1.ASN1Object);KJUR.asn1.x509.NoticeReference = function (d) {KJUR.asn1.x509.NoticeReference.superclass.constructor.call(this, d);var a = KJUR.asn1.DERSequence,c = KJUR.asn1.DERInteger,b = KJUR.asn1.x509.DisplayText;this.params = null;this.getEncodedHex = function () {var f = [];if (this.params.org !== undefined) {f.push(new b(this.params.org));}if (this.params.noticenum !== undefined) {var h = [];var e = this.params.noticenum;for (var j = 0; j < e.length; j++) {h.push(new c(e[j]));}f.push(new a({ array: h }));}if (f.length == 0) {throw new Error("parameter is empty");}var g = new a({ array: f });return g.getEncodedHex();};if (d !== undefined) {this.params = d;}};YAHOO.lang.extend(KJUR.asn1.x509.NoticeReference, KJUR.asn1.ASN1Object);KJUR.asn1.x509.DisplayText = function (a) {KJUR.asn1.x509.DisplayText.superclass.constructor.call(this, a);this.hT = "0c";if (a !== undefined) {if (a.type === "ia5") {this.hT = "16";} else {if (a.type === "vis") {this.hT = "1a";} else {if (a.type === "bmp") {this.hT = "1e";}}}}};YAHOO.lang.extend(KJUR.asn1.x509.DisplayText, KJUR.asn1.DERAbstractString);KJUR.asn1.x509.ExtKeyUsage = function (c) {KJUR.asn1.x509.ExtKeyUsage.superclass.constructor.call(this, c);var b = KJUR,a = b.asn1;this.setPurposeArray = function (d) {this.asn1ExtnValue = new a.DERSequence();for (var e = 0; e < d.length; e++) {var f = new a.DERObjectIdentifier(d[e]);this.asn1ExtnValue.appendASN1Object(f);}};this.getExtnValueHex = function () {return this.asn1ExtnValue.getEncodedHex();};this.oid = "2.5.29.37";if (c !== undefined) {if (c.array !== undefined) {this.setPurposeArray(c.array);}}};YAHOO.lang.extend(KJUR.asn1.x509.ExtKeyUsage, KJUR.asn1.x509.Extension);KJUR.asn1.x509.AuthorityKeyIdentifier = function (f) {KJUR.asn1.x509.AuthorityKeyIdentifier.superclass.constructor.call(this, f);var b = KJUR,a = b.asn1,d = a.DERTaggedObject,e = a.x509.GeneralNames,c = b.crypto.Util.isKey;this.asn1KID = null;this.asn1CertIssuer = null;this.asn1CertSN = null;this.getExtnValueHex = function () {var h = new Array();if (this.asn1KID) {h.push(new d({ explicit: false, tag: "80", obj: this.asn1KID }));}if (this.asn1CertIssuer) {h.push(new d({ explicit: false, tag: "a1", obj: new e([{ dn: this.asn1CertIssuer }]) }));}if (this.asn1CertSN) {h.push(new d({ explicit: false, tag: "82", obj: this.asn1CertSN }));}var g = new a.DERSequence({ array: h });this.asn1ExtnValue = g;return this.asn1ExtnValue.getEncodedHex();};this.setKIDByParam = function (i) {if (i.str !== undefined || i.hex !== undefined) {this.asn1KID = new KJUR.asn1.DEROctetString(i);} else {if (typeof i === "object" && KJUR.crypto.Util.isKey(i) || typeof i === "string" && i.indexOf("BEGIN ") != -1) {var h = i;if (typeof i === "string") {h = KEYUTIL.getKey(i);}var g = KEYUTIL.getKeyID(h);this.asn1KID = new KJUR.asn1.DEROctetString({ hex: g });}}};this.setCertIssuerByParam = function (g) {if (g.str !== undefined || g.ldapstr !== undefined || g.hex !== undefined || g.certsubject !== undefined || g.certissuer !== undefined) {this.asn1CertIssuer = new KJUR.asn1.x509.X500Name(g);} else {if (typeof g === "string" && g.indexOf("BEGIN ") != -1 && g.indexOf("CERTIFICATE") != -1) {this.asn1CertIssuer = new KJUR.asn1.x509.X500Name({ certissuer: g });}}};this.setCertSNByParam = function (i) {if (i.str !== undefined || i.bigint !== undefined || i.hex !== undefined) {this.asn1CertSN = new KJUR.asn1.DERInteger(i);} else {if (typeof i === "string" && i.indexOf("BEGIN ") != -1 && i.indexOf("CERTIFICATE")) {var g = new X509();g.readCertPEM(i);var h = g.getSerialNumberHex();this.asn1CertSN = new KJUR.asn1.DERInteger({ hex: h });}}};this.oid = "2.5.29.35";if (f !== undefined) {if (f.kid !== undefined) {this.setKIDByParam(f.kid);}if (f.issuer !== undefined) {this.setCertIssuerByParam(f.issuer);}if (f.sn !== undefined) {this.setCertSNByParam(f.sn);}if (f.issuersn !== undefined && typeof f.issuersn === "string" && f.issuersn.indexOf("BEGIN ") != -1 && f.issuersn.indexOf("CERTIFICATE")) {this.setCertSNByParam(f.issuersn);this.setCertIssuerByParam(f.issuersn);}}};YAHOO.lang.extend(KJUR.asn1.x509.AuthorityKeyIdentifier, KJUR.asn1.x509.Extension);KJUR.asn1.x509.SubjectKeyIdentifier = function (d) {KJUR.asn1.x509.SubjectKeyIdentifier.superclass.constructor.call(this, d);var b = KJUR,a = b.asn1,c = a.DEROctetString;this.asn1KID = null;this.getExtnValueHex = function () {this.asn1ExtnValue = this.asn1KID;return this.asn1ExtnValue.getEncodedHex();};this.setKIDByParam = function (g) {if (g.str !== undefined || g.hex !== undefined) {this.asn1KID = new c(g);} else {if (typeof g === "object" && KJUR.crypto.Util.isKey(g) || typeof g === "string" && g.indexOf("BEGIN") != -1) {var f = g;if (typeof g === "string") {f = KEYUTIL.getKey(g);}var e = KEYUTIL.getKeyID(f);this.asn1KID = new KJUR.asn1.DEROctetString({ hex: e });}}};this.oid = "2.5.29.14";if (d !== undefined) {if (d.kid !== undefined) {this.setKIDByParam(d.kid);}}};YAHOO.lang.extend(KJUR.asn1.x509.SubjectKeyIdentifier, KJUR.asn1.x509.Extension);KJUR.asn1.x509.AuthorityInfoAccess = function (a) {KJUR.asn1.x509.AuthorityInfoAccess.superclass.constructor.call(this, a);this.setAccessDescriptionArray = function (k) {var d = new Array(),b = KJUR,g = b.asn1,c = g.DERSequence,j = g.DERObjectIdentifier,l = g.x509.GeneralName;for (var f = 0; f < k.length; f++) {var e;var h = k[f];if (h.ocsp !== undefined) {e = new c({ array: [new j({ oid: "1.3.6.1.5.5.7.48.1" }), new l({ uri: h.ocsp })] });} else {if (h.caissuer !== undefined) {e = new c({ array: [new j({ oid: "1.3.6.1.5.5.7.48.2" }), new l({ uri: h.caissuer })] });} else {throw new Error("unknown AccessMethod parameter: " + JSON.stringify(h));}}d.push(e);}this.asn1ExtnValue = new c({ array: d });};this.getExtnValueHex = function () {return this.asn1ExtnValue.getEncodedHex();};this.oid = "1.3.6.1.5.5.7.1.1";if (a !== undefined) {if (a.array !== undefined) {this.setAccessDescriptionArray(a.array);}}};YAHOO.lang.extend(KJUR.asn1.x509.AuthorityInfoAccess, KJUR.asn1.x509.Extension);KJUR.asn1.x509.SubjectAltName = function (a) {KJUR.asn1.x509.SubjectAltName.superclass.constructor.call(this, a);this.setNameArray = function (b) {this.asn1ExtnValue = new KJUR.asn1.x509.GeneralNames(b);};this.getExtnValueHex = function () {return this.asn1ExtnValue.getEncodedHex();};this.oid = "2.5.29.17";if (a !== undefined) {if (a.array !== undefined) {this.setNameArray(a.array);}}};YAHOO.lang.extend(KJUR.asn1.x509.SubjectAltName, KJUR.asn1.x509.Extension);KJUR.asn1.x509.IssuerAltName = function (a) {KJUR.asn1.x509.IssuerAltName.superclass.constructor.call(this, a);this.setNameArray = function (b) {this.asn1ExtnValue = new KJUR.asn1.x509.GeneralNames(b);};this.getExtnValueHex = function () {return this.asn1ExtnValue.getEncodedHex();};this.oid = "2.5.29.18";if (a !== undefined) {if (a.array !== undefined) {this.setNameArray(a.array);}}};YAHOO.lang.extend(KJUR.asn1.x509.IssuerAltName, KJUR.asn1.x509.Extension);KJUR.asn1.x509.PrivateExtension = function (f) {KJUR.asn1.x509.PrivateExtension.superclass.constructor.call(this, f);var c = KJUR,e = c.lang.String.isHex,b = c.asn1,d = b.x509.OID.name2oid,a = b.ASN1Util.newObject;this.params = null;this.setByParam = function (g) {this.oid = d(g.extname);this.params = g;};this.getExtnValueHex = function () {if (this.params.extname == undefined || this.params.extn == undefined) {throw new Error("extname or extnhex not specified");}var h = this.params.extn;if (typeof h == "string" && e(h)) {return h;} else {if (typeof h == "object") {try {return a(h).getEncodedHex();} catch (g) {}}}throw new Error("unsupported extn value");};if (f != undefined) {this.setByParam(f);}};YAHOO.lang.extend(KJUR.asn1.x509.PrivateExtension, KJUR.asn1.x509.Extension);KJUR.asn1.x509.CRL = function (g) {KJUR.asn1.x509.CRL.superclass.constructor.call(this);var c = KJUR,b = c.asn1,a = b.DERSequence,e = b.DERBitString,f = b.x509,d = f.AlgorithmIdentifier,h = f.TBSCertList;this.params = undefined;this.setByParam = function (i) {this.params = i;};this.sign = function () {var j = new h(this.params).getEncodedHex();var k = new KJUR.crypto.Signature({ alg: this.params.sigalg });k.init(this.params.cakey);k.updateHex(j);var i = k.sign();this.params.sighex = i;};this.getPEM = function () {return hextopem(this.getEncodedHex(), "X509 CRL");};this.getEncodedHex = function () {var k = this.params;if (k.tbsobj == undefined) {k.tbsobj = new h(k);}if (k.sighex == undefined && k.cakey != undefined) {this.sign();}if (k.sighex == undefined) {throw new Error("sighex or cakey parameter not defined");}var i = [];i.push(k.tbsobj);i.push(new d({ name: k.sigalg }));i.push(new e({ hex: "00" + k.sighex }));var j = new a({ array: i });return j.getEncodedHex();};if (g != undefined) {this.params = g;}};YAHOO.lang.extend(KJUR.asn1.x509.CRL, KJUR.asn1.ASN1Object);KJUR.asn1.x509.TBSCertList = function (f) {KJUR.asn1.x509.TBSCertList.superclass.constructor.call(this);var b = KJUR,i = b.asn1,h = i.DERInteger,g = i.DERSequence,c = i.DERTaggedObject,k = i.DERObjectIdentifier,d = i.x509,l = d.AlgorithmIdentifier,e = d.Time,j = d.Extensions,a = d.X500Name;this.params = null;this.setByParam = function (m) {this.params = m;};this.getRevCertSequence = function () {var m = [];var n = this.params.revcert;for (var o = 0; o < n.length; o++) {var p = [new h(n[o].sn), new e(n[o].date)];if (n[o].ext != undefined) {p.push(new j(n[o].ext));}m.push(new g({ array: p }));}return new g({ array: m });};this.getEncodedHex = function () {var n = [];var r = this.params;if (r.version != undefined) {var m = r.version - 1;var p = new h({ "int": m });n.push(p);}n.push(new l({ name: r.sigalg }));n.push(new a(r.issuer));n.push(new e(r.thisupdate));if (r.nextupdate != undefined) {n.push(new e(r.nextupdate));}if (r.revcert != undefined) {n.push(this.getRevCertSequence());}if (r.ext != undefined) {var q = new j(r.ext);n.push(new c({ tag: "a0", explicit: true, obj: q }));}var o = new g({ array: n });return o.getEncodedHex();};if (f !== undefined) {this.setByParam(f);}};YAHOO.lang.extend(KJUR.asn1.x509.TBSCertList, KJUR.asn1.ASN1Object);KJUR.asn1.x509.CRLEntry = function (e) {KJUR.asn1.x509.CRLEntry.superclass.constructor.call(this);var d = null,c = null,b = KJUR,a = b.asn1;this.setCertSerial = function (f) {this.sn = new a.DERInteger(f);};this.setRevocationDate = function (f) {this.time = new a.x509.Time(f);};this.getEncodedHex = function () {var f = new a.DERSequence({ array: [this.sn, this.time] });this.TLV = f.getEncodedHex();return this.TLV;};if (e !== undefined) {if (e.time !== undefined) {this.setRevocationDate(e.time);}if (e.sn !== undefined) {this.setCertSerial(e.sn);}}};YAHOO.lang.extend(KJUR.asn1.x509.CRLEntry, KJUR.asn1.ASN1Object);KJUR.asn1.x509.CRLNumber = function (a) {KJUR.asn1.x509.CRLNumber.superclass.constructor.call(this, a);this.params = undefined;this.getExtnValueHex = function () {this.asn1ExtnValue = new KJUR.asn1.DERInteger(this.params.num);return this.asn1ExtnValue.getEncodedHex();};this.oid = "2.5.29.20";if (a != undefined) {this.params = a;}};YAHOO.lang.extend(KJUR.asn1.x509.CRLNumber, KJUR.asn1.x509.Extension);KJUR.asn1.x509.CRLReason = function (a) {KJUR.asn1.x509.CRLReason.superclass.constructor.call(this, a);this.params = undefined;this.getExtnValueHex = function () {this.asn1ExtnValue = new KJUR.asn1.DEREnumerated(this.params.code);return this.asn1ExtnValue.getEncodedHex();};this.oid = "2.5.29.21";if (a != undefined) {this.params = a;}};YAHOO.lang.extend(KJUR.asn1.x509.CRLReason, KJUR.asn1.x509.Extension);KJUR.asn1.x509.OCSPNonce = function (a) {KJUR.asn1.x509.OCSPNonce.superclass.constructor.call(this, a);this.params = undefined;this.getExtnValueHex = function () {this.asn1ExtnValue = new KJUR.asn1.DEROctetString(this.params);return this.asn1ExtnValue.getEncodedHex();};this.oid = "1.3.6.1.5.5.7.48.1.2";if (a != undefined) {this.params = a;}};YAHOO.lang.extend(KJUR.asn1.x509.OCSPNonce, KJUR.asn1.x509.Extension);KJUR.asn1.x509.OCSPNoCheck = function (a) {KJUR.asn1.x509.OCSPNoCheck.superclass.constructor.call(this, a);this.params = undefined;this.getExtnValueHex = function () {this.asn1ExtnValue = new KJUR.asn1.DERNull();return this.asn1ExtnValue.getEncodedHex();};this.oid = "1.3.6.1.5.5.7.48.1.5";if (a != undefined) {this.params = a;}};YAHOO.lang.extend(KJUR.asn1.x509.OCSPNoCheck, KJUR.asn1.x509.Extension);KJUR.asn1.x509.AdobeTimeStamp = function (g) {KJUR.asn1.x509.AdobeTimeStamp.superclass.constructor.call(this, g);var c = KJUR,b = c.asn1,f = b.DERInteger,d = b.DERBoolean,a = b.DERSequence,e = b.x509.GeneralName;this.params = null;this.getExtnValueHex = function () {var i = this.params;var h = [new f(1)];h.push(new e({ uri: i.uri }));if (i.reqauth != undefined) {h.push(new d(i.reqauth));}this.asn1ExtnValue = new a({ array: h });return this.asn1ExtnValue.getEncodedHex();};this.oid = "1.2.840.113583.1.1.9.1";if (g !== undefined) {this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.x509.AdobeTimeStamp, KJUR.asn1.x509.Extension);KJUR.asn1.x509.X500Name = function (f) {KJUR.asn1.x509.X500Name.superclass.constructor.call(this);this.asn1Array = [];this.paramArray = [];this.sRule = "utf8";var c = KJUR,b = c.asn1,e = b.x509,d = e.RDN,a = pemtohex;this.setByString = function (g, l) {if (l !== undefined) {this.sRule = l;}var k = g.split("/");k.shift();var j = [];for (var m = 0; m < k.length; m++) {if (k[m].match(/^[^=]+=.+$/)) {j.push(k[m]);} else {var h = j.length - 1;j[h] = j[h] + "/" + k[m];}}for (var m = 0; m < j.length; m++) {this.asn1Array.push(new d({ str: j[m], rule: this.sRule }));}};this.setByLdapString = function (g, h) {if (h !== undefined) {this.sRule = h;}var i = e.X500Name.ldapToCompat(g);this.setByString(i, h);};this.setByObject = function (j, i) {if (i !== undefined) {this.sRule = i;}for (var g in j) {if (j.hasOwnProperty(g)) {var h = new d({ str: g + "=" + j[g], rule: this.sRule });this.asn1Array ? this.asn1Array.push(h) : this.asn1Array = [h];}}};this.setByParam = function (h) {if (h.rule !== undefined) {this.sRule = h.rule;}if (h.array !== undefined) {this.paramArray = h.array;} else {if (h.str !== undefined) {this.setByString(h.str);} else {if (h.ldapstr !== undefined) {this.setByLdapString(h.ldapstr);} else {if (h.hex !== undefined) {this.hTLV = h.hex;} else {if (h.certissuer !== undefined) {var g = new X509();g.readCertPEM(h.certissuer);this.hTLV = g.getIssuerHex();} else {if (h.certsubject !== undefined) {var g = new X509();g.readCertPEM(h.certsubject);this.hTLV = g.getSubjectHex();} else {if (typeof h === "object" && h.certsubject === undefined && h.certissuer === undefined) {this.setByObject(h);}}}}}}}};this.getEncodedHex = function () {if (typeof this.hTLV == "string") {return this.hTLV;}if (this.asn1Array.length == 0 && this.paramArray.length > 0) {for (var g = 0; g < this.paramArray.length; g++) {var k = { array: this.paramArray[g] };if (this.sRule != "utf8") {k.rule = this.sRule;}var h = new d(k);this.asn1Array.push(h);}}var j = new b.DERSequence({ array: this.asn1Array });this.hTLV = j.getEncodedHex();return this.hTLV;};if (f !== undefined) {this.setByParam(f);}};YAHOO.lang.extend(KJUR.asn1.x509.X500Name, KJUR.asn1.ASN1Object);KJUR.asn1.x509.X500Name.compatToLDAP = function (d) {if (d.substr(0, 1) !== "/") {throw "malformed input";}var b = "";d = d.substr(1);var c = d.split("/");c.reverse();c = c.map(function (a) {return a.replace(/,/, "\\,");});return c.join(",");};KJUR.asn1.x509.X500Name.onelineToLDAP = function (a) {return KJUR.asn1.x509.X500Name.compatToLDAP(a);};KJUR.asn1.x509.X500Name.ldapToCompat = function (g) {var c = g.split(",");var e = false;var b = [];for (var f = 0; c.length > 0; f++) {var h = c.shift();if (e === true) {var d = b.pop();var j = (d + "," + h).replace(/\\,/g, ",");b.push(j);e = false;} else {b.push(h);}if (h.substr(-1, 1) === "\\") {e = true;}}b = b.map(function (a) {return a.replace("/", "\\/");});b.reverse();return "/" + b.join("/");};KJUR.asn1.x509.X500Name.ldapToOneline = function (a) {return KJUR.asn1.x509.X500Name.ldapToCompat(a);};KJUR.asn1.x509.RDN = function (b) {KJUR.asn1.x509.RDN.superclass.constructor.call(this);this.asn1Array = [];this.paramArray = [];this.sRule = "utf8";var a = KJUR.asn1.x509.AttributeTypeAndValue;this.setByParam = function (c) {if (c.rule !== undefined) {this.sRule = c.rule;}if (c.str !== undefined) {this.addByMultiValuedString(c.str);}if (c.array !== undefined) {this.paramArray = c.array;}};this.addByString = function (c) {this.asn1Array.push(new KJUR.asn1.x509.AttributeTypeAndValue({ str: c, rule: this.sRule }));};this.addByMultiValuedString = function (e) {var c = KJUR.asn1.x509.RDN.parseString(e);for (var d = 0; d < c.length; d++) {this.addByString(c[d]);}};this.getEncodedHex = function () {if (this.asn1Array.length == 0 && this.paramArray.length > 0) {for (var d = 0; d < this.paramArray.length; d++) {var f = this.paramArray[d];if (f.rule !== undefined && this.sRule != "utf8") {f.rule = this.sRule;}var c = new a(f);this.asn1Array.push(c);}}var e = new KJUR.asn1.DERSet({ array: this.asn1Array });this.TLV = e.getEncodedHex();return this.TLV;};if (b !== undefined) {this.setByParam(b);}};YAHOO.lang.extend(KJUR.asn1.x509.RDN, KJUR.asn1.ASN1Object);KJUR.asn1.x509.RDN.parseString = function (m) {var j = m.split(/\+/);var h = false;var c = [];for (var g = 0; j.length > 0; g++) {var k = j.shift();if (h === true) {var f = c.pop();var d = (f + "+" + k).replace(/\\\+/g, "+");c.push(d);h = false;} else {c.push(k);}if (k.substr(-1, 1) === "\\") {h = true;}}var l = false;var b = [];for (var g = 0; c.length > 0; g++) {var k = c.shift();if (l === true) {var e = b.pop();if (k.match(/"$/)) {var d = (e + "+" + k).replace(/^([^=]+)="(.*)"$/, "$1=$2");b.push(d);l = false;} else {b.push(e + "+" + k);}} else {b.push(k);}if (k.match(/^[^=]+="/)) {l = true;}}return b;};KJUR.asn1.x509.AttributeTypeAndValue = function (c) {KJUR.asn1.x509.AttributeTypeAndValue.superclass.constructor.call(this);this.sRule = "utf8";this.sType = null;this.sValue = null;this.dsType = null;var a = KJUR,g = a.asn1,d = g.DERSequence,l = g.DERUTF8String,i = g.DERPrintableString,h = g.DERTeletexString,b = g.DERIA5String,e = g.DERVisibleString,k = g.DERBMPString,f = a.lang.String.isMail,j = a.lang.String.isPrintable;this.setByParam = function (o) {if (o.rule !== undefined) {this.sRule = o.rule;}if (o.ds !== undefined) {this.dsType = o.ds;}if (o.value === undefined && o.str !== undefined) {var n = o.str;var m = n.match(/^([^=]+)=(.+)$/);if (m) {this.sType = m[1];this.sValue = m[2];} else {throw new Error("malformed attrTypeAndValueStr: " + attrTypeAndValueStr);}} else {this.sType = o.type;this.sValue = o.value;}};this.setByString = function (n, o) {if (o !== undefined) {this.sRule = o;}var m = n.match(/^([^=]+)=(.+)$/);if (m) {this.setByAttrTypeAndValueStr(m[1], m[2]);} else {throw new Error("malformed attrTypeAndValueStr: " + attrTypeAndValueStr);}};this._getDsType = function () {var o = this.sType;var n = this.sValue;var m = this.sRule;if (m === "prn") {if (o == "CN" && f(n)) {return "ia5";}if (j(n)) {return "prn";}return "utf8";} else {if (m === "utf8") {if (o == "CN" && f(n)) {return "ia5";}if (o == "C") {return "prn";}return "utf8";}}return "utf8";};this.setByAttrTypeAndValueStr = function (o, n, m) {if (m !== undefined) {this.sRule = m;}this.sType = o;this.sValue = n;};this.getValueObj = function (n, m) {if (n == "utf8") {return new l({ str: m });}if (n == "prn") {return new i({ str: m });}if (n == "tel") {return new h({ str: m });}if (n == "ia5") {return new b({ str: m });}if (n == "vis") {return new e({ str: m });}if (n == "bmp") {return new k({ str: m });}throw new Error("unsupported directory string type: type=" + n + " value=" + m);};this.getEncodedHex = function () {if (this.dsType == null) {this.dsType = this._getDsType();}var n = KJUR.asn1.x509.OID.atype2obj(this.sType);var m = this.getValueObj(this.dsType, this.sValue);var p = new d({ array: [n, m] });this.TLV = p.getEncodedHex();return this.TLV;};if (c !== undefined) {this.setByParam(c);}};YAHOO.lang.extend(KJUR.asn1.x509.AttributeTypeAndValue, KJUR.asn1.ASN1Object);KJUR.asn1.x509.SubjectPublicKeyInfo = function (f) {KJUR.asn1.x509.SubjectPublicKeyInfo.superclass.constructor.call(this);var l = null,k = null,a = KJUR,j = a.asn1,i = j.DERInteger,b = j.DERBitString,m = j.DERObjectIdentifier,e = j.DERSequence,h = j.ASN1Util.newObject,d = j.x509,o = d.AlgorithmIdentifier,g = a.crypto,n = g.ECDSA,c = g.DSA;this.getASN1Object = function () {if (this.asn1AlgId == null || this.asn1SubjPKey == null) {throw "algId and/or subjPubKey not set";}var p = new e({ array: [this.asn1AlgId, this.asn1SubjPKey] });return p;};this.getEncodedHex = function () {var p = this.getASN1Object();this.hTLV = p.getEncodedHex();return this.hTLV;};this.setPubKey = function (q) {try {if (q instanceof RSAKey) {var u = h({ seq: [{ "int": { bigint: q.n } }, { "int": { "int": q.e } }] });var s = u.getEncodedHex();this.asn1AlgId = new o({ name: "rsaEncryption" });this.asn1SubjPKey = new b({ hex: "00" + s });}} catch (p) {}try {if (q instanceof KJUR.crypto.ECDSA) {var r = new m({ name: q.curveName });this.asn1AlgId = new o({ name: "ecPublicKey", asn1params: r });this.asn1SubjPKey = new b({ hex: "00" + q.pubKeyHex });}} catch (p) {}try {if (q instanceof KJUR.crypto.DSA) {var r = new h({ seq: [{ "int": { bigint: q.p } }, { "int": { bigint: q.q } }, { "int": { bigint: q.g } }] });this.asn1AlgId = new o({ name: "dsa", asn1params: r });var t = new i({ bigint: q.y });this.asn1SubjPKey = new b({ hex: "00" + t.getEncodedHex() });}} catch (p) {}};if (f !== undefined) {this.setPubKey(f);}};YAHOO.lang.extend(KJUR.asn1.x509.SubjectPublicKeyInfo, KJUR.asn1.ASN1Object);KJUR.asn1.x509.Time = function (f) {KJUR.asn1.x509.Time.superclass.constructor.call(this);var e = null,a = null,d = KJUR,c = d.asn1,b = c.DERUTCTime,g = c.DERGeneralizedTime;this.setTimeParams = function (h) {this.timeParams = h;};this.getEncodedHex = function () {var h = null;if (this.timeParams != null) {if (this.type == "utc") {h = new b(this.timeParams);} else {h = new g(this.timeParams);}} else {if (this.type == "utc") {h = new b();} else {h = new g();}}this.TLV = h.getEncodedHex();return this.TLV;};this.type = "utc";if (f !== undefined) {if (f.type !== undefined) {this.type = f.type;} else {if (f.str !== undefined) {if (f.str.match(/^[0-9]{12}Z$/)) {this.type = "utc";}if (f.str.match(/^[0-9]{14}Z$/)) {this.type = "gen";}}}this.timeParams = f;}};YAHOO.lang.extend(KJUR.asn1.x509.Time, KJUR.asn1.ASN1Object);KJUR.asn1.x509.AlgorithmIdentifier = function (e) {KJUR.asn1.x509.AlgorithmIdentifier.superclass.constructor.call(this);this.nameAlg = null;this.asn1Alg = null;this.asn1Params = null;this.paramEmpty = false;var b = KJUR,a = b.asn1,c = a.x509.AlgorithmIdentifier.PSSNAME2ASN1TLV;this.getEncodedHex = function () {if (this.nameAlg === null && this.asn1Alg === null) {throw new Error("algorithm not specified");}if (this.nameAlg !== null) {var f = null;for (var h in c) {if (h === this.nameAlg) {f = c[h];}}if (f !== null) {this.hTLV = f;return this.hTLV;}}if (this.nameAlg !== null && this.asn1Alg === null) {this.asn1Alg = a.x509.OID.name2obj(this.nameAlg);}var g = [this.asn1Alg];if (this.asn1Params !== null) {g.push(this.asn1Params);}var i = new a.DERSequence({ array: g });this.hTLV = i.getEncodedHex();return this.hTLV;};if (e !== undefined) {if (e.name !== undefined) {this.nameAlg = e.name;}if (e.asn1params !== undefined) {this.asn1Params = e.asn1params;}if (e.paramempty !== undefined) {this.paramEmpty = e.paramempty;}}if (this.asn1Params === null && this.paramEmpty === false && this.nameAlg !== null) {if (this.nameAlg.name !== undefined) {this.nameAlg = this.nameAlg.name;}var d = this.nameAlg.toLowerCase();if (d.substr(-7, 7) !== "withdsa" && d.substr(-9, 9) !== "withecdsa") {this.asn1Params = new a.DERNull();}}};YAHOO.lang.extend(KJUR.asn1.x509.AlgorithmIdentifier, KJUR.asn1.ASN1Object);KJUR.asn1.x509.AlgorithmIdentifier.PSSNAME2ASN1TLV = { SHAwithRSAandMGF1: "300d06092a864886f70d01010a3000", SHA256withRSAandMGF1: "303d06092a864886f70d01010a3030a00d300b0609608648016503040201a11a301806092a864886f70d010108300b0609608648016503040201a203020120", SHA384withRSAandMGF1: "303d06092a864886f70d01010a3030a00d300b0609608648016503040202a11a301806092a864886f70d010108300b0609608648016503040202a203020130", SHA512withRSAandMGF1: "303d06092a864886f70d01010a3030a00d300b0609608648016503040203a11a301806092a864886f70d010108300b0609608648016503040203a203020140" };KJUR.asn1.x509.GeneralName = function (e) {KJUR.asn1.x509.GeneralName.superclass.constructor.call(this);var m = null,i = null,k = { rfc822: "81", dns: "82", dn: "a4", uri: "86", ip: "87" },b = KJUR,g = b.asn1,f = g.DERSequence,j = g.DEROctetString,d = g.DERIA5String,c = g.DERTaggedObject,l = g.ASN1Object,a = g.x509.X500Name,h = pemtohex;this.explicit = false;this.setByParam = function (p) {var r = null;var u = null;if (p === undefined) {return;}if (p.rfc822 !== undefined) {this.type = "rfc822";u = new d({ str: p[this.type] });}if (p.dns !== undefined) {this.type = "dns";u = new d({ str: p[this.type] });}if (p.uri !== undefined) {this.type = "uri";u = new d({ str: p[this.type] });}if (p.dn !== undefined) {this.type = "dn";this.explicit = true;if (typeof p.dn === "string") {u = new a({ str: p.dn });} else {if (p.dn instanceof KJUR.asn1.x509.X500Name) {u = p.dn;} else {u = new a(p.dn);}}}if (p.ldapdn !== undefined) {this.type = "dn";this.explicit = true;u = new a({ ldapstr: p.ldapdn });}if (p.certissuer !== undefined) {this.type = "dn";this.explicit = true;var o = p.certissuer;var w = null;if (o.match(/^[0-9A-Fa-f]+$/)) {w == o;}if (o.indexOf("-----BEGIN ") != -1) {w = h(o);}if (w == null) {throw "certissuer param not cert";}var t = new X509();t.hex = w;var y = t.getIssuerHex();u = new l();u.hTLV = y;}if (p.certsubj !== undefined) {this.type = "dn";this.explicit = true;var o = p.certsubj;var w = null;if (o.match(/^[0-9A-Fa-f]+$/)) {w == o;}if (o.indexOf("-----BEGIN ") != -1) {w = h(o);}if (w == null) {throw "certsubj param not cert";}var t = new X509();t.hex = w;var y = t.getSubjectHex();u = new l();u.hTLV = y;}if (p.ip !== undefined) {this.type = "ip";this.explicit = false;var q = p.ip;var s;var n = "malformed IP address";if (q.match(/^[0-9.]+[.][0-9.]+$/)) {s = intarystrtohex("[" + q.split(".").join(",") + "]");if (s.length !== 8) {throw n;}} else {if (q.match(/^[0-9A-Fa-f:]+:[0-9A-Fa-f:]+$/)) {s = ipv6tohex(q);} else {if (q.match(/^([0-9A-Fa-f][0-9A-Fa-f]){1,}$/)) {s = q;} else {throw n;}}}u = new j({ hex: s });}if (this.type == null) {throw "unsupported type in params=" + p;}this.asn1Obj = new c({ explicit: this.explicit, tag: k[this.type], obj: u });};this.getEncodedHex = function () {return this.asn1Obj.getEncodedHex();};if (e !== undefined) {this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.x509.GeneralName, KJUR.asn1.ASN1Object);KJUR.asn1.x509.GeneralNames = function (d) {KJUR.asn1.x509.GeneralNames.superclass.constructor.call(this);var a = null,c = KJUR,b = c.asn1;this.setByParamArray = function (g) {for (var e = 0; e < g.length; e++) {var f = new b.x509.GeneralName(g[e]);this.asn1Array.push(f);}};this.getEncodedHex = function () {var e = new b.DERSequence({ array: this.asn1Array });return e.getEncodedHex();};this.asn1Array = new Array();if (typeof d != "undefined") {this.setByParamArray(d);}};YAHOO.lang.extend(KJUR.asn1.x509.GeneralNames, KJUR.asn1.ASN1Object);KJUR.asn1.x509.OID = new function (a) {this.atype2oidList = { CN: "2.5.4.3", L: "2.5.4.7", ST: "2.5.4.8", O: "2.5.4.10", OU: "2.5.4.11", C: "2.5.4.6", STREET: "2.5.4.9", DC: "0.9.2342.19200300.100.1.25", UID: "0.9.2342.19200300.100.1.1", SN: "2.5.4.4", T: "2.5.4.12", DN: "2.5.4.49", E: "1.2.840.113549.1.9.1", description: "2.5.4.13", businessCategory: "2.5.4.15", postalCode: "2.5.4.17", serialNumber: "2.5.4.5", uniqueIdentifier: "2.5.4.45", organizationIdentifier: "2.5.4.97", jurisdictionOfIncorporationL: "1.3.6.1.4.1.311.60.2.1.1", jurisdictionOfIncorporationSP: "1.3.6.1.4.1.311.60.2.1.2", jurisdictionOfIncorporationC: "1.3.6.1.4.1.311.60.2.1.3" };this.name2oidList = { sha1: "1.3.14.3.2.26", sha256: "2.16.840.1.101.3.4.2.1", sha384: "2.16.840.1.101.3.4.2.2", sha512: "2.16.840.1.101.3.4.2.3", sha224: "2.16.840.1.101.3.4.2.4", md5: "1.2.840.113549.2.5", md2: "1.3.14.7.2.2.1", ripemd160: "1.3.36.3.2.1", MD2withRSA: "1.2.840.113549.1.1.2", MD4withRSA: "1.2.840.113549.1.1.3", MD5withRSA: "1.2.840.113549.1.1.4", SHA1withRSA: "1.2.840.113549.1.1.5", "pkcs1-MGF": "1.2.840.113549.1.1.8", rsaPSS: "1.2.840.113549.1.1.10", SHA224withRSA: "1.2.840.113549.1.1.14", SHA256withRSA: "1.2.840.113549.1.1.11", SHA384withRSA: "1.2.840.113549.1.1.12", SHA512withRSA: "1.2.840.113549.1.1.13", SHA1withECDSA: "1.2.840.10045.4.1", SHA224withECDSA: "1.2.840.10045.4.3.1", SHA256withECDSA: "1.2.840.10045.4.3.2", SHA384withECDSA: "1.2.840.10045.4.3.3", SHA512withECDSA: "1.2.840.10045.4.3.4", dsa: "1.2.840.10040.4.1", SHA1withDSA: "1.2.840.10040.4.3", SHA224withDSA: "2.16.840.1.101.3.4.3.1", SHA256withDSA: "2.16.840.1.101.3.4.3.2", rsaEncryption: "1.2.840.113549.1.1.1", commonName: "2.5.4.3", countryName: "2.5.4.6", localityName: "2.5.4.7", stateOrProvinceName: "2.5.4.8", streetAddress: "2.5.4.9", organizationName: "2.5.4.10", organizationalUnitName: "2.5.4.11", domainComponent: "0.9.2342.19200300.100.1.25", userId: "0.9.2342.19200300.100.1.1", surname: "2.5.4.4", title: "2.5.4.12", distinguishedName: "2.5.4.49", emailAddress: "1.2.840.113549.1.9.1", description: "2.5.4.13", businessCategory: "2.5.4.15", postalCode: "2.5.4.17", uniqueIdentifier: "2.5.4.45", organizationIdentifier: "2.5.4.97", jurisdictionOfIncorporationL: "1.3.6.1.4.1.311.60.2.1.1", jurisdictionOfIncorporationSP: "1.3.6.1.4.1.311.60.2.1.2", jurisdictionOfIncorporationC: "1.3.6.1.4.1.311.60.2.1.3", subjectKeyIdentifier: "2.5.29.14", keyUsage: "2.5.29.15", subjectAltName: "2.5.29.17", issuerAltName: "2.5.29.18", basicConstraints: "2.5.29.19", cRLNumber: "2.5.29.20", cRLReason: "2.5.29.21", nameConstraints: "2.5.29.30", cRLDistributionPoints: "2.5.29.31", certificatePolicies: "2.5.29.32", anyPolicy: "2.5.29.32.0", authorityKeyIdentifier: "2.5.29.35", policyConstraints: "2.5.29.36", extKeyUsage: "2.5.29.37", authorityInfoAccess: "1.3.6.1.5.5.7.1.1", ocsp: "1.3.6.1.5.5.7.48.1", ocspBasic: "1.3.6.1.5.5.7.48.1.1", ocspNonce: "1.3.6.1.5.5.7.48.1.2", ocspNoCheck: "1.3.6.1.5.5.7.48.1.5", caIssuers: "1.3.6.1.5.5.7.48.2", anyExtendedKeyUsage: "2.5.29.37.0", serverAuth: "1.3.6.1.5.5.7.3.1", clientAuth: "1.3.6.1.5.5.7.3.2", codeSigning: "1.3.6.1.5.5.7.3.3", emailProtection: "1.3.6.1.5.5.7.3.4", timeStamping: "1.3.6.1.5.5.7.3.8", ocspSigning: "1.3.6.1.5.5.7.3.9", ecPublicKey: "1.2.840.10045.2.1", "P-256": "1.2.840.10045.3.1.7", secp256r1: "1.2.840.10045.3.1.7", secp256k1: "1.3.132.0.10", secp384r1: "1.3.132.0.34", pkcs5PBES2: "1.2.840.113549.1.5.13", pkcs5PBKDF2: "1.2.840.113549.1.5.12", "des-EDE3-CBC": "1.2.840.113549.3.7", data: "1.2.840.113549.1.7.1", "signed-data": "1.2.840.113549.1.7.2", "enveloped-data": "1.2.840.113549.1.7.3", "digested-data": "1.2.840.113549.1.7.5", "encrypted-data": "1.2.840.113549.1.7.6", "authenticated-data": "1.2.840.113549.1.9.16.1.2", tstinfo: "1.2.840.113549.1.9.16.1.4", signingCertificate: "1.2.840.113549.1.9.16.2.12", timeStampToken: "1.2.840.113549.1.9.16.2.14", signaturePolicyIdentifier: "1.2.840.113549.1.9.16.2.15", etsArchiveTimeStamp: "1.2.840.113549.1.9.16.2.27", signingCertificateV2: "1.2.840.113549.1.9.16.2.47", etsArchiveTimeStampV2: "1.2.840.113549.1.9.16.2.48", extensionRequest: "1.2.840.113549.1.9.14", contentType: "1.2.840.113549.1.9.3", messageDigest: "1.2.840.113549.1.9.4", signingTime: "1.2.840.113549.1.9.5", counterSignature: "1.2.840.113549.1.9.6", archiveTimeStampV3: "0.4.0.1733.2.4", pdfRevocationInfoArchival: "1.2.840.113583.1.1.8", adobeTimeStamp: "1.2.840.113583.1.1.9.1" };this.objCache = {};this.name2obj = function (b) {if (typeof this.objCache[b] != "undefined") {return this.objCache[b];}if (typeof this.name2oidList[b] == "undefined") {throw "Name of ObjectIdentifier not defined: " + b;}var c = this.name2oidList[b];var d = new KJUR.asn1.DERObjectIdentifier({ oid: c });this.objCache[b] = d;return d;};this.atype2obj = function (b) {if (typeof this.objCache[b] != "undefined") {return this.objCache[b];}if (typeof this.atype2oidList[b] == "undefined") {throw "AttributeType name undefined: " + b;}var c = this.atype2oidList[b];var d = new KJUR.asn1.DERObjectIdentifier({ oid: c });this.objCache[b] = d;return d;};}();KJUR.asn1.x509.OID.oid2name = function (b) {var c = KJUR.asn1.x509.OID.name2oidList;for (var a in c) {if (c[a] == b) {return a;}}return "";};KJUR.asn1.x509.OID.oid2atype = function (b) {var c = KJUR.asn1.x509.OID.atype2oidList;for (var a in c) {if (c[a] == b) {return a;}}return b;};KJUR.asn1.x509.OID.name2oid = function (a) {if (a.match(/^[0-9.]+$/)) {return a;}var b = KJUR.asn1.x509.OID.name2oidList;if (b[a] === undefined) {return "";}return b[a];};KJUR.asn1.x509.X509Util = {};KJUR.asn1.x509.X509Util.newCertPEM = function (e) {var d = KJUR.asn1.x509,b = d.TBSCertificate,a = d.Certificate;var c = new a(e);return c.getPEM();};
if (typeof KJUR == "undefined" || !KJUR) {KJUR = {};}if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {KJUR.asn1 = {};}if (typeof KJUR.asn1.cms == "undefined" || !KJUR.asn1.cms) {KJUR.asn1.cms = {};}KJUR.asn1.cms.Attribute = function (f) {var e = Error,d = KJUR,c = d.asn1,b = c.DERSequence,a = c.DERSet,g = c.DERObjectIdentifier;this.params = null;this.typeOid = null;this.setByParam = function (h) {this.params = h;};this.getValueArray = function () {throw new e("not yet implemented abstract");};this.getEncodedHex = function () {var j = new g({ oid: this.typeOid });var h = new a({ array: this.getValueArray() });var i = new b({ array: [j, h] });return i.getEncodedHex();};};YAHOO.lang.extend(KJUR.asn1.cms.Attribute, KJUR.asn1.ASN1Object);KJUR.asn1.cms.ContentType = function (c) {var b = KJUR,a = b.asn1;a.cms.ContentType.superclass.constructor.call(this);this.typeOid = "1.2.840.113549.1.9.3";this.getValueArray = function () {var d = new a.DERObjectIdentifier(this.params.type);return [d];};if (c != undefined) {this.setByParam(c);}};YAHOO.lang.extend(KJUR.asn1.cms.ContentType, KJUR.asn1.cms.Attribute);KJUR.asn1.cms.MessageDigest = function (e) {var b = KJUR,a = b.asn1,c = a.DEROctetString,d = a.cms;d.MessageDigest.superclass.constructor.call(this);this.typeOid = "1.2.840.113549.1.9.4";this.getValueArray = function () {var f = new c(this.params);return [f];};if (e != undefined) {this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.cms.MessageDigest, KJUR.asn1.cms.Attribute);KJUR.asn1.cms.SigningTime = function (c) {var b = KJUR,a = b.asn1;a.cms.SigningTime.superclass.constructor.call(this);this.typeOid = "1.2.840.113549.1.9.5";this.getValueArray = function () {var d = new a.x509.Time(this.params);return [d];};if (c != undefined) {this.setByParam(c);}};YAHOO.lang.extend(KJUR.asn1.cms.SigningTime, KJUR.asn1.cms.Attribute);KJUR.asn1.cms.SigningCertificate = function (h) {var e = Error,d = KJUR,c = d.asn1,b = c.DERSequence,g = c.cms,a = g.ESSCertID,f = d.crypto;g.SigningCertificate.superclass.constructor.call(this);this.typeOid = "1.2.840.113549.1.9.16.2.12";this.getValueArray = function () {if (this.params == null || this.params == undefined || this.params.array == undefined) {throw new e("parameter 'array' not specified");}var o = this.params.array;var k = [];for (var l = 0; l < o.length; l++) {var n = o[l];if (h.hasis == false && typeof n == "string" && (n.indexOf("-----BEGIN") != -1 || ASN1HEX.isASN1HEX(n))) {n = { cert: n };}if (n.hasis != false && h.hasis == false) {n.hasis = false;}k.push(new a(n));}var j = new b({ array: k });var m = new b({ array: [j] });return [m];};if (h != undefined) {this.setByParam(h);}};YAHOO.lang.extend(KJUR.asn1.cms.SigningCertificate, KJUR.asn1.cms.Attribute);KJUR.asn1.cms.ESSCertID = function (g) {KJUR.asn1.cms.ESSCertID.superclass.constructor.call(this);var d = Error,c = KJUR,b = c.asn1,f = b.DEROctetString,a = b.DERSequence,e = b.cms.IssuerSerial;this.params = null;this.getCertHash = function (k, h) {if (k.hash != undefined) {return k.hash;}if (typeof k == "string" && k.indexOf("-----BEGIN") == -1 && !ASN1HEX.isASN1HEX(k)) {return k;}var i;if (typeof k == "string") {i = k;} else {if (k.cert != undefined) {i = k.cert;} else {throw new d("hash nor cert unspecified");}}var j;if (i.indexOf("-----BEGIN") != -1) {j = pemtohex(i);} else {j = i;}if (typeof k == "string") {if (k.indexOf("-----BEGIN") != -1) {j = pemtohex(k);} else {if (ASN1HEX.isASN1HEX(k)) {j = k;}}}var l;if (k.alg != undefined) {l = k.alg;} else {if (h != undefined) {l = h;} else {throw new d("hash alg unspecified");}}return c.crypto.Util.hashHex(j, l);};this.getEncodedHex = function () {var k = this.params;var j = this.getCertHash(k, "sha1");var h = [];h.push(new f({ hex: j }));if (typeof k == "string" && k.indexOf("-----BEGIN") != -1 || k.cert != undefined && k.hasis != false || k.issuer != undefined && k.serial != undefined) {h.push(new e(k));}var i = new a({ array: h });return i.getEncodedHex();};if (g != undefined) {this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.cms.ESSCertID, KJUR.asn1.ASN1Object);KJUR.asn1.cms.SigningCertificateV2 = function (d) {var h = Error,a = KJUR,g = a.asn1,e = g.DERSequence,b = g.x509,i = g.cms,c = i.ESSCertIDv2,f = a.crypto;i.SigningCertificateV2.superclass.constructor.call(this);this.typeOid = "1.2.840.113549.1.9.16.2.47";this.getValueArray = function () {if (this.params == null || this.params == undefined || this.params.array == undefined) {throw new h("parameter 'array' not specified");}var o = this.params.array;var l = [];for (var m = 0; m < o.length; m++) {var n = o[m];if ((d.alg != undefined || d.hasis == false) && typeof n == "string" && (n.indexOf("-----BEGIN") != -1 || ASN1HEX.isASN1HEX(n))) {n = { cert: n };}if (n.alg == undefined && d.alg != undefined) {n.alg = d.alg;}if (n.hasis != false && d.hasis == false) {n.hasis = false;}l.push(new c(n));}var k = new e({ array: l });var j = new e({ array: [k] });return [j];};if (d != undefined) {this.setByParam(d);}};YAHOO.lang.extend(KJUR.asn1.cms.SigningCertificateV2, KJUR.asn1.cms.Attribute);KJUR.asn1.cms.ESSCertIDv2 = function (h) {KJUR.asn1.cms.ESSCertIDv2.superclass.constructor.call(this);var d = Error,c = KJUR,b = c.asn1,f = b.DEROctetString,a = b.DERSequence,e = b.cms.IssuerSerial,g = b.x509.AlgorithmIdentifier;this.params = null;this.getEncodedHex = function () {var l = this.params;var k = this.getCertHash(l, "sha256");var i = [];if (l.alg != undefined && l.alg != "sha256") {i.push(new g({ name: l.alg }));}i.push(new f({ hex: k }));if (typeof l == "string" && l.indexOf("-----BEGIN") != -1 || l.cert != undefined && l.hasis != false || l.issuer != undefined && l.serial != undefined) {i.push(new e(l));}var j = new a({ array: i });return j.getEncodedHex();};if (h != undefined) {this.setByParam(h);}};YAHOO.lang.extend(KJUR.asn1.cms.ESSCertIDv2, KJUR.asn1.cms.ESSCertID);KJUR.asn1.cms.IssuerSerial = function (e) {var i = Error,c = KJUR,h = c.asn1,g = h.DERInteger,f = h.DERSequence,j = h.cms,d = h.x509,a = d.GeneralNames,b = X509;j.IssuerSerial.superclass.constructor.call(this);this.setByParam = function (k) {this.params = k;};this.getEncodedHex = function () {var p = this.params;var l, r;if (typeof p == "string" && p.indexOf("-----BEGIN") != -1 || p.cert != undefined) {var n;if (p.cert != undefined) {n = p.cert;} else {n = p;}var k = new b();k.readCertPEM(n);l = k.getIssuer();r = { hex: k.getSerialNumberHex() };} else {if (p.issuer != undefined && p.serial) {l = p.issuer;r = p.serial;} else {throw new i("cert or issuer and serial parameter not specified");}}var q = new a([{ dn: l }]);var o = new g(r);var m = new f({ array: [q, o] });return m.getEncodedHex();};if (e != undefined) {this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.cms.IssuerSerial, KJUR.asn1.ASN1Object);KJUR.asn1.cms.SignerIdentifier = function (f) {var c = KJUR,i = c.asn1,h = i.DERInteger,g = i.DERSequence,l = i.cms,k = l.IssuerAndSerialNumber,d = l.SubjectKeyIdentifier,e = i.x509,a = e.X500Name,b = X509,j = Error;l.SignerIdentifier.superclass.constructor.call(this);this.params = null;this.getEncodedHex = function () {var o = this.params;if (o.type == "isssn") {var m = new k(o);return m.getEncodedHex();} else {if (o.type == "skid") {var n = new d(o);return n.getEncodedHex();} else {throw new Error("wrong property for isssn or skid");}}};if (f != undefined) {this.setByParam(f);}};YAHOO.lang.extend(KJUR.asn1.cms.SignerIdentifier, KJUR.asn1.ASN1Object);KJUR.asn1.cms.IssuerAndSerialNumber = function (e) {var c = KJUR,h = c.asn1,g = h.DERInteger,f = h.DERSequence,j = h.cms,d = h.x509,a = d.X500Name,b = X509,i = Error;j.IssuerAndSerialNumber.superclass.constructor.call(this);this.params = null;this.getEncodedHex = function () {var p = this.params;var l, r;if (typeof p == "string" && p.indexOf("-----BEGIN") != -1 || p.cert != undefined) {var n;if (p.cert != undefined) {n = p.cert;} else {n = p;}var k = new b();k.readCertPEM(n);l = k.getIssuer();r = { hex: k.getSerialNumberHex() };} else {if (p.issuer != undefined && p.serial) {l = p.issuer;r = p.serial;} else {throw new i("cert or issuer and serial parameter not specified");}}var q = new a(l);var o = new g(r);var m = new f({ array: [q, o] });return m.getEncodedHex();};this.setByParam = function (k) {this.params = k;};if (e != undefined) {this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.cms.IssuerAndSerialNumber, KJUR.asn1.ASN1Object);KJUR.asn1.cms.SubjectKeyIdentifier = function (g) {var d = KJUR,k = d.asn1,i = k.DERInteger,h = k.DERSequence,j = k.ASN1Util.newObject,m = k.cms,f = m.IssuerAndSerialName,c = m.SubjectKeyIdentifier,e = k.x509,a = e.X500Name,b = X509,l = Error;m.SubjectKeyIdentifier.superclass.constructor.call(this);this.getEncodedHex = function () {var r = this.params;if (r.cert == undefined && r.skid == undefined) {throw new l("property cert nor skid undefined");}var q;if (r.cert != undefined) {var n = new b(r.cert);var o = n.getExtSubjectKeyIdentifier();q = o.kid.hex;} else {if (r.skid != undefined) {q = r.skid;}}var p = j({ tag: { tage: "a0", obj: { octstr: { hex: q } } } });return p.getEncodedHex();};if (g != undefined) {this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.cms.SubjectKeyIdentifier, KJUR.asn1.ASN1Object);KJUR.asn1.cms.AttributeList = function (f) {var d = Error,c = KJUR,b = c.asn1,a = b.DERSet,e = b.cms;e.AttributeList.superclass.constructor.call(this);this.params = null;this.hTLV = null;this.setByParam = function (g) {this.params = g;};this.getEncodedHex = function () {var o = this.params;if (this.hTLV != null) {return this.hTLV;}var m = true;if (o.sortflag != undefined) {m = o.sortflag;}var j = o.array;var g = [];for (var l = 0; l < j.length; l++) {var n = j[l];var k = n.attr;if (k == "contentType") {g.push(new e.ContentType(n));} else {if (k == "messageDigest") {g.push(new e.MessageDigest(n));} else {if (k == "signingTime") {g.push(new e.SigningTime(n));} else {if (k == "signingCertificate") {g.push(new e.SigningCertificate(n));} else {if (k == "signingCertificateV2") {g.push(new e.SigningCertificateV2(n));} else {if (k == "signaturePolicyIdentifier") {g.push(new KJUR.asn1.cades.SignaturePolicyIdentifier(n));} else {if (k == "signatureTimeStamp" || k == "timeStampToken") {g.push(new KJUR.asn1.cades.SignatureTimeStamp(n));} else {throw new d("unknown attr: " + k);}}}}}}}}var h = new a({ array: g, sortflag: m });this.hTLV = h.getEncodedHex();return this.hTLV;};if (f != undefined) {this.setByParam(f);}};YAHOO.lang.extend(KJUR.asn1.cms.AttributeList, KJUR.asn1.ASN1Object);KJUR.asn1.cms.SignerInfo = function (q) {var n = Error,r = KJUR,i = r.asn1,c = i.DERInteger,f = i.DEROctetString,h = i.DERSequence,m = i.DERTaggedObject,k = i.cms,p = k.SignerIdentifier,l = k.AttributeList,g = k.ContentType,e = k.EncapsulatedContentInfo,d = k.MessageDigest,j = k.SignedData,a = i.x509,s = a.AlgorithmIdentifier,b = r.crypto,o = KEYUTIL;k.SignerInfo.superclass.constructor.call(this);this.params = null;this.sign = function () {var y = this.params;var x = y.sigalg;var u = new l(y.sattrs).getEncodedHex();var v = o.getKey(y.signkey);var w = new b.Signature({ alg: x });w.init(v);w.updateHex(u);var t = w.sign();y.sighex = t;};this.getEncodedHex = function () {var w = this.params;var t = [];t.push(new c({ "int": w.version }));t.push(new p(w.id));t.push(new s({ name: w.hashalg }));if (w.sattrs != undefined) {var x = new l(w.sattrs);try {t.push(new m({ tag: "a0", explicit: false, obj: x }));} catch (v) {throw new n("si sattr error: " + v);}}if (w.sigalgfield != undefined) {t.push(new s({ name: w.sigalgfield }));} else {t.push(new s({ name: w.sigalg }));}if (w.sighex == undefined && w.signkey != undefined) {this.sign();}t.push(new f({ hex: w.sighex }));if (w.uattrs != undefined) {var x = new l(w.uattrs);try {t.push(new m({ tag: "a1", explicit: false, obj: x }));} catch (v) {throw new n("si uattr error: " + v);}}var u = new h({ array: t });return u.getEncodedHex();};if (q != undefined) {this.setByParam(q);}};YAHOO.lang.extend(KJUR.asn1.cms.SignerInfo, KJUR.asn1.ASN1Object);KJUR.asn1.cms.EncapsulatedContentInfo = function (g) {var c = KJUR,b = c.asn1,e = b.DERTaggedObject,a = b.DERSequence,h = b.DERObjectIdentifier,d = b.DEROctetString,f = b.cms;f.EncapsulatedContentInfo.superclass.constructor.call(this);this.params = null;this.getEncodedHex = function () {var m = this.params;var i = [];i.push(new h(m.type));if (m.content != undefined && (m.content.hex != undefined || m.content.str != undefined) && m.isDetached != true) {var k = new d(m.content);var l = new e({ tag: "a0", explicit: true, obj: k });i.push(l);}var j = new a({ array: i });return j.getEncodedHex();};this.setByParam = function (i) {this.params = i;};if (g != undefined) {this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.cms.EncapsulatedContentInfo, KJUR.asn1.ASN1Object);KJUR.asn1.cms.ContentInfo = function (g) {var c = KJUR,b = c.asn1,d = b.DERTaggedObject,a = b.DERSequence,h = b.DERObjectIdentifier,f = b.x509,e = f.OID.name2obj;KJUR.asn1.cms.ContentInfo.superclass.constructor.call(this);this.params = null;this.getEncodedHex = function () {var l = this.params;var i = [];i.push(new h(l.type));var k = new d({ tag: "a0", explicit: true, obj: l.obj });i.push(k);var j = new a({ array: i });return j.getEncodedHex();};this.setByParam = function (i) {this.params = i;};if (g != undefined) {this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.cms.ContentInfo, KJUR.asn1.ASN1Object);KJUR.asn1.cms.SignedData = function (e) {var j = Error,a = KJUR,h = a.asn1,m = h.ASN1Object,g = h.DERInteger,p = h.DERSet,f = h.DERSequence,b = h.DERTaggedObject,o = h.cms,l = o.EncapsulatedContentInfo,d = o.SignerInfo,q = o.ContentInfo,k = o.CertificateSet,i = o.RevocationInfoChoices,c = h.x509,n = c.AlgorithmIdentifier;KJUR.asn1.cms.SignedData.superclass.constructor.call(this);this.params = null;this.checkAndFixParam = function () {var r = this.params;this._setDigestAlgs(r);this._setContentTypeByEContent(r);this._setMessageDigestByEContent(r);this._setSignerInfoVersion(r);this._setSignedDataVersion(r);};this._setDigestAlgs = function (v) {var u = {};var t = v.sinfos;for (var r = 0; r < t.length; r++) {var s = t[r];u[s.hashalg] = 1;}v.hashalgs = Object.keys(u).sort();};this._setContentTypeByEContent = function (w) {var u = w.econtent.type;var v = w.sinfos;for (var r = 0; r < v.length; r++) {var t = v[r];var s = this._getAttrParamByName(t, "contentType");s.type = u;}};this._setMessageDigestByEContent = function (r) {var v = r.econtent;var y = r.econtent.type;var x = v.content.hex;if (x == undefined && v.type == "data" && v.content.str != undefined) {x = rstrtohex(v.content.str);}var A = r.sinfos;for (var u = 0; u < A.length; u++) {var t = A[u];var s = t.hashalg;var z = this._getAttrParamByName(t, "messageDigest");var w = KJUR.crypto.Util.hashHex(x, s);z.hex = w;}};this._getAttrParamByName = function (t, s) {var u = t.sattrs.array;for (var r = 0; r < u.length; r++) {if (u[r].attr == s) {return u[r];}}};this._setSignerInfoVersion = function (v) {var t = v.sinfos;for (var r = 0; r < t.length; r++) {var s = t[r];var u = 1;if (s.id.type == "skid") {u = 3;}s.version = u;}};this._setSignedDataVersion = function (s) {var r = this._getSignedDataVersion(s);s.version = r;};this._getSignedDataVersion = function (w) {if (w.revinfos != undefined) {var r = w.revinfos;for (var t = 0; t < r.length; t++) {var s = r[t];if (s.ocsp != undefined) {return 5;}}}var v = w.sinfos;for (var t = 0; t < v.length; t++) {var u = w.sinfos[t];if (u.version == 3) {return 3;}}if (w.econtent.type != "data") {return 3;}return 1;};this.getEncodedHex = function () {var y = this.params;if (this.getEncodedHexPrepare != undefined) {this.getEncodedHexPrepare();}if (y.fixed != true) {this.checkAndFixParam();}var r = [];r.push(new g({ "int": y.version }));var w = [];for (var v = 0; v < y.hashalgs.length; v++) {var t = y.hashalgs[v];w.push(new n({ name: t }));}r.push(new p({ array: w }));r.push(new l(y.econtent));if (y.certs != undefined) {r.push(new k(y.certs));}if (y.revinfos != undefined) {r.push(new i(y.revinfos));}var u = [];for (var v = 0; v < y.sinfos.length; v++) {var x = y.sinfos[v];u.push(new d(x));}r.push(new p({ array: u }));var s = new f({ array: r });return s.getEncodedHex();};this.getContentInfo = function () {var r = new q({ type: "signed-data", obj: this });return r;};this.getContentInfoEncodedHex = function () {return this.getContentInfo().getEncodedHex();};if (e != undefined) {this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.cms.SignedData, KJUR.asn1.ASN1Object);KJUR.asn1.cms.CertificateSet = function (f) {KJUR.asn1.cms.CertificateSet.superclass.constructor.call(this);var c = Error,b = KJUR.asn1,e = b.DERTaggedObject,a = b.DERSet,d = b.ASN1Object;this.params = null;this.getEncodedHex = function () {var j = this.params;var p = [];var q;if (j instanceof Array) {q = j;} else {if (j.array != undefined) {q = j.array;} else {throw new c("cert array not specified");}}for (var k = 0; k < q.length; k++) {var l = q[k];var n = pemtohex(l);var g = new d();g.hTLV = n;p.push(g);}var m = { array: p };if (j.sortflag == false) {m.sortflag = false;}var o = new a(m);var h = new e({ tag: "a0", explicit: false, obj: o });return h.getEncodedHex();};if (f != undefined) {this.setByParam(f);}};YAHOO.lang.extend(KJUR.asn1.cms.CertificateSet, KJUR.asn1.ASN1Object);KJUR.asn1.cms.RevocationInfoChoices = function (a) {KJUR.asn1.cms.RevocationInfoChoices.superclass.constructor.call(this);this.params = null;this.getEncodedHex = function () {var e = this.params;if (!e instanceof Array) {throw new Error("params is not array");}var b = [];for (var c = 0; c < e.length; c++) {b.push(new KJUR.asn1.cms.RevocationInfoChoice(e[c]));}var d = KJUR.asn1.ASN1Util.newObject({ tag: { tagi: "a1", obj: { set: b } } });return d.getEncodedHex();};if (a != undefined) {this.setByParam(a);}};YAHOO.lang.extend(KJUR.asn1.cms.RevocationInfoChoices, KJUR.asn1.ASN1Object);KJUR.asn1.cms.RevocationInfoChoice = function (a) {KJUR.asn1.cms.RevocationInfoChoice.superclass.constructor.call(this);this.params = null;this.getEncodedHex = function () {var d = this.params;if (d.crl != undefined && typeof d.crl == "string") {var b = d.crl;if (d.crl.indexOf("-----BEGIN") != -1) {b = pemtohex(d.crl);}return b;} else {if (d.ocsp != undefined) {var c = KJUR.asn1.ASN1Util.newObject({ tag: { tagi: "a1", obj: new KJUR.asn1.cms.OtherRevocationFormat(d) } });return c.getEncodedHex();} else {throw new Error("property crl or ocsp undefined");}}};if (a != undefined) {this.setByParam(a);}};YAHOO.lang.extend(KJUR.asn1.cms.RevocationInfoChoice, KJUR.asn1.ASN1Object);KJUR.asn1.cms.OtherRevocationFormat = function (f) {KJUR.asn1.cms.OtherRevocationFormat.superclass.constructor.call(this);var d = Error,c = KJUR,b = c.asn1,a = b.ASN1Util.newObject,e = c.lang.String.isHex;this.params = null;this.getEncodedHex = function () {var h = this.params;if (h.ocsp == undefined) {throw new d("property ocsp not specified");}if (!e(h.ocsp) || !ASN1HEX.isASN1HEX(h.ocsp)) {throw new d("ocsp value not ASN.1 hex string");}var g = a({ seq: [{ oid: "1.3.6.1.5.5.7.16.2" }, { asn1: { tlv: h.ocsp } }] });return g.getEncodedHex();};if (f != undefined) {this.setByParam(f);}};YAHOO.lang.extend(KJUR.asn1.cms.OtherRevocationFormat, KJUR.asn1.ASN1Object);KJUR.asn1.cms.CMSUtil = new function () {}();KJUR.asn1.cms.CMSUtil.newSignedData = function (a) {return new KJUR.asn1.cms.SignedData(a);};KJUR.asn1.cms.CMSUtil.verifySignedData = function (n) {var C = KJUR,p = C.asn1,s = p.cms,D = s.SignerInfo,q = s.SignedData,y = s.SigningTime,b = s.SigningCertificate,d = s.SigningCertificateV2,A = p.cades,u = A.SignaturePolicyIdentifier,i = C.lang.String.isHex,v = ASN1HEX,h = v.getVbyList,a = v.getTLVbyList,t = v.getIdxbyList,z = v.getChildIdx,c = v.getTLV,B = v.oidname,j = C.crypto.Util.hashHex;if (n.cms === undefined && !i(n.cms)) {}var E = n.cms;var g = function g(J, H) {var G;for (var I = 3; I < 6; I++) {G = t(J, 0, [1, 0, I]);if (G !== undefined) {var F = J.substr(G, 2);if (F === "a0") {H.certsIdx = G;}if (F === "a1") {H.revinfosIdx = G;}if (F === "31") {H.signerinfosIdx = G;}}}};var l = function l(I, F) {var H = F.signerinfosIdx;if (H === undefined) {return;}var L = z(I, H);F.signerInfoIdxList = L;for (var G = 0; G < L.length; G++) {var K = L[G];var J = { idx: K };k(I, J);F.signerInfos.push(J);}};var k = function k(I, J) {var F = J.idx;J.signerid_issuer1 = a(I, F, [1, 0], "30");J.signerid_serial1 = h(I, F, [1, 1], "02");J.hashalg = B(h(I, F, [2, 0], "06"));var H = t(I, F, [3], "a0");J.idxSignedAttrs = H;f(I, J, H);var G = z(I, F);var K = G.length;if (K < 6) {throw "malformed SignerInfo";}J.sigalg = B(h(I, F, [K - 2, 0], "06"));J.sigval = h(I, F, [K - 1], "04");};var f = function f(L, M, F) {var J = z(L, F);M.signedAttrIdxList = J;for (var K = 0; K < J.length; K++) {var I = J[K];var G = h(L, I, [0], "06");var H;if (G === "2a864886f70d010905") {H = hextoutf8(h(L, I, [1, 0]));M.saSigningTime = H;} else {if (G === "2a864886f70d010904") {H = h(L, I, [1, 0], "04");M.saMessageDigest = H;}}}};var w = function w(G, F) {if (h(G, 0, [0], "06") !== "2a864886f70d010702") {return F;}F.cmsType = "signedData";F.econtent = h(G, 0, [1, 0, 2, 1, 0]);g(G, F);F.signerInfos = [];l(G, F);};var o = function o(J, F) {var G = F.parse.signerInfos;var L = G.length;var K = true;for (var I = 0; I < L; I++) {var H = G[I];e(J, F, H, I);if (!H.isValid) {K = false;}}F.isValid = K;};var x = function x(F, Q, J, P) {var N = Q.parse.certsIdx;var H;if (Q.certs === undefined) {H = [];Q.certkeys = [];var K = z(F, N);for (var I = 0; I < K.length; I++) {var M = c(F, K[I]);var O = new X509();O.readCertHex(M);H[I] = O;Q.certkeys[I] = O.getPublicKey();}Q.certs = H;} else {H = Q.certs;}Q.cccc = H.length;Q.cccci = K.length;for (var I = 0; I < H.length; I++) {var L = O.getIssuerHex();var G = O.getSerialNumberHex();if (J.signerid_issuer1 === L && J.signerid_serial1 === G) {J.certkey_idx = I;}}};var e = function e(F, R, I, N) {I.verifyDetail = {};var Q = I.verifyDetail;var K = R.parse.econtent;var G = I.hashalg;var L = I.saMessageDigest;Q.validMessageDigest = false;if (j(K, G) === L) {Q.validMessageDigest = true;}x(F, R, I, N);Q.validSignatureValue = false;var H = I.sigalg;var M = "31" + c(F, I.idxSignedAttrs).substr(2);I.signedattrshex = M;var J = R.certs[I.certkey_idx].getPublicKey();var P = new KJUR.crypto.Signature({ alg: H });P.init(J);P.updateHex(M);var O = P.verify(I.sigval);Q.validSignatureValue_isValid = O;if (O === true) {Q.validSignatureValue = true;}I.isValid = false;if (Q.validMessageDigest && Q.validSignatureValue) {I.isValid = true;}};var m = function m() {};var r = { isValid: false, parse: {} };w(E, r.parse);o(E, r);return r;};KJUR.asn1.cms.CMSParser = function () {var g = Error,a = X509,h = new a(),l = ASN1HEX,i = l.getV,b = l.getTLV,f = l.getIdxbyList,c = l.getTLVbyList,d = l.getTLVbyListEx,e = l.getVbyList,k = l.getVbyListEx,j = l.getChildIdx;this.getCMSSignedData = function (m) {var o = c(m, 0, [1, 0]);var n = this.getSignedData(o);return n;};this.getSignedData = function (o) {var q = j(o, 0);var v = {};var p = i(o, q[0]);var n = parseInt(p, 16);v.version = n;var r = b(o, q[1]);v.hashalgs = this.getHashAlgArray(r);var t = b(o, q[2]);v.econtent = this.getEContent(t);var m = d(o, 0, ["[0]"]);if (m != null) {v.certs = this.getCertificateSet(m);}var u = d(o, 0, ["[1]"]);if (u != null) {}var s = d(o, 0, [3]);v.sinfos = this.getSignerInfos(s);return v;};this.getHashAlgArray = function (s) {var q = j(s, 0);var m = new a();var n = [];for (var r = 0; r < q.length; r++) {var p = b(s, q[r]);var o = m.getAlgorithmIdentifierName(p);n.push(o);}return n;};this.getEContent = function (m) {var n = {};var p = e(m, 0, [0]);var o = e(m, 0, [1, 0]);n.type = KJUR.asn1.x509.OID.oid2name(ASN1HEX.hextooidstr(p));n.content = { hex: o };return n;};this.getSignerInfos = function (p) {var r = [];var m = j(p, 0);for (var n = 0; n < m.length; n++) {var o = b(p, m[n]);var q = this.getSignerInfo(o);r.push(q);}return r;};this.getSignerInfo = function (s) {var y = {};var u = j(s, 0);var q = l.getInt(s, u[0], -1);if (q != -1) {y.version = q;}var t = b(s, u[1]);var p = this.getIssuerAndSerialNumber(t);y.id = p;var z = b(s, u[2]);var n = h.getAlgorithmIdentifierName(z);y.hashalg = n;var w = d(s, 0, ["[0]"]);if (w != null) {var A = this.getAttributeList(w);y.sattrs = A;}var m = d(s, 0, [3]);var x = h.getAlgorithmIdentifierName(m);y.sigalg = x;var o = k(s, 0, [4]);y.sighex = o;var r = d(s, 0, ["[1]"]);if (r != null) {var v = this.getAttributeList(r);y.uattrs = v;}return y;};this.getSignerIdentifier = function (m) {if (m.substr(0, 2) == "30") {return this.getIssuerAndSerialNumber(m);} else {throw new Error("SKID of signerIdentifier not supported");}};this.getIssuerAndSerialNumber = function (n) {var o = { type: "isssn" };var m = j(n, 0);var p = b(n, m[0]);o.issuer = h.getX500Name(p);var q = i(n, m[1]);o.serial = { hex: q };return o;};this.getAttributeList = function (q) {var m = [];var n = j(q, 0);for (var o = 0; o < n.length; o++) {var p = b(q, n[o]);var r = this.getAttribute(p);m.push(r);}return { array: m };};this.getAttribute = function (p) {var t = {};var q = j(p, 0);var o = l.getOID(p, q[0]);var m = KJUR.asn1.x509.OID.oid2name(o);t.attr = m;var r = b(p, q[1]);var u = j(r, 0);if (u.length == 1) {t.valhex = b(r, u[0]);} else {var s = [];for (var n = 0; n < u.length; n++) {s.push(b(r, u[n]));}t.valhex = s;}if (m == "contentType") {this.setContentType(t);} else {if (m == "messageDigest") {this.setMessageDigest(t);} else {if (m == "signingTime") {this.setSigningTime(t);} else {if (m == "signingCertificate") {this.setSigningCertificate(t);} else {if (m == "signingCertificateV2") {this.setSigningCertificateV2(t);} else {if (m == "signaturePolicyIdentifier") {this.setSignaturePolicyIdentifier(t);}}}}}}return t;};this.setContentType = function (m) {var n = l.getOIDName(m.valhex, 0, null);if (n != null) {m.type = n;delete m.valhex;}};this.setSigningTime = function (o) {var n = i(o.valhex, 0);var m = hextoutf8(n);o.str = m;delete o.valhex;};this.setMessageDigest = function (m) {var n = i(m.valhex, 0);m.hex = n;delete m.valhex;};this.setSigningCertificate = function (n) {var q = j(n.valhex, 0);if (q.length > 0) {var m = b(n.valhex, q[0]);var p = j(m, 0);var t = [];for (var o = 0; o < p.length; o++) {var s = b(m, p[o]);var u = this.getESSCertID(s);t.push(u);}n.array = t;}if (q.length > 1) {var r = b(n.valhex, q[1]);n.polhex = r;}delete n.valhex;};this.setSignaturePolicyIdentifier = function (s) {var q = j(s.valhex, 0);if (q.length > 0) {var r = l.getOID(s.valhex, q[0]);s.oid = r;}if (q.length > 1) {var m = new a();var t = j(s.valhex, q[1]);var p = b(s.valhex, t[0]);var o = m.getAlgorithmIdentifierName(p);s.alg = o;var n = i(s.valhex, t[1]);s.hash = n;}delete s.valhex;};this.setSigningCertificateV2 = function (o) {var s = j(o.valhex, 0);if (s.length > 0) {var n = b(o.valhex, s[0]);var r = j(n, 0);var u = [];for (var q = 0; q < r.length; q++) {var m = b(n, r[q]);var p = this.getESSCertIDv2(m);u.push(p);}o.array = u;}if (s.length > 1) {var t = b(o.valhex, s[1]);o.polhex = t;}delete o.valhex;};this.getESSCertID = function (o) {var p = {};var n = j(o, 0);if (n.length > 0) {var q = i(o, n[0]);p.hash = q;}if (n.length > 1) {var m = b(o, n[1]);var r = this.getIssuerSerial(m);if (r.serial != undefined) {p.serial = r.serial;}if (r.issuer != undefined) {p.issuer = r.issuer;}}return p;};this.getESSCertIDv2 = function (q) {var s = {};var p = j(q, 0);if (p.length < 1 || 3 < p.length) {throw new g("wrong number of elements");}var r = 0;if (q.substr(p[0], 2) == "30") {var o = b(q, p[0]);s.alg = h.getAlgorithmIdentifierName(o);r++;} else {s.alg = "sha256";}var n = i(q, p[r]);s.hash = n;if (p.length > r + 1) {var m = b(q, p[r + 1]);var t = this.getIssuerSerial(m);s.issuer = t.issuer;s.serial = t.serial;}return s;};this.getIssuerSerial = function (q) {var r = {};var n = j(q, 0);var m = b(q, n[0]);var p = h.getGeneralNames(m);var o = p[0].dn;r.issuer = o;var s = i(q, n[1]);r.serial = { hex: s };return r;};this.getCertificateSet = function (p) {var n = j(p, 0);var m = [];for (var o = 0; o < n.length; o++) {var r = b(p, n[o]);if (r.substr(0, 2) == "30") {var q = hextopem(r, "CERTIFICATE");m.push(q);}}return { array: m, sortflag: false };};};
if (typeof KJUR == "undefined" || !KJUR) {KJUR = {};}if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {KJUR.asn1 = {};}if (typeof KJUR.asn1.tsp == "undefined" || !KJUR.asn1.tsp) {KJUR.asn1.tsp = {};}KJUR.asn1.tsp.TimeStampToken = function (d) {var c = KJUR,b = c.asn1,a = b.tsp;a.TimeStampToken.superclass.constructor.call(this);this.params = null;this.getEncodedHexPrepare = function () {var e = new a.TSTInfo(this.params.econtent.content);this.params.econtent.content.hex = e.getEncodedHex();};if (d != undefined) {this.setByParam(d);}};YAHOO.lang.extend(KJUR.asn1.tsp.TimeStampToken, KJUR.asn1.cms.SignedData);KJUR.asn1.tsp.TSTInfo = function (f) {var m = Error,c = KJUR,j = c.asn1,g = j.DERSequence,i = j.DERInteger,l = j.DERBoolean,h = j.DERGeneralizedTime,n = j.DERObjectIdentifier,e = j.DERTaggedObject,k = j.tsp,d = k.MessageImprint,b = k.Accuracy,a = j.x509.X500Name,o = j.x509.GeneralName;k.TSTInfo.superclass.constructor.call(this);this.dVersion = new i({ "int": 1 });this.dPolicy = null;this.dMessageImprint = null;this.dSerial = null;this.dGenTime = null;this.dAccuracy = null;this.dOrdering = null;this.dNonce = null;this.dTsa = null;this.getEncodedHex = function () {var p = [this.dVersion];if (this.dPolicy == null) {throw new Error("policy shall be specified.");}p.push(this.dPolicy);if (this.dMessageImprint == null) {throw new Error("messageImprint shall be specified.");}p.push(this.dMessageImprint);if (this.dSerial == null) {throw new Error("serialNumber shall be specified.");}p.push(this.dSerial);if (this.dGenTime == null) {throw new Error("genTime shall be specified.");}p.push(this.dGenTime);if (this.dAccuracy != null) {p.push(this.dAccuracy);}if (this.dOrdering != null) {p.push(this.dOrdering);}if (this.dNonce != null) {p.push(this.dNonce);}if (this.dTsa != null) {p.push(this.dTsa);}var q = new g({ array: p });this.hTLV = q.getEncodedHex();return this.hTLV;};if (f !== undefined) {if (typeof f.policy == "string") {if (!f.policy.match(/^[0-9.]+$/)) {throw "policy shall be oid like 0.1.4.134";}this.dPolicy = new n({ oid: f.policy });}if (f.messageImprint !== undefined) {this.dMessageImprint = new d(f.messageImprint);}if (f.serial !== undefined) {this.dSerial = new i(f.serial);}if (f.genTime !== undefined) {this.dGenTime = new h(f.genTime);}if (f.accuracy !== undefined) {this.dAccuracy = new b(f.accuracy);}if (f.ordering !== undefined && f.ordering == true) {this.dOrdering = new l();}if (f.nonce !== undefined) {this.dNonce = new i(f.nonce);}if (f.tsa !== undefined) {this.dTsa = new e({ tag: "a0", explicit: true, obj: new o({ dn: f.tsa }) });}}};YAHOO.lang.extend(KJUR.asn1.tsp.TSTInfo, KJUR.asn1.ASN1Object);KJUR.asn1.tsp.Accuracy = function (d) {var c = KJUR,b = c.asn1,a = b.ASN1Util.newObject;b.tsp.Accuracy.superclass.constructor.call(this);this.params = null;this.getEncodedHex = function () {var f = this.params;var e = [];if (f.seconds != undefined && typeof f.seconds == "number") {e.push({ "int": f.seconds });}if (f.millis != undefined && typeof f.millis == "number") {e.push({ tag: { tagi: "80", obj: { "int": f.millis } } });}if (f.micros != undefined && typeof f.micros == "number") {e.push({ tag: { tagi: "81", obj: { "int": f.micros } } });}return a({ seq: e }).getEncodedHex();};if (d != undefined) {this.setByParam(d);}};YAHOO.lang.extend(KJUR.asn1.tsp.Accuracy, KJUR.asn1.ASN1Object);KJUR.asn1.tsp.MessageImprint = function (g) {var c = KJUR,b = c.asn1,a = b.DERSequence,d = b.DEROctetString,f = b.x509,e = f.AlgorithmIdentifier;b.tsp.MessageImprint.superclass.constructor.call(this);this.params = null;this.getEncodedHex = function () {var k = this.params;var j = new e({ name: k.alg });var h = new d({ hex: k.hash });var i = new a({ array: [j, h] });return i.getEncodedHex();};if (g !== undefined) {this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.tsp.MessageImprint, KJUR.asn1.ASN1Object);KJUR.asn1.tsp.TimeStampReq = function (c) {var a = KJUR,f = a.asn1,d = f.DERSequence,e = f.DERInteger,h = f.DERBoolean,j = f.ASN1Object,i = f.DERObjectIdentifier,g = f.tsp,b = g.MessageImprint;g.TimeStampReq.superclass.constructor.call(this);this.params = null;this.getEncodedHex = function () {var m = this.params;var k = [];k.push(new e({ "int": 1 }));if (m.messageImprint instanceof KJUR.asn1.ASN1Object) {k.push(m.messageImprint);} else {k.push(new b(m.messageImprint));}if (m.policy != undefined) {k.push(new i(m.policy));}if (m.nonce != undefined) {k.push(new e(m.nonce));}if (m.certreq == true) {k.push(new h());}var l = new d({ array: k });return l.getEncodedHex();};if (c != undefined) {this.setByParam(c);}};YAHOO.lang.extend(KJUR.asn1.tsp.TimeStampReq, KJUR.asn1.ASN1Object);KJUR.asn1.tsp.TimeStampResp = function (g) {var e = KJUR,d = e.asn1,c = d.DERSequence,f = d.ASN1Object,a = d.tsp,b = a.PKIStatusInfo;a.TimeStampResp.superclass.constructor.call(this);this.params = null;this.getEncodedHex = function () {var j = this.params;var h = [new b(j.statusinfo)];if (j.econtent != undefined) {h.push(new a.TimeStampToken(j).getContentInfo());}if (j.tst != undefined && j.tst instanceof d.ASN1Object) {h.push(j.tst);}var i = new c({ array: h });return i.getEncodedHex();};if (g != undefined) {this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.tsp.TimeStampResp, KJUR.asn1.ASN1Object);KJUR.asn1.tsp.PKIStatusInfo = function (d) {var h = Error,a = KJUR,g = a.asn1,e = g.DERSequence,i = g.tsp,f = i.PKIStatus,c = i.PKIFreeText,b = i.PKIFailureInfo;i.PKIStatusInfo.superclass.constructor.call(this);this.params = null;this.getEncodedHex = function () {var l = this.params;var j = [];if (typeof l == "string") {j.push(new f(l));} else {if (l.status == undefined) {throw new h("property 'status' unspecified");}j.push(new f(l.status));if (l.statusstr != undefined) {j.push(new c(l.statusstr));}if (l.failinfo != undefined) {j.push(new b(l.failinfo));}}var k = new e({ array: j });return k.getEncodedHex();};if (d != undefined) {this.setByParam(d);}};YAHOO.lang.extend(KJUR.asn1.tsp.PKIStatusInfo, KJUR.asn1.ASN1Object);KJUR.asn1.tsp.PKIStatus = function (g) {var e = Error,d = KJUR,c = d.asn1,f = c.DERInteger,b = c.tsp;b.PKIStatus.superclass.constructor.call(this);var a = { granted: 0, grantedWithMods: 1, rejection: 2, waiting: 3, revocationWarning: 4, revocationNotification: 5 };this.params = null;this.getEncodedHex = function () {var k = this.params;var h, j;if (typeof k == "string") {try {j = a[k];} catch (i) {throw new e("undefined name: " + k);}} else {if (typeof k == "number") {j = k;} else {throw new e("unsupported params");}}return new f({ "int": j }).getEncodedHex();};if (g != undefined) {this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.tsp.PKIStatus, KJUR.asn1.ASN1Object);KJUR.asn1.tsp.PKIFreeText = function (g) {var f = Error,e = KJUR,d = e.asn1,b = d.DERSequence,c = d.DERUTF8String,a = d.tsp;a.PKIFreeText.superclass.constructor.call(this);this.params = null;this.getEncodedHex = function () {var l = this.params;if (!l instanceof Array) {throw new f("wrong params: not array");}var h = [];for (var k = 0; k < l.length; k++) {h.push(new c({ str: l[k] }));}var j = new b({ array: h });return j.getEncodedHex();};if (g != undefined) {this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.tsp.PKIFreeText, KJUR.asn1.ASN1Object);KJUR.asn1.tsp.PKIFailureInfo = function (h) {var f = Error,e = KJUR,d = e.asn1,g = d.DERBitString,b = d.tsp,c = b.PKIFailureInfo;var a = { badAlg: 0, badRequest: 2, badDataFormat: 5, timeNotAvailable: 14, unacceptedPolicy: 15, unacceptedExtension: 16, addInfoNotAvailable: 17, systemFailure: 25 };c.superclass.constructor.call(this);this.params = null;this.getEncodedHex = function () {var k = this.params;var j;if (typeof k == "string") {try {j = a[k];} catch (i) {throw new f("undefined name: " + k);}} else {if (typeof k == "number") {j = k;} else {throw new f("wrong params");}}return new g({ bin: j.toString(2) }).getEncodedHex();};if (h != undefined) {this.setByParam(h);}};YAHOO.lang.extend(KJUR.asn1.tsp.PKIFailureInfo, KJUR.asn1.ASN1Object);KJUR.asn1.tsp.AbstractTSAAdapter = function (a) {this.getTSTHex = function (c, b) {throw "not implemented yet";};};KJUR.asn1.tsp.SimpleTSAAdapter = function (e) {var d = KJUR,c = d.asn1,a = c.tsp,b = d.crypto.Util.hashHex;a.SimpleTSAAdapter.superclass.constructor.call(this);this.params = null;this.serial = 0;this.getTSTHex = function (g, f) {var i = b(g, f);this.params.econtent.content.messageImprint = { alg: f, hash: i };this.params.econtent.content.serial = { "int": this.serial++ };var h = Math.floor(Math.random() * 1000000000);this.params.econtent.content.nonce = { "int": h };var j = new a.TimeStampToken(this.params);return j.getContentInfoEncodedHex();};if (e !== undefined) {this.params = e;}};YAHOO.lang.extend(KJUR.asn1.tsp.SimpleTSAAdapter, KJUR.asn1.tsp.AbstractTSAAdapter);KJUR.asn1.tsp.FixedTSAAdapter = function (e) {var d = KJUR,c = d.asn1,a = c.tsp,b = d.crypto.Util.hashHex;a.FixedTSAAdapter.superclass.constructor.call(this);this.params = null;this.getTSTHex = function (g, f) {var h = b(g, f);this.params.econtent.content.messageImprint = { alg: f, hash: h };var i = new a.TimeStampToken(this.params);return i.getContentInfoEncodedHex();};if (e !== undefined) {this.params = e;}};YAHOO.lang.extend(KJUR.asn1.tsp.FixedTSAAdapter, KJUR.asn1.tsp.AbstractTSAAdapter);KJUR.asn1.tsp.TSPUtil = new function () {}();KJUR.asn1.tsp.TSPUtil.newTimeStampToken = function (a) {return new KJUR.asn1.tsp.TimeStampToken(a);};KJUR.asn1.tsp.TSPUtil.parseTimeStampReq = function (m) {var l = ASN1HEX;var h = l.getChildIdx;var f = l.getV;var b = l.getTLV;var j = {};j.certreq = false;var a = h(m, 0);if (a.length < 2) {throw "TimeStampReq must have at least 2 items";}var e = b(m, a[1]);j.messageImprint = KJUR.asn1.tsp.TSPUtil.parseMessageImprint(e);for (var d = 2; d < a.length; d++) {var g = a[d];var k = m.substr(g, 2);if (k == "06") {var c = f(m, g);j.policy = l.hextooidstr(c);}if (k == "02") {j.nonce = f(m, g);}if (k == "01") {j.certreq = true;}}return j;};KJUR.asn1.tsp.TSPUtil.parseMessageImprint = function (c) {var m = ASN1HEX;var j = m.getChildIdx;var i = m.getV;var g = m.getIdxbyList;var k = {};if (c.substr(0, 2) != "30") {throw "head of messageImprint hex shall be '30'";}var a = j(c, 0);var l = g(c, 0, [0, 0]);var e = i(c, l);var d = m.hextooidstr(e);var h = KJUR.asn1.x509.OID.oid2name(d);if (h == "") {throw "hashAlg name undefined: " + d;}var b = h;var f = g(c, 0, [1]);k.alg = b;k.hash = i(c, f);return k;};KJUR.asn1.tsp.TSPParser = function () {var e = Error,a = X509,f = new a(),k = ASN1HEX,g = k.getV,b = k.getTLV,d = k.getIdxbyList,c = k.getTLVbyListEx,i = k.getChildIdx;var j = ["granted", "grantedWithMods", "rejection", "waiting", "revocationWarning", "revocationNotification"];var h = { 0: "badAlg", 2: "badRequest", 5: "badDataFormat", 14: "timeNotAvailable", 15: "unacceptedPolicy", 16: "unacceptedExtension", 17: "addInfoNotAvailable", 25: "systemFailure" };this.getResponse = function (n) {var l = i(n, 0);if (l.length == 1) {return this.getPKIStatusInfo(b(n, l[0]));} else {if (l.length > 1) {var o = this.getPKIStatusInfo(b(n, l[0]));var m = b(n, l[1]);var p = this.getToken(m);p.statusinfo = o;return p;}}};this.getToken = function (m) {var l = new KJUR.asn1.cms.CMSParser();var n = l.getCMSSignedData(m);this.setTSTInfo(n);return n;};this.setTSTInfo = function (l) {var o = l.econtent;if (o.type == "tstinfo") {var n = o.content.hex;var m = this.getTSTInfo(n);o.content = m;}};this.getTSTInfo = function (r) {var x = {};var s = i(r, 0);var p = g(r, s[1]);x.policy = hextooid(p);var o = b(r, s[2]);x.messageImprint = this.getMessageImprint(o);var u = g(r, s[3]);x.serial = { hex: u };var y = g(r, s[4]);x.genTime = { str: hextoutf8(y) };var q = 0;if (s.length > 5 && r.substr(s[5], 2) == "30") {var v = b(r, s[5]);x.accuracy = this.getAccuracy(v);q++;}if (s.length > 5 + q && r.substr(s[5 + q], 2) == "01") {var z = g(r, s[5 + q]);if (z == "ff") {x.ordering = true;}q++;}if (s.length > 5 + q && r.substr(s[5 + q], 2) == "02") {var n = g(r, s[5 + q]);x.nonce = { hex: n };q++;}if (s.length > 5 + q && r.substr(s[5 + q], 2) == "a0") {var m = b(r, s[5 + q]);m = "30" + m.substr(2);pGeneralNames = f.getGeneralNames(m);var t = pGeneralNames[0].dn;x.tsa = t;q++;}if (s.length > 5 + q && r.substr(s[5 + q], 2) == "a1") {var l = b(r, s[5 + q]);l = "30" + l.substr(2);var w = f.getExtParamArray(l);x.ext = w;q++;}return x;};this.getAccuracy = function (q) {var r = {};var o = i(q, 0);for (var p = 0; p < o.length; p++) {var m = q.substr(o[p], 2);var l = g(q, o[p]);var n = parseInt(l, 16);if (m == "02") {r.seconds = n;} else {if (m == "80") {r.millis = n;} else {if (m == "81") {r.micros = n;}}}}return r;};this.getMessageImprint = function (n) {if (n.substr(0, 2) != "30") {throw new Error("head of messageImprint hex shall be x30");}var s = {};var l = i(n, 0);var t = d(n, 0, [0, 0]);var o = g(n, t);var p = k.hextooidstr(o);var r = KJUR.asn1.x509.OID.oid2name(p);if (r == "") {throw new Error("hashAlg name undefined: " + p);}var m = r;var q = d(n, 0, [1]);s.alg = m;s.hash = g(n, q);return s;};this.getPKIStatusInfo = function (o) {var t = {};var r = i(o, 0);var n = 0;try {var l = g(o, r[0]);var p = parseInt(l, 16);t.status = j[p];} catch (s) {}if (r.length > 1 && o.substr(r[1], 2) == "30") {var m = b(o, r[1]);t.statusstr = this.getPKIFreeText(m);n++;}if (r.length > n && o.substr(r[1 + n], 2) == "03") {var q = b(o, r[1 + n]);t.failinfo = this.getPKIFailureInfo(q);}return t;};this.getPKIFreeText = function (n) {var o = [];var l = i(n, 0);for (var m = 0; m < l.length; m++) {o.push(k.getString(n, l[m]));}return o;};this.getPKIFailureInfo = function (l) {var m = k.getInt(l, 0);if (h[m] != undefined) {return h[m];} else {return m;}};};
if (typeof KJUR == "undefined" || !KJUR) {KJUR = {};}if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {KJUR.asn1 = {};}if (typeof KJUR.asn1.cades == "undefined" || !KJUR.asn1.cades) {KJUR.asn1.cades = {};}KJUR.asn1.cades.SignaturePolicyIdentifier = function (e) {var c = KJUR,b = c.asn1,a = b.cades,d = a.SignaturePolicyId;a.SignaturePolicyIdentifier.superclass.constructor.call(this);this.typeOid = "1.2.840.113549.1.9.16.2.15";this.params = null;this.getValueArray = function () {return [new d(this.params)];};this.setByParam = function (f) {this.params = f;};if (e != undefined) {this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.cades.SignaturePolicyIdentifier, KJUR.asn1.cms.Attribute);KJUR.asn1.cades.SignaturePolicyId = function (e) {var a = KJUR,g = a.asn1,f = g.DERSequence,i = g.DERObjectIdentifier,d = g.x509,j = d.AlgorithmIdentifier,c = g.cades,h = c.SignaturePolicyId,b = c.OtherHashAlgAndValue;h.superclass.constructor.call(this);this.params = null;this.getEncodedHex = function () {var m = this.params;var k = [];k.push(new i(m.oid));k.push(new b(m));var l = new f({ array: k });return l.getEncodedHex();};this.setByParam = function (k) {this.params = k;};if (e != undefined) {this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.cades.SignaturePolicyId, KJUR.asn1.ASN1Object);KJUR.asn1.cades.OtherHashAlgAndValue = function (e) {var h = Error,a = KJUR,g = a.asn1,f = g.DERSequence,i = g.DEROctetString,d = g.x509,j = d.AlgorithmIdentifier,c = g.cades,b = c.OtherHashAlgAndValue;b.superclass.constructor.call(this);this.params = null;this.getEncodedHex = function () {var o = this.params;if (o.alg == undefined) {throw new h("property 'alg' not specified");}if (o.hash == undefined && o.cert == undefined) {throw new h("property 'hash' nor 'cert' not specified");}var m = null;if (o.hash != undefined) {m = o.hash;} else {if (o.cert != undefined) {if (typeof o.cert != "string") {throw new h("cert not string");}var n = o.cert;if (o.cert.indexOf("-----BEGIN") != -1) {n = pemtohex(o.cert);}m = KJUR.crypto.Util.hashHex(n, o.alg);}}var k = [];k.push(new j({ name: o.alg }));k.push(new i({ hex: m }));var l = new f({ array: k });return l.getEncodedHex();};if (e != undefined) {this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.cades.OtherHashAlgAndValue, KJUR.asn1.ASN1Object);KJUR.asn1.cades.OtherHashValue = function (g) {KJUR.asn1.cades.OtherHashValue.superclass.constructor.call(this);var d = Error,c = KJUR,f = c.lang.String.isHex,b = c.asn1,e = b.DEROctetString,a = c.crypto.Util.hashHex;this.params = null;this.getEncodedHex = function () {var j = this.params;if (j.hash == undefined && j.cert == undefined) {throw new d("hash or cert not specified");}var h = null;if (j.hash != undefined) {h = j.hash;} else {if (j.cert != undefined) {if (typeof j.cert != "string") {throw new d("cert not string");}var i = j.cert;if (j.cert.indexOf("-----BEGIN") != -1) {i = pemtohex(j.cert);}h = KJUR.crypto.Util.hashHex(i, "sha1");}}return new e({ hex: h }).getEncodedHex();};if (g != undefined) {this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.cades.OtherHashValue, KJUR.asn1.ASN1Object);KJUR.asn1.cades.SignatureTimeStamp = function (h) {var d = Error,c = KJUR,f = c.lang.String.isHex,b = c.asn1,e = b.ASN1Object,g = b.x509,a = b.cades;a.SignatureTimeStamp.superclass.constructor.call(this);this.typeOid = "1.2.840.113549.1.9.16.2.14";this.params = null;this.getValueArray = function () {var l = this.params;if (l.tst != undefined) {if (f(l.tst)) {var j = new e();j.hTLV = l.tst;return [j];} else {if (l.tst instanceof e) {return [l.tst];} else {throw new d("params.tst has wrong value");}}} else {if (l.res != undefined) {var k = l.res;if (k instanceof e) {k = k.getEncodedHex();}if (typeof k != "string" || !f(k)) {throw new d("params.res has wrong value");}var i = ASN1HEX.getTLVbyList(k, 0, [1]);var j = new e();j.hTLV = l.tst;return [j];}}};if (h != null) {this.setByParam(h);}};YAHOO.lang.extend(KJUR.asn1.cades.SignatureTimeStamp, KJUR.asn1.cms.Attribute);KJUR.asn1.cades.CompleteCertificateRefs = function (h) {var f = Error,e = KJUR,d = e.asn1,b = d.DERSequence,c = d.cades,a = c.OtherCertID,g = e.lang.String.isHex;c.CompleteCertificateRefs.superclass.constructor.call(this);this.typeOid = "1.2.840.113549.1.9.16.2.21";this.params = null;this.getValueArray = function () {var o = this.params;var k = [];for (var m = 0; m < o.array.length; m++) {var n = o.array[m];if (typeof n == "string") {if (n.indexOf("-----BEGIN") != -1) {n = { cert: n };} else {if (g(n)) {n = { hash: n };} else {throw new f("unsupported value: " + n);}}}if (o.alg != undefined && n.alg == undefined) {n.alg = o.alg;}if (o.hasis != undefined && n.hasis == undefined) {n.hasis = o.hasis;}var j = new a(n);k.push(j);}var l = new b({ array: k });return [l];};if (h != undefined) {this.setByParam(h);}};YAHOO.lang.extend(KJUR.asn1.cades.CompleteCertificateRefs, KJUR.asn1.cms.Attribute);KJUR.asn1.cades.OtherCertID = function (e) {var a = KJUR,h = a.asn1,f = h.DERSequence,i = h.cms,g = i.IssuerSerial,c = h.cades,d = c.OtherHashValue,b = c.OtherHashAlgAndValue;c.OtherCertID.superclass.constructor.call(this);this.params = e;this.getEncodedHex = function () {var n = this.params;if (typeof n == "string") {if (n.indexOf("-----BEGIN") != -1) {n = { cert: n };} else {if (_isHex(n)) {n = { hash: n };}}}var j = [];var m = null;if (n.alg != undefined) {m = new b(n);} else {m = new d(n);}j.push(m);if (n.cert != undefined && n.hasis == true || n.issuer != undefined && n.serial != undefined) {var l = new g(n);j.push(l);}var k = new f({ array: j });return k.getEncodedHex();};if (e != undefined) {this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.cades.OtherCertID, KJUR.asn1.ASN1Object);KJUR.asn1.cades.OtherHash = function (g) {var i = Error,a = KJUR,h = a.asn1,j = h.cms,c = h.cades,b = c.OtherHashAlgAndValue,e = c.OtherHashValue,d = a.crypto.Util.hashHex,f = a.lang.String.isHex;c.OtherHash.superclass.constructor.call(this);this.params = null;this.getEncodedHex = function () {var l = this.params;if (typeof l == "string") {if (l.indexOf("-----BEGIN") != -1) {l = { cert: l };} else {if (f(l)) {l = { hash: l };}}}var k = null;if (l.alg != undefined) {k = new b(l);} else {k = new e(l);}return k.getEncodedHex();};if (g != undefined) {this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.cades.OtherHash, KJUR.asn1.ASN1Object);KJUR.asn1.cades.CAdESUtil = new function () {}();KJUR.asn1.cades.CAdESUtil.parseSignedDataForAddingUnsigned = function (a) {var c = new KJUR.asn1.cms.CMSParser();var b = c.getCMSSignedData(a);return b;};KJUR.asn1.cades.CAdESUtil.parseSignerInfoForAddingUnsigned = function (g, q, c) {var p = ASN1HEX,s = p.getChildIdx,a = p.getTLV,l = p.getV,v = KJUR,h = v.asn1,n = h.ASN1Object,j = h.cms,k = j.AttributeList,w = j.SignerInfo;var o = {};var t = s(g, q);if (t.length != 6) {throw "not supported items for SignerInfo (!=6)";}var d = t.shift();o.version = a(g, d);var e = t.shift();o.si = a(g, e);var m = t.shift();o.digalg = a(g, m);var f = t.shift();o.sattrs = a(g, f);var i = t.shift();o.sigalg = a(g, i);var b = t.shift();o.sig = a(g, b);o.sigval = l(g, b);var u = null;o.obj = new w();u = new n();u.hTLV = o.version;o.obj.dCMSVersion = u;u = new n();u.hTLV = o.si;o.obj.dSignerIdentifier = u;u = new n();u.hTLV = o.digalg;o.obj.dDigestAlgorithm = u;u = new n();u.hTLV = o.sattrs;o.obj.dSignedAttrs = u;u = new n();u.hTLV = o.sigalg;o.obj.dSigAlg = u;u = new n();u.hTLV = o.sig;o.obj.dSig = u;o.obj.dUnsignedAttrs = new k();return o;};
if (typeof KJUR.asn1.csr == "undefined" || !KJUR.asn1.csr) {KJUR.asn1.csr = {};}KJUR.asn1.csr.CertificationRequest = function (g) {var d = KJUR,c = d.asn1,e = c.DERBitString,b = c.DERSequence,a = c.csr,f = c.x509,h = a.CertificationRequestInfo;a.CertificationRequest.superclass.constructor.call(this);this.setByParam = function (i) {this.params = i;};this.sign = function () {var j = new h(this.params).getEncodedHex();var k = new KJUR.crypto.Signature({ alg: this.params.sigalg });k.init(this.params.sbjprvkey);k.updateHex(j);var i = k.sign();this.params.sighex = i;};this.getPEM = function () {return hextopem(this.getEncodedHex(), "CERTIFICATE REQUEST");};this.getEncodedHex = function () {var l = this.params;var j = new KJUR.asn1.csr.CertificationRequestInfo(this.params);var m = new KJUR.asn1.x509.AlgorithmIdentifier({ name: l.sigalg });if (l.sighex == undefined && l.sbjprvkey != undefined) {this.sign();}if (l.sighex == undefined) {throw new Error("sighex or sbjprvkey parameter not defined");}var k = new e({ hex: "00" + l.sighex });var i = new b({ array: [j, m, k] });return i.getEncodedHex();};if (g !== undefined) {this.setByParam(g);}};YAHOO.lang.extend(KJUR.asn1.csr.CertificationRequest, KJUR.asn1.ASN1Object);KJUR.asn1.csr.CertificationRequestInfo = function (f) {var b = KJUR,j = b.asn1,c = j.DERBitString,g = j.DERSequence,i = j.DERInteger,n = j.DERUTF8String,d = j.DERTaggedObject,h = j.ASN1Util.newObject,l = j.csr,e = j.x509,a = e.X500Name,k = e.Extensions,m = e.SubjectPublicKeyInfo;l.CertificationRequestInfo.superclass.constructor.call(this);this.params = null;this.setByParam = function (o) {if (o != undefined) {this.params = o;}};this.getEncodedHex = function () {var s = this.params;var p = [];p.push(new i({ "int": 0 }));p.push(new a(s.subject));p.push(new m(KEYUTIL.getKey(s.sbjpubkey)));if (s.extreq != undefined) {var o = new k(s.extreq);var r = h({ tag: { tag: "a0", explict: true, obj: { seq: [{ oid: "1.2.840.113549.1.9.14" }, { set: [o] }] } } });p.push(r);} else {p.push(new d({ tag: "a0", explicit: false, obj: new n({ str: "" }) }));}var q = new g({ array: p });return q.getEncodedHex();};if (f != undefined) {this.setByParam(f);}};YAHOO.lang.extend(KJUR.asn1.csr.CertificationRequestInfo, KJUR.asn1.ASN1Object);KJUR.asn1.csr.CSRUtil = new function () {}();KJUR.asn1.csr.CSRUtil.newCSRPEM = function (e) {var b = KEYUTIL,a = KJUR.asn1.csr;var c = new a.CertificationRequest(e);var d = c.getPEM();return d;};KJUR.asn1.csr.CSRUtil.getParam = function (c) {var m = ASN1HEX,j = m.getV;_getIdxbyList = m.getIdxbyList;_getTLVbyList = m.getTLVbyList, _getTLVbyListEx = m.getTLVbyListEx, _getVbyListEx = m.getVbyListEx;var b = function b(p) {var o = _getIdxbyList(p, 0, [0, 3, 0, 0], "06");if (j(p, o) != "2a864886f70d01090e") {return null;}return _getTLVbyList(p, 0, [0, 3, 0, 1, 0], "30");};var n = {};if (c.indexOf("-----BEGIN CERTIFICATE REQUEST") == -1) {throw new Error("argument is not PEM file");}var e = pemtohex(c, "CERTIFICATE REQUEST");try {var g = _getTLVbyListEx(e, 0, [0, 1]);if (g == "3000") {n.subject = {};} else {var k = new X509();n.subject = k.getX500Name(g);}} catch (h) {}var d = _getTLVbyListEx(e, 0, [0, 2]);var f = KEYUTIL.getKey(d, null, "pkcs8pub");n.sbjpubkey = KEYUTIL.getPEM(f, "PKCS8PUB");var i = b(e);var k = new X509();if (i != null) {n.extreq = k.getExtParamArray(i);}try {var a = _getTLVbyListEx(e, 0, [1], "30");var k = new X509();n.sigalg = k.getAlgorithmIdentifierName(a);} catch (h) {}try {var l = _getVbyListEx(e, 0, [2]);n.sighex = l;} catch (h) {}return n;};
if (typeof KJUR == "undefined" || !KJUR) {KJUR = {};}if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {KJUR.asn1 = {};}if (typeof KJUR.asn1.ocsp == "undefined" || !KJUR.asn1.ocsp) {KJUR.asn1.ocsp = {};}KJUR.asn1.ocsp.DEFAULT_HASH = "sha1";KJUR.asn1.ocsp.OCSPResponse = function (e) {KJUR.asn1.ocsp.OCSPResponse.superclass.constructor.call(this);var a = KJUR.asn1.DEREnumerated,b = KJUR.asn1.ASN1Util.newObject,c = KJUR.asn1.ocsp.ResponseBytes;var d = ["successful", "malformedRequest", "internalError", "tryLater", "_not_used_", "sigRequired", "unauthorized"];this.params = null;this._getStatusCode = function () {var f = this.params.resstatus;if (typeof f == "number") {return f;}if (typeof f != "string") {return -1;}return d.indexOf(f);};this.setByParam = function (f) {this.params = f;};this.getEncodedHex = function () {var h = this.params;var g = this._getStatusCode();if (g == -1) {throw new Error("responseStatus not supported: " + h.resstatus);}if (g != 0) {return b({ seq: [{ "enum": { "int": g } }] }).getEncodedHex();}var f = new c(h);return b({ seq: [{ "enum": { "int": 0 } }, { tag: { tag: "a0", explicit: true, obj: f } }] }).getEncodedHex();};if (e !== undefined) {this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.ocsp.OCSPResponse, KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.ResponseBytes = function (e) {KJUR.asn1.ocsp.ResponseBytes.superclass.constructor.call(this);var b = KJUR.asn1,a = b.DERSequence,f = b.DERObjectIdentifier,c = b.DEROctetString,d = b.ocsp.BasicOCSPResponse;this.params = null;this.setByParam = function (g) {this.params = g;};this.getEncodedHex = function () {var j = this.params;if (j.restype != "ocspBasic") {throw new Error("not supported responseType: " + j.restype);}var i = new d(j);var g = [];g.push(new f({ name: "ocspBasic" }));g.push(new c({ hex: i.getEncodedHex() }));var h = new a({ array: g });return h.getEncodedHex();};if (e !== undefined) {this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.ocsp.ResponseBytes, KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.BasicOCSPResponse = function (d) {KJUR.asn1.ocsp.BasicOCSPResponse.superclass.constructor.call(this);var i = Error,g = KJUR.asn1,j = g.ASN1Object,e = g.DERSequence,f = g.DERGeneralizedTime,c = g.DERTaggedObject,b = g.DERBitString,h = g.x509.Extensions,k = g.x509.AlgorithmIdentifier,l = g.ocsp,a = l.ResponderID;_SingleResponseList = l.SingleResponseList, _ResponseData = l.ResponseData;this.params = null;this.setByParam = function (m) {this.params = m;};this.sign = function () {var o = this.params;var m = o.tbsresp.getEncodedHex();var n = new KJUR.crypto.Signature({ alg: o.sigalg });n.init(o.reskey);n.updateHex(m);o.sighex = n.sign();};this.getEncodedHex = function () {var t = this.params;if (t.tbsresp == undefined) {t.tbsresp = new _ResponseData(t);}if (t.sighex == undefined && t.reskey != undefined) {this.sign();}var n = [];n.push(t.tbsresp);n.push(new k({ name: t.sigalg }));n.push(new b({ hex: "00" + t.sighex }));if (t.certs != undefined && t.certs.length != undefined) {var m = [];for (var q = 0; q < t.certs.length; q++) {var s = t.certs[q];var r = null;if (ASN1HEX.isASN1HEX(s)) {r = s;} else {if (s.match(/-----BEGIN/)) {r = pemtohex(s);} else {throw new i("certs[" + q + "] not hex or PEM");}}m.push(new j({ tlv: r }));}var p = new e({ array: m });n.push(new c({ tag: "a0", explicit: true, obj: p }));}var o = new e({ array: n });return o.getEncodedHex();};if (d !== undefined) {this.setByParam(d);}};YAHOO.lang.extend(KJUR.asn1.ocsp.BasicOCSPResponse, KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.ResponseData = function (c) {KJUR.asn1.ocsp.ResponseData.superclass.constructor.call(this);var h = Error,f = KJUR.asn1,d = f.DERSequence,e = f.DERGeneralizedTime,b = f.DERTaggedObject,g = f.x509.Extensions,i = f.ocsp,a = i.ResponderID;_SingleResponseList = i.SingleResponseList;this.params = null;this.getEncodedHex = function () {var m = this.params;if (m.respid != undefined) {new h("respid not specified");}if (m.prodat != undefined) {new h("prodat not specified");}if (m.array != undefined) {new h("array not specified");}var j = [];j.push(new a(m.respid));j.push(new e(m.prodat));j.push(new _SingleResponseList(m.array));if (m.ext != undefined) {var l = new g(m.ext);j.push(new b({ tag: "a1", explicit: true, obj: l }));}var k = new d({ array: j });return k.getEncodedHex();};this.setByParam = function (j) {this.params = j;};if (c !== undefined) {this.setByParam(c);}};YAHOO.lang.extend(KJUR.asn1.ocsp.ResponseData, KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.ResponderID = function (d) {KJUR.asn1.ocsp.ResponderID.superclass.constructor.call(this);var b = KJUR.asn1,a = b.ASN1Util.newObject,c = b.x509.X500Name;this.params = null;this.getEncodedHex = function () {var f = this.params;if (f.key != undefined) {var e = a({ tag: { tag: "a2", explicit: true, obj: { octstr: { hex: f.key } } } });return e.getEncodedHex();} else {if (f.name != undefined) {var e = a({ tag: { tag: "a1", explicit: true, obj: new c(f.name) } });return e.getEncodedHex();}}throw new Error("key or name not specified");};this.setByParam = function (e) {this.params = e;};if (d !== undefined) {this.setByParam(d);}};YAHOO.lang.extend(KJUR.asn1.ocsp.ResponderID, KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.SingleResponseList = function (d) {KJUR.asn1.ocsp.SingleResponseList.superclass.constructor.call(this);var c = KJUR.asn1,b = c.DERSequence,a = c.ocsp.SingleResponse;this.params = null;this.getEncodedHex = function () {var h = this.params;if (typeof h != "object" || h.length == undefined) {throw new Error("params not specified properly");}var e = [];for (var g = 0; g < h.length; g++) {e.push(new a(h[g]));}var f = new b({ array: e });return f.getEncodedHex();};this.setByParam = function (e) {this.params = e;};if (d !== undefined) {this.setByParam(d);}};YAHOO.lang.extend(KJUR.asn1.ocsp.SingleResponseList, KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.SingleResponse = function (e) {var k = Error,a = KJUR,i = a.asn1,f = i.DERSequence,g = i.DERGeneralizedTime,b = i.DERTaggedObject,l = i.ocsp,h = l.CertID,c = l.CertStatus,d = i.x509,j = d.Extensions;l.SingleResponse.superclass.constructor.call(this);this.params = null;this.getEncodedHex = function () {var q = this.params;var n = [];if (q.certid == undefined) {throw new k("certid unspecified");}if (q.status == undefined) {throw new k("status unspecified");}if (q.thisupdate == undefined) {throw new k("thisupdate unspecified");}n.push(new h(q.certid));n.push(new c(q.status));n.push(new g(q.thisupdate));if (q.nextupdate != undefined) {var m = new g(q.nextupdate);n.push(new b({ tag: "a0", explicit: true, obj: m }));}if (q.ext != undefined) {var p = new j(q.ext);n.push(new b({ tag: "a1", explicit: true, obj: p }));}var o = new f({ array: n });return o.getEncodedHex();};this.setByParam = function (m) {this.params = m;};if (e !== undefined) {this.setByParam(e);}};YAHOO.lang.extend(KJUR.asn1.ocsp.SingleResponse, KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.CertID = function (g) {var d = KJUR,k = d.asn1,m = k.DEROctetString,j = k.DERInteger,h = k.DERSequence,f = k.x509,n = f.AlgorithmIdentifier,o = k.ocsp,l = o.DEFAULT_HASH,i = d.crypto,e = i.Util.hashHex,c = X509,q = ASN1HEX;o.CertID.superclass.constructor.call(this);this.dHashAlg = null;this.dIssuerNameHash = null;this.dIssuerKeyHash = null;this.dSerialNumber = null;this.setByValue = function (t, s, p, r) {if (r === undefined) {r = l;}this.dHashAlg = new n({ name: r });this.dIssuerNameHash = new m({ hex: t });this.dIssuerKeyHash = new m({ hex: s });this.dSerialNumber = new j({ hex: p });};this.setByCert = function (x, t, v) {if (v === undefined) {v = l;}var p = new c();p.readCertPEM(t);var y = new c();y.readCertPEM(x);var z = y.getPublicKeyHex();var w = q.getTLVbyList(z, 0, [1, 0], "30");var r = p.getSerialNumberHex();var s = e(y.getSubjectHex(), v);var u = e(w, v);this.setByValue(s, u, r, v);this.hoge = p.getSerialNumberHex();};this.getEncodedHex = function () {if (this.dHashAlg === null && this.dIssuerNameHash === null && this.dIssuerKeyHash === null && this.dSerialNumber === null) {throw "not yet set values";}var p = [this.dHashAlg, this.dIssuerNameHash, this.dIssuerKeyHash, this.dSerialNumber];var r = new h({ array: p });this.hTLV = r.getEncodedHex();return this.hTLV;};if (g !== undefined) {var b = g;if (b.issuerCert !== undefined && b.subjectCert !== undefined) {var a = l;if (b.alg === undefined) {a = undefined;}this.setByCert(b.issuerCert, b.subjectCert, a);} else {if (b.issname !== undefined && b.isskey !== undefined && b.sbjsn !== undefined) {var a = l;if (b.alg === undefined) {a = undefined;}this.setByValue(b.issname, b.isskey, b.sbjsn, a);} else {throw new Error("invalid constructor arguments");}}}};YAHOO.lang.extend(KJUR.asn1.ocsp.CertID, KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.CertStatus = function (a) {KJUR.asn1.ocsp.CertStatus.superclass.constructor.call(this);this.params = null;this.getEncodedHex = function () {var d = this.params;if (d.status == "good") {return "8000";}if (d.status == "unknown") {return "8200";}if (d.status == "revoked") {var c = [{ gentime: { str: d.time } }];if (d.reason != undefined) {c.push({ tag: { tag: "a0", explicit: true, obj: { "enum": { "int": d.reason } } } });}var b = { tag: "a1", explicit: false, obj: { seq: c } };return KJUR.asn1.ASN1Util.newObject({ tag: b }).getEncodedHex();}throw new Error("bad status");};this.setByParam = function (b) {this.params = b;};if (a !== undefined) {this.setByParam(a);}};YAHOO.lang.extend(KJUR.asn1.ocsp.CertStatus, KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.Request = function (f) {var c = KJUR,b = c.asn1,a = b.DERSequence,d = b.ocsp;d.Request.superclass.constructor.call(this);this.dReqCert = null;this.dExt = null;this.getEncodedHex = function () {var g = [];if (this.dReqCert === null) {throw "reqCert not set";}g.push(this.dReqCert);var h = new a({ array: g });this.hTLV = h.getEncodedHex();return this.hTLV;};if (typeof f !== "undefined") {var e = new d.CertID(f);this.dReqCert = e;}};YAHOO.lang.extend(KJUR.asn1.ocsp.Request, KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.TBSRequest = function (e) {var c = KJUR,b = c.asn1,a = b.DERSequence,d = b.ocsp;d.TBSRequest.superclass.constructor.call(this);this.version = 0;this.dRequestorName = null;this.dRequestList = [];this.dRequestExt = null;this.setRequestListByParam = function (h) {var f = [];for (var g = 0; g < h.length; g++) {var j = new d.Request(h[0]);f.push(j);}this.dRequestList = f;};this.getEncodedHex = function () {var f = [];if (this.version !== 0) {throw "not supported version: " + this.version;}if (this.dRequestorName !== null) {throw "requestorName not supported";}var h = new a({ array: this.dRequestList });f.push(h);if (this.dRequestExt !== null) {throw "requestExtensions not supported";}var g = new a({ array: f });this.hTLV = g.getEncodedHex();return this.hTLV;};if (e !== undefined) {if (e.reqList !== undefined) {this.setRequestListByParam(e.reqList);}}};YAHOO.lang.extend(KJUR.asn1.ocsp.TBSRequest, KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.OCSPRequest = function (f) {var c = KJUR,b = c.asn1,a = b.DERSequence,d = b.ocsp;d.OCSPRequest.superclass.constructor.call(this);this.dTbsRequest = null;this.dOptionalSignature = null;this.getEncodedHex = function () {var g = [];if (this.dTbsRequest !== null) {g.push(this.dTbsRequest);} else {throw "tbsRequest not set";}if (this.dOptionalSignature !== null) {throw "optionalSignature not supported";}var h = new a({ array: g });this.hTLV = h.getEncodedHex();return this.hTLV;};if (f !== undefined) {if (f.reqList !== undefined) {var e = new d.TBSRequest(f);this.dTbsRequest = e;}}};YAHOO.lang.extend(KJUR.asn1.ocsp.OCSPRequest, KJUR.asn1.ASN1Object);KJUR.asn1.ocsp.OCSPUtil = {};KJUR.asn1.ocsp.OCSPUtil.getRequestHex = function (a, b, h) {var d = KJUR,c = d.asn1,e = c.ocsp;if (h === undefined) {h = e.DEFAULT_HASH;}var g = { alg: h, issuerCert: a, subjectCert: b };var f = new e.OCSPRequest({ reqList: [g] });return f.getEncodedHex();};KJUR.asn1.ocsp.OCSPUtil.getOCSPResponseInfo = function (b) {var m = ASN1HEX,c = m.getVbyList,k = m.getVbyListEx,e = m.getIdxbyList,d = m.getIdxbyListEx,g = m.getV;var n = {};try {var j = k(b, 0, [0], "0a");n.responseStatus = parseInt(j, 16);} catch (f) {}if (n.responseStatus !== 0) {return n;}try {var i = e(b, 0, [1, 0, 1, 0, 0, 2, 0, 1]);if (b.substr(i, 2) === "80") {n.certStatus = "good";} else {if (b.substr(i, 2) === "a1") {n.certStatus = "revoked";n.revocationTime = hextoutf8(c(b, i, [0]));} else {if (b.substr(i, 2) === "82") {n.certStatus = "unknown";}}}} catch (f) {}try {var a = e(b, 0, [1, 0, 1, 0, 0, 2, 0, 2]);n.thisUpdate = hextoutf8(g(b, a));} catch (f) {}try {var l = e(b, 0, [1, 0, 1, 0, 0, 2, 0, 3]);if (b.substr(l, 2) === "a0") {n.nextUpdate = hextoutf8(c(b, l, [0]));}} catch (f) {}return n;};KJUR.asn1.ocsp.OCSPParser = function () {var e = Error,a = X509,f = new a(),i = ASN1HEX,g = i.getV,b = i.getTLV,d = i.getIdxbyList,c = i.getTLVbyListEx,h = i.getChildIdx;this.getOCSPRequest = function (l) {var k = h(l, 0);if (k.length != 1 && k.length != 2) {throw new e("wrong number elements: " + k.length);}var j = this.getTBSRequest(b(l, k[0]));return j;};this.getTBSRequest = function (l) {var j = {};var k = c(l, 0, [0], "30");j.array = this.getRequestList(k);var m = c(l, 0, ["[2]", 0], "30");if (m != null) {j.ext = f.getExtParamArray(m);}return j;};this.getRequestList = function (m) {var j = [];var k = h(m, 0);for (var l = 0; l < k.length; l++) {var m = b(m, k[l]);j.push(this.getRequest(m));}return j;};this.getRequest = function (k) {var j = h(k, 0);if (j.length != 1 && j.length != 2) {throw new e("wrong number elements: " + j.length);}var m = this.getCertID(b(k, j[0]));if (j.length == 2) {var l = d(k, 0, [1, 0]);m.ext = f.getExtParamArray(b(k, l));}return m;};this.getCertID = function (m) {var l = h(m, 0);if (l.length != 4) {throw new e("wrong number elements: " + l.length);}var k = new a();var j = {};j.alg = k.getAlgorithmIdentifierName(b(m, l[0]));j.issname = g(m, l[1]);j.isskey = g(m, l[2]);j.sbjsn = g(m, l[3]);return j;};};
var KJUR;if (typeof KJUR == "undefined" || !KJUR) {KJUR = {};}if (typeof KJUR.lang == "undefined" || !KJUR.lang) {KJUR.lang = {};}KJUR.lang.String = function () {};function Base64x() {}function stoBA(d) {var b = new Array();for (var c = 0; c < d.length; c++) {b[c] = d.charCodeAt(c);}return b;}function BAtos(b) {var d = "";for (var c = 0; c < b.length; c++) {d = d + String.fromCharCode(b[c]);}return d;}function BAtohex(b) {var e = "";for (var d = 0; d < b.length; d++) {var c = b[d].toString(16);if (c.length == 1) {c = "0" + c;}e = e + c;}return e;}function stohex(a) {return BAtohex(stoBA(a));}function stob64(a) {return hex2b64(stohex(a));}function stob64u(a) {return b64tob64u(hex2b64(stohex(a)));}function b64utos(a) {return BAtos(b64toBA(b64utob64(a)));}function b64tob64u(a) {a = a.replace(/\=/g, "");a = a.replace(/\+/g, "-");a = a.replace(/\//g, "_");return a;}function b64utob64(a) {if (a.length % 4 == 2) {a = a + "==";} else {if (a.length % 4 == 3) {a = a + "=";}}a = a.replace(/-/g, "+");a = a.replace(/_/g, "/");return a;}function hextob64u(a) {if (a.length % 2 == 1) {a = "0" + a;}return b64tob64u(hex2b64(a));}function b64utohex(a) {return b64tohex(b64utob64(a));}var utf8tob64u, b64utoutf8;if (typeof Buffer === "function") {utf8tob64u = function utf8tob64u(a) {return b64tob64u(Buffer.from(a, "utf8").toString("base64"));};b64utoutf8 = function b64utoutf8(a) {return Buffer.from(b64utob64(a), "base64").toString("utf8");};} else {utf8tob64u = function utf8tob64u(a) {return hextob64u(uricmptohex(encodeURIComponentAll(a)));};b64utoutf8 = function b64utoutf8(a) {return decodeURIComponent(hextouricmp(b64utohex(a)));};}function utf8tob64(a) {return hex2b64(uricmptohex(encodeURIComponentAll(a)));}function b64toutf8(a) {return decodeURIComponent(hextouricmp(b64tohex(a)));}function utf8tohex(a) {return uricmptohex(encodeURIComponentAll(a));}function hextoutf8(a) {return decodeURIComponent(hextouricmp(a));}function hextorstr(c) {var b = "";for (var a = 0; a < c.length - 1; a += 2) {b += String.fromCharCode(parseInt(c.substr(a, 2), 16));}return b;}function rstrtohex(c) {var a = "";for (var b = 0; b < c.length; b++) {a += ("0" + c.charCodeAt(b).toString(16)).slice(-2);}return a;}function hextob64(a) {return hex2b64(a);}function hextob64nl(b) {var a = hextob64(b);var c = a.replace(/(.{64})/g, "$1\r\n");c = c.replace(/\r\n$/, "");return c;}function b64nltohex(b) {var a = b.replace(/[^0-9A-Za-z\/+=]*/g, "");var c = b64tohex(a);return c;}function hextopem(a, b) {var c = hextob64nl(a);return "-----BEGIN " + b + "-----\r\n" + c + "\r\n-----END " + b + "-----\r\n";}function pemtohex(a, b) {if (a.indexOf("-----BEGIN ") == -1) {throw "can't find PEM header: " + b;}if (b !== undefined) {a = a.replace(new RegExp("^[^]*-----BEGIN " + b + "-----"), "");a = a.replace(new RegExp("-----END " + b + "-----[^]*$"), "");} else {a = a.replace(/^[^]*-----BEGIN [^-]+-----/, "");a = a.replace(/-----END [^-]+-----[^]*$/, "");}return b64nltohex(a);}function hextoArrayBuffer(d) {if (d.length % 2 != 0) {throw "input is not even length";}if (d.match(/^[0-9A-Fa-f]+$/) == null) {throw "input is not hexadecimal";}var b = new ArrayBuffer(d.length / 2);var a = new DataView(b);for (var c = 0; c < d.length / 2; c++) {a.setUint8(c, parseInt(d.substr(c * 2, 2), 16));}return b;}function ArrayBuffertohex(b) {var d = "";var a = new DataView(b);for (var c = 0; c < b.byteLength; c++) {d += ("00" + a.getUint8(c).toString(16)).slice(-2);}return d;}function zulutomsec(n) {var l, j, m, e, f, i, b, k;var a, h, g, c;c = n.match(/^(\d{2}|\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(|\.\d+)Z$/);if (c) {a = c[1];l = parseInt(a);if (a.length === 2) {if (50 <= l && l < 100) {l = 1900 + l;} else {if (0 <= l && l < 50) {l = 2000 + l;}}}j = parseInt(c[2]) - 1;m = parseInt(c[3]);e = parseInt(c[4]);f = parseInt(c[5]);i = parseInt(c[6]);b = 0;h = c[7];if (h !== "") {g = (h.substr(1) + "00").substr(0, 3);b = parseInt(g);}return Date.UTC(l, j, m, e, f, i, b);}throw "unsupported zulu format: " + n;}function zulutosec(a) {var b = zulutomsec(a);return ~~(b / 1000);}function zulutodate(a) {return new Date(zulutomsec(a));}function datetozulu(g, e, f) {var b;var a = g.getUTCFullYear();if (e) {if (a < 1950 || 2049 < a) {throw "not proper year for UTCTime: " + a;}b = ("" + a).slice(-2);} else {b = ("000" + a).slice(-4);}b += ("0" + (g.getUTCMonth() + 1)).slice(-2);b += ("0" + g.getUTCDate()).slice(-2);b += ("0" + g.getUTCHours()).slice(-2);b += ("0" + g.getUTCMinutes()).slice(-2);b += ("0" + g.getUTCSeconds()).slice(-2);if (f) {var c = g.getUTCMilliseconds();if (c !== 0) {c = ("00" + c).slice(-3);c = c.replace(/0+$/g, "");b += "." + c;}}b += "Z";return b;}function uricmptohex(a) {return a.replace(/%/g, "");}function hextouricmp(a) {return a.replace(/(..)/g, "%$1");}function ipv6tohex(g) {var b = "malformed IPv6 address";if (!g.match(/^[0-9A-Fa-f:]+$/)) {throw b;}g = g.toLowerCase();var d = g.split(":").length - 1;if (d < 2) {throw b;}var e = ":".repeat(7 - d + 2);g = g.replace("::", e);var c = g.split(":");if (c.length != 8) {throw b;}for (var f = 0; f < 8; f++) {c[f] = ("0000" + c[f]).slice(-4);}return c.join("");}function hextoipv6(e) {if (!e.match(/^[0-9A-Fa-f]{32}$/)) {throw "malformed IPv6 address octet";}e = e.toLowerCase();var b = e.match(/.{1,4}/g);for (var d = 0; d < 8; d++) {b[d] = b[d].replace(/^0+/, "");if (b[d] == "") {b[d] = "0";}}e = ":" + b.join(":") + ":";var c = e.match(/:(0:){2,}/g);if (c === null) {return e.slice(1, -1);}var f = "";for (var d = 0; d < c.length; d++) {if (c[d].length > f.length) {f = c[d];}}e = e.replace(f, "::");return e.slice(1, -1);}function hextoip(b) {var d = "malformed hex value";if (!b.match(/^([0-9A-Fa-f][0-9A-Fa-f]){1,}$/)) {throw d;}if (b.length == 8) {var c;try {c = parseInt(b.substr(0, 2), 16) + "." + parseInt(b.substr(2, 2), 16) + "." + parseInt(b.substr(4, 2), 16) + "." + parseInt(b.substr(6, 2), 16);return c;} catch (a) {throw d;}} else {if (b.length == 32) {return hextoipv6(b);} else {return b;}}}function iptohex(f) {var j = "malformed IP address";f = f.toLowerCase(f);if (f.match(/^[0-9.]+$/)) {var b = f.split(".");if (b.length !== 4) {throw j;}var g = "";try {for (var e = 0; e < 4; e++) {var h = parseInt(b[e]);g += ("0" + h.toString(16)).slice(-2);}return g;} catch (c) {throw j;}} else {if (f.match(/^[0-9a-f:]+$/) && f.indexOf(":") !== -1) {return ipv6tohex(f);} else {throw j;}}}function encodeURIComponentAll(a) {var d = encodeURIComponent(a);var b = "";for (var c = 0; c < d.length; c++) {if (d[c] == "%") {b = b + d.substr(c, 3);c = c + 2;} else {b = b + "%" + stohex(d[c]);}}return b;}function newline_toUnix(a) {a = a.replace(/\r\n/mg, "\n");return a;}function newline_toDos(a) {a = a.replace(/\r\n/mg, "\n");a = a.replace(/\n/mg, "\r\n");return a;}KJUR.lang.String.isInteger = function (a) {if (a.match(/^[0-9]+$/)) {return true;} else {if (a.match(/^-[0-9]+$/)) {return true;} else {return false;}}};KJUR.lang.String.isHex = function (a) {return ishex(a);};function ishex(a) {if (a.length % 2 == 0 && (a.match(/^[0-9a-f]+$/) || a.match(/^[0-9A-F]+$/))) {return true;} else {return false;}}KJUR.lang.String.isBase64 = function (a) {a = a.replace(/\s+/g, "");if (a.match(/^[0-9A-Za-z+\/]+={0,3}$/) && a.length % 4 == 0) {return true;} else {return false;}};KJUR.lang.String.isBase64URL = function (a) {if (a.match(/[+/=]/)) {return false;}a = b64utob64(a);return KJUR.lang.String.isBase64(a);};KJUR.lang.String.isIntegerArray = function (a) {a = a.replace(/\s+/g, "");if (a.match(/^\[[0-9,]+\]$/)) {return true;} else {return false;}};KJUR.lang.String.isPrintable = function (a) {if (a.match(/^[0-9A-Za-z '()+,-./:=?]*$/) !== null) {return true;}return false;};KJUR.lang.String.isIA5 = function (a) {if (a.match(/^[\x20-\x21\x23-\x7f]*$/) !== null) {return true;}return false;};KJUR.lang.String.isMail = function (a) {if (a.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/) !== null) {return true;}return false;};function hextoposhex(a) {if (a.length % 2 == 1) {return "0" + a;}if (a.substr(0, 1) > "7") {return "00" + a;}return a;}function intarystrtohex(b) {b = b.replace(/^\s*\[\s*/, "");b = b.replace(/\s*\]\s*$/, "");b = b.replace(/\s*/g, "");try {var c = b.split(/,/).map(function (g, e, h) {var f = parseInt(g);if (f < 0 || 255 < f) {throw "integer not in range 0-255";}var d = ("00" + f.toString(16)).slice(-2);return d;}).join("");return c;} catch (a) {throw "malformed integer array string: " + a;}}var strdiffidx = function strdiffidx(c, a) {var d = c.length;if (c.length > a.length) {d = a.length;}for (var b = 0; b < d; b++) {if (c.charCodeAt(b) != a.charCodeAt(b)) {return b;}}if (c.length != a.length) {return d;}return -1;};function oidtohex(g) {var f = function f(a) {var l = a.toString(16);if (l.length == 1) {l = "0" + l;}return l;};var e = function e(p) {var o = "";var l = parseInt(p, 10);var a = l.toString(2);var m = 7 - a.length % 7;if (m == 7) {m = 0;}var r = "";for (var n = 0; n < m; n++) {r += "0";}a = r + a;for (var n = 0; n < a.length - 1; n += 7) {var q = a.substr(n, 7);if (n != a.length - 7) {q = "1" + q;}o += f(parseInt(q, 2));}return o;};try {if (!g.match(/^[0-9.]+$/)) {return null;}var j = "";var b = g.split(".");var k = parseInt(b[0], 10) * 40 + parseInt(b[1], 10);j += f(k);b.splice(0, 2);for (var d = 0; d < b.length; d++) {j += e(b[d]);}return j;} catch (c) {return null;}}function hextooid(g) {if (!ishex(g)) {return null;}try {var m = [];var p = g.substr(0, 2);var e = parseInt(p, 16);m[0] = new String(Math.floor(e / 40));m[1] = new String(e % 40);var n = g.substr(2);var l = [];for (var f = 0; f < n.length / 2; f++) {l.push(parseInt(n.substr(f * 2, 2), 16));}var k = [];var d = "";for (var f = 0; f < l.length; f++) {if (l[f] & 128) {d = d + strpad((l[f] & 127).toString(2), 7);} else {d = d + strpad((l[f] & 127).toString(2), 7);k.push(new String(parseInt(d, 2)));d = "";}}var o = m.join(".");if (k.length > 0) {o = o + "." + k.join(".");}return o;} catch (j) {return null;}}var strpad = function strpad(c, b, a) {if (a == undefined) {a = "0";}if (c.length >= b) {return c;}return new Array(b - c.length + 1).join(a) + c;};function bitstrtoint(e) {try {var a = e.substr(0, 2);if (a == "00") {return parseInt(e.substr(2), 16);}var b = parseInt(a, 16);var f = e.substr(2);var d = parseInt(f, 16).toString(2);if (d == "0") {d = "00000000";}d = d.slice(0, 0 - b);return parseInt(d, 2);} catch (c) {return -1;}}function inttobitstr(e) {var c = Number(e).toString(2);var b = 8 - c.length % 8;if (b == 8) {b = 0;}c = c + strpad("", b, "0");var d = parseInt(c, 2).toString(16);if (d.length % 2 == 1) {d = "0" + d;}var a = "0" + b;return a + d;};
if (typeof KJUR == "undefined" || !KJUR) {KJUR = {};}if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {KJUR.crypto = {};}KJUR.crypto.Util = new function () {this.DIGESTINFOHEAD = { sha1: "3021300906052b0e03021a05000414", sha224: "302d300d06096086480165030402040500041c", sha256: "3031300d060960864801650304020105000420", sha384: "3041300d060960864801650304020205000430", sha512: "3051300d060960864801650304020305000440", md2: "3020300c06082a864886f70d020205000410", md5: "3020300c06082a864886f70d020505000410", ripemd160: "3021300906052b2403020105000414" };this.DEFAULTPROVIDER = { md5: "cryptojs", sha1: "cryptojs", sha224: "cryptojs", sha256: "cryptojs", sha384: "cryptojs", sha512: "cryptojs", ripemd160: "cryptojs", hmacmd5: "cryptojs", hmacsha1: "cryptojs", hmacsha224: "cryptojs", hmacsha256: "cryptojs", hmacsha384: "cryptojs", hmacsha512: "cryptojs", hmacripemd160: "cryptojs", MD5withRSA: "cryptojs/jsrsa", SHA1withRSA: "cryptojs/jsrsa", SHA224withRSA: "cryptojs/jsrsa", SHA256withRSA: "cryptojs/jsrsa", SHA384withRSA: "cryptojs/jsrsa", SHA512withRSA: "cryptojs/jsrsa", RIPEMD160withRSA: "cryptojs/jsrsa", MD5withECDSA: "cryptojs/jsrsa", SHA1withECDSA: "cryptojs/jsrsa", SHA224withECDSA: "cryptojs/jsrsa", SHA256withECDSA: "cryptojs/jsrsa", SHA384withECDSA: "cryptojs/jsrsa", SHA512withECDSA: "cryptojs/jsrsa", RIPEMD160withECDSA: "cryptojs/jsrsa", SHA1withDSA: "cryptojs/jsrsa", SHA224withDSA: "cryptojs/jsrsa", SHA256withDSA: "cryptojs/jsrsa", MD5withRSAandMGF1: "cryptojs/jsrsa", SHAwithRSAandMGF1: "cryptojs/jsrsa", SHA1withRSAandMGF1: "cryptojs/jsrsa", SHA224withRSAandMGF1: "cryptojs/jsrsa", SHA256withRSAandMGF1: "cryptojs/jsrsa", SHA384withRSAandMGF1: "cryptojs/jsrsa", SHA512withRSAandMGF1: "cryptojs/jsrsa", RIPEMD160withRSAandMGF1: "cryptojs/jsrsa" };this.CRYPTOJSMESSAGEDIGESTNAME = { md5: CryptoJS.algo.MD5, sha1: CryptoJS.algo.SHA1, sha224: CryptoJS.algo.SHA224, sha256: CryptoJS.algo.SHA256, sha384: CryptoJS.algo.SHA384, sha512: CryptoJS.algo.SHA512, ripemd160: CryptoJS.algo.RIPEMD160 };this.getDigestInfoHex = function (a, b) {if (typeof this.DIGESTINFOHEAD[b] == "undefined") {throw "alg not supported in Util.DIGESTINFOHEAD: " + b;}return this.DIGESTINFOHEAD[b] + a;};this.getPaddedDigestInfoHex = function (h, a, j) {var c = this.getDigestInfoHex(h, a);var d = j / 4;if (c.length + 22 > d) {throw "key is too short for SigAlg: keylen=" + j + "," + a;}var b = "0001";var k = "00" + c;var g = "";var l = d - b.length - k.length;for (var f = 0; f < l; f += 2) {g += "ff";}var e = b + g + k;return e;};this.hashString = function (a, c) {var b = new KJUR.crypto.MessageDigest({ alg: c });return b.digestString(a);};this.hashHex = function (b, c) {var a = new KJUR.crypto.MessageDigest({ alg: c });return a.digestHex(b);};this.sha1 = function (a) {return this.hashString(a, "sha1");};this.sha256 = function (a) {return this.hashString(a, "sha256");};this.sha256Hex = function (a) {return this.hashHex(a, "sha256");};this.sha512 = function (a) {return this.hashString(a, "sha512");};this.sha512Hex = function (a) {return this.hashHex(a, "sha512");};this.isKey = function (a) {if (a instanceof RSAKey || a instanceof KJUR.crypto.DSA || a instanceof KJUR.crypto.ECDSA) {return true;} else {return false;}};}();KJUR.crypto.Util.md5 = function (a) {var b = new KJUR.crypto.MessageDigest({ alg: "md5", prov: "cryptojs" });return b.digestString(a);};KJUR.crypto.Util.ripemd160 = function (a) {var b = new KJUR.crypto.MessageDigest({ alg: "ripemd160", prov: "cryptojs" });return b.digestString(a);};KJUR.crypto.Util.SECURERANDOMGEN = new SecureRandom();KJUR.crypto.Util.getRandomHexOfNbytes = function (b) {var a = new Array(b);KJUR.crypto.Util.SECURERANDOMGEN.nextBytes(a);return BAtohex(a);};KJUR.crypto.Util.getRandomBigIntegerOfNbytes = function (a) {return new BigInteger(KJUR.crypto.Util.getRandomHexOfNbytes(a), 16);};KJUR.crypto.Util.getRandomHexOfNbits = function (d) {var c = d % 8;var a = (d - c) / 8;var b = new Array(a + 1);KJUR.crypto.Util.SECURERANDOMGEN.nextBytes(b);b[0] = (255 << c & 255 ^ 255) & b[0];return BAtohex(b);};KJUR.crypto.Util.getRandomBigIntegerOfNbits = function (a) {return new BigInteger(KJUR.crypto.Util.getRandomHexOfNbits(a), 16);};KJUR.crypto.Util.getRandomBigIntegerZeroToMax = function (b) {var a = b.bitLength();while (1) {var c = KJUR.crypto.Util.getRandomBigIntegerOfNbits(a);if (b.compareTo(c) != -1) {return c;}}};KJUR.crypto.Util.getRandomBigIntegerMinToMax = function (e, b) {var c = e.compareTo(b);if (c == 1) {throw "biMin is greater than biMax";}if (c == 0) {return e;}var a = b.subtract(e);var d = KJUR.crypto.Util.getRandomBigIntegerZeroToMax(a);return d.add(e);};KJUR.crypto.MessageDigest = function (c) {var b = null;var a = null;var d = null;this.setAlgAndProvider = function (g, f) {g = KJUR.crypto.MessageDigest.getCanonicalAlgName(g);if (g !== null && f === undefined) {f = KJUR.crypto.Util.DEFAULTPROVIDER[g];}if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(g) != -1 && f == "cryptojs") {try {this.md = KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[g].create();} catch (e) {throw "setAlgAndProvider hash alg set fail alg=" + g + "/" + e;}this.updateString = function (h) {this.md.update(h);};this.updateHex = function (h) {var i = CryptoJS.enc.Hex.parse(h);this.md.update(i);};this.digest = function () {var h = this.md.finalize();return h.toString(CryptoJS.enc.Hex);};this.digestString = function (h) {this.updateString(h);return this.digest();};this.digestHex = function (h) {this.updateHex(h);return this.digest();};}if (":sha256:".indexOf(g) != -1 && f == "sjcl") {try {this.md = new sjcl.hash.sha256();} catch (e) {throw "setAlgAndProvider hash alg set fail alg=" + g + "/" + e;}this.updateString = function (h) {this.md.update(h);};this.updateHex = function (i) {var h = sjcl.codec.hex.toBits(i);this.md.update(h);};this.digest = function () {var h = this.md.finalize();return sjcl.codec.hex.fromBits(h);};this.digestString = function (h) {this.updateString(h);return this.digest();};this.digestHex = function (h) {this.updateHex(h);return this.digest();};}};this.updateString = function (e) {throw "updateString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName;};this.updateHex = function (e) {throw "updateHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName;};this.digest = function () {throw "digest() not supported for this alg/prov: " + this.algName + "/" + this.provName;};this.digestString = function (e) {throw "digestString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName;};this.digestHex = function (e) {throw "digestHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName;};if (c !== undefined) {if (c.alg !== undefined) {this.algName = c.alg;if (c.prov === undefined) {this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];}this.setAlgAndProvider(this.algName, this.provName);}}};KJUR.crypto.MessageDigest.getCanonicalAlgName = function (a) {if (typeof a === "string") {a = a.toLowerCase();a = a.replace(/-/, "");}return a;};KJUR.crypto.MessageDigest.getHashLength = function (c) {var b = KJUR.crypto.MessageDigest;var a = b.getCanonicalAlgName(c);if (b.HASHLENGTH[a] === undefined) {throw "not supported algorithm: " + c;}return b.HASHLENGTH[a];};KJUR.crypto.MessageDigest.HASHLENGTH = { md5: 16, sha1: 20, sha224: 28, sha256: 32, sha384: 48, sha512: 64, ripemd160: 20 };KJUR.crypto.Mac = function (d) {var f = null;var c = null;var a = null;var e = null;var b = null;this.setAlgAndProvider = function (k, i) {k = k.toLowerCase();if (k == null) {k = "hmacsha1";}k = k.toLowerCase();if (k.substr(0, 4) != "hmac") {throw "setAlgAndProvider unsupported HMAC alg: " + k;}if (i === undefined) {i = KJUR.crypto.Util.DEFAULTPROVIDER[k];}this.algProv = k + "/" + i;var g = k.substr(4);if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(g) != -1 && i == "cryptojs") {try {var j = KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[g];this.mac = CryptoJS.algo.HMAC.create(j, this.pass);} catch (h) {throw "setAlgAndProvider hash alg set fail hashAlg=" + g + "/" + h;}this.updateString = function (l) {this.mac.update(l);};this.updateHex = function (l) {var m = CryptoJS.enc.Hex.parse(l);this.mac.update(m);};this.doFinal = function () {var l = this.mac.finalize();return l.toString(CryptoJS.enc.Hex);};this.doFinalString = function (l) {this.updateString(l);return this.doFinal();};this.doFinalHex = function (l) {this.updateHex(l);return this.doFinal();};}};this.updateString = function (g) {throw "updateString(str) not supported for this alg/prov: " + this.algProv;};this.updateHex = function (g) {throw "updateHex(hex) not supported for this alg/prov: " + this.algProv;};this.doFinal = function () {throw "digest() not supported for this alg/prov: " + this.algProv;};this.doFinalString = function (g) {throw "digestString(str) not supported for this alg/prov: " + this.algProv;};this.doFinalHex = function (g) {throw "digestHex(hex) not supported for this alg/prov: " + this.algProv;};this.setPassword = function (h) {if (typeof h == "string") {var g = h;if (h.length % 2 == 1 || !h.match(/^[0-9A-Fa-f]+$/)) {g = rstrtohex(h);}this.pass = CryptoJS.enc.Hex.parse(g);return;}if (typeof h != "object") {throw "KJUR.crypto.Mac unsupported password type: " + h;}var g = null;if (h.hex !== undefined) {if (h.hex.length % 2 != 0 || !h.hex.match(/^[0-9A-Fa-f]+$/)) {throw "Mac: wrong hex password: " + h.hex;}g = h.hex;}if (h.utf8 !== undefined) {g = utf8tohex(h.utf8);}if (h.rstr !== undefined) {g = rstrtohex(h.rstr);}if (h.b64 !== undefined) {g = b64tohex(h.b64);}if (h.b64u !== undefined) {g = b64utohex(h.b64u);}if (g == null) {throw "KJUR.crypto.Mac unsupported password type: " + h;}this.pass = CryptoJS.enc.Hex.parse(g);};if (d !== undefined) {if (d.pass !== undefined) {this.setPassword(d.pass);}if (d.alg !== undefined) {this.algName = d.alg;if (d.prov === undefined) {this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];}this.setAlgAndProvider(this.algName, this.provName);}}};KJUR.crypto.Signature = function (o) {var q = null;var n = null;var r = null;var c = null;var l = null;var d = null;var k = null;var h = null;var p = null;var e = null;var b = -1;var g = null;var j = null;var a = null;var i = null;var f = null;this._setAlgNames = function () {var s = this.algName.match(/^(.+)with(.+)$/);if (s) {this.mdAlgName = s[1].toLowerCase();this.pubkeyAlgName = s[2].toLowerCase();if (this.pubkeyAlgName == "rsaandmgf1" && this.mdAlgName == "sha") {this.mdAlgName = "sha1";}}};this._zeroPaddingOfSignature = function (x, w) {var v = "";var t = w / 4 - x.length;for (var u = 0; u < t; u++) {v = v + "0";}return v + x;};this.setAlgAndProvider = function (u, t) {this._setAlgNames();if (t != "cryptojs/jsrsa") {throw new Error("provider not supported: " + t);}if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName) != -1) {try {this.md = new KJUR.crypto.MessageDigest({ alg: this.mdAlgName });} catch (s) {throw new Error("setAlgAndProvider hash alg set fail alg=" + this.mdAlgName + "/" + s);}this.init = function (w, x) {var y = null;try {if (x === undefined) {y = KEYUTIL.getKey(w);} else {y = KEYUTIL.getKey(w, x);}} catch (v) {throw "init failed:" + v;}if (y.isPrivate === true) {this.prvKey = y;this.state = "SIGN";} else {if (y.isPublic === true) {this.pubKey = y;this.state = "VERIFY";} else {throw "init failed.:" + y;}}};this.updateString = function (v) {this.md.updateString(v);};this.updateHex = function (v) {this.md.updateHex(v);};this.sign = function () {this.sHashHex = this.md.digest();if (this.prvKey === undefined && this.ecprvhex !== undefined && this.eccurvename !== undefined && KJUR.crypto.ECDSA !== undefined) {this.prvKey = new KJUR.crypto.ECDSA({ curve: this.eccurvename, prv: this.ecprvhex });}if (this.prvKey instanceof RSAKey && this.pubkeyAlgName === "rsaandmgf1") {this.hSign = this.prvKey.signWithMessageHashPSS(this.sHashHex, this.mdAlgName, this.pssSaltLen);} else {if (this.prvKey instanceof RSAKey && this.pubkeyAlgName === "rsa") {this.hSign = this.prvKey.signWithMessageHash(this.sHashHex, this.mdAlgName);} else {if (this.prvKey instanceof KJUR.crypto.ECDSA) {this.hSign = this.prvKey.signWithMessageHash(this.sHashHex);} else {if (this.prvKey instanceof KJUR.crypto.DSA) {this.hSign = this.prvKey.signWithMessageHash(this.sHashHex);} else {throw "Signature: unsupported private key alg: " + this.pubkeyAlgName;}}}}return this.hSign;};this.signString = function (v) {this.updateString(v);return this.sign();};this.signHex = function (v) {this.updateHex(v);return this.sign();};this.verify = function (v) {this.sHashHex = this.md.digest();if (this.pubKey === undefined && this.ecpubhex !== undefined && this.eccurvename !== undefined && KJUR.crypto.ECDSA !== undefined) {this.pubKey = new KJUR.crypto.ECDSA({ curve: this.eccurvename, pub: this.ecpubhex });}if (this.pubKey instanceof RSAKey && this.pubkeyAlgName === "rsaandmgf1") {return this.pubKey.verifyWithMessageHashPSS(this.sHashHex, v, this.mdAlgName, this.pssSaltLen);} else {if (this.pubKey instanceof RSAKey && this.pubkeyAlgName === "rsa") {return this.pubKey.verifyWithMessageHash(this.sHashHex, v);} else {if (KJUR.crypto.ECDSA !== undefined && this.pubKey instanceof KJUR.crypto.ECDSA) {return this.pubKey.verifyWithMessageHash(this.sHashHex, v);} else {if (KJUR.crypto.DSA !== undefined && this.pubKey instanceof KJUR.crypto.DSA) {return this.pubKey.verifyWithMessageHash(this.sHashHex, v);} else {throw "Signature: unsupported public key alg: " + this.pubkeyAlgName;}}}}};}};this.init = function (s, t) {throw "init(key, pass) not supported for this alg:prov=" + this.algProvName;};this.updateString = function (s) {throw "updateString(str) not supported for this alg:prov=" + this.algProvName;};this.updateHex = function (s) {throw "updateHex(hex) not supported for this alg:prov=" + this.algProvName;};this.sign = function () {throw "sign() not supported for this alg:prov=" + this.algProvName;};this.signString = function (s) {throw "digestString(str) not supported for this alg:prov=" + this.algProvName;};this.signHex = function (s) {throw "digestHex(hex) not supported for this alg:prov=" + this.algProvName;};this.verify = function (s) {throw "verify(hSigVal) not supported for this alg:prov=" + this.algProvName;};this.initParams = o;if (o !== undefined) {if (o.alg !== undefined) {this.algName = o.alg;if (o.prov === undefined) {this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];} else {this.provName = o.prov;}this.algProvName = this.algName + ":" + this.provName;this.setAlgAndProvider(this.algName, this.provName);this._setAlgNames();}if (o.psssaltlen !== undefined) {this.pssSaltLen = o.psssaltlen;}if (o.prvkeypem !== undefined) {if (o.prvkeypas !== undefined) {throw "both prvkeypem and prvkeypas parameters not supported";} else {try {var q = KEYUTIL.getKey(o.prvkeypem);this.init(q);} catch (m) {throw "fatal error to load pem private key: " + m;}}}}};KJUR.crypto.Cipher = function (a) {};KJUR.crypto.Cipher.encrypt = function (e, f, d) {if (f instanceof RSAKey && f.isPublic) {var c = KJUR.crypto.Cipher.getAlgByKeyAndName(f, d);if (c === "RSA") {return f.encrypt(e);}if (c === "RSAOAEP") {return f.encryptOAEP(e, "sha1");}var b = c.match(/^RSAOAEP(\d+)$/);if (b !== null) {return f.encryptOAEP(e, "sha" + b[1]);}throw "Cipher.encrypt: unsupported algorithm for RSAKey: " + d;} else {throw "Cipher.encrypt: unsupported key or algorithm";}};KJUR.crypto.Cipher.decrypt = function (e, f, d) {if (f instanceof RSAKey && f.isPrivate) {var c = KJUR.crypto.Cipher.getAlgByKeyAndName(f, d);if (c === "RSA") {return f.decrypt(e);}if (c === "RSAOAEP") {return f.decryptOAEP(e, "sha1");}var b = c.match(/^RSAOAEP(\d+)$/);if (b !== null) {return f.decryptOAEP(e, "sha" + b[1]);}throw "Cipher.decrypt: unsupported algorithm for RSAKey: " + d;} else {throw "Cipher.decrypt: unsupported key or algorithm";}};KJUR.crypto.Cipher.getAlgByKeyAndName = function (b, a) {if (b instanceof RSAKey) {if (":RSA:RSAOAEP:RSAOAEP224:RSAOAEP256:RSAOAEP384:RSAOAEP512:".indexOf(a) != -1) {return a;}if (a === null || a === undefined) {return "RSA";}throw "getAlgByKeyAndName: not supported algorithm name for RSAKey: " + a;}throw "getAlgByKeyAndName: not supported algorithm name: " + a;};KJUR.crypto.OID = new function () {this.oidhex2name = { "2a864886f70d010101": "rsaEncryption", "2a8648ce3d0201": "ecPublicKey", "2a8648ce380401": "dsa", "2a8648ce3d030107": "secp256r1", "2b8104001f": "secp192k1", "2b81040021": "secp224r1", "2b8104000a": "secp256k1", "2b81040023": "secp521r1", "2b81040022": "secp384r1", "2a8648ce380403": "SHA1withDSA", "608648016503040301": "SHA224withDSA", "608648016503040302": "SHA256withDSA" };}();
if (typeof KJUR == "undefined" || !KJUR) {KJUR = {};}if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {KJUR.crypto = {};}KJUR.crypto.ECDSA = function (e) {var g = "secp256r1";var p = null;var b = null;var i = null;var j = Error,f = BigInteger,h = ECPointFp,m = KJUR.crypto.ECDSA,c = KJUR.crypto.ECParameterDB,d = m.getName,q = ASN1HEX,n = q.getVbyListEx,k = q.isASN1HEX;var a = new SecureRandom();var o = null;this.type = "EC";this.isPrivate = false;this.isPublic = false;function l(x, t, w, s) {var r = Math.max(t.bitLength(), s.bitLength());var y = x.add2D(w);var v = x.curve.getInfinity();for (var u = r - 1; u >= 0; --u) {v = v.twice2D();v.z = f.ONE;if (t.testBit(u)) {if (s.testBit(u)) {v = v.add2D(y);} else {v = v.add2D(x);}} else {if (s.testBit(u)) {v = v.add2D(w);}}}return v;}this.getBigRandom = function (r) {return new f(r.bitLength(), a).mod(r.subtract(f.ONE)).add(f.ONE);};this.setNamedCurve = function (r) {this.ecparams = c.getByName(r);this.prvKeyHex = null;this.pubKeyHex = null;this.curveName = r;};this.setPrivateKeyHex = function (r) {this.isPrivate = true;this.prvKeyHex = r;};this.setPublicKeyHex = function (r) {this.isPublic = true;this.pubKeyHex = r;};this.getPublicKeyXYHex = function () {var t = this.pubKeyHex;if (t.substr(0, 2) !== "04") {throw "this method supports uncompressed format(04) only";}var s = this.ecparams.keylen / 4;if (t.length !== 2 + s * 2) {throw "malformed public key hex length";}var r = {};r.x = t.substr(2, s);r.y = t.substr(2 + s);return r;};this.getShortNISTPCurveName = function () {var r = this.curveName;if (r === "secp256r1" || r === "NIST P-256" || r === "P-256" || r === "prime256v1") {return "P-256";}if (r === "secp384r1" || r === "NIST P-384" || r === "P-384") {return "P-384";}return null;};this.generateKeyPairHex = function () {var t = this.ecparams.n;var w = this.getBigRandom(t);var u = this.ecparams.G.multiply(w);var z = u.getX().toBigInteger();var x = u.getY().toBigInteger();var r = this.ecparams.keylen / 4;var v = ("0000000000" + w.toString(16)).slice(-r);var A = ("0000000000" + z.toString(16)).slice(-r);var y = ("0000000000" + x.toString(16)).slice(-r);var s = "04" + A + y;this.setPrivateKeyHex(v);this.setPublicKeyHex(s);return { ecprvhex: v, ecpubhex: s };};this.signWithMessageHash = function (r) {return this.signHex(r, this.prvKeyHex);};this.signHex = function (x, u) {var A = new f(u, 16);var v = this.ecparams.n;var z = new f(x.substring(0, this.ecparams.keylen / 4), 16);do {var w = this.getBigRandom(v);var B = this.ecparams.G;var y = B.multiply(w);var t = y.getX().toBigInteger().mod(v);} while (t.compareTo(f.ZERO) <= 0);var C = w.modInverse(v).multiply(z.add(A.multiply(t))).mod(v);return m.biRSSigToASN1Sig(t, C);};this.sign = function (w, B) {var z = B;var u = this.ecparams.n;var y = f.fromByteArrayUnsigned(w);do {var v = this.getBigRandom(u);var A = this.ecparams.G;var x = A.multiply(v);var t = x.getX().toBigInteger().mod(u);} while (t.compareTo(BigInteger.ZERO) <= 0);var C = v.modInverse(u).multiply(y.add(z.multiply(t))).mod(u);return this.serializeSig(t, C);};this.verifyWithMessageHash = function (s, r) {return this.verifyHex(s, r, this.pubKeyHex);};this.verifyHex = function (v, y, u) {try {var t, B;var w = m.parseSigHex(y);t = w.r;B = w.s;var x = h.decodeFromHex(this.ecparams.curve, u);var z = new f(v.substring(0, this.ecparams.keylen / 4), 16);return this.verifyRaw(z, t, B, x);} catch (A) {return false;}};this.verify = function (z, A, u) {var w, t;if (Bitcoin.Util.isArray(A)) {var y = this.parseSig(A);w = y.r;t = y.s;} else {if ("object" === typeof A && A.r && A.s) {w = A.r;t = A.s;} else {throw "Invalid value for signature";}}var v;if (u instanceof ECPointFp) {v = u;} else {if (Bitcoin.Util.isArray(u)) {v = h.decodeFrom(this.ecparams.curve, u);} else {throw "Invalid format for pubkey value, must be byte array or ECPointFp";}}var x = f.fromByteArrayUnsigned(z);return this.verifyRaw(x, w, t, v);};this.verifyRaw = function (z, t, E, y) {var x = this.ecparams.n;var D = this.ecparams.G;if (t.compareTo(f.ONE) < 0 || t.compareTo(x) >= 0) {return false;}if (E.compareTo(f.ONE) < 0 || E.compareTo(x) >= 0) {return false;}var A = E.modInverse(x);var w = z.multiply(A).mod(x);var u = t.multiply(A).mod(x);var B = D.multiply(w).add(y.multiply(u));var C = B.getX().toBigInteger().mod(x);return C.equals(t);};this.serializeSig = function (v, u) {var w = v.toByteArraySigned();var t = u.toByteArraySigned();var x = [];x.push(2);x.push(w.length);x = x.concat(w);x.push(2);x.push(t.length);x = x.concat(t);x.unshift(x.length);x.unshift(48);return x;};this.parseSig = function (y) {var x;if (y[0] != 48) {throw new Error("Signature not a valid DERSequence");}x = 2;if (y[x] != 2) {throw new Error("First element in signature must be a DERInteger");}var w = y.slice(x + 2, x + 2 + y[x + 1]);x += 2 + y[x + 1];if (y[x] != 2) {throw new Error("Second element in signature must be a DERInteger");}var t = y.slice(x + 2, x + 2 + y[x + 1]);x += 2 + y[x + 1];var v = f.fromByteArrayUnsigned(w);var u = f.fromByteArrayUnsigned(t);return { r: v, s: u };};this.parseSigCompact = function (w) {if (w.length !== 65) {throw "Signature has the wrong length";}var t = w[0] - 27;if (t < 0 || t > 7) {throw "Invalid signature type";}var x = this.ecparams.n;var v = f.fromByteArrayUnsigned(w.slice(1, 33)).mod(x);var u = f.fromByteArrayUnsigned(w.slice(33, 65)).mod(x);return { r: v, s: u, i: t };};this.readPKCS5PrvKeyHex = function (u) {if (k(u) === false) {throw new Error("not ASN.1 hex string");}var r, t, v;try {r = n(u, 0, ["[0]", 0], "06");t = n(u, 0, [1], "04");try {v = n(u, 0, ["[1]", 0], "03");} catch (s) {}} catch (s) {throw new Error("malformed PKCS#1/5 plain ECC private key");}this.curveName = d(r);if (this.curveName === undefined) {throw "unsupported curve name";}this.setNamedCurve(this.curveName);this.setPublicKeyHex(v);this.setPrivateKeyHex(t);this.isPublic = false;};this.readPKCS8PrvKeyHex = function (v) {if (k(v) === false) {throw new j("not ASN.1 hex string");}var t, r, u, w;try {t = n(v, 0, [1, 0], "06");r = n(v, 0, [1, 1], "06");u = n(v, 0, [2, 0, 1], "04");try {w = n(v, 0, [2, 0, "[1]", 0], "03");} catch (s) {}} catch (s) {throw new j("malformed PKCS#8 plain ECC private key");}this.curveName = d(r);if (this.curveName === undefined) {throw new j("unsupported curve name");}this.setNamedCurve(this.curveName);this.setPublicKeyHex(w);this.setPrivateKeyHex(u);this.isPublic = false;};this.readPKCS8PubKeyHex = function (u) {if (k(u) === false) {throw new j("not ASN.1 hex string");}var t, r, v;try {t = n(u, 0, [0, 0], "06");r = n(u, 0, [0, 1], "06");v = n(u, 0, [1], "03");} catch (s) {throw new j("malformed PKCS#8 ECC public key");}this.curveName = d(r);if (this.curveName === null) {throw new j("unsupported curve name");}this.setNamedCurve(this.curveName);this.setPublicKeyHex(v);};this.readCertPubKeyHex = function (t, v) {if (k(t) === false) {throw new j("not ASN.1 hex string");}var r, u;try {r = n(t, 0, [0, 5, 0, 1], "06");u = n(t, 0, [0, 5, 1], "03");} catch (s) {throw new j("malformed X.509 certificate ECC public key");}this.curveName = d(r);if (this.curveName === null) {throw new j("unsupported curve name");}this.setNamedCurve(this.curveName);this.setPublicKeyHex(u);};if (e !== undefined) {if (e.curve !== undefined) {this.curveName = e.curve;}}if (this.curveName === undefined) {this.curveName = g;}this.setNamedCurve(this.curveName);if (e !== undefined) {if (e.prv !== undefined) {this.setPrivateKeyHex(e.prv);}if (e.pub !== undefined) {this.setPublicKeyHex(e.pub);}}};KJUR.crypto.ECDSA.parseSigHex = function (a) {var b = KJUR.crypto.ECDSA.parseSigHexInHexRS(a);var d = new BigInteger(b.r, 16);var c = new BigInteger(b.s, 16);return { r: d, s: c };};KJUR.crypto.ECDSA.parseSigHexInHexRS = function (f) {var j = ASN1HEX,i = j.getChildIdx,g = j.getV;j.checkStrictDER(f, 0);if (f.substr(0, 2) != "30") {throw new Error("signature is not a ASN.1 sequence");}var h = i(f, 0);if (h.length != 2) {throw new Error("signature shall have two elements");}var e = h[0];var d = h[1];if (f.substr(e, 2) != "02") {throw new Error("1st item not ASN.1 integer");}if (f.substr(d, 2) != "02") {throw new Error("2nd item not ASN.1 integer");}var c = g(f, e);var b = g(f, d);return { r: c, s: b };};KJUR.crypto.ECDSA.asn1SigToConcatSig = function (c) {var d = KJUR.crypto.ECDSA.parseSigHexInHexRS(c);var b = d.r;var a = d.s;if (b.substr(0, 2) == "00" && b.length % 32 == 2) {b = b.substr(2);}if (a.substr(0, 2) == "00" && a.length % 32 == 2) {a = a.substr(2);}if (b.length % 32 == 30) {b = "00" + b;}if (a.length % 32 == 30) {a = "00" + a;}if (b.length % 32 != 0) {throw "unknown ECDSA sig r length error";}if (a.length % 32 != 0) {throw "unknown ECDSA sig s length error";}return b + a;};KJUR.crypto.ECDSA.concatSigToASN1Sig = function (a) {if (a.length / 2 * 8 % (16 * 8) != 0) {throw "unknown ECDSA concatinated r-s sig  length error";}var c = a.substr(0, a.length / 2);var b = a.substr(a.length / 2);return KJUR.crypto.ECDSA.hexRSSigToASN1Sig(c, b);};KJUR.crypto.ECDSA.hexRSSigToASN1Sig = function (b, a) {var d = new BigInteger(b, 16);var c = new BigInteger(a, 16);return KJUR.crypto.ECDSA.biRSSigToASN1Sig(d, c);};KJUR.crypto.ECDSA.biRSSigToASN1Sig = function (f, d) {var c = KJUR.asn1;var b = new c.DERInteger({ bigint: f });var a = new c.DERInteger({ bigint: d });var e = new c.DERSequence({ array: [b, a] });return e.getEncodedHex();};KJUR.crypto.ECDSA.getName = function (a) {if (a === "2b8104001f") {return "secp192k1";}if (a === "2a8648ce3d030107") {return "secp256r1";}if (a === "2b8104000a") {return "secp256k1";}if (a === "2b81040021") {return "secp224r1";}if (a === "2b81040022") {return "secp384r1";}if ("|secp256r1|NIST P-256|P-256|prime256v1|".indexOf(a) !== -1) {return "secp256r1";}if ("|secp256k1|".indexOf(a) !== -1) {return "secp256k1";}if ("|secp224r1|NIST P-224|P-224|".indexOf(a) !== -1) {return "secp224r1";}if ("|secp384r1|NIST P-384|P-384|".indexOf(a) !== -1) {return "secp384r1";}return null;};
if (typeof KJUR == "undefined" || !KJUR) {KJUR = {};}if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {KJUR.crypto = {};}KJUR.crypto.ECParameterDB = new function () {var b = {};var c = {};function a(d) {return new BigInteger(d, 16);}this.getByName = function (e) {var d = e;if (typeof c[d] != "undefined") {d = c[e];}if (typeof b[d] != "undefined") {return b[d];}throw "unregistered EC curve name: " + d;};this.regist = function (A, l, o, g, m, e, j, f, k, u, d, x) {b[A] = {};var s = a(o);var z = a(g);var y = a(m);var t = a(e);var w = a(j);var r = new ECCurveFp(s, z, y);var q = r.decodePointHex("04" + f + k);b[A]["name"] = A;b[A]["keylen"] = l;b[A]["curve"] = r;b[A]["G"] = q;b[A]["n"] = t;b[A]["h"] = w;b[A]["oid"] = d;b[A]["info"] = x;for (var v = 0; v < u.length; v++) {c[u[v]] = A;}};}();KJUR.crypto.ECParameterDB.regist("secp128r1", 128, "FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF", "FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC", "E87579C11079F43DD824993C2CEE5ED3", "FFFFFFFE0000000075A30D1B9038A115", "1", "161FF7528B899B2D0C28607CA52C5B86", "CF5AC8395BAFEB13C02DA292DDED7A83", [], "", "secp128r1 : SECG curve over a 128 bit prime field");KJUR.crypto.ECParameterDB.regist("secp160k1", 160, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73", "0", "7", "0100000000000000000001B8FA16DFAB9ACA16B6B3", "1", "3B4C382CE37AA192A4019E763036F4F5DD4D7EBB", "938CF935318FDCED6BC28286531733C3F03C4FEE", [], "", "secp160k1 : SECG curve over a 160 bit prime field");KJUR.crypto.ECParameterDB.regist("secp160r1", 160, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC", "1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45", "0100000000000000000001F4C8F927AED3CA752257", "1", "4A96B5688EF573284664698968C38BB913CBFC82", "23A628553168947D59DCC912042351377AC5FB32", [], "", "secp160r1 : SECG curve over a 160 bit prime field");KJUR.crypto.ECParameterDB.regist("secp192k1", 192, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37", "0", "3", "FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D", "1", "DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D", "9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D", []);KJUR.crypto.ECParameterDB.regist("secp192r1", 192, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC", "64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1", "FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831", "1", "188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012", "07192B95FFC8DA78631011ED6B24CDD573F977A11E794811", []);KJUR.crypto.ECParameterDB.regist("secp224r1", 224, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE", "B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4", "FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D", "1", "B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21", "BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34", []);KJUR.crypto.ECParameterDB.regist("secp256k1", 256, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F", "0", "7", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", "1", "79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798", "483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8", []);KJUR.crypto.ECParameterDB.regist("secp256r1", 256, "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF", "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC", "5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B", "FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551", "1", "6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296", "4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5", ["NIST P-256", "P-256", "prime256v1"]);KJUR.crypto.ECParameterDB.regist("secp384r1", 384, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFC", "B3312FA7E23EE7E4988E056BE3F82D19181D9C6EFE8141120314088F5013875AC656398D8A2ED19D2A85C8EDD3EC2AEF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC7634D81F4372DDF581A0DB248B0A77AECEC196ACCC52973", "1", "AA87CA22BE8B05378EB1C71EF320AD746E1D3B628BA79B9859F741E082542A385502F25DBF55296C3A545E3872760AB7", "3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f", ["NIST P-384", "P-384"]);KJUR.crypto.ECParameterDB.regist("secp521r1", 521, "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC", "051953EB9618E1C9A1F929A21A0B68540EEA2DA725B99B315F3B8B489918EF109E156193951EC7E937B1652C0BD3BB1BF073573DF883D2C34F1EF451FD46B503F00", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA51868783BF2F966B7FCC0148F709A5D03BB5C9B8899C47AEBB6FB71E91386409", "1", "C6858E06B70404E9CD9E3ECB662395B4429C648139053FB521F828AF606B4D3DBAA14B5E77EFE75928FE1DC127A2FFA8DE3348B3C1856A429BF97E7E31C2E5BD66", "011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650", ["NIST P-521", "P-521"]);
if (typeof KJUR == "undefined" || !KJUR) {KJUR = {};}if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {KJUR.crypto = {};}KJUR.crypto.DSA = function () {var b = ASN1HEX,e = b.getVbyList,d = b.getVbyListEx,a = b.isASN1HEX,c = BigInteger;this.p = null;this.q = null;this.g = null;this.y = null;this.x = null;this.type = "DSA";this.isPrivate = false;this.isPublic = false;this.setPrivate = function (j, i, h, k, f) {this.isPrivate = true;this.p = j;this.q = i;this.g = h;this.y = k;this.x = f;};this.setPrivateHex = function (i, g, k, n, o) {var h, f, j, l, m;h = new BigInteger(i, 16);f = new BigInteger(g, 16);j = new BigInteger(k, 16);if (typeof n === "string" && n.length > 1) {l = new BigInteger(n, 16);} else {l = null;}m = new BigInteger(o, 16);this.setPrivate(h, f, j, l, m);};this.setPublic = function (i, h, f, j) {this.isPublic = true;this.p = i;this.q = h;this.g = f;this.y = j;this.x = null;};this.setPublicHex = function (k, j, i, l) {var g, f, m, h;g = new BigInteger(k, 16);f = new BigInteger(j, 16);m = new BigInteger(i, 16);h = new BigInteger(l, 16);this.setPublic(g, f, m, h);};this.signWithMessageHash = function (j) {var i = this.p;var h = this.q;var m = this.g;var o = this.y;var t = this.x;var l = KJUR.crypto.Util.getRandomBigIntegerMinToMax(BigInteger.ONE.add(BigInteger.ONE), h.subtract(BigInteger.ONE));var u = j.substr(0, h.bitLength() / 4);var n = new BigInteger(u, 16);var f = m.modPow(l, i).mod(h);var w = l.modInverse(h).multiply(n.add(t.multiply(f))).mod(h);var v = KJUR.asn1.ASN1Util.jsonToASN1HEX({ seq: [{ "int": { bigint: f } }, { "int": { bigint: w } }] });return v;};this.verifyWithMessageHash = function (m, l) {var j = this.p;var h = this.q;var o = this.g;var u = this.y;var n = this.parseASN1Signature(l);var f = n[0];var C = n[1];var B = m.substr(0, h.bitLength() / 4);var t = new BigInteger(B, 16);if (BigInteger.ZERO.compareTo(f) > 0 || f.compareTo(h) > 0) {throw "invalid DSA signature";}if (BigInteger.ZERO.compareTo(C) >= 0 || C.compareTo(h) > 0) {throw "invalid DSA signature";}var x = C.modInverse(h);var k = t.multiply(x).mod(h);var i = f.multiply(x).mod(h);var A = o.modPow(k, j).multiply(u.modPow(i, j)).mod(j).mod(h);return A.compareTo(f) == 0;};this.parseASN1Signature = function (f) {try {var i = new c(d(f, 0, [0], "02"), 16);var h = new c(d(f, 0, [1], "02"), 16);return [i, h];} catch (g) {throw new Error("malformed ASN.1 DSA signature");}};this.readPKCS5PrvKeyHex = function (j) {var k, i, g, l, m;if (a(j) === false) {throw new Error("not ASN.1 hex string");}try {k = d(j, 0, [1], "02");i = d(j, 0, [2], "02");g = d(j, 0, [3], "02");l = d(j, 0, [4], "02");m = d(j, 0, [5], "02");} catch (f) {throw new Error("malformed PKCS#1/5 plain DSA private key");}this.setPrivateHex(k, i, g, l, m);};this.readPKCS8PrvKeyHex = function (j) {var k, i, g, l;if (a(j) === false) {throw new Error("not ASN.1 hex string");}try {k = d(j, 0, [1, 1, 0], "02");i = d(j, 0, [1, 1, 1], "02");g = d(j, 0, [1, 1, 2], "02");l = d(j, 0, [2, 0], "02");} catch (f) {throw new Error("malformed PKCS#8 plain DSA private key");}this.setPrivateHex(k, i, g, null, l);};this.readPKCS8PubKeyHex = function (j) {var k, i, g, l;if (a(j) === false) {throw new Error("not ASN.1 hex string");}try {k = d(j, 0, [0, 1, 0], "02");i = d(j, 0, [0, 1, 1], "02");g = d(j, 0, [0, 1, 2], "02");l = d(j, 0, [1, 0], "02");} catch (f) {throw new Error("malformed PKCS#8 DSA public key");}this.setPublicHex(k, i, g, l);};this.readCertPubKeyHex = function (j, m) {var k, i, g, l;if (a(j) === false) {throw new Error("not ASN.1 hex string");}try {k = d(j, 0, [0, 5, 0, 1, 0], "02");i = d(j, 0, [0, 5, 0, 1, 1], "02");g = d(j, 0, [0, 5, 0, 1, 2], "02");l = d(j, 0, [0, 5, 1, 0], "02");} catch (f) {throw new Error("malformed X.509 certificate DSA public key");}this.setPublicHex(k, i, g, l);};};
var KEYUTIL = function () {var d = function d(p, r, q) {return k(CryptoJS.AES, p, r, q);};var e = function e(p, r, q) {return k(CryptoJS.TripleDES, p, r, q);};var a = function a(p, r, q) {return k(CryptoJS.DES, p, r, q);};var k = function k(s, x, u, q) {var r = CryptoJS.enc.Hex.parse(x);var w = CryptoJS.enc.Hex.parse(u);var p = CryptoJS.enc.Hex.parse(q);var t = {};t.key = w;t.iv = p;t.ciphertext = r;var v = s.decrypt(t, w, { iv: p });return CryptoJS.enc.Hex.stringify(v);};var l = function l(p, r, q) {return g(CryptoJS.AES, p, r, q);};var o = function o(p, r, q) {return g(CryptoJS.TripleDES, p, r, q);};var f = function f(p, r, q) {return g(CryptoJS.DES, p, r, q);};var g = function g(t, y, v, q) {var s = CryptoJS.enc.Hex.parse(y);var x = CryptoJS.enc.Hex.parse(v);var p = CryptoJS.enc.Hex.parse(q);var w = t.encrypt(s, x, { iv: p });var r = CryptoJS.enc.Hex.parse(w.toString());var u = CryptoJS.enc.Base64.stringify(r);return u;};var i = { "AES-256-CBC": { proc: d, eproc: l, keylen: 32, ivlen: 16 }, "AES-192-CBC": { proc: d, eproc: l, keylen: 24, ivlen: 16 }, "AES-128-CBC": { proc: d, eproc: l, keylen: 16, ivlen: 16 }, "DES-EDE3-CBC": { proc: e, eproc: o, keylen: 24, ivlen: 8 }, "DES-CBC": { proc: a, eproc: f, keylen: 8, ivlen: 8 } };var c = function c(p) {return i[p]["proc"];};var m = function m(p) {var r = CryptoJS.lib.WordArray.random(p);var q = CryptoJS.enc.Hex.stringify(r);return q;};var n = function n(v) {var w = {};var q = v.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)", "m"));if (q) {w.cipher = q[1];w.ivsalt = q[2];}var p = v.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"));if (p) {w.type = p[1];}var u = -1;var x = 0;if (v.indexOf("\r\n\r\n") != -1) {u = v.indexOf("\r\n\r\n");x = 2;}if (v.indexOf("\n\n") != -1) {u = v.indexOf("\n\n");x = 1;}var t = v.indexOf("-----END");if (u != -1 && t != -1) {var r = v.substring(u + x * 2, t - x);r = r.replace(/\s+/g, "");w.data = r;}return w;};var j = function j(q, y, p) {var v = p.substring(0, 16);var t = CryptoJS.enc.Hex.parse(v);var r = CryptoJS.enc.Utf8.parse(y);var u = i[q]["keylen"] + i[q]["ivlen"];var x = "";var w = null;for (;;) {var s = CryptoJS.algo.MD5.create();if (w != null) {s.update(w);}s.update(r);s.update(t);w = s.finalize();x = x + CryptoJS.enc.Hex.stringify(w);if (x.length >= u * 2) {break;}}var z = {};z.keyhex = x.substr(0, i[q]["keylen"] * 2);z.ivhex = x.substr(i[q]["keylen"] * 2, i[q]["ivlen"] * 2);return z;};var b = function b(p, v, r, w) {var s = CryptoJS.enc.Base64.parse(p);var q = CryptoJS.enc.Hex.stringify(s);var u = i[v]["proc"];var t = u(q, r, w);return t;};var h = function h(p, s, q, u) {var r = i[s]["eproc"];var t = r(p, q, u);return t;};return { version: "1.0.0", parsePKCS5PEM: function parsePKCS5PEM(p) {return n(p);}, getKeyAndUnusedIvByPasscodeAndIvsalt: function getKeyAndUnusedIvByPasscodeAndIvsalt(q, p, r) {return j(q, p, r);}, decryptKeyB64: function decryptKeyB64(p, r, q, s) {return b(p, r, q, s);}, getDecryptedKeyHex: function getDecryptedKeyHex(y, x) {var q = n(y);var t = q.type;var r = q.cipher;var p = q.ivsalt;var s = q.data;var w = j(r, x, p);var v = w.keyhex;var u = b(s, r, v, p);return u;}, getEncryptedPKCS5PEMFromPrvKeyHex: function getEncryptedPKCS5PEMFromPrvKeyHex(x, s, A, t, r) {var p = "";if (typeof t == "undefined" || t == null) {t = "AES-256-CBC";}if (typeof i[t] == "undefined") {throw "KEYUTIL unsupported algorithm: " + t;}if (typeof r == "undefined" || r == null) {var v = i[t]["ivlen"];var u = m(v);r = u.toUpperCase();}var z = j(t, A, r);var y = z.keyhex;var w = h(s, t, y, r);var q = w.replace(/(.{64})/g, "$1\r\n");var p = "-----BEGIN " + x + " PRIVATE KEY-----\r\n";p += "Proc-Type: 4,ENCRYPTED\r\n";p += "DEK-Info: " + t + "," + r + "\r\n";p += "\r\n";p += q;p += "\r\n-----END " + x + " PRIVATE KEY-----\r\n";return p;}, parseHexOfEncryptedPKCS8: function parseHexOfEncryptedPKCS8(y) {var B = ASN1HEX;var z = B.getChildIdx;var w = B.getV;var t = {};var r = z(y, 0);if (r.length != 2) {throw "malformed format: SEQUENCE(0).items != 2: " + r.length;}t.ciphertext = w(y, r[1]);var A = z(y, r[0]);if (A.length != 2) {throw "malformed format: SEQUENCE(0.0).items != 2: " + A.length;}if (w(y, A[0]) != "2a864886f70d01050d") {throw "this only supports pkcs5PBES2";}var p = z(y, A[1]);if (A.length != 2) {throw "malformed format: SEQUENCE(0.0.1).items != 2: " + p.length;}var q = z(y, p[1]);if (q.length != 2) {throw "malformed format: SEQUENCE(0.0.1.1).items != 2: " + q.length;}if (w(y, q[0]) != "2a864886f70d0307") {throw "this only supports TripleDES";}t.encryptionSchemeAlg = "TripleDES";t.encryptionSchemeIV = w(y, q[1]);var s = z(y, p[0]);if (s.length != 2) {throw "malformed format: SEQUENCE(0.0.1.0).items != 2: " + s.length;}if (w(y, s[0]) != "2a864886f70d01050c") {throw "this only supports pkcs5PBKDF2";}var x = z(y, s[1]);if (x.length < 2) {throw "malformed format: SEQUENCE(0.0.1.0.1).items < 2: " + x.length;}t.pbkdf2Salt = w(y, x[0]);var u = w(y, x[1]);try {t.pbkdf2Iter = parseInt(u, 16);} catch (v) {throw "malformed format pbkdf2Iter: " + u;}return t;}, getPBKDF2KeyHexFromParam: function getPBKDF2KeyHexFromParam(u, p) {var t = CryptoJS.enc.Hex.parse(u.pbkdf2Salt);var q = u.pbkdf2Iter;var s = CryptoJS.PBKDF2(p, t, { keySize: 192 / 32, iterations: q });var r = CryptoJS.enc.Hex.stringify(s);return r;}, _getPlainPKCS8HexFromEncryptedPKCS8PEM: function _getPlainPKCS8HexFromEncryptedPKCS8PEM(x, y) {var r = pemtohex(x, "ENCRYPTED PRIVATE KEY");var p = this.parseHexOfEncryptedPKCS8(r);var u = KEYUTIL.getPBKDF2KeyHexFromParam(p, y);var v = {};v.ciphertext = CryptoJS.enc.Hex.parse(p.ciphertext);var t = CryptoJS.enc.Hex.parse(u);var s = CryptoJS.enc.Hex.parse(p.encryptionSchemeIV);var w = CryptoJS.TripleDES.decrypt(v, t, { iv: s });var q = CryptoJS.enc.Hex.stringify(w);return q;}, getKeyFromEncryptedPKCS8PEM: function getKeyFromEncryptedPKCS8PEM(s, q) {var p = this._getPlainPKCS8HexFromEncryptedPKCS8PEM(s, q);var r = this.getKeyFromPlainPrivatePKCS8Hex(p);return r;}, parsePlainPrivatePKCS8Hex: function parsePlainPrivatePKCS8Hex(s) {var v = ASN1HEX;var u = v.getChildIdx;var t = v.getV;var q = {};q.algparam = null;if (s.substr(0, 2) != "30") {throw "malformed plain PKCS8 private key(code:001)";}var r = u(s, 0);if (r.length != 3) {throw "malformed plain PKCS8 private key(code:002)";}if (s.substr(r[1], 2) != "30") {throw "malformed PKCS8 private key(code:003)";}var p = u(s, r[1]);if (p.length != 2) {throw "malformed PKCS8 private key(code:004)";}if (s.substr(p[0], 2) != "06") {throw "malformed PKCS8 private key(code:005)";}q.algoid = t(s, p[0]);if (s.substr(p[1], 2) == "06") {q.algparam = t(s, p[1]);}if (s.substr(r[2], 2) != "04") {throw "malformed PKCS8 private key(code:006)";}q.keyidx = v.getVidx(s, r[2]);return q;}, getKeyFromPlainPrivatePKCS8PEM: function getKeyFromPlainPrivatePKCS8PEM(q) {var p = pemtohex(q, "PRIVATE KEY");var r = this.getKeyFromPlainPrivatePKCS8Hex(p);return r;}, getKeyFromPlainPrivatePKCS8Hex: function getKeyFromPlainPrivatePKCS8Hex(p) {var q = this.parsePlainPrivatePKCS8Hex(p);var r;if (q.algoid == "2a864886f70d010101") {r = new RSAKey();} else {if (q.algoid == "2a8648ce380401") {r = new KJUR.crypto.DSA();} else {if (q.algoid == "2a8648ce3d0201") {r = new KJUR.crypto.ECDSA();} else {throw "unsupported private key algorithm";}}}r.readPKCS8PrvKeyHex(p);return r;}, _getKeyFromPublicPKCS8Hex: function _getKeyFromPublicPKCS8Hex(q) {var p;var r = ASN1HEX.getVbyList(q, 0, [0, 0], "06");if (r === "2a864886f70d010101") {p = new RSAKey();} else {if (r === "2a8648ce380401") {p = new KJUR.crypto.DSA();} else {if (r === "2a8648ce3d0201") {p = new KJUR.crypto.ECDSA();} else {throw "unsupported PKCS#8 public key hex";}}}p.readPKCS8PubKeyHex(q);return p;}, parsePublicRawRSAKeyHex: function parsePublicRawRSAKeyHex(r) {var u = ASN1HEX;var t = u.getChildIdx;var s = u.getV;var p = {};if (r.substr(0, 2) != "30") {throw "malformed RSA key(code:001)";}var q = t(r, 0);if (q.length != 2) {throw "malformed RSA key(code:002)";}if (r.substr(q[0], 2) != "02") {throw "malformed RSA key(code:003)";}p.n = s(r, q[0]);if (r.substr(q[1], 2) != "02") {throw "malformed RSA key(code:004)";}p.e = s(r, q[1]);return p;}, parsePublicPKCS8Hex: function parsePublicPKCS8Hex(t) {var v = ASN1HEX;var u = v.getChildIdx;var s = v.getV;var q = {};q.algparam = null;var r = u(t, 0);if (r.length != 2) {throw "outer DERSequence shall have 2 elements: " + r.length;}var w = r[0];if (t.substr(w, 2) != "30") {throw "malformed PKCS8 public key(code:001)";}var p = u(t, w);if (p.length != 2) {throw "malformed PKCS8 public key(code:002)";}if (t.substr(p[0], 2) != "06") {throw "malformed PKCS8 public key(code:003)";}q.algoid = s(t, p[0]);if (t.substr(p[1], 2) == "06") {q.algparam = s(t, p[1]);} else {if (t.substr(p[1], 2) == "30") {q.algparam = {};q.algparam.p = v.getVbyList(t, p[1], [0], "02");q.algparam.q = v.getVbyList(t, p[1], [1], "02");q.algparam.g = v.getVbyList(t, p[1], [2], "02");}}if (t.substr(r[1], 2) != "03") {throw "malformed PKCS8 public key(code:004)";}q.key = s(t, r[1]).substr(2);return q;} };}();KEYUTIL.getKey = function (l, k, n) {var G = ASN1HEX,L = G.getChildIdx,v = G.getV,d = G.getVbyList,c = KJUR.crypto,i = c.ECDSA,C = c.DSA,w = RSAKey,M = pemtohex,F = KEYUTIL;if (typeof w != "undefined" && l instanceof w) {return l;}if (typeof i != "undefined" && l instanceof i) {return l;}if (typeof C != "undefined" && l instanceof C) {return l;}if (l.curve !== undefined && l.xy !== undefined && l.d === undefined) {return new i({ pub: l.xy, curve: l.curve });}if (l.curve !== undefined && l.d !== undefined) {return new i({ prv: l.d, curve: l.curve });}if (l.kty === undefined && l.n !== undefined && l.e !== undefined && l.d === undefined) {var P = new w();P.setPublic(l.n, l.e);return P;}if (l.kty === undefined && l.n !== undefined && l.e !== undefined && l.d !== undefined && l.p !== undefined && l.q !== undefined && l.dp !== undefined && l.dq !== undefined && l.co !== undefined && l.qi === undefined) {var P = new w();P.setPrivateEx(l.n, l.e, l.d, l.p, l.q, l.dp, l.dq, l.co);return P;}if (l.kty === undefined && l.n !== undefined && l.e !== undefined && l.d !== undefined && l.p === undefined) {var P = new w();P.setPrivate(l.n, l.e, l.d);return P;}if (l.p !== undefined && l.q !== undefined && l.g !== undefined && l.y !== undefined && l.x === undefined) {var P = new C();P.setPublic(l.p, l.q, l.g, l.y);return P;}if (l.p !== undefined && l.q !== undefined && l.g !== undefined && l.y !== undefined && l.x !== undefined) {var P = new C();P.setPrivate(l.p, l.q, l.g, l.y, l.x);return P;}if (l.kty === "RSA" && l.n !== undefined && l.e !== undefined && l.d === undefined) {var P = new w();P.setPublic(b64utohex(l.n), b64utohex(l.e));return P;}if (l.kty === "RSA" && l.n !== undefined && l.e !== undefined && l.d !== undefined && l.p !== undefined && l.q !== undefined && l.dp !== undefined && l.dq !== undefined && l.qi !== undefined) {var P = new w();P.setPrivateEx(b64utohex(l.n), b64utohex(l.e), b64utohex(l.d), b64utohex(l.p), b64utohex(l.q), b64utohex(l.dp), b64utohex(l.dq), b64utohex(l.qi));return P;}if (l.kty === "RSA" && l.n !== undefined && l.e !== undefined && l.d !== undefined) {var P = new w();P.setPrivate(b64utohex(l.n), b64utohex(l.e), b64utohex(l.d));return P;}if (l.kty === "EC" && l.crv !== undefined && l.x !== undefined && l.y !== undefined && l.d === undefined) {var j = new i({ curve: l.crv });var t = j.ecparams.keylen / 4;var B = ("0000000000" + b64utohex(l.x)).slice(-t);var z = ("0000000000" + b64utohex(l.y)).slice(-t);var u = "04" + B + z;j.setPublicKeyHex(u);return j;}if (l.kty === "EC" && l.crv !== undefined && l.x !== undefined && l.y !== undefined && l.d !== undefined) {var j = new i({ curve: l.crv });var t = j.ecparams.keylen / 4;var B = ("0000000000" + b64utohex(l.x)).slice(-t);var z = ("0000000000" + b64utohex(l.y)).slice(-t);var u = "04" + B + z;var b = ("0000000000" + b64utohex(l.d)).slice(-t);j.setPublicKeyHex(u);j.setPrivateKeyHex(b);return j;}if (n === "pkcs5prv") {var J = l,G = ASN1HEX,N,P;N = L(J, 0);if (N.length === 9) {P = new w();P.readPKCS5PrvKeyHex(J);} else {if (N.length === 6) {P = new C();P.readPKCS5PrvKeyHex(J);} else {if (N.length > 2 && J.substr(N[1], 2) === "04") {P = new i();P.readPKCS5PrvKeyHex(J);} else {throw "unsupported PKCS#1/5 hexadecimal key";}}}return P;}if (n === "pkcs8prv") {var P = F.getKeyFromPlainPrivatePKCS8Hex(l);return P;}if (n === "pkcs8pub") {return F._getKeyFromPublicPKCS8Hex(l);}if (n === "x509pub") {return X509.getPublicKeyFromCertHex(l);}if (l.indexOf("-END CERTIFICATE-", 0) != -1 || l.indexOf("-END X509 CERTIFICATE-", 0) != -1 || l.indexOf("-END TRUSTED CERTIFICATE-", 0) != -1) {return X509.getPublicKeyFromCertPEM(l);}if (l.indexOf("-END PUBLIC KEY-") != -1) {var O = pemtohex(l, "PUBLIC KEY");return F._getKeyFromPublicPKCS8Hex(O);}if (l.indexOf("-END RSA PRIVATE KEY-") != -1 && l.indexOf("4,ENCRYPTED") == -1) {var m = M(l, "RSA PRIVATE KEY");return F.getKey(m, null, "pkcs5prv");}if (l.indexOf("-END DSA PRIVATE KEY-") != -1 && l.indexOf("4,ENCRYPTED") == -1) {var I = M(l, "DSA PRIVATE KEY");var E = d(I, 0, [1], "02");var D = d(I, 0, [2], "02");var K = d(I, 0, [3], "02");var r = d(I, 0, [4], "02");var s = d(I, 0, [5], "02");var P = new C();P.setPrivate(new BigInteger(E, 16), new BigInteger(D, 16), new BigInteger(K, 16), new BigInteger(r, 16), new BigInteger(s, 16));return P;}if (l.indexOf("-END EC PRIVATE KEY-") != -1 && l.indexOf("4,ENCRYPTED") == -1) {var m = M(l, "EC PRIVATE KEY");return F.getKey(m, null, "pkcs5prv");}if (l.indexOf("-END PRIVATE KEY-") != -1) {return F.getKeyFromPlainPrivatePKCS8PEM(l);}if (l.indexOf("-END RSA PRIVATE KEY-") != -1 && l.indexOf("4,ENCRYPTED") != -1) {var o = F.getDecryptedKeyHex(l, k);var H = new RSAKey();H.readPKCS5PrvKeyHex(o);return H;}if (l.indexOf("-END EC PRIVATE KEY-") != -1 && l.indexOf("4,ENCRYPTED") != -1) {var I = F.getDecryptedKeyHex(l, k);var P = d(I, 0, [1], "04");var f = d(I, 0, [2, 0], "06");var A = d(I, 0, [3, 0], "03").substr(2);var e = "";if (KJUR.crypto.OID.oidhex2name[f] !== undefined) {e = KJUR.crypto.OID.oidhex2name[f];} else {throw "undefined OID(hex) in KJUR.crypto.OID: " + f;}var j = new i({ curve: e });j.setPublicKeyHex(A);j.setPrivateKeyHex(P);j.isPublic = false;return j;}if (l.indexOf("-END DSA PRIVATE KEY-") != -1 && l.indexOf("4,ENCRYPTED") != -1) {var I = F.getDecryptedKeyHex(l, k);var E = d(I, 0, [1], "02");var D = d(I, 0, [2], "02");var K = d(I, 0, [3], "02");var r = d(I, 0, [4], "02");var s = d(I, 0, [5], "02");var P = new C();P.setPrivate(new BigInteger(E, 16), new BigInteger(D, 16), new BigInteger(K, 16), new BigInteger(r, 16), new BigInteger(s, 16));return P;}if (l.indexOf("-END ENCRYPTED PRIVATE KEY-") != -1) {return F.getKeyFromEncryptedPKCS8PEM(l, k);}throw new Error("not supported argument");};KEYUTIL.generateKeypair = function (a, c) {if (a == "RSA") {var b = c;var h = new RSAKey();h.generate(b, "10001");h.isPrivate = true;h.isPublic = true;var f = new RSAKey();var e = h.n.toString(16);var i = h.e.toString(16);f.setPublic(e, i);f.isPrivate = false;f.isPublic = true;var k = {};k.prvKeyObj = h;k.pubKeyObj = f;return k;} else {if (a == "EC") {var d = c;var g = new KJUR.crypto.ECDSA({ curve: d });var j = g.generateKeyPairHex();var h = new KJUR.crypto.ECDSA({ curve: d });h.setPublicKeyHex(j.ecpubhex);h.setPrivateKeyHex(j.ecprvhex);h.isPrivate = true;h.isPublic = false;var f = new KJUR.crypto.ECDSA({ curve: d });f.setPublicKeyHex(j.ecpubhex);f.isPrivate = false;f.isPublic = true;var k = {};k.prvKeyObj = h;k.pubKeyObj = f;return k;} else {throw "unknown algorithm: " + a;}}};KEYUTIL.getPEM = function (b, D, y, m, q, j) {var F = KJUR,k = F.asn1,z = k.DERObjectIdentifier,f = k.DERInteger,l = k.ASN1Util.newObject,a = k.x509,C = a.SubjectPublicKeyInfo,e = F.crypto,u = e.DSA,r = e.ECDSA,n = RSAKey;function A(s) {var G = l({ seq: [{ "int": 0 }, { "int": { bigint: s.n } }, { "int": s.e }, { "int": { bigint: s.d } }, { "int": { bigint: s.p } }, { "int": { bigint: s.q } }, { "int": { bigint: s.dmp1 } }, { "int": { bigint: s.dmq1 } }, { "int": { bigint: s.coeff } }] });return G;}function B(G) {var s = l({ seq: [{ "int": 1 }, { octstr: { hex: G.prvKeyHex } }, { tag: ["a0", true, { oid: { name: G.curveName } }] }, { tag: ["a1", true, { bitstr: { hex: "00" + G.pubKeyHex } }] }] });return s;}function x(s) {var G = l({ seq: [{ "int": 0 }, { "int": { bigint: s.p } }, { "int": { bigint: s.q } }, { "int": { bigint: s.g } }, { "int": { bigint: s.y } }, { "int": { bigint: s.x } }] });return G;}if ((n !== undefined && b instanceof n || u !== undefined && b instanceof u || r !== undefined && b instanceof r) && b.isPublic == true && (D === undefined || D == "PKCS8PUB")) {var E = new C(b);var w = E.getEncodedHex();return hextopem(w, "PUBLIC KEY");}if (D == "PKCS1PRV" && n !== undefined && b instanceof n && (y === undefined || y == null) && b.isPrivate == true) {var E = A(b);var w = E.getEncodedHex();return hextopem(w, "RSA PRIVATE KEY");}if (D == "PKCS1PRV" && r !== undefined && b instanceof r && (y === undefined || y == null) && b.isPrivate == true) {var i = new z({ name: b.curveName });var v = i.getEncodedHex();var h = B(b);var t = h.getEncodedHex();var p = "";p += hextopem(v, "EC PARAMETERS");p += hextopem(t, "EC PRIVATE KEY");return p;}if (D == "PKCS1PRV" && u !== undefined && b instanceof u && (y === undefined || y == null) && b.isPrivate == true) {var E = x(b);var w = E.getEncodedHex();return hextopem(w, "DSA PRIVATE KEY");}if (D == "PKCS5PRV" && n !== undefined && b instanceof n && y !== undefined && y != null && b.isPrivate == true) {var E = A(b);var w = E.getEncodedHex();if (m === undefined) {m = "DES-EDE3-CBC";}return this.getEncryptedPKCS5PEMFromPrvKeyHex("RSA", w, y, m, j);}if (D == "PKCS5PRV" && r !== undefined && b instanceof r && y !== undefined && y != null && b.isPrivate == true) {var E = B(b);var w = E.getEncodedHex();if (m === undefined) {m = "DES-EDE3-CBC";}return this.getEncryptedPKCS5PEMFromPrvKeyHex("EC", w, y, m, j);}if (D == "PKCS5PRV" && u !== undefined && b instanceof u && y !== undefined && y != null && b.isPrivate == true) {var E = x(b);var w = E.getEncodedHex();if (m === undefined) {m = "DES-EDE3-CBC";}return this.getEncryptedPKCS5PEMFromPrvKeyHex("DSA", w, y, m, j);}var o = function o(G, s) {var I = c(G, s);var H = new l({ seq: [{ seq: [{ oid: { name: "pkcs5PBES2" } }, { seq: [{ seq: [{ oid: { name: "pkcs5PBKDF2" } }, { seq: [{ octstr: { hex: I.pbkdf2Salt } }, { "int": I.pbkdf2Iter }] }] }, { seq: [{ oid: { name: "des-EDE3-CBC" } }, { octstr: { hex: I.encryptionSchemeIV } }] }] }] }, { octstr: { hex: I.ciphertext } }] });return H.getEncodedHex();};var c = function c(N, O) {var H = 100;var M = CryptoJS.lib.WordArray.random(8);var L = "DES-EDE3-CBC";var s = CryptoJS.lib.WordArray.random(8);var I = CryptoJS.PBKDF2(O, M, { keySize: 192 / 32, iterations: H });var J = CryptoJS.enc.Hex.parse(N);var K = CryptoJS.TripleDES.encrypt(J, I, { iv: s }) + "";var G = {};G.ciphertext = K;G.pbkdf2Salt = CryptoJS.enc.Hex.stringify(M);G.pbkdf2Iter = H;G.encryptionSchemeAlg = L;G.encryptionSchemeIV = CryptoJS.enc.Hex.stringify(s);return G;};if (D == "PKCS8PRV" && n != undefined && b instanceof n && b.isPrivate == true) {var g = A(b);var d = g.getEncodedHex();var E = l({ seq: [{ "int": 0 }, { seq: [{ oid: { name: "rsaEncryption" } }, { "null": true }] }, { octstr: { hex: d } }] });var w = E.getEncodedHex();if (y === undefined || y == null) {return hextopem(w, "PRIVATE KEY");} else {var t = o(w, y);return hextopem(t, "ENCRYPTED PRIVATE KEY");}}if (D == "PKCS8PRV" && r !== undefined && b instanceof r && b.isPrivate == true) {var g = new l({ seq: [{ "int": 1 }, { octstr: { hex: b.prvKeyHex } }, { tag: ["a1", true, { bitstr: { hex: "00" + b.pubKeyHex } }] }] });var d = g.getEncodedHex();var E = l({ seq: [{ "int": 0 }, { seq: [{ oid: { name: "ecPublicKey" } }, { oid: { name: b.curveName } }] }, { octstr: { hex: d } }] });var w = E.getEncodedHex();if (y === undefined || y == null) {return hextopem(w, "PRIVATE KEY");} else {var t = o(w, y);return hextopem(t, "ENCRYPTED PRIVATE KEY");}}if (D == "PKCS8PRV" && u !== undefined && b instanceof u && b.isPrivate == true) {var g = new f({ bigint: b.x });var d = g.getEncodedHex();var E = l({ seq: [{ "int": 0 }, { seq: [{ oid: { name: "dsa" } }, { seq: [{ "int": { bigint: b.p } }, { "int": { bigint: b.q } }, { "int": { bigint: b.g } }] }] }, { octstr: { hex: d } }] });var w = E.getEncodedHex();if (y === undefined || y == null) {return hextopem(w, "PRIVATE KEY");} else {var t = o(w, y);return hextopem(t, "ENCRYPTED PRIVATE KEY");}}throw new Error("unsupported object nor format");};KEYUTIL.getKeyFromCSRPEM = function (b) {var a = pemtohex(b, "CERTIFICATE REQUEST");var c = KEYUTIL.getKeyFromCSRHex(a);return c;};KEYUTIL.getKeyFromCSRHex = function (a) {var c = KEYUTIL.parseCSRHex(a);var b = KEYUTIL.getKey(c.p8pubkeyhex, null, "pkcs8pub");return b;};KEYUTIL.parseCSRHex = function (d) {var i = ASN1HEX;var f = i.getChildIdx;var c = i.getTLV;var b = {};var g = d;if (g.substr(0, 2) != "30") {throw "malformed CSR(code:001)";}var e = f(g, 0);if (e.length < 1) {throw "malformed CSR(code:002)";}if (g.substr(e[0], 2) != "30") {throw "malformed CSR(code:003)";}var a = f(g, e[0]);if (a.length < 3) {throw "malformed CSR(code:004)";}b.p8pubkeyhex = c(g, a[2]);return b;};KEYUTIL.getKeyID = function (f) {var c = KEYUTIL;var e = ASN1HEX;if (typeof f === "string" && f.indexOf("BEGIN ") != -1) {f = c.getKey(f);}var d = pemtohex(c.getPEM(f));var b = e.getIdxbyList(d, 0, [1]);var a = e.getV(d, b).substring(2);return KJUR.crypto.Util.hashHex(a, "sha1");};KEYUTIL.getJWKFromKey = function (d) {var b = {};if (d instanceof RSAKey && d.isPrivate) {b.kty = "RSA";b.n = hextob64u(d.n.toString(16));b.e = hextob64u(d.e.toString(16));b.d = hextob64u(d.d.toString(16));b.p = hextob64u(d.p.toString(16));b.q = hextob64u(d.q.toString(16));b.dp = hextob64u(d.dmp1.toString(16));b.dq = hextob64u(d.dmq1.toString(16));b.qi = hextob64u(d.coeff.toString(16));return b;} else {if (d instanceof RSAKey && d.isPublic) {b.kty = "RSA";b.n = hextob64u(d.n.toString(16));b.e = hextob64u(d.e.toString(16));return b;} else {if (d instanceof KJUR.crypto.ECDSA && d.isPrivate) {var a = d.getShortNISTPCurveName();if (a !== "P-256" && a !== "P-384") {throw "unsupported curve name for JWT: " + a;}var c = d.getPublicKeyXYHex();b.kty = "EC";b.crv = a;b.x = hextob64u(c.x);b.y = hextob64u(c.y);b.d = hextob64u(d.prvKeyHex);return b;} else {if (d instanceof KJUR.crypto.ECDSA && d.isPublic) {var a = d.getShortNISTPCurveName();if (a !== "P-256" && a !== "P-384") {throw "unsupported curve name for JWT: " + a;}var c = d.getPublicKeyXYHex();b.kty = "EC";b.crv = a;b.x = hextob64u(c.x);b.y = hextob64u(c.y);return b;}}}}throw "not supported key object";};
RSAKey.getPosArrayOfChildrenFromHex = function (a) {return ASN1HEX.getChildIdx(a, 0);};RSAKey.getHexValueArrayOfChildrenFromHex = function (f) {var n = ASN1HEX;var i = n.getV;var k = RSAKey.getPosArrayOfChildrenFromHex(f);var e = i(f, k[0]);var j = i(f, k[1]);var b = i(f, k[2]);var c = i(f, k[3]);var h = i(f, k[4]);var g = i(f, k[5]);var m = i(f, k[6]);var l = i(f, k[7]);var d = i(f, k[8]);var k = new Array();k.push(e, j, b, c, h, g, m, l, d);return k;};RSAKey.prototype.readPrivateKeyFromPEMString = function (d) {var c = pemtohex(d);var b = RSAKey.getHexValueArrayOfChildrenFromHex(c);this.setPrivateEx(b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8]);};RSAKey.prototype.readPKCS5PrvKeyHex = function (c) {var b = RSAKey.getHexValueArrayOfChildrenFromHex(c);this.setPrivateEx(b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8]);};RSAKey.prototype.readPKCS8PrvKeyHex = function (e) {var c, i, k, b, a, f, d, j;var m = ASN1HEX;var l = m.getVbyListEx;if (m.isASN1HEX(e) === false) {throw new Error("not ASN.1 hex string");}try {c = l(e, 0, [2, 0, 1], "02");i = l(e, 0, [2, 0, 2], "02");k = l(e, 0, [2, 0, 3], "02");b = l(e, 0, [2, 0, 4], "02");a = l(e, 0, [2, 0, 5], "02");f = l(e, 0, [2, 0, 6], "02");d = l(e, 0, [2, 0, 7], "02");j = l(e, 0, [2, 0, 8], "02");} catch (g) {throw new Error("malformed PKCS#8 plain RSA private key");}this.setPrivateEx(c, i, k, b, a, f, d, j);};RSAKey.prototype.readPKCS5PubKeyHex = function (c) {var e = ASN1HEX;var b = e.getV;if (e.isASN1HEX(c) === false) {throw new Error("keyHex is not ASN.1 hex string");}var a = e.getChildIdx(c, 0);if (a.length !== 2 || c.substr(a[0], 2) !== "02" || c.substr(a[1], 2) !== "02") {throw new Error("wrong hex for PKCS#5 public key");}var f = b(c, a[0]);var d = b(c, a[1]);this.setPublic(f, d);};RSAKey.prototype.readPKCS8PubKeyHex = function (b) {var c = ASN1HEX;if (c.isASN1HEX(b) === false) {throw new Error("not ASN.1 hex string");}if (c.getTLVbyListEx(b, 0, [0, 0]) !== "06092a864886f70d010101") {throw new Error("not PKCS8 RSA public key");}var a = c.getTLVbyListEx(b, 0, [1, 0]);this.readPKCS5PubKeyHex(a);};RSAKey.prototype.readCertPubKeyHex = function (b, d) {var a, c;a = new X509();a.readCertHex(b);c = a.getPublicKeyHex();this.readPKCS8PubKeyHex(c);};
var _RE_HEXDECONLY = new RegExp("[^0-9a-f]", "gi");function _rsasign_getHexPaddedDigestInfoForString(d, e, a) {var b = function b(f) {return KJUR.crypto.Util.hashString(f, a);};var c = b(d);return KJUR.crypto.Util.getPaddedDigestInfoHex(c, a, e);}function _zeroPaddingOfSignature(e, d) {var c = "";var a = d / 4 - e.length;for (var b = 0; b < a; b++) {c = c + "0";}return c + e;}RSAKey.prototype.sign = function (d, a) {var b = function b(e) {return KJUR.crypto.Util.hashString(e, a);};var c = b(d);return this.signWithMessageHash(c, a);};RSAKey.prototype.signWithMessageHash = function (e, c) {var f = KJUR.crypto.Util.getPaddedDigestInfoHex(e, c, this.n.bitLength());var b = parseBigInt(f, 16);var d = this.doPrivate(b);var a = d.toString(16);return _zeroPaddingOfSignature(a, this.n.bitLength());};function pss_mgf1_str(c, a, e) {var b = "",d = 0;while (b.length < a) {b += hextorstr(e(rstrtohex(c + String.fromCharCode.apply(String, [(d & 4278190080) >> 24, (d & 16711680) >> 16, (d & 65280) >> 8, d & 255]))));d += 1;}return b;}RSAKey.prototype.signPSS = function (e, a, d) {var c = function c(f) {return KJUR.crypto.Util.hashHex(f, a);};var b = c(rstrtohex(e));if (d === undefined) {d = -1;}return this.signWithMessageHashPSS(b, a, d);};RSAKey.prototype.signWithMessageHashPSS = function (l, a, k) {var b = hextorstr(l);var g = b.length;var m = this.n.bitLength() - 1;var c = Math.ceil(m / 8);var d;var o = function o(i) {return KJUR.crypto.Util.hashHex(i, a);};if (k === -1 || k === undefined) {k = g;} else {if (k === -2) {k = c - g - 2;} else {if (k < -2) {throw new Error("invalid salt length");}}}if (c < g + k + 2) {throw new Error("data too long");}var f = "";if (k > 0) {f = new Array(k);new SecureRandom().nextBytes(f);f = String.fromCharCode.apply(String, f);}var n = hextorstr(o(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00" + b + f)));var j = [];for (d = 0; d < c - k - g - 2; d += 1) {j[d] = 0;}var e = String.fromCharCode.apply(String, j) + "\x01" + f;var h = pss_mgf1_str(n, e.length, o);var q = [];for (d = 0; d < e.length; d += 1) {q[d] = e.charCodeAt(d) ^ h.charCodeAt(d);}var p = 65280 >> 8 * c - m & 255;q[0] &= ~p;for (d = 0; d < g; d++) {q.push(n.charCodeAt(d));}q.push(188);return _zeroPaddingOfSignature(this.doPrivate(new BigInteger(q)).toString(16), this.n.bitLength());};function _rsasign_getDecryptSignatureBI(a, d, c) {var b = new RSAKey();b.setPublic(d, c);var e = b.doPublic(a);return e;}function _rsasign_getHexDigestInfoFromSig(a, c, b) {var e = _rsasign_getDecryptSignatureBI(a, c, b);var d = e.toString(16).replace(/^1f+00/, "");return d;}function _rsasign_getAlgNameAndHashFromHexDisgestInfo(f) {for (var e in KJUR.crypto.Util.DIGESTINFOHEAD) {var d = KJUR.crypto.Util.DIGESTINFOHEAD[e];var b = d.length;if (f.substring(0, b) == d) {var c = [e, f.substring(b)];return c;}}return [];}RSAKey.prototype.verify = function (f, j) {j = j.replace(_RE_HEXDECONLY, "");j = j.replace(/[ \n]+/g, "");var b = parseBigInt(j, 16);if (b.bitLength() > this.n.bitLength()) {return 0;}var i = this.doPublic(b);var e = i.toString(16).replace(/^1f+00/, "");var g = _rsasign_getAlgNameAndHashFromHexDisgestInfo(e);if (g.length == 0) {return false;}var d = g[0];var h = g[1];var a = function a(k) {return KJUR.crypto.Util.hashString(k, d);};var c = a(f);return h == c;};RSAKey.prototype.verifyWithMessageHash = function (e, a) {if (a.length != Math.ceil(this.n.bitLength() / 4)) {return false;}var b = parseBigInt(a, 16);if (b.bitLength() > this.n.bitLength()) {return 0;}var h = this.doPublic(b);var g = h.toString(16).replace(/^1f+00/, "");var c = _rsasign_getAlgNameAndHashFromHexDisgestInfo(g);if (c.length == 0) {return false;}var d = c[0];var f = c[1];return f == e;};RSAKey.prototype.verifyPSS = function (c, b, a, f) {var e = function e(g) {return KJUR.crypto.Util.hashHex(g, a);};var d = e(rstrtohex(c));if (f === undefined) {f = -1;}return this.verifyWithMessageHashPSS(d, b, a, f);};RSAKey.prototype.verifyWithMessageHashPSS = function (f, s, l, c) {if (s.length != Math.ceil(this.n.bitLength() / 4)) {return false;}var k = new BigInteger(s, 16);var r = function r(i) {return KJUR.crypto.Util.hashHex(i, l);};var j = hextorstr(f);var h = j.length;var g = this.n.bitLength() - 1;var m = Math.ceil(g / 8);var q;if (c === -1 || c === undefined) {c = h;} else {if (c === -2) {c = m - h - 2;} else {if (c < -2) {throw new Error("invalid salt length");}}}if (m < h + c + 2) {throw new Error("data too long");}var a = this.doPublic(k).toByteArray();for (q = 0; q < a.length; q += 1) {a[q] &= 255;}while (a.length < m) {a.unshift(0);}if (a[m - 1] !== 188) {throw new Error("encoded message does not end in 0xbc");}a = String.fromCharCode.apply(String, a);var d = a.substr(0, m - h - 1);var e = a.substr(d.length, h);var p = 65280 >> 8 * m - g & 255;if ((d.charCodeAt(0) & p) !== 0) {throw new Error("bits beyond keysize not zero");}var n = pss_mgf1_str(e, d.length, r);var o = [];for (q = 0; q < d.length; q += 1) {o[q] = d.charCodeAt(q) ^ n.charCodeAt(q);}o[0] &= ~p;var b = m - h - c - 2;for (q = 0; q < b; q += 1) {if (o[q] !== 0) {throw new Error("leftmost octets not zero");}}if (o[b] !== 1) {throw new Error("0x01 marker not found");}return e === hextorstr(r(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00" + j + String.fromCharCode.apply(String, o.slice(-c)))));};RSAKey.SALT_LEN_HLEN = -1;RSAKey.SALT_LEN_MAX = -2;RSAKey.SALT_LEN_RECOVER = -2;
function X509(q) {var j = ASN1HEX,n = j.getChildIdx,g = j.getV,b = j.getTLV,c = j.getVbyList,k = j.getVbyListEx,a = j.getTLVbyList,l = j.getTLVbyListEx,h = j.getIdxbyList,e = j.getIdxbyListEx,i = j.getVidx,p = j.oidname,m = j.hextooidstr,d = X509,r = pemtohex,f;try {f = KJUR.asn1.x509.AlgorithmIdentifier.PSSNAME2ASN1TLV;} catch (o) {}this.HEX2STAG = { "0c": "utf8", "13": "prn", "16": "ia5", "1a": "vis", "1e": "bmp" };this.hex = null;this.version = 0;this.foffset = 0;this.aExtInfo = null;this.getVersion = function () {if (this.hex === null || this.version !== 0) {return this.version;}if (a(this.hex, 0, [0, 0]) !== "a003020102") {this.version = 1;this.foffset = -1;return 1;}this.version = 3;return 3;};this.getSerialNumberHex = function () {return k(this.hex, 0, [0, 0], "02");};this.getSignatureAlgorithmField = function () {var s = l(this.hex, 0, [0, 1]);return this.getAlgorithmIdentifierName(s);};this.getAlgorithmIdentifierName = function (s) {for (var t in f) {if (s === f[t]) {return t;}}return p(k(s, 0, [0], "06"));};this.getIssuer = function () {return this.getX500Name(this.getIssuerHex());};this.getIssuerHex = function () {return a(this.hex, 0, [0, 3 + this.foffset], "30");};this.getIssuerString = function () {return d.hex2dn(this.getIssuerHex());};this.getSubject = function () {return this.getX500Name(this.getSubjectHex());};this.getSubjectHex = function () {return a(this.hex, 0, [0, 5 + this.foffset], "30");};this.getSubjectString = function () {return d.hex2dn(this.getSubjectHex());};this.getNotBefore = function () {var t = c(this.hex, 0, [0, 4 + this.foffset, 0]);t = t.replace(/(..)/g, "%$1");t = decodeURIComponent(t);return t;};this.getNotAfter = function () {var t = c(this.hex, 0, [0, 4 + this.foffset, 1]);t = t.replace(/(..)/g, "%$1");t = decodeURIComponent(t);return t;};this.getPublicKeyHex = function () {return j.getTLVbyList(this.hex, 0, [0, 6 + this.foffset], "30");};this.getPublicKeyIdx = function () {return h(this.hex, 0, [0, 6 + this.foffset], "30");};this.getPublicKeyContentIdx = function () {var s = this.getPublicKeyIdx();return h(this.hex, s, [1, 0], "30");};this.getPublicKey = function () {return KEYUTIL.getKey(this.getPublicKeyHex(), null, "pkcs8pub");};this.getSignatureAlgorithmName = function () {var s = a(this.hex, 0, [1], "30");return this.getAlgorithmIdentifierName(s);};this.getSignatureValueHex = function () {return c(this.hex, 0, [2], "03", true);};this.verifySignature = function (u) {var v = this.getSignatureAlgorithmField();var s = this.getSignatureValueHex();var t = a(this.hex, 0, [0], "30");var w = new KJUR.crypto.Signature({ alg: v });w.init(u);w.updateHex(t);return w.verify(s);};this.parseExt = function (B) {var u, s, w;if (B === undefined) {w = this.hex;if (this.version !== 3) {return -1;}u = h(w, 0, [0, 7, 0], "30");s = n(w, u);} else {w = pemtohex(B);var x = h(w, 0, [0, 3, 0, 0], "06");if (g(w, x) != "2a864886f70d01090e") {this.aExtInfo = new Array();return;}u = h(w, 0, [0, 3, 0, 1, 0], "30");s = n(w, u);this.hex = w;}this.aExtInfo = new Array();for (var v = 0; v < s.length; v++) {var z = {};z.critical = false;var y = n(w, s[v]);var t = 0;if (y.length === 3) {z.critical = true;t = 1;}z.oid = j.hextooidstr(c(w, s[v], [0], "06"));var A = h(w, s[v], [1 + t]);z.vidx = i(w, A);this.aExtInfo.push(z);}};this.getExtInfo = function (u) {var s = this.aExtInfo;var v = u;if (!u.match(/^[0-9.]+$/)) {v = KJUR.asn1.x509.OID.name2oid(u);}if (v === "") {return undefined;}for (var t = 0; t < s.length; t++) {if (s[t].oid === v) {return s[t];}}return undefined;};this.getExtBasicConstraints = function (t, x) {if (t === undefined && x === undefined) {var v = this.getExtInfo("basicConstraints");if (v === undefined) {return undefined;}t = b(this.hex, v.vidx);x = v.critical;}var s = { extname: "basicConstraints" };if (x) {s.critical = true;}if (t === "3000") {return s;}if (t === "30030101ff") {s.cA = true;return s;}if (t.substr(0, 12) === "30060101ff02") {var w = g(t, 10);var u = parseInt(w, 16);s.cA = true;s.pathLen = u;return s;}throw new Error("hExtV parse error: " + t);};this.getExtKeyUsage = function (t, v) {if (t === undefined && v === undefined) {var u = this.getExtInfo("keyUsage");if (u === undefined) {return undefined;}t = b(this.hex, u.vidx);v = u.critical;}var s = { extname: "keyUsage" };if (v) {s.critical = true;}s.names = this.getExtKeyUsageString(t).split(",");return s;};this.getExtKeyUsageBin = function (u) {if (u === undefined) {var v = this.getExtInfo("keyUsage");if (v === undefined) {return "";}u = b(this.hex, v.vidx);}if (u.length != 8 && u.length != 10) {throw new Error("malformed key usage value: " + u);}var t = "000000000000000" + parseInt(u.substr(6), 16).toString(2);if (u.length == 8) {t = t.slice(-8);}if (u.length == 10) {t = t.slice(-16);}t = t.replace(/0+$/, "");if (t == "") {t = "0";}return t;};this.getExtKeyUsageString = function (u) {var v = this.getExtKeyUsageBin(u);var s = new Array();for (var t = 0; t < v.length; t++) {if (v.substr(t, 1) == "1") {s.push(X509.KEYUSAGE_NAME[t]);}}return s.join(",");};this.getExtSubjectKeyIdentifier = function (u, w) {if (u === undefined && w === undefined) {var v = this.getExtInfo("subjectKeyIdentifier");if (v === undefined) {return undefined;}u = b(this.hex, v.vidx);w = v.critical;}var s = { extname: "subjectKeyIdentifier" };if (w) {s.critical = true;}var t = g(u, 0);s.kid = { hex: t };return s;};this.getExtAuthorityKeyIdentifier = function (y, w) {if (y === undefined && w === undefined) {var s = this.getExtInfo("authorityKeyIdentifier");if (s === undefined) {return undefined;}y = b(this.hex, s.vidx);w = s.critical;}var z = { extname: "authorityKeyIdentifier" };if (w) {z.critical = true;}var x = n(y, 0);for (var t = 0; t < x.length; t++) {var A = y.substr(x[t], 2);if (A === "80") {z.kid = { hex: g(y, x[t]) };}if (A === "a1") {var v = b(y, x[t]);var u = this.getGeneralNames(v);z.issuer = u[0]["dn"];}if (A === "82") {z.sn = { hex: g(y, x[t]) };}}return z;};this.getExtExtKeyUsage = function (v, x) {if (v === undefined && x === undefined) {var w = this.getExtInfo("extKeyUsage");if (w === undefined) {return undefined;}v = b(this.hex, w.vidx);x = w.critical;}var s = { extname: "extKeyUsage", array: [] };if (x) {s.critical = true;}var t = n(v, 0);for (var u = 0; u < t.length; u++) {s.array.push(p(g(v, t[u])));}return s;};this.getExtExtKeyUsageName = function () {var w = this.getExtInfo("extKeyUsage");if (w === undefined) {return w;}var s = new Array();var v = b(this.hex, w.vidx);if (v === "") {return s;}var t = n(v, 0);for (var u = 0; u < t.length; u++) {s.push(p(g(v, t[u])));}return s;};this.getExtSubjectAltName = function (t, v) {if (t === undefined && v === undefined) {var u = this.getExtInfo("subjectAltName");if (u === undefined) {return undefined;}t = b(this.hex, u.vidx);v = u.critical;}var s = { extname: "subjectAltName", array: [] };if (v) {s.critical = true;}s.array = this.getGeneralNames(t);return s;};this.getExtIssuerAltName = function (t, v) {if (t === undefined && v === undefined) {var u = this.getExtInfo("issuerAltName");if (u === undefined) {return undefined;}t = b(this.hex, u.vidx);v = u.critical;}var s = { extname: "issuerAltName", array: [] };if (v) {s.critical = true;}s.array = this.getGeneralNames(t);return s;};this.getGeneralNames = function (w) {var u = n(w, 0);var s = [];for (var v = 0; v < u.length; v++) {var t = this.getGeneralName(b(w, u[v]));if (t !== undefined) {s.push(t);}}return s;};this.getGeneralName = function (t) {var s = t.substr(0, 2);var v = g(t, 0);var u = hextorstr(v);if (s == "81") {return { rfc822: u };}if (s == "82") {return { dns: u };}if (s == "86") {return { uri: u };}if (s == "87") {return { ip: hextoip(v) };}if (s == "a4") {return { dn: this.getX500Name(v) };}return undefined;};this.getExtSubjectAltName2 = function () {var w, z, y;var x = this.getExtInfo("subjectAltName");if (x === undefined) {return x;}var s = new Array();var v = b(this.hex, x.vidx);var t = n(v, 0);for (var u = 0; u < t.length; u++) {y = v.substr(t[u], 2);w = g(v, t[u]);if (y === "81") {z = hextoutf8(w);s.push(["MAIL", z]);}if (y === "82") {z = hextoutf8(w);s.push(["DNS", z]);}if (y === "84") {z = X509.hex2dn(w, 0);s.push(["DN", z]);}if (y === "86") {z = hextoutf8(w);s.push(["URI", z]);}if (y === "87") {z = hextoip(w);s.push(["IP", z]);}}return s;};this.getExtCRLDistributionPoints = function (w, y) {if (w === undefined && y === undefined) {var x = this.getExtInfo("cRLDistributionPoints");if (x === undefined) {return undefined;}w = b(this.hex, x.vidx);y = x.critical;}var t = { extname: "cRLDistributionPoints", array: [] };if (y) {t.critical = true;}var u = n(w, 0);for (var v = 0; v < u.length; v++) {var s = b(w, u[v]);t.array.push(this.getDistributionPoint(s));}return t;};this.getDistributionPoint = function (x) {var u = {};var v = n(x, 0);for (var w = 0; w < v.length; w++) {var t = x.substr(v[w], 2);var s = b(x, v[w]);if (t == "a0") {u.dpname = this.getDistributionPointName(s);}}return u;};this.getDistributionPointName = function (x) {var u = {};var v = n(x, 0);for (var w = 0; w < v.length; w++) {var t = x.substr(v[w], 2);var s = b(x, v[w]);if (t == "a0") {u.full = this.getGeneralNames(s);}}return u;};this.getExtCRLDistributionPointsURI = function () {var x = this.getExtInfo("cRLDistributionPoints");if (x === undefined) {return x;}var s = new Array();var t = n(this.hex, x.vidx);for (var v = 0; v < t.length; v++) {try {var y = c(this.hex, t[v], [0, 0, 0], "86");var w = hextoutf8(y);s.push(w);} catch (u) {}}return s;};this.getExtAIAInfo = function () {var w = this.getExtInfo("authorityInfoAccess");if (w === undefined) {return w;}var s = { ocsp: [], caissuer: [] };var t = n(this.hex, w.vidx);for (var u = 0; u < t.length; u++) {var x = c(this.hex, t[u], [0], "06");var v = c(this.hex, t[u], [1], "86");if (x === "2b06010505073001") {s.ocsp.push(hextoutf8(v));}if (x === "2b06010505073002") {s.caissuer.push(hextoutf8(v));}}return s;};this.getExtAuthorityInfoAccess = function (z, x) {if (z === undefined && x === undefined) {var s = this.getExtInfo("authorityInfoAccess");if (s === undefined) {return undefined;}z = b(this.hex, s.vidx);x = s.critical;}var A = { extname: "authorityInfoAccess", array: [] };if (x) {A.critical = true;}var y = n(z, 0);for (var t = 0; t < y.length; t++) {var w = k(z, y[t], [0], "06");var u = c(z, y[t], [1], "86");var v = hextoutf8(u);if (w == "2b06010505073001") {A.array.push({ ocsp: v });} else {if (w == "2b06010505073002") {A.array.push({ caissuer: v });} else {throw new Error("unknown method: " + w);}}}return A;};this.getExtCertificatePolicies = function (w, z) {if (w === undefined && z === undefined) {var y = this.getExtInfo("certificatePolicies");if (y === undefined) {return undefined;}w = b(this.hex, y.vidx);z = y.critical;}var s = { extname: "certificatePolicies", array: [] };if (z) {s.critical = true;}var t = n(w, 0);for (var u = 0; u < t.length; u++) {var x = b(w, t[u]);var v = this.getPolicyInformation(x);s.array.push(v);}return s;};this.getPolicyInformation = function (w) {var s = {};var y = c(w, 0, [0], "06");s.policyoid = p(y);var z = e(w, 0, [1], "30");if (z != -1) {s.array = [];var t = n(w, z);for (var u = 0; u < t.length; u++) {var x = b(w, t[u]);var v = this.getPolicyQualifierInfo(x);s.array.push(v);}}return s;};this.getPolicyQualifierInfo = function (t) {var s = {};var u = c(t, 0, [0], "06");if (u === "2b06010505070201") {var w = k(t, 0, [1], "16");s.cps = hextorstr(w);} else {if (u === "2b06010505070202") {var v = a(t, 0, [1], "30");s.unotice = this.getUserNotice(v);}}return s;};this.getUserNotice = function (w) {var t = {};var u = n(w, 0);for (var v = 0; v < u.length; v++) {var s = b(w, u[v]);if (s.substr(0, 2) != "30") {t.exptext = this.getDisplayText(s);}}return t;};this.getDisplayText = function (t) {var u = { "0c": "utf8", "16": "ia5", "1a": "vis", "1e": "bmp" };var s = {};s.type = u[t.substr(0, 2)];s.str = hextorstr(g(t, 0));return s;};this.getExtCRLNumber = function (t, u) {var s = { extname: "cRLNumber" };if (u) {s.critical = true;}if (t.substr(0, 2) == "02") {s.num = { hex: g(t, 0) };return s;}throw new Error("hExtV parse error: " + t);};this.getExtCRLReason = function (t, u) {var s = { extname: "cRLReason" };if (u) {s.critical = true;}if (t.substr(0, 2) == "0a") {s.code = parseInt(g(t, 0), 16);return s;}throw new Error("hExtV parse error: " + t);};this.getExtOcspNonce = function (t, v) {var s = { extname: "ocspNonce" };if (v) {s.critical = true;}var u = g(t, 0);s.hex = u;return s;};this.getExtOcspNoCheck = function (t, u) {var s = { extname: "ocspNoCheck" };if (u) {s.critical = true;}return s;};this.getExtAdobeTimeStamp = function (v, y) {if (v === undefined && y === undefined) {var x = this.getExtInfo("adobeTimeStamp");if (x === undefined) {return undefined;}v = b(this.hex, x.vidx);y = x.critical;}var s = { extname: "adobeTimeStamp" };if (y) {s.critical = true;}var u = n(v, 0);if (u.length > 1) {var z = b(v, u[1]);var t = this.getGeneralName(z);if (t.uri != undefined) {s.uri = t.uri;}}if (u.length > 2) {var w = b(v, u[2]);if (w == "0101ff") {s.reqauth = true;}if (w == "010100") {s.reqauth = false;}}return s;};this.getX500NameRule = function (s) {var z = true;var D = true;var C = false;var t = "";var w = "";var F = null;var A = [];for (var v = 0; v < s.length; v++) {var x = s[v];for (var u = 0; u < x.length; u++) {A.push(x[u]);}}for (var v = 0; v < A.length; v++) {var E = A[v];var G = E.ds;var B = E.value;var y = E.type;t += ":" + G;if (G != "prn" && G != "utf8" && G != "ia5") {return "mixed";}if (G == "ia5") {if (y != "CN") {return "mixed";} else {if (!KJUR.lang.String.isMail(B)) {return "mixed";} else {continue;}}}if (y == "C") {if (G == "prn") {continue;} else {return "mixed";}}w += ":" + G;if (F == null) {F = G;} else {if (F !== G) {return "mixed";}}}if (F == null) {return "prn";} else {return F;}};this.getX500Name = function (v) {var t = this.getX500NameArray(v);var u = this.dnarraytostr(t);return { array: t, str: u };};this.getX500NameArray = function (v) {var s = [];var t = n(v, 0);for (var u = 0; u < t.length; u++) {s.push(this.getRDN(b(v, t[u])));}return s;};this.getRDN = function (v) {var s = [];var t = n(v, 0);for (var u = 0; u < t.length; u++) {s.push(this.getAttrTypeAndValue(b(v, t[u])));}return s;};this.getAttrTypeAndValue = function (u) {var s = { type: null, value: null, ds: null };var t = n(u, 0);var x = c(u, t[0], [], "06");var w = c(u, t[1], []);var v = KJUR.asn1.ASN1Util.oidHexToInt(x);s.type = KJUR.asn1.x509.OID.oid2atype(v);s.value = hextorstr(w);s.ds = this.HEX2STAG[u.substr(t[1], 2)];return s;};this.readCertPEM = function (s) {this.readCertHex(r(s));};this.readCertHex = function (s) {this.hex = s;this.getVersion();try {h(this.hex, 0, [0, 7], "a3");this.parseExt();} catch (t) {}};this.getParam = function () {var s = {};s.version = this.getVersion();s.serial = { hex: this.getSerialNumberHex() };s.sigalg = this.getSignatureAlgorithmField();s.issuer = this.getIssuer();s.notbefore = this.getNotBefore();s.notafter = this.getNotAfter();s.subject = this.getSubject();s.sbjpubkey = hextopem(this.getPublicKeyHex(), "PUBLIC KEY");if (this.aExtInfo.length > 0) {s.ext = this.getExtParamArray();}s.sighex = this.getSignatureValueHex();return s;};this.getExtParamArray = function (t) {if (t == undefined) {var v = e(this.hex, 0, [0, "[3]"]);if (v != -1) {t = l(this.hex, 0, [0, "[3]", 0], "30");}}var s = [];var u = n(t, 0);for (var w = 0; w < u.length; w++) {var y = b(t, u[w]);var x = this.getExtParam(y);if (x != null) {s.push(x);}}return s;};this.getExtParam = function (t) {var A = {};var v = n(t, 0);var w = v.length;if (w != 2 && w != 3) {throw new Error("wrong number elements in Extension: " + w + " " + t);}var u = m(c(t, 0, [0], "06"));var y = false;if (w == 3 && a(t, 0, [1]) == "0101ff") {y = true;}var z = a(t, 0, [w - 1, 0]);var x = undefined;if (u == "2.5.29.14") {x = this.getExtSubjectKeyIdentifier(z, y);} else {if (u == "2.5.29.15") {x = this.getExtKeyUsage(z, y);} else {if (u == "2.5.29.17") {x = this.getExtSubjectAltName(z, y);} else {if (u == "2.5.29.18") {x = this.getExtIssuerAltName(z, y);} else {if (u == "2.5.29.19") {x = this.getExtBasicConstraints(z, y);} else {if (u == "2.5.29.31") {x = this.getExtCRLDistributionPoints(z, y);} else {if (u == "2.5.29.32") {x = this.getExtCertificatePolicies(z, y);} else {if (u == "2.5.29.35") {x = this.getExtAuthorityKeyIdentifier(z, y);} else {if (u == "2.5.29.37") {x = this.getExtExtKeyUsage(z, y);} else {if (u == "1.3.6.1.5.5.7.1.1") {x = this.getExtAuthorityInfoAccess(z, y);} else {if (u == "2.5.29.20") {x = this.getExtCRLNumber(z, y);} else {if (u == "2.5.29.21") {x = this.getExtCRLReason(z, y);} else {if (u == "1.3.6.1.5.5.7.48.1.2") {x = this.getExtOcspNonce(z, y);} else {if (u == "1.3.6.1.5.5.7.48.1.5") {x = this.getExtOcspNoCheck(z, y);} else {if (u == "1.2.840.113583.1.1.9.1") {x = this.getExtAdobeTimeStamp(z, y);}}}}}}}}}}}}}}}if (x != undefined) {return x;}var s = { extname: u, extn: z };if (y) {s.critical = true;}return s;};this.findExt = function (t, u) {for (var s = 0; s < t.length; s++) {if (t[s].extname == u) {return t[s];}}return null;};this.updateExtCDPFullURI = function (w, s) {var v = this.findExt(w, "cRLDistributionPoints");if (v == null) {return;}if (v.array == undefined) {return;}var y = v.array;for (var u = 0; u < y.length; u++) {if (y[u].dpname == undefined) {continue;}if (y[u].dpname.full == undefined) {continue;}var z = y[u].dpname.full;for (var t = 0; t < z.length; t++) {var x = z[u];if (x.uri == undefined) {continue;}x.uri = s;}}};this.updateExtAIAOCSP = function (w, t) {var v = this.findExt(w, "authorityInfoAccess");if (v == null) {return;}if (v.array == undefined) {return;}var s = v.array;for (var u = 0; u < s.length; u++) {if (s[u].ocsp != undefined) {s[u].ocsp = t;}}};this.updateExtAIACAIssuer = function (w, t) {var v = this.findExt(w, "authorityInfoAccess");if (v == null) {return;}if (v.array == undefined) {return;}var s = v.array;for (var u = 0; u < s.length; u++) {if (s[u].caissuer != undefined) {s[u].caissuer = t;}}};this.dnarraytostr = function (u) {function s(v) {return v.map(function (w) {return t(w);}).join("+");}function t(v) {return v.type + "=" + v.value;}return "/" + u.map(function (v) {return s(v);}).join("/");};this.getInfo = function () {var u = function u(M) {var L = JSON.stringify(M.array).replace(/[\[\]\{\}\"]/g, "");return L;};var A = function A(R) {var P = "";var L = R.array;for (var O = 0; O < L.length; O++) {var Q = L[O];P += "    policy oid: " + Q.policyoid + "\n";if (Q.array === undefined) {continue;}for (var N = 0; N < Q.array.length; N++) {var M = Q.array[N];if (M.cps !== undefined) {P += "    cps: " + M.cps + "\n";}}}return P;};var D = function D(P) {var O = "";var L = P.array;for (var N = 0; N < L.length; N++) {var Q = L[N];try {if (Q.dpname.full[0].uri !== undefined) {O += "    " + Q.dpname.full[0].uri + "\n";}} catch (M) {}try {if (Q.dname.full[0].dn.hex !== undefined) {O += "    " + X509.hex2dn(Q.dpname.full[0].dn.hex) + "\n";}} catch (M) {}}return O;};var B = function B(P) {var O = "";var L = P.array;for (var M = 0; M < L.length; M++) {var N = L[M];if (N.caissuer !== undefined) {O += "    caissuer: " + N.caissuer + "\n";}if (N.ocsp !== undefined) {O += "    ocsp: " + N.ocsp + "\n";}}return O;};var v = X509;var F, E, K;F = "Basic Fields\n";F += "  serial number: " + this.getSerialNumberHex() + "\n";F += "  signature algorithm: " + this.getSignatureAlgorithmField() + "\n";F += "  issuer: " + this.getIssuerString() + "\n";F += "  notBefore: " + this.getNotBefore() + "\n";F += "  notAfter: " + this.getNotAfter() + "\n";F += "  subject: " + this.getSubjectString() + "\n";F += "  subject public key info: \n";E = this.getPublicKey();F += "    key algorithm: " + E.type + "\n";if (E.type === "RSA") {F += "    n=" + hextoposhex(E.n.toString(16)).substr(0, 16) + "...\n";F += "    e=" + hextoposhex(E.e.toString(16)) + "\n";}K = this.aExtInfo;if (K !== undefined && K !== null) {F += "X509v3 Extensions:\n";for (var H = 0; H < K.length; H++) {var J = K[H];var t = KJUR.asn1.x509.OID.oid2name(J.oid);if (t === "") {t = J.oid;}var G = "";if (J.critical === true) {G = "CRITICAL";}F += "  " + t + " " + G + ":\n";if (t === "basicConstraints") {var w = this.getExtBasicConstraints();if (w.cA === undefined) {F += "    {}\n";} else {F += "    cA=true";if (w.pathLen !== undefined) {F += ", pathLen=" + w.pathLen;}F += "\n";}} else {if (t === "keyUsage") {F += "    " + this.getExtKeyUsageString() + "\n";} else {if (t === "subjectKeyIdentifier") {F += "    " + this.getExtSubjectKeyIdentifier().kid.hex + "\n";} else {if (t === "authorityKeyIdentifier") {var x = this.getExtAuthorityKeyIdentifier();if (x.kid !== undefined) {F += "    kid=" + x.kid.hex + "\n";}} else {if (t === "extKeyUsage") {var I = this.getExtExtKeyUsage().array;F += "    " + I.join(", ") + "\n";} else {if (t === "subjectAltName") {var y = u(this.getExtSubjectAltName());F += "    " + y + "\n";} else {if (t === "cRLDistributionPoints") {var C = this.getExtCRLDistributionPoints();F += D(C);} else {if (t === "authorityInfoAccess") {var z = this.getExtAuthorityInfoAccess();F += B(z);} else {if (t === "certificatePolicies") {F += A(this.getExtCertificatePolicies());}}}}}}}}}}}F += "signature algorithm: " + this.getSignatureAlgorithmName() + "\n";F += "signature: " + this.getSignatureValueHex().substr(0, 16) + "...\n";return F;};if (typeof q == "string") {if (q.indexOf("-----BEGIN") != -1) {this.readCertPEM(q);} else {if (KJUR.lang.String.isHex(q)) {this.readCertHex(q);}}}}X509.hex2dn = function (f, b) {if (b === undefined) {b = 0;}if (f.substr(b, 2) !== "30") {throw new Error("malformed DN");}var c = new Array();var d = ASN1HEX.getChildIdx(f, b);for (var e = 0; e < d.length; e++) {c.push(X509.hex2rdn(f, d[e]));}c = c.map(function (a) {return a.replace("/", "\\/");});return "/" + c.join("/");};X509.hex2rdn = function (f, b) {if (b === undefined) {b = 0;}if (f.substr(b, 2) !== "31") {throw new Error("malformed RDN");}var c = new Array();var d = ASN1HEX.getChildIdx(f, b);for (var e = 0; e < d.length; e++) {c.push(X509.hex2attrTypeValue(f, d[e]));}c = c.map(function (a) {return a.replace("+", "\\+");});return c.join("+");};X509.hex2attrTypeValue = function (d, i) {var j = ASN1HEX;var h = j.getV;if (i === undefined) {i = 0;}if (d.substr(i, 2) !== "30") {throw new Error("malformed attribute type and value");}var g = j.getChildIdx(d, i);if (g.length !== 2 || d.substr(g[0], 2) !== "06") {"malformed attribute type and value";}var b = h(d, g[0]);var f = KJUR.asn1.ASN1Util.oidHexToInt(b);var e = KJUR.asn1.x509.OID.oid2atype(f);var a = h(d, g[1]);var c = hextorstr(a);return e + "=" + c;};X509.getPublicKeyFromCertHex = function (b) {var a = new X509();a.readCertHex(b);return a.getPublicKey();};X509.getPublicKeyFromCertPEM = function (b) {var a = new X509();a.readCertPEM(b);return a.getPublicKey();};X509.getPublicKeyInfoPropOfCertPEM = function (c) {var e = ASN1HEX;var g = e.getVbyList;var b = {};var a, f, d;b.algparam = null;a = new X509();a.readCertPEM(c);f = a.getPublicKeyHex();b.keyhex = g(f, 0, [1], "03").substr(2);b.algoid = g(f, 0, [0, 0], "06");if (b.algoid === "2a8648ce3d0201") {b.algparam = g(f, 0, [0, 1], "06");}return b;};X509.KEYUSAGE_NAME = ["digitalSignature", "nonRepudiation", "keyEncipherment", "dataEncipherment", "keyAgreement", "keyCertSign", "cRLSign", "encipherOnly", "decipherOnly"];
var X509CRL = function X509CRL(e) {var a = KJUR,f = a.lang.String.isHex,m = ASN1HEX,k = m.getV,b = m.getTLV,h = m.getVbyList,c = m.getTLVbyList,d = m.getTLVbyListEx,i = m.getIdxbyList,g = m.getIdxbyListEx,l = m.getChildIdx,j = new X509();this.hex = null;this.posSigAlg = null;this.posRevCert = null;this._setPos = function () {var o = i(this.hex, 0, [0, 0]);var n = this.hex.substr(o, 2);if (n == "02") {this.posSigAlg = 1;} else {if (n == "30") {this.posSigAlg = 0;} else {throw new Error("malformed 1st item of TBSCertList: " + n);}}var s = i(this.hex, 0, [0, this.posSigAlg + 3]);var r = this.hex.substr(s, 2);if (r == "17" || r == "18") {var q, p;q = i(this.hex, 0, [0, this.posSigAlg + 4]);this.posRevCert = null;if (q != -1) {p = this.hex.substr(q, 2);if (p == "30") {this.posRevCert = this.posSigAlg + 4;}}} else {if (r == "30") {this.posRevCert = this.posSigAlg + 3;} else {if (r == "a0") {this.posRevCert = null;} else {throw new Error("malformed nextUpdate or revCert tag: " + r);}}}};this.getVersion = function () {if (this.posSigAlg == 0) {return null;}return parseInt(h(this.hex, 0, [0, 0], "02"), 16) + 1;};this.getSignatureAlgorithmField = function () {var n = c(this.hex, 0, [0, this.posSigAlg], "30");return j.getAlgorithmIdentifierName(n);};this.getIssuer = function () {var n = c(this.hex, 0, [0, this.posSigAlg + 1], "30");return j.getX500Name(n);};this.getThisUpdate = function () {var n = h(this.hex, 0, [0, this.posSigAlg + 2]);return result = hextorstr(n);};this.getNextUpdate = function () {var o = i(this.hex, 0, [0, this.posSigAlg + 3]);var n = this.hex.substr(o, 2);if (n != "17" && n != "18") {return null;}return hextorstr(k(this.hex, o));};this.getRevCertArray = function () {if (this.posRevCert == null) {return null;}var o = [];var n = i(this.hex, 0, [0, this.posRevCert]);var p = l(this.hex, n);for (var q = 0; q < p.length; q++) {var r = b(this.hex, p[q]);o.push(this.getRevCert(r));}return o;};this.getRevCert = function (p) {var o = {};var n = l(p, 0);o.sn = { hex: h(p, 0, [0], "02") };o.date = hextorstr(h(p, 0, [1]));if (n.length == 3) {o.ext = j.getExtParamArray(c(p, 0, [2]));}return o;};this.getSignatureValueHex = function () {return h(this.hex, 0, [2], "03", true);};this.verifySignature = function (o) {var p = this.getSignatureAlgorithmField();var n = this.getSignatureValueHex();var q = c(this.hex, 0, [0], "30");var r = new KJUR.crypto.Signature({ alg: p });r.init(o);r.updateHex(q);return r.verify(n);};this.getParam = function () {var n = {};var p = this.getVersion();if (p != null) {n.version = p;}n.sigalg = this.getSignatureAlgorithmField();n.issuer = this.getIssuer();n.thisupdate = this.getThisUpdate();var q = this.getNextUpdate();if (q != null) {n.nextupdate = q;}var s = this.getRevCertArray();if (s != null) {n.revcert = s;}var r = g(this.hex, 0, [0, "[0]"]);if (r != -1) {var o = d(this.hex, 0, [0, "[0]", 0]);n.ext = j.getExtParamArray(o);}n.sighex = this.getSignatureValueHex();return n;};if (typeof e == "string") {if (f(e)) {this.hex = e;} else {if (e.match(/-----BEGIN X509 CRL/)) {this.hex = pemtohex(e);}}this._setPos();}};
if (typeof KJUR == "undefined" || !KJUR) {KJUR = {};}if (typeof KJUR.jws == "undefined" || !KJUR.jws) {KJUR.jws = {};}KJUR.jws.JWS = function () {var b = KJUR,a = b.jws.JWS,c = a.isSafeJSONString;this.parseJWS = function (g, j) {if (this.parsedJWS !== undefined && (j || this.parsedJWS.sigvalH !== undefined)) {return;}var i = g.match(/^([^.]+)\.([^.]+)\.([^.]+)$/);if (i == null) {throw "JWS signature is not a form of 'Head.Payload.SigValue'.";}var k = i[1];var e = i[2];var l = i[3];var n = k + "." + e;this.parsedJWS = {};this.parsedJWS.headB64U = k;this.parsedJWS.payloadB64U = e;this.parsedJWS.sigvalB64U = l;this.parsedJWS.si = n;if (!j) {var h = b64utohex(l);var f = parseBigInt(h, 16);this.parsedJWS.sigvalH = h;this.parsedJWS.sigvalBI = f;}var d = b64utoutf8(k);var m = b64utoutf8(e);this.parsedJWS.headS = d;this.parsedJWS.payloadS = m;if (!c(d, this.parsedJWS, "headP")) {throw "malformed JSON string for JWS Head: " + d;}};};KJUR.jws.JWS.sign = function (j, w, z, A, a) {var x = KJUR,n = x.jws,r = n.JWS,h = r.readSafeJSONString,q = r.isSafeJSONString,d = x.crypto,l = d.ECDSA,p = d.Mac,c = d.Signature,u = JSON;var t, k, o;if (typeof w != "string" && typeof w != "object") {throw "spHeader must be JSON string or object: " + w;}if (typeof w == "object") {k = w;t = u.stringify(k);}if (typeof w == "string") {t = w;if (!q(t)) {throw "JWS Head is not safe JSON string: " + t;}k = h(t);}o = z;if (typeof z == "object") {o = u.stringify(z);}if ((j == "" || j == null) && k.alg !== undefined) {j = k.alg;}if (j != "" && j != null && k.alg === undefined) {k.alg = j;t = u.stringify(k);}if (j !== k.alg) {throw "alg and sHeader.alg doesn't match: " + j + "!=" + k.alg;}var s = null;if (r.jwsalg2sigalg[j] === undefined) {throw "unsupported alg name: " + j;} else {s = r.jwsalg2sigalg[j];}var e = utf8tob64u(t);var m = utf8tob64u(o);var b = e + "." + m;var y = "";if (s.substr(0, 4) == "Hmac") {if (A === undefined) {throw "mac key shall be specified for HS* alg";}var i = new p({ alg: s, prov: "cryptojs", pass: A });i.updateString(b);y = i.doFinal();} else {if (s.indexOf("withECDSA") != -1) {var f = new c({ alg: s });f.init(A, a);f.updateString(b);var g = f.sign();y = KJUR.crypto.ECDSA.asn1SigToConcatSig(g);} else {if (s != "none") {var f = new c({ alg: s });f.init(A, a);f.updateString(b);y = f.sign();}}}var v = hextob64u(y);return b + "." + v;};KJUR.jws.JWS.verify = function (w, B, n) {var x = KJUR,q = x.jws,t = q.JWS,i = t.readSafeJSONString,e = x.crypto,p = e.ECDSA,s = e.Mac,d = e.Signature,m;if (typeof RSAKey !== undefined) {m = RSAKey;}var y = w.split(".");if (y.length !== 3) {return false;}var f = y[0];var r = y[1];var c = f + "." + r;var A = b64utohex(y[2]);var l = i(b64utoutf8(y[0]));var k = null;var z = null;if (l.alg === undefined) {throw "algorithm not specified in header";} else {k = l.alg;z = k.substr(0, 2);}if (n != null && Object.prototype.toString.call(n) === "[object Array]" && n.length > 0) {var b = ":" + n.join(":") + ":";if (b.indexOf(":" + k + ":") == -1) {throw "algorithm '" + k + "' not accepted in the list";}}if (k != "none" && B === null) {throw "key shall be specified to verify.";}if (typeof B == "string" && B.indexOf("-----BEGIN ") != -1) {B = KEYUTIL.getKey(B);}if (z == "RS" || z == "PS") {if (!(B instanceof m)) {throw "key shall be a RSAKey obj for RS* and PS* algs";}}if (z == "ES") {if (!(B instanceof p)) {throw "key shall be a ECDSA obj for ES* algs";}}if (k == "none") {}var u = null;if (t.jwsalg2sigalg[l.alg] === undefined) {throw "unsupported alg name: " + k;} else {u = t.jwsalg2sigalg[k];}if (u == "none") {throw "not supported";} else {if (u.substr(0, 4) == "Hmac") {var o = null;if (B === undefined) {throw "hexadecimal key shall be specified for HMAC";}var j = new s({ alg: u, pass: B });j.updateString(c);o = j.doFinal();return A == o;} else {if (u.indexOf("withECDSA") != -1) {var h = null;try {h = p.concatSigToASN1Sig(A);} catch (v) {return false;}var g = new d({ alg: u });g.init(B);g.updateString(c);return g.verify(h);} else {var g = new d({ alg: u });g.init(B);g.updateString(c);return g.verify(A);}}}};KJUR.jws.JWS.parse = function (g) {var c = g.split(".");var b = {};var f, e, d;if (c.length != 2 && c.length != 3) {throw "malformed sJWS: wrong number of '.' splitted elements";}f = c[0];e = c[1];if (c.length == 3) {d = c[2];}b.headerObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(f));b.payloadObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(e));b.headerPP = JSON.stringify(b.headerObj, null, "  ");if (b.payloadObj == null) {b.payloadPP = b64utoutf8(e);} else {b.payloadPP = JSON.stringify(b.payloadObj, null, "  ");}if (d !== undefined) {b.sigHex = b64utohex(d);}return b;};KJUR.jws.JWS.verifyJWT = function (e, l, r) {var d = KJUR,j = d.jws,o = j.JWS,n = o.readSafeJSONString,p = o.inArray,f = o.includedArray;var k = e.split(".");var c = k[0];var i = k[1];var q = c + "." + i;var m = b64utohex(k[2]);var h = n(b64utoutf8(c));var g = n(b64utoutf8(i));if (h.alg === undefined) {return false;}if (r.alg === undefined) {throw "acceptField.alg shall be specified";}if (!p(h.alg, r.alg)) {return false;}if (g.iss !== undefined && typeof r.iss === "object") {if (!p(g.iss, r.iss)) {return false;}}if (g.sub !== undefined && typeof r.sub === "object") {if (!p(g.sub, r.sub)) {return false;}}if (g.aud !== undefined && typeof r.aud === "object") {if (typeof g.aud == "string") {if (!p(g.aud, r.aud)) {return false;}} else {if (typeof g.aud == "object") {if (!f(g.aud, r.aud)) {return false;}}}}var b = j.IntDate.getNow();if (r.verifyAt !== undefined && typeof r.verifyAt === "number") {b = r.verifyAt;}if (r.gracePeriod === undefined || typeof r.gracePeriod !== "number") {r.gracePeriod = 0;}if (g.exp !== undefined && typeof g.exp == "number") {if (g.exp + r.gracePeriod < b) {return false;}}if (g.nbf !== undefined && typeof g.nbf == "number") {if (b < g.nbf - r.gracePeriod) {return false;}}if (g.iat !== undefined && typeof g.iat == "number") {if (b < g.iat - r.gracePeriod) {return false;}}if (g.jti !== undefined && r.jti !== undefined) {if (g.jti !== r.jti) {return false;}}if (!o.verify(e, l, r.alg)) {return false;}return true;};KJUR.jws.JWS.includedArray = function (b, a) {var c = KJUR.jws.JWS.inArray;if (b === null) {return false;}if (typeof b !== "object") {return false;}if (typeof b.length !== "number") {return false;}for (var d = 0; d < b.length; d++) {if (!c(b[d], a)) {return false;}}return true;};KJUR.jws.JWS.inArray = function (d, b) {if (b === null) {return false;}if (typeof b !== "object") {return false;}if (typeof b.length !== "number") {return false;}for (var c = 0; c < b.length; c++) {if (b[c] == d) {return true;}}return false;};KJUR.jws.JWS.jwsalg2sigalg = { HS256: "HmacSHA256", HS384: "HmacSHA384", HS512: "HmacSHA512", RS256: "SHA256withRSA", RS384: "SHA384withRSA", RS512: "SHA512withRSA", ES256: "SHA256withECDSA", ES384: "SHA384withECDSA", PS256: "SHA256withRSAandMGF1", PS384: "SHA384withRSAandMGF1", PS512: "SHA512withRSAandMGF1", none: "none" };KJUR.jws.JWS.isSafeJSONString = function (c, b, d) {var e = null;try {e = jsonParse(c);if (typeof e != "object") {return 0;}if (e.constructor === Array) {return 0;}if (b) {b[d] = e;}return 1;} catch (a) {return 0;}};KJUR.jws.JWS.readSafeJSONString = function (b) {var c = null;try {c = jsonParse(b);if (typeof c != "object") {return null;}if (c.constructor === Array) {return null;}return c;} catch (a) {return null;}};KJUR.jws.JWS.getEncodedSignatureValueFromJWS = function (b) {var a = b.match(/^[^.]+\.[^.]+\.([^.]+)$/);if (a == null) {throw "JWS signature is not a form of 'Head.Payload.SigValue'.";}return a[1];};KJUR.jws.JWS.getJWKthumbprint = function (d) {if (d.kty !== "RSA" && d.kty !== "EC" && d.kty !== "oct") {throw "unsupported algorithm for JWK Thumprint";}var a = "{";if (d.kty === "RSA") {if (typeof d.n != "string" || typeof d.e != "string") {throw "wrong n and e value for RSA key";}a += '"e":"' + d.e + '",';a += '"kty":"' + d.kty + '",';a += '"n":"' + d.n + '"}';} else {if (d.kty === "EC") {if (typeof d.crv != "string" || typeof d.x != "string" || typeof d.y != "string") {throw "wrong crv, x and y value for EC key";}a += '"crv":"' + d.crv + '",';a += '"kty":"' + d.kty + '",';a += '"x":"' + d.x + '",';a += '"y":"' + d.y + '"}';} else {if (d.kty === "oct") {if (typeof d.k != "string") {throw "wrong k value for oct(symmetric) key";}a += '"kty":"' + d.kty + '",';a += '"k":"' + d.k + '"}';}}}var b = rstrtohex(a);var c = KJUR.crypto.Util.hashHex(b, "sha256");var e = hextob64u(c);return e;};KJUR.jws.IntDate = {};KJUR.jws.IntDate.get = function (c) {var b = KJUR.jws.IntDate,d = b.getNow,a = b.getZulu;if (c == "now") {return d();} else {if (c == "now + 1hour") {return d() + 60 * 60;} else {if (c == "now + 1day") {return d() + 60 * 60 * 24;} else {if (c == "now + 1month") {return d() + 60 * 60 * 24 * 30;} else {if (c == "now + 1year") {return d() + 60 * 60 * 24 * 365;} else {if (c.match(/Z$/)) {return a(c);} else {if (c.match(/^[0-9]+$/)) {return parseInt(c);}}}}}}}throw "unsupported format: " + c;};KJUR.jws.IntDate.getZulu = function (a) {return zulutosec(a);};KJUR.jws.IntDate.getNow = function () {var a = ~~(new Date() / 1000);return a;};KJUR.jws.IntDate.intDate2UTCString = function (a) {var b = new Date(a * 1000);return b.toUTCString();};KJUR.jws.IntDate.intDate2Zulu = function (e) {var i = new Date(e * 1000),h = ("0000" + i.getUTCFullYear()).slice(-4),g = ("00" + (i.getUTCMonth() + 1)).slice(-2),b = ("00" + i.getUTCDate()).slice(-2),a = ("00" + i.getUTCHours()).slice(-2),c = ("00" + i.getUTCMinutes()).slice(-2),f = ("00" + i.getUTCSeconds()).slice(-2);return h + g + b + a + c + f + "Z";};
if (typeof KJUR == "undefined" || !KJUR) {KJUR = {};}if (typeof KJUR.jws == "undefined" || !KJUR.jws) {KJUR.jws = {};}KJUR.jws.JWSJS = function () {var c = KJUR,b = c.jws,a = b.JWS,d = a.readSafeJSONString;this.aHeader = [];this.sPayload = "";this.aSignature = [];this.init = function () {this.aHeader = [];this.sPayload = undefined;this.aSignature = [];};this.initWithJWS = function (f) {this.init();var e = f.split(".");if (e.length != 3) {throw "malformed input JWS";}this.aHeader.push(e[0]);this.sPayload = e[1];this.aSignature.push(e[2]);};this.addSignature = function (e, h, m, k) {if (this.sPayload === undefined || this.sPayload === null) {throw "there's no JSON-JS signature to add.";}var l = this.aHeader.length;if (this.aHeader.length != this.aSignature.length) {throw "aHeader.length != aSignature.length";}try {var f = KJUR.jws.JWS.sign(e, h, this.sPayload, m, k);var j = f.split(".");var n = j[0];var g = j[2];this.aHeader.push(j[0]);this.aSignature.push(j[2]);} catch (i) {if (this.aHeader.length > l) {this.aHeader.pop();}if (this.aSignature.length > l) {this.aSignature.pop();}throw "addSignature failed: " + i;}};this.verifyAll = function (h) {if (this.aHeader.length !== h.length || this.aSignature.length !== h.length) {return false;}for (var g = 0; g < h.length; g++) {var f = h[g];if (f.length !== 2) {return false;}var e = this.verifyNth(g, f[0], f[1]);if (e === false) {return false;}}return true;};this.verifyNth = function (f, j, g) {if (this.aHeader.length <= f || this.aSignature.length <= f) {return false;}var h = this.aHeader[f];var k = this.aSignature[f];var l = h + "." + this.sPayload + "." + k;var e = false;try {e = a.verify(l, j, g);} catch (i) {return false;}return e;};this.readJWSJS = function (g) {if (typeof g === "string") {var f = d(g);if (f == null) {throw "argument is not safe JSON object string";}this.aHeader = f.headers;this.sPayload = f.payload;this.aSignature = f.signatures;} else {try {if (g.headers.length > 0) {this.aHeader = g.headers;} else {throw "malformed header";}if (typeof g.payload === "string") {this.sPayload = g.payload;} else {throw "malformed signatures";}if (g.signatures.length > 0) {this.aSignature = g.signatures;} else {throw "malformed signatures";}} catch (e) {throw "malformed JWS-JS JSON object: " + e;}}};this.getJSON = function () {return { headers: this.aHeader, payload: this.sPayload, signatures: this.aSignature };};this.isEmpty = function () {if (this.aHeader.length == 0) {return 1;}return 0;};};
exports.SecureRandom = SecureRandom;
exports.rng_seed_time = rng_seed_time;

exports.BigInteger = BigInteger;
exports.RSAKey = RSAKey;
exports.ECDSA = KJUR.crypto.ECDSA;
exports.DSA = KJUR.crypto.DSA;
exports.Signature = KJUR.crypto.Signature;
exports.MessageDigest = KJUR.crypto.MessageDigest;
exports.Mac = KJUR.crypto.Mac;
exports.Cipher = KJUR.crypto.Cipher;
exports.KEYUTIL = KEYUTIL;
exports.ASN1HEX = ASN1HEX;
exports.X509 = X509;
exports.X509CRL = X509CRL;
exports.CryptoJS = CryptoJS;

// ext/base64.js
exports.b64tohex = b64tohex;
exports.b64toBA = b64toBA;

// ext/ec*.js
exports.ECFieldElementFp = ECFieldElementFp;
exports.ECPointFp = ECPointFp;
exports.ECCurveFp = ECCurveFp;

// base64x.js
exports.stoBA = stoBA;
exports.BAtos = BAtos;
exports.BAtohex = BAtohex;
exports.stohex = stohex;
exports.stob64 = stob64;
exports.stob64u = stob64u;
exports.b64utos = b64utos;
exports.b64tob64u = b64tob64u;
exports.b64utob64 = b64utob64;
exports.hex2b64 = hex2b64;
exports.hextob64u = hextob64u;
exports.b64utohex = b64utohex;
exports.utf8tob64u = utf8tob64u;
exports.b64utoutf8 = b64utoutf8;
exports.utf8tob64 = utf8tob64;
exports.b64toutf8 = b64toutf8;
exports.utf8tohex = utf8tohex;
exports.hextoutf8 = hextoutf8;
exports.hextorstr = hextorstr;
exports.rstrtohex = rstrtohex;
exports.hextob64 = hextob64;
exports.hextob64nl = hextob64nl;
exports.b64nltohex = b64nltohex;
exports.hextopem = hextopem;
exports.pemtohex = pemtohex;
exports.hextoArrayBuffer = hextoArrayBuffer;
exports.ArrayBuffertohex = ArrayBuffertohex;
exports.zulutomsec = zulutomsec;
exports.zulutosec = zulutosec;
exports.zulutodate = zulutodate;
exports.datetozulu = datetozulu;
exports.uricmptohex = uricmptohex;
exports.hextouricmp = hextouricmp;
exports.ipv6tohex = ipv6tohex;
exports.hextoipv6 = hextoipv6;
exports.hextoip = hextoip;
exports.iptohex = iptohex;
exports.encodeURIComponentAll = encodeURIComponentAll;
exports.newline_toUnix = newline_toUnix;
exports.newline_toDos = newline_toDos;
exports.hextoposhex = hextoposhex;
exports.intarystrtohex = intarystrtohex;
exports.strdiffidx = strdiffidx;
exports.oidtohex = oidtohex;
exports.hextooid = hextooid;
exports.strpad = strpad;
exports.bitstrtoint = bitstrtoint;
exports.inttobitstr = inttobitstr;

// name spaces
exports.KJUR = KJUR;
exports.crypto = KJUR.crypto;
exports.asn1 = KJUR.asn1;
exports.jws = KJUR.jws;
exports.lang = KJUR.lang;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/buffer/index.js */ 48).Buffer))

/***/ }),

/***/ 48:
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ 49)
var ieee754 = __webpack_require__(/*! ieee754 */ 50)
var isArray = __webpack_require__(/*! isarray */ 51)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 49:
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 50:
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 51:
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map