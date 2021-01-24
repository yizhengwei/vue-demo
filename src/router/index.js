import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Demo from '../components/Demo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Demo
  },
  {
    path: '/index',
    component: Home,
    children: [
      {path: '/demo', component: Demo},
    ],
  }
]

const router = new VueRouter({
  routes
})

export default router
