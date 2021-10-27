import { ManagementClient, User } from 'auth0';
import { request, RequestOptions } from 'https';
import { Account } from '../typedefs/account';

const auth0 = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID_MANAGEMENT_API,
  clientSecret: process.env.AUTH0_CLIENT_SECRET_MANAGEMENT_API,
});

export function getUserById(id: string) {
  return auth0.getUser({ id });
}

export function getUsers() {
  return auth0.getUsers();
}

export function createUser(email: string, password: string) {
  return auth0.createUser({ email, password, connection: 'Username-Password-Authentication' });
}

export function isUserAuthenticated(email: string, password: string) {
  const options: RequestOptions = {
    hostname: process.env.AUTH0_DOMAIN,
    method: 'POST',
    path: '/oauth/token',
    headers: { 'content-type': 'application/json' },
  };

  const data = JSON.stringify({
    audience: process.env.AUTH0_AUDIENCE,
    client_id: process.env.AUTH0_CLIENT_ID_GRAPHQL,
    client_secret: process.env.AUTH0_CLIENT_SECRET_GRAPHQL,
    grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
    realm: 'Username-Password-Authentication',
    scope: 'openid',
    username: email,
    password,
  });

  return new Promise((resolve, reject) => {
    const req = request(options, ({ statusCode }) => {
      if (statusCode === 200) {
        resolve(true);
      } else {
        reject('Unauthorized!');
      }
    });

    req.on('error', (err) => reject(err));
    req.write(data);
    req.end();
  });
}

export function updateEmail(accountId: string, email: string) {
  return auth0.updateUser({ id: accountId }, { email });
}

export function updatePassword(accountId: string, password: string) {
  return auth0.updateUser({ id: accountId }, { password });
}

export function mapAuth0UserToAccount({
  created_at,
  user_id,
  last_login,
  name,
  email,
}: User): Account {
  return {
    id: user_id,
    name,
    email,
    lastLogin: new Date(last_login),
    createdAt: new Date(created_at),
  };
}
