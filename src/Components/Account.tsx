import React, { createContext } from 'react'
import { CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import Pool from '../UserPool';
import * as Interfaces from "../shared/interfaces";

const AccountContext = createContext({} as any);

const Account = (props: any) => {
    const getSession = async() => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();
            if (user) {
                user.getSession(async (err: Error, session: any) => {
                    if (err) {
                        reject();
                    } else {
                        const attributes = await new Promise((resolve, reject) => {
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
                        (typeof attributes === 'object') && resolve({user, ...session, ...attributes});
                    }
                })
            } else {
                reject();
            }
        });
    }

    const authenticate = async (Username: string, Password: string) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool });
            const authDetails = new AuthenticationDetails({Username, Password});
    
            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("onSuccess: ", data);
                    resolve(data);
                },
                onFailure: (err) => {
                    console.error("onFailure: ", err);
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired: ", data);
                    resolve(data);
                }
            });
        });
    }

    const logout = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
        }
    }
  return (
      <AccountContext.Provider value={{ authenticate, getSession, logout }}>
          {props.children}
      </AccountContext.Provider>
  )
}

export { Account, AccountContext }