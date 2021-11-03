export interface ContextUser {
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
  'https://devchirps.com/user_authorization'?: {
    groups: string[];
    roles: string[];
    permissions: string[];
  };
}
