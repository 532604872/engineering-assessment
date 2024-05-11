/**
 * @Description: 基础配置
 * @Author: zero
 * @Date: 2024-05-11 15:51:59
 * @LastEditors: zero
 * @LastEditTime: 2024-05-11 15:51:59
*/
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HappyPack = require('happypack')

const APP_PATH = path.resolve(__dirname, '../src')
const DIST_PATH = path.resolve(__dirname, '../dist')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/index.js',
    framework: [
      'react',
      'react-dom',
      'react-router-dom'
    ]
  },
  output: {
    filename: 'js/[name].[hash].js',
    publicPath: '/',
    path: DIST_PATH
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: APP_PATH,
      loader:  'babel-loader',
      options: {
        presets: ['@babel/env', '@babel/preset-react'],
        // plugins: [require.resolve('react-refresh/babel')],
      },
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: [{
        loader:'style-loader'
      },
      {
        loader: 'css-loader'
      }]
    },
    {
      test: /\.less$/,
      use: [{
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      // {
      //   loader: 'postcss-loader', // 自动加前缀
      //   options: {
      //     plugins: [
      //       require('autoprefixer')({
      //         // browsers: ['last 5 version']
      //       })
      //     ]
      //   }
      // },
      {
        // px-to-rem-loader是对rem-core的二次封装 详情: https://www.npmjs.com/package/rem-core
        loader: 'px-to-rem-loader',
        options: {
          // dpr: 2,
          remPrecision: 8,
          rem: 37.5 // 根据设计稿 设置(设计稿/10)
        }
      },
      {
        loader: 'less-loader',
        options: {
          // modifyVars: theme,
          // javascriptEnabled: true
        }
      }
      ]
    },
    {
      test: /\.(png|jpg|gif|woff|svg|eot|woff2|tff)$/,
      use: [{
        loader: 'url-loader',
        options: {
          outputPath: 'images/', // 输出**文件夹
          publicPath: '/',
          name: '/[name].[contenthash].[ext]',
          limit: 500 // 是把小于500B的文件打成Base64的格式，写入JS
        }
      }],
      exclude: /node_modules/
    },
    // {
    //   test: /\.(eot|svg|ttf|woff|woff2)$/,
    //   loader: 'url-loader?limit=8192&name=fonts/[name].[ext]'
    // },
    // {
    //   test: /\.(pdf)$/,
    //   loader: 'file-loader?name=[path][name].[ext]'
    // }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory']
    }),
    new MiniCssExtractPlugin({
      filename:  'styles/[name].[hash:4].css',
      chunkFilename: 'styles/[name].[hash:4].css'
    }),
    new HtmlWebpackPlugin({
      template: 'template/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })].filter(Boolean),
  resolve: {
    modules: ['node_modules', path.join(__dirname, './node_modules')],
    extensions: ['index.js', '.js', '.less', '.json', '.jsx' ],
    alias: {
      // 各个环境变量中引入
      '@': resolve('src'),
      '@page': resolve('src/page'),
      '@comp': resolve('src/components'),
      '@images': resolve('src/public/images'),
      '@mix': resolve('src/public/styles/mixins.less'),
    }
  }
}
