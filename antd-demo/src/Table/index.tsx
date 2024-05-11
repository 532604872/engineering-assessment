import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
  key: React.Key;
  locationid: string;
  Applicant: string;
  cnn: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: '唯一标识',
    dataIndex: 'locationid',
    key: 'locationid',
  },
  {
    title: 'Applicant',
    dataIndex: 'Applicant',
    key: 'Applicant',
  },
  {
    title: 'cnn',
    dataIndex: 'cnn',
    key: 'cnn',
  },
];

interface PostsProps{
  dataSource: [],
  loading: Boolean
}

const App: React.FC<PostsProps> = (props) => (
  <div className="Table">
    <Table
      dataSource={props.dataSource}
      columns={columns}
      rowKey={record => record.locationid}
    />
  </div>
)


export default App;