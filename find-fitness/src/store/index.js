import Vue from 'vue'
import Vuex from 'vuex'

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
    user: {
      id: 'dfdsfdsf',
      registeredTrainings: ['fafsafafsafsa321312']
    }
  },
  mutations: {
    createTraining (state, payload) {
      state.loadedTrainings.push(payload)
    }
  },
  actions: {
    createTraining ({commit}, payload) {
      const training = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: '434324324324'
      }
      // Reachout a firebase and store it
      commit('createTraining', training)
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
    }
  }
})
