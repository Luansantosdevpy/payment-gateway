import axios, { AxiosInstance } from 'axios';
import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

export class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string, token: string, httpsAgent: https.Agent) {
    this.client = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      httpsAgent: httpsAgent,
    });

    this.client.interceptors.request.use((config) => {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
      return config;
    });
  }

  public async post(url: string, data: any): Promise<any> {
    return this.client.post(url, data);
  }

  public async get(url: string): Promise<any> {
    return this.client.get(url);
  }

  public async put(url: string, data: any): Promise<any> {
    return this.client.put(url, data);
  }

  public async delete(url: string): Promise<any> {
    return this.client.delete(url);
  }
}
