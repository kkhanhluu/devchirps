import { buildFederatedSchema } from '@devchirps/graphql';
import { ApolloServer } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import { FollowDataSource } from '../datasources/followDataSource';
import { ProfileDataSource } from '../datasources/profileDataSource';
import { FollowResolver } from '../resolvers/follow';
import { ProfileResolver } from '../resolvers/profile';

export async function bootstrap() {
  const schema = applyMiddleware(
    await buildFederatedSchema({ resolvers: [ProfileResolver, FollowResolver] })
  );

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const user = req.headers.user ? JSON.parse(req.headers.user as string) : null;
      return { user };
    },
    dataSources: () => ({
      profileAPI: new ProfileDataSource(),
      followAPI: new FollowDataSource(),
    }),
  });
  return server;
}
