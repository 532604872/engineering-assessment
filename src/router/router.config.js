/**
 * @Description: 路由配置
 * @Author: zero
 * @Date: 2024-05-11 14:51:13
 * @LastEditors: zero
 * @LastEditTime: 2024-05-11 14:51:13
*/
import { lazy } from 'react'

export const routerConfig = {
  home: {
    path: '/',
    title: 'engineering-assessment',
    component: lazy(() => import('@page/Engineering/Assessment'))
  },
  notFound: {
    path: '/404',
    title: '404',
    component: lazy(() => import('@page/NotFound'))
  }
}
