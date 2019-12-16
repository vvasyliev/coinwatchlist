import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { Tusd } from 'styled-icons/crypto/Tusd';
import { formatPrice } from '~/utils/utils';
import { IPriceStore } from '~/types/stores';

export interface IHeaderProps {
  PriceStore: IPriceStore;
}

const HoloToken = styled(Tusd)`
  color: white;
  width: 32px;
  margin-right: 0.5rem;
`;

const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 10fr 1fr;
  align-items: center;
  height: 50px;
  padding: 0 1rem;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.main};
`;

const LogoSection = styled.div`
  grid-column: 1;
  display: flex;
  align-items: center;
`;

const Heading = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`;

const Overview = styled.section`
  grid-column: 3;
  display: flex;
  justify-content: space-between;
`;

const OverviewItem = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
`;

@observer
class Header extends Component<IHeaderProps> {
  componentDidMount() {
    const { PriceStore } = this.props;
    PriceStore.getOverview();
  }

  render() {
    const { PriceStore } = this.props;
    const { overview } = PriceStore;
    const {
      bitcoin_dominance_percentage,
      cryptocurrencies_number,
      market_cap_usd,
      market_cap_change_24h,
      volume_24h_usd
    } = overview;

    return (
      <HeaderContainer>
        <LogoSection>
          <HoloToken />
          <Heading>CoinWatchList</Heading>
        </LogoSection>
        <Overview>
          <OverviewItem>
            BTC Dominance: <strong>{bitcoin_dominance_percentage}%</strong>
          </OverviewItem>
          <OverviewItem>
            Cryptocurrencies: <strong>{cryptocurrencies_number}</strong>
          </OverviewItem>
          <OverviewItem>
            Total Marketcap: <strong>{formatPrice(market_cap_usd, '$')}</strong>
          </OverviewItem>
          <OverviewItem>
            Marketcap change (24h): <strong>{market_cap_change_24h}%</strong>
          </OverviewItem>
          <OverviewItem>
            Volume (24h): <strong>{formatPrice(volume_24h_usd, '$')}</strong>
          </OverviewItem>
        </Overview>
      </HeaderContainer>
    );
  }
}

export default Header;
