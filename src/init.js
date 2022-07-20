import { initState } from "./state"

export function initMixin(Vue) { // 给Vue增加init方法
  Vue.prototype._init = function (options) { // 用于初始化操作
    
    const vm = this
    // vue vm.$options 就是获取用户的配置
    // 以 $ 开头的都认为是 Vue 自身的属性
    vm.$options = options   // 将用户的选项挂载到实例上

    // 初始化状态
    initState(vm)
  }  
}