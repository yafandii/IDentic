import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const post = async <TResponse = unknown, TPayload = unknown>(
  client: AxiosInstance,
  url: string,
  data: TPayload,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<TResponse>> => {
  return client.post<TResponse>(url, data, config);
};

export const get = async <TResponse = unknown>(
  client: AxiosInstance,
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<TResponse>> => {
  return client.get<TResponse>(url, config);
};
