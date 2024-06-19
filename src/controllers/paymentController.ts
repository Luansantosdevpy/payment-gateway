import { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/paymentService';
import Logger from '../utils/logger/logger';
import { handleServiceError } from '../utils/handleServiceError';

interface RequestQuery {
  initialDate: Date;
  endDate: Date;
}

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
      Logger.error(
        'PaymentController - createPayment - Error creating payment',
        error,
      );
      handleServiceError(res, error);
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
        error,
      );
      handleServiceError(res, error);
    }
  };

  public getAllPayments = async (
    req: Request<RequestQuery>,
    res: Response,
    next: NextFunction,
  ) => {
    const { initialDate, endDate } = req.query as unknown as RequestQuery;
    try {
      Logger.debug(
        'PaymentController - getAllPayments - calling paymentService.getAllPayments',
      );

      const initialDateObj = new Date(initialDate);
      const endDateObj = new Date(endDate);

      if (isNaN(initialDateObj.getTime()) || isNaN(endDateObj.getTime())) {
        throw new Error('Invalid date format');
      }

      const result = await this.paymentService.getAllPayments(
        initialDateObj,
        endDateObj,
      );
      res.status(200).json(result);
    } catch (error) {
      Logger.error(
        'PaymentController - getAllPayments - Error to get payments',
        error,
      );
      handleServiceError(res, error);
    }
  };
}
