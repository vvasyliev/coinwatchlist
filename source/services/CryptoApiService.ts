import BaseClient from '~/services/BaseClient';
import { COINPAPRIKA_BASE_API_URL } from '~/utils/consts';
import { IBaseClientConfig } from '~/types/services';

class CryptoApiService extends BaseClient {
  constructor(config: IBaseClientConfig) {
    super(config);
  }

  public getOverview = () => this.request('get', 'global');
  public getCoin = (coinId: string) => this.request('get', `coins/${coinId}`);
  public getCoins = () => this.request('get', 'coins');
}

export default new CryptoApiService({
  baseURL: COINPAPRIKA_BASE_API_URL
});
