import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: ['User', 'Products', 'Customers', 'Transactions', 'Geography'],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ['User'],
    }),
    getProducts: build.query({
      query: () => `client/product`,
      providesTags: ['Products'],
    }),
    getCustomers: build.query({
      query: () => `client/customers`,
      providesTags: ['Customers'],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, search, sort }) => ({
        url: `client/transaction`,
        method: 'GET',
        params: { page, pageSize, search, sort },
      }),
      providesTags: ['Transactions'],
    }),
    getGeography: build.query({
      query: () => `client/geography`,
      providesTags: ['Geography'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
} = api;
