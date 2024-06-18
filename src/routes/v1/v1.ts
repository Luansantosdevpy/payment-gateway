import { Router } from 'express';
import payment from './payment';

export default async (): Promise<Router> => {
  const router = Router();

  router.use('/v1', router);
  router.use('/payment', await payment());
  return router;
};
