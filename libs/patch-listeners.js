function patchListeners() {
  window.listeners = [];
  const orig = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(...args) {
    if (this instanceof HTMLElement) {
      
      let callback = args[1];
      if (window.DEBUG_LISTENERS) {
        const origcb = args[1];
        callback = function(...args) {
          console.log(args);
          return origcb.apply(this, args)
        }
      }
      
      window.listeners.push({
        type: args[0],
        fn: callback,
        target: this,
      });
      
    }
    return orig.apply(this, args);
  };
}
