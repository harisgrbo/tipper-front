import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1147a11c = () => interopDefault(import('../pages/failed.vue' /* webpackChunkName: "pages/failed" */))
const _146a58d0 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _46dc47d0 = () => interopDefault(import('../pages/sign-in.vue' /* webpackChunkName: "pages/sign-in" */))
const _d37a64c4 = () => interopDefault(import('../pages/success.vue' /* webpackChunkName: "pages/success" */))
const _7f34d5e3 = () => interopDefault(import('../pages/users.vue' /* webpackChunkName: "pages/users" */))
const _d2dc3e2a = () => interopDefault(import('../pages/user/_id.vue' /* webpackChunkName: "pages/user/_id" */))
const _39cafbad = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _1147a11c,
    name: "failed"
  }, {
    path: "/register",
    component: _146a58d0,
    name: "register"
  }, {
    path: "/sign-in",
    component: _46dc47d0,
    name: "sign-in"
  }, {
    path: "/success",
    component: _d37a64c4,
    name: "success"
  }, {
    path: "/users",
    component: _7f34d5e3,
    name: "users"
  }, {
    path: "/user/:id?",
    component: _d2dc3e2a,
    name: "user-id"
  }, {
    path: "/",
    component: _39cafbad,
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
