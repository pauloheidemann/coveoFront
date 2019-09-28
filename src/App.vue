<template>
  <div id="app">
    <coveo/>
  </div>
</template>

<script>
import Coveo from '../src/components/Coveo.vue';
export default {
  components: {
    'coveo' : Coveo
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
</style>