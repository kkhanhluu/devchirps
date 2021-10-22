import { ManagementClient } from 'auth0';

const auth0 = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID_MANAGEMENT_API,
  clientSecret: process.env.AUTH0_CLIENT_SECRET_MANAGEMENT_API,
});

export function getUserById(id: string) {
  return auth0.getUser({ id });
}
