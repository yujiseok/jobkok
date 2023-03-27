import type { AxiosRequestConfig } from "axios";
import axios from "axios";

const config: AxiosRequestConfig = {
  baseURL: "http://cb5d2f2b-4932-4853-a635-3028c5f2032e.mock.pstmn.io/",
};

export const client = axios.create(config);
