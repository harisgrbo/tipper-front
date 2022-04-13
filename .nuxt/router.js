import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _796c6f4a = () => interopDefault(import('../pages/failed.vue' /* webpackChunkName: "pages/failed" */))
const _7e109cac = () => interopDefault(import('../pages/password-reset.vue' /* webpackChunkName: "pages/password-reset" */))
const _34ca7d70 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _06d402f8 = () => interopDefault(import('../pages/sign-in.vue' /* webpackChunkName: "pages/sign-in" */))
const _563a88c6 = () => interopDefault(import('../pages/success.vue' /* webpackChunkName: "pages/success" */))
const _a69d89ea = () => interopDefault(import('../pages/users.vue' /* webpackChunkName: "pages/users" */))
const _54dcea7a = () => interopDefault(import('../pages/user/_id.vue' /* webpackChunkName: "pages/user/_id" */))
const _674760d5 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/failed",
    component: _796c6f4a,
    name: "failed"
  }, {
    path: "/password-reset",
    component: _7e109cac,
    name: "password-reset"
  }, {
    path: "/register",
    component: _34ca7d70,
    name: "register"
  }, {
    path: "/sign-in",
    component: _06d402f8,
    name: "sign-in"
  }, {
    path: "/success",
    component: _563a88c6,
    name: "success"
  }, {
    path: "/users",
    component: _a69d89ea,
    name: "users"
  }, {
    path: "/user/:id?",
    component: _54dcea7a,
    name: "user-id"
  }, {
    path: "/",
    component: _674760d5,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
