import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedTrainings: [
      {
        imageUrl: 'https://peterwelchsgym.com/wp-content/uploads/2015/11/womanboxing2.jpg',
        id: 'fafsafafsafsa321312',
        title: 'Boxing',
        date: new Date(),
        location: 'Kijow',
        description: 'Awesome event'
      },
      {
        imageUrl: 'https://img.grouponcdn.com/deal/nfxcCRuxaxCn14evCjy9/kT-960x576/v1/c700x420.jpg',
        id: 'fafsafafsafsa324222',
        title: 'Fitness',
        date: new Date(),
        location: 'Kijow',
        description: 'Awesome event'
      }
    ],
    user: null,
    loading: null,
    error: null
  },
  mutations: {
    createTraining (state, payload) {
      state.loadedTrainings.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoadedTrainings (state, payload) {
      state.loadedTrainings = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadTrainings ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('trainings').once('value')
        .then((data) => {
          const trainings = []
          const obj = data.val()
          for (let key in obj) {
            trainings.push({
              id: key,
              title: obj[key].title,
              location: obj[key].location,
              imageUrl: obj[key].imageUrl,
              description: obj[key].description,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoading', false)
          commit('setLoadedTrainings', trainings)
        })
        .catch(
          (error) => {
            commit('setLoading', true)
            console.log(error)
          }
        )
    },
    createTraining ({commit, getters}, payload) {
      const training = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      firebase.database().ref('trainings').push(training)
        .then((data) => {
          const key = data.key
          console.log(data)
          commit('createTraining', {
            ...training,
            id: key
          })
        }).catch((error) => {
          console.log(error)
        })
      // Reachout a firebase and store it
    },
    userSignup ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredWorkouts: []
          }
          commit('setUser', newUser)
        }).catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    userSignin ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredWorkouts: []
            }
            commit('setUser', newUser)
          }
        ).catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
      )
    },
    autoSignin ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredWorkouts: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedTrainings (state) {
      return state.loadedTrainings.sort((trainA, trainB) => {
        return trainA.date > trainB.date
      })
    },
    featuredTrainings (state, getters) {
      return getters.loadedTrainings.slice(0, 5)
    },
    loadedTraining (state) {
      return (trainingId) => {
        return state.loadedTrainings.find((training) => {
          return training.id === trainingId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
