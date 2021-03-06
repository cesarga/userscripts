function patchListeners(options = {}) {
  options = Object.assign({}, {
    type: null,
    registerCallback: null,
    eventCallback: null,
  }, options);
  window.listeners = [];
  const _addEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(...args) {
    if (this instanceof HTMLElement) {
      if ((null === options.type) || options.type === args[0]) {
        if (null !== options.registerCallback) {
          options.registerCallback({
            target: this,
            args: args,
          });
        }

        const _callback = args[1];
        args[1] = function(...args) {
          if (window.DEBUG_LISTENERS) {
            console.log(args);
          }

          if (null !== options.eventCallback) {
            options.eventCallback(...args);
          }

          return _callback.apply(this, args);
        }

        window.listeners.push({
          type: args[0],
          fn: args[1],
          target: this,
        });
      }
    }
    return _addEventListener.apply(this, args);
  };
}
