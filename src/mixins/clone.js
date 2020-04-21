export default {
  methods: {
    clone(original) {
      try {
        return JSON.parse(JSON.stringify(original)) || []
      } catch (err) {
        console.log('LOG: mixin - clone -> err', err)     
      }
    },
  }
}