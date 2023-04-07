import type { AxiosRequestConfig } from "axios";
import axios from "axios";

const config: AxiosRequestConfig = {
  baseURL: "https://jobkok.shop",
};

export const client = axios.create(config);
