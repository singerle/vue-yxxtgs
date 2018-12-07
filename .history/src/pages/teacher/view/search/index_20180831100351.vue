<template>
  <transition name="register">
    <div class="register-wrapper">
      <!-- <my-header :title="title" @back="back"></my-header> -->
      <ul class="search-wrapper">
        <li class="items"><span class="item item-left">搜索类型</span><span class="item item-right" @click="open">{{types[type]}}<i style="margin-left: 5px">></i></span></li>
        <li class="items"><span class="item item-left">搜索内容</span> <input class="item item-right" placeholder="请输入搜索内容" v-model="input"> </li>
      </ul>
      <btn-wrapper class="btn-wrapper" @dispose="dispose" :text="text" :btnstate="btnstate"></btn-wrapper>
      <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
  </transition>
</template>

<script>
import myHeader from 'teacher/component/header'
import btnWrapper from 'teacher/component/btnWrapper'
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    myHeader, btnWrapper
  },
  data () {
    return {
      title: '搜索',
      type: 0,
      types: ['学号', '考生号', '准考号'],
      input: '',
      sheetVisible: false,
      actions: [],
      text: '搜索',
      btnstate: 0
    }
  },
  methods: {
    back() {
      this.$router.push({path: '/'})
    },
    open() {
      this.sheetVisible = !this.sheetVisible
    },
    selectcode() {
      this.type = '0'
    },
    selectStudent() {
      this.type = '1'
    },
    selectPremssion() {
      this.type = '2'
    },
    dispose() {
      if (this.input === '') {
        this.prop('请输搜索内容')
        return
      }
      this.setType(this.type)
      this.setCode(this.input)
      // 跳转到队员的界面
      this.$router.push({path: `/${this.search}`})
    },
    ...mapMutations({
      'setType': 'SET_TYPE',
      'setCode': 'SET_CODE'
    })
  },
  computed: {
    ...mapGetters([
      'search'
    ])
  },
  mounted () {
    this.actions = [{
        name: '学号',
        method: this.selectcode
      }, {
        name: '考生号',
        method: this.selectStudent
      }, {
        name: '准考号',
        method: this.selectPremssion
    }]
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.register-enter-active, .register-leave-active
  transition all .3s
.register-enter, .register-leave-to
  transform translate3d(100%, 0, 0)
.register-wrapper
  position fixed
  left 0
  top 0
  bottom 0
  right 0
  overflow-y auto
  background $color-background-d
  .search-wrapper
    background-color $color-background
    .items
      height 44px
      box-sizing border-box
      border-top 1px solid #e9e9e9
      display flex
      padding 0 12px
      .item
        height 100%
        color  $color-font-nav
        font-size $font-size-medium
        line-height 43px
      .item-right
        flex 1
        border none 
        outline none 
        text-align right
    .btn-wrapper
      margin-top 10px
</style>
