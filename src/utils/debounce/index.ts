export default function debounce<T extends (...args: any[]) => any>(
  func: T, // 需要防抖的函数
  wait: number, // 等待时间（毫秒）
  immediate: boolean = false // 是否立即执行
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}

function logText(text: string) {
  console.log("hello text!", text);
}

const debouncedResize = debounce(logText, 300);

debouncedResize("hello1");
debouncedResize("hello2");
debouncedResize("hello3");
debouncedResize("hello4");
