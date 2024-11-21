import React from 'react';
import { Form, Input, Button, Card, Switch, Select, Divider } from 'antd';

const { Option } = Select;

const Settings: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div>
      <h2>Settings</h2>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            siteName: 'Admin Dashboard',
            language: 'en',
            emailNotifications: true,
            darkMode: false,
          }}
        >
          <Divider orientation="left">General Settings</Divider>
          <Form.Item
            label="Site Name"
            name="siteName"
            rules={[{ required: true, message: 'Please input the site name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Language"
            name="language"
          >
            <Select>
              <Option value="en">English</Option>
              <Option value="es">Spanish</Option>
              <Option value="fr">French</Option>
            </Select>
          </Form.Item>

          <Divider orientation="left">Preferences</Divider>
          <Form.Item
            label="Email Notifications"
            name="emailNotifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Dark Mode"
            name="darkMode"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Settings;
