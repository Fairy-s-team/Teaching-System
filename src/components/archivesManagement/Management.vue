<!--  教务处老师管理档案 -->

<template>
  <div id="archivesManagement">
    <ManagementNav />
    <div class="rightItem">
      <ManagementHeader :searchable="searchable" @getdata="getsearchdata" />
      <ManagementContent :isdel="showdel" :isEdit="showedit" :searcheddata="searchdata" />
      <ManagementFooter />
    </div>
  </div>
</template>

<script>
import ManagementNav from "./ManagementNav";
import ManagementContent from "./ManagementContent";
import ManagementHeader from "./ManagementHeader";
import ManagementFooter from "./ManagementFooter";

export default {
  name: "Management",
  inject: ["reload"],
  components: {
    ManagementNav,
    ManagementContent,
    ManagementHeader,
    ManagementFooter
  },
  data() {
    return {
      showdel: false,
      searchable: true,
      showedit: false,
      searchdata: [],
      issearched: false
      // currentUser: this.$route.params.currentUser,
    };
  },
  mounted:function(){
    // 通过判断用户session是否存在来决定是否可以访问该页面
    this.$http.get("session/user").then((res) => {
      //  console.log(res.data[1].toString());
      if (res.data == null || res.data == "") {
        this.$router.push("/api/user");
      } else if (res.data[1].toString().indexOf("admin:visit") == -1)  // 只有获得管理员权限才可以访问
      {
        this.$message.error("没有权限访问");
        // this.$router.push("/api/rank");
        this.$router.back(-1);
      } 
    });
  },
  methods: {
    //接收来自子组建传来的查询到的数据
    getsearchdata(val) {
      //this.searchData = msg1;
      console.log("从子组件接受的data");
      console.log(val);
      this.searchdata = val;
      console.log(this.searchdata);
    }
    // searchstatus(val) {
    //   // this.issearched = msg;
    //   console.log("从子组件接受的issearched" + this.issearched);
    //   return val;
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/archivesManagement.css";
</style>

