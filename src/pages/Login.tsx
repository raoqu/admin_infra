import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { mockAuthService } from '../mock';
import './Login.css';

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginForm) => {
    setLoading(true);
    try {
      const token = await mockAuthService.login(values);
      
      if (token) {
        await login(token);
        message.success('Login successful!');
      } else {
        message.error('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card 
        title="Admin Dashboard"
        className="login-card"
        styles={{
          body: {
            paddingTop: 24,
          },
        }}
      >
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          initialValues={{ username: 'admin', password: 'admin' }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Try: admin or user" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Same as username" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Log in
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', color: '#666' }}>
            <p>Try these accounts:</p>
            <p>admin / admin</p>
            <p>user / user</p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
