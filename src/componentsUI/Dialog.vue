<template>
  <transition name="fade">
    <div v-if="value" @click.prevent.stop id="myModal" class="modal">
      <div v-if="loading" class="justify-center align-center font-muli">
        <Spinner message="Waiting..." size="large" text-fg-color="white" />
      </div>
      <div v-else class="modal-content">
        <slot name="title"></slot>
        <div class="justify-center">
          <button 
            v-if="listeners.cancel" 
            @click="$emit('cancel')" 
            class="mx-2 btn"
          >Cancel</button>
          <button 
            v-if="listeners.remove && showRemoveBtn" 
            @click="$emit('remove')" 
            class="mx-2 btn"
            >Remove</button>
          <button 
            v-if="listeners.continue && !showRemoveBtn" 
            @click="$emit('continue')" 
            class="mx-2 btn"
          >Continue</button>
        </div>
        <slot name="default"></slot>
      </div>
    </div>
  </transition>
</template>
<script>
import Spinner from 'vue-simple-spinner'
export default {
  name: 'Dialog',
  components: {
    Spinner
  },
  props: {
    value: Boolean,
    loading: Boolean,
    showRemoveBtn: Boolean
  },
  computed: {
    listeners() {
      return this.$listeners
    }
  }
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.font-muli {
  font-family: 'Muli', sans-serif;
}
.mx-2 {
  margin: 0 10px;
}
.align-center {
  height: 100vh;
  align-items: center;
}
.justify-center {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
}
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.btn {
  cursor: pointer;
  height: 35px;
  background-color: #2196f3;
  color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn:hover {
  background-color: #1882da;
}
</style>