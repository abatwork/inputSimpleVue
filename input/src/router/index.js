import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import layout from '@/components/layout'

Vue.use(Router)
Vue.use(VueAxios, axios)

export default new Router({
  mode: 'history',
  base: process.env.ROUTER_BASE,
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout
    }
  ]
})
