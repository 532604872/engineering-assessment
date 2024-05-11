/**
 * @Description: 列表虚拟滚动
 * @Author: zero
 * @Date: 2024-05-11 18:44:43
 * @LastEditors: zero
 * @LastEditTime: 2024-05-11 18:44:43
 *
 * 待补充：虚拟列表：react-virtualized、react-list
*/
import './index.less'
import React from 'react'
import { PullToRefresh, InfiniteScroll, List, DotLoading } from 'antd-mobile'

function InfiniteScrollContent({ loading, data }) {
  return (
    <>
      {loading ? (
        <>
          <span>Loading</span>
          <DotLoading />
        </>
      ) : data.length > 0 ? (
        <span>- 到底了 -</span>
      ) : (
        <div className="no-data">
          <img src={require('@images/no_data.png')} alt="" width="144"/>
          <span className="no-text">暂无数据</span>
        </div>
      )
      }
    </>
  )
}

function ListView(props) {
  const { hasMore, data, rowRenderer, loadMore } = props

  return (
    <>
      { data.length > 0 ? (
        <List className="list-view"
          style={{
            '--padding-left': '0',
            '--padding-right': '0',
            '--border-bottom': '0 none'
          }}
        >
          { data.map((item, index) => (
            <List.Item key={index} className="list-view-item">
              {rowRenderer(item)}
            </List.Item>
          )) }
        </List>
      ) : null }
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} >
        <InfiniteScrollContent {...props} />
      </InfiniteScroll>
    </>
  )
}

export default function VirtualizedView({ hasRefresh, onRefresh, ...props }) {
  return hasRefresh ? (
    <PullToRefresh
      onRefresh={onRefresh}
    >
      <ListView {...props}/>
    </PullToRefresh>
  ) : <ListView {...props}/>
}
