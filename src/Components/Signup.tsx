import { CognitoUserAttribute, ISignUpResult } from 'amazon-cognito-identity-js';
import React, { useState } from 'react'
import UserPool from '../UserPool';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined, MailFilled, LockFilled } from '@ant-design/icons';
import jQuery from 'jquery';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
const $ = jQuery;

const Signup = (props: any) => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const onFinish = () => {
        UserPool.signUp(userName, password, [new CognitoUserAttribute({Name: "email", Value: email})], [], (err?: Error, data?: ISignUpResult) => 
        {
            if (err) {
                console.error(err);
            } else if (data) {
                console.log(data);
                !data.userConfirmed && alert('Please confirm your account before logging in.')
            }            
        });
    };

    const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
        alert(`Failed! - ${errorInfo.errorFields.map((err) => {return err.errors})}`);
        console.log('Failed:', errorInfo);
    };
    
    const toggleClass = () => {
        $('#login-form-container').show()
        $('#signup-form-container').hide()
    };

    return(
        <div id="signup-form-container" className="form-container hide-form">
            <h1>Sign Up</h1>
            <Form name="signUpForm" className="signup-form" layout={"horizontal"}
                labelCol={{ span: 8 }}
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
                <Form.Item wrapperCol={{ offset: 8, span: 6 }}>
                    <Button type="primary" htmlType="submit">
                    Sign Up
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 6 }}> 
                    <Button type="link" onClick={toggleClass}>
                    Already have an account?  Sign in.
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Signup