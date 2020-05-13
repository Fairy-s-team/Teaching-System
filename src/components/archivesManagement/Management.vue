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
