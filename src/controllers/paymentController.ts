import { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/paymentService';
import Logger from '../utils/logger/logger';

export class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  public createPayment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const paymentData = req.body;
      const result = await this.paymentService.createPayment(paymentData);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  public createInstantPayment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      Logger.debug('PaymentController - createInstantPayment - get body');
      const paymentData = req.body;

      Logger.debug(
        'PaymentController - createInstantPayment - calling paymentService.createInstantPayment',
      );
      const result = await this.paymentService.createInstantPayment(
        paymentData,
      );
      res.status(201).json(result);
    } catch (error) {
      Logger.error(
        'PaymentController - createInstantPayment - Error to create payment',
      );
      next(error);
    }
  };
}
