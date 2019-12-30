import React from 'react';
import styled from 'styled-components';
import { useTable, useSortBy, HeaderGroup, Row, Cell, Column } from 'react-table';
// @TODO: check these options, should be tested on being really optional
// and see if pagination has become customizable enough to do it here (useTokenPagination?)
export interface ITableParams {
  isSortable?: boolean;
}

export interface ITableHeaderProps {
  headerGroups: HeaderGroup[];
}

export interface ITableBodyProps {
  rows: Row[];
  prepareRow: (row: Row) => void;
}

export interface ITableProps extends ITableParams {
  columns: Column[];
  data: any[];
}

const TableWrapper = styled.table`
  border-collapse: collapse;
  min-width: 100%;
`;

const TableRow = styled.tr`
  border: 1px solid;
  border-color: ${({ theme }) => theme.dimmedBackgroundColor};
`;

const TableHeader = styled.th`
  padding: 5px;
  font-size: 14px;
  color: ${({ theme }) => theme.dimmedTextColor};
  font-weight: bold;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 5px;
  font-size: 14px;
  color: ${({ theme }) => theme.primaryTextColor};
  text-align: left;
`;

const getTableParams = ({ isSortable }: ITableParams): any[] => {
  const tableParams: any[] = [];

  if (isSortable) tableParams.push(useSortBy);

  return tableParams;
};

const renderHeader = ({ headerGroups }: ITableHeaderProps): React.ReactNode => {
  return headerGroups.map((headerGroup: HeaderGroup) => (
    <TableRow {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column: any) => (
        <TableHeader {...column.getHeaderProps(column.getSortByToggleProps())}>
          {column.render('Header')} {column.isSorted ? (column.isSortedDesc ? '↓' : '↑') : ''}
        </TableHeader>
      ))}
    </TableRow>
  ));
};

const renderBody = ({ rows, prepareRow }: ITableBodyProps): React.ReactNode => {
  return rows.map((row: Row, i: number) => {
    prepareRow(row);
    return (
      <TableRow {...row.getRowProps()}>
        {row.cells.map((cell: Cell) => {
          return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
        })}
      </TableRow>
    );
  });
};

const Table: React.FC<ITableProps> = ({ columns, data, isSortable }) => {
  const tableParams = getTableParams({ isSortable });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data
    },
    ...tableParams
  );

  return (
    <TableWrapper {...getTableProps}>
      <thead>{renderHeader({ headerGroups })}</thead>
      <tbody {...getTableBodyProps()}>{renderBody({ rows, prepareRow })}</tbody>
    </TableWrapper>
  );
};

export default Table;
