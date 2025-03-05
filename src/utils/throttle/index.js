"use strict";
exports.__esModule = true;
/**
 * 节流函数：确保 func 在指定时间间隔内只执行一次
 * @param func 需要节流的函数
 * @param wait 节流时间间隔（毫秒）
 * @returns 节流后的函数
 */
function throttle(func, wait) {
    var lastTime = 0;
    var timeout = null;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = Date.now();
        var remaining = wait - (now - lastTime);
        if (remaining <= 0) {
            // 时间已到，立即执行
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            lastTime = now;
            func.apply(this, args);
        }
        else if (!timeout) {
            // 设置定时器，确保最后一次调用也能执行
            timeout = setTimeout(function () {
                lastTime = Date.now();
                timeout = null;
                func.apply(_this, args);
            }, remaining);
        }
    };
}
exports["default"] = throttle;
// 原始函数
function logMessage(message) {
    console.log(message);
}
// 包装为节流函数（每 500ms 执行一次）
var throttledLog = throttle(logMessage, 500);
// 高频调用
throttledLog("Hello"); // 立即执行
setTimeout(function () { return throttledLog("World"); }, 200); // 被忽略
setTimeout(function () { return throttledLog("TS"); }, 600); // 执行
