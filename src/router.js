import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './components/Home.vue'
import Join from './components/Join.vue'
import Login from './components/Login.vue'
import Donate from './components/Donate.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/join',
      name: 'join',
      component: Join
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/donate',
      name: 'donate',
      component: Donate
    }
  ]
})
