export default {
  computed: {
    // necessary to show the button if a specific event listener is installed on the component
    listeners() {
      return this.$listeners
    }
  }
}