import PhoneMask from './PhoneMask';

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
    let phoneMask = new PhoneMask(el, binding.value);
    phoneMask.hangMask();
    el.dataset.phoneMask = binding.value;
  },
  componentUpdated(el, binding, vnode, oldVnode) {
    el = checkTag(el);
    if (binding.value !== el.dataset.phoneMask) {
      let phoneMask = new PhoneMask(el, binding.value);
      phoneMask.hangMask();
      el.dataset.phoneMask = binding.value;
    } else {
      let objectProps = vnode.data.domProps ? 'domProps' : 'props';
      try {
        if (!vnode.data[objectProps].value || vnode.data[objectProps].value ===
            oldVnode.data[objectProps].value) {
          return;
        }
      } catch (TypeError) {
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
      vnode.data[objectProps].value = '';
      el.dispatchEvent(beforeInputEvent);
      
    }
  }
}
