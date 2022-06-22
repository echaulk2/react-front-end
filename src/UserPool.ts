import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: 'us-east-1_Pp00FoLpM',
    ClientId: '31nfhpcssr9plqibt81vs061kj'
}

export default new CognitoUserPool(poolData);