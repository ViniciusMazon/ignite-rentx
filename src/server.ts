/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import express, { NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import './database';
import { router } from './routes';
import './shared/container';
import { AppError } from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error ${err.message}`,
    });
  },
);

app.listen(3333, () => {
  console.clear();
  console.log("🛰  Don't panic! The server is up...");
});
