import React, { Component } from 'react';

import CryptoListItem from './CryptoListItem';
import { ICrypto } from '~/types/reducers';
import styled from 'styled-components';

export interface ICryptoListProps {
  cryptos: ICrypto[];
  cryptosPerPage?: number;
}

export interface ICryptoListState {
  page: number;
}

const CryptoListTable = styled.table`
  margin: 0 auto;
`;

class CryptoList extends Component<ICryptoListProps, ICryptoListState> {
  static readonly defaultProps = {
    cryptosPerPage: 100
  };

  readonly state = {
    page: 1
  };

  handlePageChange = (nextPage: number): void => this.setState({ page: nextPage });

  renderCryptosHeader = (): React.ReactNode => (
    <thead>
      <tr>
        <th>Rank</th>
        <th>Ticker</th>
        <th>Name</th>
        <th>Type</th>
      </tr>
    </thead>
  );

  renderCryptosList = (cryptos: ICrypto[]): React.ReactNode => {
    const { cryptosPerPage } = this.props;

    return (
      <tbody>
        {cryptos.slice(0, cryptosPerPage).map((crypto: ICrypto) => (
          <CryptoListItem key={crypto.id} {...crypto} />
        ))}
      </tbody>
    );
  };

  render() {
    const { cryptos } = this.props;

    return (
      <CryptoListTable>
        {this.renderCryptosHeader()}
        {this.renderCryptosList(cryptos)}
      </CryptoListTable>
    );
  }
}

export default CryptoList;
