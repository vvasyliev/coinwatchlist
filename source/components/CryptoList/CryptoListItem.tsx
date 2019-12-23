import React from 'react';
import styled from 'styled-components';
import { Coins } from 'styled-icons/fa-solid/Coins';
import { Casino } from 'styled-icons/material/Casino';

import { ICrypto, CryptoType } from '~/types/reducers';

const CryptoItem = styled.tr`
`;

const CryptoInfo = styled.th`
  padding: 5px;
`;

const Coin = styled(Coins)`
  height: 16px;
`;

const Token = styled(Casino)`
  height: 16px;
`;

const renderType = (type: CryptoType) => (type === 'coin' ? <Coin /> : <Token />);

const CryptoListItem = ({ rank, symbol, name, type }: ICrypto) => (
  <CryptoItem>
    <CryptoInfo>{rank}</CryptoInfo>
    <CryptoInfo>{symbol}</CryptoInfo>
    <CryptoInfo>{name}</CryptoInfo>
    <CryptoInfo>{renderType(type)}</CryptoInfo>
  </CryptoItem>
);

export default CryptoListItem;
