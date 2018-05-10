import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    registerUserForTraining (state, payload) {
      const id = payload.id
      if (state.user.registeredTrainings.findIndex(meetup => meetup.id === id) >= 0) {
        return
      }
      state.user.registeredTrainings.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromTraining (state, payload) {
      const registeredTrainings = state.user.registeredTrainings
      registeredTrainings.splice(registeredTrainings
        .findIndex(training => training.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKey, payload)
    },
    setUser (state, payload) {
      state.user = payload
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
    userSignup ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          firebase.database().ref('/users/' + user.uid).child('/info/').set(
            {role: payload.role, email: payload.email})
            .then(() => {
              commit('setLoading', false)
            })
          const newUser = {
            id: user.uid,
            registeredTrainings: [],
            fbKey: {},
            role: payload.role
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
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            firebase.database().ref('/users/' + user.uid + '/info/').once('value')
              .then((data) => {
                const newUser = {
                  id: user.uid,
                  registeredTrainings: [],
                  fbKeys: {},
                  role: data.val().role
                }
                commit('setUser', newUser)
              })
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignin ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredTrainings: [],
        fbKeys: {},
        role: ''
      })
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
        .then(data => {
          const dataPairs = data.val()
          let registeredTrainings = []
          let swappedPairs = {}
          for (let key in dataPairs) {
            registeredTrainings.push(dataPairs[key])
            swappedPairs[dataPairs[key]] = key
          }
          firebase.database().ref('/users/' + getters.user.id + '/info/').once('value')
            .then((data) => {
              const updatedUser = {
                id: getters.user.id,
                registeredTrainings: registeredTrainings,
                fbKeys: swappedPairs,
                role: data.val().role
              }
              commit('setLoading', false)
              commit('setUser', updatedUser)
            })
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
