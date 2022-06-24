import React, { useState, useContext } from 'react'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { AccountContext } from './Account';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Button, Form, Input } from 'antd';
export default () => {
    const [newEmail, setNewEmail] = useState("");
    const [password, setPassword] = useState("");

    const { getSession, authenticate } = useContext(AccountContext);

    const onFinish = (event: any) => {        
        getSession().then(({ user }: { user: CognitoUser }) => {
            authenticate(user.getUsername(), password).then(() => {
                const attributes = [
                    new CognitoUserAttribute({ Name: "email", Value: newEmail}),
                ];
                user.updateAttributes(attributes, (err, results) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(results);
                    }
                })
            });
        });
    }
    return (
        <div id="change-email-form-container">
            <h2>Change Email</h2>
            <Form onFinish={onFinish} className="changeEmailForm"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 16 }}>
                <Form.Item 
                    label="New Email" 
                    name="email" 
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                ]}>
                <Input  
                    value={newEmail} 
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => setNewEmail(event.target.value)}
                />
                </Form.Item>
                <Form.Item 
                    label="Current Password" 
                    name="password" 
                    rules={[
                        {
                            required: true,
                            message: 'Please input your current password!',
                        },
                ]}>
                <Input.Password
                    placeholder="Password"                
                    value={password} 
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10, span: 6 }}>
                    <Button type="primary" htmlType="submit">
                    Change Email
                    </Button>
                </Form.Item>
            </Form>
        </div>
  )
}
