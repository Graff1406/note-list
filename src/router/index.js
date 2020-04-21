import Vue from 'vue'
import VueRouter from 'vue-router'
import {LINKS} from '@/links/index'
import Home from '@/pages/Home.vue'
import Note from '@/pages/Note.vue'


Vue.use(VueRouter);

const routes = [
  {
    path: LINKS.HOME,
    name: "home",
    component: Home
  },
  {
    path: LINKS.NOTE,
    name: "note",
    component: Note
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
