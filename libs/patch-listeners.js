function patchListeners() {
  window.listeners = [];
  const _addEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(...args) {
    if (this instanceof HTMLElement) {
        const _callback = args[1];
        args[1] = function(...args) {
          if (window.DEBUG_LISTENERS) {
            console.log(args);
          }
          return _callback.apply(this, args);
        }
      
      window.listeners.push({
        type: args[0],
        fn: args[1],
        target: this,
      });
      
    }
    return _addEventListener.apply(this, args);
  };
}
