<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate color="primary"
          :width="7"
          :size="70"
          v-if="loading"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h2 class="primary--text">{{training.title}}</h2>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-workout-dialog
                :training="training"
                v-if="userIsCreator"></app-edit-workout-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="training.imageUrl"
            height="300px"
          >
          </v-card-media>
          <v-card-text>
            <div>
              <h4 class="info--text">{{training.date | date}} {{training.description}}, {{training.location}}</h4>
              <template v-if="userIsCreator">
                <div>
                  <app-edit-workout-date :training="training"></app-edit-workout-date>
                  <app-edit-workout-time :training="training"></app-edit-workout-time>
                </div>
              </template>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                quis enim.</p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-training-register-dialog :trainingId="training.id" v-if="userIsAuth && !userIsCreator && !userIsTrainer"></app-training-register-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: [
      'id'
    ],
    computed: {
      training () {
        return this.$store.getters.loadedTraining(this.id)
      },
      userIsAuth () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuth) {
          return false
        }
        return this.$store.getters.user.id === this.training.creatorId
      },
      userIsTrainer () {
        if (!this.userIsAuth) {
          return false
        }
        return this.$store.getters.user.role === 'trainer'
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
