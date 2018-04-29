// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import { store } from './store'
import DateFilter from './filters/date'
import AlertComponent from './components/Shared/Alert.vue'
import EditWorkoutDetails from './components/Schedule/Edit/EditWorkoutDetailsDialog.vue'

Vue.use(Vuetify, {
  theme: {
    primary: colors.green.base,
    secondary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.accent3
  }
})
Vue.component('app-alert', AlertComponent)
Vue.component('app-edit-workout-dialog', EditWorkoutDetails)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAgxqHilGkedE1x7s4G-5Fkzs8myC3eKUU',
      authDomain: 'bai-find-fitness.firebaseapp.com',
      databaseURL: 'https://bai-find-fitness.firebaseio.com',
      projectId: 'bai-find-fitness',
      storageBucket: 'gs://bai-find-fitness.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignin', user)
      }
    })
    this.$store.dispatch('loadTrainings')
  }
})
