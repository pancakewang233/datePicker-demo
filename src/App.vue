<template>
  <div id="app">
    <Date :temp="temp" />
  </div>
</template>

<script>
import Date from "./components/date.vue";

export default {
  name: "App",
  components: {
    Date,
  },
  data() {
    return {
      temp: {
        birth: "",
        holiday: "",
      },
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
