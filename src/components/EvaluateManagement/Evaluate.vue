<!--  学生评价 -->

<template>
  <div class="Evaluate">
    <EvaluateNav />
    <EvaluateContent />
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
    mounted:function(){
      // 通过判断用户session是否存在来决定是否可以访问该页面
      this.$http.get("session/user").then((res) => {
        // console.log(res.data[1].toString());
        if (res.data == null || res.data == "") {
          this.$router.push("/api/user");
        } else if (res.data[1].toString().indexOf("stu:visit") == -1)  // 只有获得学生权限才可以访问
        {
          this.$message.error("没有权限访问");
          // this.$router.push("/api/document");
          this.$router.back(-1);
        } 
      });
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../assets/css/Evaluate.css";
</style>
