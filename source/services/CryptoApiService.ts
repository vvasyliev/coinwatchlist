import BaseClient from '~/services/BaseClient';
import { COINGECKO_BASE_API_URL } from '~/utils/const';
import { IBaseClientConfig } from '~/types/services';

class CryptoApiService extends BaseClient {
  constructor(config: IBaseClientConfig) {
    super(config);
  }

  public getOverview = () => this.request('get', 'global');
  public getCoins = ({ vs_currency, ids, order, per_page, page, sparkline, price_change_percentage }: any) =>
    this.request('get', 'coins/markets', null, null, {
      vs_currency,
      ids,
      order,
      per_page,
      page,
      sparkline,
      price_change_percentage
    });
  public getCoin = (coinId: string) => this.request('get', `coins/${coinId}`);
}

export default new CryptoApiService({
  baseURL: COINGECKO_BASE_API_URL
});
