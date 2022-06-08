import { babel } from '@rollup/plugin-babel'
// 打包过程能正确加载文件
import { nodeResolve } from '@rollup/plugin-node-resolve'
import html from '@rollup/plugin-html'
// 开发服务器
import serve from 'rollup-plugin-serve'
// 热更新加载
import livereload from 'rollup-plugin-livereload'

// true 开发环境
const isDev = process.env.NODE_ENV !== 'production'

export default {
  input: 'src/index.js', // 打包入口
  output: [
    // {
    //   file: 'build/cjs/index.js', // 对于 Nodejs，打包成 commonjs
    //   format: 'cjs'
    // },
    // {
    //   file: 'build/es/index.js', // 对于浏览器，打包成 ES module
    //   format: 'es'
    // },
    {
      file: 'build/index.js',
      format: 'umd' // 对于 Nodejs 和浏览器，打包成混合模式
    }
  ],
  plugins: [
    nodeResolve(),
    babel({ babelHelpers: 'bundled' }), // 使用 babel 插件
    html({
      fileName: 'index.html',
      publicPath: './',
      attributes: { html: { lang: 'en' }, link: null, script: null }
    }),
    isDev &&
      serve({
        open: true, // 自动打开页面
        port: 8090,
        openPage: '/build/index.html'
      }),
    // 热更新 默认监听根文件夹
    isDev && livereload()
  ]
}
