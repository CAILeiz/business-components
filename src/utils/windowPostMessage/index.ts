type MessageHandler<T> = (event: MessageEvent<T>) => void;

export default class WindowPostMessage<T = any> {
  private targetOrigin: string;
  private messageHandler?: MessageHandler<T>;

  constructor(targetOrigin: string = "*") {
    this.targetOrigin = targetOrigin;
  }

  /**
   * 发送消息
   * @param message 要发送的消息
   * @param targetWindow 目标窗口，默认为当前窗口的父窗口
   */
  postMessage(message: T, targetWindow: Window = window.parent): void {
    targetWindow.postMessage(message, this.targetOrigin);
  }

  /**
   * 注册消息监听器
   * @param handler 消息处理函数
   */
  addMessageListener(handler: MessageHandler<T>): void {
    this.messageHandler = handler;
    window.addEventListener("message", this.messageHandler);
  }

  /**
   * 移除消息监听器
   */
  removeMessageListener(): void {
    if (this.messageHandler) {
      window.removeEventListener("message", this.messageHandler);
      this.messageHandler = undefined;
    }
  }

  /**
   * 销毁实例，移除监听器
   */
  destroy(): void {
    this.removeMessageListener();
  }
}

// 实例化
const windowPostMessage = new WindowPostMessage<string>();

// 发送消息
windowPostMessage.postMessage("Hello from iframe!");

// 注册消息监听器
windowPostMessage.addMessageListener((event) => {
  console.log("Received message:", event.data);
});

// 移除消息监听器
windowPostMessage.removeMessageListener();

// 销毁实例
windowPostMessage.destroy();
