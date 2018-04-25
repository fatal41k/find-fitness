import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedTrainings: [
      {
        imageURL: 'https://peterwelchsgym.com/wp-content/uploads/2015/11/womanboxing2.jpg',
        id: 'fafsafafsafsa321312',
        title: 'Boxing',
        date: '2018-04-03'
      },
      {
        imageURL: 'https://img.grouponcdn.com/deal/nfxcCRuxaxCn14evCjy9/kT-960x576/v1/c700x420.jpg',
        id: 'fafsafafsafsa324222',
        title: 'Fitness',
        date: '2018-04-13'
      }
    ],
    user: {
      id: 'dfdsfdsf',
      registeredTrainings: ['fafsafafsafsa321312']
    }
  },
  mutations: {},
  actions: {},
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
          return training.id === trainingId;
        })
      }
    }
  }
})
