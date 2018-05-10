<template>
  <v-app>
    <v-navigation-drawer
      fixed
      v-model="sideNav"
      app
      temporary
    >
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuth">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
        @click.native.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"
      >
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Find Fitness</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link"
        >
          {{item.title}}
          <v-icon dark right>{{item.icon}}</v-icon>
        </v-btn>
        <v-btn flat v-if="userIsAuth" @click.native="onLogout">
          Log out
          <v-icon dark right>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
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
  computed: {
    menuItems () {
      let menuItems = [
        {icon: 'face', title: 'Sign up', link: '/signup'},
        {icon: 'lock_open', title: 'Sign in', link: '/signin'}
      ]
      if (this.userIsAuth) {
        if (this.$store.getters.user.role === 'user') {
          menuItems = [
            {icon: 'schedule', title: 'All workouts', link: '/schedules'},
            {icon: 'how_to_reg', title: 'Participate', link: '/schedule/participate'},
            {icon: 'location_on', title: 'To Find', link: '/gyms'},
            {icon: 'account_circle', title: 'Profile', link: '/profile'}
          ]
        } else {
          menuItems = [
            {icon: 'create', title: 'Create workout', link: '/schedule/new'},
            {icon: 'schedule', title: 'All workouts', link: '/schedules'},
            {icon: 'directions_run', title: 'My workouts', link: '/schedule/myworkouts'},
            {icon: 'account_circle', title: 'Profile', link: '/profile'}
          ]
        }
      }
      return menuItems
    },
    userIsAuth () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  },
  name: 'App'
}
</script>
