import axios, { AxiosInstance } from 'axios';

export class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string, token: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  public async post(url: string, data: any): Promise<any> {
    return this.client.post(url, data);
  }
}
