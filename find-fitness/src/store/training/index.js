import * as firebase from 'firebase'

export default {
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
    ]
  },
  mutations: {
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
    setLoadedTrainings (state, payload) {
      state.loadedTrainings = payload
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
}
