<template>
  <ContainerNote>
    <template v-slot:text>
      <h4>This page does not exist or has been deleted</h4>
      <div><router-link to="/">Go to home page</router-link></div>
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