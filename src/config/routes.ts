import express from 'express';
import errorMiddleware from '../middlewares/errorMiddleware';
import routes from '../routes/routes';

export default async function configureRoutes(
  app: express.Application,
): Promise<void> {
  app.use(await routes());
  app.use(errorMiddleware);
}
