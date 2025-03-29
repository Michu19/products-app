import axios, { AxiosError, AxiosResponse, Method } from 'axios';
import {
  CONTENT_TYPE_APPLICATION_JSON,
  GenericHttpClient,
  RequestParameters,
} from './genericHttpClient';
import * as qs from 'qs';

export class HttpClient extends GenericHttpClient {
  private basePath: string;

  constructor(protected override baseUrl: string) {
    super(baseUrl);

    const pathname = this.baseUrl ? new URL(this.baseUrl).pathname : '';
    this.basePath = pathname === '/' ? '' : pathname;
  }

  getUrl(resourceUrl: string) {
    const url = new URL(this.basePath + resourceUrl, this.baseUrl).toString();
    return url;
  }

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async makeRequest<TResponse, TRequestBody>(
    resourceUrl: string,
    method?: Method,
    options: {
      requestBody?: TRequestBody;
      params?: RequestParameters;
      contentType?: string;
    } = {},
  ): Promise<AxiosResponse<TResponse>> {
    const { requestBody, params, contentType } = {
      contentType: CONTENT_TYPE_APPLICATION_JSON,
      ...options,
    };
    const url = this.getUrl(resourceUrl);

    return new Promise<AxiosResponse<TResponse>>((resolve, reject) => {
      axios
        .request<TResponse>({
          method,
          url,
          headers: {
            'Content-Type': contentType,
          },
          data: requestBody,
          params,
          paramsSerializer: (params) =>
            qs.stringify(params, { indices: false }),
        })
        .then(async (response) => {
          resolve(response);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  }
}
