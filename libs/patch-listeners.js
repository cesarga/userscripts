function patchListeners() {
  window.listeners = [];
  const orig = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(...args) {
    if (this instanceof HTMLElement) {
      const data = {
        type: args[0],
        fn: args[1],
        target: this,
      };
      if (window.DEBUG_LISTENERS) {
        origfn = data.fn;
        data.fn = function(...args) {
          console.log(data);
          return origfn.apply(this, args)
        }
      }
      window.listeners.push(data);
    }
    return orig.apply(this, args);
  };
}
