import { buildFederatedSchema } from '@devchirps/graphql';
import { ApolloServer } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { ProfileResolver } from '../resolvers/profile';

export async function bootstrap() {
  const schema = applyMiddleware(await buildFederatedSchema({ resolvers: [ProfileResolver] }));

  const server = new ApolloServer({
    schema,
  });
  return server;
}
