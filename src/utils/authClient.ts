import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import fs from 'fs';
import https from 'https';
import { HttpClient } from './httpClient';

const { CLIENT_ID, CLIENT_SECRET, CERTIFICATE_PATH, URL_CLIENT } = process.env;

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
    baseURL: URL_CLIENT,
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
    const axiosError = error as AxiosError;
    console.error('Error obtaining access token', axiosError);
    throw new Error('Failed to obtain access token');
  }
};

export const createHttpClient = async (
  baseURL: string,
): Promise<HttpClient> => {
  const token = await getAuthToken();
  return new HttpClient(baseURL, token, httpsAgent);
};
