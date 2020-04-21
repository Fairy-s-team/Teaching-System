<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import PasswordBack from "./components/LiuCan/PasswordBack";
import Login from "./components/LiuCan/Login";
export default {
  name: "App",
  components: {
    pass: PasswordBack,
    login: Login
  }
};
</script>

<style scoped>
</style>

     
