<template>
  <ContainerNote>
    <template v-slot:text>
      <h1>This page does not exist or has been deleted</h1>
      <router-link to="/">Go to home page</router-link>
    </template>
  </ContainerNote>
</template>
<script>
import ContainerNote from '@/componentsUI/ContainerNote'
export default {
  name: 'NotFound',
  components: {
    ContainerNote
  }
}
</script>