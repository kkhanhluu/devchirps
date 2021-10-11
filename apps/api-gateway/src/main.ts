import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';

(async () => {
  const app = express();

  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to api-gateway!' });
  });

  const gateway = new ApolloGateway({
    serviceList: [{ name: 'accounts', url: process.env.ACCOUNTS_SERVICE_URL }],
  });

  const port = process.env.port || 4000;
  const server = new ApolloServer({
    gateway,
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port }, () =>
    console.log(`Api gateway ready at http://localhost:${port}`)
  );
})();
