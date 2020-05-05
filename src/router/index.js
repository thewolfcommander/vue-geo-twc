import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'


import GMap from '@/components/home/GMap'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import ViewProfile from '@/components/profile/ViewProfile'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
        path: '/profile/:id',
        name: 'ViewProfile',
        component: ViewProfile,
        meta: {
            requiresAuth: true
        }
    }
  ]
})


router.beforeEach((to, from, next) => {
    // Checking for the presence of authentication requirement in meta
    if (to.matched.some(rec => rec.meta.requiresAuth)) {
        // Getting the current user
        let user = firebase.auth().currentUser

        // Checking if the user exists
        if (user) {
            next()
        } else {
            next({ name: 'Login'})
        }
    } else {
        next()
    }
})

export default router
