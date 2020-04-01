<template>
<div id="app">
  <p>
    <label>mask '+44(8-10)___-___-__-__':</label>
    <input v-phone-mask="'+44(8-10)___-___-__-__'">
  </p>
  
  <p>
    <strong>On nested in component input</strong><br>
    <code>NestedInput v-phone-mask="'+7(___)___-__-__'"/</code>
  </p>
  <strong>His struct</strong>
  <pre>
div
  div
    p
      label/
    /p
    input
  /div
/div
  </pre>
  <NestedInput v-phone-mask="'+7(___)___-__-__'"/>
</div>
</template>

<script>
import PhoneMask from '@/vue-phone-mask';
import NestedInput from '@/components/NestedInput';

export default {
  name: 'App',
  components: {
    NestedInput
  },
  directives: {
    'phone-mask': PhoneMask
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
