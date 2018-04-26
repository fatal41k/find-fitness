<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="primary--text">Add a new workout!</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateTraining">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                required
                v-model="title"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                required
                v-model="location"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="imageUrl"
                label="ImageUrl"
                id="image-url"
                required
                v-model="imageUrl"
              ></v-text-field>
              <img :src="imageUrl" height="300px" alt="">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                required
                multi-line
                v-model="description"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <h3>Choose a date: </h3>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs6 sm3 offset-sm3>
              <v-date-picker
                class="mt-3"
                v-model="date"
                min="2016-06-15"
                max="2018-08-10"
              ></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker
                class="mt-3"
                v-model="time"
              ></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary"
                     type="submit"
                     :disabled="!formIsValid"
              >Create
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        location: '',
        imageUrl: '',
        description: '',
        date: null,
        time: new Date()
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' && this.location !== '' &&
          this.description !== '' && this.imageUrl
      },
      submittableDateTime () {
        let date = new Date(this.date)
        if (typeof this.time === 'string') {
          const hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      }
    },
    methods: {
      onCreateTraining () {
        if (!this.formIsValid) {
          return
        }
        const trainingData = {
          title: this.title,
          location: this.location,
          imageUrl: this.imageUrl,
          description: this.description,
          date: this.submittableDateTime
        }
        this.$store.dispatch('createTraining', trainingData)
        this.$router.push('/schedules')
      }
    }
  }
</script>
