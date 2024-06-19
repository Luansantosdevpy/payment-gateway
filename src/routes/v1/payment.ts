import { Router } from 'express';
import { PaymentController } from '../../controllers/paymentController';

export default async (): Promise<Router> => {
  const router = Router();
  const paymentController = new PaymentController();

  router.post('/create', paymentController.createPayment);
  router.post(
    '/create-instant-payment',
    paymentController.createInstantPayment,
  );
  router.get('/get-payments-in-period', paymentController.getAllPayments);

  return router;
};
