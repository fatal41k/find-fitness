import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Favorites from '@/components/Gym/Favorites'
import CreateWorkout from '@/components/Schedule/CreateWorkout'
import Workout from '@/components/Schedule/Workout'
import Gyms from '@/components/Gym/Gyms'
import Schedules from '@/components/Schedule/Schedules'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/gym/favorite',
      name: 'Favorites',
      component: Favorites
    },
    {
      path: '/gyms',
      name: 'Gyms',
      component: Gyms
    },
    {
      path: '/schedules',
      name: 'Schedules',
      component: Schedules
    },
    {
      path: '/schedule/new',
      name: 'CreateWorkout',
      component: CreateWorkout
    },
    {
      path: '/schedules/:id',
      name: 'Workout',
      props: true,
      component: Workout
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ],
  mode: 'history'
})
