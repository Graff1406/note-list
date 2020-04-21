<template>
  <div class="card-content">
    <router-link
      v-if="to"
      :to="to"
      :tag="to ? 'a' : 'div'"
      :class="{'cursor': to}"
      class="link-styles"
    >
      <div 
        :class="justifyCenter"
        class="row wrap align-items-center justify-space-between"
      >
        <slot name="text"></slot>
        <slot name="btn"></slot>
        <slot></slot>
      </div>
    </router-link>
    <div 
      v-else
      :class="justifyCenter"
      class="row wrap align-items-center"
      >
      <slot name="text"></slot>
      <slot name="btn"></slot>
    </div>   
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ContainerNote',
  props: {
    to: {
      type: String,
      default(str) {
        return str || ''
      }
    },
    editIs: Boolean
  },
  computed: {
    justifyCenter() {
      return this.editIs ? 'justify-center width wrap' : 'justify-space-between nowrap'
    }
  }
}
</script>
<style>
.card-content {
  background-color: #f3f3f3;
  transition: background-color 0.3s;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  border-radius: 4px;
  box-sizing: border-box;
  text-decoration: none; 
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}
.card-content:hover {
  background-color: #f9f9f9;
  transition-delay: 0.2s;
}
.cursor { 
  cursor: pointer; 
}
</style>