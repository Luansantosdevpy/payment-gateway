import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import fs from 'fs';
import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

const { CLIENT_ID, CLIENT_SECRET, CERTIFICATE_PATH } = process.env;

if (!CLIENT_ID || !CLIENT_SECRET || !CERTIFICATE_PATH) {
  throw new Error(
    'Environment variables for API credentials and certificate are not set.',
  );
}

const data_credentials = CLIENT_ID + ':' + CLIENT_SECRET;

const auth = Buffer.from(data_credentials).toString('base64');

const certificate = fs.readFileSync(CERTIFICATE_PATH);

const httpsAgent = new https.Agent({
  pfx: certificate,
  passphrase: '',
  rejectUnauthorized: false,
});

const getAuthToken = async (): Promise<string> => {
  const tokenData = JSON.stringify({ grant_type: 'client_credentials' });

  const config: AxiosRequestConfig = {
    url: '/oauth/token',
    method: 'post' as Method,
    baseURL: 'https://pix-h.api.efipay.com.br',
    headers: {
      Authorization: 'Basic ' + auth,
      'Content-Type': 'application/json',
    },
    httpsAgent: httpsAgent,
    data: tokenData,
    timeout: 10000,
  };

  try {
    const response = await axios(config);
    return response.data.access_token;
  } catch (error) {
    const axiosError = error as any;
    console.error('Error obtaining access token', axiosError);
    throw new Error('Failed to obtain access token');
  }
};

export class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string, token: string) {
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
    console.log(data);
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

export const createHttpClient = async (
  baseURL: string,
): Promise<HttpClient> => {
  const token = await getAuthToken();
  return new HttpClient(baseURL, token);
};
