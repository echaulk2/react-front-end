import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import React, { useState } from 'react'
import UserPool from '../UserPool';

const Signup = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event: any) => {
        event.preventDefault();
        let emailData = {
            Name: 'email',
            Value: email
        };
        let userAttributes = [new CognitoUserAttribute(emailData)]; 
        UserPool.signUp(userName, password, userAttributes, [], (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log(data);
        });
    };

    return(
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="userName">User Name</label>
                <input
                    value={userName}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)}
                ></input>
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                ></input>
                <label htmlFor="password">Password</label>
                <input
                    value={password}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                ></input>
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default Signup