import { Action } from 'redux';
import { RouterState } from 'connected-react-router';

export interface IStore {
  router: RouterState;
  market: IMarket;
}

export interface IMarket {
  overview: IOverview | {};
  cryptos: ICrypto[];
  isLoading: boolean;
  hasError: boolean;
}

export interface IOverview {
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;
  total_market_cap: ITotalValuation;
  total_volume: ITotalValuation;
  market_cap_percentage: IMarketShare;
  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
}

export interface ICrypto {
  id: string;
  symbol: string;
  name: string;
  image: string; // logo url
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
}

export interface IMarketAction extends IMarket {
  type: string;
}

export interface IMarketShare {
  btc: number;
  eth: number;
  xrp: number;
  usdt: number;
  bch: number;
  ltc: number;
  eos: number;
  bnb: number;
  etc: number;
}

export interface ITotalValuation {
  aed: number;
  ars: number;
  aud: number;
  bch: number;
  bdt: number;
  bhd: number;
  bmd: number;
  bnb: number;
  brl: number;
  btc: number;
  cad: number;
  chf: number;
  clp: number;
  cny: number;
  czk: number;
  dkk: number;
  eos: number;
  eth: number;
  eur: number;
  gbp: number;
  hkd: number;
  huf: number;
  idr: number;
  ils: number;
  inr: number;
  jpy: number;
  krw: number;
  kwd: number;
  lkr: number;
  ltc: number;
  mmk: number;
  mxn: number;
  myr: number;
  nok: number;
  nzd: number;
  php: number;
  pkr: number;
  pln: number;
  rub: number;
  sar: number;
  sek: number;
  sgd: number;
  thb: number;
  try: number;
  twd: number;
  uah: number;
  usd: number;
  vef: number;
  vnd: number;
  xag: number;
  xau: number;
  xdr: number;
  xlm: number;
  xrp: number;
  zar: number;
}

export type MarketOrderType =
  | 'market_cap_desc'
  | 'gecko_desc'
  | 'gecko_asc'
  | 'market_cap_asc'
  | 'market_cap_desc'
  | 'volume_asc'
  | 'volume_desc';

export interface IGetCryptosParams {
  vs_currency: string;
  ids?: string[];
  order?: MarketOrderType;
  per_page?: number;
  page?: number;
  sparkline?: boolean;
  price_change_percentage?: string;
}
