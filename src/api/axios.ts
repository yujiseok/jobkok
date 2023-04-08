import type { AxiosRequestConfig } from "axios";
import axios from "axios";

const config: AxiosRequestConfig = {
  baseURL: "https://jobkok.shop",
};

export const client = axios.create(config);
export const common = axios.create(config);

client.interceptors.request.use((config) => {
  const { accessToken } = JSON.parse(localStorage.getItem("token") || "{}");
  if (!config.headers) return config;

  if (accessToken !== null) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { refreshToken } = JSON.parse(localStorage.getItem("token") || "{}");
    const { config, response } = error;

    const status = response.status;

    if (status === 400) {
      const res = await axios({
        method: "POST",
        url: "https://jobkok.shop/auth/reissue",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (res.status === 200) {
        localStorage.setItem("token", JSON.stringify(res.data.data));
        config.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
      } else {
        return Promise.reject(error);
      }
    }
    return axios(config);
  },
);
