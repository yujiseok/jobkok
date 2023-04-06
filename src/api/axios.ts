import type { AxiosRequestConfig } from "axios";
import axios from "axios";

const token = localStorage.getItem("token");

const config: AxiosRequestConfig = {
  baseURL: "https://jobkok.shop ",
};

const authConfig: AxiosRequestConfig = {
  baseURL: "https://jobkok.shop ",
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const client = axios.create(config);
export const auth = axios.create(authConfig);
