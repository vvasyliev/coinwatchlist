import {
  SET_MARKET_LOADING,
  SET_MARKET_ERROR,
  GET_MARKET_OVERVIEW_SUCCESS,
  GET_MARKET_CRYPTOS_SUCCESS,
  GET_MARKET_CRYPTO_SUCCESS
} from '~/utils/const';
import { IMarket, IMarketAction } from '~/types/reducers';

const initialState: IMarket = { overview: {}, cryptos: [], isLoading: false, hasError: false };

export default function getMarketData(state = initialState, action: IMarketAction) {
  switch (action.type) {
    case SET_MARKET_ERROR:
      return {
        ...state,
        hasError: action.hasError
      };
    case SET_MARKET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case GET_MARKET_OVERVIEW_SUCCESS:
      return {
        ...state,
        overview: action.overview
      };
    case GET_MARKET_CRYPTOS_SUCCESS:
      return {
        ...state,
        cryptos: action.cryptos
      };
    case GET_MARKET_CRYPTO_SUCCESS:
      return {
        ...state,
        cryptos: action.cryptos
      };
    default:
      return state;
  }
}
