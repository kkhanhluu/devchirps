import {
  BLOCK_ANY_ACCOUNT,
  BLOCK_ANY_CONTENT,
  EDIT_OWN_ACCOUNT,
  EDIT_OWN_CONTENT,
  EDIT_OWN_PROFILE,
  PROMOTE_ANY_ACCOUNT,
  READ_ANY_ACCOUNT,
  READ_ANY_PROFILE,
  READ_OWN_ACCOUNT,
  UPLOAD_OWN_MEDIA,
} from '@devchirps/authorization';
import { DataSource } from 'apollo-datasource';
import { ManagementClient, User } from 'auth0';
import { request, RequestOptions } from 'https';
import { Account } from '../typedefs/account';

export class AccountDataSource extends DataSource {
  private auth0!: ManagementClient;

  constructor({ auth0 }: { auth0: ManagementClient }) {
    super();
    this.auth0 = auth0;
  }

  getUserById(id: string) {
    return this.auth0.getUser({ id });
  }

  getUsers() {
    return this.auth0.getUsers();
  }

  createUser(email: string, password: string) {
    return this.auth0.createUser({
      email,
      password,
      connection: 'Username-Password-Authentication',
      app_metadata: {
        groups: [],
        roles: ['author'],
        permissions: [
          'read:own_account',
          'edit:own_account',
          'read:any_profile',
          'edit:own_profile',
          'read:any_content',
          'edit:own_content',
          'upload:own_media',
        ],
      },
    });
  }

  updateEmail(accountId: string, email: string) {
    return this.auth0.updateUser({ id: accountId }, { email });
  }

  updatePassword(accountId: string, password: string) {
    return this.auth0.updateUser({ id: accountId }, { password });
  }

  async changeAccountBlockedStatus(accountId: string) {
    const { blocked } = await this.auth0.getUser({ id: accountId });
    return this.auth0.updateUser({ id: accountId }, { blocked: !blocked });
  }

  async updateUserRole(accountId: string) {
    const authorPermissions = [
      READ_OWN_ACCOUNT,
      EDIT_OWN_ACCOUNT,
      READ_ANY_PROFILE,
      EDIT_OWN_PROFILE,
      READ_ANY_ACCOUNT,
      EDIT_OWN_CONTENT,
      UPLOAD_OWN_MEDIA,
    ];
    const moderatorPermissions = [
      READ_ANY_ACCOUNT,
      BLOCK_ANY_ACCOUNT,
      PROMOTE_ANY_ACCOUNT,
      BLOCK_ANY_CONTENT,
    ];

    const user = await this.auth0.getUser({ id: accountId });
    const isModerator = user.app_metadata?.roles?.includes('moderator');
    const updatedRoles = isModerator ? ['author'] : ['moderator'];
    const updatedPermissions = isModerator
      ? authorPermissions
      : authorPermissions.concat(moderatorPermissions);

    return this.auth0.updateUser(
      { id: accountId },
      {
        app_metadata: {
          roles: updatedRoles,
          groups: [],
          permissions: updatedPermissions,
        },
      }
    );
  }

  deleteUser(accountId: string) {
    return this.auth0.deleteUser({ id: accountId });
  }

  isUserAuthenticated(email: string, password: string) {
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

  mapAuth0UserToAccount({
    created_at,
    user_id,
    last_login,
    name,
    email,
    app_metadata,
    blocked,
  }: User): Account {
    return {
      id: user_id,
      name,
      email,
      lastLogin: last_login ? new Date(last_login) : null,
      createdAt: new Date(created_at),
      isModerator: Boolean(app_metadata?.roles?.includes('moderator')),
      isBlocked: Boolean(blocked),
    };
  }
}
