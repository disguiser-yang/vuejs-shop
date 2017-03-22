<template>
  <div>
     <x-header :left-options="{showBack: true,backText:'返回'}" style="background-color:#ED5564;">详情</x-header> 

     <swiper :options="swiperOption" class="swiper-img" ref="mySwiperA">
      <swiper-slide><img src="../../assets/images/banner1.jpeg" /></swiper-slide>
      <swiper-slide><img src="../../assets/images/banner2.jpeg" /></swiper-slide>
     </swiper>

     <div class="item title_d"><h5>{{ this.goodsInfo.goods_name }}</h5><span class="shop_price red">￥{{ this.goodsInfo.goods_price }}</span><span class="market_price gray">￥{{ this.goodsInfo.goods_marketprice }}</span></div>

     <div class="item description_d border_bottom">

     </div>
  

  <div class="item comment_d">
    <div class="comment_a">
        <span>
            评价
        </span>
        <span class="good_comment_rate">
            好评度
            <em class="red">
                100%
            </em>
        </span>
        <span>
            44人评价
        </span>
        <img class="sale_infos_icon pull-right" src="../../assets/images/productpage_arrow@2x.png">
    </div>
    <ul>
        <li class="border_bottom" v-for="item in commentList">
            <div>
                <span>
                    <rater v-model="item.rater_num" slot="value" :font-size="15" disabled>
                    </rater>
                </span>
                <div class="pull-right">
                    <span>
                        {{ item.member_phone }}
                    </span>
                    <span class="gray comment_time">
                        2017-02-10
                    </span>
                </div>
            </div>
            <div class="comment_content">
                {{ item.comment_content }}
            </div>
        </li>
    </ul>


    <router-link :to="{ path: '/cart' }">
			<a href="javascript:void(0);" class="animation-up buy-now">立即购买</a>
	</router-link>
</div>



<div class="goods-detail-foot">
		<div class="otreh-handle">
			<a href="javascript:void(0);" class="kefu">
      <i></i><p>客服</p></a>
        <a href="/cart" class="cart" >
          <i></i><p>购物车</p>
                    <span id="cart_count">
                        <sup v-if="totalNum">
                          {{totalNum}}
                        </sup>
                    </span>
          </a>

		</div>
	<div class="buy-handle ">
		
		<a href="javascript:void(0);"  class="animation-up add-cart">立即购买</a>
		
		<a href="javascript:void(0);" @click="cartMask()" class="animation-up buy-now">加入购物车</a>
	</div>
</div>



<div id="product_detail_spec_html" class="nctouch-bottom-mask"  v-bind:class="{ up: showCartMask,down: !showCartMask }" >
    <div class="nctouch-bottom-mask-bg" @click="cartMask()"></div>
<div class="nctouch-bottom-mask-block">
	<div class="nctouch-bottom-mask-tip"><i></i>点击此处返回</div>
	<div class="nctouch-bottom-mask-top goods-options-info">
		<div class="goods-pic">
		<img src="http://www.b2b2c.com/data/upload/shop/common/default_goods_image_360.gif">
	</div>
	<dl>
		<dt>{{ this.goodsInfo.goods_name }}</dt>
		<dd class="goods-price">
		
					￥<em>{{ this.goodsInfo.goods_price }}</em>
				
			<span class="goods-storage">库存：{{ this.goodsInfo.goods_storage }}件</span>
		</dd>
	</dl>
	<a href="javascript:void(0);" class="nctouch-bottom-mask-close" @click="cartMask()" ><i></i></a>
</div>
<div class="nctouch-bottom-mask-rolling" id="product_roll">
	<div class="goods-options-stock" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
		
		
		<dl class="spec">
			<dt spec_id="">
				颜色：
			</dt>
			<dd>
				
					<a href="javascript:void(0);" specs_value_id="222">
						蓝色
					</a>
				
					<a href="javascript:void(0);" specs_value_id="224">
						绿色
					</a>
				
					<a href="javascript:void(0);" specs_value_id="225">
						梅红
					</a>
				
					<a href="javascript:void(0);" class="current" specs_value_id="226">
						黑色
					</a>
				
			</dd>
		</dl>
		
		
		
		
		
		
	</div>
</div>
<div class="goods-option-value">购买数量
	<div class="value-box">
		<span class="minus" v-on:click="valueMinus">
			<a href="javascript:void(0);">&nbsp;</a>
		</span>
		<span>
			<input type="text" pattern="[0-9]*" class="buy-num" id="buynum" readonly="readonly" v-bind:value="buyNum">
		</span>
		<span class="add" v-on:click="valueAdd">
			<a href="javascript:void(0);">&nbsp;</a>
		</span>
	</div>
</div>
<div class="goods-option-foot">
	<div class="otreh-handle">
		<a href="javascript:void(0);" class="kefu">
			<i></i>
		<p>客服</p>
		</a> 
 
      <a href="../tmpl/cart_list.html" class="cart">
        <i></i>
        <p>购物车</p>
          
		
	 
        <span id="cart_count">
                      <sup v-if="totalNum">
                        {{totalNum}}
                      </sup>
              </span>
      </a>

	</div>
	<div class="buy-handle ">
		
		<a href="javascript:void(0);" class="add-cart" id="add-cart">立即购买</a>
		
		<a href="javascript:void(0);" class="buy-now" @click="addCart()" id="buy-now">加入购物车</a>
	</div>
</div>

</div></div>


<toast v-model="isShow" :time="500" type="text">添加成功</toast>

</div>



</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Group, XHeader, Rater, XNumber, Toast } from 'vux'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { requestGetGoodsComment, requestGetGoodsInfo } from '../../api/api'
export default {
  components: {
    swiper,
    swiperSlide,
    XHeader,
    Rater,
    XNumber,
    Group,
    Toast
  },
  data: function () {
    return {
      data3: 5,
      swiperOption: {
        autoplay: 5000
      },
      commentList: [],
      showCartMask: false,
      cartNum: 0,
      buyNum: 1,
      isShow: false,
      goodsInfo: []

    }
  },
  mounted: function () {
    this.getGoodsComment()
    this.getGoodsInfo()
  },
  computed: {
    ...mapState([
      'cartList'
    ]),
    // 购物车中总共商品的数量
    totalNum: function () {
      return this.cartNum
    },
    // 当前商店购物信息
    shopCart: function () {
      return {...this.cartList}
    }
  },
  created () {
    this.INIT_BUYCART()
    this.initCategoryNum()
  },
  methods: {
    ...mapMutations([
      'ADD_CART', 'INIT_BUYCART'
    ]),
    getGoodsComment () {
      requestGetGoodsComment(this.$route.params.id).then(data => {
        this.commentList = data
      })
    },
    getGoodsInfo () {
      requestGetGoodsInfo(this.$route.params.id).then(data => {
        this.goodsInfo = data
      })
    },
    cartMask () {
      this.showCartMask = !this.showCartMask
    },
    addCart () {
      this.ADD_CART({goodsId: this.goodsInfo.goods_id, goodsName: this.goodsInfo.goods_name, goodsNum: this.buyNum, goodsProPrice: this.goodsInfo.goods_promotion_price})
      this.isShow = true
      this.showCartMask = false
      this.buyNum = 1
    },
    initCategoryNum () {
      let num = 0
      Object.keys(this.cartList).forEach(itemId => {
        num += this.cartList[itemId]['goods_num']
      })

      this.cartNum = num
    },
    valueMinus () {
      if (this.buyNum > 1) {
        this.buyNum = this.buyNum - 1
      }
    },
    valueAdd () {
      this.buyNum = this.buyNum + 1
    }

  },
  watch: {
    shopCart: function (value) {
      this.initCategoryNum()
    }
  }
}
</script>

<style lang='less' scoped>
.swiper-img img{
  width: 100%;
}


.border_bottom {
    border-bottom: 1px #e5e5e5 solid;
}

/*title标题*/
.title_d{text-align: center;padding-bottom: 10px;background-color: #fff}
.title_d h5{font-size: 16px;line-height: 20px;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;padding: 0 10px;  }
.title_d .shop_price{font-size: 18px;}
.title_d .market_price,.text_gray.market_price{font-size: 12px;padding-left: 10px;text-decoration: line-through;}
#d0 .banner_tag{left:0;top:50px;z-index:1;font-size: 16px;}

.comment_a .sale_infos_icon{width: 30px;height:30px;}
.pull-right {
    float: right;
}

/*comment评价*/
.comment_d{padding: 15px 10px 0px 10px;background-color: #fff}
.comment_d .comment_a{color: #999;font-size: 12px;width: 100%;display: inline-block;line-height: 30px;}
.comment_d .comment_a .good_comment_rate{padding: 0 10px;}
.comment_d .comment_a .good_comment_rate em{font-style: normal;}
.comment_d .comment_a i{font-weight: normal;}
.comment_d ul{padding-left: 0;margin-bottom: 0}
.comment_d ul li{padding:15px 5px;font-size: 12px;}
.comment_d ul li .comment_content{font-size: 13px;}
.comment_d ul li:last-child{border-bottom: none}
.comment_d li .comment_content{padding-top: 8px;}
.comment_d .comment_time{padding-left: 5px;}
.comment_d .buy-now{font-size:0.7rem;}

.glyphicon {
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
/*商品详情底部*/
.goods-detail-foot { position: fixed; z-index: 1; top: auto; left: 0; right: 0; bottom: 0; height: 44px; filter:progid:DXImageTransform.Microsoft.gradient(enabled='true',startColorstr='#F2F5F5F5', endColorstr='#F2F5F5F5');background:rgba(245,245,245,0.95);}
.goods-detail-foot { height: 44px; filter:progid:DXImageTransform.Microsoft.gradient(enabled='true',startColorstr='#F2F5F5F5', endColorstr='#F2F5F5F5');background:rgba(245,245,245,0.95);}
.goods-option-foot { position: absolute; z-index:1; bottom: 0; left: 0; right: 0;}
.goods-detail-foot .otreh-handle,
.goods-option-foot .otreh-handle { float: left; width: 35%; font-size: 0;}
.goods-detail-foot .otreh-handle a,
.goods-option-foot .otreh-handle a { position: relative; z-index: auto; display: inline-block; height: 43px; text-align: center; color: #333; border-top: solid 0.05rem #DDD;}
.goods-detail-foot .otreh-handle a.kefu,
.goods-option-foot .otreh-handle a.kefu { width: 44%;}
.goods-detail-foot .otreh-handle a.cart,
.goods-option-foot .otreh-handle a.cart { width: 55%; border-left: solid 0.05rem #DDD;}
.goods-detail-foot .otreh-handle a i,
.goods-option-foot .otreh-handle a i { display: inline-block; width: 0.9rem; height: 20px; margin: 0.15rem auto 0.05rem auto; background-repeat: no-repeat; background-position: 50% 50%; background-size: 80%; opacity: 0.65;}
.goods-detail-foot .otreh-handle a.kefu i,
.goods-option-foot .otreh-handle a.kefu i { background-image: url(../../assets/images/kefu_b.png);}
.goods-detail-foot .otreh-handle a.cart i,
.goods-option-foot .otreh-handle a.cart i { background-image: url(../../assets/images/cart_b.png);}
.goods-detail-foot .otreh-handle a p,
.goods-option-foot .otreh-handle a p { display: block; height: 0.8rem; font-size: 12px; line-height: 16px; }
.goods-detail-foot .otreh-handle a sup, 
.goods-option-foot .otreh-handle a sup { position: absolute; z-index: 1; top: 0.1rem; right: 0.5rem; min-width: 14px; height:14px; font-size: 10px; line-height: 12px; color: #ED5564; text-align: center; border: solid 0.05rem #ED5564; border-radius: 8px; }
.goods-detail-foot .buy-handle,
.goods-option-foot .buy-handle { float: right; width: 65%; font-size: 0;}
.goods-detail-foot .buy-handle a,
.goods-option-foot .buy-handle a { display: block; height: 44px; font-size: 14px;  line-height: 44px; color: #FFF; text-align: center;}
.goods-detail-foot .no-buy a,
.goods-option-foot .no-buy a { filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale"); /* Firefox 3.5+ */ -webkit-filter: grayscale(100%); -moz-filter: grayscale(100%); -ms-filter: grayscale(100%); -o-filter: grayscale(100%); filter: grayscale(100%); filter: gray; opacity: 0.8;}
.goods-detail-foot .buy-handle a.add-cart,
.goods-option-foot .buy-handle a.add-cart { float: right; width: 55%; background-color: #FB6E52;}
.goods-detail-foot .buy-handle a.buy-now,
.goods-option-foot .buy-handle a.buy-now { background-color: #ED5564;}




/*页内全屏遮罩层*/
.nctouch-full-mask { position: fixed; z-index: 19; top: 0; bottom: 0;}
.nctouch-full-mask-bg { display: block; position: absolute; z-index: 11; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.75); }
.nctouch-full-mask-block { display: block; position: absolute; z-index: 12; top: 0; bottom: 0; left: 0; right: 0; background: #F5F5F5; box-shadow: -0.25rem 0 0.2rem rgba(0,0,0,0.2); }
.nctouch-full-mask.left { display: block; left: 0; right: 0; animation: optionBlockLeft 0.3s ease-in-out; -webkit-animation:optionBlockLeft 0.3s ease-in-out;}
@keyframes optionBlockLeft
{
from { display: none; left: 100%; right:-100%;}
to { display: block; left: 0; right:0;}
}
@-webkit-keyframes optionBlockLeft
{
from { display: none; left: 100%; right:-100%;}
to { display: block; left: 0; right:0;}
}
.nctouch-full-mask.right { left: 110%; right: -110%; animation: optionBlockRight 0.5s ease-in-out; -webkit-animation:optionBlockRight 0.5s ease-in-out;}
@keyframes optionBlockRight
{
from { display: block; left: 0; right:0;}
to { display: none; left: 110%; right: -110%;}
}
@-webkit-keyframes optionBlockRight
{
from { display: block; left: 0; right:0;}
to { display: none; left: 110%; right: -110%;}
}



/*页内下部滑入遮罩*/
.nctouch-bottom-mask { position: fixed; z-index: 20; top: 0; left: 0; right: 0; display: block;}
.nctouch-bottom-mask-bg { display: block; position: absolute; z-index: 21; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.65);}
.nctouch-bottom-mask-block {display: block;position: absolute;z-index: 22;bottom: 0;left: 0;right: 0;min-height: 12rem;background: #FFF;}
.nctouch-bottom-mask.up { display: block; bottom: 0; animation: optionBlockUp 0.5s ease-in-out; -webkit-animation:optionBlockUp 0.5s ease-in-out;}
@keyframes optionBlockUp
{
from { display: none; bottom:-100%;}
to { display: block; bottom:0;}
}
@-webkit-keyframes optionBlockUp
{
from { display: none; bottom:-100%;}
to { display: block; bottom:0;}
}
.nctouch-bottom-mask.down { animation: optionBlockDown 0.5s ease-in-out; -webkit-animation:optionBlockDown 0.5s ease-in-out;}
@keyframes optionBlockDown
{
from { display: block; bottom:0;}
to { display: none; bottom:-100%;}
}
@-webkit-keyframes optionBlockDown
{
from { display: block; bottom:0; opacity: 1;}
to { display: none; bottom:-100%; opacity: 0;}
}
.nctouch-bottom-mask-tip { position: absolute; z-index: 1; top: -1.2rem; left: 0; right: 0; text-align: center; font-size: 0.6rem; font-weight: 600; line-height: 0.9rem; color: #FFF; text-shadow: 0 0 0.5rem rgba(0,0,0,0.5);}
.nctouch-bottom-mask-tip i { background-image: url('../../assets/images/back_down.png'); background-repeat: no-repeat; background-position: 50% 50%; background-size: 75%; width: 0.8rem; height: 0.9rem; display: inline-block; vertical-align: top; margin-right: 0.1rem;}
.nctouch-bottom-mask-top { position: relative; z-index: 1; display: block; padding: 0.5rem; border-bottom: solid 0.05rem #EEE;}
.nctouch-bottom-mask-close { position: absolute; z-index: 1; top: -0.6rem; right: 0; background: #FFF; width: 0.9rem; height: 0.9rem; padding: 0.15rem; border-radius: 100%;}
.nctouch-bottom-mask-close i { display: block; width: 100%; height: 100%; background-image: url('../../assets/images/close_window.png'); background-repeat: no-repeat; background-position: 50% 50%; background-size: 100%; opacity: 0.5rem;}
.nctouch-bottom-mask-rolling { min-height: 1.9rem; max-height: 12rem; overflow: hidden; position: relative; z-index: 1;}



/*商品详情选项*/
.goods-options-info { min-height: 3rem;}
.goods-options-info .goods-pic { position: absolute ; z-index: 1; top: 0.5rem; left: 0.5rem; width: 3rem; height: 3rem; background: #FFF;}
.goods-options-info .goods-pic img { width: 100%; height: 100%;}
.goods-options-info dl { margin-left: 4rem;}
.goods-options-info dt { font-size: 0.6rem; line-height: 0.75rem; margin: 0.2rem 0.6rem 0.4rem 0;}
.goods-options-info .goods-price { height: 1rem; font-size: 0.55rem; color: #DB4453; font-weight: 600; line-height: 1rem;}
.goods-options-info .goods-price em { font-size: 0.66rem;}
.goods-options-info .goods-price .activity { display: inline-block; height: 0.7rem; vertical-align: top; padding: 0 0.1rem; margin: 0.14rem 0 0 0.1rem; font-size: 0.45rem; line-height: 0.7rem; font-weight: lighter; color: #FFF; background-color: #ED5564; border-radius: 0.1rem;}
.goods-options-info .goods-storage { display: block; float: right; font-size: 0.5rem; line-height: 1rem; color: #888;}

.goods-options-stock { padding: 0.25rem 0.5rem;}
.goods-options-stork dl { display: block; overflow: hidden;}
.goods-options-stock dt { display: block; height: 0.9rem; padding: 0.1rem 0; font-size: 0.6rem; color: #888; line-height: 0.9rem;}
.goods-options-stock dd { display: block; font-size: 0rem;}
.goods-options-stock dd a { display: inline-block; height: 0.9rem; padding: 0.25rem 0.5rem; margin-left: 0.3rem; margin-bottom: 0.3rem; font-size: 0.55rem; color: #888; line-height: 0.9rem; background: #FFF; border: solid 0.05rem #BBB; border-radius: 0.15rem;}
.goods-options-stock dd a:first-child { margin-left: 0;}
.goods-options-stock dd a.current { padding: 0.28rem 0.53rem; color: #FFF; background: #ED5564; border: none;}
.goods-option-value { display: block; height: 40px; padding: 0.5rem; margin-bottom: 80px; line-height: 1.2rem; font-size: 0.6rem; color: #999; border-top: solid 0.05rem #EEE;}

.goods-detail-bottom { margin: 0.5rem 0 2.5rem 0; text-align: center;}
.goods-detail-bottom a { display: inline-block; width: 100%; height: 1rem; margin: 0 auto; font-size: 0.6rem; line-height: 1rem; color: #999;}





.value-box { display: inline-block; float: right; font-size: 0; border: solid 0.05rem #CCC; border-radius: 0.2rem;}
.value-box span { display: inline-block; vertical-align: top; line-height: 0;}
.value-box span a { display: block; width: 0.4rem; height: 0.4rem; margin: 0.4rem; opacity: 0.65;}
.value-box span.add { background-color: #FAFAFA; border-radius: 0 0.2rem 0.2rem 0;}
.value-box span.minus { background-color: #FAFAFA; border-radius: 0.2rem 0 0 0.2rem;}
.value-box span.add a {background-image: url(../../assets/images/value_add.png);  background-repeat: no-repeat; background-repeat: 50% 50%; background-size: 100%;}
.value-box span.minus a {background-image: url(../../assets/images/value_minus.png);  background-repeat: no-repeat; background-repeat: 50% 50%; background-size: 100%;}
.value-box span .buy-num { width: 1.2rem; height: 1.2rem; padding: 0; font-size: 0.6rem; font-weight: lighter; line-height: 1.3rem; text-align: center; border: solid #CCC; border-width: 0 0.05rem; border-radius: 0;}

</style>
