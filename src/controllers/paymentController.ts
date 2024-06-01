import { Request, Response, NextFunction } from 'express';
import { PagseguroService } from '../services/paymentService';

export class PaymentController {
  private pagseguroService: PagseguroService;

  constructor() {
    this.pagseguroService = new PagseguroService();
  }

  public createPayment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const paymentData = req.body;
      const account = req.query.account as string;
      const result = await this.pagseguroService.createPayment(
        account,
        paymentData,
      );
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}
