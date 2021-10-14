import express from 'express';

export const app = express();

const port = process.env.PORT || 4001;
app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to accountsService!' });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
