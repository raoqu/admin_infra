import React, { useState, useEffect, useRef } from 'react';
import { Table, Card, Avatar, Typography } from 'antd';
import type { TableProps } from 'antd';

const { Text } = Typography;

interface DataType {
  key: string;
  name: string;
  title: string;
  avatar: string;
  age: number;
  address: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  status: string;
}

// Generate mock data
const generateMockData = (count: number): DataType[] => {
  return Array.from({ length: count }, (_, i) => ({
    key: i.toString(),
    name: `John Doe ${i}`,
    title: `Senior ${['Developer', 'Designer', 'Manager', 'Analyst', 'Coordinator'][Math.floor(Math.random() * 5)]}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    age: 20 + Math.floor(Math.random() * 40),
    address: `Street ${i}, City ${Math.floor(i / 10)}`,
    email: `user${i}@example.com`,
    phone: `+1 ${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10000)}`,
    department: ['HR', 'IT', 'Finance', 'Marketing', 'Sales'][Math.floor(Math.random() * 5)],
    position: ['Manager', 'Developer', 'Analyst', 'Designer', 'Coordinator'][Math.floor(Math.random() * 5)],
    salary: Math.floor(40000 + Math.random() * 60000),
    status: ['Active', 'Inactive', 'On Leave'][Math.floor(Math.random() * 3)],
  }));
};

const TablePage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [tableHeight, setTableHeight] = useState<number>(500);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTableHeight = () => {
      if (containerRef.current) {
        // Get the container's padding
        const computedStyle = window.getComputedStyle(containerRef.current);
        const paddingTop = parseInt(computedStyle.paddingTop, 10);
        const paddingBottom = parseInt(computedStyle.paddingBottom, 10);
        
        // Calculate available height
        const windowHeight = window.innerHeight;
        const headerHeight = 64; // Ant Design default header height
        const availableHeight = windowHeight - headerHeight - paddingTop - paddingBottom - 20; // 20px bottom margin
        
        // Set height with minimum of 200px
        const newHeight = Math.max(200, availableHeight);
        setTableHeight(newHeight);
      }
    };

    updateTableHeight();
    window.addEventListener('resize', updateTableHeight);
    return () => window.removeEventListener('resize', updateTableHeight);
  }, []);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
      width: 120,
    },
    {
      title: 'Profile',
      dataIndex: 'profile',
      width: 200,
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar 
            src={record.avatar} 
            size={40}
            style={{ flexShrink: 0 }}
          />
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            minWidth: 0, // Enable text truncation
          }}>
            <Text 
              strong 
              style={{ 
                margin: 0,
                width: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {record.name}
            </Text>
            <Text 
              type="secondary"
              style={{ 
                margin: 0,
                fontSize: '12px',
                width: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {record.title}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: 80,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: 150,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      width: 120,
      filters: [
        { text: 'HR', value: 'HR' },
        { text: 'IT', value: 'IT' },
        { text: 'Finance', value: 'Finance' },
        { text: 'Marketing', value: 'Marketing' },
        { text: 'Sales', value: 'Sales' },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Position',
      dataIndex: 'position',
      width: 120,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: 200,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      width: 120,
      sorter: (a, b) => a.salary - b.salary,
      render: (value) => `$${value.toLocaleString()}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      fixed: 'right',
      width: 100,
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
        { text: 'On Leave', value: 'On Leave' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        const color = 
          status === 'Active' ? 'green' :
          status === 'Inactive' ? 'red' : 'orange';
        return <span style={{ color }}>{status}</span>;
      },
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys.map(key => key.toString()));
    },
  };

  return (
    <div 
      ref={containerRef} 
      style={{ 
        padding: '24px',
        height: `calc(100vh - 64px)`, // Subtract header height
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Card 
        title="Employee Data"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '200px',
          overflow: 'hidden',
        }}
        styles={{
          body: {
            flex: 1,
            padding: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }
        }}
      >
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={generateMockData(100)}
          scroll={{ 
            x: 1500, 
            y: tableHeight - 165 // Account for table header, pagination, and card padding
          }}
          pagination={{
            total: 100,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} items`,
            style: { marginBottom: 0 }, // Remove bottom margin from pagination
          }}
          style={{ 
            flex: 1,
            overflow: 'hidden',
          }}
          rowHeight={65} // Increase row height to accommodate the avatar and text
        />
      </Card>
    </div>
  );
};

export default TablePage;
