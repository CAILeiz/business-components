type EventHandler<T = any> = (payload: T) => void;

export default class EventBus {
  private events: Record<string, EventHandler[]> = {};

  /**
   * 订阅事件
   * @param eventName 事件名称
   * @param handler 事件处理函数
   */
  on<T = any>(eventName: string, handler: EventHandler<T>): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(handler);
  }

  /**
   * 取消订阅事件
   * @param eventName 事件名称
   * @param handler 事件处理函数（可选）
   */
  off<T = any>(eventName: string, handler?: EventHandler<T>): void {
    if (!this.events[eventName]) return;

    if (handler) {
      this.events[eventName] = this.events[eventName].filter(
        (h) => h !== handler
      );
    } else {
      delete this.events[eventName];
    }
  }

  /**
   * 触发事件
   * @param eventName 事件名称
   * @param payload 事件数据
   */
  emit<T = any>(eventName: string, payload?: T): void {
    if (!this.events[eventName]) return;

    this.events[eventName].forEach((handler) => {
      handler(payload);
    });
  }

  /**
   * 一次性订阅事件
   * @param eventName 事件名称
   * @param handler 事件处理函数
   */
  once<T = any>(eventName: string, handler: EventHandler<T>): void {
    const onceHandler: EventHandler<T> = (payload) => {
      handler(payload);
      this.off(eventName, onceHandler);
    };
    this.on(eventName, onceHandler);
  }

  /**
   * 清除所有事件
   */
  clear(): void {
    this.events = {};
  }
}
