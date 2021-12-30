import { buildFederatedSchema } from '@devchirps/graphql';
import { ApolloServer } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { ProfileDataSource } from '../datasources/profileDataSource';
import { ProfileResolver } from '../resolvers/profile';

export async function bootstrap() {
  const schema = applyMiddleware(await buildFederatedSchema({ resolvers: [ProfileResolver] }));

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const user = req.headers.user ? JSON.parse(req.headers.user as string) : null;
      return { user };
    },
    dataSources: () => ({
      profileAPI: new ProfileDataSource(),
    }),
  });
  return server;
}
