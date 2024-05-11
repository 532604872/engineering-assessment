import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Space, DatePicker, version, Layout, Input, message} from 'antd';
import Table from './Table';
import debounce from 'lodash/debounce';
import axios from "axios";

const originData: [] = [];

function App() {
  const [id, setId] = useState() // id 查询
  const [loading, setLoading] = useState(false) // 按钮 loading
  const [tabLoading, setTabLoading] = useState(false) // 表格 loading
  const [data, setData] =  useState(originData) // 表格数据

  useEffect(() => {
    fetchQueryCSVAll()
  }, [])

  function handleSearch() {
    if (tabLoading) return
    if (!id) {
      message.error('请输入查询条件')
    } else {
      fetchGetQueryCSV()
    }
  }

  // 获取全部数据
  function fetchQueryCSVAll() {
    if (tabLoading) return
    setTabLoading(true)
    new Promise(((resolve, reject) => {
      axios.get('http://localhost:5001/getQueryCSVAll').then(res => {
        console.log(res)
        res.status === 200 ? resolve(res.data.results) :reject(res.data)
      }).catch(reject)
    })).then((res: any) => {
      setData(res)
    }).catch(res => {
      message.error(res)
    }).finally(() => setTabLoading(false))
  }

  // 根据ID查询
  function fetchGetQueryCSV() {
    if (loading) return
    setLoading(true)
    new Promise(((resolve, reject) => {
      axios.get('http://localhost:5001/getQueryCSV/' + id).then(res => {
        console.log(res)
        res.status === 200 ? resolve(res.data.results) :reject(res.data)
      }).catch(reject)
    })).then((res: any) => {
      setData(res)
    }).catch(res => {
      message.error(res)
    }).finally(() => setLoading(false))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <Layout>
        <h1>antd version: {version}</h1>

        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Space>
            <DatePicker />
            <Input placeholder="locationid search" onChange={(e: any) => setId(e.target.value.trim())}/>
            <Button type="primary" onClick={debounce(handleSearch, 500)} loading={loading}>查询</Button>
          </Space>
          <Table
            dataSource={data}
            loading={tabLoading}
          />
        </Space>
      </Layout>
    </div>
  );
}

export default App;
