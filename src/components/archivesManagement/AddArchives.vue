
<template>
  <div id="addArchives">
    <ManagementNav />
    <div class="rightItem">
      <ManagementHeader :searchable=searchable></ManagementHeader>
      <MContentAdd :editObj=editObj :editStatus=editStatus></MContentAdd>
      <ManagementFooter />
    </div>
  </div>
</template>

<script>
import ManagementNav from './ManagementNav'
import MContentAdd from './MContentAdd'
import ManagementHeader from './ManagementHeader'
import ManagementFooter from './ManagementFooter'
export default {
  name: 'AddArchives',
  components: {
    ManagementNav,
    MContentAdd,
    ManagementHeader,
    ManagementFooter
  },
  data () {
    return {
      searchable: false,
      editObj: {
        teacherName: '',
        birthday: '',
        education: '',
        worktime: '',
        graduateSchool: '',
        politicalStatus: '0',
        title: '',
        titleGivenTime: '',
        workingHours: ''
      },
      editStatus: false // 记录当前是编辑状态还是添加状态
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/archivesManagement.css";
</style>