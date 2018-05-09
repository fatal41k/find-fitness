<template>
  <v-dialog persistent v-model="registerDialog">
    <v-btn class="green--text darken-1" flat accent slot="activator">
      {{userIsRegistered ? 'Unregister' : 'Register'}}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered">Unregister from training?</v-card-title>
            <v-card-title v-else>Register for training?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-card-text>
          <span class="grey--text">You can always change the decision later on.</span>
        </v-card-text>
        <v-layout row wrap>
          <v-flex x12>
            <v-card-actions>
              <v-btn
                flat
                class="red--text darken-1"
                @click="registerDialog = false">Cancel</v-btn>
              <v-btn
                flat
                class="green--text darken-1"
                @click="onAgree">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['trainingId'],
    data () {
      return {
        registerDialog: false
      }
    },
    computed: {
      userIsRegistered () {
        return this.$store.getters.user.registeredTrainings.findIndex(trainingId => {
          console.log(trainingId === this.trainingId, trainingId, this.trainingId)
          return trainingId === this.trainingId
        }) >= 0
      }
    },
    methods: {
      onAgree () {
        if (this.userIsRegistered) {
          this.$store.dispatch('unregisterUserFromTraining', this.trainingId)
        } else {
          console.log(this.$store.getters.user)
          this.$store.dispatch('registerUserForTraining', this.trainingId)
        }
      }
    }
  }
</script>
