import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from './Account';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined, MailFilled, LockFilled } from '@ant-design/icons';
import jQuery from 'jquery';
import Settings from './Settings';
import Status from './Status';
const $ = jQuery;

const Login = (props: any) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { getSession, authenticate, userStatus, userSetStatus } = useContext(AccountContext);

    const onFinish = (event: any) => {              
        authenticate(userName, password)
        .then((data: any) => {
            console.log("Logged in!", data);
            userSetStatus(true);
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

    useEffect(() => {
        getSession().then((session: any) => {
            console.log("Session: ", session);
            userSetStatus(true);
        }).catch((err: any) => {})
    }, []);   

    
    const userLoginForm = 
        <div>
            <h1>Login</h1>
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
                    <Status/>                    
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 6 }}>
                    <Button type="link" onClick={toggleClass}>
                    Create an Account
                    </Button>
                </Form.Item>
                
            </Form>
        </div>

    const userSettingsForm = 
        <div>
            <h1>You are logged in</h1>            
            <Settings />
            <Status/>
        </div>
    return(  
        <div>
            <div id="login-form-container" className="form-container">
                { userStatus ? userSettingsForm : userLoginForm }   
            </div>
        </div>
    )
}

export default Login