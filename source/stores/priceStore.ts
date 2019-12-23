import { observable, action } from 'mobx';

import CryptoApiService from '~/services/CryptoApiService';

class PriceStore implements IPriceStore {
  @observable isLoading = false;
  @observable overview = {};
  @observable coins = [];

  @action
  getOverview() {
    this.isLoading = true;
    CryptoApiService.getOverview().then((data) => {
      this.overview = data;
      this.isLoading = false;
    });
  }

  @action
  getCoins() {
    this.isLoading = true;
    CryptoApiService.getCoins().then((data: any) => {
      this.coins = data;
      this.isLoading = false;
    });
  }

  @action getCoin(coinId: string) {
    this.isLoading = true;
    CryptoApiService.getCoin(coinId).then((data: any) => {
      this.isLoading = false;
      return data;
    });
  }
}

export default new PriceStore();
