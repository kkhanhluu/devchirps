import { boostApolloServer } from './apollo/server';
import { app } from './app';

(async () => {
  const port = process.env.PORT || 4000;

  const server = await boostApolloServer();
  server.applyMiddleware({ app });

  app.listen({ port }, () => {
    console.log(`Api gateway ready at http://localhost:${port}`);
  });
})();
