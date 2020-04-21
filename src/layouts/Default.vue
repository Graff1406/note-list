<template>
  <div class="content">
    <div v-if="!content">
      <div class="row">
        <h1>Note worker</h1>
      </div>
     <router-view></router-view>
    </div>
    <Dialog :value="loader" :loading="loader" />
  </div>
</template>
<script>
import Dialog from '@/componentsUI/Dialog'
import { mapGetters } from 'vuex'
export default {
  name: 'DefaultLayout',
  metaInfo: {
    title: 'Note list creator',
    titleTemplate: null
  },
  components: {
    Dialog
  },
  computed: {
    ...mapGetters(['loader', 'content'])
  },
  async mounted() {
    await this.$store.dispatch('A_GET_NOTES')
  }
}
</script>
<style>
  @import '../assets/styles.css';
</style>
<style scoped>
.content {
  height: 100vh; 
  max-width: 600px;
  min-width: 320px;
  margin: 0 auto;
}
.row {
  display: flex;
  justify-content: center;
  font-family: 'Muli', sans-serif;
}
</style>