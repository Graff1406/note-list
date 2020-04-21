import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { NOTES } from './uriList'

Vue.use(Vuex)

// I usually use modules, but here it will be redundant

const query = async (commit, dispatch, method, data) => {
  try {
    commit('M_SET_VAL', { prop: 'loading', data: true })
    await axios[method](...data)
    dispatch('A_GET_NOTES')
  } catch(err) {
    console.log(`store -> query. METHOD - ${method}`, err)
  }
}

const store = new Vuex.Store({
  state: {
    notes: [],
    loading: false,
    content: true
  },
  mutations: {
    M_SET_VAL (state, {prop, data}) {
      if (state.loading) state.loading = false
      state[prop] = data
      if (state.content && !state.loading) state.content = false
    }
  },
  actions: {
    async A_GET_NOTES ({ commit }) {
      try {
        commit('M_SET_VAL', { prop: 'loading', data: true })
        const {data} = await axios.get(`${NOTES}.json`)
        let notes = []
        if (data) {
          // parsing FIREBASE data return
          notes = Object.keys(data).map(key => {
            return { ...data[key], id: key }
          })
        }
        commit('M_SET_VAL', { prop: 'notes', data: notes.reverse() })
        } catch(err) {
        console.log('store -> A_GET_NOTES', err)
      }
      
    },
    async A_CREATE_NOTE ({ commit, dispatch }, note) {
      await query(commit, dispatch, 'post', [`${NOTES}.json`, note])
    },
    async A_UPDATE_NOTE ({commit, dispatch }, data) {
      await query(commit, dispatch, 'put', [`${NOTES}/${data.id}.json`, data])
    },
    async A_DELETE_NOTE ({commit, dispatch }, id) {
      await query(commit, dispatch, 'delete', [`${NOTES}/${id}.json`])
    }
  },
  getters: {
    notes({ notes }) {
      return notes
    },
    loader({ loading }) {
      return loading
    },
    content({ content }) {
      return content
    }
  }
})

export default store