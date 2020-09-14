import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Tusd } from '@styled-icons/crypto/Tusd';

import { Text } from '~/components/common';
import { LEADER_BOARD_ROUTE } from '~/utils/const';
import { getOverviewData } from '~/actions/market';
import { IStore, IOverview } from '~/types/reducers';
import { formatNumber, formatPrice } from '~/utils/util';

export interface IHeaderProps {
  overview: IOverview;
  isLoading: boolean;
  getOverview: () => void;
}

const LogoIcon = styled(Tusd)`
  color: white;
  width: 32px;
  margin-right: 0.5rem;
`;

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.primaryTextColor};
  background-color: ${({ theme }) => theme.primaryBackgroundColor};
  border-bottom: 1px solid;
  border-bottom-color: ${({ theme }) => theme.dimmedBackgroundColor};
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;

const Heading = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`;

const OverviewStrip = styled.section`
  display: flex;
  padding: 0.5rem;
  overflow: scroll;
  border-bottom: 1px solid;
  border-bottom-color: ${({ theme }) => theme.dimmedBackgroundColor};
`;

const OverviewStripItem = styled.span`
  white-space: nowrap;
  font-size: 12px;
  color: ${({ theme }) => theme.primaryTextColor};

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Header: React.FC<IHeaderProps> = ({ getOverview, overview }) => {
  useEffect(() => {
    getOverview();
  }, []);

  const {
    active_cryptocurrencies,
    markets,
    total_market_cap,
    total_volume,
    market_cap_percentage,
    market_cap_change_percentage_24h_usd
  } = overview;

  return (
    <HeaderContainer>
      <OverviewStrip>
        <OverviewStripItem>
          <Text>
            BTC Dominance: <strong>{formatNumber(market_cap_percentage?.btc / 100, 'percent', 2)}</strong>
          </Text>
        </OverviewStripItem>
        <OverviewStripItem>
          <Text>
            Cryptocurrencies: <strong>{formatNumber(active_cryptocurrencies)}</strong>
          </Text>
        </OverviewStripItem>
        <OverviewStripItem>
          <Text>
            Exchanges: <strong>{formatNumber(markets)}</strong>
          </Text>
        </OverviewStripItem>
        <OverviewStripItem>
          <Text>
            Total Marketcap: <strong>{formatPrice(total_market_cap?.btc)}</strong>
          </Text>
        </OverviewStripItem>
        <OverviewStripItem>
          <Text>
            Marketcap change (24h):
            <strong> {formatNumber(market_cap_change_percentage_24h_usd / 100, 'percent', 2)}</strong>
          </Text>
        </OverviewStripItem>
        <OverviewStripItem>
          <Text>
            Volume (24h): <strong>{formatPrice(total_volume?.btc)}</strong>
          </Text>
        </OverviewStripItem>
      </OverviewStrip>
      <Link to={LEADER_BOARD_ROUTE}>
        <LogoSection>
          <LogoIcon />
          <Heading>CoinWatchList</Heading>
        </LogoSection>
      </Link>
    </HeaderContainer>
  );
};

const mapStateToProps = (state: IStore) => {
  return {
    overview: state.market.overview,
    isLoading: state.market.isLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getOverview: () => dispatch(getOverviewData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
