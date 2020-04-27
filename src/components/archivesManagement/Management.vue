
<template>
  <div id="archivesManagement">
    <ManagementNav />
    <div class="rightItem">
      <ManagementHeader :searchable=searchable />
      <ManagementContent :isdel=showdel :isEdit=showedit />
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
  name: 'Management',
  components: {
    ManagementNav,
    ManagementContent,
    ManagementHeader,
    ManagementFooter
  },
  data () {
    return {
      showdel: false,
      searchable: true,
      showedit: false,
      // currentUser: this.$route.params.currentUser,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/archivesManagement.css";
</style>