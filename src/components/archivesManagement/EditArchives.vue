
<template>
  <div id="editArchives">
    <ManagementNav />
    <div class="rightItem">
      <ManagementHeader :searchable=searchable></ManagementHeader>
      <ManagementContent :isdel=isdel :isEdit=showedit v-on:startEdit="startEdit" v-if="!stEdit"></ManagementContent>
      <MContentAdd :editObj=editItemObj v-on:editEnd="editEnd" v-if="stEdit"></MContentAdd>
      <ManagementFooter />
    </div>
  </div>
</template>

<script>
import ManagementNav from './ManagementNav'
import ManagementContent from './ManagementContent'
import MContentAdd from './MContentAdd'
import ManagementHeader from './ManagementHeader'
import ManagementFooter from './ManagementFooter'
export default {
  name: 'EditArchives',
  components: {
    ManagementNav,
    ManagementContent,
    ManagementHeader,
    ManagementFooter,
    MContentAdd
  },
  data () {
    return {
      searchable: false,  // 向子组件-查找
      showedit: true,     // 向子组件-显示编辑
      isdel: false,       // 向子组件-显示删除
      stEdit: false,      // 接收-控制编辑
      editItemObj: {}
    }
  },
  methods: {
    startEdit(val, obj) {
      this.stEdit=val;
      this.editItemObj = obj;
      console.log(obj);
    },
    editEnd(val) {
      this.stEdit=val;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/archivesManagement.css";
</style>