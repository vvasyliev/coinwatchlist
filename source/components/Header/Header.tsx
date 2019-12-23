import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Typography } from 'antd';

import { Tusd } from 'styled-icons/crypto/Tusd';
import { getOverviewData } from '~/actions/market';
import { IStore, IOverview } from '~/types/reducers';
import { formatNumber, formatPrice } from '~/utils/util';

export interface IHeaderProps {
  overview: IOverview;
  isLoading: boolean;
  getOverview: () => void;
}

const { Text } = Typography;

const HoloToken = styled(Tusd)`
  color: white;
  width: 32px;
  margin-right: 0.5rem;
`;

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.main};
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
  border-bottom: 1px solid black;
`;

const OverviewStripItem = styled.span`
  white-space: nowrap;
  font-size: 12px;
  color: ${({ theme }) => theme.text};

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

class Header extends Component<IHeaderProps> {
  componentDidMount() {
    const { getOverview } = this.props;
    getOverview();
  }

  render() {
    const { overview, isLoading } = this.props;
    const {
      bitcoin_dominance_percentage,
      cryptocurrencies_number,
      market_cap_usd,
      market_cap_change_24h,
      volume_24h_usd
    } = overview;

    if (isLoading) return <div>loading...</div>;

    return (
      <HeaderContainer>
        <OverviewStrip>
          <OverviewStripItem>
            <Text>
              BTC Dominance: <strong>{formatNumber(bitcoin_dominance_percentage)}%</strong>
            </Text>
          </OverviewStripItem>
          <OverviewStripItem>
            <Text>
              Cryptocurrencies: <strong>{formatNumber(cryptocurrencies_number)}</strong>
            </Text>
          </OverviewStripItem>
          <OverviewStripItem>
            <Text>
              Total Marketcap: <strong>{formatPrice(market_cap_usd, '$')}</strong>
            </Text>
          </OverviewStripItem>
          <OverviewStripItem>
            <Text>
              Marketcap change (24h): <strong>{formatNumber(market_cap_change_24h)}%</strong>
            </Text>
          </OverviewStripItem>
          <OverviewStripItem>
            <Text>
              Volume (24h): <strong>{formatPrice(volume_24h_usd, '$')}</strong>
            </Text>
          </OverviewStripItem>
        </OverviewStrip>
        <LogoSection>
          <HoloToken />
          <Heading>CoinWatchList</Heading>
        </LogoSection>
      </HeaderContainer>
    );
  }
}

const mapStateToProps = ({ market }: IStore) => {
  return {
    overview: market.overview,
    isLoading: market.isLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getOverview: () => dispatch(getOverviewData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
