import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

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

    this.client.interceptors.request.use((config: AxiosRequestConfig) => {
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
