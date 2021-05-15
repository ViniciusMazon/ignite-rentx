import express from 'express';
import { categoriesRoutes } from './routes/categories.routes';
import { specificationsRoutes } from './routes/specifications.routes';

const app = express();
app.use(express.json());

app.use('/v1/categories', categoriesRoutes);
app.use('/v1/specifications', specificationsRoutes);

app.listen(3333, () => {
  console.clear();
  console.log("🛰  Don't panic! The server is up...");
});
