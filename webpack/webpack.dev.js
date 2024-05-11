/**
 * @Description: 开发环境配置
 * @Author: zero
 * @Date: 2024-05-11 12:00:00
 * @LastEditors: zero
 * @LastEditTime: 2024-05-11 12:00:00
*/
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const getBaseConfig = require('./webpack.base.js')

const PORT = 4000;

const config = merge(getBaseConfig, {
  devtool: 'eval-source-map',
  mode: 'development',
  optimization: {
    minimizer: []
  },

  cache: {
    type: 'filesystem'
  },

  devServer: {
    port: PORT,
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true,
    hot: true,
    open: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin() //  使用热替换
  ]
})

module.exports = config

console.log(`web server is running at http://localhost:${PORT}`)
