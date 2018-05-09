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
    registerUserForTraining (state, payload) {
      const id = payload.id
      if (state.user.registeredTrainings
          .findIndex(training => training.id === id) >= 0) {
        return
      }
      state.user.registeredTrainings.push(id)
      state.user.fbKey[id] = payload.fbKey
      console.log(state.user.fbKey)
    },
    unregisterUserFromTraining (state, payload) {
      const registeredTrainings = state.user.registeredTrainings
      registeredTrainings.splice(registeredTrainings
        .findIndex(training => training.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKey, payload)
    },
    createTraining (state, payload) {
      state.loadedTrainings.push(payload)
    },
    updateTraining (state, payload) {
      const training = state.loadedTrainings.find((training) => {
        return training.id === payload.id
      })
      if (payload.title) {
        training.title = payload.title
      }
      if (payload.description) {
        training.description = payload.description
      }
      if (payload.date) {
        training.date = payload.date
      }
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
    registerUserForTraining ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registrations/')
        .push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('registerUserForTraining', {id: payload, fbKey: data.key})
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterUserFromTraining ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKey) {
        return
      }
      const fbKey = user.fbKey[payload]
      firebase.database().ref('/users/' + user.id + '/registrations/')
        .child(fbKey).remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromTraining', payload)
        })
        .catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
    },
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
          commit('setLoadedTrainings', trainings)
          commit('setLoading', false)
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
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('trainings').push(training)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          console.log(filename, 'ext: ', ext)
          return firebase.storage().ref('trainings/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('trainings').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createTraining', {
            ...training,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateTrainingData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('trainings').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateTraining', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
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
            registeredTrainings: [],
            fbKey: {}
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
              registeredTrainings: [],
              fbKey: {}
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
      commit('setUser', {
        id: payload.uid,
        registeredTrainings: [],
        fbKey: {}
      })
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registrations').once('value')
        .then(data => {
          const registrationsPairs = data.val()
          let registeredTrainings = []
          let swappedObjects = {}
          for (let key in registrationsPairs) {
            registeredTrainings.push(registrationsPairs[key])
            swappedObjects[registrationsPairs[key]] = key
          }
          const updatedUser = {
            id: getters.user.id,
            registeredTrainings: registeredTrainings,
            fbKey: swappedObjects
          }
          commit('setLoading', false)
          commit('setUser', updatedUser)
        })
        .catch(err => {
          commit('setLoading', false)
          console.log(err)
        })
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
