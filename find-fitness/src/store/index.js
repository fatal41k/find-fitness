import Vue from 'vue'
import Vuex from 'vuex'
import training from './training'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    training: training,
    user: user,
    shared: shared
  }
})
