<template>
  <div id="app">
    <ImageVisualizer/>
  </div>
</template>

<script>
import ImageVisualizer from './components/ImageVisualizer.vue'

export default {
  name: 'app',
  components: {
    ImageVisualizer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
