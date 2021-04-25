import Vue from 'vue'
import VueRouter from 'vue-router'

import Movies from '../views/Movies.vue'
import Recipes from '../views/Recipes'
import About from '../views/About'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: { name: 'Movies' }
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: Recipes
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
