import PhoneMask from './PhoneMask';
export { removeNaN } from './PhoneMask';

function checkTag(el) {
  if (el.tagName !== 'INPUT') {
    let els = el.getElementsByTagName('input');
    if (els.length !== 1) {
      throw new Error('v-phone-mask directive requires 1 input, found ' +
        els.length);
    } else {
      return els[0];
    }
  }
  return el;
}

export default {
  bind(el, binding) {
    el = checkTag(el);
    new PhoneMask(el, binding.value);
  },
  componentUpdated(el, binding, vnode, oldVnode) {
    el = checkTag(el);
    if (binding.value === binding.oldValue) {
      let objectProps = vnode.data.domProps ? 'domProps' : 'props';
      try {
        // if the string is empty or the value has not changed
        if (!vnode.data[objectProps].value ||
            vnode.data[objectProps].value === oldVnode.data[objectProps].value ||
            (el.value === vnode.data[objectProps].value &&
              PhoneMask.complianceCheck(el.value, binding.value))) {
          return;
        }
      } catch (TypeError) {
        // if there is no value in the component, then skip
        return;
      }

      // update the value using an artificial event
      let beforeInputEvent = new Event('beforeinput');
      // emulation event 'beforeinput'
      beforeInputEvent.data = vnode.data[objectProps].value;
      // the most suitable
      beforeInputEvent.inputType = 'insertFromPaste';
      // if the element has a value that does not match the mask,
      // then it will not work
      setTimeout(() => {
        if (el !== document.activeElement) {
          el.selectionStart = 0;
          el.selectionEnd = vnode.data[objectProps].value.length;
        }
        el.dispatchEvent(beforeInputEvent);
      });
    } else {
      new PhoneMask(el, binding.value);
    }
  }
}
