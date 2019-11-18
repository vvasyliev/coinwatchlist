import axios from 'axios';
import { observable, action } from 'mobx';

import { COINPAPRIKA_BASE_API_URL } from '~/utils/consts';

export interface IOverview {
  bitcoin_dominance_percentage?: number;
  cryptocurrencies_number?: number;
  last_updated?: number;
  market_cap_ath_date?: string; // ISO-8601 date string
  market_cap_ath_value?: number;
  market_cap_change_24h?: number;
  market_cap_usd?: number;
  volume_24h_ath_date?: string; // ISO-8601 date string
  volume_24h_ath_value?: number;
  volume_24h_change_24h?: number;
  volume_24h_percent_from_ath?: number;
  volume_24h_percent_to_ath?: number;
  volume_24h_usd?: number;
}

export interface IPriceStore {
  isLoading: boolean;
  overview: IOverview;
  coins: object[];
  getOverview: () => void;
  getCoins: () => void;
  getCoin: (coinId: string) => void;
}

class PriceStore implements IPriceStore {
  @observable isLoading = false;
  @observable overview = {};
  coins = [];

  @action
  getOverview() {
    this.isLoading = true;
    axios.get(`${COINPAPRIKA_BASE_API_URL}global`).then(({ data }) => {
      this.overview = data;
      this.isLoading = false;
    });
  }

  @action
  getCoins() {
    this.isLoading = true;
    axios.get('https://api.coinpaprika.com/v1/coins').then(({ data }) => {
      this.coins = data;
      this.isLoading = false;
    });
  }

  @action getCoin(coinId: string) {
    this.isLoading = true;
    axios.get(`https://api.coinpaprika.com/v1/coins/${coinId}`).then(({ data }) => {
      this.isLoading = false;
      return data;
    });
  }
}

export default new PriceStore();
