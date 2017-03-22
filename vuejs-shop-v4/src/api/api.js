import axios from 'axios'

let base = ''

export const requestLogin = params => { return axios.post(`${base}/v1/login`, params).then(res => res.data) }

export const requestGetHomeGoods = params => { return axios.get(`${base}/v1/home/goods`, params).then(res => res.data) }

export const requestGetGoodsComment = params => { return axios.get(`${base}/v1/home/goods/` + params + `/comment`, params).then(res => res.data) }

export const requestGetGoodsInfo = params => { return axios.get(`${base}/v1/home/goods/info/` + params, params).then(res => res.data) }
