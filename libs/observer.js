function observe(selector, callback) {
  // Select the node that will be observed for mutations
  const targetNode = document.querySelector(selector);

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const _callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(const mutation of mutationsList) {
      if (mutation.type === 'childList'){
        callback()
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(_callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
}
