import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7f3a3448 = () => interopDefault(import('../pages/database.vue' /* webpackChunkName: "pages/database" */))
const _68005336 = () => interopDefault(import('../pages/employee-register.vue' /* webpackChunkName: "pages/employee-register" */))
const _51a3a3e5 = () => interopDefault(import('../pages/employee-settings.vue' /* webpackChunkName: "pages/employee-settings" */))
const _6c323e10 = () => interopDefault(import('../pages/employer-settings.vue' /* webpackChunkName: "pages/employer-settings" */))
const _796c6f4a = () => interopDefault(import('../pages/failed.vue' /* webpackChunkName: "pages/failed" */))
const _5525bd56 = () => interopDefault(import('../pages/index-employee.vue' /* webpackChunkName: "pages/index-employee" */))
const _55dceee3 = () => interopDefault(import('../pages/index-employer.vue' /* webpackChunkName: "pages/index-employer" */))
const _3f3e9138 = () => interopDefault(import('../pages/notification.vue' /* webpackChunkName: "pages/notification" */))
const _7e109cac = () => interopDefault(import('../pages/password-reset.vue' /* webpackChunkName: "pages/password-reset" */))
const _34ca7d70 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _18251e44 = () => interopDefault(import('../pages/reviews.vue' /* webpackChunkName: "pages/reviews" */))
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
    path: "/database",
    component: _7f3a3448,
    name: "database"
  }, {
    path: "/employee-register",
    component: _68005336,
    name: "employee-register"
  }, {
    path: "/employee-settings",
    component: _51a3a3e5,
    name: "employee-settings"
  }, {
    path: "/employer-settings",
    component: _6c323e10,
    name: "employer-settings"
  }, {
    path: "/failed",
    component: _796c6f4a,
    name: "failed"
  }, {
    path: "/index-employee",
    component: _5525bd56,
    name: "index-employee"
  }, {
    path: "/index-employer",
    component: _55dceee3,
    name: "index-employer"
  }, {
    path: "/notification",
    component: _3f3e9138,
    name: "notification"
  }, {
    path: "/password-reset",
    component: _7e109cac,
    name: "password-reset"
  }, {
    path: "/register",
    component: _34ca7d70,
    name: "register"
  }, {
    path: "/reviews",
    component: _18251e44,
    name: "reviews"
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
