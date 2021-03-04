function patchListeners() {
  window.listeners = [];
  const orig = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(...args) {
    if (this instanceof HTMLElement) {
      if (window.DEBUG_LISTENERS) {
        const origcb = args[1];
        args[1] = function(...args) {
          console.log(args);
          return origcb.apply(this, args)
        }
      }
      
      window.listeners.push({
        type: args[0],
        fn: args[1],
        target: this,
      });
      
    }
    return orig.apply(this, args);
  };
}
