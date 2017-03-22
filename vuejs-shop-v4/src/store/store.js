import Vue from 'vue'
import Vuex from 'vuex'
import { getStore, setStore } from '../common/js/utils'
Vue.use(Vuex)

const userStore = new Vuex.Store({
  state: {
    userInfo: {},
    isLoading: false,
    loading: true,
    menuShow: false,
    cartList: {}, // 购物车列表
    selectAll: false
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    },
    isLoading: state => state.isLoading
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      state.login = true
      let validity = 30
      let now = new Date()
      now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000)
      document.cookie = 'TOKEN=' + userInfo.token + ';expires=' + now.toGMTString()
      sessionStorage.setItem('user', JSON.stringify(userInfo))
    },
    UPDATE_LOADING_STATUS (state, payload) {
      state.isLoading = payload.isLoading
    },
    UPDATE_MENUSHOW (state) {
      state.menuShow = !state.menuShow
    },
    ADD_CART (state, {goodsId, goodsName, goodsNum, goodsProPrice, setCartNum}) {
      let cart = state.cartList
      if (cart[goodsId]) {
        if (setCartNum) {
          if (setCartNum === 'delete') {
            delete cart[goodsId]
          } else {
            if (cart[goodsId]['goods_num'] <= 1 && setCartNum !== 'add') return
            cart[goodsId]['goods_num'] = (setCartNum === 'add') ? cart[goodsId]['goods_num'] + 1 : cart[goodsId]['goods_num'] - 1
          }
        } else {
          cart[goodsId]['goods_num'] += goodsNum
        }
      } else {
        cart[goodsId] = {}
        cart[goodsId]['goods_id'] = goodsId
        cart[goodsId]['goods_name'] = goodsName
        cart[goodsId]['goods_num'] = goodsNum
        cart[goodsId]['goods_promotion_price'] = goodsProPrice
        cart[goodsId]['is_selected'] = false
      }
      state.cartList = {...cart}
      setStore('buyCart', state.cartList)
    },
    INIT_BUYCART (state) {
      let initCart = getStore('buyCart')
      if (initCart) {
        state.cartList = JSON.parse(initCart)
      }
    },
    SELECT_ITEM (state, {goodsId}) {
      let cart = state.cartList
      cart[goodsId]['is_selected'] = !cart[goodsId]['is_selected']
      state.cartList = {...cart}
      setStore('buyCart', state.cartList)
    },
    SELECT_ALL (state) {
      let cart = state.cartList
      for (var key in cart) {
        if (state.selectAll === true) {
          cart[key]['is_selected'] = false
        } else {
          cart[key]['is_selected'] = true
        }
      }
      state.cartList = {...cart}
      setStore('buyCart', state.cartList)
    },
    DELETE_ALL (state) {
      let cart = state.cartList
      cart = {}
      state.cartList = {...cart}
      setStore('buyCart', state.cartList)
    }
  },
  actions: {
    setUserInfo ({ commit }, user) {
      commit('setUserInfo', user)
    }
  }
})

export default userStore
