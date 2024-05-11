/**
 * @Description: 等待中渲染 - 骨架屏
 * @Author: zero
 * @Date: 2024-05-11 18:34:32
 * @LastEditors: zero
 * @LastEditTime: 2024-05-11 18:34:32
*/
import React, { Suspense } from 'react'
import { Skeleton } from 'antd-mobile'

function Waiting(Component) {
  return props => (
    <Suspense maxDuration={500} fallback={(<Skeleton.Paragraph animated />)}>
      <Component {...props} />
    </Suspense >
  )
}

export default Waiting
