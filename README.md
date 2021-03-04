# userscripts

```js
window.DEBUG_LISTENERS = true;
patchListeners({
  type: 'click',
  registerCallback: function (data) {
    //console.log('data',data);
    const classAttr = data.target.getAttribute('class');
    if(classAttr !== null && classAttr.includes('class-needle')) {
      console.log('data',data);
      data.args[1]();
    }
  },
});
```
