import axios, { AxiosInstance, AxiosRequestConfig, Method, AxiosResponse, AxiosError, AxiosPromise } from 'axios';

import { IBaseClient, IBaseClientConfig } from '~/types/services';

class BaseClient implements IBaseClient {
  client: AxiosInstance = axios.create();

  static headers = {
    Accept: 'application/json'
  };

  config: IBaseClientConfig = {
    headers: {},
    baseURL: ''
  };

  constructor(config: IBaseClientConfig) {
    this.setConfig(config);
  }

  private _getHeaders = (headers?: any): any => {
    return Object.assign({}, this.config.headers, headers);
  };

  private _getURL = (url: string): string => {
    return `${this.config.baseURL}/${url}`;
  };

  public setConfig(config: IBaseClientConfig): void {
    this.config = Object.assign({}, this.config, config);
  }

  public request(method: Method, url: string, data?: any, headers?: any, params?: any): AxiosPromise {
    const requestHeaders: any = this._getHeaders(headers);
    const requestUrl: string = this._getURL(url);
    const requestConfig: AxiosRequestConfig = {
      method,
      data,
      params,
      url: requestUrl,
      headers: requestHeaders
    };

    return this.client(requestConfig)
      .then((response: AxiosResponse) => response.data)
      .catch((error: AxiosError) => {
        if (error.response) {
          // The response contained code different from 2xx
          console.error('Request failed: ', error);
        } else {
          // Request failed before getting delivered
          console.error('Request not sent: ', error);
        }
      });
  }
}

export default BaseClient;
