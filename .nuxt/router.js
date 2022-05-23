import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _dec4ba06 = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _42568fc0 = () => interopDefault(import('../pages/database.vue' /* webpackChunkName: "pages/database" */))
const _dbb819e6 = () => interopDefault(import('../pages/employee-settings.vue' /* webpackChunkName: "pages/employee-settings" */))
const _0a673020 = () => interopDefault(import('../pages/employer-settings.vue' /* webpackChunkName: "pages/employer-settings" */))
const _59060922 = () => interopDefault(import('../pages/failed.vue' /* webpackChunkName: "pages/failed" */))
const _e85801a4 = () => interopDefault(import('../pages/index-employee.vue' /* webpackChunkName: "pages/index-employee" */))
const _e6e99e8a = () => interopDefault(import('../pages/index-employer.vue' /* webpackChunkName: "pages/index-employer" */))
const _68f65585 = () => interopDefault(import('../pages/index-employer-pending.vue' /* webpackChunkName: "pages/index-employer-pending" */))
const _f8792de0 = () => interopDefault(import('../pages/notification.vue' /* webpackChunkName: "pages/notification" */))
const _b9044b20 = () => interopDefault(import('../pages/notification-settings.vue' /* webpackChunkName: "pages/notification-settings" */))
const _14b34500 = () => interopDefault(import('../pages/onboarding.vue' /* webpackChunkName: "pages/onboarding" */))
const _65930185 = () => interopDefault(import('../pages/pools/index.vue' /* webpackChunkName: "pages/pools/index" */))
const _d735fd70 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _503bd984 = () => interopDefault(import('../pages/reset-password.vue' /* webpackChunkName: "pages/reset-password" */))
const _07871206 = () => interopDefault(import('../pages/reviews.vue' /* webpackChunkName: "pages/reviews" */))
const _1a6da420 = () => interopDefault(import('../pages/sign-in.vue' /* webpackChunkName: "pages/sign-in" */))
const _1ebeaf0e = () => interopDefault(import('../pages/stripe-register.vue' /* webpackChunkName: "pages/stripe-register" */))
const _69d429ee = () => interopDefault(import('../pages/success.vue' /* webpackChunkName: "pages/success" */))
const _59110633 = () => interopDefault(import('../pages/users.vue' /* webpackChunkName: "pages/users" */))
const _12a2e1b2 = () => interopDefault(import('../pages/invite/employees/index.vue' /* webpackChunkName: "pages/invite/employees/index" */))
const _42a77293 = () => interopDefault(import('../pages/admin/business/_id/index.vue' /* webpackChunkName: "pages/admin/business/_id/index" */))
const _15303dfe = () => interopDefault(import('../pages/admin/employee/_id/index.vue' /* webpackChunkName: "pages/admin/employee/_id/index" */))
const _509a3004 = () => interopDefault(import('../pages/employee/_id.vue' /* webpackChunkName: "pages/employee/_id" */))
const _5739858c = () => interopDefault(import('../pages/invite/_hash.vue' /* webpackChunkName: "pages/invite/_hash" */))
const _7e3757d7 = () => interopDefault(import('../pages/password-reset/_token.vue' /* webpackChunkName: "pages/password-reset/_token" */))
const _1f545c20 = () => interopDefault(import('../pages/pools/_id/index.vue' /* webpackChunkName: "pages/pools/_id/index" */))
const _6a75cfc4 = () => interopDefault(import('../pages/report/_id.vue' /* webpackChunkName: "pages/report/_id" */))
const _569bf4de = () => interopDefault(import('../pages/user/_id/index.vue' /* webpackChunkName: "pages/user/_id/index" */))
const _4e8c5e7c = () => interopDefault(import('../pages/pools/_id/tip/index.vue' /* webpackChunkName: "pages/pools/_id/tip/index" */))
const _0e0b5a6a = () => interopDefault(import('../pages/user/_id/tip/index.vue' /* webpackChunkName: "pages/user/_id/tip/index" */))
const _1111f5dc = () => interopDefault(import('../pages/user/_id/tipping/index.vue' /* webpackChunkName: "pages/user/_id/tipping/index" */))
const _cd535070 = () => interopDefault(import('../pages/user/_id/tipping/pools/_idPool.vue' /* webpackChunkName: "pages/user/_id/tipping/pools/_idPool" */))
const _13a72bfd = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _dec4ba06,
    name: "admin"
  }, {
    path: "/database",
    component: _42568fc0,
    name: "database"
  }, {
    path: "/employee-settings",
    component: _dbb819e6,
    name: "employee-settings"
  }, {
    path: "/employer-settings",
    component: _0a673020,
    name: "employer-settings"
  }, {
    path: "/failed",
    component: _59060922,
    name: "failed"
  }, {
    path: "/index-employee",
    component: _e85801a4,
    name: "index-employee"
  }, {
    path: "/index-employer",
    component: _e6e99e8a,
    name: "index-employer"
  }, {
    path: "/index-employer-pending",
    component: _68f65585,
    name: "index-employer-pending"
  }, {
    path: "/notification",
    component: _f8792de0,
    name: "notification"
  }, {
    path: "/notification-settings",
    component: _b9044b20,
    name: "notification-settings"
  }, {
    path: "/onboarding",
    component: _14b34500,
    name: "onboarding"
  }, {
    path: "/pools",
    component: _65930185,
    name: "pools"
  }, {
    path: "/register",
    component: _d735fd70,
    name: "register"
  }, {
    path: "/reset-password",
    component: _503bd984,
    name: "reset-password"
  }, {
    path: "/reviews",
    component: _07871206,
    name: "reviews"
  }, {
    path: "/sign-in",
    component: _1a6da420,
    name: "sign-in"
  }, {
    path: "/stripe-register",
    component: _1ebeaf0e,
    name: "stripe-register"
  }, {
    path: "/success",
    component: _69d429ee,
    name: "success"
  }, {
    path: "/users",
    component: _59110633,
    name: "users"
  }, {
    path: "/invite/employees",
    component: _12a2e1b2,
    name: "invite-employees"
  }, {
    path: "/admin/business/:id",
    component: _42a77293,
    name: "admin-business-id"
  }, {
    path: "/admin/employee/:id",
    component: _15303dfe,
    name: "admin-employee-id"
  }, {
    path: "/employee/:id?",
    component: _509a3004,
    name: "employee-id"
  }, {
    path: "/invite/:hash?",
    component: _5739858c,
    name: "invite-hash"
  }, {
    path: "/password-reset/:token?",
    component: _7e3757d7,
    name: "password-reset-token"
  }, {
    path: "/pools/:id",
    component: _1f545c20,
    name: "pools-id"
  }, {
    path: "/report/:id?",
    component: _6a75cfc4,
    name: "report-id"
  }, {
    path: "/user/:id",
    component: _569bf4de,
    name: "user-id"
  }, {
    path: "/pools/:id/tip",
    component: _4e8c5e7c,
    name: "pools-id-tip"
  }, {
    path: "/user/:id?/tip",
    component: _0e0b5a6a,
    name: "user-id-tip"
  }, {
    path: "/user/:id?/tipping",
    component: _1111f5dc,
    name: "user-id-tipping"
  }, {
    path: "/user/:id?/tipping/pools/:idPool?",
    component: _cd535070,
    name: "user-id-tipping-pools-idPool"
  }, {
    path: "/",
    component: _13a72bfd,
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
