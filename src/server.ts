import express from 'express';
import { categoriesRoutes } from './routes/categories.routes';

const app = express();
app.use(express.json());

app.use('/v1/categories', categoriesRoutes);

app.listen(3333, () => {
  console.clear();
  console.log('🛰  Server is running, lets hack');
});
