// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router/router'
import VueRouter from 'vue-router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './store/store'
import './common/js/rem'
import {ConfirmPlugin, ToastPlugin} from 'vux'
Vue.config.debug = true
Vue.use(VueRouter)
Vue.use(VueAwesomeSwiper)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.sessionStorage.user) {
  store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.user))
}

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('UPDATE_LOADING_STATUS', {isLoading: true})
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userInfo.token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

router.afterEach(function (to) {
  store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
})

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})
