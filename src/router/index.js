import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'About',
    component: About
  }  
]


const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
