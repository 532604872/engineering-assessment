/**
 * @Description: web router
 * @Author: zero
 * @Date: 2024-05-11 12:35:28
 * @LastEditors: zero
 * @LastEditTime: 2024-05-11 12:35:28
*/

import React from 'react'
import { Waiting } from '@comp'
import { BrowserRouter, Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { routerConfig } from './router.config'

const NoFound = () => <Redirect to="/404" />
/*
 * 配置路由
 * 设置 routes
 * */
export const wrapRoute = ({ title, component, ...props }, index) => {
  const Component = withRouter(Waiting(component))
  return <Route key={index} exact={true} {...props} render={(props) => {
    document.title = title
    return <Component {...props} />
  }
  } />
}
const wrapRoutes = Object.values(routerConfig).filter(item => item.component && item.path).map(wrapRoute)

const Root = () => (
  <BrowserRouter>
    <Switch>
      {wrapRoutes}
      <Route component={NoFound}/>
    </Switch>
  </BrowserRouter>
)

export default Root
