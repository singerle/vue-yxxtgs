<template>
  <div class="header-wrap">
    <p>{{headerTitle.title}}</p>
    <el-row>
      <el-button type="primary" plain class="button" @click="toPage()">{{headerTitle.button}}</el-button>
    </el-row>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    page:{
      type: String,
      default: function () {
        return {
          newpage: 'addedNews'
        }
      }
    },
    headerTitle: {
      type: Object,
      default: function () {
        return {
          title: '新闻公示',
          button: '新增'
        }
      }
    }
  },
  methods: {
    toPage() {
      this._setId('')
      this.$router.push({path: this.page})
      this.$store.commit('newsState',1)
      // console.info(+this.page)
    },
    toPage1() {
      this._setId('')
      this.$router.push({path: this.page})
      // console.info(+this.page)
    },
    ...mapMutations({
      '_setId': 'SET_NEWS_ID' 
    }),
  }
}
</script>
<style lang="stylus" scoped>
.header-wrap
  width 100%
  height 49px
  line-height 50px
  font-size 14px
  border-bottom 1px solid #2184C5
  display flex
  justify-content space-between
  p
    color #555
    font-weight bold
    font-family MicrosoftYaHei-Bold
  .button
    height 26px
    width 82px
    line-height 2px
    color #2184C5
    background-color transparent
    font-family FZLTZCHK--GBK1-0
    font-weight Regular
    &:hover
      color: #fff
      background-color #2184C5
</style>
