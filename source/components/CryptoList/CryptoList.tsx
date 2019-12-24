import { Column, CellProps } from 'react-table';
import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Expand } from 'styled-icons/boxicons-regular/Expand';
import { LeftArrow } from 'styled-icons/boxicons-regular/LeftArrow';
import { RightArrow } from 'styled-icons/boxicons-regular/RightArrow';

import { ICrypto } from '~/types/reducers';
import { formatPrice, formatNumber } from '~/utils/util';
import { Table, Button, ButtonGroup, Loader, Text } from '~/components/common';

export interface ICryptoListBase {
  cryptosPerPage: number;
  page: number;
  cryptosTotal: number;
  handlePageChange: (page: number) => void;
}

export interface ICryptoListControls extends ICryptoListBase {
  isLoading: boolean;
}

export interface ICryptoListProps extends ICryptoListBase {
  isLoading: boolean;
  cryptos: ICrypto[];
}

const CryptoListWrapper = styled.div`
  overflow-x: auto;
  margin: 1rem;
  min-width: 100%;
`;

const PriceChange = styled.span`
  color: ${({ theme, isNegative }: { theme: any; isNegative: boolean }) =>
    isNegative ? theme.primaryRed : theme.primaryGreen};
`;

const CryptoListControls = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 6px;
`;

const Folio = styled(Text)`
  display: flex;
  align-items: center;
  margin-right: auto;
  font-size: 12px;
`;

const FolioInfo = styled.span`
  margin-right: 6px;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
  overflow-y: scroll;
  white-space: nowrap;
`;

const iconStyle = css`
  height: 12px;
  color: ${({ theme }) => theme.primaryTextColor};
`;

const PrevIcon = styled(LeftArrow)`
  ${iconStyle}
  margin-right: 6px;
`;

const NextIcon = styled(RightArrow)`
  ${iconStyle}
  margin-left: 6px;
`;

const AllIcon = styled(Expand)`
  ${iconStyle}
  margin-left: 6px;
`;

const renderCryptoListControls = ({
  isLoading,
  cryptosPerPage,
  page,
  cryptosTotal,
  handlePageChange
}: ICryptoListControls): React.ReactNode => {
  const maxPage: number = Math.ceil(cryptosTotal / cryptosPerPage);

  return (
    <CryptoListControls>
      <Folio>
        <FolioInfo>
          {page} / {maxPage}
        </FolioInfo>
        {isLoading && <Loader size={12} />}
      </Folio>
      <ButtonGroup>
        {page > 1 ? (
          <Button disabled={isLoading} onClick={() => handlePageChange(page - 1)}>
            <PrevIcon />
            <Text>Prev</Text>
          </Button>
        ) : null}
        {page < maxPage ? (
          <Button disabled={isLoading} onClick={() => handlePageChange(page + 1)}>
            <Text>Next</Text>
            <NextIcon />
          </Button>
        ) : null}
        <Button>
          <Link to={'/all'}>
            <Text>Show All</Text>
            <AllIcon />
          </Link>
        </Button>
      </ButtonGroup>
    </CryptoListControls>
  );
};

const renderCryptoListPagination = ({
  cryptosPerPage,
  page,
  cryptosTotal,
  handlePageChange
}: ICryptoListBase): React.ReactNode => {
  const maxPage: number = Math.ceil(cryptosTotal / cryptosPerPage);

  return (
    <Pagination>
      <ButtonGroup>
        <Button disabled={page === 1} onClick={useCallback(() => handlePageChange(1), [])}>
          <Text>{'<<'}</Text>
        </Button>
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
          <Text>{'<'}</Text>
        </Button>
        <Button disabled={page === maxPage} onClick={() => handlePageChange(page + 1)}>
          <Text>{'>'}</Text>
        </Button>
        <Button disabled={page === maxPage} onClick={() => handlePageChange(maxPage)}>
          <Text>{'>>'}</Text>
        </Button>
      </ButtonGroup>
    </Pagination>
  );
};

const tickerCellFormatter = ({ cell: { value } }: CellProps<any>): React.ReactNode => value?.toUpperCase();
const priceCellFormatter = ({ cell: { value } }: CellProps<any>): React.ReactNode =>
  value ? formatPrice(value, 'usd') : null;
const percentageChangeFormatter = ({ cell: { value } }: CellProps<any>): React.ReactNode => (
  <PriceChange isNegative={value < 0}>{formatNumber(value / 100, 'percent', 2)}</PriceChange>
);
const totalSupplyCellFormatter = ({ cell: { value } }: CellProps<any>): React.ReactNode =>
  value ? formatNumber(value, 'decimal', 0) : '∞';

const CryptoList: React.FC<ICryptoListProps> = ({
  cryptos,
  cryptosPerPage,
  page,
  cryptosTotal,
  handlePageChange,
  isLoading
}) => {
  // the react-table wants these memorized for some reason
  const columns = useMemo<Column[]>(
    () => [
      { Header: 'Rank', accessor: 'market_cap_rank', sortType: 'basic' },
      { Header: 'Ticker', accessor: 'symbol', sortType: 'alphanumeric', Cell: tickerCellFormatter },
      { Header: 'Name', accessor: 'name', sortType: 'alphanumeric' },
      { Header: 'Market cap', accessor: 'market_cap', sortType: 'basic', Cell: priceCellFormatter },
      { Header: 'Price', accessor: 'current_price', sortType: 'basic', Cell: priceCellFormatter },
      { Header: 'Volume (24h)', accessor: 'total_volume', sortType: 'basic', Cell: priceCellFormatter },
      {
        Header: 'Price change (%, 24h)',
        accessor: 'price_change_percentage_24h',
        sortType: 'basic',
        Cell: percentageChangeFormatter
      },
      { Header: 'Circulating supply', accessor: 'circulating_supply', sortType: 'basic' },
      { Header: 'Total supply', accessor: 'total_supply', sortType: 'basic', Cell: totalSupplyCellFormatter }
    ],
    []
  );

  // the react-table wants these memorized for some reason
  const data = useMemo<ICrypto[]>(() => cryptos, [cryptos]);

  return (
    <CryptoListWrapper>
      {renderCryptoListControls({ isLoading, cryptosPerPage, page, cryptosTotal, handlePageChange })}
      <Table columns={columns} data={data} isSortable={true} />
      {renderCryptoListPagination({ cryptosPerPage, page, cryptosTotal, handlePageChange })}
    </CryptoListWrapper>
  );
};

export default CryptoList;
