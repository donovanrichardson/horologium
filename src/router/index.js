import Vue from 'vue'
import VueRouter from 'vue-router'
import Horologium from '../views/Horologium.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Horologium',
    component: Horologium
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
