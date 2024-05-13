/**
 * @Description: 查询页
 * @Author: zero
 * @Date: 2024-05-11 15:00:32
 * @LastEditors: zero
 * @LastEditTime: 2024-05-11 15:00:32 
*/

import './index.less'
import React, {useEffect, useState} from "react"
import {List,Toast} from 'antd-mobile'
import {ListView} from '@comp'
import axios from "axios";

export default function App(p) {
  const [{ pageNo, data = [], hasMore = false }, setResult] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  // 获取数据
  function fetchData(page = 1) {
    if (loading) return
    setLoading(true)
    const params = {
      page,
      pageSize: 10,
    }
    new Promise(((resolve, reject) => {
      axios.post('http://localhost:5001/postQueryCSV', params).then(res => {
        console.log(res)
        res.status === 200 ? resolve(res.data.result) :reject(res.data)
      }).catch(reject)
    })).then(res => {
      const { page, pageSize, totalNum, results } = res
      let list = [...(params.page === 1 ? [] : [...data]), ...(results || [])]
      setResult({
        pageNo: page,
        data: list,
        hasMore: totalNum >= page * pageSize
      })
    }).catch(res => {
      Toast.error(res)
    }).finally(() => setLoading(false))
  }
  
  // 下拉刷新
  async function onRefresh() {
    if (loading) return
    await fetchData(1)
  }
  // 上拉加载
  async function loadMore() {
    if (loading) return
    await fetchData(pageNo + 1)
  }

  // 行数据渲染
  function rowRenderer(data) {
    if (!data) return

    return (
      <Table data={data}/>
    )
  }

  return (
     <section className="list">
        <ListView
          hasRefresh={data.length}
          data={data}
          loading={loading}
          hasMore={hasMore}
          loadMore={loadMore}
          onRefresh={onRefresh}
          rowRenderer={rowRenderer}
        />
    </section>
  )
}
function Header() {
  return (
    <div className="table-header">
      <span>唯一标识</span>
      <span>cnn</span>
      <span>cnn</span>
    </div>
  )
}

function Table({data}) {
  return (
    <List className="table" header={<Header/>} >
      <List.Item key={data.locationid}>
        <div className="table-tbody">
          <span>{data.locationid || ''}</span>
          <span>{data.cnn || ''}</span>
          <span>{data.lot || ''}</span>
        </div>
      </List.Item>
    </List>
  )
}