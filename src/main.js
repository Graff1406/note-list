import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import Meta from 'vue-meta'
import VueResize from 'vue-resize'
import '@/filters/textLength'

Vue.use(Meta)
Vue.use(VueResize)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
