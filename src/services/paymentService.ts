import PixTransaction from '../interfaces/instantPaymentPixResponse';
import PaymentData from '../interfaces/paymentRequestInterface';
import { HttpClient } from '../utils/httpClient';
import Logger from '../utils/logger/logger';

export class PaymentService {
  private baseURL: string;
  private token: string;

  constructor() {
    this.baseURL = process.env.BASE_URL || '';
    this.token = process.env.TOKEN || '';
  }

  private createHttpClient(): HttpClient {
    return new HttpClient(this.baseURL, this.token);
  }

  public async createPayment(data: Partial<PaymentData>): Promise<any> {
    const httpClient = this.createHttpClient();
    const response = await httpClient.post('/payments', data);
    return response.data;
  }

  public async createInstantPayment(
    data: Partial<PaymentData>,
  ): Promise<PixTransaction> {
    Logger.debug(
      'PaymentService - createInstantPayment - generate http client',
    );
    const httpClient = this.createHttpClient();

    Logger.debug(
      'PaymentService - createInstantPayment - Calling external service',
    );
    const response = await httpClient.post('/v2/cob', data);
    return response.data;
  }
}
