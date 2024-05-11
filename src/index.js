/**
 * @Description: web h5
 * @Author: zero
 * @Date: 2024-05-11 12:26:41
 * @LastEditors: zero
 * @LastEditTime: 2024-05-11 12:26:41 
*/
import React from 'react'
import ReactDOM from 'react-dom'
import Root from '@/router'

// 移动端调试器
const eruda = require('eruda')
eruda.init()

ReactDOM.render(<Root />, document.getElementById('app'))
