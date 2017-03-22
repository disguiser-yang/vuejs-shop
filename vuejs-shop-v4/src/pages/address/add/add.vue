<template>
  <div>
      <x-header :left-options="{showBack: true,backText:'返回'}" style="background-color:#ED5564;">新建收货人</x-header> 
      <group>
        <x-input title="收货人：" name="username" placeholder="请输入姓名" is-type="china-name"></x-input>
      </group>

      <group>
        <x-input title="手机号码：" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
      </group>
      <group>
        <x-address @on-hide="logHide" @on-show="logShow" title="所在地区：" v-model="value" :list="addressData" placeholder="请选择地址" ></x-address>
        <cell title="上面value值" :value="value"></cell>
      </group>
      <group>
        <x-input title='详细地址：' :max="30"  ></x-input>
      </group>
       <x-button type="warn" style='margin-top:1rem;'>保存</x-button>
       
  </div>
</template>

<script>
import {XHeader, XAddress, ChinaAddressData, Group, Cell, XInput, XButton} from 'vux'
export default{
  components: {
    XHeader,
    Group,
    XAddress,
    Cell,
    XInput,
    XButton
  },
  data () {
    return {
      value: [],
      addressData: ChinaAddressData,
      areaValue: []
    }
  },
  methods: {
    changeData () {
      this.value2 = ['430000', '430400', '430407']
    },
    logHide (str) {
      console.log('on-hide', str)
    },
    logShow (str) {
      console.log('on-show')
    }
  }
}
</script>
<style >

</style>
