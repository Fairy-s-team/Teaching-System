<template>
  <div id="rank">
    <NormalNav />
    <div class="rightItem">
      <NormalHeader />
      <RankAnalysis />
      <NormalFooter />
    </div>
  </div>
</template>

<script>
import NormalNav from "./NormalNav";
import NormalHeader from "./NormalHeader";
import NormalFooter from "./NormalFooter";
import RankAnalysis from "./RankAnalysis";
import axios from "axios";

export default {
  name: "NormalTeacherRank",
  components: {
    NormalNav,
    NormalHeader,
    RankAnalysis,
    NormalFooter
  },
  data() {
    return {};
  },

  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/normalteacher.css";
</style>
