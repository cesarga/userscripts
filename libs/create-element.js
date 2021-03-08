// Element creation helper (document.createElement)
//
// createElement({
//   type: 'button',
//   styles: {
//     color: "#fff",
//     backgroundColor: "#3da6ed",
//     borderRadius: "2px",
//     border: "none",
//     outline: "none",
//     cursor: "pointer"
//   },
//   attributes: {
//     class: "p-3"
//   },
//   props: {
//     innerText: "Open links"
//   },
//   eventHandlers: {
//     click: handleButtonClick
//   },
//   parentSelector: "#torrent_table",
//   pendType: 'prepend',
// });

function createElement(options) {
  const _options = Object.assign({}, {
    type: 'div',
    styles: {},
    attributes: {},
    props: {},
    eventHandlers: {},
    parent: null,
    parentSelector: 'body',
    siblingSelector: null,
    pendType: 'append',
  }, options);

  const { type, styles, attributes, props, eventHandlers, parent, parentSelector, siblingSelector, pendType } = _options;

  let elementParent = (null === parent) ? document.querySelector(parentSelector) : parent;
  let elementSibling = (null === siblingSelector) ? null : elementParent.querySelector(siblingSelector);
  let element = document.createElement(type);

  for (let key in styles) { element.style[key] = styles[key] }
  for (let key in attributes) { element.setAttribute(key, attributes[key]) }
  for (let key in props) { element[key] = props[key] }
  for (let key in eventHandlers) { element.addEventListener(key, eventHandlers[key]) }

  switch (pendType) {
    case 'after':
    case 'before':
      if (null === elementSibling) return;

    case 'after':
      elementSibling.after(element);
      break;
    case 'before':
      elementSibling.after(element);
      break;

    case 'prepend':
      elementParent.prepend(element);
      break;
    case 'append':
    default:
      elementParent.append(element);
  }
}
