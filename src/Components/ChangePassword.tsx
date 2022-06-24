import { CognitoUser } from 'amazon-cognito-identity-js';
import { Button, Form, Input } from 'antd';
import React, { useState, useContext } from 'react'
import { AccountContext } from './Account';

export default () => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const { getSession } = useContext(AccountContext);

    const onFinish = (event: any) => {
        getSession().then(({ user }: { user: CognitoUser }) => {
            user.changePassword(password, newPassword, (err, result) => {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log(result);
                }
            });
        });
    }
    return (
        <div id="change-email-form-container">
            <h2>Change Password</h2>
            <Form onFinish={onFinish} className="changeEmailForm"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 16 }}>
                <Form.Item 
                    label="Current Password" 
                    name="currentPassword" 
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
                <Form.Item 
                    label="New Password" 
                    name="newPassword" 
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new password!',
                        },
                ]}>
                <Input.Password
                    placeholder="Password"
                    value={password} 
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => setNewPassword(event.target.value)}
                />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10, span: 6 }}>
                    <Button type="primary" htmlType="submit">
                    Change Password
                    </Button>
                </Form.Item>
            </Form>
        </div>

  )
}
