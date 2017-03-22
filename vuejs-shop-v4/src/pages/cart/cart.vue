<template>
  <div style=' font-size: 16px;'>
      <x-header :left-options="{showBack: true,backText:'返回'}" :right-options="{showMore: true}" @on-click-more="showMenus = true" style="background-color: rgb(237, 85, 100);">购物车</x-header> 
       <div v-transfer-dom>
          <confirm
            @on-confirm="onConfirm"
          </confirm>
      </div>
      <toast></toast>
      <div class='flex_box' v-for='(value, key, index) in cartList'>
          <div class='flex_box_checklist'>
            <div class="checkbox">
              <input type="checkbox" v-model="value.is_selected" :id='key' class='checkboxInput' v-on:click='select_item(key)'/>
              <label :for="key"></label>
            </div>
          </div>
          <div class='flex_box_img'>
              <img src="http://preview.quanjing.com/ing037/ing_19035_00779.jpg"  alt="上海鲜花港 - 郁金香" />
          </div>
          <div class='flex_box_title'>
            <a class='del' href="javascript:;" v-on:click='showPlugin(key)' >删除</a>
            <div class='flex_box_title_head'>
              <span>{{value.goods_name}}</span>  
           </div>
           <div class='flex_box_title_detail'>
              <span>已选套餐:套餐一</span>
           </div>
         
           <div class='flex_box_title_price clearfix'>
               <span>&#65509 {{value.goods_num*value.goods_promotion_price}}</span>
              <div class='flex_box_title_number clearfix'>
                  <div class='flex_box_title_number_change'>
                    <span class='flex_box_title_number_minus' v-on:click='value_minus(key)'>
                      <a href="javascript:;"></a>
                    </span>
                    <span>
                    <input v-model='value.goods_num' class="vux-number-input number_input" readonly="readonly" pattern="[0-9]*" type="number" style="width: 50px;"></input>
              
                    </span>
                    <span class='flex_box_title_number_plus' v-on:click='value_add(key)'>
                      <a href="javascript:;" ></a>
                    </span>
                  </div>
              </div>
           </div>
         
         </div>
       </div>

      <div class='select_all_bar' v-if='!isShow' style=" position:fixed;bottom:0rem;">
          <div class='select_all_bar_left'>
              <div class="checkbox select_all">
                <input type="checkbox" id="selectAll" name="" />
                <label for="selectAll" v-bind:class='{ checked: selectStatus, unchecked: !selectStatus}' ></label>
              </div>
              <div class='select_all_text'>全选</div>
              <label class='select_a_btn'  for="selectAll" v-on:click='select_all' ></label>
         </div>

        <div class='select_all_left_m'>
          <div>
            合计：&#65509{{totalMoney}}
          </div>
        </div>
        
        <div class='select_all_bar_right'>
            <a href="javascript:;">去结算({{totalNumber}})</a>
        </div>
      </div>

      <div class='cart_empty' v-if='isShow'>
            <div class='cart_img'>
              <img src='../../assets/images/cart_empty.png'>
              <span>亲，购物车空空的耶，赶紧去挑选点好东西吧！</span>
              <router-link :to="{ path: '/home' }">
                <x-button  plain type="primary" style="border-radius:99px;">去挑选</x-button>
              </router-link>
            </div>
      </div>

    <actionsheet :menus="menus" v-model="showMenus"  @on-click-menu-delete="onDelete" show-cancel></actionsheet>
    <toast v-model="showSuccess">{{('清空完成') }}</toast>
  </div>
</template>

<script>
  import {Confirm, Toast, Actionsheet, ConfirmPlugin, Group, numberComma, XHeader, Checklist, Flexbox, FlexboxItem, Icon, XButton, XNumber, TransferDomDirective as TransferDom} from 'vux'
  import store from '../../store/store'
  import { mapMutations } from 'vuex'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Confirm,
      XHeader,
      Checklist,
      Flexbox,
      FlexboxItem,
      Icon,
      XButton,
      XNumber,
      Group,
      ConfirmPlugin,
      Toast,
      Actionsheet
    },
    data () {
      return {
        show: false,
        menus: {
          'title.noop': '清空购物车?<br/><span style="color:#666;font-size:12px;">一旦清空购物车，只能重新添加商品</span>',
          delete: '<span style="color:red">清空</span>'
        },
        showMenus: false,
        showSuccess: false
      }
    },
    mounted () {
      store.commit('INIT_BUYCART')
    },
    updated () {
      store.commit('INIT_BUYCART')
    },
    methods: {
      ...mapMutations([
        'ADD_CART', 'INIT_BUYCART', 'SELECT_ITEM', 'SELECT_ALL', 'DELETE_ALL']),
      value_minus (key) {
        this.ADD_CART({goodsId: this.cartList[key].goods_id, goodsName: this.cartList[key].goods_name, goodsNum: this.cartList[key].goods_num - 1, setCartNum: 'minus'})
      },
      value_add (key) {
        this.ADD_CART({goodsId: this.cartList[key].goods_id, goodsName: this.cartList[key].goods_name, goodsNum: this.cartList[key].goods_num + 1, setCartNum: 'add'})
      },
      delete_goods (key) {
        this.ADD_CART({goodsId: this.cartList[key].goods_id, goodsName: this.cartList[key].goods_name, goodsNum: this.cartList[key].goods_num + 1, setCartNum: 'delete'})
      },
      delete_all () {
        this.DELETE_ALL()
      },
      select_item (key) {
        this.SELECT_ITEM({goodsId: this.cartList[key].goods_id})
      },
      select_all () {
        this.SELECT_ALL()
      },
      showPlugin (key) {
        const _this = this
        this.$vux.confirm.show({
          title: '确定删除此商品吗？',
          content: ' ',
          onConfirm () {
            _this.delete_goods(key)
            _this.$vux.toast.show({
              type: 'text',
              text: '删除成功',
              time: 500
            })
          }
        })
      },
      onDelete () {
        this.delete_all()
        this.showSuccess = true
      }
    },
    actions: {
    },
    computed: {
      isShow () {
        return (Object.keys(this.$store.state.cartList).length === 0)
      },
      cartList () {
        return this.$store.state.cartList
      },
      selectStatus () {
        let status = true
        let cart = this.$store.state.cartList
        for (var key in cart) {
          if (cart[key]['is_selected'] === false) {
            status = false
          }
        }
        if (status === true) {
          this.$store.state.selectAll = true
        } else {
          this.$store.state.selectAll = false
        }
        return status
      },
      totalMoney () {
        let cart = this.$store.state.cartList
        let price = 0
        for (var key in cart) {
          if (cart[key]['is_selected'] === true) {
            price += cart[key]['goods_num'] * cart[key]['goods_promotion_price']
          }
        }
        return numberComma(price)
      },
      totalNumber () {
        let cart = this.$store.state.cartList
        let number = 0
        for (var key in cart) {
          if (cart[key]['is_selected'] === true) {
            number += cart[key]['goods_num']
          }
        }
        return number
      }
    }
  }
</script>

<style scoped>
body,html{
  font-size: 16px;
}
.vue-number-a{
    padding: 2px;
    border: 1px solid #3cc51f;
    text-align: center;
    width: 20px;
    border-radius: 13px;
}

.flex_box{
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  background-color:#ececec;
  padding:0.1rem 0.1rem 0.1rem 0rem;
  align-items:stretch;
  margin-bottom:0.3rem;
}
.flex_box_checklist{
   width:10%;
   position: relative;
}
.checkbox {
    width: 20px;
    height: 20px;

    border-radius: 100%;
    position: absolute;
    top:50%;
    left:50%;
    -webkit-transform:translate(-10px,-10px);

}
.checkbox label {
    display: block;
    width: 20px;
    height:20px;
    border-radius: 100px;
    -webkit-transition: all .25s ease;
    -moz-transition: all .25s ease;
    -o-transition: all .25s ease;
    -ms-transition: all .25s ease;
    transition: all .25s ease;
    cursor: pointer;
    position: absolute;
    top: 1px;
    left: 1px;
    z-index: 1;
    /*background: 9d9ea7;*/
     background: url(../../assets/images/check.png) no-repeat;
    /*-webkit-box-shadow:inset 0px 1px 3px rgba(0,0,0,0.5);
    -moz-box-shadow:inset 0px 1px 3px rgba(0,0,0,0.5);
    box-shadow:inset 0px 1px 3px rgba(0,0,0,0.5);*/
}
.checkboxInput{
  display: none;
}
.checkbox input[type=checkbox]:checked + label {
   background: url(../../assets/images/checked.png) no-repeat;
}
.checked{
  background: url(../../assets/images/checked.png) no-repeat!important;
}
.unchecked{
  background: url(../../assets/images/check.png) no-repeat!important;
}
.flex_box_img{
  width:30%;
  overflow: hidden;
}
.flex_box_img img{
  width:100%;
  height: 100%;
  border:0.01rem solid #ccc;
  border-radius:0.1rem;
}
.flex_box_title{
  width: 60%;
  line-height: 1rem;
  position: relative;
 
}
.flex_box_title_head{
  color:#232326;
  font-size: 0.66rem;
  width:80%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  padding-left: 0.2rem;
}
.flex_box_title a.del{
  color:#81838e;
  font-size: 0.66rem;
  position: absolute;
  right: 0rem;
  top: 0rem;
}
.flex_box_title_price{
  padding-left: 0.2rem;
  padding-top:0.5rem;
}
.flex_box_title_price span{
  color:#f23030;
  line-height: 34px;
  height: 34px;
  font-size: 0.66rem;
  float:left;
}
.flex_box_title_number{
  width:70%;
  float:right;
  padding-right: 0.2rem;
}
.flex_box_title_head,.flex_box_title_detail{
  overflow:hidden; 
  text-overflow:ellipsis; 
  white-space:nowrap; 
  word-break:keep-all; 
}
.flex_box_title_detail{
  font-size:0.5rem;
  color:#81838e;
   padding-left: 0.2rem;
}

.flex_box_title_number_change{
  border:1px solid #cbcbcb;
  overflow:hidden;
  width:118px;
  height: 32px;
  float:right;
  border-radius:4px;
  /*position: absolute;*/
  right:0rem;
  bottom:0rem;
}

.flex_box_title_number_change span{
  float: left;
  background-color: #fff;
}
.flex_box_title_number_change span a{
   display:block;
   width:32px;
   height:32px;
 
}
.number_input{
  height:24px;
}
.flex_box_title_number_change span.flex_box_title_number_minus{
  border-right: 1px solid #cbcbcb;
}
.flex_box_title_number_change span.flex_box_title_number_plus{
  border-left: 1px solid #cbcbcb;
}
.flex_box_title_number_change span.flex_box_title_number_plus a{
   background: url(../../assets/images/value_add.png) no-repeat;
   background-position: 50% 50%;
   background-size: 50%;
}
.flex_box_title_number_change span.flex_box_title_number_minus a{
   background: url(../../assets/images/value_minus.png) no-repeat;
   background-position: 50% 50%;
   background-size: 50%;
}
.select_all_bar{
  height: 50px;
  width: 100%;
  /*border:1px solid red;*/
  display: -webkit-flex;
  -webkit-transform: translateZ(0);
}
.select_all_bar_left{
  position: relative;
  display: -webkit-box;
  border-top: 1px solid #dedede;
  width:30%;
  height: 50px;
  text-align: left;
  line-height: 48px;
  background: rgba(255, 255, 255,0.95);
  /*background: url(../../assets/images/bar_bg_left.png) repeat-x 0 0;*/
}
.select_all_text{
  position: absolute;
  top: 50%;
  left: 55%;
  font-size: 16px;
  text-align:center;
  transform: translate(-50%, -50%);
}
.select_all{
  position: absolute;
  top: 50%;
  left: 16.66%;
  text-align:center;
  color:#fff;
  transform: translate(-50%, -50%);
}
.select_all_bar_right{
  width:35%;
  height: 50px;
  background: #F23030;
  /*background: url(../../assets/images/bar_bg_right.png) repeat-x 0 0;*/
  text-align: center;
  line-height: 50px;
}
.select_all_left_m{
  line-height: 48px;
  border-top: 1px solid #dedede;
  background: rgba(255, 255, 255,0.95);
   /*background: url(../../assets/images/bar_bg_left.png) repeat-x 0 0;*/
}
.select_all_bar_right a{
  font-size: 16px;
  color:#fff;
  display: block;
}
.select_all_left_m{
  width:35%;
  height: 50px;
  position: relative;
}
.select_all_left_r{
   width:40%;
    height: 50px;
    line-height: 47px;
}
.select_all input{
  display: none;
}
.select_a_btn{
   z-index: 99;
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
}
.clearfix:after{
     content:" ";        
     display:block;        
     height:0;        
     clear:both;             
    }
.clear_cart{
  color:#fff;
}
.cart_empty{
  background: red;

}
.cart_img{
  width:60%;
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%)
}
.cart_img img{
  display: block;
  width:50%;
  margin:1rem auto;
}
.cart_img span{
  display: block;
  text-align: center;
  margin:1rem 0rem;
  color:#81838e;
}
</style>
