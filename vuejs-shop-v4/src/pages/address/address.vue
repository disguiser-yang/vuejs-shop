<template>
  <div>
      <x-header :left-options="{showBack: true,backText:'返回'}" style="background-color:#ED5564;">地址管理</x-header> 
      <group>
        <div style='padding:5px 10px;'>
                <flexbox >
                    <flexbox-item :span="4"><div class="name">王二小</div></flexbox-item>
                    <flexbox-item><div class="number">18659458841</div></flexbox-item>
                </flexbox>
        </div>
        <div style='padding:5px 10px;font-size: 0.6rem;color:dimgray;'>
            <span>四川省成都市武侯区龙湖金楠天街四川省成都市武侯区龙湖金楠</span>
        </div>
        <hr />
        <div style='padding:5px 10px;'>
             <flexbox >
                <flexbox-item :span="8"><div class="addr_default" v-on:click='setDefault'><i class='icon_i checked'></i><span>默认地址</span></div></flexbox-item>
                <flexbox-item ><div class="addr_default" v-on:click='deleteAddress'><i class='icon_i icon_del'></i><span>删除</span></div></flexbox-item>
            </flexbox>
        </div>
      </group>
       
       <router-link :to="{ path: '/address/add' }" >
            <x-button type="warn" style='margin-top:1rem;'>+  新建地址</x-button>
       </router-link>
       <confirm v-model="show" :title="('confirm deleting the item')"
      </confirm>
  </div>
</template>

<script>
import {XHeader, Flexbox, FlexboxItem, XButton, XAddress, ChinaAddressData, Group, Cell, Confirm} from 'vux'
export default{
  components: {
    XHeader,
    Group,
    XAddress,
    Cell,
    XButton,
    Flexbox,
    FlexboxItem,
    Confirm
  },
  data () {
    return {
      value: '131',
      addressData: ChinaAddressData,
      areaValue: []
    }
  },
  methods: {
    setDefault () {
      console.log('on-hide')
    },
    deleteAddress () {
      this.$vux.confirm.show({
        title: '确定删除该收货地址？',
        content: '删除后只能重新添加'
      })
    }
  }
}
</script>
<style >
hr{
    width: 98%;
    border-top: 1px solid #ddd;
    border-left: none;
    border-right:none;
    border-bottom:none;
    margin:0 auto;
}
.name,.number{
    color:#323232;
}
.addr_default{
    display: flex;
    align-items:center;
    color:dimgray;
    font-size: 0.6rem;
}
.icon_i{
    /*display: inline-block;*/
    margin:0.1rem;
    width: 20px;
    height:20px;
    
}
.checked{
    background:url(../../assets/images/checked.png) no-repeat 0 0;
}
.unchecked{
    background:url(../../assets/images/check.png) no-repeat 0 0;
}
.icon_del{
    background:url(../../assets/images/del.png) no-repeat 0 0;
}
</style>
