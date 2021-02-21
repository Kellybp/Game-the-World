import React, { useState } from 'react';
import {authMethods} from '../firebase/auth';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import '../styling/registrationStyle.css'
import { Divider, Row, Col, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { notification } from 'antd';

const Login = () => {
    let history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) =>{
        event.preventDefault();

        console.log(username, password, authMethods);

        authMethods.signIn(username, password)
            .then(() => {
                history.push('/homepage');
            }).catch((e) => {
                notification.error({
                    message: 'Error',
                    description: e.message
                  });
                // alert(e.message);
            });
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
                    <Typography.Title>LOGIN</Typography.Title>
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
                            Login
                        </Button>
                    </Form.Item>

                </Form>
            </Col>
        </Row>
    );
}

export default Login;