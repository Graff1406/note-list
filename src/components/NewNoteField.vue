<template>
  <div>
    <div v-for="(field, i) in fields" :key="i" class="col">
      <div v-if="fields.length">
        <EditNote
          v-model="fields[i].text"
          @save="save(i)"
          @remove="showRemoveBtn(i)"
          @close="close(i)"
          @history="history(i)"
          :editIs.sync="fields[i].editIs"
          :icon-done="dones[i]"
        />
      </div>
      <Dialog 
        :value="dialogs[i]"
        @cancel="cancel(i)"
        @remove="remove(i)"
        @continue="setContinue(i)"
        :show-remove-btn="removeIs"
      >
        <template v-slot:title>
          <p>{{ removeIs ? 'Do you wish to remove the field?' : 'Data will not be saved' }}</p>
        </template>
      </Dialog>
    </div>
    <button 
      @click="add" 
      :disabled="disabled" 
      :class="disabled ? 'new-field_disabled' : 'new-field'"
      class="uppercase"
    >
      Add field
    </button>
  </div>
</template>
<script>
import EditNote from '@/components/EditNote'
import Dialog from '@/componentsUI/Dialog'
import clone from '@/mixins/clone'
export default {
  name: 'AddNewField',
  components: {
    EditNote,
    Dialog
  },
  props: {
    note: {
      type: Object,
      default(obj) {
        return obj || {}
      }
    }
  },
  mixins: [clone],
  data() {
    return {
      removeIs: false,
      dialogs: [],
      dones: [],
      fields: []
    }
  },
  computed: {
    disabled() {
      return !this.fields.every(field => field.text)
    }
  },
  mounted() {
    this.fields = this.clone(this.note.fields || [])
  },
  methods: {
    async save(i) {
      try {
        await this.update(this.clone(this.fields))
        this.$set(this.dones, i, true)
      } catch (err) {
        console.log('LOG: save -> err', err)
      }
    },
    async update(fields) {
      try {
        fields.forEach(field => field.editIs = false)
        await this.$store.dispatch( 'A_UPDATE_NOTE', { ...this.note, fields})
        this.fields = fields
      } catch (err) {
        console.log('LOG: update -> err', err)
      }
      console.log('LOG: update')
    },
    history(i) {
      if (this.fields[i] && this.note.fields && this.note.fields[i] && this.note.fields[i].text)
        this.fields[i].text = this.note.fields[i].text
      console.log('LOG: historyFields')
    },
    async remove(i) {
      try {
        this.cancel()
        const fields = this.clone(this.fields).filter((field, index) => i !== index && field.text)
        await this.update(fields)
        this.dones = this.dones.filter((field, index) => i !== index)
      } catch (err) {
        console.log('LOG: update -> err', err)
      }
      console.log('LOG: showRemoveBtns')   
    },
    showRemoveBtn(i) {
      if (this.fields[i] && this.fields[i].text) {
        this.$set(this.dialogs, i, true)
        this.removeIs = true
      } else {
        this.fields = this.fields.filter((field, index) => i !== index)
      }
    },
    cancel() {
      this.dialogs = []
      this.removeIs = false
    },
    setContinue() {
      this.cancel()
      this.fields = this.clone(this.note.fields || [])
    },
    close(i) {
      const clone = this.clone(this.note.fields || [])
      const noteFields = clone[i] && clone[i].text
      const fields = this.fields[i] && this.fields[i].text
      if (noteFields === fields) {
        this.dialogs = []
        this.fields[i].editIs =  false
        return
      }
      this.$set(this.dialogs, i, true)
      console.log('LOG: closeFields')      
    },
    add() {
      this.fields.push({editIs: true})
    }
  }
}
</script>
<style scoped>
.mx-2 {
  margin: 0 10px;
}
.justify-center {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
}
.new-field_disabled {
  height: 35px;
  background-color: #84b6df;
  color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.new-field {
  cursor: pointer;
  height: 35px;
  background-color: #2196f3;
  color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.new-field:hover {
  background-color: #1882da;
}
.new-field:focus {
  outline: none;
}
</style>