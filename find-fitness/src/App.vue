<template>
  <v-app>
    <v-navigation-drawer
      fixed
      v-model="sideNav"
      app
    >
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>schedule</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Schedule</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
        @click.native.stop="sideNav = !sideNav"
        class="hidden-sm-and-up">
      </v-toolbar-side-icon>
      <v-toolbar-title>Find Fitness</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat>
          View schedule
          <v-icon dark right>schedule</v-icon>
        </v-btn>
        <v-btn flat>
          Create schedule
          <v-icon dark right>create</v-icon>
        </v-btn>
        <v-btn flat>
          To Find
          <v-icon dark right>location_on</v-icon>
        </v-btn>
        <v-btn flat>
          Favorites
          <v-icon dark right>favorite</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>

    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  name: 'App'
}
</script>
