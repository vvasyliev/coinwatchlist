import { Dispatch } from 'redux';

import CryptoApiService from '~/services/CryptoApiService';
import {
  GET_MARKET_OVERVIEW,
  GET_MARKET_OVERVIEW_SUCCESS,
  GET_MARKET_OVERVIEW_FAILURE,
  GET_MARKET_CRYPTOS,
  GET_MARKET_CRYPTOS_SUCCESS,
  GET_MARKET_CRYPTOS_FAILURE
} from '~/utils/const';
import { IOverview, ICrypto, IGetCryptosParams } from '~/types/reducers';

export function getMarketOverview() {
  return {
    type: GET_MARKET_OVERVIEW
  };
}

export function getMarketOverviewSuccess(overview: IOverview) {
  return {
    type: GET_MARKET_OVERVIEW_SUCCESS,
    overview
  };
}

export function getMarketOverviewFailure() {
  return {
    type: GET_MARKET_OVERVIEW_FAILURE
  };
}

export function getMarketCryptos() {
  return {
    type: GET_MARKET_CRYPTOS
  };
}

export function getMarketCryptosSuccess(cryptos: ICrypto[]) {
  return {
    type: GET_MARKET_CRYPTOS_SUCCESS,
    cryptos
  };
}

export function getMarketCryptosFailure() {
  return {
    type: GET_MARKET_CRYPTOS_FAILURE
  };
}

export function getOverviewData(): any {
  return (dispatch: Dispatch) => {
    dispatch(getMarketOverview());

    CryptoApiService.getOverview()
      .then(({ data }: any) => {
        dispatch(getMarketOverviewSuccess(data));
      })
      .catch(() => dispatch(getMarketOverviewFailure()));
  };
}

export function getCryptosData({
  vs_currency = 'usd',
  ids,
  order,
  per_page,
  page,
  sparkline,
  price_change_percentage
}: IGetCryptosParams): any {
  return (dispatch: Dispatch) => {
    dispatch(getMarketCryptos());

    CryptoApiService.getCoins({ vs_currency, ids, order, per_page, page, sparkline, price_change_percentage })
      .then((data: any) => {
        dispatch(getMarketCryptosSuccess(data));
      })
      .catch(() => dispatch(getMarketCryptosFailure()));
  };
}
