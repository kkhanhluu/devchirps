import { ManagementClient } from 'auth0';
import { RequestOptions } from 'https';

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

export function authenticateUser(email: string, password: string) {
  const options: RequestOptions = {
    hostname: process.env.AUTH0_DOMAIN,
    method: 'POST',
    path: '/oauth/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  };

  const data = JSON.stringify({
    email,
    password,
  });
  https.request();
}
