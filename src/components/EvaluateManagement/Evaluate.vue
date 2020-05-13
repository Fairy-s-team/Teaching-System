<template>
  <div class="Evaluate">
    <EvaluateNav/>
    <EvaluateContent/>
  </div>
</template>

<script>
  import EvaluateNav from "./EvaluateNav";
  import EvaluateContent from "./EvaluateContent";

  export default {
    name: "Evaluate",
    components: {
      EvaluateNav,
      EvaluateContent
    },
    data() {
      return {};
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../assets/css/Evaluate.css";
</style>
