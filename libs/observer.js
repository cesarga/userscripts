function observe(selector, callback, attributes = false, once = false) {
  // Select the node that will be observed for mutations
  const targetNode = document.querySelector(selector);
  
  if (null === targetNode) {
    return;
  }

  // Options for the observer (which mutations to observe)
  const config = { attributes: attributes, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  var observer = null;
  const _callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(const mutation of mutationsList) {
      callback(mutation, mutationsList, observer);
    }
    
    if (once) {
      observer.disconnect();
    }
  };

  // Create an observer instance linked to the callback function
  observer = new MutationObserver(_callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
}
