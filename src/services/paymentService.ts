import InstantPayment from '../interfaces/instantPaymentPix';
import PixTransaction from '../interfaces/instantPaymentPixResponse';
import PaymentData from '../interfaces/paymentRequestInterface';
import { createHttpClient } from '../utils/authClient';
import Logger from '../utils/logger/logger';
import { handleAxiosError, isAxiosError } from '../utils/handleAxiosError';

export class PaymentService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.URL_CLIENT || '';
  }

  public async createPayment(data: Partial<PaymentData>): Promise<any> {
    const httpClient = await createHttpClient(this.baseURL);
    try {
      const response = await httpClient.post('/payments', data);
      return response.data;
    } catch (error) {
      Logger.error(
        'PaymentService - createPayment - Error creating payment',
        error,
      );
      if (isAxiosError(error)) {
        handleAxiosError(error);
      }
      throw error;
    }
  }

  public async createInstantPayment(
    data: Partial<InstantPayment>,
  ): Promise<PixTransaction> {
    Logger.debug(
      'PaymentService - createInstantPayment - generate http client',
    );
    const httpClient = await createHttpClient(this.baseURL);
    try {
      Logger.debug(
        'PaymentService - createInstantPayment - Calling external service',
      );
      const response = await httpClient.post('/v2/cob', data);
      return response.data;
    } catch (error) {
      Logger.error(
        'PaymentService - createInstantPayment - Error creating instant payment',
        error,
      );
      if (isAxiosError(error)) {
        handleAxiosError(error);
      }
      throw error;
    }
  }

  public async getAllPayments(
    initialDate: Date,
    endDate: Date,
  ): Promise<PixTransaction> {
    Logger.debug(
      'PaymentService - getAllPayments - generate http client with auth',
    );
    const httpClient = await createHttpClient(this.baseURL);
    try {
      Logger.debug(
        'PaymentService - getAllPayments - Calling external service',
      );

      const formattedInitialDate = initialDate
        .toISOString()
        .replace('.000Z', 'Z');
      const formattedEndDate = endDate.toISOString().replace('.000Z', 'Z');

      const url = `/v2/cob?inicio=${formattedInitialDate}&fim=${formattedEndDate}`;

      const response = await httpClient.get(url);

      return response.data;
    } catch (error) {
      Logger.error(
        'PaymentService - getAllPayments - Error getting all payments',
        error,
      );
      if (isAxiosError(error)) {
        handleAxiosError(error);
      }
      throw error;
    }
  }
}
