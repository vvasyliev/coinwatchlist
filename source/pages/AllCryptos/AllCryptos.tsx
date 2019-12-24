import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import React, { Component } from 'react';

import Header from '~/components/Header/Header';
import { Container } from '~/components/common';
import { getCryptosData } from '~/actions/market';
import { IStore, IGetCryptosParams, ICrypto } from '~/types/reducers';

export interface IAllCryptosPageProps {
  cryptos: ICrypto[];
  isLoading: boolean;
  getCryptos: (params: IGetCryptosParams) => void;
}

const AllCryptos = styled.section``;

class AllCryptosPage extends Component<IAllCryptosPageProps> {
  render() {
    return (
      <AllCryptos>
        <Header />
        <Container>test</Container>
      </AllCryptos>
    );
  }
}

const mapStateToProps = (state: IStore) => {
  return {
    cryptos: state.market.cryptos,
    isLoading: state.market.isLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getCryptos: (params: IGetCryptosParams) => dispatch(getCryptosData(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCryptosPage);
