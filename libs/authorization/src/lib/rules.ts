import { rule, shield } from 'graphql-shield';
import { getPermissionsFromJwtToken } from './getPermissionsFromJwtToken';

const canReadAnyAccount = rule()((parent, args, { user }, _) => {
  const userPermissions = getPermissionsFromJwtToken(user);
  return userPermissions?.includes('read:any_account');
});

export const permissions = shield(
  {
    Query: {
      accounts: canReadAnyAccount,
    },
  },
  { debug: process.env.NODE_ENV !== 'production' }
);
