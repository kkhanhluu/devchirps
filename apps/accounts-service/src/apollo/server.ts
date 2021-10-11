import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { buildSchema } from 'type-graphql';
import { AccountResolver } from '../resolvers/account';

export async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [AccountResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });

  const server = new ApolloServer({ schema });

  return server;
}
