import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { HttpClient } from "./httpClient";
import { RequestParameters } from "./genericHttpClient";

type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';
export const httpClientBaseQuery =
  (
    httpClient: HttpClient,
  ): BaseQueryFn<
    {
      url: string;
      method?: Method;
      data?: unknown;
      params?: RequestParameters;
      contentType?: string;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, contentType }) => {
    try {
      const result = await httpClient.makeRequest(url, method, {
        requestBody: data,
        params,
        contentType,
      });
      return { data: result.data };
    } catch (axiosError: unknown) {
      const err = axiosError as any;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };