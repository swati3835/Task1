
import React from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table';
import InfiniteScroll from 'react-infinite-scroll-component';
import Table from './Table';
import collegesData from '../Data/collegesData.json';

const CollegeTable = () => {
    const colleges = collegesData;
      
      console.log('Colleges:', colleges);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    
  } = useTable(
    {
      columns: [
        {
          Header: 'College Name',
          accessor: 'collegeName',
        },
        {
          Header: 'Rating',
          accessor: 'rating',
        },
        {
          Header: 'Fees',
          accessor: 'fees',
        },
        {
          Header: 'User Review Rating',
          accessor: 'userReviewRating',
        },
        {
          Header: 'Ranking',
          accessor: 'ranking',
        },
      ],
      data: colleges,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
    
  );

  return (
    <div>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <InfiniteScroll
        dataLength={colleges.length}
        next={() => {}}
        hasMore={false}
        loader={" "}
        scrollThreshold={0.9}
      />
    </div>
  );
};

export default CollegeTable;
