<template>
  <div>

    <x-header :left-options="{showBack: false}"  style="background-color:#ED5564;position:fixed;top:0rem;left:0rem;width:100%;z-index: 9;">首页
      <a slot="right" v-on:click="isShow">我的</a>
    </x-header> 
     
         
    <swiper :options="swiperOption" class="swiper-img" ref="mySwiperA" style='padding-top:46px;'>
      <swiper-slide><img src="../../assets/images/banner1.jpeg" /></swiper-slide>
      <swiper-slide><img src="../../assets/images/banner2.jpeg" /></swiper-slide>
    </swiper>
    
    <div class="app-field clearfix" mod="imgNav" style="position: relative;">
      <ul class="control-group clearfix custom-nav-4">
        <li><a href="#" title="" class="custom-url"><img src="http://cdn.pic.youzhipai.cn/pic/readPic?begin=2581718095&amp;end=2581727246" style="display: block;"></a></li>
        <li><a href="#" title="" class="custom-url"><img src="http://cdn.pic.youzhipai.cn/pic/readPic?begin=2581727246&amp;end=2581736261" style="display: block;"></a></li>
        <li><a href="#" title="" class="custom-url"><img src="http://cdn.pic.youzhipai.cn/pic/readPic?begin=2581736261&amp;end=2581746319" style="display: block;"></a></li>
        <li><a href="#" title="" class="custom-url"><img src="http://cdn.pic.youzhipai.cn/pic/readPic?begin=2581746319&amp;end=2581755643" style="display: block;"></a></li>
      </ul>  
    </div>

    <div class="app-field clearfix" mod="imgNav" style="position: relative;">
      <ul class="control-group clearfix custom-nav-4">
        <li><a href="#" title="" class="custom-url"><img src="http://cdn.pic.youzhipai.cn/pic/readPic?begin=2581755643&amp;end=2581765223" style="display: block;"></a></li>
        <li><a href="#" title="" class="custom-url"><img src="http://cdn.pic.youzhipai.cn/pic/readPic?begin=2581765223&amp;end=2581775645" style="display: block;"></a></li>
        <li><a href="#" title="" class="custom-url"><img src="http://cdn.pic.youzhipai.cn/pic/readPic?begin=2581775645&amp;end=2581784495" style="display: block;"></a></li>
        <li><a href="#" title="" class="custom-url"><img src="http://cdn.pic.youzhipai.cn/pic/readPic?begin=2581784495&amp;end=2581793851" style="display: block;"></a></li>
      </ul>
    </div>
    <goodsItem :goodsList="goodsList"></goodsItem> 
 
    <v-menu :show="menuShow"></v-menu>
  </div>
</template>

<script>
import vMenu from '../../components/menu/menu.vue'
import {Box, XHeader, Group, XButton, XInput, Scroller} from 'vux'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import goodsItem from '../../components/goodsItem'
import { requestGetHomeGoods } from '../../api/api'
import {mapState} from 'vuex'

export default {
  components: {
    XHeader,
    Group,
    XButton,
    XInput,
    Box,
    swiper,
    swiperSlide,
    goodsItem,
    vMenu,
    Scroller
  },
  data: function () {
    return {
      goodsList: [],
      swiperOption: {
        autoplay: 5000
      }
    }
  },
  mounted: function () {
    this.getHomeGoods()
  },
  methods: {
    isShow () {
      this.$store.commit('UPDATE_MENUSHOW')
    },
    getHomeGoods () {
      requestGetHomeGoods().then(data => {
        this.goodsList = data
      })
    }
  },
  computed: {
    ...mapState([
      'headerTitle', 'menuShow'
    ])
  }
}
</script>

<style scoped lang="less">
.swiper-img img{
  width: 100%;
}


.app-field .control-group {
    position: relative;
    width: 100%;
    /* margin: 0 0 3px; */
}

.custom-nav-4 li {
    width: 25%;
    list-style: none;
}

.control-group li a {
    display: block;
    width: 100%;
    height: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.custom-nav-4 li {
    overflow: hidden;
    float: left;
    background-color: #fff;
}
.custom-nav-4 li img {
    display: none;
    width: 100%;
    margin: 0 auto;
}

</style>
