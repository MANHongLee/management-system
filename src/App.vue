<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang = "less" scope>
* {
  margin: 0;
  padding: 0;
}
/* html {
  body {
    height: 100%;
  }
} */
html,body {
  height: 100%;
}
#app {
  height: 100vh;
}
</style>
