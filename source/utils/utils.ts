import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import { COINPAPRIKA_BASE_API_URL } from '~utils/consts';

export const client: AxiosInstance = axios.create({
  baseURL: COINPAPRIKA_BASE_API_URL
});

export const request = (options: AxiosRequestConfig): Promise<AxiosInstance> => {
  const onSuccess = (response: AxiosResponse<any>) => response.data;

  const onError = (error: AxiosError<any>) => {
    console.error(`Request failed: ${error.config}`);

    if (error.response) {
      // Received response code is not 2xx
      console.error(`Status: ${error.response.status}`);
      console.error(`Data:', ${error.response.data}`);
      console.error(`Headers:', ${error.response.headers}`);
    } else {
      // Request failed before getting any response
      console.error(`Error: ${error.message}`);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export const formatPrice = (price: number, currency?: string): string =>
  price ? `${price.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}${currency}` : '';
