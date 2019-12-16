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

export type CryptoType = 'token' | 'coin';

export interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: CryptoType
}

export interface IPriceStore {
  isLoading: boolean;
  overview: IOverview;
  coins: ICoin[];
  getOverview: () => void;
  getCoins: () => void;
  getCoin: (coinId: string) => void;
}
