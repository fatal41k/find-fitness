<template>
  <v-container>
    <v-layout row wrap v-for="training in trainings" :key="training.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="primary" >
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  :src="training.imageUrl"
                  height="125px"
                >
                </v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h2 class="white--text mb-0">{{training.title}}</h2>
                    <div>{{training.date| date}}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="/schedules/ + training.id">
                    <v-icon>arrow_forward</v-icon>
                    View details
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      trainings () {
        return this.userIsCreator
      },
      userIsAuth () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuth) {
          return false
        }
        let trainings = this.$store.getters.loadedTrainings.filter(training => {
          console.log(training)
          return training.creatorId === this.$store.getters.user.id
        })
        return trainings
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
