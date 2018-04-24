<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="primary">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  src="https://peterwelchsgym.com/wp-content/uploads/2015/11/womanboxing2.jpg"
                  height="125px"
                >
                </v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h2 class="white--text mb-0">Workout</h2>
                    <div>28^0923.</div>
                  </div>
                </v-card-title>
                <v-card-action>
                  <v-btn flat to="/schedules/1">
                    <v-icon>arrow_forward</v-icon>
                    View details
                  </v-btn>
                </v-card-action>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
