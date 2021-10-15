import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-express';

export async function boostApolloServer() {
  const gateway = new ApolloGateway({
    serviceList: [{ name: 'accounts', url: process.env.ACCOUNTS_SERVICE_URL }],
    buildService({ url }) {
      return new RemoteGraphQLDataSource({
        url,
        willSendRequest({ request, context }) {
          const user = (context as Record<string, unknown>).user;
          request.http.headers.set('user', user ? JSON.stringify(user) : null);
        },
      });
    },
  });

  const server = new ApolloServer({
    gateway,
    context: ({ req }) => {
      const user = req.user ?? null;
      return { user, test: 'hello' };
    },
  });

  await server.start();
  return server;
}
