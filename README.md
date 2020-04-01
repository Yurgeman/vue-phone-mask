# vue-phone-mask

## Vue directive for masking input phone numbers
* simple syntax: british number +44(8-10)XXX-XXX-XX-XX is written as `+44(8-10)___-___-_ _-__`
* works on simple and nested inputs
* when updating value without input, the mask will enter a new value

## Install in your projects
```
npm i --save-dev vue-phone-mask
```

## Usage

### Local
```vue
<SomeComponent v-phone-mask="'+7(___)___-__-__'"/>
...
<script>
import PhoneMask from 'vue-phone-mask';

...
    directives: {
        'phone-mask': PhoneMask
    },
</script>
```

### Global
```vue
<script>
import PhoneMask from 'vue-phone-mask';
Vue.directive('phone-mask', PhoneMask);
</script>
```
