import { permissions } from '@devchirps/authorization';
import { buildFederatedSchema } from '@devchirps/graphql';
import { ApolloServer } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { auth0 } from '../auth0';
import { AccountDataSource } from '../datasources/accountDataSource';
import { AccountResolver } from '../resolvers/account';
import { Account } from '../typedefs/account';

export async function bootstrap() {
  const schema = applyMiddleware(
    await buildFederatedSchema(
      {
        resolvers: [AccountResolver],
        orphanedTypes: [Account],
        dateScalarMode: 'isoDate',
      },
      {
        Account: {
          _resolveReference: () => ({
            id: '1',
            email: 'test@gmail.com',
            username: 'Test user',
          }),
        },
      }
    ),
    permissions
  );

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const user = req.headers.user ? JSON.parse(req.headers.user as string) : null;
      return { user };
    },
    dataSources: () => ({
      accountsAPI: new AccountDataSource({ auth0 }),
    }),
  });

  return server;
}
