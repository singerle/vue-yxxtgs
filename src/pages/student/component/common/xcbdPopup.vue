<template>
  <div class="wrap">
    <div class="content">
      <div class="top">
        <h3>条形码</h3>
        <!-- <div class="code-1"
             :style="info.txm=='null'||info.txm==null? {background:''}: {background:'url('+info.txm+') no-repeat center center'}">
        </div> -->
        <div style="margin:0 auto">
          <img class="code-1"
               id="code-1"></img>
        </div>
        <h3>二维码</h3>
        <!-- <div class="code-2" :style="info.ewm=='null'||info.ewm==null? {background:''}: {background:'url('+info.ewm+') no-repeat center center'}">
	  			</div> -->
        <div class="code-2"
             id="code-2"></div>
      </div>
      <div class="bottom"
           @click="cancle">
        <p>取消</p>
      </div>
    </div>
  </div>
</template>

<script>
import JsBarcode from 'jsbarcode'
import QRCode from "qrcodejs2"
import { getGrsfmData } from "student/api/grsfm.js"
export default {
  name: 'xcbdPopup',

  data () {
    return {
      isshow: false,
      info: '',
      id: ''
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.$nextTick(function () {
      this.qrcode();
      this.barcode();
    })
  },
  components: { QRCode, JsBarcode },
  methods: {
    cancle () {
      this.$emit("event", this.isshow)
    },
    getData () {
      getGrsfmData().then((res) => {
        if (res.code == "40001") {
          console.log(res.message)
          this.info = res.content
        } else {
          console.log("getData error")
        }
      })
    },
    qrcode () {
      let qrcode = new QRCode('code-2', {
        width: 160,
        height: 160,
        // background:url(/yxxt/static/student-index-pictures/erwei-code.png)
        marginBottom: 40,
        text: sessionStorage.getItem('loginSum'),   // 二维码内容
        // render: 'canvas',   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#000',   // 背景色
        // foreground: '#fff'    // 前景色
      })
    },
    barcode () {
      let barcode = new JsBarcode('#code-1', sessionStorage.getItem('loginSum'), {
        format: "CODE128",//选择要使用的条形码类型
        // text: this.recipe.recipeNo,
        displayValue: true,//是否在条形码下方显示文字
        textPosition: "bottom"//设置文本的垂直位置
      })
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;

  .content {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;

    .top {
      width: 100%;
      margin-bottom: 1px;
      height: calc(100% - 0.46rem);
      background: rgba(255, 255, 255, 1);
      overflow: hidden;

      h3, div, p {
        margin: 0 auto;
        text-align: center;
      }

      h3 {
        font-size: 0.17rem;
        font-family: PingFang-SC-Bold;
        color: rgba(51, 51, 51, 1);
        line-height: 0.17rem;
        margin-top: 0.4rem;
        margin-bottom: 0.2rem;
      }

      .code-1 {
        width: 2.13rem;
        height: 1.1rem;
        // background: url('/yxxt/static/student-index-pictures/long-code.png');
        margin-bottom: 0.1rem;
      }

      .code-2 {
        width: 1.6rem;
        height: 1.6rem;
        // background:url(/yxxt/static/student-index-pictures/erwei-code.png)
        margin-bottom: 0.4rem;
      }
    }

    .bottom {
      width: 100%;
      height: 0.45rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 1);

      p {
        font-size: 0.17rem;
        font-family: PingFang-SC-Medium;
        color: rgba(51, 51, 51, 1);
        line-height: 0.17rem;
      }
    }
  }
}
</style>