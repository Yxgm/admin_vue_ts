import XyRequest from "./request";
import localCache from "@/utils/cache";

const xyRequest = new XyRequest({
  baseURL: "http://152.136.185.210:4000",
  timeout: 10000,
  interceptors: {
    requestInterceptors: (config) => {
      const token = localCache.getCache("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }
  }
  // showloading: true
});

export default xyRequest;
