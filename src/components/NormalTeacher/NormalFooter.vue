<template>
  <div id="footer">{{ copyRight }}</div>
</template>

<script>
export default {
  name: "NormalFooter",
  data() {
    return {
      copyRight: "CopyRight © 2020 版权所有"
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/normalteacher.css";
</style>
