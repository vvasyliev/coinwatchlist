import { AxiosPromise } from 'axios';

export interface IBaseClientConfig {
  headers?: any;
  baseURL?: string;
}
export interface IBaseClient {
  setConfig(config: IBaseClientConfig): void;
  request(method: string, url: string, data?: Object, headers?: {}): AxiosPromise;
}
