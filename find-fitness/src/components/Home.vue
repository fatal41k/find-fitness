<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs-12>
        <v-carousel class="mt-2">
          <v-carousel-item
            v-for="training in trainings"
            :src="training.imageURL"
            :key="training.id">
            <div class="title text-xs-center text-sm-right">{{training.title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/schedules" class="primary">View train schedule</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/schedule/new" class="primary">Add new training</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        trainings: [
          {
            imageURL: 'https://peterwelchsgym.com/wp-content/uploads/2015/11/womanboxing2.jpg',
            id: 'fafsafafsafsa321312',
            title: 'Boxing'
          },
          {
            imageURL: 'https://img.grouponcdn.com/deal/nfxcCRuxaxCn14evCjy9/kT-960x576/v1/c700x420.jpg',
            id: 'fafsafafsafsa324222',
            title: 'Fitness'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,.5);
    font-size: 2em;
    padding: 20px;
    color: white;
  }
</style>
