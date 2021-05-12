import express, { request } from 'express';

const app = express();
app.use(express.json());

app.post('/', (request, response) => {
  const { name } = request.body;
  return response.json({ name });
});

app.listen(3333);
