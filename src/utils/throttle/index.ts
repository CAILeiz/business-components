/**
 * 节流函数：确保 func 在指定时间间隔内只执行一次
 * @param func 需要节流的函数
 * @param wait 节流时间间隔（毫秒）
 * @returns 节流后的函数
 */
export default function throttle<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T {
  let lastTime = 0;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = wait - (now - lastTime);

    if (remaining <= 0) {
      // 时间已到，立即执行
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastTime = now;
      func.apply(this, args);
    } else if (!timeout) {
      // 设置定时器，确保最后一次调用也能执行
      timeout = setTimeout(() => {
        lastTime = Date.now();
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  } as T;
}

// 原始函数
function logMessage(message: string) {
  console.log(message);
}

// 包装为节流函数（每 500ms 执行一次）
const throttledLog = throttle(logMessage, 500);

// 高频调用
throttledLog("Hello"); // 立即执行
setTimeout(() => throttledLog("World"), 200); // 被忽略
setTimeout(() => throttledLog("TS"), 600); // 执行
