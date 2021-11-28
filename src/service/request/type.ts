import type { AxiosRequestConfig, AxiosResponse } from "axios";
export interface XYRequestInterceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;
  responseInterceptors?: (res: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (err: any) => any;
}
export interface XYRequestConfig extends AxiosRequestConfig {
  interceptors?: XYRequestInterceptors;
  showloading?: boolean;
}
