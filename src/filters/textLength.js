import Vue from 'vue'
Vue.filter('textLength', val => val.length > 16 ? `${val.substring(0, 17)}...` : val)