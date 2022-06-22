import React, { useState, useContext } from 'react';
import { AccountContext } from './Account';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined, MailFilled, LockFilled } from '@ant-design/icons';
import jQuery from 'jquery';
const $ = jQuery;

const Login = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { authenticate } = useContext(AccountContext);
    const onFinish = () => {
        authenticate(userName, password)
        .then((data: any) => {
            console.log("Logged in!", data);
        })
        .catch((err: Error) => {
            console.error("Failed to login", err);
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        alert('Failed!')
        console.log('Failed:', errorInfo);
    };

    const toggleClass = () => {
        $('#login-form-container').hide()
        $('#signup-form-container').show()
    };
    
    return(
        <div id="login-form-container" className="form-container">
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
                <Form.Item wrapperCol={{ offset: 6, span: 6 }}>
                    <Button type="link" onClick={toggleClass}>
                    Create an Account
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login