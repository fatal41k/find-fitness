<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>
              Edit Workout
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider>
        </v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="editedTitle"
              ></v-text-field>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="editedDescription"
                multi-line
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex>
            <v-card-actions>
              <v-btn flat class="blue--text darken-1" @click.native="acceptChanges">Accept</v-btn>
              <v-btn flat color="purple" @click="editDialog = false">Dismiss</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['training'],
    data () {
      return {
        editDialog: false,
        editedTitle: this.training.title,
        editedDescription: this.training.description
      }
    },
    methods: {
      acceptChanges () {
        if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
          return
        }
        this.editDialog = false
        console.log('hi im here')
        this.$store.dispatch('updateTrainingData', {
          id: this.training.id,
          title: this.editedTitle,
          description: this.editedDescription
        })
        return true
      }
    }
  }
</script>
