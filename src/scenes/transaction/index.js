import Header from 'components/Header';
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useGetTransactionsQuery } from 'store/Api';
import { Box, useTheme } from '@mui/material';
import DataGridCustomToolbar from 'components/DataGridCustomToolbar';
const Transaction = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  debugger;
  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      flex: 0.5,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
    },
    {
      field: 'products',
      headerName: '# of Products',
      flex: 0.5,
      renderCell: (params) => {
        return params?.value?.length;
      },
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 0.4,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  debugger;
  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='Transaction' subtitle='Entire list of Transactions' />
      <Box mt='40px' height='75vh'>
        <DataGrid
          loading={isLoading && !data}
          getRowId={(row) => row._id}
          rows={(data?.data && data?.data?.transaction) || []}
          rowsPerPageOptions={[20, 50, 100]}
          columns={columns}
          rowCount={(data?.data && data?.data?.total) || 0}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode='server'
          sortingMode='server'
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModal) => setSort(...newSortModal)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transaction;
