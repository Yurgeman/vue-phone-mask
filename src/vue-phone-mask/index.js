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
    } else if (el.value &&
        vnode.data.domProps.value !== oldVnode.data.domProps.value) {
      // emulation event 'beforeinput'
      let bi = new Event('beforeinput');
      bi.inputType = 'insertFromPaste';
      bi.data = el.value;
      el.value = '';
      el.dispatchEvent(bi);
    }
  }
}
