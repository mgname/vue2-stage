(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

      // Object.defineProperty 只能劫持已经存在的属性，后增的，或者删除的 不知道（vue2为此单独写api：$set、$delete）
      this.walk(data);
    }

    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        // 循环对象，对属性依次劫持
        // "重新定义"属性（性能差）
        Object.keys(data).forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(target, key, value) {
    // 属性劫持
    observe(value); // 对所有的对象都进行属性劫持

    Object.defineProperty(target, key, {
      // 内部函数使用外部函数的变量（闭包，value不销毁）
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        if (newValue === value) return;
        value = newValue;
      }
    });
  }
  function observe(data) {
    // 对这个对象进行劫持
    if (_typeof(data) !== 'object' || data === null) {
      return; // 只对对象进行劫持
    } // 如果一个对象被劫持过了，就不需要再被劫持了（要判断一个对象是否被劫持过，可以增添一个实例，用实例来判断是否被劫持过）


    return new Observer(data);
  }

  function initState(vm) {
    var opts = vm.$options; // 获取所有的选项
    // if (opts.props) {
    //   initProps()
    // }

    if (opts.data) {
      initData(vm);
    }
  }

  function proxy(vm, target, key) {
    Object.defineProperty(vm, key, {
      // vm.name
      get: function get() {
        return vm[target][key]; // vm._data.name
      },
      set: function set(value) {
        vm[target][key] = value;
      }
    });
  }

  function initData(vm) {
    var data = vm.$options.data; // data可能是函数和对象

    data = typeof data === 'function' ? data.call(vm) : data;
    vm._data = data; // 对数据进行劫持 vue2 采用了api defineProperty

    observe(data); // 将vue._data 用vm来代理就可以了

    for (var key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        proxy(vm, '_data', key);
      }
    }
  }

  function initMixin(Vue) {
    // 给Vue增加init方法
    Vue.prototype._init = function (options) {
      // 用于初始化操作
      var vm = this; // vue vm.$options 就是获取用户的配置
      // 以 $ 开头的都认为是 Vue 自身的属性

      vm.$options = options; // 将用户的选项挂载到实例上
      // 初始化状态

      initState(vm);
    };
  }

  function Vue() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // options就是用户的选项
    this._init(options);
  }

  initMixin(Vue); // 扩展了init方法

  return Vue;

}));
//# sourceMappingURL=vue.js.map
