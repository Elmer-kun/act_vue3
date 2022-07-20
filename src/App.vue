<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to My BPMN.js"/>-->
  <ModelerIndex />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import ModelerIndex from "@/modeler/ModelerIndex";

export default {
  name: 'App',
  components: {
    ModelerIndex
    // HelloWorld
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
