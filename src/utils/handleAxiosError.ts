import { AxiosError } from 'axios';

export function isAxiosError(error: any): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

export function handleAxiosError(error: AxiosError): never {
  if (error.response) {
    const { status, data } = error.response;
    throw new Error(`Request failed with status ${status}: ${data}`);
  } else if (error.request) {
    throw new Error('No response received: ' + error.message);
  } else {
    throw new Error('Error setting up request: ' + error.message);
  }
}
