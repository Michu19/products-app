import { AxiosResponse, Method } from 'axios';

export const CONTENT_TYPE_APPLICATION_JSON = 'application/json; charset=utf-8';

export type RequestParameters = Record<string, unknown>;

export interface ResponseWithHeaders<T> {
  data: T;
  headers: Record<string, unknown>;
}

export abstract class GenericHttpClient {
  constructor(protected baseUrl: string) {}

  protected abstract makeRequest<TResponse, TRequestBody>(
    resourceUrl: string,
    method: Method,
    options: {
      requestBody?: TRequestBody;
      params?: RequestParameters;
      contentType?: string;
      signal?: AbortSignal;
    },
  ): Promise<AxiosResponse<TResponse>>;

  private defaultResolveFunc<TResponse>(response: AxiosResponse<TResponse>) {
    return response.data;
  }

  async get<TResponse>(
    resourceUrl: string,
    params?: RequestParameters,
    signal?: AbortSignal,
  ): Promise<TResponse> {
    const response = await this.makeRequest<TResponse, unknown>(
      resourceUrl,
      'get',
      {
        params,
        signal,
      },
    );

    return this.defaultResolveFunc(response);
  }

  async getWithHeaders<TResponse>(
    resourceUrl: string,
    params?: RequestParameters,
  ): Promise<ResponseWithHeaders<TResponse>> {
    const response = await this.makeRequest<TResponse, unknown>(
      resourceUrl,
      'get',
      {
        params,
      },
    );

    return {
      data: response.data,
      headers: response.headers,
    };
  }

  async post<TResponse, TRequestBody>(
    resourceUrl: string,
    requestBody: TRequestBody,
    contentType?: string,
  ): Promise<TResponse> {
    const response = await this.makeRequest<TResponse, TRequestBody>(
      resourceUrl,
      'post',
      {
        requestBody,
        contentType,
      },
    );

    return this.defaultResolveFunc(response);
  }

  async put<TResponse, TRequestBody>(
    resourceUrl: string,
    requestBody?: TRequestBody,
  ): Promise<TResponse> {
    const response = await this.makeRequest<TResponse, TRequestBody>(
      resourceUrl,
      'put',
      {
        requestBody,
      },
    );

    return this.defaultResolveFunc(response);
  }

  async delete<TResponse, TRequestBody>(
    resourceUrl: string,
    requestBody?: TRequestBody,
  ): Promise<TResponse> {
    const response = await this.makeRequest<TResponse, TRequestBody>(
      resourceUrl,
      'delete',
      {
        requestBody,
      },
    );

    return this.defaultResolveFunc(response);
  }

  async patch<TResponse, TRequestBody>(
    resourceUrl: string,
    requestBody: TRequestBody,
  ): Promise<TResponse> {
    const response = await this.makeRequest<TResponse, TRequestBody>(
      resourceUrl,
      'patch',
      {
        requestBody,
      },
    );

    return this.defaultResolveFunc(response);
  }
}
