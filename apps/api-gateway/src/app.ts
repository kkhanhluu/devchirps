import express from 'express';
import { checkJWt } from './auth';

export const app = express();

app.use(checkJWt);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api-gateway!' });
});

app.get('/protected', (req, res) => {
  if (!req.user) {
    res.status(401).send('Not authenticated');
  }
});
