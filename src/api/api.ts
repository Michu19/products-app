import { createApi as rtkCreateApi } from '@reduxjs/toolkit/query/react';
import { httpClientBaseQuery } from './httpClientBaseQuery';
import { HttpClient } from './httpClient';

const httpClient = new HttpClient('');
const createApi = (options: { reducerPath?: string } = {}) =>
  rtkCreateApi({
    reducerPath: options.reducerPath ?? '',
    refetchOnMountOrArgChange: true,
    baseQuery: httpClientBaseQuery(httpClient),
    endpoints: () => ({}),
  });
export const api = createApi();

export const useInitApi = (apiBaseUrl: string) => {
  httpClient.setBaseUrl(apiBaseUrl);
};
