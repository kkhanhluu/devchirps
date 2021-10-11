import 'reflect-metadata';
import { bootstrap } from './apollo/server';
import { app } from './app';

(async () => {
  const server = await bootstrap();
  await server.start();

  server.applyMiddleware({ app });
})();
