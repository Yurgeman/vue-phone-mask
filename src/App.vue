<template>
<div id="app">
  <p>
    <label>mask '+44(8-10)___-___-__-__':</label>
    <input v-phone-mask="'+44(8-10)___-___-__-__'">
  </p>
  
  <p>
    <strong>On nested in component input</strong><br>
    <code>NestedInput v-phone-mask="'+7(___)___-__-__'"/</code>
    <br>
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
  </p>
  <p>
    <strong>When updating the value of the component by the parent,
      the mask will enter a new value</strong><br>
    <label>mask '+86(__)____-____':</label>
    <input
      v-phone-mask="'+86(__)____-____'"
      v-model="lateNumber"
    >
    <br>
    <span>New number: {{ lateNumber }}</span>
  </p>

  <div>
    <strong>Additional inputs</strong><br>
    <label>mask '+1(___)___-___':</label>
    <br>
    <div
      v-for="i in additionalInputs"
      :key="i"
    >
      <input
        v-phone-mask="'+1(___)___-___'"
        :value="lateNumber"
      >
    </div>
    <button @click="additionalInputs++">Add input</button>
  </div>
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
  },
  data() {
    return {
      lateNumber: '1',
      additionalInputs: 0
    };
  },
  mounted() {
    setInterval(() => {
      this.lateNumber = String(Math.random()).slice(2, 12);
    }, 2500);
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
