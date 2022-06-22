import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../UserPool';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined, MailFilled, LockFilled } from '@ant-design/icons';

const Login = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onFinish = (values: any) => {
        const user = new CognitoUser({
            Username: userName,
            Pool: UserPool
        });

        const authDetails = new AuthenticationDetails({
            Username: userName,
            Password: password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log("onSuccess: ", data);
            },
            onFailure: (err) => {
                console.error("onFailure: ", err);
            },
            newPasswordRequired: (data) => {
                console.log("newPasswordRequired: ", data);
            }
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        alert('Failed!')
        console.log('Failed:', errorInfo);
    };

    return(
        <div id="login-form-container">
            <h1>Log In</h1>
            <Form name="loginForm" className="login-form" layout={"horizontal"}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Form.Item 
                    label="User Name" 
                    name="userName" 
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}>
                    <Input  
                        prefix={<UserOutlined />} 
                        placeholder="User Name"
                        value={userName} 
                        onChange={(event:React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)}
                    />
                </Form.Item>
                <Form.Item 
                    label="Email" 
                    name="email" 
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}>
                    <Input  
                        prefix={<MailFilled />} 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event:React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                    />
                </Form.Item>
                <Form.Item 
                    label="Password" 
                    name="password" 
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}>
                    <Input.Password 
                        prefix={<LockFilled />} 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event:React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 6 }}>
                    <Button type="primary" htmlType="submit" onSubmit={e => e.preventDefault()}>
                    Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login