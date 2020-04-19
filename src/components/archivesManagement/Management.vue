
<template>
  <div class="archivesManagement">
    <ManagementNav />
    <ManagementContent />
  </div>
</template>

<script>
import ManagementNav from './ManagementNav'
import ManagementContent from './ManagementContent'
export default {
  name: 'Management',
  components: {
    ManagementNav,
    ManagementContent
  },
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>