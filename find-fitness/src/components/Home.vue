<template>
  <v-container>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate color="primary"
          :width="7"
          :size="70"
          v-if="loading"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs-12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="training in trainings"
            :src="training.imageUrl"
            :key="training.id"
            @click.native="onLoadTraining(training.id)">
            <div class="title text-xs-center text-sm-right">{{training.title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-2" v-if="!loading">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/schedules" class="primary">View all workouts</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/schedule/new" class="primary">Add new workout</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      trainings () {
        return this.$store.getters.featuredTrainings
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadTraining (id) {
        this.$router.push('/schedules/' + id)
      }
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0, 0, 0, .5);
    font-size: 2em;
    padding: 20px;
    color: white;
  }
</style>
