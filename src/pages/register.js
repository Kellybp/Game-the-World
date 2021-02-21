import React, { useState } from 'react';
import {authMethods} from '../firebase/auth';
import { Form, Input, Button, Checkbox } from 'antd';
import { Row, Col } from 'antd';
import '../styling/registrationStyle.css'


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) =>{
    event.preventDefault();

    authMethods.signUp(username, password)
        .then((data) => {
            console.log(data);
        }).catch((e) => {
            alert(e.message);
        })
  };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

  return(
      <Row>
          <Col span={16} id="image">

          </Col>
          <Col span={8} id="form">
              <Form
                  {...layout}
                  name="basic"
                  initialValues={{
                      remember: true,
                  }}
              >
                  REGISTER
                  <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ required: true, message: 'Please input your email'}]}
                  >
                      <Input value={username} onChange={e => setUsername(e.target.value)} type="email"  placeholder="Username" name="email"/>
                  </Form.Item>

                  <Form.Item
                      label="Password"
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                      <Input.Password value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" name="password"/>
                  </Form.Item>

                  <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                      <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                          Submit
                      </Button>
                  </Form.Item>

              </Form>
          </Col>
      </Row>
  );
}

export default Register;