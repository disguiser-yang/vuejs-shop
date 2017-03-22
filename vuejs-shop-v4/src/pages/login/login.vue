<template>
  <div>
    <x-header :left-options="{showBack: true,backText:'返回'}" style="background-color:#ED5564;">登陆</x-header> 
    
    <group  class="weui-cells_form">
      <x-input placeholder="请输入手机号" v-model="memberMobile" class="weui-vcode" keyboard="number" is-type="china-mobile">
        <x-button slot="right" type="primary" mini>获取验证码</x-button>
      </x-input>
      <x-input  name="mobile" v-model="memberPassWD" placeholder="验证码" keyboard="number" ></x-input>
    </group>
  	<box gap="10px 10px">
      <x-button type="primary" v-on:click.native="login">登陆</x-button>
  	</box>
    <toast v-model="isShow" type="cancel">{{ noticeMsg }}</toast>
  </div>
</template>

<script>
import { Box, XHeader, Group, XButton, XInput, Toast } from 'vux'
import { requestLogin } from '../../api/api'
import { mapActions } from 'vuex'

export default {
  components: {
    XHeader,
    Group,
    XButton,
    XInput,
    Box,
    Toast
  },
  data: function () {
    return {
      logining: false,
      memberMobile: '13555555555',
      memberPassWD: '',
      userInfo: {},
      isShow: false,
      noticeMsg: ''
    }
  },

  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    login: function (event) {
      var loginParams = { memberMobile: this.memberMobile, memberPassWD: this.memberPassWD }
      requestLogin(loginParams).then(data => {
        let { status, msg, token } = data
        if (status === 201) {
          this.userInfo.token = token
          this.setUserInfo(this.userInfo)
          this.$router.go(-1)
        } else {
          this.isShow = true
          this.noticeMsg = msg
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
