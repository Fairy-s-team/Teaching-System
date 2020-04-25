
<template>
  <div id="delArchives">
    <ManagementNav />
    <div class="rightItem">
      <ManagementHeader :searchable=searchable></ManagementHeader>
      <ManagementContent :isdel=showdel :isEdit=showedit></ManagementContent>
      <ManagementFooter />
    </div>
  </div>
</template>

<script>
import ManagementNav from './ManagementNav'
import ManagementContent from './ManagementContent'
import ManagementHeader from './ManagementHeader'
import ManagementFooter from './ManagementFooter'
export default {
  name: 'DelArchives',
  components: {
    ManagementNav,
    ManagementContent,
    ManagementHeader,
    ManagementFooter
  },
  data () {
    return {
      showdel: true,
      searchable: true,
      showedit: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/archivesManagement.css";
</style>