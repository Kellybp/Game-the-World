import React, { useState } from 'react';
import {authMethods} from '../firebase/auth';
import {Form, Input, Button, Checkbox, Typography} from 'antd';
import { Row, Col } from 'antd';
import '../styling/registrationStyle.css'
import { Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { notification } from 'antd';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) =>{
    event.preventDefault();

    authMethods.signUp(username, password)
        .then((data) => {
            console.log(data);
        }).catch((e) => {
            // alert(e.message);
            notification.error({
                message: 'Error',
                description: e.message
              });
        })
  };


    const tailLayout = {
        wrapperCol: { offset: 4, span: 16 },
    };

  return(
      <Row>
          <Col span={16} id="image">

          </Col>
          <Col span={8} id="form">
              <Form
                  name="basic"
                  className="login-form"
                  initialValues={{
                      remember: true,
                  }}
              >
                  <Typography.Title>REGISTER</Typography.Title>
                  <Divider />
                  <br/>
                  <Form.Item
                      name="email"
                      rules={[{ required: true, message: 'Please input your email'}]}
                  >
                      <Input
                          prefix={<UserOutlined className="site-form-item-icon" />}
                          value={username}
                          onChange={e => setUsername(e.target.value)}
                          type="email"
                          placeholder="Username"
                          name="email"
                      />
                  </Form.Item>

                  <Form.Item
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                      <Input
                          prefix={<LockOutlined className="site-form-item-icon" />}
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          type="password"
                          placeholder="Password"
                          name="password"
                      />
                  </Form.Item>

                  <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                      <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                          Register
                      </Button>
                  </Form.Item>

              </Form>
          </Col>
      </Row>
  );
}

export default Register;