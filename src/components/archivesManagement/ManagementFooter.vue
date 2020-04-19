<template>
  <div id="footer">
    {{ copyRight }}
  </div>
</template>

<script>
export default {
  name: 'ManagementFooter',
  data () {
    return {
        copyRight: "CopyRight © 2020 版权所有"
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#footer {
    text-align: center;
    width: 100%;
    height: 2.5vh;
    background-color: #cacaca;
    color: #000;
    font-size: 12px;
    position: absolute;
    bottom: 0;
    font-style: italic;
}
</style>