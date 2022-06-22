import React, { useState, useContext } from 'react'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { AccountContext } from './Account';
import { CognitoUser } from 'amazon-cognito-identity-js';
export default () => {
    const [newEmail, setNewEmail] = useState("");
    const [password, setPassword] = useState("");

    const { getSession, authenticate } = useContext(AccountContext);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
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
        <div>
            <form onSubmit={onSubmit}>
                <label>New Email</label>
                <input
                    value={newEmail}
                    onChange={(event) => setNewEmail(event.target.value)}
                />
                <label>Current Password</label>
                <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">Change email</button>
            </form>
        </div>

  )
}
