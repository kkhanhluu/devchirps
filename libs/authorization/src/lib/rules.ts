import { and, or, rule, shield } from 'graphql-shield';
import {
  BLOCK_ANY_ACCOUNT,
  EDIT_OWN_ACCOUNT,
  PROMOTE_ANY_ACCOUNT,
  READ_ANY_ACCOUNT,
  READ_OWN_ACCOUNT,
} from '..';
import { getPermissionsFromJwtToken } from './getPermissionsFromJwtToken';

const canReadAnyAccount = rule()((parent, args, { user }, _) => {
  const userPermissions = getPermissionsFromJwtToken(user);
  return userPermissions?.includes(READ_ANY_ACCOUNT);
});

const canReadOwnAccount = rule()((parent, args, { user }, _) => {
  const userPermissions = getPermissionsFromJwtToken(user);
  return userPermissions?.includes(READ_OWN_ACCOUNT);
});

const isReadingOwnAccount = rule()((parent, { accountId }, { user }, _) => user.sub === accountId);

const canEditOwnAccount = rule()((parent, args, { user }, _) => {
  const userPermissions = getPermissionsFromJwtToken(user);
  return userPermissions?.includes(EDIT_OWN_ACCOUNT);
});

const canBlockAccount = rule()((parent, args, { user }, _) => {
  const userPermissions = getPermissionsFromJwtToken(user);
  return userPermissions?.includes(BLOCK_ANY_ACCOUNT);
});

const canPromoteAccount = rule()((parent, args, { user }, _) => {
  const userPermissions = getPermissionsFromJwtToken(user);
  return userPermissions?.includes(PROMOTE_ANY_ACCOUNT);
});

export const permissions = shield(
  {
    Query: {
      accounts: canReadAnyAccount,
      account: or(and(canReadOwnAccount, isReadingOwnAccount), canReadAnyAccount),
    },
    Mutation: {},
  },
  { debug: process.env.NODE_ENV !== 'production' }
);
