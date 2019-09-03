// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../yxxt/index.html'),
    assetsRoot: path.resolve(__dirname, '../yxxt'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 9999,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/yxxt',
    proxyTable: {
      '/api': {
        // 测试环境
        // target: "http://yx.cqut.edu.cn/", //理工环境
        target: 'http://zsyx.ctbu.edu.cn/', //工商
        // target: "http://yhkj.cqevi.net.cn:11005/",//机电
        // target: "http://222.179.134.204:8081/",//移通
        // target: "http://nginx.cqbvc.edu.cn:17542/", //商职
        // target: 'http://49.4.92.21/', //华为云环境
        // target: "http://192.168.0.46:8086",//川环境
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
