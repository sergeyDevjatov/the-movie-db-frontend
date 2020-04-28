import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';
import Movie from '../views/Movie.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/movie/:movieId',
    name: 'movie',
    component: Movie,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})

export default router
