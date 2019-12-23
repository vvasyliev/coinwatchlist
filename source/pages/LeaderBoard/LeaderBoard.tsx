import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import CryptoList from '~/components/CryptoList/CryptoList';
import { IStore, ICrypto } from '~/types/reducers';
import { getCryptosData } from '~/actions/market';
import Header from '~/components/Header/Header';

export interface ILeaderBoardProps {
  cryptos: ICrypto[];
  getCryptos: () => void;
}

export interface ILeaderBoardState {
  page: number;
}

class LeaderBoard extends Component<ILeaderBoardProps, ILeaderBoardState> {
  readonly state = {
    page: 1
  };

  componentDidMount() {
    const { getCryptos } = this.props;
    getCryptos();
  }

  handlePageChange = (nextPage: number): void => this.setState({ page: nextPage });

  render() {
    const { cryptos } = this.props;

    return (
      <div>
        <Header />
        <CryptoList cryptos={cryptos} />
      </div>
    );
  }
}

const mapStateToProps = ({ market }: IStore) => {
  return {
    cryptos: market.cryptos,
    isLoading: market.isLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getCryptos: () => dispatch(getCryptosData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
