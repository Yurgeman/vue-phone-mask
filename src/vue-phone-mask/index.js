import PhoneMask from './PhoneMask';

export default {
  bind(el, binding) {
    if (el.tagName !== 'INPUT') {
      let els = el.getElementsByTagName('input');
      if (els.length !== 1) {
        throw new Error('v-phone-mask directive requires 1 input, found ' +
          els.length);
      } else {
        el = els[0];
      }
    }
    let phoneMask = new PhoneMask(el, binding.value);
    phoneMask.hangMask();

    if (el.value) {
      phoneMask.enter(el.value);
    }
  }
}
