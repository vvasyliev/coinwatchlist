import {
  GET_MARKET_OVERVIEW,
  GET_MARKET_OVERVIEW_SUCCESS,
  GET_MARKET_OVERVIEW_FAILURE,
  GET_MARKET_CRYPTOS,
  GET_MARKET_CRYPTOS_SUCCESS,
  GET_MARKET_CRYPTOS_FAILURE,
  GET_MARKET_CRYPTO_SUCCESS
} from '~/utils/const';
import { IMarket, IMarketAction } from '~/types/reducers';

const initialState: IMarket = { overview: {}, cryptos: [], isLoading: false, hasError: false };

export default function getMarketData(state = initialState, action: IMarketAction) {
  switch (action.type) {
    case GET_MARKET_OVERVIEW:
      return {
        ...state,
        isLoading: true
      };
    case GET_MARKET_OVERVIEW_SUCCESS:
      return {
        ...state,
        overview: action.overview,
        isLoading: false
      };
    case GET_MARKET_OVERVIEW_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case GET_MARKET_CRYPTOS:
      return {
        ...state,
        isLoading: true
      };
    case GET_MARKET_CRYPTOS_SUCCESS:
      return {
        ...state,
        cryptos: action.cryptos,
        isLoading: false
      };
    case GET_MARKET_CRYPTOS_FAILURE:
      return {
        ...state,
        isLoading: false
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
