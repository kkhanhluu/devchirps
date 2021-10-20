import jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

console.log(process.env.AUTH0_AUDIENCE, 'AAAAAAA');

export const checkJWt = jwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 100,
    jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jkws.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256'],
  credentialsRequired: false,
});
