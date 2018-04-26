<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h2 class="primary--text">{{training.title}}</h2>
          </v-card-title>
          <v-card-media
            :src="training.imageUrl"
            height="300px"
          >
          </v-card-media>
          <v-card-text>
            <div>
              <h4 class="info--text">{{training.date}} {{training.description}}, {{training.location}}</h4>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                quis enim.</p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
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
      }
    }
  }
</script>
