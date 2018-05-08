<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">
      Edit Date
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>
              Edit Date
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrao>
          <v-flex x12>
            <v-date-picker v-model="editableDate" style="width: 100%" actions>
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
            </v-date-picker>
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
        editableDate: null
      }
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.training.date)
        const newDay = new Date(this.editableDate).getUTCDate()
        const newMonth = new Date(this.editableDate).getUTCMonth()
        const newYear = new Date(this.editableDate).getUTCFullYear()
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        this.$store.dispatch('updateTrainingData', {
          id: this.training.id,
          date: newDate
        })
      }
    },
    computed: {
      submittableDateTime () {
        let date = new Date(this.date)
        if (typeof this.editableDate === 'string') {
          const hours = this.editableDate.match(/^(\d+)/)[1]
          const minutes = this.editableDate.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.editableDate.getHours())
          date.setMinutes(this.editableDate.getMinutes())
        }
        return date
      }
    },
    created () {
      var formattedDate = new Date(this.training.date).toISOString().slice(0, 10)
      this.editableDate = formattedDate
    }
  }
</script>
