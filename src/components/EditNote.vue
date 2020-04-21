<template>
    <ContainerNote :editIs="editIs">
      <template v-slot:text>
        <i 
          v-if="!editIs && iconDone" 
          class="material-icons" 
          style="margin: 0 3px; color: green"
        >done</i>
        <span v-if="!editIs">{{ value | textLength }}</span>
        <form v-else @submit.prevent="$emit('save')" class="width">
          <input
            @input="$emit('input', $event.target.value.trim())"
            :value="value"
            type="text"
            class="field"
          >
        </form>
      </template>
      <template v-slot:btn>
        <div class="row nowrap">
          <button 
            v-if="!editIs" @click="$emit('update:editIs', !editIs)" 
            class="icon-btn"
          >        
            <i class="material-icons" style="margin: 0 3px;">edit</i>
          </button>
          <span v-if="editIs">
            <button 
              v-if="listeners.save" @click="$emit('save')" 
              :disabled="!value || disabled" 
              class="icon-btn"
            >        
              <i class="material-icons" style="margin: 0 3px;">save</i>
            </button>
            <button 
              v-if="listeners.history" 
              @click="$emit('history')" 
              :disabled="!value || disabled"
              class="icon-btn"
            >
              <i class="material-icons" style="margin: 0 3px;">history</i>
            </button>
            <button 
              v-if="listeners.close" 
              @click="$emit('close')" 
              :disabled="!value"
              class="icon-btn"
            >
              <i class="material-icons" style="margin: 0 3px;">close</i>
            </button>
          </span>
          <button v-if="listeners.remove" @click="$emit('remove')" class="icon-btn color-red">
            <i class="material-icons" style="margin: 0 3px;">delete</i>
          </button>
        </div>
      </template>
      <div>
        <slot></slot>
      </div>
    </ContainerNote>
</template>
<script>
import ContainerNote from '@/componentsUI/ContainerNote'
export default {
  name: 'EditNote',
  components: {
    ContainerNote
  },
  props: {
    model: {
      prop: 'value',
      event: 'input'
    },
    value: {
      type: String,
      default(str) {
        return str || ''
      }
    },
    editIs: Boolean,
    iconDone: Boolean

  },
  data() {
    return {
      disabled: true
    }
  },
  computed: {
    listeners() {
      return this.$listeners
    }
  },
  watch: {
    value() {
      if (this.disabled) this.disabled = false
    },
    editIs(val) {
      if (val) this.disabled = true
    }
  }
}
</script>