import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1288d5d5 = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _7f3a3448 = () => interopDefault(import('../pages/database.vue' /* webpackChunkName: "pages/database" */))
const _51a3a3e5 = () => interopDefault(import('../pages/employee-settings.vue' /* webpackChunkName: "pages/employee-settings" */))
const _6c323e10 = () => interopDefault(import('../pages/employer-settings.vue' /* webpackChunkName: "pages/employer-settings" */))
const _1c8892eb = () => interopDefault(import('../pages/fail.vue' /* webpackChunkName: "pages/fail" */))
const _62e39daf = () => interopDefault(import('../pages/home/index.vue' /* webpackChunkName: "pages/home/index" */))
const _5525bd56 = () => interopDefault(import('../pages/index-employee.vue' /* webpackChunkName: "pages/index-employee" */))
const _55dceee3 = () => interopDefault(import('../pages/index-employer.vue' /* webpackChunkName: "pages/index-employer" */))
const _465b6bad = () => interopDefault(import('../pages/index-employer-pending.vue' /* webpackChunkName: "pages/index-employer-pending" */))
const _3f3e9138 = () => interopDefault(import('../pages/notification.vue' /* webpackChunkName: "pages/notification" */))
const _47895f48 = () => interopDefault(import('../pages/notification-settings.vue' /* webpackChunkName: "pages/notification-settings" */))
const _129d6fa8 = () => interopDefault(import('../pages/onboarding.vue' /* webpackChunkName: "pages/onboarding" */))
const _31039746 = () => interopDefault(import('../pages/pools/index.vue' /* webpackChunkName: "pages/pools/index" */))
const _34ca7d70 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _bd985d34 = () => interopDefault(import('../pages/reset-password.vue' /* webpackChunkName: "pages/reset-password" */))
const _18251e44 = () => interopDefault(import('../pages/reviews.vue' /* webpackChunkName: "pages/reviews" */))
const _06d402f8 = () => interopDefault(import('../pages/sign-in.vue' /* webpackChunkName: "pages/sign-in" */))
const _7fa4b5e6 = () => interopDefault(import('../pages/stripe-register.vue' /* webpackChunkName: "pages/stripe-register" */))
const _563a88c6 = () => interopDefault(import('../pages/success.vue' /* webpackChunkName: "pages/success" */))
const _a69d89ea = () => interopDefault(import('../pages/users.vue' /* webpackChunkName: "pages/users" */))
const _668a6d56 = () => interopDefault(import('../pages/home/blog.vue' /* webpackChunkName: "pages/home/blog" */))
const _3e352744 = () => interopDefault(import('../pages/home/contact-us.vue' /* webpackChunkName: "pages/home/contact-us" */))
const _c3b1699a = () => interopDefault(import('../pages/home/faq.vue' /* webpackChunkName: "pages/home/faq" */))
const _2454100e = () => interopDefault(import('../pages/home/footer.vue' /* webpackChunkName: "pages/home/footer" */))
const _0ffc8c16 = () => interopDefault(import('../pages/home/legal.vue' /* webpackChunkName: "pages/home/legal" */))
const _fbefd6ec = () => interopDefault(import('../pages/home/privacy-policy.vue' /* webpackChunkName: "pages/home/privacy-policy" */))
const _de95f2e0 = () => interopDefault(import('../pages/home/team.vue' /* webpackChunkName: "pages/home/team" */))
const _8321086c = () => interopDefault(import('../pages/home/terms-of-use.vue' /* webpackChunkName: "pages/home/terms-of-use" */))
const _57d8b562 = () => interopDefault(import('../pages/invite/employees/index.vue' /* webpackChunkName: "pages/invite/employees/index" */))
const _5b1f9ebb = () => interopDefault(import('../pages/admin/business/_id/index.vue' /* webpackChunkName: "pages/admin/business/_id/index" */))
const _0de00d29 = () => interopDefault(import('../pages/admin/employee/_id/index.vue' /* webpackChunkName: "pages/admin/employee/_id/index" */))
const _d9a3dfb4 = () => interopDefault(import('../pages/employee/_id.vue' /* webpackChunkName: "pages/employee/_id" */))
const _12b4adb4 = () => interopDefault(import('../pages/invite/_hash.vue' /* webpackChunkName: "pages/invite/_hash" */))
const _2242dcaf = () => interopDefault(import('../pages/password-reset/_token.vue' /* webpackChunkName: "pages/password-reset/_token" */))
const _513bd8c8 = () => interopDefault(import('../pages/pools/_id/index.vue' /* webpackChunkName: "pages/pools/_id/index" */))
const _f1263c28 = () => interopDefault(import('../pages/report/_id.vue' /* webpackChunkName: "pages/report/_id" */))
const _0702d0a8 = () => interopDefault(import('../pages/shifts/_id/index.vue' /* webpackChunkName: "pages/shifts/_id/index" */))
const _1fedb306 = () => interopDefault(import('../pages/user/_id/index.vue' /* webpackChunkName: "pages/user/_id/index" */))
const _3e81c492 = () => interopDefault(import('../pages/user/_id/tip/index.vue' /* webpackChunkName: "pages/user/_id/tip/index" */))
const _2311e7f8 = () => interopDefault(import('../pages/user/_id/tipping/index.vue' /* webpackChunkName: "pages/user/_id/tipping/index" */))
const _4df6c5f0 = () => interopDefault(import('../pages/user/_id/tipping/pools/_idPool.vue' /* webpackChunkName: "pages/user/_id/tipping/pools/_idPool" */))
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
    path: "/admin",
    component: _1288d5d5,
    name: "admin"
  }, {
    path: "/database",
    component: _7f3a3448,
    name: "database"
  }, {
    path: "/employee-settings",
    component: _51a3a3e5,
    name: "employee-settings"
  }, {
    path: "/employer-settings",
    component: _6c323e10,
    name: "employer-settings"
  }, {
    path: "/fail",
    component: _1c8892eb,
    name: "fail"
  }, {
    path: "/home",
    component: _62e39daf,
    name: "home"
  }, {
    path: "/index-employee",
    component: _5525bd56,
    name: "index-employee"
  }, {
    path: "/index-employer",
    component: _55dceee3,
    name: "index-employer"
  }, {
    path: "/index-employer-pending",
    component: _465b6bad,
    name: "index-employer-pending"
  }, {
    path: "/notification",
    component: _3f3e9138,
    name: "notification"
  }, {
    path: "/notification-settings",
    component: _47895f48,
    name: "notification-settings"
  }, {
    path: "/onboarding",
    component: _129d6fa8,
    name: "onboarding"
  }, {
    path: "/pools",
    component: _31039746,
    name: "pools"
  }, {
    path: "/register",
    component: _34ca7d70,
    name: "register"
  }, {
    path: "/reset-password",
    component: _bd985d34,
    name: "reset-password"
  }, {
    path: "/reviews",
    component: _18251e44,
    name: "reviews"
  }, {
    path: "/sign-in",
    component: _06d402f8,
    name: "sign-in"
  }, {
    path: "/stripe-register",
    component: _7fa4b5e6,
    name: "stripe-register"
  }, {
    path: "/success",
    component: _563a88c6,
    name: "success"
  }, {
    path: "/users",
    component: _a69d89ea,
    name: "users"
  }, {
    path: "/home/blog",
    component: _668a6d56,
    name: "home-blog"
  }, {
    path: "/home/contact-us",
    component: _3e352744,
    name: "home-contact-us"
  }, {
    path: "/home/faq",
    component: _c3b1699a,
    name: "home-faq"
  }, {
    path: "/home/footer",
    component: _2454100e,
    name: "home-footer"
  }, {
    path: "/home/legal",
    component: _0ffc8c16,
    name: "home-legal"
  }, {
    path: "/home/privacy-policy",
    component: _fbefd6ec,
    name: "home-privacy-policy"
  }, {
    path: "/home/team",
    component: _de95f2e0,
    name: "home-team"
  }, {
    path: "/home/terms-of-use",
    component: _8321086c,
    name: "home-terms-of-use"
  }, {
    path: "/invite/employees",
    component: _57d8b562,
    name: "invite-employees"
  }, {
    path: "/admin/business/:id",
    component: _5b1f9ebb,
    name: "admin-business-id"
  }, {
    path: "/admin/employee/:id",
    component: _0de00d29,
    name: "admin-employee-id"
  }, {
    path: "/employee/:id?",
    component: _d9a3dfb4,
    name: "employee-id"
  }, {
    path: "/invite/:hash?",
    component: _12b4adb4,
    name: "invite-hash"
  }, {
    path: "/password-reset/:token?",
    component: _2242dcaf,
    name: "password-reset-token"
  }, {
    path: "/pools/:id",
    component: _513bd8c8,
    name: "pools-id"
  }, {
    path: "/report/:id?",
    component: _f1263c28,
    name: "report-id"
  }, {
    path: "/shifts/:id",
    component: _0702d0a8,
    name: "shifts-id"
  }, {
    path: "/user/:id",
    component: _1fedb306,
    name: "user-id"
  }, {
    path: "/user/:id?/tip",
    component: _3e81c492,
    name: "user-id-tip"
  }, {
    path: "/user/:id?/tipping",
    component: _2311e7f8,
    name: "user-id-tipping"
  }, {
    path: "/user/:id?/tipping/pools/:idPool?",
    component: _4df6c5f0,
    name: "user-id-tipping-pools-idPool"
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
