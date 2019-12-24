import qs from 'qs';
import { Search } from 'history';
import { Dispatch } from 'redux';
import isEqual from 'lodash.isequal';
import { connect } from 'react-redux';
import styled from 'styled-components';
import React, { Component } from 'react';
import { push } from 'connected-react-router';

import Header from '~/components/Header/Header';
import { Container } from '~/components/common';
import { getCryptosData } from '~/actions/market';
import CryptoList from '~/components/CryptoList/CryptoList';
import { IStore, ICrypto, IGetCryptosParams, IOverview } from '~/types/reducers';

export interface ILeaderBoardPageProps {
  overview: IOverview;
  cryptos: ICrypto[];
  isLoading: boolean;
  search: Search;
  push: ({ path, state }: any) => void;
  getCryptos: (params: IGetCryptosParams) => void;
}

export interface ILeaderBoardPageState {
  page: number;
  cryptosPerPage: number;
}

const LeaderBoard = styled.section`
  background-color: ${({ theme }) => theme.primaryBackgroundColor};
`;

const LeaderBoardBody = styled.div`
  display: flex;
  justify-content: center;
`;

class LeaderBoardPage extends Component<ILeaderBoardPageProps, ILeaderBoardPageState> {
  constructor(props: ILeaderBoardPageProps) {
    super(props);

    const parsedSearch = qs.parse(props.search, { ignoreQueryPrefix: true });

    this.state = {
      page: parseInt(parsedSearch.page) || 1,
      cryptosPerPage: parseInt(parsedSearch.cryptosPerPage) || 100
    };
  }

  componentDidMount() {
    const { getCryptos } = this.props;
    const { page, cryptosPerPage } = this.state;

    getCryptos({ vs_currency: 'usd', page, per_page: cryptosPerPage });
  }

  componentDidUpdate(prevProps: ILeaderBoardPageProps, prevState: ILeaderBoardPageState) {
    const { getCryptos, push } = this.props;
    const { page, cryptosPerPage } = this.state;

    if (!isEqual(this.state, prevState)) {
      push({ path: { search: qs.stringify({ page, cryptosPerPage }) }));
      getCryptos({ vs_currency: 'usd', page, per_page: cryptosPerPage });
    }
  }

  handlePageChange = (nextPage: number): void => this.setState({ page: nextPage });

  render() {
    const { isLoading, overview, cryptos } = this.props;
    const { page, cryptosPerPage } = this.state;
    const { active_cryptocurrencies: cryptosTotal } = overview;

    const cryptoListProps = {
      isLoading,
      page,
      cryptosPerPage,
      cryptosTotal,
      cryptos,
      handlePageChange: this.handlePageChange
    };

    return (
      <LeaderBoard>
        <Header />
        <Container>
          <LeaderBoardBody>
            <CryptoList {...cryptoListProps} />
          </LeaderBoardBody>
        </Container>
      </LeaderBoard>
    );
  }
}

const mapStateToProps = (state: IStore) => {
  return {
    search: state.router.location.search,
    overview: state.market.overview,
    cryptos: state.market.cryptos,
    isLoading: state.market.isLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    push: ({ path, state }: any) => dispatch(push(path, state)),
    getCryptos: (params: IGetCryptosParams) => dispatch(getCryptosData(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardPage);
