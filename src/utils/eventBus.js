// 表示一个事件总线，允许组件通过事件进行通信。
// 事件总线是一个简单的发布/订阅系统，允许您在应用程序中的任何地方触发事件，并且可以在其他任何地方监听它们。
class EventBus {
    constructor() {
        this.events = {}
    }

    /**
     * 注册一个回调函数，当指定的事件被触发时执行。
     * @param {string} event - 事件的名称。
     * @param {Function} callback - 要执行的回调函数。
     */
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(callback)
    }

    /**
     * 从指定的事件中取消注册回调函数。
     * @param {string} event - 事件的名称。
     * @param {Function} callback - 要取消注册的回调函数。
     */
    off(event, callback) {
        if (!this.events[event]) {
            return
        }
        this.events[event] = this.events[event].filter((cb) => cb !== callback)
    }

    /**
     * 触发指定的事件，调用所有已注册的回调函数。
     * @param {string} event - 事件的名称。
     * @param  {...any} args - 传递给回调函数的参数。
     */
    emit(event, ...args) {
        console.log('this.events', this.events)
        if (!this.events[event]) {
            return
        }
        this.events[event].forEach((cb) => cb(...args))
    }
}

export default new EventBus()
