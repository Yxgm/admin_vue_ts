import axios from "axios";
import type { AxiosInstance } from "axios";
import { XYRequestInterceptors, XYRequestConfig } from "./type";
import { ElLoading, ILoadingInstance } from "element-plus";

class XyRequest {
  instance: AxiosInstance;
  // 这一步是将传入的配置参数中的interceptors保存到属性中
  interceptors?: XYRequestInterceptors;
  loading?: ILoadingInstance;
  showloading: boolean;

  constructor(config: XYRequestConfig) {
    this.instance = axios.create(config);

    this.interceptors = config.interceptors;

    this.showloading = config.showloading ?? false;
    // 自定义拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorCatch
    );
    // 为实例添加全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showloading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "Loading...",
            background: "rgba(0,0,0,0.1)"
          });
        }
        return config;
      },
      (err) => {
        return err;
      }
    );
    // 为实例添加全局响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        setTimeout(() => {
          this.loading?.close();
        }, 300);
        return res.data;
      },
      (err) => {
        this.loading?.close();

        return err;
      }
    );
  }
  // 请求方法
  request<T = any>(config: XYRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果单个请求中有拦截器的配置，则执行单个请求的拦截器，并返回config
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }

      if (config.showloading) {
        this.showloading = config.showloading ?? true;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // if (config.interceptors?.responseInterceptors) {
          //   res = config.interceptors.responseInterceptors(res);
          // }
          // 2.判断是否需要显示loading
          this.showloading = true;
          resolve(res);
        })
        .catch((err) => {
          this.showloading = false;
          reject(err);
        });
    });
  }
  get<T = any>(config: XYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T = any>(config: XYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }

  delete<T = any>(config: XYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T = any>(config: XYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}
export default XyRequest;
