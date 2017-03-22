<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <loading v-show="isLoading"></loading>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    Loading
  },
  computed: {
    ...mapState([
      'isLoading'
    ])
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

.swiper-img img{
  width: 100%;
}

html, body {
    height: 100%;
    width: 100%;
    background-color: #f2f2f2;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}

.slide-fade-enter
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
