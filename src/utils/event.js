// 发布订阅类
class EventEmitter {
    _event = {}
  
    // on 函数用于绑定
    on(eventName, handle) {
      let listeners = this._event[eventName];
      if(!listeners || !listeners.length) {
        this._event[eventName] = [handle];
        return;
      }
      listeners.push(handle);
    }
    // off 用于移除
    off(eventName, handle) {
      let listeners = this._event[eventName];
      this._event[eventName] = listeners.filter(l => l !== handle);
    }
    // emit 用于分发消息
    emit(eventName, ...args) {
      const listeners = this._event[eventName];
      if(listeners && listeners.length) {
        for(const l of listeners) {
          l(...args);
        }
      }
    }
  }
  const event = new EventEmitter;
  export { event };