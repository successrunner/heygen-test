import axios, { InternalAxiosRequestConfig } from "axios";

import { PUBLIC_API_URLs } from "@/lib/constants/apis";

const apiManager = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HEYGEN_API_URL,
});

apiManager.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const requestUrl = config.url ?? "";
    if (!PUBLIC_API_URLs.find((url: string) => url.includes(requestUrl))) {
      config.headers["x-api-key"] = process.env.NEXT_PUBLIC_HEYGEN_API_KEY;
    }
    return config;
  },
  (err) => err,
);

apiManager.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (!err.response) {
      console.error("HTTP_ERROR", "network error!");
      return err;
    }
    console.error("HTTP_ERROR", err.response?.data?.message || err.message);
    return err;
  },
);

export default apiManager;
