import { Dispatch } from 'redux';

import CryptoApiService from '~/services/CryptoApiService';
import {
  SET_MARKET_LOADING,
  GET_MARKET_OVERVIEW_SUCCESS,
  SET_MARKET_ERROR,
  GET_MARKET_CRYPTOS_SUCCESS
} from '~/utils/const';
import { IOverview, ICrypto } from '~/types/reducers';

export function setMarketError(hasError: boolean) {
  return {
    type: SET_MARKET_ERROR,
    hasError
  };
}

export function setMarketLoading(isLoading: boolean) {
  return {
    type: SET_MARKET_LOADING,
    isLoading
  };
}

export function getMarketOverviewSuccess(overview: IOverview) {
  return {
    type: GET_MARKET_OVERVIEW_SUCCESS,
    overview
  };
}

export function getMarketCryptosSuccess(cryptos: ICrypto[]) {
  return {
    type: GET_MARKET_CRYPTOS_SUCCESS,
    cryptos
  };
}

export function getOverviewData(): any {
  return (dispatch: Dispatch) => {
    dispatch(setMarketLoading(true));

    CryptoApiService.getOverview()
      .then((data: any) => {
        dispatch(setMarketLoading(false));
        dispatch(getMarketOverviewSuccess(data));
      })
      .catch(() => dispatch(setMarketError(true)));
  };
}

export function getCryptosData(): any {
  return (dispatch: Dispatch) => {
    dispatch(setMarketLoading(true));

    CryptoApiService.getCoins()
      .then((data: any) => {
        dispatch(setMarketLoading(false));
        dispatch(getMarketCryptosSuccess(data));
      })
      .catch(() => dispatch(setMarketError(true)));
  };
}
