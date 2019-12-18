// import Vue from 'vue'
import {formatComponentName, getDevices} from './util'

let userData = sessionStorage.getItem('userData') ? JSON.parse(decodeURIComponent(sessionStorage.getItem('userData'))) : {}
// 基础上报信息
let baseInfo = {
    timeStamp: Date.now(),
    pageUrl: window.location.href,
    appId: 3,
    projectName: '管理平台',
    logType: 0,
    userId: userData.userId || 'unknown',
    device: getDevices()
}

/**
 * 错误上报初始化
 */
const initErrorReport = () => {
    // Vue.config.errorHandler = vueErrorHandler; // vue 项目
    window.onerror = windowErrorHandler; // 只处理js事件，对静态资源加载失败无效
    window.addEventListener('unhandledrejection', promiseErrorHandler)
    // window.addEventListener('error', listenerErrorHandler, true) //true：捕获阶段调用，会在元素的onerror前调用,在window.addEventListener('error')后调用
    // axios.interceptors.response.use(null,axiosErrorHandler); //并到promise
}


/**
 * window onerror
 * @param {string} errorMsg 错误信息
 * @param {string} codeSourceUrl 发生错误的脚本
 * @param {number} lineNo 发生错误的行号
 * @param {number} columnNo 发生错误的列号
 * @param {object} error Error对象
 */
function windowErrorHandler(errorMsg, codeSourceUrl, lineNo, columnNo, error) {
    const string = errorMsg.toLowerCase()
    const substring = 'script error'
    let errReport
    if (string.indexOf(substring) > -1) {
        errReport = { message: 'Script Error: See Browser Console for Detail' }
    } else {
        errReport = {
            errSourceType: 'window.onerror',
            errorMsg,
            codeSourceUrl,
            lineNo,
            columnNo
            // error
        }
    }
    // console.log('window onError',errReport);
    sendErrorMsg(errReport)
    return false
}

/**
 * 未处理的Promise错误
 * @param err
 */
function promiseErrorHandler(err) {
    const errReport = {
        errSourceType: 'unhandledrejection:promise error',
        errorMsg: err.reason
    }
    // 如有未catch的业务逻辑错误,在此过滤
    sendErrorMsg(errReport)
    // e.preventDefault(); // 控制台不展示报错
}

/**
 * axios
 * @param err
 * @returns {Promise<never>}
 */
function axiosErrorHandler(err) {
    console.log(err.message)
    return Promise.reject(err)
}

/**
 * 资源加载错误，js错误
 * @param err
 */
function listenerErrorHandler(err) {
    console.log('window listener error', err);
    const errReport = {
        errSourceType: 'window listener error',
        errorMsg: err.message,
        codeSourceUrl: err.filename,
        lineNo: err.lineno,
        columnNo: err.colno
    }
    sendErrorMsg(errReport)
    // err.preventDefault() // 控制台不展示报错信息
}

/**
* vue err
* @param err 错误信息
* @param vm vue实例
* @param info vue特定错误信息（错误所在钩子等）
*/
function vueErrorHandler(err, vm, info) {
    const errReport = {
        errSourceType: 'vueErrorHandler',
        errorMsg: err.message, // 错误信息
        componentName: formatComponentName(vm), // 组件名字,位置,
        vueInfo: info
    }
    // console.log('vue error',errReport);
    sendErrorMsg(errReport)
}