import React, { useState, createContext } from 'react'
import { CognitoUser, AuthenticationDetails, CognitoUserAttribute, CognitoUserSession } from 'amazon-cognito-identity-js';
import Pool from '../UserPool';
import { Context } from 'vm';

const AccountContext = createContext({} as Context);

const Account = (props: any) => {
    const [userStatus, userSetStatus] = useState(false);

    const getSession = async(): Promise<CognitoUserSession> => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession(async (err: Error, session: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        const userAttributes: CognitoUserAttribute[] = await new Promise((resolve, reject) => {
                            user.getUserAttributes((err?: Error, attributes?: CognitoUserAttribute[]) => {
                                if (err) {
                                    reject(err);
                                }
                                else if (attributes) {
                                    const results = {} as any;
                                    for (let attribute of attributes) {
                                        const { Name, Value } = attribute;
                                        results[Name] = Value;
                                    }
                                    resolve(results);
                                }
                            });
                        });
                        resolve({user, ...session, ...userAttributes});
                    }
                });
            } else {
                reject();
            }
        });
    }

    const authenticate = async (Username: string, Password: string): Promise<CognitoUserSession | Error | any>  => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool });
            const authDetails = new AuthenticationDetails({ Username, Password });
    
            user.authenticateUser(authDetails, {
                onSuccess: (data: CognitoUserSession) => {
                    console.log("onSuccess: ", data);
                    resolve(data);
                },
                onFailure: (err: Error) => {
                    console.error("onFailure: ", err);
                    reject(err);
                },
                newPasswordRequired: (data: any) => {
                    console.log("newPasswordRequired: ", data);
                    resolve(data);
                }
            });
        });
    }

    const logout = (): void => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
            userSetStatus(false);
        }
    }

    const currentUser = (): CognitoUser | undefined => {
        const user = Pool.getCurrentUser();
        if (user) {
            return user;
        }
    }

  return (
      <AccountContext.Provider value={{ authenticate, getSession, logout, userStatus, userSetStatus, currentUser }}>
          {props.children}
      </AccountContext.Provider>
  )
}

export { Account, AccountContext }