import { buildFederatedSchema } from '@devchirps/graphql';
import { ApolloServer } from 'apollo-server-express';
import { AccountResolver } from '../resolvers/account';
import { Account } from '../typedefs/account';

export async function bootstrap() {
  const schema = await buildFederatedSchema(
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
  );

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const user = req.headers.user ? JSON.parse(req.headers.user as string) : null;
      return { user };
    },
  });

  return server;
}
