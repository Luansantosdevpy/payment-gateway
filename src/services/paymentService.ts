import { getAccountInfo } from '../config/pagSeguroConfig';
import { HttpClient } from '../utils/httpClient';

export class PagseguroService {
  private getHttpClient(account: string): HttpClient {
    const config = getAccountInfo(account);
    if (!config) {
      throw new Error(`Account configuration not found for ${account}`);
    }
    return new HttpClient(config.apiUrl, config.token);
  }

  public async createPayment(account: string, data: any): Promise<any> {
    const httpClient = this.getHttpClient(account);
    const response = await httpClient.post('/payments', data);
    return response.data;
  }
}
