<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">
      Edit Time
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>
              Edit Time
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrao>
          <v-flex x12>
            <v-time-picker
              class="mt-3"
              v-model="editableTime"
            >
              <v-flex>
                <v-btn
                  class="blue--text darker-1"
                  flat
                  @click.native="editDialog = false"
                > Close </v-btn>
                <v-btn
                  class="blue--text darker-1"
                  flat
                  @click.native="onSaveChanges"
                > Accept </v-btn>
                </v-flex>
              </v-time-picker>
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
        editableTime: null
      }
    },
    methods: {
      onSaveChanges () {
        var newDate = new Date(this.training.date)
        const hours = this.editableTime.match(/^(\d+)/)[1]
        const minutes = this.editableTime.match(/:(\d+)/)[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        this.$store.dispatch('updateTrainingData', {
          id: this.training.id,
          date: newDate
        })
      }
    },
    created () {
      var formattedDate = new Date(this.training.date).toTimeString()
      this.editableDate = formattedDate
    }
  }
</script>
