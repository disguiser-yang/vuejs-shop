const Login = resolve => {
  require.ensure(['pages/login/login.vue'], () => {
    resolve(require('pages/login/login.vue'))
  })
}

const Home = resolve => {
  require.ensure(['pages/home/home.vue'], () => {
    resolve(require('pages/home/home.vue'))
  })
}

const GoodsDetail = resolve => {
  require.ensure(['pages/goods/detail.vue'], () => {
    resolve(require('pages/goods/detail.vue'))
  })
}

const Buy = resolve => {
  require.ensure(['pages/buy/buy.vue'], () => {
    resolve(require('pages/buy/buy.vue'))
  })
}

const Cart = resolve => {
  require.ensure(['pages/cart/cart.vue'], () => {
    resolve(require('pages/cart/cart.vue'))
  })
}

const Address = resolve => {
  require.ensure(['pages/address/address.vue'], () => {
    resolve(require('pages/address/address.vue'))
  })
}

const Add = resolve => {
  require.ensure(['pages/address/add/add.vue'], () => {
    resolve(require('pages/address/add/add.vue'))
  })
}

const routers = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/goods/detail/:id',
    component: GoodsDetail
  },
  {
    path: '/buy',
    component: Buy,
    meta: { requiresAuth: true }
  },
  {
    path: '/cart',
    component: Cart,
    meta: { requiresAuth: true }
  },
  {
    path: '/address',
    component: Address,
    meta: { requiresAuth: true }
  },
  {
    path: '/address/add',
    component: Add,
    meta: { requiresAuth: true }
  }
]

export default routers
