<template>
  <div id="archivesManagement">
    <NormalNav />
    <div class="rightItem">
      <NormalHeader />
      <NormalContent />
      <NormalFooter />
    </div>
  </div>
</template>

<script>
import NormalNav from "./NormalNav";
import NormalContent from "./NormalContent";
import NormalHeader from "./NormalHeader";
import NormalFooter from "./NormalFooter";

export default {
  name: "NormalTeacher",
  components: {
    NormalNav,
    NormalContent,
    NormalHeader,
    NormalFooter
  },
  data() {
    return {
    };
  },
  mounted:function(){
    // 通过判断用户session是否存在来决定是否可以访问该页面
    this.$http.get("session/user").then((res) => {
      // console.log(res.data[1].toString());
      if (res.data == null || res.data == "") {
        this.$router.push("/api/user");
      } else if (res.data[1].toString().indexOf("tea:visit") == -1)  // 只有获得老师权限才可以访问
      {
        this.$message.error("没有权限访问");
        // this.$router.push("/api/document");
        this.$router.back(-1);
      } 
    });
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/normalteacher.css";
</style>
