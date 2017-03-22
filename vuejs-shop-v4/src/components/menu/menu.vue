<template>
  <div class="menu">
    <div class="menu-list" :class="{'show': show}">
      
      <div class="menu-header" style='background:none'>
        <!-- <img class="menu-avatar" src=""
          alt=""> -->
        <div class="menu-title">
          <blur :blur-amount=40 :url="url">
            <p class="center"><img :src="url"></p>
          </blur>
        </div>
        <div>13
        </div>
        
      </div>
     
      <scroller lock-x scrollbar-y  >
          <div class='scroller_ul'>
            <ul>
              <li>
                <a href='javascript:;' >我的订单</a>
              </li>
              <li>
                <router-link :to="{ path: '/address' }">
                   <a href='javascript:;' >地址管理</a>
                </router-link>
              </li>
              <li>
                 <router-link :to="{ path: '/cart' }">
                    <a href='javascript:;' >我的购物车</a>
                </router-link>
              </li>
              <li>
                <a href='javascript:;' >设置</a>
              </li>
      
            </ul>
            
          </div>
      </scroller>

    </div>
    <div class="menu-other">

    </div>
  </div>
</template>

<script>
import {Blur, Scroller} from 'vux'
export default{
  components: {
    Blur,
    Scroller
  },
  name: 'v-menu',
  props: {
    show: {
      type: Boolean
    }
  },
  data () {
    return {
      url: 'http://img.ivsky.com/img/tupian/pre/201606/30/pexels_photo_48730.jpg'
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">

@import 'menu.styl'

.center {
  text-align: center;
  padding-top: 20px;
  color: #fff;
  font-size: 18px;
}
.center img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ececec;
}
.menu-header{
  height: 200px!important;
}
.menu-list{
  background-color:rgba(0,0,0,0.8)!important;
}
.scroller_ul ul{
  padding-left:0.5rem;
}
.scroller_ul ul li a{
  color:#fff;
}
</style>
