<template>
  <div>
    <div v-if="note" class="container">
      <div class="my-3 uppercase">
        <router-link to="/" class="link-styles">Home</router-link>
        <span class="text--color-grey">{{ ` / ${note.title}` | textLength }}</span>
      </div>
      <div class="row wrap justify-center">
        <EditNote
          v-model="form.title"
          @save="save"
          @history="history"
          @remove="dialog = removeIs = true"
          @close="touchClose"
          :editIs.sync="editIs"
        >
          <hr class="my-3">
          <NewNoteField :note="note" />
        </EditNote>
        <Dialog 
          :value="dialog"
          @cancel="dialog = removeIs = false"
          @remove="remove"
          @continue="setContinue"
          :show-remove-btn="removeIs"
        >
          <template v-slot:title>
            <p>{{ removeIs ? 'Do you wish to remove the note?' : 'Data will not be saved' }}</p>
          </template>
        </Dialog>
      </div>
    </div>
    <NotFound v-else />
  </div>
</template>
<script>
import EditNote from '@/components/EditNote'
import Dialog from '@/componentsUI/Dialog'
import NewNoteField from '@/components/NewNoteField'
import NotFound from '@/layouts/NotFound'
import clone from '@/mixins/clone'
import { mapGetters } from 'vuex'
export default {
  name: 'Note',
  components: {
    EditNote,
    Dialog,
    NewNoteField,
    NotFound
  },
  mixins: [clone],
  metaInfo() {
    const title = this.note.title ? this.note.title : 'Page not found'
    return { title, titleTemplate: null }
  },
  data() {
    return {
      form: {},
      dialog: false,
      editIs: false,
      removeIs: false,
    }
  },
  computed: {
    note() {
      // find the desired entry. If not found, will be displayed component "NewNoteField"
      return this.notes.find(note => note.id === this.$route.params.id) || {}
    },
    ...mapGetters(['notes'])
  },
  mounted() {
    // clone for further work locally
    if (this.note) this.form = this.clone(this.note)
  },
  methods: {
    async save() {
      // combine content note with a new resolution to send to the server
      const data = { ...this.note, title: this.form.title }
      await this.$store.dispatch('A_UPDATE_NOTE', data)
      this.close()
    },
    async remove() {
      this.close()
      await this.$store.dispatch('A_DELETE_NOTE', this.note.id)
      this.$router.push('/')
    },
    touchClose() {
      // if the old value in input has been changed show dialog
      if (this.note.title !== this.form.title) {
        this.form.title = this.note.title
        this.dialog = true
      }
      else this.close()
    },
    close() {
      // hide dialog and input
      this.dialog = this.editIs = false
    },
    setContinue() {
      this.close()
    },
    history() {
      // return back saved value
      this.form.title = this.note.title
    }
  }
}
</script>