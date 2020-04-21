<template>
  <div class="container">
      <form @submit.prevent="createNote">
        <div class="row nowrap align-items-center">
          <input
            v-model="title" 
            type="text" 
            placeholder="New note" 
            class="mx-2 field body-1"
          >
          <button type="submit" :disabled="!allowCreate"  class="mx-2 btn-add">
            <i class="material-icons" style="font-size:36px">add</i>
          </button>
        </div>        
      </form>
    <div v-if="notes.length" class="pa-3">
      <div
        v-for="(note, i) in notes"
        :key="i"
      >
        <ContainerNote :to="`${note.id}`">
          <template v-slot:text>
            <p class="ma-0 text--color-grey">
              {{ note.title | textLength }}
            </p>
          </template>
          <template v-slot:btn>
            <button @click.prevent.stop="onDialog(i)" class="icon-btn">
              <i class="material-icons icon color-red">delete</i>
            </button>
          </template>
        </ContainerNote>
        <Dialog 
          :value="dialogs[i]"
          @cancel="offDialog(i)"
          @remove="remove(note, i)"
          :show-remove-btn="dialogs[i]"
        >
          <template v-slot:title>
            <p class="text--color-grey">Do you wish to remove the note?</p>
          </template>
        </Dialog>
      </div>
    </div>
    <div v-else class="row text--color-grey">
      <p>Note don't exisit yet</p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ContainerNote from '@/componentsUI/ContainerNote'
import Dialog from '@/componentsUI/Dialog'

export default {
  name: 'Home',
  components: {
    ContainerNote,
    Dialog
  },
  data() {
    return {
      title: '',
      dialogs: []
    }
  },
  computed: {
    allowCreate() {
      return this.title.trim()
    },
    ...mapGetters(['notes'])
  },
  methods: {
    async createNote() {
      await this.A_CREATE_NOTE({title: this.title})
      this.title = ''
    },
    async remove(note ,i) {  
      this.offDialog(i)   
      await this.A_DELETE_NOTE(note.id)
    },
    onDialog(i) {
      this.$set(this.dialogs, i, true)
    },
    offDialog(i) {
      this.$set(this.dialogs, i, false)
    },
    ...mapActions(['A_CREATE_NOTE', 'A_DELETE_NOTE'])
  }
}
</script>