<template>
  <div class="Evaluate">
    <EvaluateNav />
    <EvaluateContent />
  </div>
</template>

<script>
import EvaluateNav from "./EvaluateNav";
import EvaluateContent from "./EvaluateContent";
import EvaluateHeader from "./EvaluateHeader";
import EvaluateFooter from "./EvaluateFooter";
import EvaluateDetail from "./EvaluateDetail";
export default {
  name: "Evaluate",
  components: {
    EvaluateNav,
    EvaluateContent,
    EvaluateHeader,
    EvaluateFooter,
    EvaluateDetail
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>