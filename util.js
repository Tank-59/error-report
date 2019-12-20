/**
 * 获取组件名字 位置-VUE
 * @param vm
 * @returns {string}
 */
export const formatComponentName = (vm) => {
  if (vm.$root === vm) return 'root'
  let name = vm._isVue
    ? (vm.$options && vm.$options.name) ||
    (vm.$options && vm.$options._componentTag)
    : vm.name
  return (
    (name ? 'component <' + name + '>' : 'anonymous component') +
    (vm._isVue && vm.$options && vm.$options.__file
      ? ' at ' + (vm.$options && vm.$options.__file)
      : '')
  )
}

// 设备信息 Android iOS PC, 可通过后端日志处理不需要前端上报
export const getDevices = () => {
  const ua = navigator.userAgent
  let isIPad = false
  let isIPod = false

  if (ua.match(/(Android)\s+([\d.]+)/i)) {
    return 'Android'
  }
  if (ua.match(/(iPad).*OS\s([\d_]+)/i)) {
    isIPad = true
    return 'iPad'
  }
  if (ua.match(/(iPod).*OS\s([\d_]+)/i)) {
    isIPod = true
    return 'iPod'
  }
  if (!isIPad && !isIPod && ua.match(/(iPhone\sOS)\s([\d_]+)/i)) {
    return getIOSVersion() ? `iPhone iOS${getIOSVersion()}` : 'iPhone'
  }
  return 'PC'
}

// ios版本
export const getIOSVersion = () => {
  const info = window.navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/)
  return info && info[1] ? info[1].replace(/_/g, '.') : ''
}

// 防抖
export const debounce = (func, wait, immediate) => {
  var timeout;
  return function () {
      var context = this;
      var args = arguments;
      if (timeout) clearTimeout(timeout);
      if (immediate) {
          var callNow = !timeout;
          timeout = setTimeout(function () {
              timeout = null;
          }, wait)
          if (callNow) func.apply(context, args)
      }
      else {
          timeout = setTimeout(function () {
              func.apply(context, args)
          }, wait);
      }
  }
}