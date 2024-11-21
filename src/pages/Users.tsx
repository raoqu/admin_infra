import React from 'react';
import { Table, Button, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (status) => (
      <Tag color={status === 'active' ? 'green' : 'red'}>
        {status.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="link">Edit</Button>
        <Button type="link" danger>Delete</Button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
  },
  {
    key: '2',
    name: 'Jim Green',
    email: 'jim@example.com',
    role: 'User',
    status: 'active',
  },
  {
    key: '3',
    name: 'Joe Black',
    email: 'joe@example.com',
    role: 'User',
    status: 'inactive',
  },
];

const Users: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Users</h2>
        <Button type="primary">Add User</Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Users;
