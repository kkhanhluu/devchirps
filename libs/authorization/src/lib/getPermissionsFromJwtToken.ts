import { ContextUser } from '@devchirps/api-interface';

export function getPermissionsFromJwtToken(user?: ContextUser) {
  if (user && user['https://devchirps.com/user_authorization']) {
    return user['https://devchirps.com/user_authorization'].permissions;
  }
  return null;
}
