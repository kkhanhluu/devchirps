import express from 'express';

export const app = express();

const port = process.env.PORT || 4002;

app.get('/api', (req, res) => res.send({ message: 'Welcome to profile service' }));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
